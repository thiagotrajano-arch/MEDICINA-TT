const ENDPOINT = "http://127.0.0.1:8765";
const DECK = "MEDICINA::Ciclo Clínico::Clínica Médica::Neurologia";
const SOURCE = "AHA/ASA. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke. DOI: 10.1161/STR.0000000000000513. Revisado em 2026-08-13.";

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ action, version: 6, params }),
  });
  const body = await response.json() as { result?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.result as T;
}

const cards = [
  ["AVC isquêmico incapacitante até 4,5 h: quais trombolíticos?", "Alteplase ou tenecteplase, se o paciente for elegível."],
  ["NIHSS baixo exclui trombólise no déficit incapacitante?", "Não. Déficit incapacitante elegível deve receber trombólise rápida até 4,5 h, independentemente do NIHSS."],
  ["AVC com déficit não incapacitante até 4,5 h: estratégia preferida?", "Terapia antiplaquetária dupla é preferida; trombólise não mostrou benefício nesse grupo."],
  ["Quando considerar trombólise entre 4,5–9 h ou início desconhecido?", "Em pacientes selecionados por imagem avançada, como mismatch DWI–FLAIR ou de perfusão."],
  ["Meta intensiva de glicose 80–130 mg/dL melhora o AVC agudo?", "Não. Não melhora o desfecho e aumenta hipoglicemia grave."],
  ["Após reperfusão completa, reduzir PAS intensivamente para <140 mmHg?", "Não. A redução intensiva não melhora o desfecho e pode causar dano após trombectomia."],
  ["Destino pré-hospitalar no AVC suspeito: qual princípio?", "Considerar a rede local e acesso a centro com trombectomia, especialmente quando transferências rápidas não funcionam bem."],
];

const notes = cards.map(([front, back]) => ({
  deckName: DECK,
  modelName: "OMED Bonito",
  fields: { Frente: front, Verso: back, Tema: "AVC isquêmico agudo — conduta 2026", Referencia: SOURCE },
  tags: ["ciclo::clinico", "area::clinica-medica", "disciplina::neurologia", "subtema::avc-isquemico", "eixo::tratamento", "diretriz::aha-asa-2026", "codex-medicus", "editorial::atomico-2026"],
  options: { allowDuplicate: false, duplicateScope: "deck" },
}));

const created = await anki<Array<number | null>>("addNotes", { notes });
const legacyNotes = await anki<number[]>("findNotes", { query: `deck:"${DECK}" tag:probe-* "AVC Isquêmico"` });
if (legacyNotes.length) {
  await anki("addTags", { notes: legacyNotes, tags: "editorial::legado-avc-2026 editorial::substituido-por-atomicos" });
  const legacyCards = await anki<number[]>("findCards", { query: `nid:${legacyNotes.join(" or nid:")}` });
  if (legacyCards.length) await anki("suspend", { cards: legacyCards });
}

console.log(JSON.stringify({ created: created.filter(Boolean).length, alreadyExisting: created.filter((id) => id === null).length, legacyNotesSuspended: legacyNotes.length }, null, 2));
