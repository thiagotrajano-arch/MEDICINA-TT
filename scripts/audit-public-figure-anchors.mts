/** Audita se cada figura pública tem um vínculo navegável com estudo. */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const registry = await readFile(resolve(root, "src/components/figuras/registry.tsx"), "utf8");
const media = await readFile(resolve(root, "src/components/midia/MidiaClient.tsx"), "utf8");
const ids = [...registry.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]);
const anchored = new Set([...media.matchAll(/^\s*"([^"]+)": \{ subtemaId:/gm)].map((match) => match[1]));
const rows = ids.map((id) => ({ id, ancorada: anchored.has(id) }));
const output = { generatedAt: new Date().toISOString(), total: rows.length, ancoradas: rows.filter((row) => row.ancorada).length, semAncora: rows.filter((row) => !row.ancorada).map((row) => row.id), rows };
console.log(JSON.stringify(output, null, 2));
