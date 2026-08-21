import type { RecallCard, RecallRating, RecallReviewEvent, RecallScheduleUpdate } from "@/domain/v2";
import { nextRecallState } from "@/domain/v2";
import { saveV2Snapshot } from "./indexed-db";

const CARDS_KEY = "codex-medicus:v2:recall-cards";
const REVIEWS_KEY = "codex-medicus:v2:recall-reviews";

function browserStorage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

function read<T>(key: string, fallback: T): T {
  const storage = browserStorage();
  if (!storage) return fallback;
  try { return JSON.parse(storage.getItem(key) ?? "null") ?? fallback; } catch { return fallback; }
}

function write<T>(key: string, value: T): void {
  browserStorage()?.setItem(key, JSON.stringify(value));
  void saveV2Snapshot(key, value).catch(() => undefined);
}

export function listRecallCards(): RecallCard[] {
  return read<RecallCard[]>(CARDS_KEY, []).filter((card) => card && typeof card.id === "string");
}

export function saveRecallCard(card: RecallCard): RecallCard {
  const cards = listRecallCards().filter((item) => item.id !== card.id);
  cards.push(card);
  write(CARDS_KEY, cards);
  return card;
}

export function dueRecallCards(now = new Date()): RecallCard[] {
  const timestamp = now.getTime();
  return listRecallCards().filter((card) => new Date(card.dueAt).getTime() <= timestamp);
}

export function recallCardsForTopic(subtemaId: string): RecallCard[] {
  return listRecallCards().filter((card) => card.subtemaId === subtemaId);
}

export function reviewRecallCard(cardId: string, rating: RecallRating, now = new Date()): RecallScheduleUpdate | null {
  const card = listRecallCards().find((item) => item.id === cardId);
  if (!card) return null;
  const update = nextRecallState(card, rating, now);
  saveRecallCard({ ...card, ...update });
  const event: RecallReviewEvent = { cardId, rating, reviewedAt: now.toISOString() };
  write(REVIEWS_KEY, [...read<RecallReviewEvent[]>(REVIEWS_KEY, []), event]);
  return update;
}

export function listRecallReviews(): RecallReviewEvent[] {
  return read<RecallReviewEvent[]>(REVIEWS_KEY, []);
}
