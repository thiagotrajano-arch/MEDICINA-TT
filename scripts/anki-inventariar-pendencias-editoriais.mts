import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
type Resposta<T> = { result: T; error: string | null };
type Nota = { noteId: number; modelName: string; tags: string[]; fields: Record<string, { value: string }>; cards: number[] };
type Cartao = { cardId: number; note: number; queue: number; deckName: string };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(30_000),
  });
  const corpo = await resposta.json() as Resposta<T>;
  if (!resposta.ok || corpo.error) throw new Error(corpo.error ?? `${action}: HTTP ${resposta.status}`);
  return corpo.result;
}

async function lotes<T>(ids: number[], action: string, campo: string): Promise<T[]> {
  const resultado: T[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) resultado.push(...await anki<T[]>(action, { [campo]: ids.slice(inicio, inicio + 100) }));
  return resultado;
}

function texto(valor = ""): string {
  return valor.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ").trim();
}

function respostaClinica(valor = ""): string {
  return texto(valor
    .replace(/<details[\s\S]*?<summary>\s*Fonte\s*<\/summary>[\s\S]*?<\/details>/gi, "")
    .replace(/(?:<br\s*\/?\s*>\s*)+<small>\s*Fonte:[\s\S]*?<\/small>\s*$/gi, "")
    .replace(/^\s*Fonte:[\s\S]*?<br\s*\/?\s*>\s*(Interpretação:)/i, "$1"));
}

const noteIds = await anki<number[]>("findNotes", { query: "tag:codex-medicus" });
const notas = await lotes<Nota>(noteIds, "notesInfo", "notes");
const cartoes = await lotes<Cartao>(notas.flatMap((nota) => nota.cards), "cardsInfo", "cards");
const cartaoPorNota = new Map(cartoes.map((cartao) => [cartao.note, cartao]));
const ativas = notas.filter((nota) => (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1);
const semSubtema = ativas.filter((nota) => !nota.tags.some((tag) => tag.startsWith("subtema::")));
const longas = notas.filter((nota) => respostaClinica(nota.fields.Verso?.value ?? nota.fields.Back?.value ?? nota.fields["Verso Extra"]?.value ?? "").length > 170);

const itens = semSubtema.map((nota) => ({
  noteId: nota.noteId,
  deck: cartaoPorNota.get(nota.noteId)?.deckName ?? "",
  model: nota.modelName,
  front: texto(nota.fields.Frente?.value ?? nota.fields.Front?.value ?? nota.fields.Texto?.value ?? ""),
  back: texto(nota.fields.Verso?.value ?? nota.fields.Back?.value ?? nota.fields["Verso Extra"]?.value ?? ""),
  temaField: texto(nota.fields.Tema?.value ?? ""),
  reference: texto(nota.fields.Referencia?.value ?? ""),
  tags: nota.tags,
}));
const longos = longas.map((nota) => ({
  noteId: nota.noteId,
  active: (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1,
  deck: cartaoPorNota.get(nota.noteId)?.deckName ?? "",
  front: texto(nota.fields.Frente?.value ?? nota.fields.Front?.value ?? nota.fields.Texto?.value ?? ""),
  back: texto(nota.fields.Verso?.value ?? nota.fields.Back?.value ?? nota.fields["Verso Extra"]?.value ?? ""),
  reference: texto(nota.fields.Referencia?.value ?? ""),
  tags: nota.tags,
}));

const agrupar = (campo: "deck" | "model") => Object.fromEntries(Object.entries(itens.reduce<Record<string, number>>((acc, item) => {
  acc[item[campo]] = (acc[item[campo]] ?? 0) + 1;
  return acc;
}, {})).sort((a, b) => b[1] - a[1]));
const tagsLegadas = Object.fromEntries(Object.entries(itens.flatMap((item) => item.tags).filter((tag) => !tag.includes("::")).reduce<Record<string, number>>((acc, tag) => {
  acc[tag] = (acc[tag] ?? 0) + 1;
  return acc;
}, {})).sort((a, b) => b[1] - a[1]));

const relatorio = {
  generatedAt: new Date().toISOString(),
  totals: { notes: notas.length, active: ativas.length, activeWithoutSubtheme: itens.length, longBacks: longos.length, activeLongBacks: longos.filter((item) => item.active).length },
  byDeck: agrupar("deck"), byModel: agrupar("model"), legacyTags: tagsLegadas,
  items: itens, longItems: longos,
};
await mkdir(resolve("exports/anki"), { recursive: true });
const destino = resolve("exports/anki/pendencias-editoriais-private.json");
await writeFile(destino, `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ destino, totals: relatorio.totals, byDeck: relatorio.byDeck, legacyTags: relatorio.legacyTags }, null, 2));
