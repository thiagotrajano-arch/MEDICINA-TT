/**
 * Corrige e libera somente notas candidatas confrontadas com fontes oficiais atuais.
 *
 * Uso:
 *   npx tsx scripts/anki-liberar-lote-validado-2026.mts
 *   npx tsx scripts/anki-liberar-lote-validado-2026.mts --aplicar
 *
 * A rotina preserva os IDs, registra os campos anteriores e não exclui cartões.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const APLICAR = process.argv.includes("--aplicar");
const LIMITE_FRENTE = 88;
const LIMITE_VERSO = 170;

type Resposta<T> = { result: T; error: string | null };
type Nota = {
  noteId: number;
  tags: string[];
  fields: Record<string, { value: string }>;
};
type Revisao = {
  noteId: number;
  frente: string;
  verso: string;
  referencia: string;
};

const FONTES = {
  colo: "Ministério da Saúde/INCA. Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2025; FAQ MS, 2026.",
  pni: "Ministério da Saúde. Instrução Normativa do Calendário Nacional de Vacinação, 2026.",
  tb: "Ministério da Saúde. Manual de Recomendações para Diagnóstico Laboratorial de Tuberculose, edição vigente; portal TB, acesso 2026.",
  gina: "Global Initiative for Asthma. GINA Strategy Report, 2026.",
  sepse: "Society of Critical Care Medicine. Surviving Sepsis Campaign Adult Guidelines, 2026.",
  meningite: "World Health Organization. Guidelines on meningitis diagnosis, treatment and care, 2025.",
} as const;

const REVISOES: Revisao[] = [
  { noteId: 1783388399085, frente: "Qual é o teste primário no novo rastreamento cervical do SUS?", verso: "Teste molecular para DNA-HPV oncogênico.", referencia: FONTES.colo },
  { noteId: 1783388399114, frente: "Após DNA-HPV negativo, quando repetir o rastreamento?", verso: "Em 5 anos.", referencia: FONTES.colo },
  { noteId: 1783389512706, frente: "Até quando aplicar a 1ª dose de rotavírus no PNI 2026?", verso: "De 1 mês e 15 dias até 11 meses e 29 dias.", referencia: FONTES.pni },
  { noteId: 1783426055757, frente: "Qual o limite etário da 2ª dose de rotavírus no PNI 2026?", verso: "De 3 meses e 15 dias até 23 meses e 29 dias.", referencia: FONTES.pni },
  { noteId: 1783426055974, frente: "Qual o esquema de rotina da vacina HPV entre 9 e 14 anos?", verso: "Dose única.", referencia: FONTES.pni },
  { noteId: 1783425473185, frente: "Qual exame é preferido nos casos novos de TB pulmonar?", verso: "TRM-TB em uma amostra; também detecta resistência à rifampicina.", referencia: FONTES.tb },
  { noteId: 1783425473234, frente: "Quantas amostras usar na baciloscopia diagnóstica da TB?", verso: "Duas: uma na consulta e outra na manhã seguinte.", referencia: FONTES.tb },
  { noteId: 1783425473331, frente: "Qual padrão radiográfico sugere TB pulmonar primária?", verso: "Adenopatia hilar ou mediastinal e consolidação; pode haver complexo de Ghon.", referencia: FONTES.tb },
  { noteId: 1783390543942, frente: "Que anti-inflamatório integra o tratamento controlador da asma?", verso: "Corticoide inalatório (CI).", referencia: FONTES.gina },
  { noteId: 1783390592767, frente: "Quais fármacos iniciar na crise asmática moderada ou grave?", verso: "SABA inalatório repetido e corticoide sistêmico precoce; associe ipratrópio nas crises graves.", referencia: FONTES.gina },
  { noteId: 1783390603758, frente: "LABA pode ser usado sem corticoide inalatório na asma?", verso: "Não. LABA sem CI aumenta o risco de eventos graves relacionados à asma.", referencia: FONTES.gina },
  { noteId: 1783425648336, frente: "Quais são os três componentes do qSOFA?", verso: "FR ≥22/min, alteração do estado mental e PAS ≤100 mmHg. Não use qSOFA isolado para triagem.", referencia: FONTES.sepse },
  { noteId: 1783425648577, frente: "Quando dar antibiótico em sepse provável, definida ou com choque?", verso: "Imediatamente, idealmente em até 1 hora.", referencia: FONTES.sepse },
  { noteId: 1783425648642, frente: "Quando adicionar vasopressina no choque séptico?", verso: "Quando a dose de noradrenalina estiver aumentando.", referencia: FONTES.sepse },
  { noteId: 1783425648858, frente: "Qual é a meta inicial de PAM no choque séptico?", verso: "65 mmHg.", referencia: FONTES.sepse },
  { noteId: 1783425507325, frente: "Qual a base empírica inicial da meningite bacteriana no adulto?", verso: "Ceftriaxona ou cefotaxima; acrescente vancomicina onde a resistência pneumocócica for relevante.", referencia: FONTES.meningite },
  { noteId: 1783425507516, frente: "Quando iniciar dexametasona na meningite bacteriana?", verso: "Com a primeira dose de antibiótico, idealmente imediatamente antes.", referencia: FONTES.meningite },
  { noteId: 1783425507587, frente: "Que sequela deve ser rastreada após meningite?", verso: "Perda auditiva, com avaliação audiológica.", referencia: FONTES.meningite },
  { noteId: 1783425507819, frente: "Qual padrão de LCR sugere meningite bacteriana?", verso: "Predomínio neutrofílico, proteína elevada e glicose ou razão LCR:sangue baixas.", referencia: FONTES.meningite },
  { noteId: 1783425507853, frente: "Quando fazer TC antes da punção lombar na meningite suspeita?", verso: "GCS <10, déficit focal ou craniano, papiledema, convulsão nova no adulto ou imunossupressão grave.", referencia: FONTES.meningite },
  { noteId: 1783425508010, frente: "Quais agentes predominam na meningite bacteriana do adulto?", verso: "Streptococcus pneumoniae e Neisseria meningitidis.", referencia: FONTES.meningite },
];

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!resposta.ok) throw new Error(`${action}: HTTP ${resposta.status}`);
  const corpo = await resposta.json() as Resposta<T>;
  if (corpo.error) throw new Error(`${action}: ${corpo.error}`);
  return corpo.result;
}

function texto(valor = ""): string {
  return valor.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

async function executar() {
  await anki<number>("version");
  const ids = REVISOES.map((item) => item.noteId);
  const notas = await anki<Nota[]>("notesInfo", { notes: ids });
  const encontradas = new Map(notas.map((nota) => [nota.noteId, nota]));
  const ausentes = ids.filter((id) => !encontradas.has(id));
  const semEstadoEditorial = notas
    .filter((nota) =>
      !nota.tags.includes("editorial::aguarda-validacao-clinica")
      && !nota.tags.includes("editorial::validado-diretriz-2026"))
    .map((nota) => nota.noteId);
  const foraDoLimite = REVISOES.filter((item) => item.frente.length > LIMITE_FRENTE || item.verso.length > LIMITE_VERSO);
  if (ausentes.length || semEstadoEditorial.length || foraDoLimite.length) {
    throw new Error(JSON.stringify({ ausentes, semEstadoEditorial, foraDoLimite }, null, 2));
  }

  const snapshot = notas.map((nota) => ({
    noteId: nota.noteId,
    tags: nota.tags,
    fields: Object.fromEntries(Object.entries(nota.fields).map(([nome, campo]) => [nome, campo.value])),
  }));
  const pasta = resolve("exports/anki");
  await mkdir(pasta, { recursive: true });
  await writeFile(resolve(pasta, "liberacao-validada-2026-antes-private.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), notes: snapshot }, null, 2)}\n`, "utf8");

  let alteradas = 0;
  let liberadas = 0;
  const jaValidadasAntes = notas.filter((nota) => nota.tags.includes("editorial::validado-diretriz-2026")).length;
  if (APLICAR) {
    for (const revisao of REVISOES) {
      const nota = encontradas.get(revisao.noteId)!;
      if (nota.tags.includes("editorial::validado-diretriz-2026")) continue;
      const tema = texto(nota.fields.Tema?.value ?? "");
      await anki("updateNoteFields", {
        note: {
          id: revisao.noteId,
          fields: {
            Frente: revisao.frente,
            Verso: revisao.verso,
            Tema: tema,
            Referencia: revisao.referencia,
          },
        },
      });
      await anki("removeTags", {
        notes: [revisao.noteId],
        tags: "editorial::aguarda-validacao-clinica editorial::fonte-generica-bloqueia-ativacao",
      });
      await anki("addTags", {
        notes: [revisao.noteId],
        tags: "editorial::validado-diretriz-2026 editorial::curto-atomico",
      });
      const cards = await anki<number[]>("findCards", { query: `nid:${revisao.noteId}` });
      if (cards.length !== 1) throw new Error(`Nota ${revisao.noteId}: esperado 1 cartão, encontrado ${cards.length}.`);
      await anki("unsuspend", { cards });
      alteradas += 1;
      liberadas += cards.length;
    }

    const restantes = await anki<number[]>("findNotes", { query: 'tag:"editorial::aguarda-validacao-clinica"' });
    if (restantes.length) {
      await anki("addTags", { notes: restantes, tags: "editorial::fonte-generica-bloqueia-ativacao" });
    }
  }

  const validadas = await anki<number[]>("findNotes", { query: 'tag:"editorial::validado-diretriz-2026"' });
  const aindaSuspensas = await anki<number[]>("findCards", { query: 'tag:"editorial::aguarda-validacao-clinica" is:suspended' });
  const cardsLiberados = await anki<number[]>("findCards", { query: 'tag:"editorial::validado-diretriz-2026" -is:suspended' });
  const relatorio = {
    generatedAt: new Date().toISOString(),
    mode: APLICAR ? "aplicado" : "simulacao",
    requested: REVISOES.length,
    alreadyValidatedBefore: jaValidadasAntes,
    changed: alteradas,
    releasedCards: liberadas,
    validatedNotesNow: validadas.length,
    validatedCardsActiveNow: cardsLiberados.length,
    pendingClinicalValidationSuspended: aindaSuspensas.length,
    cardsDeleted: 0,
  };
  const arquivoRelatorio = APLICAR
    ? "liberacao-validada-2026.json"
    : "liberacao-validada-2026-simulacao.json";
  await writeFile(resolve(pasta, arquivoRelatorio), `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(relatorio, null, 2));
}

executar().catch((erro: unknown) => {
  console.error(erro instanceof Error ? erro.message : String(erro));
  process.exit(1);
});
