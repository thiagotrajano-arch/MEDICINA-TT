/** Revisão idempotente do Anki: não apaga notas/cartões nem zera agendamento. */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DISCIPLINAS } from "../src/content/taxonomy";

const ENDPOINT = "http://127.0.0.1:8765";
const aplicar = process.argv.includes("--aplicar");

type Resposta<T> = { result: T; error: string | null };
type Nota = { noteId: number; modelName: string; tags: string[]; fields: Record<string, { value: string }>; cards: number[] };
type Cartao = { cardId: number; note: number; queue: number; type: number; deckName: string };
type Atomo = { id: string; deck: string; disciplina: string; subtema: string; eixo: string; tema: string; frente: string; verso: string; referencia: string };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!resposta.ok) throw new Error(`${action}: HTTP ${resposta.status}`);
  const corpo = await resposta.json() as Resposta<T>;
  if (corpo.error) throw new Error(`${action}: ${corpo.error}`);
  return corpo.result;
}

async function buscarEmLotes<T>(ids: number[], action: string, campo: string): Promise<T[]> {
  const itens: T[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) {
    itens.push(...await anki<T[]>(action, { [campo]: ids.slice(inicio, inicio + 100) }));
  }
  return itens;
}

function texto(valor = ""): string {
  return valor.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ").trim();
}

