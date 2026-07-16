import { DISCIPLINAS, GRUPOS } from "@/content/taxonomy";
import { CONTEUDOS } from "@/content/conteudos";
import { QUESTOES } from "@/content/questoes";
import type {
  ConteudoSubtema,
  Disciplina,
  GrupoDisciplina,
  Questao,
} from "@/domain/content/types";
import type {
  ContentRepository,
  QuestaoFiltro,
  SearchHit,
  Stats,
  SubtemaLocalizado,
} from "@/application/ports/content-repository";

/**
 * StaticContentRepository — reads the knowledge tree from the bundled seed data.
 *
 * This is the zero-infrastructure backend: it lets the whole app run locally with
 * no database. It implements the exact same contract as the Supabase backend, so
 * the UI cannot tell them apart.
 */
export class StaticContentRepository implements ContentRepository {
  async getDisciplinas(): Promise<Disciplina[]> {
    return DISCIPLINAS;
  }

  async getGrupos(): Promise<GrupoDisciplina[]> {
    return GRUPOS;
  }

  async getDisciplina(slug: string): Promise<Disciplina | undefined> {
    return DISCIPLINAS.find((d) => d.slug === slug);
  }

  async getDisciplinaById(id: string): Promise<Disciplina | undefined> {
    return DISCIPLINAS.find((d) => d.id === id);
  }

  async getSubtemaById(id: string): Promise<SubtemaLocalizado | undefined> {
    for (const disciplina of DISCIPLINAS) {
      for (const tema of disciplina.temas) {
        const subtema = tema.subtemas.find((s) => s.id === id);
        if (subtema) return { subtema, tema, disciplina };
      }
    }
    return undefined;
  }

  async getConteudo(subtemaId: string): Promise<ConteudoSubtema | undefined> {
    return CONTEUDOS[subtemaId];
  }

  async getQuestoes(filtro?: QuestaoFiltro): Promise<Questao[]> {
    return QUESTOES.filter((q) => {
      if (filtro?.disciplinaId && q.disciplinaId !== filtro.disciplinaId) return false;
      if (filtro?.subtemaId && q.subtemaId !== filtro.subtemaId) return false;
      return true;
    });
  }

  async getStats(): Promise<Stats> {
    const temas = DISCIPLINAS.flatMap((d) => d.temas);
    const subtemas = temas.flatMap((t) => t.subtemas);
    return {
      disciplinas: DISCIPLINAS.length,
      disciplinasOmed: DISCIPLINAS.filter((d) => d.omed).length,
      temas: temas.length,
      subtemas: subtemas.length,
      subtemasComConteudo: subtemas.filter((s) => s.temConteudo).length,
      questoes: QUESTOES.length,
    };
  }

  async search(query: string): Promise<SearchHit[]> {
    const q = normalize(query);
    if (q.length < 2) return [];
    const hits: SearchHit[] = [];

    for (const d of DISCIPLINAS) {
      if (normalize(d.nome).includes(q)) {
        hits.push({ tipo: "disciplina", titulo: d.nome, contexto: d.grupo, href: `/biblioteca/${d.slug}` });
      }
      for (const t of d.temas) {
        if (normalize(t.nome).includes(q)) {
          hits.push({ tipo: "tema", titulo: t.nome, contexto: d.nome, href: `/biblioteca/${d.slug}` });
        }
        for (const s of t.subtemas) {
          if (normalize(s.nome).includes(q)) {
            hits.push({
              tipo: "subtema",
              titulo: s.nome,
              contexto: `${d.nome} · ${t.nome}`,
              href: `/estudar/${encodeURIComponent(s.id)}`,
            });
          }
        }
      }
    }
    for (const question of QUESTOES) {
      if (normalize(question.enunciado).includes(q) || question.tags.some((tag) => normalize(tag).includes(q))) {
        hits.push({
          tipo: "questao",
          titulo: question.enunciado.slice(0, 80) + "…",
          contexto: "Questão",
          href: "/questoes",
        });
      }
    }
    return hits.slice(0, 30);
  }
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
