import type {
  ConteudoSubtema,
  Disciplina,
  GrupoDisciplina,
  Questao,
  Subtema,
  Tema,
} from "@/domain/content/types";

/**
 * ContentRepository — the port (interface) through which the application reads
 * the knowledge tree. Deliberately async so that any backend (in-memory static
 * seed, Supabase/Postgres, a future API) satisfies the same contract.
 *
 * Pages and use-cases depend ONLY on this interface, never on a concrete backend.
 * Swapping the static seed for Supabase is a one-line change in the factory
 * (see infra/content/index.ts) — no UI or use-case code changes.
 */
export interface ContentRepository {
  getDisciplinas(): Promise<Disciplina[]>;
  getGrupos(): Promise<GrupoDisciplina[]>;
  getDisciplina(slug: string): Promise<Disciplina | undefined>;
  getDisciplinaById(id: string): Promise<Disciplina | undefined>;
  getSubtemaById(id: string): Promise<SubtemaLocalizado | undefined>;
  getConteudo(subtemaId: string): Promise<ConteudoSubtema | undefined>;
  getQuestoes(filtro?: QuestaoFiltro): Promise<Questao[]>;
  getStats(): Promise<Stats>;
  search(query: string): Promise<SearchHit[]>;
}

export interface SubtemaLocalizado {
  subtema: Subtema;
  tema: Tema;
  disciplina: Disciplina;
}

export interface QuestaoFiltro {
  disciplinaId?: string;
  subtemaId?: string;
}

export interface Stats {
  disciplinas: number;
  disciplinasOmed: number;
  temas: number;
  subtemas: number;
  subtemasComConteudo: number;
  questoes: number;
}

export interface SearchHit {
  tipo: "disciplina" | "tema" | "subtema" | "questao";
  titulo: string;
  contexto: string;
  href: string;
}
