export const SECOES_RESUMO_PADRAO = [
  "Objetivos",
  "Pré-requisitos",
  "Síntese OMED",
  "Anatomia e fisiologia relevante",
  "Fisiopatologia",
  "Epidemiologia e fatores de risco",
  "Sinais e sintomas",
  "Diagnóstico e diferenciais",
  "Exames e interpretação",
  "Tratamento e conduta",
  "Complicações e prognóstico",
  "Armadilhas de prova",
  "Mapa mental",
  "Questões de fixação",
  "Casos relacionados",
] as const;

export type SecaoResumoPadrao = (typeof SECOES_RESUMO_PADRAO)[number];

export function idSecaoResumo(subtemaId: string, secao: string): string {
  const slug = secao
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${subtemaId}::${slug}`;
}
