export const ESTADOS_SEMANA = ["ativa", "concluida", "arquivada"] as const;
export type EstadoSemana = (typeof ESTADOS_SEMANA)[number];

export const ORIGENS_SEMANA = ["manual", "agenda", "curso", "pdf", "atividade"] as const;
export type OrigemSemana = (typeof ORIGENS_SEMANA)[number];

export const PRIORIDADES_FOCO = ["alta", "media", "baixa"] as const;
export type PrioridadeFoco = (typeof PRIORIDADES_FOCO)[number];

export const ESTADOS_FOCO = ["confirmado", "sugerido", "rejeitado"] as const;
export type EstadoFoco = (typeof ESTADOS_FOCO)[number];

export const ATIVIDADES_SEMANA = ["resumo", "questoes", "caso", "revisao", "mapa", "pdf", "outro"] as const;
export type AtividadeSemana = (typeof ATIVIDADES_SEMANA)[number];

export const ESTADOS_TAREFA = ["pendente", "em_andamento", "concluida", "adiada"] as const;
export type EstadoTarefa = (typeof ESTADOS_TAREFA)[number];

export interface SemanaAtual {
  id: string;
  inicio: string;
  fim: string;
  periodo: number | null;
  objetivo: string;
  estado: EstadoSemana;
  origem: OrigemSemana;
  confirmada: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface FocoSemana {
  id: string;
  semanaId: string;
  disciplinaId: string;
  tema: string;
  subtema: string;
  prioridade: PrioridadeFoco;
  origem: OrigemSemana | "omed";
  confianca: number;
  estado: EstadoFoco;
  criadoEm: string;
  atualizadoEm: string;
}

export interface TarefaSemana {
  id: string;
  semanaId: string;
  data: string;
  titulo: string;
  atividade: AtividadeSemana;
  recursoId: string;
  disciplinaId: string;
  tema: string;
  duracaoMin: number | null;
  estado: EstadoTarefa;
  origem: OrigemSemana;
  criadoEm: string;
  atualizadoEm: string;
}

export interface EntradaSemana {
  inicio: string;
  fim: string;
  periodo?: number | null;
  objetivo?: string;
  confirmada?: boolean;
}

export interface EntradaFoco {
  disciplinaId: string;
  tema?: string;
  subtema?: string;
  prioridade?: PrioridadeFoco;
  origem?: FocoSemana["origem"];
  confianca?: number;
  estado?: EstadoFoco;
}

export interface EntradaTarefa {
  data: string;
  titulo: string;
  atividade?: AtividadeSemana;
  recursoId?: string;
  disciplinaId?: string;
  tema?: string;
  duracaoMin?: number | null;
  estado?: EstadoTarefa;
  origem?: OrigemSemana;
}

export interface SemanaAtualDados {
  semana: SemanaAtual | null;
  focos: FocoSemana[];
  tarefas: TarefaSemana[];
  remoto: boolean;
}
