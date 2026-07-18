/**
 * Domain types — the medical knowledge tree.
 * Pure data contracts, with zero dependency on Next, React, or the database.
 * Infrastructure adapters (filesystem now, Supabase later) implement access to these.
 */

export type Dificuldade = "fixacao" | "intermediaria" | "avancada";

export type EstiloQuestao =
  | "fixacao"
  | "intermediaria"
  | "avancada"
  | "caso"
  | "diagnostico"
  | "conduta"
  | "exame"
  | "imagem"
  | "omed"
  | "residencia";

/** A leaf of the knowledge tree. Carries the study content and links to questions/media. */
export interface Subtema {
  id: string;
  slug: string;
  nome: string;
  temaId: string;
  dificuldade: Dificuldade;
  /** True when real study content has been authored/imported; false = placeholder. */
  temConteudo: boolean;
  altoRendimento?: boolean; // high-yield for OMED
}

export interface Tema {
  id: string;
  slug: string;
  nome: string;
  disciplinaId: string;
  subtemas: Subtema[];
}

export interface Disciplina {
  id: string;
  slug: string;
  nome: string;
  grupo: GrupoDisciplina;
  /** Emoji/short mark used in the sidebar until we design proper icons. */
  marca: string;
  temas: Tema[];
  omed?: boolean; // part of the OMED clinical-cycle focus
}

export type GrupoDisciplina =
  | "Clínica Médica"
  | "Cirurgia"
  | "Materno-Infantil"
  | "Psiquiatria & Diagnóstico"
  | "Ciências Básicas"
  | "Saúde Coletiva & Emergência";

/** One structured section of a subtema summary (Definição, Fisiopatologia, ...). */
export interface BlocoConteudo {
  secao: string;
  corpo: string; // markdown
  /**
   * Figura(s) ancorada(s) a ESTA seção — id(s) do registry
   * (src/components/figuras/registry.tsx). É o que faz a imagem aparecer
   * exatamente onde ajuda a entender, em vez de numa galeria separada.
   *
   * Aceita uma ou várias: um mesmo trecho costuma pedir o esquema (diagrama)
   * E o achado como ele realmente aparece (imagem real).
   */
  figura?: string | string[];
}

export interface ConteudoSubtema {
  subtemaId: string;
  titulo: string;
  atualizadoEm: string;
  origem: "usuario_original" | "complemento_ia" | "atualizacao_diretriz" | "edicao_manual";
  blocos: BlocoConteudo[];
  referencias: string[];
}

export interface Alternativa {
  letra: string;
  texto: string;
  correta: boolean;
  comentario: string;
}

export interface Questao {
  id: string;
  subtemaId: string;
  disciplinaId: string;
  enunciado: string;
  alternativas: Alternativa[];
  dificuldade: Dificuldade;
  estilo: EstiloQuestao;
  tags: string[];
  fonte?: string;
}

/**
 * Caso clínico no formato das provas do Einstein: a vinheta é revelada por
 * etapas, e a cada etapa o estudante decide antes de ver a resposta — é o
 * raciocínio clínico que se treina, não a memória.
 */
export interface CasoClinico {
  id: string;
  disciplinaId: string;
  subtemaId?: string;
  titulo: string;
  resumo: string;
  dificuldade: Dificuldade;
  tags: string[];
  etapas: EtapaCaso[];
  discussao: string;
  referencias: string[];
}

export type TipoEtapa =
  | "historia"
  | "anamnese"
  | "exame_fisico"
  | "hipoteses"
  | "laboratorio"
  | "imagem"
  | "conduta"
  | "evolucao"
  | "desfecho";

export interface EtapaCaso {
  tipo: TipoEtapa;
  titulo: string;
  /** O que se apresenta ao estudante nesta etapa (markdown). */
  corpo: string;
  /** Figura ancorada a esta etapa (id no registry de figuras). */
  figura?: string;
  /** A pergunta feita ANTES de revelar a resposta. Sem pergunta, a etapa é
   *  apenas informativa e é exibida direto. */
  pergunta?: string;
  /** A resposta/raciocínio revelado após o estudante pensar (markdown). */
  resposta?: string;
}
