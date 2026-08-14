/**
 * Recalcula a cobertura do acervo estatico sem inferir lacunas por nome.
 * A unidade de analise e o subtema da taxonomia: resumo, questoes e casos sao
 * contados apenas quando apontam para o mesmo subtemaId.
 */
import { DISCIPLINAS } from "../src/content/taxonomy";
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";
import { CASOS } from "../src/content/casos";

type Row = {
  disciplinaId: string;
  disciplina: string;
  grupo: string;
  omed: boolean;
  subtemas: number;
  resumos: number;
  semResumo: number;
  questoes: number;
  subtemasComQuestoes: number;
  casos: number;
  subtemasComCasos: number;
};

const rows: Row[] = [];
const lacunasResumo: Array<{ disciplinaId: string; subtemaId: string; subtema: string; altoRendimento: boolean }> = [];

for (const disciplina of DISCIPLINAS) {
  const subtemas = disciplina.temas.flatMap((tema) => tema.subtemas);
  const ids = new Set(subtemas.map((subtema) => subtema.id));
  const questionCounts = new Map<string, number>();
  for (const question of QUESTOES) {
    if (!ids.has(question.subtemaId)) continue;
    questionCounts.set(question.subtemaId, (questionCounts.get(question.subtemaId) ?? 0) + 1);
  }
  const caseCounts = new Map<string, number>();
  for (const caso of CASOS) {
    if (!caso.subtemaId || !ids.has(caso.subtemaId)) continue;
    caseCounts.set(caso.subtemaId, (caseCounts.get(caso.subtemaId) ?? 0) + 1);
  }
  let resumos = 0;
  let semResumo = 0;
  for (const subtema of subtemas) {
    if (CONTEUDOS[subtema.id]) resumos += 1;
    else {
      semResumo += 1;
      lacunasResumo.push({ disciplinaId: disciplina.id, subtemaId: subtema.id, subtema: subtema.nome, altoRendimento: subtema.altoRendimento === true });
    }
  }
  rows.push({
    disciplinaId: disciplina.id,
    disciplina: disciplina.nome,
    grupo: disciplina.grupo,
    omed: disciplina.omed === true,
    subtemas: subtemas.length,
    resumos,
    semResumo,
    questoes: [...questionCounts.values()].reduce((sum, value) => sum + value, 0),
    subtemasComQuestoes: questionCounts.size,
    casos: [...caseCounts.values()].reduce((sum, value) => sum + value, 0),
    subtemasComCasos: caseCounts.size,
  });
}

const totals = rows.reduce(
  (acc, row) => ({
    subtemas: acc.subtemas + row.subtemas,
    resumos: acc.resumos + row.resumos,
    semResumo: acc.semResumo + row.semResumo,
    questoes: acc.questoes + row.questoes,
    casos: acc.casos + row.casos,
    subtemasComQuestoes: acc.subtemasComQuestoes + row.subtemasComQuestoes,
    subtemasComCasos: acc.subtemasComCasos + row.subtemasComCasos,
  }),
  { subtemas: 0, resumos: 0, semResumo: 0, questoes: 0, casos: 0, subtemasComQuestoes: 0, subtemasComCasos: 0 }
);

console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  criterio: "subtemaId da taxonomia; conteudo, questoes e casos somente quando apontam para a mesma chave",
  fontes: { disciplinas: DISCIPLINAS.length, conteudos: Object.keys(CONTEUDOS).length, questoes: QUESTOES.length, casos: CASOS.length },
  totais: { ...totals, subtemasSemQuestao: totals.subtemas - totals.subtemasComQuestoes, subtemasSemCaso: totals.subtemas - totals.subtemasComCasos },
  lacunasResumo,
  porDisciplina: rows,
}, null, 2));
