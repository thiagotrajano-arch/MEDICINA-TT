import type { Questao } from "@/domain/content/types";

/**
 * Banco de questões — Cirurgia (OMED VI).
 * Extraídas do "Cirurgia — Banco de 160 Questões + Gabarito Comentado" do
 * usuário, via pipeline de extração de PDF (scripts/extract-pdf.mts).
 * Gabarito e comentários conferidos com o próprio material (TG18/WSES/ESC).
 *
 * Lote 1: Tema 01 · Vias Biliares (Q1–Q8).
 */

const SUB = {
  vesicula: "cir--abdome-agudo--colecistite-e-colangite",
} as const;

const FONTE = "Banco OMED Cirurgia — 160 questões com gabarito (material do usuário)";

export const QUESTOES_CIR: Questao[] = [
  {
    id: "cir-vb-01",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado:
      "Segundo os critérios diagnósticos da Tokyo Guidelines 2018 (TG18) para colecistite aguda, o diagnóstico definitivo exige a presença simultânea de quais categorias de achados?",
    alternativas: [
      { letra: "A", texto: "Apenas sinais locais de inflamação (Murphy positivo).", correta: false, comentario: "Incompleta: ignora os sinais sistêmicos e a confirmação por imagem." },
      { letra: "B", texto: "Sinais locais + sinais sistêmicos, independente de imagem.", correta: false, comentario: "Ignora a imagem confirmatória, exigida pela TG18." },
      { letra: "C", texto: "Sinais locais + sinais sistêmicos + confirmação por imagem.", correta: true, comentario: "A TG18 exige as três categorias juntas: locais (Murphy, dor/massa em HCD), sistêmicos (febre, PCR, leucocitose) e imagem." },
      { letra: "D", texto: "Apenas achados de imagem, independente do exame físico.", correta: false, comentario: "Ignora os achados clínicos, que são centrais ao diagnóstico." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["colecistite", "Tokyo Guidelines", "TG18"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-02",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado:
      "De acordo com a WSES 2020, qual o momento ideal da colecistectomia videolaparoscópica na colecistite aguda grau I ou II?",
    alternativas: [
      { letra: "A", texto: "Após 6 semanas, quando a inflamação 'esfriar'.", correta: false, comentario: "É a conduta antiga, hoje superada." },
      { letra: "B", texto: "Precocemente, idealmente em até 7 dias do início dos sintomas, na mesma internação.", correta: true, comentario: "Mudança de paradigma da WSES 2020: colecistectomia precoce (≤7 dias) reduz tempo total de internação sem aumentar complicações." },
      { letra: "C", texto: "Somente após 3 episódios de repetição.", correta: false, comentario: "Não tem base em diretriz." },
      { letra: "D", texto: "Nunca por via laparoscópica na fase aguda; sempre aberta.", correta: false, comentario: "A via laparoscópica é preferida mesmo na fase aguda." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["colecistectomia", "WSES", "colecistite"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-03",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado:
      "Qual exame é não invasivo e de escolha para confirmar coledocolitíase antes de indicar terapêutica endoscópica?",
    alternativas: [
      { letra: "A", texto: "Colangiopancreatografia retrógrada endoscópica (CPRE).", correta: false, comentario: "É diagnóstica E terapêutica, porém invasiva — não é o exame confirmatório inicial de escolha." },
      { letra: "B", texto: "Colangiorressonância magnética (CPRM).", correta: true, comentario: "Confirma coledocolitíase de forma não invasiva e com alta sensibilidade, antes de partir para a CPRE." },
      { letra: "C", texto: "Colecistografia oral.", correta: false, comentario: "Exame obsoleto." },
      { letra: "D", texto: "Cintilografia hepatobiliar (HIDA).", correta: false, comentario: "Avalia função/obstrução cística; não é o método de escolha para o colédoco." },
    ],
    dificuldade: "intermediaria",
    estilo: "exame",
    tags: ["coledocolitíase", "CPRM", "CPRE"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-04",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado: "A tríade de Charcot, na colangite aguda, é composta por:",
    alternativas: [
      { letra: "A", texto: "Dor abdominal, febre e hipotensão.", correta: false, comentario: "Mistura achados; hipotensão faz parte da pêntade de Reynolds, não da tríade." },
      { letra: "B", texto: "Icterícia, febre com calafrios e dor em hipocôndrio direito.", correta: true, comentario: "Charcot = dor em HCD + febre (com calafrios) + icterícia; presente em ~50–70% das colangites. A pêntade de Reynolds acrescenta hipotensão e confusão mental (colangite grave)." },
      { letra: "C", texto: "Náusea, vômito e diarreia.", correta: false, comentario: "Achados inespecíficos, de outros diagnósticos." },
      { letra: "D", texto: "Confusão mental, hipotensão e taquicardia.", correta: false, comentario: "Sugere colangite tóxica/grave (componentes da pêntade), não a tríade clássica." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["colangite", "tríade de Charcot", "Reynolds"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-05",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado: "Qual achado ultrassonográfico NÃO é utilizado nos critérios diagnósticos de colecistite aguda?",
    alternativas: [
      { letra: "A", texto: "Espessamento da parede vesicular maior que 4 mm.", correta: false, comentario: "É achado valorizado pela TG18." },
      { letra: "B", texto: "Sinal de Murphy ultrassonográfico.", correta: false, comentario: "É achado valorizado pela TG18." },
      { letra: "C", texto: "Líquido pericolecístico.", correta: false, comentario: "É achado valorizado pela TG18." },
      { letra: "D", texto: "Dilatação do ducto pancreático principal.", correta: true, comentario: "Relaciona-se a doença pancreática (obstrutiva ou pancreatite crônica) — não faz parte dos critérios de imagem de colecistite." },
    ],
    dificuldade: "intermediaria",
    estilo: "exame",
    tags: ["colecistite", "ultrassonografia", "TG18"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-06",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado: "A síndrome de Mirizzi é definida como:",
    alternativas: [
      { letra: "A", texto: "Fístula entre vesícula biliar e duodeno.", correta: false, comentario: "Descreve fístula colecistoentérica (associada ao íleo biliar)." },
      { letra: "B", texto: "Compressão extrínseca do ducto hepático comum por cálculo impactado no infundíbulo vesicular ou ducto cístico.", correta: true, comentario: "Causa icterícia obstrutiva mesmo sem cálculo no colédoco; relevante por aumentar o risco de lesão iatrogênica de via biliar na colecistectomia." },
      { letra: "C", texto: "Obstrução do ducto pancreático por cálculo migrado.", correta: false, comentario: "Corresponde a outro mecanismo (pancreatite biliar)." },
      { letra: "D", texto: "Perfuração livre da vesícula para a cavidade peritoneal.", correta: false, comentario: "É complicação distinta da colecistite." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["Mirizzi", "via biliar", "icterícia obstrutiva"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-07",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado: "Os cálculos biliares pigmentares PRETOS estão classicamente associados a:",
    alternativas: [
      { letra: "A", texto: "Obesidade e dislipidemia.", correta: false, comentario: "Associam-se aos cálculos de colesterol." },
      { letra: "B", texto: "Hemólise crônica (anemia falciforme, esferocitose) e cirrose.", correta: true, comentario: "Formam-se por excesso de bilirrubina não conjugada na bile — típico de hemólise crônica e cirrose." },
      { letra: "C", texto: "Infecção biliar crônica e estase.", correta: false, comentario: "Associam-se aos cálculos pigmentares CASTANHOS, não pretos." },
      { letra: "D", texto: "Nutrição parenteral prolongada isoladamente.", correta: false, comentario: "Favorece lama biliar/colecistite alitiásica, não especificamente cálculos pretos." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["colelitíase", "cálculo pigmentar", "hemólise"],
    fonte: FONTE,
  },
  {
    id: "cir-vb-08",
    subtemaId: SUB.vesicula,
    disciplinaId: "cir",
    enunciado:
      "Conduta correta na colecistite aguda TG18 grau III (grave), com disfunção orgânica, em paciente instável?",
    alternativas: [
      { letra: "A", texto: "Colecistectomia videolaparoscópica imediata, independente do estado hemodinâmico.", correta: false, comentario: "Ignora o risco cirúrgico proibitivo na instabilidade." },
      { letra: "B", texto: "Suporte de órgão-alvo, antibioticoterapia e colecistostomia percutânea; colecistectomia definitiva após estabilização.", correta: true, comentario: "No grau III a prioridade é estabilizar e drenar o foco séptico sem submeter o instável a cirurgia de grande porte; a colecistectomia fica para depois." },
      { letra: "C", texto: "Alta com antibiótico oral e retorno em 2 semanas.", correta: false, comentario: "Subestima gravemente um quadro grau III." },
      { letra: "D", texto: "Observação sem intervenção até resolução espontânea.", correta: false, comentario: "Subestima a gravidade; há disfunção orgânica." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["colecistite grave", "colecistostomia", "TG18"],
    fonte: FONTE,
  },
];
