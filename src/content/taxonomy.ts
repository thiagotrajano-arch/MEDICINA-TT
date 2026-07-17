import type { Disciplina, Tema, Subtema } from "@/domain/content/types";
import { CONTEUDOS } from "./conteudos";

/**
 * The knowledge tree (seed).
 *
 * The full discipline set from the project brief is present so the structure is
 * complete from day one. The 5 OMED clinical-cycle disciplines are populated with
 * real high-yield temas/subtemas (derived from RAIO-X-OMED.md). Other disciplines
 * are scaffolded and will be filled as content is imported from Drive/materials.
 *
 * `temConteudo: true` marks a subtema whose study content already exists.
 */

const sub = (
  temaId: string,
  nome: string,
  opts: Partial<Subtema> = {}
): Subtema => {
  const slug = slugify(nome);
  const id = `${temaId}--${slug}`;
  return {
    id,
    slug,
    nome,
    temaId,
    dificuldade: opts.dificuldade ?? "intermediaria",
    // Fonte única de verdade: um subtema "tem conteúdo" se, e somente se,
    // existe um resumo para ele. Evita o flag dessincronizar do conteúdo real.
    temConteudo: CONTEUDOS[id] !== undefined,
    altoRendimento: opts.altoRendimento,
  };
};

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const tema = (
  disciplinaId: string,
  nome: string,
  subNames: (string | [string, Partial<Subtema>])[]
): Tema => {
  const id = `${disciplinaId}--${slugify(nome)}`;
  return {
    id,
    slug: slugify(nome),
    nome,
    disciplinaId,
    subtemas: subNames.map((n) =>
      Array.isArray(n) ? sub(id, n[0], n[1]) : sub(id, n)
    ),
  };
};

// ─────────────────────────────────────────────────────────────
// OMED clinical-cycle disciplines (populated)
// ─────────────────────────────────────────────────────────────

const ginecoObst: Disciplina = {
  id: "go",
  slug: "ginecologia-obstetricia",
  nome: "Ginecologia & Obstetrícia",
  grupo: "Materno-Infantil",
  marca: "GO",
  omed: true,
  temas: [
    tema("go", "Pré-natal", [
      ["Roteiro e consultas do pré-natal", { altoRendimento: true }],
      "Exames por trimestre",
      "Suplementação e imunização na gestação",
    ]),
    tema("go", "Síndromes hipertensivas da gestação", [
      ["Pré-eclâmpsia e eclâmpsia", { altoRendimento: true, dificuldade: "avancada" }],
      "Hipertensão gestacional vs. crônica",
      "Síndrome HELLP",
    ]),
    tema("go", "Hemorragias da gestação", [
      "Primeira metade (abortamento, ectópica, mola)",
      "Segunda metade (DPP, placenta prévia)",
    ]),
    tema("go", "Infecções congênitas (STORCH)", [["Sífilis, toxoplasmose, CMV, rubéola", { altoRendimento: true }]]),
    tema("go", "Diabetes na gestação", ["Diabetes gestacional", "Rastreio e manejo"]),
    tema("go", "Assistência ao parto", ["Mecanismo e fases do parto", "Partograma"]),
    tema("go", "Puerpério", ["Puerpério fisiológico e patológico"]),
    tema("go", "Rastreamento em ginecologia", ["Câncer de colo do útero", "Câncer de mama"]),
    tema("go", "Sangramento uterino anormal", ["Abordagem do SUA"]),
    tema("go", "Amenorreia e ciclo menstrual", ["Investigação de amenorreia"]),
    tema("go", "Planejamento familiar", ["Métodos contraceptivos"]),
  ],
};

