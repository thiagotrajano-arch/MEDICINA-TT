const ENDPOINT = "http://127.0.0.1:8765";
const REVISOES_SEM_LIMITE_PRATICO = 9999;

type Resposta<T> = { result: T; error: string | null };
type DeckConfig = {
  id: number;
  desiredRetention?: number;
  new: { delays: number[]; perDay?: number };
  rev?: { perDay?: number };
  [key: string]: unknown;
};

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${action}: HTTP ${response.status}`);
  const body = await response.json() as Resposta<T>;
  if (body.error) throw new Error(`${action}: ${body.error}`);
  return body.result;
}

async function executar() {
  await anki<number>("version");
  const todos = await anki<string[]>("deckNames");
  const decks = todos
    .filter((deck) => deck.startsWith("MEDICINA::"))
    .filter((deck) => !todos.some((outro) => outro.startsWith(`${deck}::`)));
  if (!decks.length) throw new Error("Nenhum deck de estudo MEDICINA foi encontrado.");

  const configuracoes = new Map<number, DeckConfig>();
  for (const deck of decks) {
    const config = await anki<DeckConfig>("getDeckConfig", { deck });
    configuracoes.set(config.id, config);
  }

  for (const config of configuracoes.values()) {
    config.new.delays = [5, 300, 4320, 10080];
    config.new.perDay = 30;
    config.rev ??= {};
    // O Anki usa 9.999 como teto máximo: na prática, nenhuma revisão vencida
    // fica escondida por um limite diário. Isso não antecipa cartões futuros.
    config.rev.perDay = REVISOES_SEM_LIMITE_PRATICO;
    await anki<boolean>("saveDeckConfig", { config });
  }

  const divergentes: Array<{ deck: string; reviewsPerDay?: number }> = [];
  for (const deck of decks) {
    const config = await anki<DeckConfig>("getDeckConfig", { deck });
    if (config.rev?.perDay !== REVISOES_SEM_LIMITE_PRATICO) {
      divergentes.push({ deck, reviewsPerDay: config.rev?.perDay });
    }
  }
  if (divergentes.length) throw new Error(`Configuração divergente: ${JSON.stringify(divergentes)}`);

  console.log(JSON.stringify({
    decksVerified: decks.length,
    configIdsUpdated: [...configuracoes.keys()],
    delaysMinutes: [5, 300, 4320, 10080],
    newCardsPerDay: 30,
    reviewsPerDay: REVISOES_SEM_LIMITE_PRATICO,
    practicalReviewLimit: "sem limite",
    cardsChanged: 0,
    schedulingHistoryPreserved: true,
  }, null, 2));
}

executar().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
