export type QuestionConfidence = "low" | "medium" | "high";

export interface QuestionAttempt {
  id?: string;
  questionId: string;
  subtemaId: string;
  selectedAlternativeLetter?: string;
  correct: boolean;
  confidence?: QuestionConfidence;
  elapsedMs?: number;
  attemptedAt: string;
  legacyResponseId?: string;
}

export interface Remediation {
  id: string;
  subtemaId: string;
  sourceQuestionId: string;
  reason: "incorrect" | "low_confidence" | "slow_response";
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

export function remediationForAttempt(attempt: QuestionAttempt): Remediation | null {
  const reason = !attempt.correct ? "incorrect" : attempt.confidence === "low" ? "low_confidence" : attempt.elapsedMs && attempt.elapsedMs > 180000 ? "slow_response" : null;
  if (!reason) return null;
  return { id: `rem-${attempt.questionId}-${attempt.attemptedAt}`, subtemaId: attempt.subtemaId, sourceQuestionId: attempt.questionId, reason, status: "open", createdAt: attempt.attemptedAt };
}
