/**
 * Cria filas privadas e rastreáveis para conteúdo ainda não publicado.
 * Não escreve no Supabase, não altera o banco público e não gera conteúdo clínico.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { DISCIPLINAS } from "../src/content/taxonomy";
import { CONTEUDOS } from "../src/content/conteudos";
import { QUESTOES } from "../src/content/questoes";
import { CASOS } from "../src/content/casos";

type Reconciliation = {
  generatedAt: string;
  totals: { localOnly: number; byStatus: { novo: number; duplicadoPorConteudo: number; revisar: number } };
  candidates: Array<{
    id: string;
    disciplinaId: string;
    subtemaId: string;
    status: string;
    tagsCount: number;
    hasSource: boolean;
    validSubtopic: boolean;
  }>;
};

type QueueRow = {
  disciplinaId: string;
  disciplina: string;
  temaId: string;
  tema: string;
  subtemaId: string;
  subtema: string;
  omed: boolean;
  altoRendimento: boolean;
  resumo: boolean;
  questoes: number;
  casos: number;
  prioridade: number;
  motivos: string[];
};

const outputDir = resolve("exports/private");

function findTaxonomyRow(subtemaId: string) {
  for (const disciplina of DISCIPLINAS) {
    for (const tema of disciplina.temas) {
      const subtema = tema.subtemas.find((item) => item.id === subtemaId);
      if (subtema) return { disciplina, tema, subtema };
    }
  }
  return undefined;
}

function score(row: { omed: boolean; altoRendimento: boolean; resumo: boolean; questoes: number; casos: number }) {
  let prioridade = row.omed ? 100 : 0;
  if (row.altoRendimento) prioridade += 40;
  if (!row.resumo) prioridade += 30;
  if (row.questoes === 0) prioridade += 25;
  if (row.casos === 0) prioridade += 15;
  return prioridade;
}

async function latestReconciliation(): Promise<string> {
  const files = (await readdir(outputDir)).filter((file) => /^reconciliacao-questoes-\d{4}-\d{2}-\d{2}\.json$/.test(file)).sort();
  const latest = files.at(-1);
  if (!latest) throw new Error("Nenhuma reconciliação privada de questões encontrada.");
  return join(outputDir, latest);
}

async function main() {
  const reconciliationPath = await latestReconciliation();
  const reconciliation = JSON.parse(await readFile(reconciliationPath, "utf8")) as Reconciliation;
  const questionCounts = new Map<string, number>();
  for (const question of QUESTOES) questionCounts.set(question.subtemaId, (questionCounts.get(question.subtemaId) ?? 0) + 1);
  const caseCounts = new Map<string, number>();
  for (const caso of CASOS) if (caso.subtemaId) caseCounts.set(caso.subtemaId, (caseCounts.get(caso.subtemaId) ?? 0) + 1);

  const coverage: QueueRow[] = [];
  for (const disciplina of DISCIPLINAS) for (const tema of disciplina.temas) for (const subtema of tema.subtemas) {
    const row = {
      disciplinaId: disciplina.id,
      disciplina: disciplina.nome,
      temaId: tema.id,
      tema: tema.nome,
      subtemaId: subtema.id,
      subtema: subtema.nome,
      omed: disciplina.omed === true,
      altoRendimento: subtema.altoRendimento === true,
      resumo: Boolean(CONTEUDOS[subtema.id]),
      questoes: questionCounts.get(subtema.id) ?? 0,
      casos: caseCounts.get(subtema.id) ?? 0,
    };
    const motivos: string[] = [];
    if (!row.resumo) motivos.push("sem_resumo");
    if (row.questoes === 0) motivos.push("sem_questao");
    if (row.casos === 0) motivos.push("sem_caso");
    if (motivos.length) coverage.push({ ...row, prioridade: score(row), motivos });
  }
  coverage.sort((a, b) => b.prioridade - a.prioridade || a.disciplina.localeCompare(b.disciplina, "pt-BR") || a.subtema.localeCompare(b.subtema, "pt-BR"));

  const questionQueue = reconciliation.candidates.map((candidate) => {
    const taxonomy = findTaxonomyRow(candidate.subtemaId);
    return {
      id: candidate.id,
      disciplinaId: candidate.disciplinaId,
      disciplina: taxonomy?.disciplina.nome ?? candidate.disciplinaId,
      temaId: taxonomy?.tema.id ?? null,
      tema: taxonomy?.tema.nome ?? null,
      subtemaId: candidate.subtemaId,
      subtema: taxonomy?.subtema.nome ?? null,
      status: candidate.status,
      tagsCount: candidate.tagsCount,
      hasSource: candidate.hasSource,
      validSubtopic: candidate.validSubtopic,
      acao: "revisao_editorial_manual; nenhuma insercao automatica",
    };
  });

  const report = {
    generatedAt: new Date().toISOString(),
    privateOnly: true,
    noMutation: true,
    noClinicalGeneration: true,
    source: { reconciliation: reconciliationPath, localQuestions: QUESTOES.length, localCases: CASOS.length, taxonomySubthemes: DISCIPLINAS.flatMap((item) => item.temas.flatMap((topic) => topic.subtemas)).length },
    rules: {
      questionQueue: "candidatos locais ausentes do catálogo remoto; todo item exige revisão de proveniência, gabarito, explicação e licença antes de publicação",
      gapQueue: "subtemaId exato; prioridade = OMED 100 + alto rendimento 40 + sem resumo 30 + sem questão 25 + sem caso 15",
      privateMaterial: "nenhum arquivo de Drive ou mídia é copiado para o repositório público por esta rotina",
    },
    totals: {
      questionCandidates: questionQueue.length,
      questionCandidatesByStatus: reconciliation.totals.byStatus,
      gapSubthemes: coverage.length,
      withoutSummary: coverage.filter((row) => !row.resumo).length,
      withoutQuestion: coverage.filter((row) => row.questoes === 0).length,
      withoutCase: coverage.filter((row) => row.casos === 0).length,
    },
    questionQueue,
    gapQueue: coverage,
  };
  await mkdir(outputDir, { recursive: true });
  const out = join(outputDir, `fila-conteudo-privada-${new Date().toISOString().slice(0, 10)}.json`);
  await writeFile(out, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ output: out, totals: report.totals, topGaps: coverage.slice(0, 10) }, null, 2));
}

main().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