const pediatria: Disciplina = {
  id: "ped",
  slug: "pediatria",
  nome: "Pediatria",
  grupo: "Materno-Infantil",
  marca: "PED",
  omed: true,
  temas: [
    tema("ped", "Neonatologia", [
      ["Reanimação neonatal", { altoRendimento: true, dificuldade: "avancada" }],
      "Icterícia neonatal",
      "Distúrbios respiratórios do RN",
    ]),
    tema("ped", "Aleitamento materno", [["Manejo do aleitamento", { altoRendimento: true }]]),
    tema("ped", "Crescimento e desenvolvimento", ["Marcos do desenvolvimento", "Curvas de crescimento"]),
    tema("ped", "Imunização", [["Calendário vacinal", { altoRendimento: true }]]),
    tema("ped", "Doenças exantemáticas", ["Sarampo, rubéola, exantema súbito, escarlatina"]),
    tema("ped", "Infecções respiratórias na infância", [
      "Pneumonia",
      ["Bronquiolite", { altoRendimento: true }],
      "Crupe (laringotraqueobronquite)",
    ]),
    tema("ped", "Emergências pediátricas", [
      ["Desidratação e reidratação", { altoRendimento: true }],
      "Choque na criança",
      ["Convulsão febril", { altoRendimento: true }],
    ]),
    tema("ped", "Puericultura", ["Consulta de puericultura"]),
  ],
};

