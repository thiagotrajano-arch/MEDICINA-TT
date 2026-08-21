export type RecallRating = "again" | "hard" | "good" | "easy";
export type RecallCardKind = "basic" | "cloze";

export interface RecallCard {
  id: string;
  subtemaId: string;
  kind: RecallCardKind;
  front: string;
  back: string;
  dueAt: string;
  state: "new" | "learning" | "review" | "relearning";
  reps: number;
  lapses: number;
}

export interface RecallReviewEvent {
  cardId: string;
  rating: RecallRating;
  reviewedAt: string;
  responseMs?: number;
}

export interface RecallScheduleUpdate {
  cardId: string;
  dueAt: string;
  state: RecallCard["state"];
  reps: number;
  lapses: number;
}

export function nextRecallState(card: RecallCard, rating: RecallRating, now = new Date()): RecallScheduleUpdate {
  const reviewedAt = now.getTime();
  const day = 24 * 60 * 60 * 1000;
  const delays: Record<RecallRating, number> = { again: 10 * 60 * 1000, hard: day, good: 3 * day, easy: 7 * day };
  const nextState = rating === "again" ? (card.reps === 0 ? "learning" : "relearning") : "review";
  return {
    cardId: card.id,
    dueAt: new Date(reviewedAt + delays[rating]).toISOString(),
    state: nextState,
    reps: card.reps + (rating === "again" ? 0 : 1),
    lapses: card.lapses + (rating === "again" && card.state === "review" ? 1 : 0),
  };
}

export function isRecallCard(value: unknown): value is RecallCard {
  if (!value || typeof value !== "object") return false;
  const card = value as Partial<RecallCard>;
  return typeof card.id === "string" && typeof card.subtemaId === "string" &&
    (card.kind === "basic" || card.kind === "cloze") && typeof card.front === "string" &&
    typeof card.back === "string" && typeof card.dueAt === "string";
}

