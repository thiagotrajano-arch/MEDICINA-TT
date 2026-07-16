import { getSupabaseAdmin } from "@/infra/supabase/client";
import type { IngestionStore } from "@/application/ports/drive-source";

/**
 * SupabaseIngestionStore — persists imported-file records and sync history using
 * the service-role client (SERVER-ONLY; bypasses RLS for ingestion jobs).
 */
export class SupabaseIngestionStore implements IngestionStore {
  private db = getSupabaseAdmin();

  async existsByHash(hashSha256: string): Promise<boolean> {
    const { count } = await this.db
      .from("arquivo_importado")
      .select("id", { count: "exact", head: true })
      .eq("hash_sha256", hashSha256);
    return (count ?? 0) > 0;
  }

  async existsByDriveId(driveFileId: string): Promise<boolean> {
    const { count } = await this.db
      .from("arquivo_importado")
      .select("id", { count: "exact", head: true })
      .eq("drive_file_id", driveFileId);
    return (count ?? 0) > 0;
  }

  async recordArquivo(input: {
    driveFileId: string;
    nome: string;
    mime: string;
    tamanho?: number;
    hashSha256: string;
    driveModifiedAt: string;
    origem: "drive" | "upload" | "local";
  }): Promise<string> {
    const { data, error } = await this.db
      .from("arquivo_importado")
      .upsert(
        {
          drive_file_id: input.driveFileId,
          nome: input.nome,
          mime: input.mime,
          tamanho: input.tamanho ?? null,
          hash_sha256: input.hashSha256,
          drive_modified_at: input.driveModifiedAt,
          origem: input.origem,
          status: "recebido",
        },
        { onConflict: "drive_file_id" }
      )
      .select("id")
      .single();
    if (error) throw error;
    return data.id as string;
  }

  async archiveByDriveId(driveFileId: string): Promise<void> {
    const { error } = await this.db
      .from("arquivo_importado")
      .update({ status: "erro", erro: "arquivado: removido no Drive" })
      .eq("drive_file_id", driveFileId);
    if (error) throw error;
  }

  async recordSync(result: {
    novos: number;
    atualizados: number;
    removidos: number;
    nextPageToken: string;
    log: unknown;
  }): Promise<void> {
    const { error } = await this.db.from("sync_drive").insert({
      novos: result.novos,
      atualizados: result.atualizados,
      removidos: result.removidos,
      page_token: result.nextPageToken,
      log: result.log as object,
    });
    if (error) throw error;
  }

  async lastPageToken(): Promise<string | null> {
    const { data } = await this.db
      .from("sync_drive")
      .select("page_token")
      .order("executado_em", { ascending: false })
      .limit(1)
      .maybeSingle();
    return (data?.page_token as string | undefined) ?? null;
  }
}
