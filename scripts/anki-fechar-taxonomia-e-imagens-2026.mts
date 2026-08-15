/** Fecha a taxonomia legada e cria um piloto visual idempotente. Nunca apaga cartões. */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DISCIPLINAS } from "../src/content/taxonomy";

const ENDPOINT = "http://127.0.0.1:8765";
const aplicar = process.argv.includes("--aplicar");
type Resposta<T> = { result: T; error: string | null };
type Nota = { noteId: number; modelName: string; tags: string[]; fields: Record<string, { value: string }>; cards: number[] };
type Cartao = { note: number; queue: number };
type Alvo = { disciplina: string; tema: string; subtema?: string };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify({ action, version: 6, params }), signal: AbortSignal.timeout(30_000) });
  const corpo = await resposta.json() as Resposta<T>;
  if (!resposta.ok || corpo.error) throw new Error(corpo.error ?? `${action}: HTTP ${resposta.status}`);
  return corpo.result;
}

async function lotes<T>(ids: number[], action: string, campo: string): Promise<T[]> {
  const resultado: T[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) resultado.push(...await anki<T[]>(action, { [campo]: ids.slice(inicio, inicio + 100) }));
  return resultado;
}

function texto(valor = ""): string { return valor.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ").trim(); }
function slug(valor = ""): string { return texto(valor).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const mapeamento = new Map<string, Alvo>(Object.entries({
  "Sangramento na Gravidez": { disciplina: "go", tema: "Hemorragias da gestação" },
  "DIP": { disciplina: "go", tema: "Infecções ginecológicas", subtema: "Doença inflamatória pélvica (DIP)" },
  "Infecções Congênitas": { disciplina: "go", tema: "Infecções congênitas (STORCH)", subtema: "Sífilis, toxoplasmose, CMV, rubéola" },
  "Gravidez Ectópica": { disciplina: "go", tema: "Hemorragias da gestação", subtema: "Primeira metade (abortamento, ectópica, mola)" },
  "Pré-eclâmpsia": { disciplina: "go", tema: "Síndromes hipertensivas da gestação", subtema: "Pré-eclâmpsia e eclâmpsia" },
  "Pré-natal": { disciplina: "go", tema: "Pré-natal" },
  "SOP": { disciplina: "go", tema: "Distúrbios endócrino-menstruais", subtema: "Síndrome dos ovários policísticos" },
  "Distócia e Partograma": { disciplina: "go", tema: "Assistência ao parto" },
  "Câncer de Colo do Útero": { disciplina: "go", tema: "Oncologia ginecológica", subtema: "Câncer de colo uterino" },
  "Câncer de Mama": { disciplina: "go", tema: "Mastologia", subtema: "Câncer de mama" },
  "Reanimação Neonatal": { disciplina: "ped", tema: "Neonatologia", subtema: "Reanimação neonatal" },
  "Convulsão Febril": { disciplina: "ped", tema: "Emergências pediátricas", subtema: "Convulsão febril" },
  "Bronquiolite": { disciplina: "ped", tema: "Infecções respiratórias na infância", subtema: "Bronquiolite" },
  "Crupe": { disciplina: "ped", tema: "Infecções respiratórias na infância", subtema: "Crupe (laringotraqueobronquite)" },
  "Diarreia Aguda": { disciplina: "ped", tema: "Gastroenterologia", subtema: "Diarreia aguda" },
  "Icterícia Neonatal": { disciplina: "ped", tema: "Neonatologia", subtema: "Icterícia neonatal" },
  "Exantemáticas": { disciplina: "ped", tema: "Doenças exantemáticas", subtema: "Sarampo, rubéola, exantema súbito, escarlatina" },
  "Tuberculose": { disciplina: "inf", tema: "Tuberculose" },
  "Dengue e Arboviroses": { disciplina: "inf", tema: "Arboviroses" },
  "Zoonoses": { disciplina: "inf", tema: "Zoonoses e doenças emergentes" },
  "ITU": { disciplina: "inf", tema: "Infecção do trato urinário", subtema: "Cistite e pielonefrite" },
  "HIV/AIDS": { disciplina: "inf", tema: "HIV/AIDS" },
  "Imunizações": { disciplina: "inf", tema: "Imunizações no adulto", subtema: "Vacinas do adulto" },
  "Pneumonias": { disciplina: "inf", tema: "Pneumonias" },
  "Sífilis": { disciplina: "inf", tema: "Infecções sexualmente transmissíveis", subtema: "Sífilis" },
  "Parasitoses Intestinais": { disciplina: "inf", tema: "Parasitoses intestinais e protozooses", subtema: "Helmintíases e protozooses — diagnóstico e tratamento" },
  "Endocardite Infecciosa": { disciplina: "inf", tema: "Endocardite infecciosa", subtema: "Critérios de Duke e manejo" },
  "Cirurgia Oncológica TGI": { disciplina: "cir", tema: "Oncologia do TGI alto", subtema: "Esôfago e estômago" },
  "Abdome Agudo": { disciplina: "cir", tema: "Abdome agudo" },
  "Trauma e ATLS": { disciplina: "cir", tema: "Trauma", subtema: "ATLS — atendimento inicial" },
  "Coloproctologia": { disciplina: "cir", tema: "Abdome agudo", subtema: "Coloproctologia e abdome agudo inflamatório" },
  "Ortopedia de Urgência": { disciplina: "cir", tema: "Ortopedia de urgência", subtema: "Epifisiólise e embolia gordurosa" },
  "Parede Abdominal": { disciplina: "cir", tema: "Hérnias da parede abdominal", subtema: "Inguinal, femoral, incisional" },
  "Urologia": { disciplina: "cir", tema: "Urologia cirúrgica", subtema: "Litíase, HPB e emergências escrotais" },
  "Vascular": { disciplina: "cir", tema: "Cirurgia vascular" },
  "Vias Biliares": { disciplina: "cir", tema: "Abdome agudo", subtema: "Colecistite e colangite" },
  "Anestesiologia": { disciplina: "cir", tema: "Pré e pós-operatório" },
  "Organização do SUS": { disciplina: "mfc", tema: "Saúde pública", subtema: "SUS — princípios e diretrizes" },
  "Níveis de Prevenção": { disciplina: "mfc", tema: "Prevenção", subtema: "Níveis de prevenção" },
  "Meta-análise e MBE": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Meta-análise e MBE" },
  "Medidas de Associação": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Medidas de associação" },
  "Indicadores de Saúde": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Indicadores de morbidade" },
  "Abordagem Familiar": { disciplina: "mfc", tema: "Abordagem familiar", subtema: "Genograma, ciclo de vida e crises familiares" },
  "APS e Atributos de Starfield": { disciplina: "mfc", tema: "Atenção Primária à Saúde", subtema: "Princípios da APS" },
  "Sensibilidade e Especificidade": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Testes diagnósticos (sensibilidade e especificidade)" },
  "Delineamentos de Estudo": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Tipos de estudo" },
  "Vieses e Causalidade": { disciplina: "mfc", tema: "Epidemiologia", subtema: "Vieses e causalidade" },
} as Record<string, Alvo>));

function tagsDoAlvo(nomeTopico: string, alvo: Alvo): string[] {
  const disciplina = DISCIPLINAS.find((item) => item.id === alvo.disciplina);
  const tema = disciplina?.temas.find((item) => item.nome === alvo.tema);
  if (!disciplina || !tema) throw new Error(`Taxonomia ausente: ${nomeTopico} -> ${alvo.disciplina}/${alvo.tema}`);
  const tags = [`tema::${tema.id}`, `topico::${alvo.disciplina}--${slug(nomeTopico)}`];
  if (alvo.subtema) {
    const subtema = tema.subtemas.find((item) => item.nome === alvo.subtema);
    if (!subtema) throw new Error(`Subtema ausente: ${nomeTopico} -> ${alvo.subtema}`);
    tags.push(`subtema::${subtema.id}`);
  } else tags.push("taxonomia::tema-confirmado-subtema-granular");
  return tags;
}

function refinarPorConteudo(nomeTopico: string, frente: string, alvo: Alvo): Alvo {
  if (alvo.subtema) return alvo;
  const f = slug(frente);
  let subtema: string | undefined;
  if (nomeTopico === "Sangramento na Gravidez") {
    subtema = /mola|abort/.test(f) ? "Primeira metade (abortamento, ectópica, mola)" : "Segunda metade (DPP, placenta prévia)";
  } else if (nomeTopico === "Pré-natal") {
    if (/suplement|vacin|imuniz|acido-folico|ferro/.test(f)) subtema = "Suplementação e imunização na gestação";
    else if (/exame|hemograma|sorolog|urina|ultrassom|glicemi|tipagem|coombs/.test(f)) subtema = "Exames por trimestre";
    else subtema = "Roteiro e consultas do pré-natal";
  } else if (nomeTopico === "Distócia e Partograma") {
    if (/forceps|vaginal-operatorio/.test(f)) subtema = "Parto vaginal operatório";
    else if (/apresentacao|delee|bacia|estatica|cormica|situacao-transversa/.test(f)) subtema = "Bacia obstétrica e estática fetal";
    else if (/partograma|linha-de-acao|dilatacao|fase-ativa|parada-secundaria|ocitocina|taquissistolia/.test(f)) subtema = "Partograma";
    else subtema = "Mecanismo e fases do parto";
  } else if (nomeTopico === "Tuberculose") {
    subtema = /latente|iltb|ppd|igra/.test(f) ? "TB latente" : "Diagnóstico e tratamento";
  } else if (nomeTopico === "Dengue e Arboviroses") {
    subtema = /zika|chikungunya/.test(f) ? "Zika e chikungunya" : "Dengue — classificação e manejo";
  } else if (nomeTopico === "Zoonoses") {
    if (/raiva/.test(f)) subtema = "Raiva — profilaxia pós-exposição";
    else if (/mpox|monkeypox/.test(f)) subtema = "Mpox (monkeypox)";
    else subtema = "Leptospirose — fases e manejo";
  } else if (nomeTopico === "HIV/AIDS") {
    subtema = /oportunist|pneumocist|toxoplasm|criptococ|candid|cd4.*profilax/.test(f) ? "Infecções oportunistas" : "Diagnóstico e TARV";
  } else if (nomeTopico === "Pneumonias") {
    subtema = /hospital|ventilacao|pav|nosocomial/.test(f) ? "Pneumonia hospitalar e associada à ventilação" : "Pneumonia adquirida na comunidade";
  } else if (nomeTopico === "Abdome Agudo") {
    if (/apendic/.test(f)) subtema = "Apendicite aguda";
    else if (/colecist|colang/.test(f)) subtema = "Colecistite e colangite";
    else if (/diverticul|coloproct/.test(f)) subtema = "Coloproctologia e abdome agudo inflamatório";
    else subtema = "Abordagem do abdome agudo";
  } else if (nomeTopico === "Vascular") {
    if (/isquemia-aguda|isquemia-critica/.test(f)) subtema = "Isquemia arterial aguda";
    else if (/aaa|aneurisma/.test(f)) subtema = "Aneurisma de aorta";
    else subtema = "DAOP, TVP e aneurisma de aorta";
  } else if (nomeTopico === "Anestesiologia") {
    subtema = /cefaleia-pos-puncao|pos-raqui|blood-patch/.test(f) ? "Complicações pós-operatórias" : "Avaliação de risco cirúrgico";
  }
  return subtema ? { ...alvo, subtema } : alvo;
}

const visuais = [
  { id: "io-avci-tc", deck: "MEDICINA::Ciclo Clínico::Clínica Médica::Neurologia", arquivo: "avc-isquemico-tc.jpg", caminho: "public/img/clinicas/avc-isquemico-tc.jpg", largura: 549, altura: 354, x: 20, y: 92, w: 95, h: 100, cabecalho: "TC sem contraste: qual achado está oculto?", resposta: "Hipodensidade em território da ACM, compatível com AVC isquêmico.", fonte: "Wikimedia Commons; CC BY-SA 4.0; autor 0475ramosk; File:1-s2.0-S0967586810002766-gr2.jpg", tags: ["disciplina::neurologia", "subtema::neuro--avc-isquemico--diagnostico-e-conduta", "eixo::imagem"] },
  { id: "io-crupe-rx", deck: "MEDICINA::Ciclo Clínico::Materno-Infantil::Pediatria", arquivo: "crupe-sinal-torre.jpg", caminho: "public/img/clinicas/crupe-sinal-torre.jpg", largura: 424, altura: 420, x: 180, y: 90, w: 110, h: 115, cabecalho: "Radiografia cervical: qual sinal está oculto?", resposta: "Sinal da torre: estreitamento subglótico associado ao crupe.", fonte: "Wikimedia Commons; CC BY-SA 3.0; File:Steeple_sign_of_croup.jpg", tags: ["disciplina::pediatria", "subtema::ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite", "eixo::imagem"] },
  { id: "io-mola-us", deck: "MEDICINA::Ciclo Clínico::Materno-Infantil::Ginecologia & Obstetrícia", arquivo: "mola-hidatiforme-us.jpg", caminho: "public/img/clinicas/mola-hidatiforme-us.jpg", largura: 676, altura: 568, x: 120, y: 180, w: 430, h: 300, cabecalho: "Ultrassonografia: qual padrão está oculto?", resposta: "Padrão vesicular em tempestade de neve, sugestivo de mola hidatiforme.", fonte: "Wikimedia Commons; CC0; File:Hydatidiform_mole_ultrasound.jpg", tags: ["disciplina::ginecologia-obstetricia", "subtema::go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola", "eixo::imagem"] },
];

function mascara(item: typeof visuais[number], resposta: boolean): string {
  const fill = resposta ? "none" : "#111827";
  const stroke = resposta ? "#22c55e" : "#f8fafc";
  const label = resposta ? "ACHADO" : "?";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${item.largura}" height="${item.altura}" viewBox="0 0 ${item.largura} ${item.altura}"><rect width="100%" height="100%" fill="none"/><rect x="${item.x}" y="${item.y}" width="${item.w}" height="${item.h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="6"/><text x="${item.x + item.w / 2}" y="${item.y + item.h / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="700" font-size="28" fill="${stroke}">${label}</text></svg>`;
}

const noteIds = await anki<number[]>("findNotes", { query: "tag:codex-medicus" });
const notas = await lotes<Nota>(noteIds, "notesInfo", "notes");
const cartoes = await lotes<Cartao>(notas.flatMap((nota) => nota.cards), "cardsInfo", "cards");
const cartaoPorNota = new Map(cartoes.map((cartao) => [cartao.note, cartao]));
const pendentes = notas.filter((nota) => (cartaoPorNota.get(nota.noteId)?.queue ?? -1) !== -1 && !nota.tags.some((tag) => tag.startsWith("subtema::")));
const alteracoes = new Map<number, string[]>();
const naoMapeados: Array<{ noteId: number; tema: string; frente: string }> = [];
const rejeitados: number[] = [];

for (const nota of pendentes) {
  const tema = texto(nota.fields.Tema?.value ?? "");
  if (tema === "AVCIu" && texto(nota.fields.Frente?.value ?? "") === "AVCIu") { rejeitados.push(nota.noteId); continue; }
  const alvo = mapeamento.get(tema);
  const frente = texto(nota.fields.Frente?.value ?? "");
  if (!alvo) { naoMapeados.push({ noteId: nota.noteId, tema, frente }); continue; }
  const novas = tagsDoAlvo(tema, refinarPorConteudo(tema, frente, alvo)).filter((tag) => !nota.tags.includes(tag));
  if (novas.length) alteracoes.set(nota.noteId, novas);
}

const auditoria = JSON.parse(await readFile(resolve("exports/anki/auditoria-editorial.json"), "utf8")) as { queues?: { longBackNoteIds?: number[] } };
const longosArquivados = (auditoria.queues?.longBackNoteIds ?? []).filter((id) => notas.some((nota) => nota.noteId === id && (cartaoPorNota.get(id)?.queue ?? -1) === -1));
const fontesRecolhiveis = notas.flatMap((nota) => {
  if ((cartaoPorNota.get(nota.noteId)?.queue ?? -1) === -1) return [];
  const backField = nota.fields.Back ? "Back" : nota.fields.Verso ? "Verso" : "";
  const back = backField ? nota.fields[backField].value : "";
  const basico = back.match(/^([\s\S]*?)(?:<br\s*\/?\s*>\s*)+<small>\s*Fonte:\s*([\s\S]*?)<\/small>\s*$/i);
  if (basico && texto(basico[1]).length <= 170 && !back.includes("<details")) return [{ noteId: nota.noteId, field: backField, value: `${basico[1].trim()}<details class="fonte"><summary>Fonte</summary><small>${basico[2].trim()}</small></details>` }];
  const extra = nota.fields["Verso Extra"]?.value ?? "";
  const cloze = extra.match(/^\s*Fonte:\s*([\s\S]*?)<br\s*\/?\s*>\s*(Interpretação:[\s\S]*)$/i);
  if (cloze && !extra.includes("<details")) return [{ noteId: nota.noteId, field: "Verso Extra", value: `${cloze[2].trim()}<details class="fonte"><summary>Fonte</summary><small>${cloze[1].trim()}</small></details>` }];
  return [];
});

if (aplicar) {
  for (const [noteId, tags] of alteracoes) await anki("addTags", { notes: [noteId], tags: tags.join(" ") });
  if (rejeitados.length) {
    await anki("addTags", { notes: rejeitados, tags: "editorial::rejeitado-placeholder editorial::nao-estudar" });
    const cards = rejeitados.flatMap((id) => notas.find((nota) => nota.noteId === id)?.cards ?? []);
    if (cards.length) await anki("suspend", { cards });
  }
  if (longosArquivados.length) await anki("addTags", { notes: longosArquivados, tags: "editorial::arquivado-resumo-longo editorial::nao-estudar" });
  for (const item of fontesRecolhiveis) await anki("updateNoteFields", { note: { id: item.noteId, fields: { [item.field]: item.value } } });
}

let visuaisCriados = 0;
let visuaisExistentes = 0;
for (const item of visuais) {
  const tagId = `anki-id::20260814::${item.id}`;
  if ((await anki<number[]>("findNotes", { query: `tag:"${tagId}"` })).length) { visuaisExistentes += 1; continue; }
  if (!aplicar) continue;
  const original = `codexmedicus_${item.arquivo}`;
  const qmask = `codexmedicus_${item.id}_q.svg`;
  const amask = `codexmedicus_${item.id}_a.svg`;
  await anki("storeMediaFile", { filename: original, data: (await readFile(resolve(item.caminho))).toString("base64") });
  await anki("storeMediaFile", { filename: qmask, data: Buffer.from(mascara(item, false)).toString("base64") });
  await anki("storeMediaFile", { filename: amask, data: Buffer.from(mascara(item, true)).toString("base64") });
  await anki("createDeck", { deck: item.deck });
  const noteId = await anki<number | null>("addNote", { note: {
    deckName: item.deck, modelName: "Image Occlusion Enhanced",
    fields: { "ID (hidden)": item.id, Header: item.cabecalho, Image: `<img src="${original}">`, "Question Mask": `<img src="${qmask}">`, Footer: "Reconheça o padrão antes de revelar.", Remarks: item.resposta, Sources: item.fonte, "Extra 1": "", "Extra 2": "", "Answer Mask": `<img src="${amask}">`, "Original Mask": `<img src="${qmask}">` },
    tags: ["codex-medicus", "editorial::visual-validado", "licenca::aberta", "ciclo::clinico", tagId, ...item.tags], options: { allowDuplicate: false, duplicateScope: "collection" },
  } });
  if (!noteId) throw new Error(`Anki recusou o cartão visual ${item.id}`);
  visuaisCriados += 1;
}

console.log(JSON.stringify({ mode: aplicar ? "aplicado" : "dry-run", safety: { deleted: 0, schedulingReset: 0 }, activeWithoutSubthemeBefore: pendentes.length, notesWithTaxonomyChanges: alteracoes.size, unresolved: naoMapeados.length, rejectedPlaceholders: rejeitados.length, archivedLongSummaries: longosArquivados.length, activeSourcesCollapsed: fontesRecolhiveis.length, visualCards: { planned: visuais.length, created: visuaisCriados, existing: visuaisExistentes } }, null, 2));
if (naoMapeados.length) console.log(JSON.stringify({ naoMapeados: naoMapeados.slice(0, 20) }, null, 2));
