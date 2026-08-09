/**
 * Importa imagens já extraídas de PDFs para a biblioteca autenticada.
 *
 * O script nunca publica imagens nem usa a chave service_role no navegador.
 * Ele lê um manifesto privado, deduplica por SHA-256 e grava os objetos em
 * midia-privada/<owner>/<sha>.<ext>, com fonte e página no catálogo privado.
 *
 * Uso:
 *   npm run media:private-import -- --manifest "C:\\...\\image-manifest.json" --dry-run
 *   npm run media:private-import -- --manifest "C:\\...\\image-manifest.json"
 */
import { readFile, stat } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

const args = process.argv.slice(2);
const flag = (nome: string) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : undefined; };
const manifestArg = flag("--manifest");
const limiteArg = Number(flag("--limit") ?? "0");
const dryRun = args.includes("--dry-run");
const manifestPath = resolve(manifestArg ?? "_private-corpus/drive-lote-20260801/image-manifest.json");
const MAX_BYTES = 20 * 1024 * 1024;
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };

type ManifestRow = { path: string; sha256: string; bytes: number; width: number; height: number; page: number; destination?: string; canonical?: boolean; visual_review?: string };
type CatalogoRow = { owner_id: string; object_path: string };

function tituloFonte(relativePath: string): { disciplina: string; fonte: string } {
  const nome = basename(relativePath, extname(relativePath));
  const partes = nome.split("__");
  const disciplina = (partes[0] || "acervo").replace(/[-_]+/g, " ").trim();
  const fonte = (partes[1] || partes[0] || nome).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return { disciplina, fonte };
}

async function main() {
  const manifesto = JSON.parse(await readFile(manifestPath, "utf8")) as { rows?: ManifestRow[] };
  const base = dirname(manifestPath);
  const rows = (manifesto.rows ?? []).filter((row) => row.canonical !== false && row.destination !== "public" && !row.path.toLowerCase().includes("plano-ensino"));
  const selecionadas = limiteArg > 0 ? rows.slice(0, limiteArg) : rows;
  const db = getSupabaseAdmin();
  const { data: catalogo, error: catalogoErro } = await db.from("midia_privada_usuario").select("owner_id, object_path").limit(5000) as { data: CatalogoRow[] | null; error: { message: string } | null };
  if (catalogoErro) throw new Error(`catalogo privado: ${catalogoErro.message}`);
  const owner = catalogo?.[0]?.owner_id;
  if (!owner) throw new Error("Não encontrei uma conta proprietária no catálogo privado; faça login e cadastre uma mídia antes da importação.");
  const existentes = new Set((catalogo ?? []).filter((row) => row.owner_id === owner).map((row) => row.object_path));

  let importadas = 0; let ignoradas = 0; let faltantes = 0; let erros = 0;
  for (const row of selecionadas) {
    const ext = extname(row.path).toLowerCase();
    const mime = MIME[ext];
    const arquivo = resolve(base, row.path);
    if (!mime || row.bytes > MAX_BYTES || row.width < 160 || row.height < 120) { ignoradas += 1; continue; }
    try { await stat(arquivo); } catch { faltantes += 1; continue; }
    const objectPath = `${owner}/${row.sha256.toLowerCase()}${ext}`;
    if (existentes.has(objectPath)) { ignoradas += 1; continue; }
    const { disciplina, fonte } = tituloFonte(row.path);
    const titulo = `Imagem clínica — ${fonte} — p.${row.page}`;
    if (dryRun) { importadas += 1; continue; }
    try {
      const bytes = await readFile(arquivo);
      const { error: uploadErro } = await db.storage.from("midia-privada").upload(objectPath, bytes, { contentType: mime, cacheControl: "31536000", upsert: false });
      if (uploadErro) throw new Error(`upload: ${uploadErro.message}`);
      const { error: insertErro } = await db.from("midia_privada_usuario").insert({
        owner_id: owner, object_path: objectPath, titulo, tipo_origem: "pdf_comercial", disciplina,
        tema: fonte, subtema: "", diagnostico: "", modalidade: "Imagem extraída de PDF", fonte: `Acervo privado — PDF: ${fonte}`,
        pagina: row.page, observacao: `Importada automaticamente; revisão visual pendente. SHA-256: ${row.sha256}`,
        paciente_anonimizado: false, autorizacao_paciente: false,
      });
      if (insertErro) { await db.storage.from("midia-privada").remove([objectPath]); throw new Error(`catalogo: ${insertErro.message}`); }
      existentes.add(objectPath); importadas += 1;
    } catch (erro) { erros += 1; console.error(`[media] falha em ${row.path}: ${erro instanceof Error ? erro.message : String(erro)}`); }
  }
  console.log(JSON.stringify({ manifest: manifestPath, selecionadas: selecionadas.length, importadas, ignoradas, faltantes, erros, dryRun }, null, 2));
  if (erros > 0) process.exitCode = 1;
}

main().catch((erro) => { console.error(`[media] ${erro instanceof Error ? erro.message : String(erro)}`); process.exitCode = 1; });
