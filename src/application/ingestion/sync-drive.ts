import type { DriveSource, IngestionStore } from "@/application/ports/drive-source";
import type { DriveFileRef, SyncResult } from "@/domain/ingestion/types";

/**
 * SyncDrive — the use-case that keeps the library in sync with Google Drive.
 *
 * Pure orchestration over the DriveSource + IngestionStore ports (no SDK, no SQL):
 *  1. Resume from the last saved page token (or start fresh).
 *  2. Pull incremental changes (new / updated / removed).
 *  3. For each new/updated file: skip exact duplicates (by content hash),
 *     otherwise download and record it (status = recebido) to hand off to the
 *     processing pipeline (extract → classify → persist).
 *  4. Removed-at-source files are archived, never hard-deleted (history kept).
 *  5. Persist the run + next page token for the next incremental sync.
 *
 * Idempotent: re-running never duplicates content (hash + drive-id dedupe).
 */
export class SyncDrive {
  constructor(
    private readonly source: DriveSource,
    private readonly store: IngestionStore
  ) {}

  async run(): Promise<SyncResult> {
    const result: SyncResult = {
      novos: 0,
      atualizados: 0,
      removidos: 0,
      ignoradosDuplicados: 0,
      nextPageToken: "",
      erros: [],
    };

    const token = (await this.store.lastPageToken()) ?? (await this.source.getStartPageToken());
    const changes = await this.source.listChanges(token);
    result.nextPageToken = changes.nextPageToken;

    for (const ref of changes.novos) {
      await this.ingerir(ref, "novo", result);
    }
    for (const ref of changes.atualizados) {
      await this.ingerir(ref, "atualizado", result);
    }
    for (const driveFileId of changes.removidos) {
      try {
        await this.store.archiveByDriveId(driveFileId);
        result.removidos++;
      } catch (e) {
        result.erros.push(`remover ${driveFileId}: ${String(e)}`);
      }
    }

    await this.store.recordSync({
      novos: result.novos,
      atualizados: result.atualizados,
      removidos: result.removidos,
      nextPageToken: result.nextPageToken,
      log: { ignoradosDuplicados: result.ignoradosDuplicados, erros: result.erros },
    });

    return result;
  }

  private async ingerir(
    ref: DriveFileRef,
    tipo: "novo" | "atualizado",
    result: SyncResult
  ): Promise<void> {
    try {
      const downloaded = await this.source.download(ref);
      if (await this.store.existsByHash(downloaded.hashSha256)) {
        result.ignoradosDuplicados++;
        return; // exact duplicate — never re-import
      }
      await this.store.recordArquivo({
        driveFileId: ref.driveFileId,
        nome: ref.nome,
        mime: ref.mime,
        tamanho: ref.tamanho,
        hashSha256: downloaded.hashSha256,
        driveModifiedAt: ref.modifiedAt,
        origem: "drive",
      });
      if (tipo === "novo") result.novos++;
      else result.atualizados++;
    } catch (e) {
      result.erros.push(`${ref.nome}: ${String(e)}`);
    }
  }
}
