import { mkdir, readFile, writeFile } from "node:fs/promises";

const endpoint = "http://127.0.0.1:8765";
async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ action, version: 6, params }) });
  const body = await response.json() as { result?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.result as T;
}

type Note = { noteId: number; tags: string[]; fields: Record<string, { value: string }> };
const audit = JSON.parse(await readFile("exports/anki/auditoria-editorial.json", "utf8")) as { queues: { longBackNoteIds: number[] } };
const ids = audit.queues.longBackNoteIds.slice(0, 300);
const notes: Note[] = [];
for (let index = 0; index < ids.length; index += 100) notes.push(...await anki<Note[]>("notesInfo", { notes: ids.slice(index, index + 100) }));
await anki("addTags", { notes: ids, tags: "editorial::lote-300-2026-08-13 editorial::aguarda-revisao-clinica" });

const clean = (value = "") => value.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/[ \t]+/g, " ").trim();
const rows = notes.map((note) => ({
  noteId: note.noteId,
  discipline: note.tags.find((tag) => tag.startsWith("disciplina::"))?.slice(12) ?? "sem-disciplina",
  front: clean(note.fields.Frente?.value ?? note.fields.Front?.value),
  back: clean(note.fields.Verso?.value ?? note.fields.Back?.value),
  reference: clean(note.fields.Referencia?.value),
  status: "aguarda-revisao-clinica",
}));
await mkdir("exports/anki/lotes-editoriais", { recursive: true });
await writeFile("exports/anki/lotes-editoriais/lote-300-2026-08-13.json", `${JSON.stringify(rows, null, 2)}\n`, "utf8");
const byDiscipline = Object.entries(rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.discipline]: (acc[row.discipline] ?? 0) + 1 }), {}));
console.log(JSON.stringify({ notes: rows.length, byDiscipline, output: "exports/anki/lotes-editoriais/lote-300-2026-08-13.json" }, null, 2));
