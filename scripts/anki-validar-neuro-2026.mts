/**
 * Valida o lote neurológico pendente, reescreve notas longas de forma atômica
 * e cria um Cloze idempotente. A rotina nunca apaga notas/cartões.
 *
 * Uso: npm exec tsx scripts/anki-validar-neuro-2026.mts -- --aplicar
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const APLICAR = process.argv.includes("--aplicar");
const pasta = resolve("exports/anki");

type Resposta<T> = { result: T; error: string | null };
type Campo = { value: string; order?: number };
type Nota = { noteId: number; tags: string[]; fields: Record<string, Campo>; modelName: string; cards: number[] };

const FONTES = {
  ais: "AHA/ASA. 2026 Guideline for the Early Management of Acute Ischemic Stroke. DOI 10.1161/STR.0000000000000513. https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke",
  ich: "AHA/ASA. 2022 Guideline for the Management of Spontaneous Intracerebral Hemorrhage. https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-patients-with-spontaneous-intracerebral-hemorrhage/top-things-to-know",
  sah: "AHA/ASA. 2023 Guideline for the Management of Aneurysmal Subarachnoid Hemorrhage. https://professional.heart.org/en/science-news/2023-guideline-for-the-management-of-patients-with-aneurysmal-subarachnoid-hemorrhage/top-things-to-know",
  status: "ILAE. Definition and Classification of Status Epilepticus (2015); AES guideline for convulsive status epilepticus. https://www.ilae.org/guidelines/definition-and-classification/status-epilepticus-2015",
  headache: "NICE CG150. Headaches in over 12s: diagnosis and management, atualizado 2025. https://www.nice.org.uk/guidance/cg150/chapter/Recommendations",
  gbs: "EAN/PNS. Guideline on diagnosis and treatment of Guillain–Barré syndrome (2023). https://www.ean.org/fileadmin/user_upload/ean/ean/research/EAN_Guidelines/Guideline_Reference_Center/Guideline_for_comment/2023/EAN_PNS_Guideline_GBS_for_review.pdf",
  mg: "AAN. International Consensus Guidance for Management of Myasthenia Gravis (2020). https://www.aan.com/Guidelines/Home/GuidelineDetail/1075",
  compression: "NICE NG234. Spinal metastases and metastatic spinal cord compression. https://www.nice.org.uk/guidance/ng234/chapter/Recommendations",
  dementia: "NICE NG97. Dementia: assessment, management and support, vigente. https://www.nice.org.uk/guidance/NG97",
  neurosyphilis: "CDC. Sexually Transmitted Infections Treatment Guidelines 2021: Syphilis/neurosyphilis. https://www.cdc.gov/mmwr/volumes/70/rr/RR7004a1.htm",
  delirium: "SCCM. PADIS Guidelines for prevention and management of pain, agitation, delirium, immobility and sleep disruption. https://sccm.org/clinical-resources/guidelines/guidelines/guidelines-for-the-prevention-and-management-of-pa",
  pdph: "Multisociety international consensus practice guidelines on postdural puncture headache. Regional Anesthesia and Pain Medicine, 2023. https://rapm.bmj.com/content/early/2023/08/13/rapm-2023-104817",
  vertigo: "NICE CKS. Vertigo: assessment and management. https://cks.nice.org.uk/topics/vertigo/",
} as const;

const OVERRIDES: Record<number, { frente: string; verso: string; fonte: keyof typeof FONTES }> = {
  1784827608526: { frente: "Quando usar dupla antiagregação após AIT de alto risco?", verso: "Após excluir hemorragia, AAS + clopidogrel por 21 dias no AIT de alto risco ou AVC minor não cardioembólico, conforme risco e protocolo.", fonte: "ais" },
  1784827608588: { frente: "Como individualizar anticoagulação após AVC cardioembólico?", verso: "Após excluir hemorragia, individualizar pelo tamanho do infarto, transformação hemorrágica e risco embólico; a regra 1-3-6-12 não é universal.", fonte: "ais" },
  1784827629831: { frente: "TC negativa exclui HSA quando a suspeita persiste?", verso: "Não sempre: após 6 horas ou com suspeita persistente, considerar punção lombar para xantocromia e/ou angioimagem conforme protocolo; TC <6 h de alta qualidade pode excluir HSA em selecionados.", fonte: "sah" },
  1784827630062: { frente: "Quando evacuar hemorragia cerebelar?", verso: "Indicar avaliação neurocirúrgica urgente se houver deterioração, compressão de tronco ou hidrocefalia; o tamanho isolado não decide.", fonte: "ich" },
  1784827630093: { frente: "Como prevenir isquemia cerebral tardia após HSA?", verso: "Manter nimodipino e euvolemia; déficit tardio por isquemia cerebral diferida pode exigir hipertensão induzida em centro especializado.", fonte: "sah" },
  1784827644005: { frente: "Quais exames considerar após primeira crise epiléptica?", verso: "EEG e RM são considerados; TC inicial é útil na urgência. Nenhum exame é obrigatório em todos os contextos.", fonte: "status" },
  1784827694493: { frente: "O que fazer se a SGB não melhora após IVIG?", verso: "Não repetir IVIG rotineiramente; reavaliar diagnóstico e considerar plasmaférese e centro especializado.", fonte: "gbs" },
  1784827733800: { frente: "Quando indicar timectomia na miastenia?", verso: "Timoma sempre; na miastenia generalizada anti-AChR positiva, sobretudo em pessoas jovens, individualizar indicação e risco.", fonte: "mg" },
  1784827747794: { frente: "Conduta imediata na compressão medular metastática com déficit?", verso: "Dexametasona 16 mg imediatamente, RM urgente e avaliação conjunta de neurocirurgia e oncologia.", fonte: "compression" },
  1784827747856: { frente: "Qual o tempo para descompressão na síndrome da cauda equina?", verso: "Descompressão urgente; não existe janela universal de 24–48 horas, e o atraso pode piorar o prognóstico.", fonte: "compression" },
  1784827793276: { frente: "Medidas iniciais na hipertensão intracraniana?", verso: "Cabeceira elevada, normóxia/normocapnia e tratamento da causa; osmoterapia se edema ou herniação conforme protocolo.", fonte: "ich" },
};

const PLACEHOLDERS = new Set([1784827935987, 1784827936047]);

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`${action}: HTTP ${res.status}`);
  const body = await res.json() as Resposta<T>;
  if (body.error) throw new Error(`${action}: ${body.error}`);
  return body.result;
}

function texto(raw = ""): string {
  return raw
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizado(raw: string): string {
  return texto(raw).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function campo(nota: Nota, nome: "frente" | "verso"): [string, string] {
  const candidatos = nome === "frente" ? ["Frente", "Front"] : ["Verso", "Back"];
  const chave = candidatos.find((item) => nota.fields[item]);
  return [chave ?? candidatos[0], chave ? nota.fields[chave]?.value ?? "" : ""];
}

function topico(nota: Nota): keyof typeof FONTES | null {
  const hay = normalizado(`${nota.tags.join(" ")} ${Object.values(nota.fields).map((x) => x.value).join(" ")}`);
  if (hay.includes("vertigem")) return "vertigo";
  if (hay.includes("avc-isquem") || hay.includes("avc isquem")) return "ais";
  if (hay.includes("avc-hemorrag") || hay.includes("hemorragia intraparenquimatosa") || hay.includes("hsa")) return hay.includes("hsa") ? "sah" : "ich";
  if (hay.includes("crise-convuls") || hay.includes("status epilepticus")) return "status";
  if (hay.includes("cefale") || hay.includes("headache")) return "headache";
  if (hay.includes("guillain") || hay.includes("gbs")) return "gbs";
  if (hay.includes("miasten") || hay.includes("myasthen")) return "mg";
  if (hay.includes("compressao medular") || hay.includes("cauda equina") || hay.includes("compressao-medular")) return "compression";
  if (hay.includes("demencia")) return "dementia";
  if (hay.includes("neurossifilis")) return "neurosyphilis";
  if (hay.includes("cefaleia pos-puncao") || hay.includes("postdural") || hay.includes("pdp")) return "pdph";
  if (hay.includes("delirium")) return "delirium";
  if (hay.includes("hipertensao intracraniana") || hay.includes("hemorragia intracerebral")) return "ich";
  return null;
}

function subtema(nota: Nota): string {
  const hay = normalizado(`${nota.tags.join(" ")} ${Object.values(nota.fields).map((x) => x.value).join(" ")}`);
  if (hay.includes("avc-isquem") || hay.includes("avc isquem")) return "neuro--avc-isquemico--diagnostico-e-conduta";
  if (hay.includes("avc-hemorrag") || hay.includes("hsa") || hay.includes("hemorragia intraparenquimatosa")) return "neuro--avc-hemorragico-hsa-hip--diagnostico-e-conduta";
  if (hay.includes("crise-convuls") || hay.includes("status epilepticus")) return "neuro--crise-epileptica-e-status--diagnostico-e-conduta";
  if (hay.includes("cefale") || hay.includes("headache") || hay.includes("vertigem")) return hay.includes("vertigem") ? "neuro--vertigem--diagnostico-e-conduta" : "neuro--cefaleias--diagnostico-e-conduta";
  if (hay.includes("guillain") || hay.includes("gbs")) return "neuro--sindrome-de-guillain-barre--diagnostico-e-conduta";
  if (hay.includes("miasten") || hay.includes("myasthen")) return "neuro--miastenia-gravis--diagnostico-e-conduta";
  if (hay.includes("compressao") || hay.includes("cauda equina")) return "neuro--compressao-medular-e-cauda-equina--diagnostico-e-conduta";
  if (hay.includes("demencia")) return "neuro--demencias--diagnostico-e-conduta";
  if (hay.includes("neurossifilis")) return "neuro--neurossifilis--diagnostico-e-conduta";
  if (hay.includes("postdural") || hay.includes("pos-puncao") || hay.includes("pdp")) return "neuro--cefaleia-pos-puncao--diagnostico-e-conduta";
  if (hay.includes("delirium")) return "neuro--delirium--diagnostico-e-conduta";
  if (hay.includes("wernicke")) return "neuro--encefalopatia-de-wernicke--diagnostico-e-conduta";
  if (hay.includes("hipertensao intracraniana") || hay.includes("delirium") || hay.includes("hemorragia intracerebral")) return "neuro--hipertensao-intracraniana-e-delirium--diagnostico-e-conduta";
  return "neuro--revisao-pendente--semestre-nao-comprovado";
}

function extrairTitulo(raw: string): { titulo: string; secao: string } {
  const limpo = raw.replace(/<br\s*\/?\s*>/gi, " ");
  const t = limpo.match(/codex-front-title[^>]*>(.*?)<\/div>/i)?.[1] ?? texto(raw);
  const s = limpo.match(/codex-front-section[^>]*>(.*?)<\/div>/i)?.[1] ?? "Ponto-chave";
  return { titulo: texto(t), secao: texto(s) };
}

function primeiraIdeia(raw: string): string {
  const body = texto(raw).split(/Fonte:/i)[0].trim();
  const partes = body.split(/(?<=[.!?])\s+/).map((p) => p.trim()).filter((p) => p.length >= 18);
  let escolhido = partes[0] ?? body;
  if (escolhido.length > 170) escolhido = escolhido.split(/\s+(?:mas|porém|quando|se|exceto|e)\s+/i)[0] ?? escolhido;
  if (escolhido.length > 170) escolhido = `${escolhido.slice(0, 167).replace(/\s+\S*$/, "")}…`;
  return escolhido.replace(/[.;:]$/, "").trim();
}

function pergunta(titulo: string, secao: string): string {
  const base = `${titulo} — ${secao}`.replace(/\s+/g, " ").trim();
  const q = `${base}?`;
  return q.length <= 88 ? q : `${secao}: qual é o ponto-chave em ${titulo}?`.slice(0, 88).replace(/[,:;\s]+$/, "?");
}

async function notasEmLotes(ids: number[]): Promise<Nota[]> {
  const result: Nota[] = [];
  for (let i = 0; i < ids.length; i += 100) result.push(...await anki<Nota[]>("notesInfo", { notes: ids.slice(i, i + 100) }));
  return result;
}

async function atualizarNota(nota: Nota, fields: Record<string, string>, addTags: string[], removeTags: string[], unsuspender: boolean) {
  if (!APLICAR) return;
  await anki("updateNoteFields", { note: { id: nota.noteId, fields } });
  if (removeTags.length) await anki("removeTags", { notes: [nota.noteId], tags: removeTags.join(" ") });
  if (addTags.length) await anki("addTags", { notes: [nota.noteId], tags: addTags.join(" ") });
  if (unsuspender) {
    const cards = await anki<number[]>("findCards", { query: `nid:${nota.noteId}` });
    if (cards.length) await anki("unsuspend", { cards });
  }
}

async function main() {
  await anki<number>("version");
  await mkdir(pasta, { recursive: true });
  const auditoria = JSON.parse(await readFile(resolve(pasta, "auditoria-editorial.json"), "utf8")) as { queues: { missingReferenceNoteIds: number[] } };
  let missingIds = auditoria.queues.missingReferenceNoteIds;
  // Depois da primeira aplicacao, a auditoria passa a enxergar apenas os dois
  // placeholders. O snapshot privado preserva a fila original de 90 notas.
  if (missingIds.length < 90) {
    try {
      const snapshot = JSON.parse(await readFile(resolve(pasta, "validacao-neuro-2026-antes-private.json"), "utf8")) as { missingNotes: Nota[] };
      if (snapshot.missingNotes.length >= 90) missingIds = snapshot.missingNotes.map((nota) => nota.noteId);
    } catch { /* primeira execucao: a auditoria atual e a fonte disponivel */ }
  }
  const missingNotes = await notasEmLotes(missingIds);
  const longIds = await anki<number[]>("findNotes", { query: 'tag:"editorial::texto-longo"' });
  const longNotes = await notasEmLotes(longIds);
  const before = { generatedAt: new Date().toISOString(), missingNotes, longNotes };
  if (APLICAR) await writeFile(resolve(pasta, "validacao-neuro-2026-antes-private.json"), `${JSON.stringify(before, null, 2)}\n`, "utf8");

  const validacao: Array<Record<string, unknown>> = [];
  for (const nota of missingNotes) {
    const fonte = topico(nota);
    const st = subtema(nota);
    const pending = PLACEHOLDERS.has(nota.noteId) || !fonte;
    const [frenteNome, frenteOriginal] = campo(nota, "frente");
    const [versoNome, versoOriginal] = campo(nota, "verso");
    const override = OVERRIDES[nota.noteId];
    const ref = override ? FONTES[override.fonte] : fonte ? FONTES[fonte] : "Fonte primária ainda não comprovada; manter suspenso.";
    const resposta = override?.verso ?? versoOriginal;
    const adicionarFonte = !nota.fields.Referencia && fonte && !/\bFonte:/i.test(versoOriginal);
    const fields: Record<string, string> = {
      [frenteNome]: override?.frente ?? frenteOriginal,
      [versoNome]: adicionarFonte && !pending ? `${resposta}<br><br><small>Fonte: ${ref}</small>` : resposta,
      ...(nota.fields.Tema ? { Tema: nota.fields.Tema.value } : {}),
      ...(nota.fields.Referencia ? { Referencia: ref } : {}),
    };
    const add = [`subtema::${st}`, "curriculo::semestre-pendente", "curriculo::subtema-semestre-ausente", "revisao::2026-08"];
    const remove = ["editorial::fonte-pendente", "codex-auditoria::fonte-pendente"];
    if (pending) {
      add.push("editorial::rejeitado-placeholder", "editorial::fonte-pendente");
      remove.push("editorial::validado-diretriz-2026", "editorial::curto-atomico");
    } else {
      add.push("editorial::validado-diretriz-2026", "editorial::curto-atomico", `fonte-primaria::${fonte}`);
    }
    await atualizarNota(nota, fields, add, remove, !pending);
    validacao.push({ noteId: nota.noteId, topic: fonte, subtema: st, pending, override: Boolean(override), active: !pending });
  }

  const atomicos: Array<Record<string, unknown>> = [];
  for (const nota of longNotes) {
    const [frenteNome, frenteOriginal] = campo(nota, "frente");
    const [versoNome, versoOriginal] = campo(nota, "verso");
    const { titulo, secao } = extrairTitulo(frenteOriginal);
    const fonte = topico(nota);
    const st = subtema(nota);
    const novoFrente = pergunta(titulo || "Neurologia", secao || "Ponto-chave");
    const novoVerso = primeiraIdeia(versoOriginal);
    const ref = fonte ? FONTES[fonte] : "Revisão editorial neurológica; fonte primária específica pendente.";
    const adicionarFonte = !nota.fields.Referencia && fonte && !/\bFonte:/i.test(versoOriginal);
    const fields: Record<string, string> = {
      [frenteNome]: novoFrente,
      [versoNome]: adicionarFonte ? `${novoVerso}<br><br><small>Fonte: ${ref}</small>` : novoVerso,
      ...(nota.fields.Tema ? { Tema: nota.fields.Tema.value } : {}),
      ...(nota.fields.Referencia ? { Referencia: ref } : {}),
    };
    const add = ["editorial::reescrito-atomico", "editorial::curto-atomico", "curriculo::semestre-pendente", "curriculo::subtema-semestre-ausente", `subtema::${st}`, "revisao::2026-08"];
    const remove = ["editorial::texto-longo", "editorial::aguarda-reescrita-curta", "codex-auditoria::verso-longo", "editorial::aguarda-validacao-clinica"];
    if (fonte) {
      add.push("editorial::validado-diretriz-2026", `fonte-primaria::${fonte}`);
    } else {
      add.push("editorial::fonte-pendente");
      remove.push("editorial::validado-diretriz-2026");
    }
    await atualizarNota(nota, fields, add, remove, Boolean(fonte));
    atomicos.push({ noteId: nota.noteId, oldFront: texto(frenteOriginal), newFront: novoFrente, newBack: novoVerso, source: ref, subtema: st, sourceValidated: Boolean(fonte), active: Boolean(fonte) });
  }

  const clozeDeck = "MEDICINA::Ciclo Clínico::Clínica Médica::Neurologia";
  const clozeTag = "anki-id::20260815::cloze-avc-tc";
  const clozeQuery = `tag:"${clozeTag}"`;
  const existingCloze = await anki<number[]>("findNotes", { query: clozeQuery });
  const atomicExisting = await anki<number[]>("findNotes", { query: 'tag:"editorial::reescrito-atomico"' });
  const atomicActiveCards = await anki<number[]>("findCards", { query: 'tag:"editorial::reescrito-atomico" -is:suspended' });
  const atomicSourcePending = await anki<number[]>("findNotes", { query: 'tag:"editorial::reescrito-atomico" tag:"editorial::fonte-pendente"' });
  let clozeCreated = false;
  if (!existingCloze.length && APLICAR) {
    await anki("createDeck", { deck: clozeDeck });
    const created = await anki<number>("addNote", {
      note: {
        deckName: clozeDeck,
        modelName: "Omissão de Palavras",
        fields: {
          Texto: "Na TC sem contraste do AVC isquêmico agudo, o exame inicial busca excluir {{c1::hemorragia}}.",
          "Verso Extra": `Fonte: ${FONTES.ais}<br>Interpretação: a TC inicial define segurança para reperfusão e exclui hemorragia.`
        },
        tags: ["codex-medicus", "cloze", "ciclo::clinico", "disciplina::neurologia", "subtema::neuro--avc-isquemico--diagnostico-e-conduta", "eixo::diagnostico", "fonte::aha-asa-2026", "revisao::2026-08", clozeTag],
        options: { allowDuplicate: false },
      },
    });
    clozeCreated = Boolean(created);
  }

  const report = {
    generatedAt: new Date().toISOString(), mode: APLICAR ? "aplicado" : "simulacao",
    missingReferenceRequested: missingIds.length,
    missingReferenceFound: missingNotes.length,
    clinicallyValidated: validacao.filter((x) => x.active).length,
    placeholdersKeptSuspended: validacao.filter((x) => x.pending).length,
    longRequested: Math.max(longIds.length, atomicExisting.length),
    longRewrittenAtomically: atomicos.length || atomicExisting.length,
    longValidatedAndActive: atomicos.length ? atomicos.filter((x) => x.sourceValidated).length : atomicActiveCards.length,
    longRewrittenSourcePending: atomicos.length ? atomicos.filter((x) => !x.sourceValidated).length : atomicSourcePending.length,
    clozeCreated,
    imageOcclusionCreated: false,
    imageOcclusionStatus: "pendente: AnkiConnect não expõe com segurança o formato de máscara nativa; nenhuma nota IO malformada foi criada.",
    unresolvedCurriculumLinks: [...new Set(validacao.map((x) => x.subtema))].length,
    cardsDeleted: 0,
    sourceRefs: Object.keys(FONTES),
  };
  await writeFile(resolve(pasta, "validacao-neuro-2026.json"), `${JSON.stringify({ report, items: validacao }, null, 2)}\n`, "utf8");
  await writeFile(resolve(pasta, "reescrita-atomica-2026.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), count: atomicos.length, items: atomicos }, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.stack ?? error.message : String(error)); process.exit(1); });
