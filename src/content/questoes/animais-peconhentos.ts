import type { Questao } from "@/domain/content/types";

const SUBTEMA = "inf--acidentes-por-animais-peconhentos--reconhecimento-e-soroterapia";
const FONTE_MS = "Ministério da Saúde — Acidentes por animais peçonhentos e PCDT de acidentes ofídicos (acesso em 2026-08-22): https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos e https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-ofidicos";

export const QUESTOES_ANIMAIS_PECONHENTOS: Questao[] = [
  {
    id: "inf-peconhentos-001",
    subtemaId: SUBTEMA,
    disciplinaId: "inf",
    enunciado: "Sobre a distinção entre animais peçonhentos e venenosos, assinale a alternativa correta.",
    alternativas: [
      { letra: "A", texto: "Animais peçonhentos produzem toxinas, mas não conseguem inoculá-las ativamente.", correta: false, comentario: "A capacidade de inoculação ativa é justamente a distinção central dos animais peçonhentos." },
      { letra: "B", texto: "Animais peçonhentos têm estruturas capazes de inocular ativamente a peçonha; animais venenosos podem produzir toxinas sem esse mecanismo de inoculação.", correta: true, comentario: "Correta. O Ministério da Saúde diferencia peçonha de veneno pelo mecanismo de inoculação ativa, como presas, ferrões, quelíceras ou cerdas." },
      { letra: "C", texto: "Todo animal que produz toxina é automaticamente classificado como peçonhento.", correta: false, comentario: "Produzir toxina não basta: a classificação depende também da inoculação ativa." },
      { letra: "D", texto: "A distinção tem apenas interesse zoológico e não interfere na vigilância em saúde.", correta: false, comentario: "A distinção ajuda a reconhecer agravos de interesse em saúde pública e a orientar notificação e atendimento." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    fonte: FONTE_MS,
    tags: ["animais peçonhentos", "vigilância", "definição"],
  },
  {
    id: "inf-peconhentos-002",
    subtemaId: SUBTEMA,
    disciplinaId: "inf",
    enunciado: "Uma pessoa é mordida por uma serpente durante atividade rural. Enquanto aguarda transporte para um serviço de referência, qual orientação é adequada?",
    alternativas: [
      { letra: "A", texto: "Aplicar torniquete proximal para impedir a circulação da peçonha.", correta: false, comentario: "Torniquete pode concentrar a peçonha, agravar isquemia e aumentar lesão local; não é recomendado." },
      { letra: "B", texto: "Realizar incisão e sucção no local para retirar a peçonha.", correta: false, comentario: "Cortes, sucção, queimaduras e substâncias caseiras não neutralizam a peçonha e podem causar dano adicional." },
      { letra: "C", texto: "Manter a vítima em repouso, evitar intervenções locais lesivas e encaminhá-la rapidamente ao serviço de saúde.", correta: true, comentario: "Correta. O atendimento oportuno em serviço habilitado permite avaliação clínica, monitorização e soroterapia quando indicada." },
      { letra: "D", texto: "Oferecer bebida alcoólica para reduzir a dor e aguardar a evolução do edema.", correta: false, comentario: "Bebidas alcoólicas e substâncias caseiras não tratam o envenenamento e podem atrasar o atendimento." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: `${FONTE_MS}; FAQ do Ministério da Saúde sobre acidentes ofídicos: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/acidentes-ofidicos/faq/faq`,
    tags: ["ofidismo", "primeiros cuidados", "torniquete"],
  },
  {
    id: "inf-peconhentos-003",
    subtemaId: SUBTEMA,
    disciplinaId: "inf",
    enunciado: "Após provável acidente botrópico, a vítima apresenta dor, edema e equimose que alcançam dois segmentos do membro, com sangramento discreto, sem choque. Como esse quadro deve ser classificado para orientar a soroterapia?",
    alternativas: [
      { letra: "A", texto: "Leve, porque não há choque.", correta: false, comentario: "A gravidade não depende apenas de choque; edema em dois segmentos caracteriza quadro moderado no PCDT." },
      { letra: "B", texto: "Moderado, devendo receber avaliação hospitalar e antiveneno conforme o PCDT vigente.", correta: true, comentario: "Correta. No acidente botrópico, dor e edema em dois segmentos, com ou sem coagulopatia, integram a classificação moderada." },
      { letra: "C", texto: "Grave obrigatoriamente, pois todo acidente botrópico exige a maior categoria de soroterapia.", correta: false, comentario: "A classificação é clínica e graduada; não se deve aplicar automaticamente a categoria grave." },
      { letra: "D", texto: "Indeterminado até a identificação fotográfica da serpente.", correta: false, comentario: "O diagnóstico e a classificação são predominantemente clínico-epidemiológicos; a fotografia não deve atrasar o atendimento." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: `${FONTE_MS}; PCDT de acidentes ofídicos: https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-ofidicos`,
    tags: ["acidente botrópico", "classificação", "soroterapia"],
  },
  {
    id: "inf-peconhentos-004",
    subtemaId: SUBTEMA,
    disciplinaId: "inf",
    enunciado: "Na avaliação hospitalar de um paciente com suspeita de acidente ofídico, qual conjunto de exames é particularmente útil para acompanhar coagulopatia e complicações sistêmicas?",
    alternativas: [
      { letra: "A", texto: "Tempo de coagulação, hemograma e função renal, interpretados junto com a evolução clínica.", correta: true, comentario: "Correta. O Ministério da Saúde destaca esses exames para monitorar soroterapia e complicações nos acidentes botrópicos, laquéticos e crotálicos." },
      { letra: "B", texto: "Apenas dosagem sérica do veneno como requisito para iniciar qualquer conduta.", correta: false, comentario: "O diagnóstico é clínico-epidemiológico; não se deve atrasar tratamento aguardando identificação laboratorial da peçonha." },
      { letra: "C", texto: "Apenas proteína C reativa e velocidade de hemossedimentação.", correta: false, comentario: "Esses marcadores não substituem a avaliação de coagulação, hemograma, função renal e exame clínico." },
      { letra: "D", texto: "Nenhum exame, pois a soroterapia encerra o risco de complicações.", correta: false, comentario: "Mesmo após o antiveneno, é necessário observar evolução e monitorar complicações conforme o protocolo." },
    ],
    dificuldade: "intermediaria",
    estilo: "exame",
    fonte: FONTE_MS,
    tags: ["ofidismo", "tempo de coagulação", "função renal", "monitorização"],
  },
];
