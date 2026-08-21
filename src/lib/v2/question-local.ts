import type { QuestionAttempt, Remediation } from "@/domain/v2";
import { remediationForAttempt } from "@/domain/v2";
import { saveV2Snapshot } from "./indexed-db";

const ATTEMPTS_KEY = "codex-medicus:v2:question-attempts";
const REMEDIATIONS_KEY = "codex-medicus:v2:remediations";

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