function slug(valor = ""): string {
  return texto(valor).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function separarFonte(verso: string): { verso: string; fonte?: string } {
  const html = verso.match(/^([\s\S]*?)(?:<br\s*\/?\s*>\s*)+<small>\s*Fonte:\s*([\s\S]*?)\s*<\/small>\s*$/i);
  const simples = verso.match(/^([\s\S]*?)(?:\r?\n)+\s*Fonte:\s*([\s\S]+)$/i);
  const achado = html ?? simples;
  if (!achado) return { verso };
  const resposta = (achado[1] ?? "").replace(/(?:<br\s*\/?\s*>\s*)*---\s*$/i, "").replace(/(?:<br\s*\/?\s*>\s*)+$/i, "").trim();
  const fonte = texto(achado[2] ?? "");
  return resposta && fonte ? { verso: resposta, fonte } : { verso };
}

const KDIGO = "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD; DOI 10.1016/j.kint.2023.10.016; revisão 2026-08-14.";
const ADA = "American Diabetes Association. Standards of Care in Diabetes—2026, seção 2; DOI 10.2337/dc26-S002; revisão 2026-08-14.";
const ASH = "American Society of Hematology. 2020 Guidelines for Management of VTE: Treatment of DVT and PE; revisão 2026-08-14.";
const AABB = "AABB. Red Blood Cell Transfusion: 2023 International Guidelines (JAMA); revisão 2026-08-14.";
const AASLD_ASCITE = "AASLD. Diagnosis, Evaluation and Management of Ascites, SBP and Hepatorenal Syndrome, 2021; revisão 2026-08-14.";
const AASLD_PORTAL = "AASLD Practice Guidance: Portal Hypertension Bleeding in Cirrhosis; Baveno VII, 2022; revisão 2026-08-14.";

const lote: Atomo[] = [
  { id: "drc-testes", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Nefrologia", disciplina: "nefrologia", subtema: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta", eixo: "diagnostico", tema: "DRC · avaliação", frente: "Quais dois testes devem ser usados para detectar DRC?", verso: "TFG estimada e albuminúria urinária.", referencia: KDIGO },
  { id: "drc-cronicidade", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Nefrologia", disciplina: "nefrologia", subtema: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta", eixo: "diagnostico", tema: "DRC · avaliação", frente: "Qual duração mínima comprova cronicidade da doença renal?", verso: "Três meses.", referencia: KDIGO },
  { id: "drc-achado-unico", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Nefrologia", disciplina: "nefrologia", subtema: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta", eixo: "pegadinha", tema: "DRC · avaliação", frente: "Uma única TFG baixa permite assumir cronicidade?", verso: "Não; pode representar injúria renal aguda ou doença renal aguda.", referencia: KDIGO },
  { id: "drc-acr", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Nefrologia", disciplina: "nefrologia", subtema: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta", eixo: "exames", tema: "DRC · albuminúria", frente: "Qual amostra é preferida para medir a relação albumina/creatinina?", verso: "Jato médio da primeira urina da manhã.", referencia: KDIGO },
  { id: "drc-cga", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Nefrologia", disciplina: "nefrologia", subtema: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta", eixo: "classificacao", tema: "DRC · classificação", frente: "Quais eixos formam a classificação CGA da DRC?", verso: "Causa, categoria de TFG e categoria de albuminúria.", referencia: KDIGO },

  { id: "dm-a1c", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Endocrinologia", disciplina: "endocrinologia", subtema: "endocrino--diabetes-mellitus--geral", eixo: "diagnostico", tema: "Diabetes · diagnóstico", frente: "Qual HbA1c laboratorial é diagnóstica de diabetes?", verso: "HbA1c ≥6,5%.", referencia: ADA },
  { id: "dm-jejum", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Endocrinologia", disciplina: "endocrinologia", subtema: "endocrino--diabetes-mellitus--geral", eixo: "diagnostico", tema: "Diabetes · diagnóstico", frente: "Qual glicemia de jejum é diagnóstica de diabetes?", verso: "≥126 mg/dL, após pelo menos 8 horas sem ingestão calórica.", referencia: ADA },
  { id: "dm-totg", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Endocrinologia", disciplina: "endocrinologia", subtema: "endocrino--diabetes-mellitus--geral", eixo: "diagnostico", tema: "Diabetes · diagnóstico", frente: "Qual glicemia de 2 horas no TOTG 75 g diagnostica diabetes?", verso: "≥200 mg/dL.", referencia: ADA },
  { id: "dm-casual", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Endocrinologia", disciplina: "endocrinologia", subtema: "endocrino--diabetes-mellitus--geral", eixo: "diagnostico", tema: "Diabetes · diagnóstico", frente: "Quando glicemia casual ≥200 mg/dL diagnostica diabetes?", verso: "Com sintomas clássicos de hiperglicemia ou crise hiperglicêmica.", referencia: ADA },
  { id: "dm-confirmacao", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Endocrinologia", disciplina: "endocrinologia", subtema: "endocrino--diabetes-mellitus--geral", eixo: "diagnostico", tema: "Diabetes · diagnóstico", frente: "Sem hiperglicemia inequívoca, como confirmar diabetes?", verso: "Com dois resultados anormais, no mesmo dia ou em dias diferentes.", referencia: ADA },

  { id: "tev-inicial", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Hematologia", disciplina: "hematologia", subtema: "hemato--disturbios-da-hemostasia--geral", eixo: "tratamento", tema: "TEV · anticoagulação", frente: "Quanto dura a fase inicial do tratamento do TEV?", verso: "As primeiras duas semanas.", referencia: ASH },
  { id: "tev-primario", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Hematologia", disciplina: "hematologia", subtema: "hemato--disturbios-da-hemostasia--geral", eixo: "tratamento", tema: "TEV · anticoagulação", frente: "Quanto dura o tratamento primário do TEV?", verso: "Três a seis meses.", referencia: ASH },
  { id: "tvp-trombolise", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Hematologia", disciplina: "hematologia", subtema: "hemato--disturbios-da-hemostasia--geral", eixo: "tratamento", tema: "TEV · TVP", frente: "Na maioria das TVP proximais, trombólise deve ser associada de rotina?", verso: "Não. Prefere-se anticoagulação isolada.", referencia: ASH },
  { id: "tvp-meia", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Hematologia", disciplina: "hematologia", subtema: "hemato--disturbios-da-hemostasia--geral", eixo: "tratamento", tema: "TEV · TVP", frente: "Meia compressiva previne rotineiramente síndrome pós-trombótica?", verso: "Não; pode ser usada para alívio sintomático selecionado.", referencia: ASH },
  { id: "transfusao-restritiva", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Hematologia", disciplina: "hematologia", subtema: "hemato--medicina-transfusional--indicacoes-de-hemocomponentes", eixo: "tratamento", tema: "Hemoterapia", frente: "Qual estratégia transfusional é preferida na maioria dos pacientes estáveis?", verso: "Estratégia restritiva, considerando sintomas e contexto clínico.", referencia: AABB },

  { id: "ascite-paracentese", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Gastroenterologia", disciplina: "gastroenterologia", subtema: "gastro--cirrose-e-complicacoes--diagnostico-e-conduta", eixo: "diagnostico", tema: "Cirrose · ascite", frente: "Ascite nova em cirrótico: qual procedimento diagnóstico inicial?", verso: "Paracentese diagnóstica.", referencia: AASLD_ASCITE },
  { id: "pbe-pmn", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Gastroenterologia", disciplina: "gastroenterologia", subtema: "gastro--cirrose-e-complicacoes--diagnostico-e-conduta", eixo: "diagnostico", tema: "Cirrose · PBE", frente: "Qual contagem de neutrófilos no líquido ascítico diagnostica PBE?", verso: "≥250 células/mm³.", referencia: AASLD_ASCITE },
  { id: "ascite-albumina", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Gastroenterologia", disciplina: "gastroenterologia", subtema: "gastro--cirrose-e-complicacoes--diagnostico-e-conduta", eixo: "tratamento", tema: "Cirrose · ascite", frente: "Após paracentese de grande volume, quando repor albumina?", verso: "Quando são removidos mais de 5 L de ascite.", referencia: AASLD_ASCITE },
  { id: "varizes-agudo", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Gastroenterologia", disciplina: "gastroenterologia", subtema: "gastro--cirrose-e-complicacoes--diagnostico-e-conduta", eixo: "tratamento", tema: "Cirrose · sangramento varicoso", frente: "Quais três medidas iniciar cedo no sangramento varicoso suspeito?", verso: "Droga vasoativa, antibiótico e endoscopia terapêutica.", referencia: AASLD_PORTAL },
  { id: "varizes-secundaria", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Gastroenterologia", disciplina: "gastroenterologia", subtema: "gastro--cirrose-e-complicacoes--diagnostico-e-conduta", eixo: "tratamento", tema: "Cirrose · sangramento varicoso", frente: "Como prevenir ressangramento de varizes esofágicas?", verso: "Betabloqueador não seletivo associado à ligadura elástica seriada.", referencia: AASLD_PORTAL },
];

function validarLote() {
  const ids = new Set<string>();
  const frentes = new Set<string>();
  for (const item of lote) {
    if (ids.has(item.id)) throw new Error(`ID repetido: ${item.id}`);
    ids.add(item.id);
    const chave = slug(item.frente);
    if (frentes.has(chave)) throw new Error(`Frente repetida: ${item.frente}`);
    frentes.add(chave);
    if (texto(item.frente).length > 88) throw new Error(`Frente longa: ${item.frente}`);
    if (texto(item.verso).length > 170) throw new Error(`Verso longo: ${item.frente}`);
    if (!item.referencia.trim()) throw new Error(`Sem referência: ${item.id}`);
  }
}

async function executar() {
  validarLote();
  await anki<number>("version");
  const noteIds = await anki<number[]>("findNotes", { query: "*" });
  const notas = await buscarEmLotes<Nota>(noteIds, "notesInfo", "notes");
  const cartoes = await buscarEmLotes<Cartao>(notas.flatMap((nota) => nota.cards), "cardsInfo", "cards");
  const cartaoPorNota = new Map(cartoes.map((cartao) => [cartao.note, cartao]));
  const fontesSeparadas: number[] = [];
  const taxonomia = new Map<number, Set<string>>();
  const longosAtivos: number[] = [];

  for (const nota of notas) {
    const frente = nota.fields.Frente ?? nota.fields.Front;
    const verso = nota.fields.Verso ?? nota.fields.Back;
    if (!frente || !verso) continue;
    const referencia = nota.fields.Referencia;
    const separado = separarFonte(verso.value);
    if (referencia && separado.fonte && separado.verso !== verso.value) {
      if (aplicar) await anki("updateNoteFields", { note: { id: nota.noteId, fields: { Verso: separado.verso, Referencia: referencia.value.trim() || separado.fonte } } });
      fontesSeparadas.push(nota.noteId);
      taxonomia.set(nota.noteId, new Set(["editorial::fonte-separada"]));
    }

    const tagDisciplina = nota.tags.find((tag) => tag.startsWith("disciplina::"))?.slice(12);
    const disciplina = DISCIPLINAS.find((item) => item.slug === tagDisciplina || item.id === tagDisciplina);
    if (disciplina && !nota.tags.some((tag) => tag.startsWith("subtema::"))) {
      const universo = slug(`${frente.value} ${nota.tags.join(" ")}`);
      const temas = disciplina.temas.filter((tema) => universo.includes(slug(tema.nome)) || nota.tags.includes(tema.slug) || nota.tags.includes(tema.id));
      if (temas.length === 1) {
        const novas = taxonomia.get(nota.noteId) ?? new Set<string>();
        const tagTema = `tema::${temas[0].id}`;
        if (!nota.tags.includes(tagTema)) novas.add(tagTema);
        if (temas[0].subtemas.length === 1) {
          const tagSubtema = `subtema::${temas[0].subtemas[0].id}`;
          if (!nota.tags.includes(tagSubtema)) novas.add(tagSubtema);
        }
        if (novas.size) taxonomia.set(nota.noteId, novas);
      }
    }
    if ((cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1 && texto(separado.verso).length > 170) longosAtivos.push(nota.noteId);
  }

  if (aplicar) {
    for (const [noteId, tags] of taxonomia) if (tags.size) await anki("addTags", { notes: [noteId], tags: [...tags].join(" ") });
    if (longosAtivos.length) {
      await anki("addTags", { notes: longosAtivos, tags: "editorial::aguarda-reescrita-curta" });
      const cards = longosAtivos.flatMap((id) => notas.find((nota) => nota.noteId === id)?.cards ?? []);
      if (cards.length) await anki("suspend", { cards });
    }
  }

  const frentesExistentes = new Set(notas.map((nota) => slug(nota.fields.Frente?.value ?? nota.fields.Front?.value ?? "")));
  let adicionados = 0;
  let existentes = 0;
  let preservados = 0;
  for (const item of lote) {
    if ((await anki<number[]>("findNotes", { query: `tag:"anki-id::20260814::${item.id}"` })).length) { existentes += 1; continue; }
    if (frentesExistentes.has(slug(item.frente))) { preservados += 1; continue; }
    if (!aplicar) continue;
    await anki<number>("createDeck", { deck: item.deck });
    const noteId = await anki<number | null>("addNote", { note: {
      deckName: item.deck,
      modelName: "OMED Bonito",
      fields: { Frente: item.frente, Verso: item.verso, Tema: item.tema, Referencia: item.referencia },
      tags: ["codex-medicus", "editorial::atomo", "editorial::validado-fonte-primaria", `anki-id::20260814::${item.id}`, "ciclo::clinico", "area::clinica-medica", `disciplina::${item.disciplina}`, `subtema::${item.subtema}`, `eixo::${item.eixo}`, "revisao::2026-08-14"],
      options: { allowDuplicate: false, duplicateScope: "collection" },
    } });
    if (!noteId) throw new Error(`Anki recusou ${item.id}`);
    adicionados += 1;
    frentesExistentes.add(slug(item.frente));
  }

  const relatorio = {
    generatedAt: new Date().toISOString(), mode: aplicar ? "aplicado" : "dry-run",
    safety: { notesDeleted: 0, cardsDeleted: 0, schedulingReset: 0 },
    collectionBefore: { notes: notas.length, cards: cartoes.length, suspended: cartoes.filter((item) => item.queue === -1).length },
    editorialStateBefore: {
      activeNotes: notas.filter((nota) => (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1).length,
      activeWithoutSubtheme: notas.filter((nota) => (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1 && !nota.tags.some((tag) => tag.startsWith("subtema::"))).length,
      activeWithoutThemeOrSubtheme: notas.filter((nota) => (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1 && !nota.tags.some((tag) => tag.startsWith("tema::") || tag.startsWith("subtema::"))).length,
      activeLongAnswers: longosAtivos.length,
    },
    repairs: { duplicatedSourcesSeparated: fontesSeparadas.length, safeTaxonomyTags: taxonomia.size, activeLongAnswersSuspended: longosAtivos.length },
    gapBatch: { planned: lote.length, added: adicionados, existingStableId: existentes, preservedExistingFront: preservados,
      byDiscipline: Object.fromEntries([...new Set(lote.map((item) => item.disciplina))].map((disciplina) => [disciplina, lote.filter((item) => item.disciplina === disciplina).length])) },
  };
  await mkdir(resolve("exports/anki"), { recursive: true });
  await writeFile(resolve("exports/anki/revisao-colecao-lacunas-2026.json"), `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(relatorio, null, 2));
}

void executar().catch((erro: unknown) => { console.error(erro instanceof Error ? erro.message : String(erro)); process.exitCode = 1; });
