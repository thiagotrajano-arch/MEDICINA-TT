/**
 * Ingestion domain — types for importing and syncing external materials
 * (Google Drive today; uploads and other sources later). Pure contracts.
 */

export type ArquivoStatus =
  | "recebido"
  | "extraindo"
  | "classificando"
  | "dedupe"
  | "concluido"
  | "erro";

/** A file as seen at the source (e.g. Google Drive), before download. */
export interface DriveFileRef {
  driveFileId: string;
  nome: string;
  mime: string;
  tamanho?: number;
  modifiedAt: string; // RFC 3339
  parentId?: string;
}

/** The set of changes since a given page token (incremental sync). */
export interface DriveChangeSet {
  novos: DriveFileRef[];
  atualizados: DriveFileRef[];
  removidos: string[]; // driveFileId[]
  nextPageToken: string;
}

/** A downloaded file's bytes + identity. */
export interface DownloadedFile {
  ref: DriveFileRef;
  bytes: Uint8Array;
  hashSha256: string;
}

/** Outcome of one sync run, persisted for history/auditing. */
export interface SyncResult {
  novos: number;
  atualizados: number;
  removidos: number;
  ignoradosDuplicados: number;
  nextPageToken: string;
  erros: string[];
}
