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
    tema("go", "Assistência ao parto", ["Mecanismo e fases do parto", "Partograma", "Bacia obstétrica e estática fetal", "Parto vaginal operatório"]),
    tema("go", "Puerpério", ["Puerpério fisiológico e patológico", "Infecção puerperal"]),
    tema("go", "Rastreamento em ginecologia", ["Câncer de colo do útero", "Câncer de mama"]),
    tema("go", "Sangramento uterino anormal", ["Abordagem do SUA"]),
    tema("go", "Amenorreia e ciclo menstrual", ["Investigação de amenorreia", "Fisiologia do ciclo menstrual"]),
    tema("go", "Planejamento familiar", ["Métodos contraceptivos"]),
    tema("go", "Distúrbios endócrino-menstruais", [
      ["Síndrome dos ovários policísticos", { altoRendimento: true }],
    ]),
    tema("go", "Infecções ginecológicas", [
      ["Vulvovaginites", { altoRendimento: true }],
      ["Doença inflamatória pélvica (DIP)", { altoRendimento: true, dificuldade: "avancada" }],
      "Cervicites",
      "Doenças da vulva e vagina",
      "Úlceras genitais",
    ]),
    tema("go", "Oncologia ginecológica", [
      ["Câncer de colo uterino", { altoRendimento: true }],
      "Câncer do corpo do útero",
      "Tumores anexiais",
    ]),
    tema("go", "Mastologia", [["Câncer de mama", { altoRendimento: true }], "Doenças benignas da mama"]),
    tema("go", "Miomatose e adenomiose", [["Miomatose uterina", { altoRendimento: true }], "Adenomiose"]),
    tema("go", "Uroginecologia", [["Incontinência urinária", { altoRendimento: true }], "Prolapso de órgãos pélvicos"]),
    tema("go", "Climatério", [["Climatério e terapia hormonal", { altoRendimento: true }]]),
    tema("go", "Assistência à vítima de violência sexual", [["Atendimento integral e profilaxias", { altoRendimento: true }]]),
    tema("go", "Endometriose", [["Diagnóstico e manejo", { altoRendimento: true }]]),
    tema("go", "Infertilidade conjugal", ["Investigação do casal"]),
    tema("go", "Perdas gestacionais", ["Abortamento de repetição"]),
    tema("go", "Aloimunização materna", ["Doença hemolítica perinatal"]),
    tema("go", "Líquido amniótico", ["Oligodrâmnio e polidrâmnio"]),
    tema("go", "Gestação múltipla", ["Diagnóstico e manejo"]),
    tema("go", "Hemorragia pós-parto", [["Prevenção e manejo", { altoRendimento: true }]]),
    tema("go", "Indução e pós-datismo", ["Indicações e métodos"]),
    tema("go", "Fisiologia da gestação", ["Modificações maternas"]),
    tema("go", "Crescimento e óbito fetal", [["Restrição de crescimento fetal", { altoRendimento: true }]]),
    tema("go", "Rotura prematura de membranas", [["Diagnóstico e conduta", { altoRendimento: true }]]),
    tema("go", "Prematuridade", [["Trabalho de parto prematuro", { altoRendimento: true }]]),
    tema("go", "Avaliação fetal", ["Ultrassom em obstetrícia", "Vitalidade fetal"]),
    tema("go", "Urgências ginecológicas", [["Abdome agudo", { altoRendimento: true }]]),
    tema("go", "Anatomia e embriologia", ["Trato genital feminino"]),
    tema("go", "Dor pélvica", ["Dor crônica e dismenorreia"]),
    tema("go", "Patologia endometrial", ["Pólipos uterinos"]),
    tema("go", "Sexualidade", ["Disfunções sexuais"]),
    tema("go", "Síndrome pré-menstrual", ["Diagnóstico e manejo"]),
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
      "Cuidados neonatais",
      "Sepse neonatal",
    ]),
    tema("ped", "Aleitamento materno", [["Manejo do aleitamento", { altoRendimento: true }]]),
    tema("ped", "Crescimento e desenvolvimento", ["Marcos do desenvolvimento", "Curvas de crescimento"]),
    tema("ped", "Imunização", [["Calendário vacinal", { altoRendimento: true }]]),
    tema("ped", "Doenças exantemáticas", ["Sarampo, rubéola, exantema súbito, escarlatina"]),
    tema("ped", "Infecções respiratórias na infância", [
      "Pneumonia",
      ["Bronquiolite", { altoRendimento: true }],
      "Crupe (laringotraqueobronquite)",
      "Coqueluche",
    ]),
    tema("ped", "Emergências pediátricas", [
      ["Desidratação e reidratação", { altoRendimento: true }],
      "Choque na criança",
      ["Convulsão febril", { altoRendimento: true }],
      "Abordagem inicial",
    ]),
    tema("ped", "Puericultura", ["Consulta de puericultura"]),
    tema("ped", "Asma", [["Diagnóstico e controle", { altoRendimento: true }]]),
    tema("ped", "Eventos no lactente", ["BRUE e morte súbita"]),
    tema("ped", "Neurologia pediátrica", ["Cefaleias na infância"]),
    tema("ped", "Vasculites", ["Doença de Kawasaki", "Vasculite por IgA"]),
    tema("ped", "Gastroenterologia", ["Refluxo gastroesofágico", "Constipação intestinal", "Diarreia aguda", "Doença celíaca"]),
    tema("ped", "Febre", [["Abordagem da criança febril", { altoRendimento: true }]]),
    tema("ped", "Cardiologia", ["Febre reumática", "Hipertensão arterial"]),
    tema("ped", "Endocrinologia", ["Hiperplasia adrenal congênita", "Hipotireoidismo congênito"]),
    tema("ped", "Nefrologia", ["Infecção do trato urinário", "Enurese noturna"]),
    tema("ped", "Adolescência", ["Puberdade"]),
    tema("ped", "Segurança", ["Prevenção de acidentes"]),
    tema("ped", "Alergologia", ["Alergia alimentar", "Anafilaxia e urticária"]),
    tema("ped", "Reumatologia", ["Artrite idiopática juvenil"]),
    tema("ped", "Nutrição", ["Deficiências vitamínicas e profilaxias", "Desnutrição na infância", "Obesidade na infância"]),
    tema("ped", "Pneumologia", ["Fibrose cística"]),
    tema("ped", "Infecções congênitas", ["Abordagem neonatal"]),
    tema("ped", "Infectologia", ["Tuberculose na infância"]),
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
    tema("inf", "Infecções relacionadas à assistência à saúde", [
      ["Prevenção, sítio cirúrgico, cateter e C. difficile", { altoRendimento: true, dificuldade: "avancada" }],
    ]),
    tema("inf", "Infecção do trato urinário", [
      ["Cistite e pielonefrite", { altoRendimento: true }],
    ]),
    tema("inf", "Antibioticoterapia", ["Princípios de antibioticoterapia empírica"]),
    tema("inf", "Síndromes febris", ["Abordagem da febre aguda", "Síndrome febril íctero-hemorrágica"]),
    tema("inf", "Endocardite infecciosa", ["Critérios de Duke e manejo"]),
    tema("inf", "Meningites", ["Bacteriana vs. viral"]),
    tema("inf", "Hepatites virais", ["Interpretação sorológica"]),
    tema("inf", "Malária", ["Diagnóstico e tratamento"]),
    tema("inf", "Zoonoses e doenças emergentes", [
      "Raiva — profilaxia pós-exposição",
      ["Leptospirose — fases e manejo", { altoRendimento: true }],
      "Mpox (monkeypox)",
    ]),
    tema("inf", "Parasitoses intestinais e protozooses", [
      ["Helmintíases e protozooses — diagnóstico e tratamento", { altoRendimento: true }],
    ]),
    tema("inf", "Doenças exantemáticas", ["Sarampo, rubéola, escarlatina e Kawasaki"]),
    tema("inf", "Infecções congênitas", ["STORCH — visão infectológica"]),
    tema("inf", "Imunizações no adulto", ["Vacinas do adulto"]),
    tema("inf", "COVID-19 e influenza", ["Manejo ambulatorial e hospitalar"]),
    tema("inf", "Acidentes por animais peçonhentos", [["Reconhecimento e soroterapia", { altoRendimento: true }]]),
    tema("inf", "Síndromes infecciosas", ["Hepatoesplenomegalias"]),
    tema("inf", "Micoses invasivas", ["Diagnóstico e tratamento"]),
    tema("inf", "Febre no imunossuprimido", [["Neutropenia febril e FOI", { altoRendimento: true, dificuldade: "avancada" }]]),
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
    tema("cir", "Abdome agudo", [
      ["Abordagem do abdome agudo", { altoRendimento: true, dificuldade: "avancada" }],
      "Apendicite aguda",
      "Colecistite e colangite",
      "Coloproctologia e abdome agudo inflamatório",
    ]),
    tema("cir", "Trauma", [["ATLS — atendimento inicial", { altoRendimento: true }], "Trauma abdominal", "Trauma torácico"]),
    tema("cir", "Pré e pós-operatório", ["Avaliação de risco cirúrgico", "Complicações pós-operatórias"]),
    tema("cir", "Hérnias da parede abdominal", ["Inguinal, femoral, incisional"]),
    tema("cir", "Obstrução intestinal", ["Mecânica vs. funcional"]),
    tema("cir", "Hemorragia digestiva", ["Alta e baixa"]),
    tema("cir", "Cirurgia vascular", [
      "Isquemia arterial aguda",
      "Aneurisma de aorta",
      "DAOP, TVP e aneurisma de aorta",
    ]),
    tema("cir", "Queimaduras", ["Classificação e reposição volêmica"]),
    tema("cir", "Cirurgia geral eletiva", ["Abdome e parede"]),
    tema("cir", "Cabeça e pescoço", ["Nódulo cervical e tireoide"]),
    tema("cir", "Urologia cirúrgica", ["Litíase, HPB e emergências escrotais"]),
    tema("cir", "Oncologia do TGI alto", ["Esôfago e estômago"]),
    tema("cir", "Ortopedia de urgência", ["Epifisiólise e embolia gordurosa"]),
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
      ["Indicadores de morbidade", { altoRendimento: true }],
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
    tema("mfc", "Ética médica", [["Princípios e deveres", { altoRendimento: true }]]),
    tema("mfc", "Abordagem familiar", ["Genograma, ciclo de vida e crises familiares"]),
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

