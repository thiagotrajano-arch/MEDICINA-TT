import type { CasoClinico, ConteudoSubtema, Disciplina, Questao, Subtema } from "@/domain/content/types";
import type { RecursosPublicosDisciplina, TopicoRecomendadoPublico } from "@/domain/curso/recursos-publicos";

export function criarRecursosPublicosPorDisciplina({
  disciplinas,
  conteudos,
  questoes,
  casos,
}: {
  disciplinas: Disciplina[];
  conteudos: Record<string, ConteudoSubtema>;
  questoes: Questao[];
  casos: CasoClinico[];
}): RecursosPublicosDisciplina[] {
  const localizacao = new Map<string, { disciplinaId: string; subtema: Subtema }>();
  for (const disciplina of disciplinas) {
    for (const tema of disciplina.temas) {
      for (const subtema of tema.subtemas) localizacao.set(subtema.id, { disciplinaId: disciplina.id, subtema });
    }
  }

  const figurasPorDisciplina = new Map<string, Set<string>>();
  for (const conteudo of Object.values(conteudos)) {
    const local = localizacao.get(conteudo.subtemaId);
    if (!local) continue;
    const figuras = conteudo.blocos.flatMap((bloco) => bloco.figura ? (Array.isArray(bloco.figura) ? bloco.figura : [bloco.figura]) : []);
    if (!figuras.length) continue;
    const registradas = figurasPorDisciplina.get(local.disciplinaId) ?? new Set<string>();
    figuras.forEach((figura) => registradas.add(figura));
    figurasPorDisciplina.set(local.disciplinaId, registradas);
  }
  for (const caso of casos) {
    const registradas = figurasPorDisciplina.get(caso.disciplinaId) ?? new Set<string>();
    caso.etapas.forEach((etapa) => { if (etapa.figura) registradas.add(etapa.figura); });
    if (registradas.size) figurasPorDisciplina.set(caso.disciplinaId, registradas);
  }

  return disciplinas.map((disciplina) => {
    const subtemas = disciplina.temas.flatMap((tema) => tema.subtemas);
    const recomendados = ordenarTopicos(subtemas).filter((subtema) => conteudos[subtema.id]).slice(0, 3).map((subtema) => ({
      subtemaId: subtema.id,
      nome: subtema.nome,
      href: `/estudar/${encodeURIComponent(subtema.id)}`,
      motivo: subtema.altoRendimento ? "alto_rendimento" : "conteudo_disponivel",
    } satisfies TopicoRecomendadoPublico));

    return {
      disciplinaId: disciplina.id,
      slug: disciplina.slug,
      nome: disciplina.nome,
      marca: disciplina.marca,
      temas: disciplina.temas.length,
      subtemas: subtemas.length,
      resumos: subtemas.filter((subtema) => Boolean(conteudos[subtema.id])).length,
      questoes: questoes.filter((questao) => questao.disciplinaId === disciplina.id).length,
      casos: casos.filter((caso) => caso.disciplinaId === disciplina.id).length,
      figuras: figurasPorDisciplina.get(disciplina.id)?.size ?? 0,
      lacunasDeConteudo: subtemas.filter((subtema) => !conteudos[subtema.id]).length,
      topicosRecomendados: recomendados,
    };
  });
}

function ordenarTopicos(subtemas: Subtema[]): Subtema[] {
  const dificuldade = { avancada: 0, intermediaria: 1, fixacao: 2 } as const;
  return [...subtemas].sort((a, b) => Number(Boolean(b.altoRendimento)) - Number(Boolean(a.altoRendimento)) || dificuldade[a.dificuldade] - dificuldade[b.dificuldade] || a.nome.localeCompare(b.nome, "pt-BR"));
}
