import { mkdir, readFile, writeFile } from "node:fs/promises";

type Row = { noteId: number; discipline: string; front: string; back: string; reference: string; status: string };
const rows = JSON.parse(await readFile("exports/anki/lotes-editoriais/lote-300-2026-08-13.json", "utf8")) as Row[];

function repairMojibake(input: string): string {
  const replacements: Record<string, string> = {
    "Ã¡": "á", "Ã¢": "â", "Ã£": "ã", "Ã©": "é", "Ãª": "ê", "Ã­": "í",
    "Ã³": "ó", "Ã´": "ô", "Ãµ": "õ", "Ãº": "ú", "Ã§": "ç", "â€“": "–",
    "â€”": "—", "Â": "",
  };
  let value = input;
  for (const [bad, good] of Object.entries(replacements)) value = value.split(bad).join(good);
  value = value
    .replace(/(?:Â·\s*)+/g, "")
    .replace(/(?:·\s*)+(?=\p{L})/gu, "")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  const tokens = value.split(" ");
  const output: string[] = [];
  for (let index = 0; index < tokens.length;) {
    let end = index;
    while (end < tokens.length && /^[\p{L}\p{N}]$/u.test(tokens[end])) end += 1;
    if (end - index >= 3) output.push(tokens.slice(index, end).join(""));
    else output.push(...tokens.slice(index, end || index + 1));
    index = end > index ? end : index + 1;
  }
  return output.join(" ").replace(/\s+([,.;:!?])/g, "$1");
}

const recovered = rows.map((row) => ({
  ...row,
  frontRecovered: repairMojibake(row.front),
  backRecovered: repairMojibake(row.back),
  referenceRecovered: repairMojibake(row.reference),
}));
const suspicious = recovered.filter((row) => /Ã.|Â.|�|(?:·\s*){2,}/.test(`${row.frontRecovered} ${row.backRecovered} ${row.referenceRecovered}`));
await mkdir("exports/anki/lotes-editoriais", { recursive: true });
await writeFile("exports/anki/lotes-editoriais/lote-300-recuperado-2026-08-13.json", `${JSON.stringify(recovered, null, 2)}\n`, "utf8");
await writeFile("exports/anki/lotes-editoriais/lote-300-codificacao-suspeita-2026-08-13.json", `${JSON.stringify(suspicious, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ total: recovered.length, recoveredWithoutKnownMarkers: recovered.length - suspicious.length, stillSuspicious: suspicious.length }, null, 2));
