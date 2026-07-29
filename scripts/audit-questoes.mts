import { QUESTOES } from "../src/content/questoes";

type LinhaAuditoria = {
  chave: string;
  questoes: number;
  repetidasExatas: number;
  repetidasNormalizadas: number;
  alternativasRepetidasNormalizadas: number;
  questoesComComentarioCurto: number;
  comentariosCurtos: number;
  comentariosVazios: number;
  semFonte: number;
};

const args = process.argv.slice(2);
const indiceDisciplina = args.indexOf("--disciplina");
const disciplinaSelecionada =
  indiceDisciplina >= 0 ? args[indiceDisciplina + 1] : undefined;
const detalharSubtemas = args.includes("--subtemas");
const listarIds = args.includes("--ids");

if (indiceDisciplina >= 0 && !disciplinaSelecionada) {
  throw new Error("Use --disciplina seguido do ID da disciplina.");
}

const normalizarComentario = (comentario: string) =>
  comentario.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");

const contarRepetidas = (comentarios: string[]) => {
  const ocorrencias = new Map<string, number>();
  for (const comentario of comentarios) {
    ocorrencias.set(comentario, (ocorrencias.get(comentario) ?? 0) + 1);
  }

  return Array.from(ocorrencias.values())
    .filter((quantidade) => quantidade > 1)
    .reduce((soma, quantidade) => soma + quantidade, 0);
};

const criarLinha = (chave: string): LinhaAuditoria => ({
  chave,
  questoes: 0,
  repetidasExatas: 0,
  repetidasNormalizadas: 0,
  alternativasRepetidasNormalizadas: 0,
  questoesComComentarioCurto: 0,
  comentariosCurtos: 0,
  comentariosVazios: 0,
  semFonte: 0,
});

const registrar = (linha: LinhaAuditoria, questao: (typeof QUESTOES)[number]) => {
  linha.questoes += 1;

  const comentariosAparados = questao.alternativas.map((alternativa) =>
    alternativa.comentario.trim(),
  );
  const repetidasExatas = contarRepetidas(comentariosAparados);
  const repetidasNormalizadas = contarRepetidas(
    comentariosAparados.map(normalizarComentario),
  );
  if (repetidasExatas > 0) linha.repetidasExatas += 1;
  if (repetidasNormalizadas > 0) {
    linha.repetidasNormalizadas += 1;
    linha.alternativasRepetidasNormalizadas += repetidasNormalizadas;
  }

  const curtos = comentariosAparados.filter(
    (comentario) => comentario.length < 40,
  ).length;
  if (curtos > 0) {
    linha.questoesComComentarioCurto += 1;
    linha.comentariosCurtos += curtos;
  }
  linha.comentariosVazios += comentariosAparados.filter(
    (comentario) => comentario.length === 0,
  ).length;
  if (!questao.fonte?.trim()) linha.semFonte += 1;
};

const questoes = disciplinaSelecionada
  ? QUESTOES.filter((questao) => questao.disciplinaId === disciplinaSelecionada)
  : QUESTOES;

const porDisciplina = new Map<string, LinhaAuditoria>();
const porSubtema = new Map<string, LinhaAuditoria>();
const ids = {
  repetidasNormalizadas: [] as string[],
  comentariosCurtos: [] as string[],
  semFonte: [] as string[],
};
for (const questao of questoes) {
  const linhaDisciplina =
    porDisciplina.get(questao.disciplinaId) ?? criarLinha(questao.disciplinaId);
  registrar(linhaDisciplina, questao);
  porDisciplina.set(questao.disciplinaId, linhaDisciplina);

  if (detalharSubtemas) {
    const linhaSubtema =
      porSubtema.get(questao.subtemaId) ?? criarLinha(questao.subtemaId);
    registrar(linhaSubtema, questao);
    porSubtema.set(questao.subtemaId, linhaSubtema);
  }

  const comentarios = questao.alternativas.map((alternativa) =>
    alternativa.comentario.trim(),
  );
  if (contarRepetidas(comentarios.map(normalizarComentario)) > 0) {
    ids.repetidasNormalizadas.push(questao.id);
  }
  if (comentarios.some((comentario) => comentario.length < 40)) {
    ids.comentariosCurtos.push(questao.id);
  }
  if (!questao.fonte?.trim()) ids.semFonte.push(questao.id);
}

const ordenar = (linhas: LinhaAuditoria[]) =>
  linhas.sort(
    (a, b) =>
      b.repetidasNormalizadas - a.repetidasNormalizadas ||
      b.comentariosCurtos - a.comentariosCurtos ||
      b.semFonte - a.semFonte ||
      a.chave.localeCompare(b.chave, "pt-BR"),
  );

const total = Array.from(porDisciplina.values()).reduce(
  (acumulado, linha) => {
    for (const chave of Object.keys(acumulado) as Array<keyof LinhaAuditoria>) {
      if (chave !== "chave") acumulado[chave] += linha[chave] as number;
    }
    return acumulado;
  },
  criarLinha("total"),
);

console.log(
  JSON.stringify(
    {
      criterios: {
        repetidaExata:
          "dois ou mais comentários idênticos, após remover espaços nas extremidades, na mesma questão",
        repetidaNormalizada:
          "dois ou mais comentários iguais após remover espaços nas extremidades, colapsar espaços internos e ignorar maiúsculas/minúsculas, na mesma questão",
        comentarioCurto: "comentário com menos de 40 caracteres após aparar espaços",
        semFonte: "campo fonte ausente ou vazio",
      },
      filtro: disciplinaSelecionada ? { disciplina: disciplinaSelecionada } : null,
      total,
      porDisciplina: ordenar(Array.from(porDisciplina.values())),
      ...(detalharSubtemas
        ? { porSubtema: ordenar(Array.from(porSubtema.values())) }
        : {}),
      ...(listarIds ? { ids } : {}),
    },
    null,
    2,
  ),
);