const cardiologia: Disciplina = {
  id: "cardio",
  slug: "cardiologia",
  nome: "Cardiologia",
  grupo: "Clínica Médica",
  marca: "CAR",
  omed: true,
  temas: [
    tema("cardio", "Síndrome Coronariana Aguda (SCA/IAM)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Dissecção Aórtica", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Dislipidemia e Estatinas", ["Diagnóstico e conduta"]),
    tema("cardio", "Fibrilação Atrial, Bradiarritmias e Leitura de ECG", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Morte Súbita Cardíaca em Atletas e Commotio Cordis", ["Diagnóstico e conduta"]),
    tema("cardio", "Hipertensão Resistente e Refratária", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Hipertensão Secundária", ["Diagnóstico e conduta"]),
    tema("cardio", "Taquiarritmias e Manejo ACLS", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Insuficiência Cardíaca (ICFER e ICFEP)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("cardio", "Febre Reumática e Cardiopatia Reumática Crônica", ["Diagnóstico e conduta"]),
    tema("cardio", "Doença Arterial Periférica e Claudicação Intermitente", ["Diagnóstico e conduta"]),
    tema("cardio", "Pericardite Aguda e Tamponamento", ["Diagnóstico e conduta"]),
  ],
};

const pneumologia: Disciplina = {
  id: "pneumo",
  slug: "pneumologia",
  nome: "Pneumologia",
  grupo: "Clínica Médica",
  marca: "PNE",
  omed: true,
  temas: [
    tema("pneumo", "Derrame Pleural", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Tromboembolismo Pulmonar (TEP)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Pneumotórax (Espontâneo e Hipertensivo)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Pneumonia Adquirida na Comunidade (PAC)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Asma (Crônica e Crise Aguda)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "DPOC (Crônico e Exacerbado)", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Asma e Pneumopatia Ocupacional", ["Diagnóstico e conduta"]),
    tema("pneumo", "Tuberculose Pulmonar com HIV", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Distúrbios Ácido-Base e Interpretação de Gasometria", [["Diagnóstico e conduta", { altoRendimento: true, dificuldade: "avancada" }]]),
    tema("pneumo", "Tosse Crônica e Tosse por IECA", ["Diagnóstico e conduta"]),
  ],
};

const neurologia: Disciplina = {
  id: "neuro",
  slug: "neurologia",
  nome: "Neurologia",
  grupo: "Clínica Médica",
  marca: "NEU",
  omed: true,
  temas: [
    tema("neuro", "AVC Isquêmico", ["Diagnóstico e conduta"]),
    tema("neuro", "AVC Hemorrágico — HSA e Hemorragia Intraparenquimatosa", ["Diagnóstico e conduta"]),
    tema("neuro", "Crise Convulsiva e Status Epilepticus", ["Diagnóstico e conduta"]),
    tema("neuro", "Cefaleias — Primárias e Sinais de Alarme", ["Diagnóstico e conduta"]),
    tema("neuro", "Síndrome de Guillain-Barré", ["Diagnóstico e conduta"]),
    tema("neuro", "Miastenia Gravis", ["Diagnóstico e conduta"]),
    tema("neuro", "Compressão Medular Aguda e Síndrome de Cauda Equina", ["Diagnóstico e conduta"]),
    tema("neuro", "Hipertensão Intracraniana e Delirium", ["Diagnóstico e conduta"]),
    tema("neuro", "Amnésias e Síndromes Demenciais", ["Diagnóstico e conduta"]),
    tema("neuro", "Neuropatias Compressivas Periféricas", ["Diagnóstico e conduta"]),
    tema("neuro", "Síndromes Vestibulares", ["Diagnóstico e conduta"]),
    tema("neuro", "Encefalopatia de Wernicke-Korsakoff", ["Diagnóstico e conduta"]),
    tema("neuro", "Neurossífilis", ["Diagnóstico e conduta"]),
    tema("neuro", "Cefaleia Pós-Punção Dural", ["Diagnóstico e conduta"]),
  ],
};

const clinicaMedica: Disciplina[] = [
  cardiologia,
  pneumologia,
  neurologia,
  scaffold("gastro", "Gastroenterologia", "Clínica Médica", "GAS", ["DRGE", "Doença ulcerosa", "Hepatopatias"]),
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
