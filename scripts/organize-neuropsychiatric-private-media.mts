/** Reclassifica o lote neuropsiquiÃ¡trico jÃ¡ armazenado, sem mover/deletar objetos. */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();
const out = resolve(process.argv.includes("--backup") ? process.argv[process.argv.indexOf("--backup") + 1] : "C:/Users/Adm/Desktop/MEDICINA/_private-corpus/batch-20260812-psiquiatria/catalogo-before-neuropsychiatric-organization-20260814.json");
type Row = { id: string; owner_id: string; object_path: string; titulo: string; fonte: string; pagina: number | null; disciplina: string; tema: string; subtema: string; subtema_id: string | null; modalidade: string; diagnostico: string; observacao: string; triagem_status: string; triagem_motivo: string };
type Classification = { disciplina: string; tema: string; subtema: string; subtema_id: string; modalidade: string };
const normal = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function classify(row: Row): Classification | null {
  const s = normal(`${row.fonte} ${row.titulo}`);
  if (s.includes("demenciais")) return { disciplina: "Neurologia", tema: "Síndromes demenciais", subtema: "Neuroimagem e causas tratáveis", subtema_id: "neuro--amnesias-e-sindromes-demenciais--diagnostico-e-conduta", modalidade: row.modalidade || "Neuroimagem e algoritmo clínico" };
  if (s.includes("neuroanatomia")) {
    if (s.includes("vascularizacao") || s.includes("territorio")) return { disciplina: "Neurologia", tema: "AVC isquêmico", subtema: "Diagnóstico e conduta", subtema_id: "neuro--avc-isquemico--diagnostico-e-conduta", modalidade: row.modalidade || "Anatomia vascular e neuroimagem" };
    if (s.includes("tumoral") || s.includes("massa cerebral")) return { disciplina: "Neurologia", tema: "Hipertensão intracraniana e delirium", subtema: "Diagnóstico e conduta", subtema_id: "neuro--hipertensao-intracraniana-e-delirium--diagnostico-e-conduta", modalidade: row.modalidade || "Neuroimagem" };
    return { disciplina: "Neurologia", tema: "Neuroanatomia clínica", subtema: "Localização neurológica", subtema_id: "neuro--neuroanatomia-clinica--localizacao-neurologica", modalidade: row.modalidade || "Atlas anatômico e neuroimagem" };
  }
  if (s.includes("hipnosedativos")) return { disciplina: "Psiquiatria", tema: "Sono e hipnosedativos", subtema: "Insônia e uso seguro", subtema_id: "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro", modalidade: row.modalidade || "Tabela farmacológica e segurança" };
  if (s.includes("psiquiatria")) {
    if (s.includes("antidepressiv") || s.includes("antipsicot") || s.includes("clozapina") || s.includes("psicofarmacologia")) return { disciplina: "Psiquiatria", tema: "Psicofarmacologia", subtema: "Princípios e monitorização", subtema_id: "psiq--psicofarmacologia--principios-e-monitorizacao", modalidade: row.modalidade || "Tabela farmacológica" };
    if (s.includes("risco de suic") || s.includes("agitacao") || s.includes("serotonerg") || s.includes("nmdar") || s.includes("delirium")) return { disciplina: "Psiquiatria", tema: "Emergências psiquiátricas", subtema: "Avaliação de segurança e risco suicida", subtema_id: "psiq--emergencias-psiquiatricas--avaliacao-de-seguranca-e-risco-suicida", modalidade: row.modalidade || "Algoritmo de segurança e emergência" };
    if (s.includes("episodio maniac")) return { disciplina: "Psiquiatria", tema: "Transtornos do humor", subtema: "Transtorno bipolar", subtema_id: "psiq--transtornos-do-humor--transtorno-bipolar", modalidade: row.modalidade || "Quadro clínico e critérios" };
    if (s.includes("panico") || s.includes("toc")) return { disciplina: "Psiquiatria", tema: "Ansiedade, pânico e TOC", subtema: "Diagnóstico e abordagem", subtema_id: "psiq--ansiedade-panico-e-toc--diagnostico-e-abordagem", modalidade: row.modalidade || "Quadro clínico e algoritmo" };
    if (s.includes("esquizofrenia") || s.includes("psicose") || s.includes("neuropsiquiatr") || s.includes("exames em psiquiatria") || s.includes("tc, rm") || s.includes("red flags") || s.includes("quando a sindrome")) return { disciplina: "Psiquiatria", tema: "Psicoses", subtema: "Primeiro episódio psicótico", subtema_id: "psiq--psicoses--primeiro-episodio-psicotico", modalidade: row.modalidade || "Neuroimagem, EEG e quadro clínico" };
    return { disciplina: "Psiquiatria", tema: "Entrevista e psicopatologia", subtema: "Anamnese e exame do estado mental", subtema_id: "psiq--entrevista-e-psicopatologia--anamnese-e-exame-do-estado-mental", modalidade: row.modalidade || "Resumo clínico" };
  }
  return null;
}

async function main() {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("midia_privada_usuario").select("id,owner_id,object_path,titulo,fonte,pagina,disciplina,tema,subtema,subtema_id,modalidade,diagnostico,observacao,triagem_status,triagem_motivo").limit(10000) as { data: Row[] | null; error: { message: string } | null };
  if (error) throw new Error(error.message);
  const rows = (data ?? []).filter((r) => {
    const source = normal(r.fonte);
    return source.includes("psiquiatria") || source.includes("demenciais") || source.includes("neuroanatomia");
  });
  if (!rows.length) throw new Error("Nenhuma linha neuropsiquiátrica encontrada.");
  const owner = rows[0].owner_id;
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2), "utf8");
  let updated = 0; let skipped = 0;
  for (const row of rows) {
    const c = classify(row);
    if (!c) { skipped += 1; continue; }
    const rights = " Direitos: recorte de PDF comercial; uso exclusivamente privado; licença não transferida.";
    const motivo = `${row.triagem_motivo || "Revisão visual concluída."} Fonte/página preservadas.${rights}`;
    const update = await db.from("midia_privada_usuario").update({ disciplina: c.disciplina, tema: c.tema, subtema: c.subtema, subtema_id: c.subtema_id, modalidade: c.modalidade, triagem_motivo: motivo }).eq("owner_id", owner).eq("id", row.id);
    if (update.error) throw new Error(`${row.id}: ${update.error.message}`);
    updated += 1;
  }
  const { data: verify, error: verifyError } = await db.from("midia_privada_usuario").select("id,disciplina,tema,subtema,subtema_id").eq("owner_id", owner).in("id", rows.map((r) => r.id));
  if (verifyError) throw new Error(verifyError.message);
  const missing = (verify ?? []).filter((r) => !r.subtema_id);
  if (missing.length) throw new Error(`${missing.length} linhas sem vínculo subtema após atualização.`);
  console.log(JSON.stringify({ backup: out, selecionadas: rows.length, atualizadas: updated, ignoradas: skipped, vinculadas: (verify ?? []).length }, null, 2));
}
main().catch((error) => { console.error(`[organize-neuropsychiatric] ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; });
