import type {
  DriveChangeSet,
  DriveFileRef,
  DownloadedFile,
} from "@/domain/ingestion/types";

/**
 * DriveSource — port to a file source that supports incremental change
 * detection (Google Drive Changes API today). The sync use-case depends only on
 * this interface, so a mock source can be used in tests and a different provider
 * can be plugged later without touching the use-case.
 */
export interface DriveSource {
  /** Initial token to start watching changes from ("now"). */
  getStartPageToken(): Promise<string>;

  /** Incremental changes since `pageToken`, scoped to configured folders. */
  listChanges(pageToken: string): Promise<DriveChangeSet>;

  /** All files currently under a folder (recursive) — for first full import. */
  listFolder(folderId: string): Promise<DriveFileRef[]>;

  /** Download a file's bytes and compute its content hash. */
  download(ref: DriveFileRef): Promise<DownloadedFile>;
}

/**
 * IngestionStore — port to persist imported-file records and sync history.
 * (Implemented over Supabase; kept as a port so the use-case stays testable.)
 */
export interface IngestionStore {
  /** True if a file with this exact content hash was already imported (dedupe). */
  existsByHash(hashSha256: string): Promise<boolean>;
  /** True if this Drive file id is already tracked. */
  existsByDriveId(driveFileId: string): Promise<boolean>;
  /** Insert a newly received file (status = recebido). Returns its id. */
  recordArquivo(input: {
    driveFileId: string;
    nome: string;
    mime: string;
    tamanho?: number;
    hashSha256: string;
    driveModifiedAt: string;
    origem: "drive" | "upload" | "local";
  }): Promise<string>;
  /** Mark a tracked Drive file as archived (removed at source; content kept). */
  archiveByDriveId(driveFileId: string): Promise<void>;
  /** Persist the result + next page token of a sync run. */
  recordSync(result: {
    novos: number;
    atualizados: number;
    removidos: number;
    nextPageToken: string;
    log: unknown;
  }): Promise<void>;
  /** The page token to resume from, or null on first run. */
  lastPageToken(): Promise<string | null>;
}
