/** Vincula metadados textuais de mídia privada a subtema_id, sem inferência ampla. */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();
const out = resolve(process.argv.includes("--backup") ? process.argv[process.argv.indexOf("--backup") + 1] : "C:/Users/Adm/Desktop/MEDICINA/_private-corpus/batch-20260812-psiquiatria/catalogo-before-subtema-reconcile-20260814.json");
type Row = { id: string; owner_id: string; titulo: string; disciplina: string; tema: string; subtema: string; subtema_id: string | null; triagem_status: string };
type Taxonomy = { id: string; nome: string };
const normal = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const ALIASES: Record<string, string> = {
  "cir--trauma-e-suporte-avancado-de-vida--xabcde-choque-e-atls": "cir--trauma--atls-atendimento-inicial",
  "go--violencia-sexual--atendimento-e-profilaxias": "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias",
};
const PSIQ_HIPNO = "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro";

async function main() {
  const db = getSupabaseAdmin();
  const rowsQuery = await db.from("midia_privada_usuario").select("id,owner_id,titulo,disciplina,tema,subtema,subtema_id,triagem_status").is("subtema_id", null).limit(5000);
  const taxonomyQuery = await db.from("subtema").select("id,nome").limit(5000);
  const rows = rowsQuery.data as Row[] | null;
  const taxonomy = taxonomyQuery.data as Taxonomy[] | null;
  const rowsError = rowsQuery.error;
  const taxonomyError = taxonomyQuery.error;
  if (rowsError || taxonomyError) throw new Error(rowsError?.message ?? taxonomyError?.message);
  const taxIds = new Set((taxonomy ?? []).map((item) => item.id));
  const selected = (rows ?? []).filter((row) => row.triagem_status === "util" || row.triagem_status === "contextual");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), rows: selected }, null, 2), "utf8");
  let updated = 0; let unmatched = 0;
  for (const row of selected) {
    const raw = row.subtema.trim();
    const alias = ALIASES[raw] ?? (raw || "");
    let target = alias && taxIds.has(alias) ? alias : null;
    const title = normal(`${row.titulo} ${row.tema}`);
    if (!target && !raw && (title.includes("hipnosedativo") || title.includes("hipnotico") || title.includes("benzodiazep") || title.includes("melatonina") || title.includes("z-drug"))) target = taxIds.has(PSIQ_HIPNO) ? PSIQ_HIPNO : null;
    if (!target) { unmatched += 1; continue; }
    const { error } = await db.from("midia_privada_usuario").update({ subtema_id: target }).eq("owner_id", row.owner_id).eq("id", row.id);
    if (error) throw new Error(`${row.id}: ${error.message}`);
    updated += 1;
  }
  const { data: verify, error: verifyError } = await db.from("midia_privada_usuario").select("id,subtema_id").is("subtema_id", null).limit(5000);
  if (verifyError) throw new Error(verifyError.message);
  console.log(JSON.stringify({ backup: out, selecionadas: selected.length, atualizadas: updated, semCorrespondencia: unmatched, restantesSemSubtema: (verify ?? []).length }, null, 2));
}
main().catch((error) => { console.error(`[media:link-subthemes] ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; });
