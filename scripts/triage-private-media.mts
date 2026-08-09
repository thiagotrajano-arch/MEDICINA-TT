/**
 * Classifica o lote canônico de imagens privadas e cria vínculos com a árvore
 * de estudo. A classificação automática é conservadora: capas/branding ficam
 * como contextual e o restante aguarda revisão visual, sem inventar diagnóstico.
 * JPEG 2000 é convertido para JPEG privado para poder ser exibido no navegador.
 */
import { readFile, stat } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

const args = process.argv.slice(2);
const flag = (nome: string) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : undefined; };
const manifestPath = resolve(flag("--manifest") ?? "_private-corpus/drive-lote-20260801/image-manifest.json");
const limite = Number(flag("--limit") ?? "0");
const MAX_BYTES = 20 * 1024 * 1024;
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".jp2": "image/jpeg" };

type ManifestRow = { path: string; sha256: string; bytes: number; width: number; height: number; page: number; image_index?: number; destination?: string; canonical?: boolean };
type CatalogoRow = { id: string; owner_id: string; object_path: string };
type Classificacao = { disciplina: string; tema: string; subtema: string; subtemaId: string | null };

function normalizar(valor: string): string { return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

function classificar(caminho: string): Classificacao {
  const n = normalizar(caminho);
  if (n.includes("hematologia__anemias_macro") || n.includes("hematologia__anemias_micro")) return { disciplina: "Hematologia", tema: "Anemias", subtema: "Investigação e classificação", subtemaId: "hemato--anemias--investigacao-e-classificacao" };
  if (n.includes("neuro__doencas_neuromusculares_part_i")) return { disciplina: "Neurologia", tema: "Doenças neuromusculares", subtema: "Miastenia gravis", subtemaId: "neuro--miastenia-gravis--diagnostico-e-conduta" };
  if (n.includes("neuro__doencas_neuromusculares_part_ii")) return { disciplina: "Neurologia", tema: "Doenças neuromusculares", subtema: "Síndrome de Guillain-Barré", subtemaId: "neuro--sindrome-de-guillain-barre--diagnostico-e-conduta" };
  if (n.includes("pediatria-obstetricia__cuidados_neonatais")) return { disciplina: "Pediatria", tema: "Neonatologia", subtema: "Cuidados neonatais", subtemaId: "ped--neonatologia--cuidados-neonatais" };
  if (n.includes("pneumologia__tep")) return { disciplina: "Pneumologia", tema: "Tromboembolismo pulmonar (TEP)", subtema: "Diagnóstico e conduta", subtemaId: "pneumo--tromboembolismo-pulmonar-tep--diagnostico-e-conduta" };
  return { disciplina: "Acervo privado", tema: "Triagem pendente", subtema: "", subtemaId: null };
}

function statusDaTriagem(row: ManifestRow): { status: "contextual" | "revisao_pendente" | "nao_util"; motivo: string } {
  if (row.width < 160 || row.height < 120) return { status: "nao_util", motivo: "Dimensões insuficientes para estudo clínico." };
  if (row.page === 1 && (row.image_index ?? 1) === 1) return { status: "contextual", motivo: "Capa/branding do material; não ancorar como achado clínico." };
  return { status: "revisao_pendente", motivo: "Fonte e página identificadas; revisão visual clínica ainda necessária." };
}

async function main() {
  const manifesto = JSON.parse(await readFile(manifestPath, "utf8")) as { rows?: ManifestRow[] };
  const base = dirname(manifestPath);
  const rows = (manifesto.rows ?? []).filter((row) => row.canonical !== false && row.destination !== "public" && !row.path.toLowerCase().includes("plano-ensino"));
  const selecionadas = limite > 0 ? rows.slice(0, limite) : rows;
  const db = getSupabaseAdmin();
  const { data: catalogo, error: catalogoErro } = await db.from("midia_privada_usuario").select("id,owner_id,object_path").limit(10000) as { data: CatalogoRow[] | null; error: { message: string } | null };
  if (catalogoErro) throw new Error(`catálogo privado: ${catalogoErro.message}`);
  const owner = catalogo?.[0]?.owner_id;
  if (!owner) throw new Error("Nenhuma conta proprietária encontrada no catálogo privado.");
  const porObjeto = new Map((catalogo ?? []).filter((r) => r.owner_id === owner).map((r) => [r.object_path, r]));
  let atualizados = 0; let convertidos = 0; let ignorados = 0; let jp2Pendentes = 0; let faltantes = 0; let erros = 0;
  for (const row of selecionadas) {
    const ext = extname(row.path).toLowerCase();
    if (!MIME[ext] || row.bytes > MAX_BYTES) { ignorados += 1; continue; }
    // O runtime Node atual não tem decodificador JPEG 2000; preservamos o
    // arquivo e registramos a pendência em vez de gerar uma falsa conversão.
    if (ext === ".jp2") { jp2Pendentes += 1; continue; }
    const arquivo = resolve(base, row.path);
    try { await stat(arquivo); } catch { faltantes += 1; continue; }
    const objectPath = `${owner}/${row.sha256.toLowerCase()}${ext === ".jp2" ? ".jpg" : ext}`;
    const classificacao = classificar(row.path);
    const triagem = statusDaTriagem(row);
    try {
      if (!porObjeto.has(objectPath)) {
        const bruto = await readFile(arquivo);
        const bytes = ext === ".jp2" ? await (await import("sharp")).default(bruto).jpeg({ quality: 92 }).toBuffer() : bruto;
        const upload = await db.storage.from("midia-privada").upload(objectPath, bytes, { contentType: MIME[ext], cacheControl: "31536000", upsert: false });
        if (upload.error) throw new Error(`upload: ${upload.error.message}`);
        const insert = await db.from("midia_privada_usuario").insert({
          owner_id: owner, object_path: objectPath, titulo: `Imagem clínica — ${classificacao.subtema || basename(row.path, ext)} — p.${row.page}`,
          tipo_origem: "pdf_comercial", disciplina: classificacao.disciplina, tema: classificacao.tema, subtema: classificacao.subtema,
          subtema_id: classificacao.subtemaId, diagnostico: "", modalidade: "Imagem extraída de PDF", fonte: `Acervo privado — ${classificacao.tema}`,
          pagina: row.page, observacao: `SHA-256: ${row.sha256}`, triagem_status: triagem.status, triagem_motivo: triagem.motivo,
          paciente_anonimizado: false, autorizacao_paciente: false,
        });
        if (insert.error) { await db.storage.from("midia-privada").remove([objectPath]); throw new Error(`catálogo: ${insert.error.message}`); }
        convertidos += ext === ".jp2" ? 1 : 0;
      } else {
        const update = await db.from("midia_privada_usuario").update({ disciplina: classificacao.disciplina, tema: classificacao.tema, subtema: classificacao.subtema, subtema_id: classificacao.subtemaId, triagem_status: triagem.status, triagem_motivo: triagem.motivo, observacao: `SHA-256: ${row.sha256}` }).eq("owner_id", owner).eq("object_path", objectPath);
        if (update.error) throw new Error(`atualização: ${update.error.message}`);
      }
      atualizados += 1;
    } catch (erro) { erros += 1; console.error(`[triagem] ${row.path}: ${erro instanceof Error ? erro.message : String(erro)}`); }
  }
  console.log(JSON.stringify({ manifest: manifestPath, selecionadas: selecionadas.length, atualizados, convertidos, jp2Pendentes, ignorados, faltantes, erros }, null, 2));
  if (erros > 0) process.exitCode = 1;
}

main().catch((erro) => { console.error(`[triagem] ${erro instanceof Error ? erro.message : String(erro)}`); process.exitCode = 1; });