const infectologia: Disciplina = {
  id: "inf",
  slug: "infectologia",
  nome: "Infectologia",
  grupo: "Clínica Médica",
  marca: "INF",
  omed: true,
  temas: [
    tema("inf", "HIV/AIDS", [["Diagnóstico e TARV", { altoRendimento: true, dificuldade: "avancada" }], "Infecções oportunistas"]),
    tema("inf", "Tuberculose", [["Diagnóstico e tratamento", { altoRendimento: true }], "TB latente"]),
    tema("inf", "Sepse", [["Reconhecimento e Surviving Sepsis", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("inf", "Arboviroses", [["Dengue — classificação e manejo", { altoRendimento: true }], "Zika e chikungunya"]),
    tema("inf", "Infecções sexualmente transmissíveis", ["Sífilis", "Corrimentos e úlceras genitais"]),
    tema("inf", "Pneumonias", [
      ["Pneumonia adquirida na comunidade", { altoRendimento: true }],
      "Pneumonia hospitalar e associada à ventilação",
    ]),
    tema("inf", "Infecção do trato urinário", [
      ["Cistite e pielonefrite", { altoRendimento: true }],
    ]),
    tema("inf", "Antibioticoterapia", ["Princípios de antibioticoterapia empírica"]),
    tema("inf", "Síndromes febris", ["Abordagem da febre aguda"]),
    tema("inf", "Endocardite infecciosa", ["Critérios de Duke e manejo"]),
    tema("inf", "Meningites", ["Bacteriana vs. viral"]),
    tema("inf", "Hepatites virais", ["Interpretação sorológica"]),
    tema("inf", "Malária", ["Diagnóstico e tratamento"]),
    tema("inf", "Leptospirose", ["Fases e manejo"]),
    tema("inf", "Infecções congênitas", ["STORCH — visão infectológica"]),
    tema("inf", "Imunizações no adulto", ["Vacinas do adulto"]),
    tema("inf", "COVID-19 e influenza", ["Manejo ambulatorial e hospitalar"]),
  ],
};

const cirurgia: Disciplina = {
  id: "cir",
  slug: "cirurgia",
  nome: "Cirurgia",
  grupo: "Cirurgia",
  marca: "CIR",
  omed: true,
  temas: [
    tema("cir", "Abdome agudo", [["Abordagem do abdome agudo", { altoRendimento: true, dificuldade: "avancada" }], "Apendicite aguda", "Colecistite e colangite"]),
    tema("cir", "Trauma", [["ATLS — atendimento inicial", { altoRendimento: true }], "Trauma abdominal", "Trauma torácico"]),
    tema("cir", "Pré e pós-operatório", ["Avaliação de risco cirúrgico", "Complicações pós-operatórias"]),
    tema("cir", "Hérnias da parede abdominal", ["Inguinal, femoral, incisional"]),
    tema("cir", "Obstrução intestinal", ["Mecânica vs. funcional"]),
    tema("cir", "Hemorragia digestiva", ["Alta e baixa"]),
    tema("cir", "Cirurgia vascular", ["Isquemia arterial aguda", "Aneurisma de aorta"]),
    tema("cir", "Queimaduras", ["Classificação e reposição volêmica"]),
    tema("cir", "Cirurgia geral eletiva", ["Abdome e parede"]),
    tema("cir", "Cabeça e pescoço", ["Nódulo cervical e tireoide"]),
  ],
};

const mfc: Disciplina = {
  id: "mfc",
  slug: "mfc",
  nome: "MFC & Atenção Primária",
  grupo: "Saúde Coletiva & Emergência",
  marca: "MFC",
  omed: true,
  temas: [
    tema("mfc", "Atenção Primária à Saúde", [["Princípios da APS", { altoRendimento: true }], "Acesso e longitudinalidade"]),
    tema("mfc", "Rastreamentos", [["Rastreamentos populacionais", { altoRendimento: true }]]),
    tema("mfc", "Prevenção", ["Níveis de prevenção", "Prevenção quaternária"]),
    tema("mfc", "Manejo de crônicos", ["Hipertensão arterial", "Diabetes mellitus tipo 2"]),
    tema("mfc", "Epidemiologia", [
      ["Medidas de associação", { altoRendimento: true }],
      ["Tipos de estudo", { altoRendimento: true }],
      ["Testes diagnósticos (sensibilidade e especificidade)", { altoRendimento: true }],
      "Vieses e causalidade",
      "Meta-análise e MBE",
    ]),
    tema("mfc", "Saúde pública", ["SUS — princípios e diretrizes", "Vigilância em saúde"]),
    tema("mfc", "Saúde mental na APS", ["Depressão e ansiedade"]),
    tema("mfc", "Saúde da criança e do idoso", ["Puericultura e senescência"]),
    tema("mfc", "Imunização coletiva", ["Programa Nacional de Imunizações"]),
    tema("mfc", "Comunicação clínica", ["Método clínico centrado na pessoa"]),
  ],
};

// ─────────────────────────────────────────────────────────────
// Full tree scaffolding (to be populated from imported materials)
// ─────────────────────────────────────────────────────────────

const scaffold = (
  id: string,
  nome: string,
  grupo: Disciplina["grupo"],
  marca: string,
  temas: string[] = []
): Disciplina => ({
  id,
  slug: slugify(nome),
  nome,
  grupo,
  marca,
  temas: temas.map((t) => tema(id, t, ["Geral"])),
});

const clinicaMedica: Disciplina[] = [
  scaffold("cardio", "Cardiologia", "Clínica Médica", "CAR", ["Insuficiência cardíaca", "Síndromes coronarianas", "Arritmias", "Hipertensão"]),
  scaffold("pneumo", "Pneumologia", "Clínica Médica", "PNE", ["Asma", "DPOC", "Pneumonias", "TEP"]),
  scaffold("gastro", "Gastroenterologia", "Clínica Médica", "GAS", ["DRGE", "Doença ulcerosa", "Hepatopatias"]),
  scaffold("neuro", "Neurologia", "Clínica Médica", "NEU", ["AVC", "Cefaleias", "Epilepsia"]),
  scaffold("otorrino", "Otorrinolaringologia", "Clínica Médica", "OTO", ["Otites", "Rinossinusites", "Vertigem"]),
  scaffold("endocrino", "Endocrinologia", "Clínica Médica", "END", ["Tireoide", "Diabetes", "Adrenal"]),
  scaffold("hemato", "Hematologia", "Clínica Médica", "HEM", ["Anemias", "Leucemias", "Distúrbios da hemostasia"]),
  scaffold("nefro", "Nefrologia", "Clínica Médica", "NEF", ["Injúria renal aguda", "DRC", "Distúrbios hidroeletrolíticos"]),
  scaffold("reumato", "Reumatologia", "Clínica Médica", "REU", ["Artrites", "LES", "Vasculites"]),
  scaffold("derma", "Dermatologia", "Clínica Médica", "DER", ["Infecções cutâneas", "Câncer de pele"]),
  scaffold("emerg-cm", "Emergências Clínicas", "Clínica Médica", "EMC", ["PCR e RCP", "Distúrbios do ritmo"]),
];

const cirurgiaOutras: Disciplina[] = [
  scaffold("uro", "Urologia", "Cirurgia", "URO", ["Litíase urinária", "HPB", "Câncer de próstata"]),
  scaffold("plastica", "Cirurgia Plástica", "Cirurgia", "PLA", ["Retalhos e enxertos"]),
  scaffold("toracica", "Cirurgia Torácica", "Cirurgia", "TOR", ["Nódulo pulmonar"]),
];

const outras: Disciplina[] = [
  scaffold("obstetricia", "Obstetrícia (avançada)", "Materno-Infantil", "OBS", []),
  scaffold("psiq", "Psiquiatria", "Psiquiatria & Diagnóstico", "PSI", ["Transtornos do humor", "Transtornos de ansiedade", "Psicoses"]),
  scaffold("radio", "Radiologia", "Psiquiatria & Diagnóstico", "RAD", ["Tórax", "Abdome", "Neurorradiologia"]),
  scaffold("farmaco", "Farmacologia", "Ciências Básicas", "FAR", ["Farmacocinética", "Autonômica", "Antimicrobianos"]),
  scaffold("pato", "Patologia", "Ciências Básicas", "PAT", ["Inflamação", "Neoplasias"]),
  scaffold("anatomia", "Anatomia", "Ciências Básicas", "ANA", ["Sistemas"]),
  scaffold("histo", "Histologia", "Ciências Básicas", "HIS", ["Tecidos"]),
  scaffold("embrio", "Embriologia", "Ciências Básicas", "EMB", ["Desenvolvimento"]),
  scaffold("fisio", "Fisiologia", "Ciências Básicas", "FIS", ["Cardiovascular", "Renal", "Endócrina"]),
  scaffold("bioq", "Bioquímica", "Ciências Básicas", "BIO", ["Metabolismo"]),
  scaffold("imuno", "Imunologia", "Ciências Básicas", "IMU", ["Resposta imune"]),
  scaffold("parasito", "Parasitologia", "Ciências Básicas", "PAR", ["Protozooses", "Helmintíases"]),
  scaffold("micro", "Microbiologia", "Ciências Básicas", "MIC", ["Bacteriologia", "Virologia"]),
  scaffold("genetica", "Genética", "Ciências Básicas", "GEN", ["Herança"]),
  scaffold("saude-publica", "Saúde Pública", "Saúde Coletiva & Emergência", "SPU", ["SUS", "Epidemiologia"]),
  scaffold("ue", "Urgência e Emergência", "Saúde Coletiva & Emergência", "URG", ["Suporte de vida", "Trauma"]),
  scaffold("uti", "Medicina Intensiva", "Saúde Coletiva & Emergência", "UTI", ["Ventilação mecânica", "Choque"]),
];

export const DISCIPLINAS: Disciplina[] = [
  ginecoObst,
  pediatria,
  infectologia,
  cirurgia,
  mfc,
  ...clinicaMedica,
  ...cirurgiaOutras,
  ...outras,
];

export const GRUPOS: Disciplina["grupo"][] = [
  "Materno-Infantil",
  "Clínica Médica",
  "Cirurgia",
  "Psiquiatria & Diagnóstico",
  "Ciências Básicas",
  "Saúde Coletiva & Emergência",
];
