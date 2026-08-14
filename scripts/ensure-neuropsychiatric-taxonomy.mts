/** Garante os nós de taxonomia necessários para a curadoria privada neuropsiquiátrica. */
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

const themes = [
  { id: "neuro--neuroanatomia-clinica", slug: "neuroanatomia-clinica", nome: "Neuroanatomia clínica", ordem: 14, disciplina_id: "neuro" },
  { id: "psiq--entrevista-e-psicopatologia", slug: "entrevista-e-psicopatologia", nome: "Entrevista e psicopatologia", ordem: 0 },
  { id: "psiq--ansiedade-panico-e-toc", slug: "ansiedade-panico-e-toc", nome: "Ansiedade, pânico e TOC", ordem: 2 },
  { id: "psiq--psicofarmacologia", slug: "psicofarmacologia", nome: "Psicofarmacologia", ordem: 4 },
  { id: "psiq--sono-e-hipnosedativos", slug: "sono-e-hipnosedativos", nome: "Sono e hipnosedativos", ordem: 5 },
  { id: "psiq--emergencias-psiquiatricas", slug: "emergencias-psiquiatricas", nome: "Emergências psiquiátricas", ordem: 6 },
];
const subthemes = [
  { id: "neuro--neuroanatomia-clinica--localizacao-neurologica", tema_id: "neuro--neuroanatomia-clinica", slug: "localizacao-neurologica", nome: "Localização neurológica", ordem: 0 },
  { id: "psiq--entrevista-e-psicopatologia--anamnese-e-exame-do-estado-mental", tema_id: "psiq--entrevista-e-psicopatologia", slug: "anamnese-e-exame-do-estado-mental", nome: "Anamnese e exame do estado mental", ordem: 0 },
  { id: "psiq--transtornos-do-humor--depressao-e-avaliacao-de-seguranca", tema_id: "psiq--transtornos-do-humor", slug: "depressao-e-avaliacao-de-seguranca", nome: "Depressão e avaliação de segurança", ordem: 0 },
  { id: "psiq--transtornos-do-humor--transtorno-bipolar", tema_id: "psiq--transtornos-do-humor", slug: "transtorno-bipolar", nome: "Transtorno bipolar", ordem: 1 },
  { id: "psiq--ansiedade-panico-e-toc--diagnostico-e-abordagem", tema_id: "psiq--ansiedade-panico-e-toc", slug: "diagnostico-e-abordagem", nome: "Diagnóstico e abordagem", ordem: 0 },
  { id: "psiq--psicoses--primeiro-episodio-psicotico", tema_id: "psiq--psicoses", slug: "primeiro-episodio-psicotico", nome: "Primeiro episódio psicótico", ordem: 0 },
  { id: "psiq--psicofarmacologia--principios-e-monitorizacao", tema_id: "psiq--psicofarmacologia", slug: "principios-e-monitorizacao", nome: "Princípios e monitorização", ordem: 0 },
  { id: "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro", tema_id: "psiq--sono-e-hipnosedativos", slug: "insonia-e-uso-seguro", nome: "Insônia e uso seguro", ordem: 0 },
  { id: "psiq--emergencias-psiquiatricas--avaliacao-de-seguranca-e-risco-suicida", tema_id: "psiq--emergencias-psiquiatricas", slug: "avaliacao-de-seguranca-e-risco-suicida", nome: "Avaliação de segurança e risco suicida", ordem: 0 },
];

async function main() {
  const db = getSupabaseAdmin();
  const { error: themeError } = await db.from("tema").upsert(themes.map((row) => ({ ...row, disciplina_id: row.disciplina_id ?? "psiq" })), { onConflict: "id" });
  if (themeError) throw new Error(themeError.message);
  const { error: subthemeError } = await db.from("subtema").upsert(subthemes.map((row) => ({ ...row, dificuldade: "avancada", tem_conteudo: true, alto_rendimento: true })), { onConflict: "id" });
  if (subthemeError) throw new Error(subthemeError.message);
  console.log(JSON.stringify({ temas: themes.length, subtemas: subthemes.length }, null, 2));
}
main().catch((error) => { console.error(`[ensure-neuropsychiatric-taxonomy] ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; });
