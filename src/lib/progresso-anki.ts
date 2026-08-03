"use client";

const CHAVE = "codex:progresso-anki";
const EVENTO = "codex:progresso-anki-atualizado";

export interface AnkiDeckSnapshot {
  name: string;
  cards: number;
  new: number;
  learn: number;
  review: number;
  due: number;
  newToday: number;
  learnToday: number;
  reviewToday: number;
}

export interface AnkiProgressSnapshot {
  schemaVersion: 1;
  generatedAt: string;
  source: "anki-connect-local";
  decks: AnkiDeckSnapshot[];
}

function ler(): AnkiProgressSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    return bruto ? validar(JSON.parse(bruto)) : null;
  } catch {
    return null;
  }
}

function validar(valor: unknown): AnkiProgressSnapshot {
  if (!valor || typeof valor !== "object") throw new Error("Arquivo de progresso inválido.");
  const candidato = valor as Partial<AnkiProgressSnapshot>;
  if (candidato.schemaVersion !== 1 || candidato.source !== "anki-connect-local" || !Array.isArray(candidato.decks)) {
    throw new Error("Esse arquivo não parece ser um relatório do Anki exportado pelo Codex Medicus.");
  }
  if (typeof candidato.generatedAt !== "string") throw new Error("O relatório do Anki não possui data válida.");
  const decks = candidato.decks.map((deck) => {
    if (!deck || typeof deck !== "object" || typeof deck.name !== "string") throw new Error("Relatório do Anki contém um deck inválido.");
    const numeros = ["cards", "new", "learn", "review", "due", "newToday", "learnToday", "reviewToday"] as const;
    for (const campo of numeros) if (!Number.isFinite(Number(deck[campo])) || Number(deck[campo]) < 0) throw new Error(`Valor inválido no campo ${campo}.`);
    return {
      name: deck.name,
      cards: Number(deck.cards),
      new: Number(deck.new),
      learn: Number(deck.learn),
      review: Number(deck.review),
      due: Number(deck.due),
      newToday: Number(deck.newToday),
      learnToday: Number(deck.learnToday),
      reviewToday: Number(deck.reviewToday),
    };
  });
  return { schemaVersion: 1, generatedAt: candidato.generatedAt, source: "anki-connect-local", decks };
}

export function lerProgressoAnki(): AnkiProgressSnapshot | null { return ler(); }

export function salvarProgressoAnki(valor: unknown): AnkiProgressSnapshot {
  const snapshot = validar(valor);
  window.localStorage.setItem(CHAVE, JSON.stringify(snapshot));
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: snapshot }));
  return snapshot;
}

export function observarProgressoAnki(callback: (snapshot: AnkiProgressSnapshot) => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (event: Event) => callback((event as CustomEvent<AnkiProgressSnapshot>).detail);
  window.addEventListener(EVENTO, handler);
  return () => window.removeEventListener(EVENTO, handler);
}

export function resumirProgressoAnki(snapshot: AnkiProgressSnapshot | null) {
  if (!snapshot) return null;
  return snapshot.decks.reduce((total, deck) => ({
    decks: total.decks + 1,
    cards: total.cards + deck.cards,
    due: total.due + deck.due,
    reviewToday: total.reviewToday + deck.reviewToday,
  }), { decks: 0, cards: 0, due: 0, reviewToday: 0 });
}
