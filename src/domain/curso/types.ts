export const STATUS_CURSO = ["planejada", "cursando", "concluida", "revisar"] as const;
export type StatusCurso = (typeof STATUS_CURSO)[number];

export const ORIGENS_CURSO = ["manual", "markdown", "csv"] as const;
export type OrigemCurso = (typeof ORIGENS_CURSO)[number];

export interface DisciplinaCursoPrivado {
  disciplinaId: string;
  periodo: number | null;
  status: StatusCurso;
  dataInicio: string | null;
  dataFim: string | null;
  dificuldade: number | null;
  observacao: string;
  origem: OrigemCurso;
  criadoEm: string;
  atualizadoEm: string;
}

export interface EventoCursoPrivado {
  id: string;
  disciplinaId: string;
  tipo: "criada" | "atualizada" | "importada" | "removida";
  origem: OrigemCurso;
  campos: string[];
  criadoEm: string;
}

export interface EntradaCursoPrivado {
  disciplinaId: string;
  periodo?: number | null;
  status?: StatusCurso;
  dataInicio?: string | null;
  dataFim?: string | null;
  dificuldade?: number | null;
  observacao?: string;
  origem?: OrigemCurso;
}

export interface LinhaImportacaoCurso {
  linha: number;
  entrada?: EntradaCursoPrivado;
  erros: string[];
}
