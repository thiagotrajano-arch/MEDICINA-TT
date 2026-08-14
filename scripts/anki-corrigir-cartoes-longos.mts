/**
 * Correção conservadora do acervo do Anki.
 *
 * 1. Tira da fila os cartões que não atendem ao padrão curto de revisão.
 * 2. Preserva notas, IDs, referências e histórico: nenhum cartão é apagado.
 * 3. Cria um primeiro lote atômico somente para lacunas com diretrizes
 *    conferidas nesta rodada.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const MODEL = "OMED Bonito";
// Limites deliberadamente conservadores: uma pergunta recuperável e uma
// frase-resposta. O texto de contexto e a referência ficam fora do teste.
const LIMITE_FRENTE = 88;
const LIMITE_VERSO = 170;

type AnkiResponse<T> = { result: T; error: string | null };
type NoteInfo = {
  noteId: number;
  tags: string[];
  fields: Record<string, { value: string }>;
};

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${action}: HTTP ${response.status}`);
  const body = await response.json() as AnkiResponse<T>;
  if (body.error) throw new Error(`${action}: ${body.error}`);
  return body.result;
}

function texto(valor = ""): string {
  return valor
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function emLotes<T>(itens: T[], tamanho: number, executar: (lote: T[]) => Promise<void>) {
  for (let inicio = 0; inicio < itens.length; inicio += tamanho) await executar(itens.slice(inicio, inicio + tamanho));
}

type Cartao = {
  id: string;
  deck: string;
  disciplina: string;
  subtema: string;
  eixo: "diagnostico" | "tratamento" | "complicacoes" | "epidemiologia";
  frente: string;
  verso: string;
  referencia: string;
};

const CLINICA = "MEDICINA::Ciclo Clínico::Clínica Médica::";
const CARTOES: Cartao[] = [
  {
    id: "meningite-diagnostico-base",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Como se estabelece o diagnóstico de meningite aguda?",
    verso: "Clínica + LCR + exames de sangue.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "meningite-puncao-tempo",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Quando fazer punção lombar na suspeita de meningite, sem contraindicação?",
    verso: "O mais cedo possível, idealmente antes do antimicrobiano.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "meningite-lcr-inicial",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Quais testes básicos do LCR na suspeita de meningite?",
    verso: "Gram, células/diferencial, proteína, glicose e razão LCR:glicemia.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "meningite-hemocultura",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Quando colher hemoculturas na suspeita de meningite bacteriana?",
    verso: "O mais cedo possível, preferencialmente antes do antibiótico.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "meningite-atb-nao-adiar",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Atraso em exames pode atrasar antibiótico na meningite suspeita?",
    verso: "Não. Inicie tratamento empírico IV o mais cedo possível.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "meningite-listeria-risco",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--meningites-e-encefalites--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Quais fatores exigem cobertura adicional para Listeria na meningite?",
    verso: "Idade >60 anos, gestação ou imunossupressão.",
    referencia: "WHO. Guidelines on meningitis diagnosis, treatment and care, 2025; rev. 2026-08-14.",
  },
  {
    id: "hda-gbs-baixo-risco",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Qual Glasgow-Blatchford sugere HDA de risco muito baixo?",
    verso: "0–1; pode permitir seguimento ambulatorial, conforme avaliação clínica.",
    referencia: "ACG Clinical Guideline: Upper GI and Ulcer Bleeding, 2021; rev. 2026-08-14.",
  },
  {
    id: "hda-transfusao",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Qual limiar transfusional sugerido na HDA hospitalizada?",
    verso: "Hemoglobina de 7 g/dL, com individualização clínica.",
    referencia: "ACG Clinical Guideline: Upper GI and Ulcer Bleeding, 2021; rev. 2026-08-14.",
  },
  {
    id: "hda-endoscopia",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Em quanto tempo indicar endoscopia na HDA hospitalizada?",
    verso: "Em até 24 horas após a apresentação, após estabilização.",
    referencia: "ACG Clinical Guideline: Upper GI and Ulcer Bleeding, 2021; rev. 2026-08-14.",
  },
  {
    id: "hda-hemostasia-endoscopica",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Que úlcera indica hemostasia endoscópica na HDA?",
    verso: "Sangramento ativo ou vaso visível não sangrante.",
    referencia: "ACG Clinical Guideline: Upper GI and Ulcer Bleeding, 2021; rev. 2026-08-14.",
  },
  {
    id: "hdb-angio-tc",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Qual exame ganhou papel no sangramento digestivo baixo grave e contínuo?",
    verso: "Angio-TC, especialmente na hemorragia importante em curso.",
    referencia: "ACG. Management of Acute Lower GI Bleeding, 2023; rev. 2026-08-14.",
  },
  {
    id: "hdb-colonoscopia-urgente",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--hemorragia-digestiva--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Colonoscopia urgente <24 h melhora desfechos na HDB internada?",
    verso: "Não foi demonstrado benefício em desfechos importantes; não é rotina.",
    referencia: "ACG. Management of Acute Lower GI Bleeding, 2023; rev. 2026-08-14.",
  },
  {
    id: "rciu-meta",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Qual é o objetivo terapêutico de longo prazo na retocolite ulcerativa?",
    verso: "Remissão sustentada sem corticoide, com melhora endoscópica.",
    referencia: "ACG Clinical Guideline Update: Ulcerative Colitis in Adults, 2025; rev. 2026-08-14.",
  },
  {
    id: "rciu-corticoide-manutencao",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Corticoide sistêmico é terapia de manutenção na retocolite?",
    verso: "Não. Corticoides não devem manter remissão.",
    referencia: "ACG Clinical Guideline Update: Ulcerative Colitis in Adults, 2025; rev. 2026-08-14.",
  },
  {
    id: "rciu-grave-cdiff",
    deck: `${CLINICA}Gastroenterologia`, disciplina: "gastroenterologia",
    subtema: "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Que infecção deve ser pesquisada na retocolite ulcerativa aguda grave?",
    verso: "Clostridioides difficile, na apresentação.",
    referencia: "ACG Clinical Guideline Update: Ulcerative Colitis in Adults, 2025; rev. 2026-08-14.",
  },
  {
    id: "tireoide-rastreio-inicial",
    deck: `${CLINICA}Endocrinologia`, disciplina: "endocrinologia",
    subtema: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo", eixo: "diagnostico",
    frente: "Qual exame inicial no adulto sem suspeita de disfunção tireoidiana central?",
    verso: "TSH isolado.",
    referencia: "NICE NG145. Thyroid disease: assessment and management, atualizado 2023; revisão 2025.",
  },
  {
    id: "tireoide-tsh-alto",
    deck: `${CLINICA}Endocrinologia`, disciplina: "endocrinologia",
    subtema: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo", eixo: "diagnostico",
    frente: "TSH alto: qual dosagem complementar no mesmo tubo?",
    verso: "T4 livre.",
    referencia: "NICE NG145. Thyroid disease: assessment and management, atualizado 2023; revisão 2025.",
  },
  {
    id: "tireoide-tsh-baixo",
    deck: `${CLINICA}Endocrinologia`, disciplina: "endocrinologia",
    subtema: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo", eixo: "diagnostico",
    frente: "TSH baixo: quais dosagens complementares no mesmo tubo?",
    verso: "T4 livre e T3 livre.",
    referencia: "NICE NG145. Thyroid disease: assessment and management, atualizado 2023; revisão 2025.",
  },
  {
    id: "tireoide-hipotireoidismo-primeira-linha",
    deck: `${CLINICA}Endocrinologia`, disciplina: "endocrinologia",
    subtema: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo", eixo: "tratamento",
    frente: "Tratamento de primeira linha do hipotireoidismo primário?",
    verso: "Levotiroxina.",
    referencia: "NICE NG145. Thyroid disease: assessment and management, atualizado 2023; revisão 2025.",
  },
  {
    id: "tireoide-liotironina",
    deck: `${CLINICA}Endocrinologia`, disciplina: "endocrinologia",
    subtema: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo", eixo: "tratamento",
    frente: "Liotironina deve ser usada rotineiramente no hipotireoidismo primário?",
    verso: "Não; não há benefício comprovado sobre levotiroxina isolada.",
    referencia: "NICE NG145. Thyroid disease: assessment and management, atualizado 2023; revisão 2025.",
  },
  {
    id: "drc-acidose-limiar",
    deck: `${CLINICA}Nefrologia`, disciplina: "nefrologia",
    subtema: "nefro--disturbios-hidroeletroliticos-e-acido-base--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Na DRC, que bicarbonato sérico sugere intervir contra acidose?",
    verso: "<18 mmol/L é um exemplo de limiar com possível repercussão clínica.",
    referencia: "KDIGO 2024 CKD Guideline, Practice Point 3.10.1; rev. 2026-08-14.",
  },
  {
    id: "drc-acidose-monitorizacao",
    deck: `${CLINICA}Nefrologia`, disciplina: "nefrologia",
    subtema: "nefro--disturbios-hidroeletroliticos-e-acido-base--diagnostico-e-conduta", eixo: "tratamento",
    frente: "O que monitorar ao tratar acidose metabólica na DRC?",
    verso: "Bicarbonato, pressão arterial, potássio e estado volêmico.",
    referencia: "KDIGO 2024 CKD Guideline, Practice Point 3.10.2; rev. 2026-08-14.",
  },
  {
    id: "icfer-fracao-ejecao",
    deck: `${CLINICA}Cardiologia`, disciplina: "cardiologia",
    subtema: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Qual fração de ejeção define ICFEr?",
    verso: "FEVE ≤40%.",
    referencia: "AHA/ACC/HFSA. Guideline for the Management of Heart Failure, 2022; rev. 2026-08-13.",
  },
  {
    id: "icfimp-definicao",
    deck: `${CLINICA}Cardiologia`, disciplina: "cardiologia",
    subtema: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Como se define IC com fração de ejeção melhorada (ICFEm)?",
    verso: "FEVE prévia ≤40% e medida posterior >40%.",
    referencia: "AHA/ACC/HFSA. Guideline for the Management of Heart Failure, 2022; rev. 2026-08-13.",
  },
  {
    id: "icfimp-manter-tratamento",
    deck: `${CLINICA}Cardiologia`, disciplina: "cardiologia",
    subtema: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Na ICFEm, deve-se manter o tratamento previamente indicado para ICFEr?",
    verso: "Sim. Mantém-se o tratamento da ICFEr.",
    referencia: "AHA/ACC/HFSA. Guideline for the Management of Heart Failure, 2022; rev. 2026-08-13.",
  },
  {
    id: "icfer-quatro-pilares",
    deck: `${CLINICA}Cardiologia`, disciplina: "cardiologia",
    subtema: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Quais são os quatro pilares farmacológicos da ICFEr?",
    verso: "ARNI/IECA/BRA, betabloqueador, ARM e inibidor de SGLT2.",
    referencia: "AHA/ACC/HFSA. Guideline for the Management of Heart Failure, 2022; rev. 2026-08-13.",
  },
  {
    id: "icfer-diuretico-congestao",
    deck: `${CLINICA}Cardiologia`, disciplina: "cardiologia",
    subtema: "cardio--insuficiencia-cardiaca-icfer-e-icfep--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Quando o diurético é indicado na insuficiência cardíaca?",
    verso: "Quando há retenção de líquido/congestão.",
    referencia: "AHA/ACC/HFSA. Guideline for the Management of Heart Failure, 2022; rev. 2026-08-13.",
  },
  {
    id: "asma-saba-isolado",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--asma-cronica-e-crise-aguda--diagnostico-e-conduta", eixo: "tratamento",
    frente: "SABA isolado é recomendado como tratamento da asma?",
    verso: "Não. GINA não recomenda tratamento apenas com SABA.",
    referencia: "GINA. Global Strategy for Asthma Management and Prevention, 2026; rev. 2026-08-13.",
  },
  {
    id: "asma-diagnostico-objetivo",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--asma-cronica-e-crise-aguda--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Que achado funcional confirma objetivamente a asma?",
    verso: "Evidência de limitação expiratória variável.",
    referencia: "GINA. Global Strategy for Asthma Management and Prevention, 2026; rev. 2026-08-13.",
  },
  {
    id: "asma-espirometria",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--asma-cronica-e-crise-aguda--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Qual teste avalia mais confiavelmente a função pulmonar na asma?",
    verso: "Espirometria, com VEF1 e relação VEF1/CVF.",
    referencia: "GINA. Global Strategy for Asthma Management and Prevention, 2026; rev. 2026-08-13.",
  },
  {
    id: "asma-pfe-limitacao",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--asma-cronica-e-crise-aguda--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Como o PFE se compara à espirometria para medir função pulmonar?",
    verso: "É menos confiável, mas é melhor que nenhuma medida objetiva.",
    referencia: "GINA. Global Strategy for Asthma Management and Prevention, 2026; rev. 2026-08-13.",
  },
  {
    id: "asma-ics-com-saba",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--asma-cronica-e-crise-aguda--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Se ICS-formoterol não estiver disponível, como evitar SABA isolado?",
    verso: "Usar ICS-SABA ou tomar ICS sempre que usar SABA.",
    referencia: "GINA. Global Strategy for Asthma Management and Prevention, 2026; rev. 2026-08-13.",
  },
  {
    id: "dpoc-confirmacao-espirometrica",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--dpoc-cronico-e-exacerbado--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "Que resultado confirma DPOC na espirometria?",
    verso: "VEF1/CVF pós-broncodilatador <0,70, no contexto clínico adequado.",
    referencia: "GOLD. Global Strategy for COPD, 2026; rev. 2026-08-13.",
  },
  {
    id: "dpoc-espirometria-pos-bd",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--dpoc-cronico-e-exacerbado--diagnostico-e-conduta", eixo: "diagnostico",
    frente: "A espirometria pós-broncodilatador é necessária para diagnosticar DPOC?",
    verso: "Sim. É necessária para confirmar o diagnóstico.",
    referencia: "GOLD. Global Strategy for COPD, 2026; rev. 2026-08-13.",
  },
  {
    id: "dpoc-grupo-e",
    deck: `${CLINICA}Pneumologia`, disciplina: "pneumologia",
    subtema: "pneumo--dpoc-cronico-e-exacerbado--diagnostico-e-conduta", eixo: "epidemiologia",
    frente: "Que histórico de exacerbação classifica DPOC no grupo E?",
    verso: "≥2 moderadas ou ≥1 com hospitalização no último ano.",
    referencia: "GOLD. Global Strategy for COPD, 2025; rev. 2026-08-13.",
  },
  {
    id: "avci-trombolise-opcoes",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Quais trombolíticos IV são aceitos na janela de 4,5 h do AVCi?",
    verso: "Alteplase ou tenecteplase, no paciente elegível.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
  {
    id: "avci-nao-atrasar-ivt",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Imagem multimodal adicional deve atrasar trombólise IV elegível?",
    verso: "Não. O tratamento trombolítico não deve ser atrasado.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
  {
    id: "avci-deficit-nao-incapacitante",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "No AVCi com déficit não incapacitante em até 4,5 h, qual preferência?",
    verso: "Dupla antiagregação, em vez de trombólise IV.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
  {
    id: "avci-antitrombotico-adjuvante",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Antitrombótico adjuvante melhora desfecho junto à trombólise IV?",
    verso: "Não. Não é recomendado para aumentar o efeito da trombólise.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
  {
    id: "avci-glicemia-intensiva",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Controle glicêmico intensivo 80–130 mg/dL melhora desfecho no AVCi?",
    verso: "Não; aumenta o risco de hipoglicemia grave.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
  {
    id: "avci-pas-intensiva-evt",
    deck: `${CLINICA}Neurologia`, disciplina: "neurologia",
    subtema: "neuro--avc-isquemico--diagnostico-e-conduta", eixo: "tratamento",
    frente: "Após EVT, reduzir PAS intensivamente para <140 melhora o desfecho?",
    verso: "Não. Pode causar dano e não é recomendado.",
    referencia: "AHA/ASA. Early Management of Acute Ischemic Stroke, 2026; rev. 2026-08-13.",
  },
];

function validarCartao(cartao: Cartao) {
  const frente = texto(cartao.frente);
  const verso = texto(cartao.verso);
  if (frente.length > LIMITE_FRENTE || verso.length > LIMITE_VERSO) {
    throw new Error(`Cartão ${cartao.id} ultrapassa o padrão curto.`);
  }
}

async function executar() {
  await anki<number>("version");
  const noteIds = await anki<number[]>("findNotes", { query: 'deck:"MEDICINA" -is:suspended' });
  const notas: NoteInfo[] = [];
  await emLotes(noteIds, 100, async (lote) => {
    notas.push(...await anki<NoteInfo[]>("notesInfo", { notes: lote }));
  });
  const longas = notas.filter((nota) => {
    const frente = texto(nota.fields.Frente?.value ?? nota.fields.Front?.value ?? "");
    const verso = texto(nota.fields.Verso?.value ?? nota.fields.Back?.value ?? "");
    return frente.length > LIMITE_FRENTE || verso.length > LIMITE_VERSO;
  });

  const longasIds = longas.map((nota) => nota.noteId);
  if (longasIds.length) {
    await emLotes(longasIds, 500, async (lote) => {
      await anki("addTags", { notes: lote, tags: "editorial::texto-longo editorial::aguarda-reescrita-curta" });
    });
    const cards: number[] = [];
    await emLotes(longasIds, 100, async (lote) => {
      for (const noteId of lote) cards.push(...await anki<number[]>("findCards", { query: `nid:${noteId} -is:suspended` }));
    });
    await emLotes([...new Set(cards)], 500, async (lote) => anki("suspend", { cards: lote }));
  }

  let adicionados = 0;
  for (const cartao of CARTOES) {
    validarCartao(cartao);
    const tagId = `anki-id::20260814::${cartao.id}`;
    const jaExiste = await anki<number[]>("findNotes", { query: `tag:"${tagId}"` });
    if (jaExiste.length) continue;
    await anki("createDeck", { deck: cartao.deck });
    await anki<number>("addNote", {
      note: {
        deckName: cartao.deck,
        modelName: MODEL,
        fields: { Frente: cartao.frente, Verso: cartao.verso, Tema: cartao.subtema, Referencia: cartao.referencia },
        tags: ["codex-medicus", tagId, "editorial::atomo", "fonte::diretriz", "ciclo::clinico", "area::clinica-medica", `disciplina::${cartao.disciplina}`, `subtema::${cartao.subtema}`, `eixo::${cartao.eixo}`],
        options: { allowDuplicate: false, duplicateScope: "deck" },
      },
    });
    adicionados += 1;
  }

  const relatorio = {
    generatedAt: new Date().toISOString(),
    criterion: { maxFrontChars: LIMITE_FRENTE, maxBackChars: LIMITE_VERSO },
    suspendedForRewrite: longasIds.length,
    seededAtomicCards: adicionados,
    seededIds: CARTOES.map((cartao) => cartao.id),
    preservedExistingNotes: true,
  };
  await mkdir(resolve("exports/anki"), { recursive: true });
  await writeFile(resolve("exports/anki/revisao-curta-2026-08-14.json"), `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(relatorio, null, 2));
}

executar().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
