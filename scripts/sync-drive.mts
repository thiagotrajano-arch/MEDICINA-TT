/**
 * Operações do Drive deliberadamente separadas:
 * - `npm run drive:inventory`: inventário recursivo só de metadados, sem download ou escrita.
 * - `npm run sync-drive`: somente alterações incrementais, com opt-in explícito e baseline prévio.
 */
import { loadEnv } from "./load-env.mjs";
import { driveFolderIds, isDriveConfigured, isDriveSyncExplicitlyEnabled } from "../src/infra/drive/config";

loadEnv();

async function main() {
  if (process.argv.includes("--inventario")) {
    await inventariarMetadados();
    return;
  }
  if (process.argv.includes("--baseline")) {
    await criarBaseline();
    return;
  }

  if (!isDriveSyncExplicitlyEnabled()) {
    console.log("[sync-drive] inativo: defina DRIVE_SYNC_ENABLED=true somente após revisar o inventário e o escopo.");
    return;
  }
  if (!isDriveConfigured()) throw new Error("CONFIGURACAO_INCOMPLETA");

  const { GoogleDriveSource } = await import("../src/infra/drive/google-drive-source");
  const { SupabaseIngestionStore } = await import("../src/infra/drive/supabase-ingestion-store");
  const { SyncDrive } = await import("../src/application/ingestion/sync-drive");

  const sync = new SyncDrive(new GoogleDriveSource(), new SupabaseIngestionStore());
  const result = await sync.run();
  const errosPorCodigo = result.erros.reduce<Record<string, number>>((acumulado, erro) => {
    acumulado[erro.codigo] = (acumulado[erro.codigo] ?? 0) + 1;
    return acumulado;
  }, {});
  console.log(`[sync-drive] concluído: novos=${result.novos}, atualizados=${result.atualizados}, removidos=${result.removidos}, duplicados=${result.ignoradosDuplicados}, erros=${result.erros.length}.`);
  if (result.erros.length) console.warn("[sync-drive] códigos de erro:", JSON.stringify(errosPorCodigo));
}

async function inventariarMetadados() {
  if (!isDriveConfigured()) throw new Error("CONFIGURACAO_INCOMPLETA");
  const { GoogleDriveSource } = await import("../src/infra/drive/google-drive-source");
  const source = new GoogleDriveSource();
  const encontrados = new Map<string, { mime: string; tamanho?: number }>();

  for (const folderId of driveFolderIds()) {
    for (const arquivo of await source.listFolder(folderId)) {
      encontrados.set(arquivo.driveFileId, { mime: arquivo.mime, tamanho: arquivo.tamanho });
    }
  }

  const categorias: Record<string, number> = {};
  let bytes = 0;
  for (const arquivo of encontrados.values()) {
    const categoria = categoriaSegura(arquivo.mime);
    categorias[categoria] = (categorias[categoria] ?? 0) + 1;
    bytes += arquivo.tamanho ?? 0;
  }
  console.log(`[drive-inventory] concluído: arquivos=${encontrados.size}, bytes=${bytes}, categorias=${JSON.stringify(categorias)}.`);
  console.log("[drive-inventory] nenhum nome, ID, conteúdo ou hash foi gravado ou exibido.");
}

async function criarBaseline() {
  if (process.env.DRIVE_BASELINE_APPROVED !== "true") {
    throw new Error("CONFIRMACAO_DE_BASELINE_OBRIGATORIA");
  }
  if (!isDriveConfigured()) throw new Error("CONFIGURACAO_INCOMPLETA");

  const { GoogleDriveSource } = await import("../src/infra/drive/google-drive-source");
  const { SupabaseIngestionStore } = await import("../src/infra/drive/supabase-ingestion-store");
  const source = new GoogleDriveSource();
  const store = new SupabaseIngestionStore();
  const token = await source.getStartPageToken();
  if (!token) throw new Error("TOKEN_DE_BASELINE_AUSENTE");

  await store.recordSync({
    novos: 0,
    atualizados: 0,
    removidos: 0,
    nextPageToken: token,
    log: { tipo: "baseline", origem: "start-page-token" },
  });
  console.log("[drive-baseline] concluído: token de alterações salvo; nenhum arquivo foi baixado, gravado ou exibido.");
}

function categoriaSegura(mime: string): string {
  if (mime === "application/pdf") return "pdf";
  if (mime.includes("document")) return "documento";
  if (mime.includes("presentation")) return "apresentacao";
  if (mime.includes("spreadsheet")) return "planilha";
  if (mime.startsWith("image/")) return "imagem";
  if (mime.startsWith("video/")) return "video";
  return "outro";
}

function codigoSeguro(erro: unknown): string {
  const resposta = erro as { response?: { status?: unknown }; code?: unknown };
  const status = resposta?.response?.status;
  if (typeof status === "number") return `http-${status}`;
  if (resposta?.code === "ETIMEDOUT" || resposta?.code === "ECONNRESET" || resposta?.code === "ENOTFOUND") return "rede";
  if (erro instanceof Error && erro.message === "BASELINE_OBRIGATORIO") return "baseline-obrigatorio";
  if (erro instanceof Error && erro.message === "CONFIRMACAO_DE_BASELINE_OBRIGATORIA") return "confirmacao-baseline-obrigatoria";
  if (erro instanceof Error && erro.message === "TOKEN_DE_BASELINE_AUSENTE") return "token-baseline-ausente";
  if (erro instanceof Error && erro.message === "CONFIGURACAO_INCOMPLETA") return "configuracao-incompleta";
  return "operacional";
}

main().catch((erro) => {
  console.error(`[sync-drive] falhou (${codigoSeguro(erro)}). Nenhum detalhe da fonte foi exposto.`);
  process.exit(1);
});
