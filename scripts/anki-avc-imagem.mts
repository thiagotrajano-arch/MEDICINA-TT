import { readFile } from "node:fs/promises";

const endpoint = "http://127.0.0.1:8765";
async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ action, version: 6, params }) });
  const body = await response.json() as { result?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.result as T;
}

const filename = "codex_avc_isquemico_tc_cc-by-sa-4.jpg";
const bytes = await readFile("public/img/clinicas/avc-isquemico-tc.jpg");
await anki("storeMediaFile", { filename, data: bytes.toString("base64") });
const note = {
  deckName: "MEDICINA::Ciclo Clínico::Clínica Médica::Neurologia",
  modelName: "OMED Bonito",
  fields: {
    Frente: `<img src="${filename}" style="max-width:100%;height:auto"><br>Qual é o achado principal nesta TC sem contraste?`,
    Verso: "Hipodensidade em território da artéria cerebral média, compatível com AVC isquêmico.",
    Tema: "AVC isquêmico — imagem",
    Referencia: "Imagem: 0475ramosk, Wikimedia Commons, CC BY-SA 4.0. Revisão clínica: AHA/ASA 2026 AIS Guideline, DOI 10.1161/STR.0000000000000513.",
  },
  tags: ["ciclo::clinico", "disciplina::neurologia", "subtema::avc-isquemico", "eixo::imagem", "modalidade::tc", "licenca::cc-by-sa-4", "editorial::atomico-2026", "codex-medicus"],
  options: { allowDuplicate: false, duplicateScope: "deck" },
};
let created = 0;
try { await anki("addNote", { note }); created = 1; } catch (error) { if (!String(error).includes("duplicate")) throw error; }
console.log(JSON.stringify({ media: filename, created }, null, 2));
