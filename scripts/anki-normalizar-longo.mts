import { readFile } from "node:fs/promises";
const auditoria = JSON.parse(await readFile("exports/anki/auditoria-editorial.json", "utf8")) as { queues: { longBackNoteIds: number[] } };
const offset = Number(process.argv[2] ?? 0);
const limite = Number(process.argv[3] ?? 25);
const lote = auditoria.queues.longBackNoteIds.slice(offset, offset + limite);
const call = async (action: string, params: Record<string, unknown>) => {
  const res = await fetch("http://127.0.0.1:8765", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ action, version: 6, params }) });
  const json = await res.json() as { result?: any; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
};
const notes = await call("notesInfo", { notes: lote }) as Array<{ noteId: number; fields: Record<string, { value: string }> }>;
let changed = 0;
for (const note of notes) {
  const field = note.fields.Verso ?? note.fields.Back;
  if (!field) continue;
  const original = field.value;
  const normalized = original
    .replace(/(?:<br\s*\/?>(?:\s|&nbsp;)*){3,}/gi, "<br><br>")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/(?:\r?\n\s*){3,}/g, "\n\n")
    .trim();
  if (normalized === original) continue;
  const fields = Object.fromEntries(Object.entries(note.fields).map(([name, value]) => [name, value.value]));
  const versoName = note.fields.Verso ? "Verso" : "Back";
  fields[versoName] = normalized;
  await call("updateNoteFields", { note: { id: note.noteId, fields } });
  changed += 1;
}
console.log(JSON.stringify({ lote: lote.length, notesFound: notes.length, formattingOnlyChanged: changed }, null, 2));
