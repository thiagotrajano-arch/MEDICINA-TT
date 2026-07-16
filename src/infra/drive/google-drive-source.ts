import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { google, type drive_v3 } from "googleapis";
import { driveFolderIds } from "./config";
import type { DriveSource } from "@/application/ports/drive-source";
import type {
  DriveChangeSet,
  DriveFileRef,
  DownloadedFile,
} from "@/domain/ingestion/types";

/**
 * GoogleDriveSource — DriveSource implemented over the official Drive API v3.
 *
 * Uses the Changes API for incremental sync (only new/updated/removed since the
 * last token — never a full re-scan) and read-only scope. Auth via Service
 * Account (preferred) or OAuth refresh token. Loaded lazily (see job runner) so
 * `googleapis` is only imported when Drive is actually configured.
 */
export class GoogleDriveSource implements DriveSource {
  private drive: drive_v3.Drive;
  private folderIds: string[];

  constructor() {
    this.drive = google.drive({ version: "v3", auth: buildAuth() });
    this.folderIds = driveFolderIds();
  }

  async getStartPageToken(): Promise<string> {
    const res = await this.drive.changes.getStartPageToken({});
    return res.data.startPageToken ?? "";
  }

  async listChanges(pageToken: string): Promise<DriveChangeSet> {
    const novos: DriveFileRef[] = [];
    const atualizados: DriveFileRef[] = [];
    const removidos: string[] = [];
    let token: string | undefined = pageToken;
    let nextPageToken = pageToken;

    while (token) {
      const res: { data: drive_v3.Schema$ChangeList } = await this.drive.changes.list({
        pageToken: token,
        fields:
          "newStartPageToken, nextPageToken, changes(removed, fileId, file(id, name, mimeType, size, modifiedTime, parents, trashed))",
        pageSize: 100,
      });
      for (const change of res.data.changes ?? []) {
        if (change.removed || change.file?.trashed) {
          if (change.fileId) removidos.push(change.fileId);
          continue;
        }
        const f = change.file;
        if (!f?.id) continue;
        if (!this.inScope(f.parents ?? undefined)) continue;
        const ref = toRef(f);
        // Changes API doesn't distinguish create vs update reliably; the
        // use-case dedupes by content hash, so classing all as "atualizado"
        // when a parent isn't new is safe. We treat all here as candidates.
        atualizados.push(ref);
      }
      nextPageToken = res.data.newStartPageToken ?? res.data.nextPageToken ?? nextPageToken;
      token = res.data.nextPageToken ?? undefined;
    }

    return { novos, atualizados, removidos, nextPageToken };
  }

  async listFolder(folderId: string): Promise<DriveFileRef[]> {
    const out: DriveFileRef[] = [];
    const walk = async (parent: string) => {
      let pageToken: string | undefined;
      do {
        const res: { data: drive_v3.Schema$FileList } = await this.drive.files.list({
          q: `'${parent}' in parents and trashed = false`,
          fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime, parents)",
          pageSize: 200,
          pageToken,
        });
        for (const f of res.data.files ?? []) {
          if (f.mimeType === "application/vnd.google-apps.folder") {
            if (f.id) await walk(f.id);
          } else {
            out.push(toRef(f));
          }
        }
        pageToken = res.data.nextPageToken ?? undefined;
      } while (pageToken);
    };
    await walk(folderId);
    return out;
  }

  async download(ref: DriveFileRef): Promise<DownloadedFile> {
    const res = await this.drive.files.get(
      { fileId: ref.driveFileId, alt: "media" },
      { responseType: "arraybuffer" }
    );
    const bytes = new Uint8Array(res.data as ArrayBuffer);
    const hashSha256 = createHash("sha256").update(bytes).digest("hex");
    return { ref, bytes, hashSha256 };
  }

  private inScope(parents?: string[]): boolean {
    if (!this.folderIds.length) return true; // no filter configured → accept all
    if (!parents?.length) return false;
    return parents.some((p) => this.folderIds.includes(p));
  }
}

function toRef(f: drive_v3.Schema$File): DriveFileRef {
  return {
    driveFileId: f.id!,
    nome: f.name ?? "sem-nome",
    mime: f.mimeType ?? "application/octet-stream",
    tamanho: f.size ? Number(f.size) : undefined,
    modifiedAt: f.modifiedTime ?? new Date(0).toISOString(),
    parentId: f.parents?.[0],
  };
}

const DRIVE_READONLY = ["https://www.googleapis.com/auth/drive.readonly"];

function buildAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
  if (json || file) {
    const credentials = JSON.parse(json ?? readFileSync(file!, "utf8"));
    return new google.auth.GoogleAuth({ credentials, scopes: DRIVE_READONLY });
  }
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (clientId && clientSecret && refreshToken) {
    const oauth = new google.auth.OAuth2(clientId, clientSecret);
    oauth.setCredentials({ refresh_token: refreshToken });
    return oauth;
  }
  throw new Error("Google Drive não configurado (service account ou OAuth ausente).");
}
