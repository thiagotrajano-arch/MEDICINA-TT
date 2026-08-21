import type { QuestionAttempt, Remediation } from "@/domain/v2";
import { remediationForAttempt } from "@/domain/v2";
import { saveV2Snapshot } from "./indexed-db";
import { sincronizarProgresso } from "@/lib/progresso";

const ATTEMPTS_KEY = "codex-medicus:v2:question-attempts";
const REMEDIATIONS_KEY = "codex-medicus:v2:remediations";
const LEGACY_MIGRATED_KEY = "codex-medicus:v2:legacy-response-ids";

function storage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(storage()?.getItem(key) ?? "null") ?? fallback; } catch { return fallback; }
}

function write<T>(key: string, value: T): void {
  storage()?.setItem(key, JSON.stringify(value));
  void saveV2Snapshot(key, value).catch(() => undefined);
}

export function listQuestionAttempts(): QuestionAttempt[] {
  return read<QuestionAttempt[]>(ATTEMPTS_KEY, []);
}

export function listOpenRemediations(): Remediation[] {
  return read<Remediation[]>(REMEDIATIONS_KEY, []).filter((item) => item.status !== "resolved");
}

export function recordQuestionAttempt(attempt: QuestionAttempt): Remediation | null {
  write(ATTEMPTS_KEY, [...listQuestionAttempts(), attempt]);
  const remediation = remediationForAttempt(attempt);
  if (remediation) write(REMEDIATIONS_KEY, [...read<Remediation[]>(REMEDIATIONS_KEY, []), remediation]);
  return remediation;
}

export function resolveRemediation(id: string): void {
  write(REMEDIATIONS_KEY, read<Remediation[]>(REMEDIATIONS_KEY, []).map((item) => item.id === id ? { ...item, status: "resolved" } : item));
}

/** Importa respostas legadas sem apagar nem duplicar o histórico. */
export async function migrateLegacyQuestionHistory(): Promise<number> {
  const legacy = await sincronizarProgresso();
  if (!legacy.sincronizado) return 0;
  const migrated = new Set(read<string[]>(LEGACY_MIGRATED_KEY, []));
  const additions = legacy.respostas
    .filter((item) => item.id && !migrated.has(item.id))
    .map((item) => ({
      questionId: item.questaoId,
      subtemaId: "legacy-import",
      correct: item.correta,
      attemptedAt: new Date(item.em).toISOString(),
      legacyResponseId: item.id,
    }));
  if (!additions.length) return 0;
  for (const attempt of additions) {
    const remediation = remediationForAttempt(attempt);
    if (remediation) write(REMEDIATIONS_KEY, [...read<Remediation[]>(REMEDIATIONS_KEY, []), remediation]);
  }
  write(ATTEMPTS_KEY, [...listQuestionAttempts(), ...additions]);
  write(LEGACY_MIGRATED_KEY, [...migrated, ...additions.map((item) => item.legacyResponseId!).slice(-20000)]);
  return additions.length;
}
