/**
 * Contrato mínimo do bootstrap da V2.
 *
 * Este módulo contém apenas tipos e guards puros: não consulta Supabase,
 * não inclui conteúdo médico e não pode ser usado para contornar autenticação.
 * O adapter remoto será conectado somente quando a V2 tiver runtime privado.
 */

export type V2Area = "today" | "learn" | "practice" | "recall" | "course";

export type V2BootstrapStatus =
  | "unauthenticated"
  | "not_authorized"
  | "ready";

export interface V2BootstrapCounts {
  dueRecall: number;
  todayTasks: number;
  openRemediations: number;
  recommendations: number;
}

export interface V2Bootstrap {
  version: "v2";
  status: Exclude<V2BootstrapStatus, "unauthenticated" | "not_authorized">;
  ownerId: string;
  defaultArea: V2Area;
  counts: V2BootstrapCounts;
  generatedAt: string;
}

export interface V2BootstrapDenied {
  version: "v2";
  status: Exclude<V2BootstrapStatus, "ready">;
}

export type V2BootstrapResult = V2Bootstrap | V2BootstrapDenied;

export function isV2BootstrapReady(
  value: V2BootstrapResult,
): value is V2Bootstrap {
  return value.status === "ready" && value.version === "v2";
}

