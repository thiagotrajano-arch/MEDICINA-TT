/**
 * Fecha a limpeza operacional do Anki sem apagar cartões.
 *
 * Uso:
 *   npm.cmd run anki:fechar                 # relatório seco
 *   npm.cmd run anki:fechar -- --aplicar    # suspende apenas duplicatas e fontes pendentes
 *
 * Segurança: a operação não altera Frente/Verso, não muda agendamento dos
 * cartões preservados e não conversa com o site. O backup .apkg deve ser
 * executado antes de --aplicar.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const aplicar = process.argv.includes("--aplicar");
const AUDITORIA = resolve("exports/anki/auditoria-editorial.json");
const DESTINO = resolve("exports/anki/fechamento-rotina-estudo.json");

type Resposta<T> = { result: T; error: string | null };
type Nota = { noteId: number; tags: string[]; fields: Record<string, { value: string }> };
type Auditoria = { queues: { normalizedDuplicateNoteIds: number[][]; missingReferenceNoteIds: number[] } };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`AnkiConnect respondeu HTTP ${response.status}.`);
  const payload = await response.json() as Resposta<T>;
  if (payload.error) throw new Error(`${action}: ${payload.error}`);
  return payload.result;
}

function valor(nota: Nota, campo: "Frente" | "Verso" | "Referencia"): string {
  const alternativo = campo === "Frente" ? "Front" : campo === "Verso" ? "Back" : campo;
  return nota.fields[campo]?.value ?? nota.fields[alternativo]?.value ?? "";
}

function pontuarNota(nota: Nota): number {
  const tags = nota.tags.join(" ");
  let pontos = 0;
  if (tags.includes("subtema::")) pontos += 4;
  if (!tags.includes("-nero-") && !tags.includes("-condta")) pontos += 3;
  if (/[^\x00-\x7F]/.test(valor(nota, "Frente") + valor(nota, "Verso"))) pontos += 2;
  if (valor(nota, "Referencia").trim()) pontos += 1;
  return pontos;
}

async function notasInfo(ids: number[]): Promise<Nota[]> {
  const resultado: Nota[] = [];
  for (let i = 0; i < ids.length; i += 100) resultado.push(...await anki<Nota[]>("notesInfo", { notes: ids.slice(i, i + 100) }));
  return resultado;
}

async function cartasDasNotas(ids: number[]): Promise<number[]> {
  const resultado: number[] = [];
  for (const id of ids) resultado.push(...await anki<number[]>("findCards", { query: `nid:${id}` }));
  return [...new Set(resultado)];
}

async function adicionarTags(ids: number[], tags: string[]) {
  for (let i = 0; i < ids.length; i += 500) await anki("addTags", { notes: ids.slice(i, i + 500), tags: tags.join(" ") });
}

async function main() {
  await anki<number>("version");
  const auditoria = JSON.parse(await readFile(AUDITORIA, "utf8")) as Auditoria;
  const grupos = auditoria.queues.normalizedDuplicateNoteIds;
  const duplicatasParaSuspender: number[] = [];
  const escolhas: Array<{ manter: number; suspender: number[] }> = [];

  for (const grupo of grupos) {
    const notas = await notasInfo(grupo);
    const ordenadas = [...notas].sort((a, b) => pontuarNota(b) - pontuarNota(a) || a.noteId - b.noteId);
    const manter = ordenadas[0]?.noteId;
    if (!manter) continue;
    const suspender = ordenadas.slice(1).map((nota) => nota.noteId);
    escolhas.push({ manter, suspender });
    duplicatasParaSuspender.push(...suspender);
  }

  const fontesPendentes = [...new Set(auditoria.queues.missingReferenceNoteIds)];
  const notasNeuro = await anki<number[]>("findNotes", { query: "tag:disciplina-neurologia" });
  const paraSuspender = [...new Set([...duplicatasParaSuspender, ...fontesPendentes])];
  const cartasParaSuspender = await cartasDasNotas(paraSuspender);

  if (aplicar) {
    if (duplicatasParaSuspender.length) await adicionarTags(duplicatasParaSuspender, ["editorial::duplicata-suspensa"]);
    if (fontesPendentes.length) await adicionarTags(fontesPendentes, ["editorial::fonte-pendente"]);
    if (notasNeuro.length) await adicionarTags(notasNeuro, ["ciclo::clinico", "area::clinica-medica", "disciplina::neurologia"]);
    if (cartasParaSuspender.length) await anki("suspend", { cards: cartasParaSuspender });
  }

  const relatorio = {
    generatedAt: new Date().toISOString(),
    applied: aplicar,
    policy: "Suspend only; never delete or rewrite medical fields.",
    normalizedDuplicateGroups: grupos.length,
    duplicateNotesSuspended: duplicatasParaSuspender.length,
    missingReferenceNotesSuspended: fontesPendentes.length,
    cardsSuspended: cartasParaSuspender.length,
    neurologyNotesRetagged: notasNeuro.length,
    choices: escolhas,
  };
  await mkdir(dirname(DESTINO), { recursive: true });
  await writeFile(DESTINO, `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ destino: DESTINO, ...relatorio }, null, 2));
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
