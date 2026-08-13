const response = await fetch("http://127.0.0.1:8765", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ action: "getDeckConfig", version: 6, params: { deck: "Codex-Piloto" } }),
});
type DeckConfig = { id: number; desiredRetention?: number; new: { delays: number[]; perDay?: number }; rev?: { perDay?: number }; [key: string]: unknown };
const current = (await response.json()) as { result?: DeckConfig; error?: string };
if (current.error || !current.result) throw new Error(current.error ?? "Configuração do Anki não encontrada.");

current.result.new.delays = [5, 300, 4320, 10080];
// Limita apenas a introdução de conteúdo novo. Revisões vencidas permanecem
// livres para que o acúmulo não seja escondido por um teto artificial.
current.result.new.perDay = 30;
const savedResponse = await fetch("http://127.0.0.1:8765", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ action: "saveDeckConfig", version: 6, params: { config: current.result } }),
});
const saved = (await savedResponse.json()) as { result?: boolean; error?: string };
if (saved.error || !saved.result) throw new Error(saved.error ?? "O Anki não confirmou a configuração.");

console.log(JSON.stringify({
  configId: current.result.id,
  delaysMinutes: current.result.new.delays,
  newCardsPerDay: current.result.new.perDay,
  reviewsPerDay: current.result.rev?.perDay,
  desiredRetention: current.result.desiredRetention,
  note: "Configuração compartilhada pelos decks MEDICINA; histórico preservado.",
}, null, 2));
