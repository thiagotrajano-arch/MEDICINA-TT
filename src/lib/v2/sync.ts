import { listQuestionAttempts } from "./question-local";
import { listRecallCards } from "./recall-local";

export interface V2SyncResult {
  status: "offline" | "not_authorized" | "synced" | "partial";
  recallCards: number;
  questionAttempts: number;
  errors: string[];
}

async function clientAndOwner() {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) return null;
  const bootstrap = await supabase.rpc("get_app_bootstrap_v2");
  if (bootstrap.error) return { supabase, ownerId: "", authorized: false };
  return { supabase, ownerId: session.session.user.id, authorized: true };
}

/**
 * Envia somente cópias locais para as tabelas V2 protegidas por RLS.
 * A fila local é a fonte de segurança durante falhas de rede: este método nunca
 * remove dados do dispositivo e pode ser repetido sem sobrescrever outro owner.
 */
export async function syncV2LocalFirst(): Promise<V2SyncResult> {
  const cards = listRecallCards();
  const attempts = listQuestionAttempts();
  const auth = await clientAndOwner();
  if (!auth) return { status: "offline", recallCards: 0, questionAttempts: 0, errors: [] };
  if (!auth.authorized) return { status: "not_authorized", recallCards: 0, questionAttempts: 0, errors: [] };

  const errors: string[] = [];
  let syncedCards = 0;
  let syncedAttempts = 0;
  const attemptsWithSelection = attempts.filter((attempt) => attempt.selectedAlternativeLetter);
  const alternativeByQuestion = new Map<string, Array<{ id: string; letra: string; correta: boolean }>>();
  if (attemptsWithSelection.length) {
    const questionIds = [...new Set(attemptsWithSelection.map((attempt) => attempt.questionId))];
    const { data, error } = await auth.supabase
      .from("alternativa")
      .select("id,questao_id,letra,correta")
      .in("questao_id", questionIds);
    if (error) errors.push(`alternatives:${error.message}`);
    for (const alternative of (data ?? []) as Array<{ id: string; questao_id: string; letra: string; correta: boolean }>) {
      const list = alternativeByQuestion.get(alternative.questao_id) ?? [];
      list.push({ id: alternative.id, letra: alternative.letra, correta: alternative.correta });
      alternativeByQuestion.set(alternative.questao_id, list);
    }
  }
  for (const card of cards) {
    const { error } = await auth.supabase.from("recall_card").upsert({
      id: card.id, owner_id: auth.ownerId, subtema_id: card.subtemaId || null,
      card_type: card.kind, front: card.front, back: card.back, tags: [],
      origin_type: "manual", status: "active",
    }, { onConflict: "id" });
    if (error) { errors.push(`card:${card.id}:${error.message}`); continue; }
    const { error: stateError } = await auth.supabase.from("recall_state").upsert({
      card_id: card.id, owner_id: auth.ownerId, state: card.state, due_at: card.dueAt,
      stability: 0, difficulty: 0, elapsed_days: 0, scheduled_days: 0,
      reps: card.reps, lapses: card.lapses, fsrs_version: "local-mvp", scheduler_data: {},
    }, { onConflict: "card_id" });
    if (stateError) errors.push(`state:${card.id}:${stateError.message}`); else syncedCards += 1;
  }
  for (const attempt of attempts) {
    if (!attempt.selectedAlternativeLetter) {
      errors.push(`attempt:${attempt.questionId}:missing_selected_alternative`);
      continue;
    }
    const alternatives = alternativeByQuestion.get(attempt.questionId) ?? [];
    const selectedAlternative = alternatives.find((alternative) => alternative.letra === attempt.selectedAlternativeLetter);
    const correctAlternative = alternatives.find((alternative) => alternative.correta);
    if (!selectedAlternative || !correctAlternative) {
      errors.push(`attempt:${attempt.questionId}:alternative_not_found`);
      continue;
    }
    const { error } = await auth.supabase.rpc("record_question_attempt_v2", {
      p_question_id: attempt.questionId, p_selected_alternative_id: selectedAlternative.id,
      p_correct_alternative_id: correctAlternative.id, p_is_correct: selectedAlternative.correta,
      p_confidence: attempt.confidence ?? null,
      p_error_type: selectedAlternative.correta ? null : "other", p_response_ms: attempt.elapsedMs ?? null,
      p_changed_answer: false, p_clinical_axis: null, p_source_mode: "v2-local-mvp",
      p_session_id: null, p_legacy_response_id: attempt.legacyResponseId ?? null,
      p_metadata: { attempted_at: attempt.attemptedAt, client_attempt_id: attempt.id ?? null },
    });
    if (error) errors.push(`attempt:${attempt.questionId}:${error.message}`); else syncedAttempts += 1;
  }
  return { status: errors.length ? "partial" : "synced", recallCards: syncedCards, questionAttempts: syncedAttempts, errors };
}

export async function getV2Bootstrap(): Promise<Record<string, unknown> | null> {
  const auth = await clientAndOwner();
  if (!auth?.authorized) return null;
  const { data, error } = await auth.supabase.rpc("get_app_bootstrap_v2");
  return error ? null : data as Record<string, unknown>;
}
