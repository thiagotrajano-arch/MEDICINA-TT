import type { Questao } from "@/domain/content/types";

const SUBTEMA = "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo";
const FONTE =
  "Ministério da Saúde/CONITEC — Protocolo Clínico e Diretrizes Terapêuticas do Hipotireoidismo (acesso em 2026-08-22): https://www.gov.br/conitec/pt-br/midias/relatorios/2021/20210423_pcdt_hipotireoidismo_586.pdf; Ministério da Saúde/UFRGS — Protocolos de Endocrinologia: https://bvsms.saude.gov.br/bvs/publicacoes/protocolos_atencao_basica_atencao_especializada_endocrinologia.pdf";

export const QUESTOES_DISFUNCOES_TIREOIDIANAS: Questao[] = [
  {
    id: "endocrino-tireoide-001",
    subtemaId: SUBTEMA,
    disciplinaId: "endocrino",
    enunciado: "Mulher de 47 anos apresenta fadiga, constipação e intolerância ao frio. TSH = 18 mUI/L e T4 livre abaixo do intervalo de referência. Qual padrão laboratorial está presente?",
    alternativas: [
      { letra: "A", texto: "Hipotireoidismo primário manifesto.", correta: true, comentario: "Correta. TSH elevado com T4 livre reduzido indica falência tireoidiana primária com repercussão hormonal periférica." },
      { letra: "B", texto: "Hipotireoidismo central.", correta: false, comentario: "No hipotireoidismo central, o T4 livre está baixo com TSH baixo, normal ou inadequadamente pouco elevado para a intensidade da deficiência." },
      { letra: "C", texto: "Hipertireoidismo subclínico.", correta: false, comentario: "Hipertireoidismo subclínico apresenta TSH reduzido com hormônios livres ainda normais, não TSH elevado e T4 livre baixo." },
      { letra: "D", texto: "Eutireoidismo com alteração laboratorial sem significado clínico.", correta: false, comentario: "O padrão é coerente com os sintomas e demonstra deficiência hormonal; não deve ser classificado como eutireoidismo." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["hipotireoidismo", "TSH", "T4 livre", "diagnóstico"],
  },
  {
    id: "endocrino-tireoide-002",
    subtemaId: SUBTEMA,
    disciplinaId: "endocrino",
    enunciado: "Homem de 62 anos, assintomático, tem TSH persistentemente elevado em duas avaliações e T4 livre dentro do intervalo de referência. Qual interpretação é mais adequada?",
    alternativas: [
      { letra: "A", texto: "Hipotireoidismo subclínico, que exige decisão individualizada conforme concentração de TSH, idade, sintomas, comorbidades e contexto clínico.", correta: true, comentario: "Correta. TSH elevado com T4 livre normal define hipotireoidismo subclínico; a conduta não deve ser reduzida a um automatismo sem avaliar o paciente e confirmar persistência." },
      { letra: "B", texto: "Hipotireoidismo manifesto, pois qualquer TSH elevado implica T4 livre baixo.", correta: false, comentario: "A definição de hipotireoidismo manifesto exige hormônio tireoidiano livre reduzido; aqui o T4 livre permanece normal." },
      { letra: "C", texto: "Hipertireoidismo subclínico, porque o TSH está fora do intervalo.", correta: false, comentario: "No hipertireoidismo subclínico o TSH é baixo; TSH elevado aponta para redução da função tireoidiana ou outras causas a esclarecer." },
      { letra: "D", texto: "Hipotireoidismo central, pois o T4 livre normal não permite avaliação pelo TSH.", correta: false, comentario: "O padrão descrito é compatível com alteração primária subclínica; suspeita de doença central depende de contexto e padrão hormonal inadequado, não apenas de T4 livre normal." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["hipotireoidismo subclínico", "TSH", "T4 livre", "decisão clínica"],
  },
  {
    id: "endocrino-tireoide-003",
    subtemaId: SUBTEMA,
    disciplinaId: "endocrino",
    enunciado: "Paciente com palpitações e perda ponderal apresenta TSH suprimido, T4 livre elevado e T3 elevado. Qual é o próximo raciocínio mais seguro?",
    alternativas: [
      { letra: "A", texto: "Reconhecer tireotoxicose manifesta e investigar a etiologia, integrando exame clínico, história, medicamentos e exames dirigidos.", correta: true, comentario: "Correta. TSH suprimido com hormônios tireoidianos elevados confirma padrão de tireotoxicose; a causa pode ser produção aumentada ou liberação por tireoidite, entre outras possibilidades." },
      { letra: "B", texto: "Iniciar levotiroxina, pois a supressão do TSH indica falta de hormônio tireoidiano.", correta: false, comentario: "Levotiroxina aumenta hormônio circulante e pioraria a tireotoxicose; o padrão laboratorial não é de hipotireoidismo." },
      { letra: "C", texto: "Classificar como hipertireoidismo subclínico, pois o TSH é o único exame necessário.", correta: false, comentario: "A presença de T4 livre e T3 elevados caracteriza doença manifesta, não subclínica; a etiologia precisa ser investigada." },
      { letra: "D", texto: "Concluir doença de Graves apenas pela bioquímica, sem exame clínico ou investigação etiológica.", correta: false, comentario: "A bioquímica confirma tireotoxicose, mas não define sozinha a causa; Graves é uma hipótese entre outras." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["tireotoxicose", "hipertireoidismo", "TSH", "T4 livre", "T3"],
  },
];
