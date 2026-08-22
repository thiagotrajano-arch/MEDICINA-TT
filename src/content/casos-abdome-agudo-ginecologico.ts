import type { CasoClinico } from "@/domain/content/types";

export const CASOS_ABDOMEN_AGUDO_GINECOLOGICO: CasoClinico[] = [
  {
    id: "caso-go-abdome-agudo-01",
    disciplinaId: "go",
    subtemaId: "go--urgencias-ginecologicas--abdome-agudo",
    titulo: "Dor pélvica aguda: ectópica ou torção?",
    resumo: "Abordagem inicial da dor pélvica aguda, teste de gravidez, ultrassonografia e reconhecimento de emergência cirúrgica.",
    dificuldade: "avancada",
    tags: ["dor pélvica", "gravidez ectópica", "torção anexial", "ultrassonografia"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Primeiros minutos",
        corpo: "Mulher de 29 anos chega ao pronto atendimento com dor pélvica súbita à direita, náuseas e um episódio de vômito. Refere atraso menstrual incerto e pequeno sangramento vaginal. Está pálida e ansiosa.",
        pergunta: "Qual é a primeira organização do raciocínio?",
        resposta: "Avaliar estado geral e estabilidade hemodinâmica, fazer anamnese e exame físico detalhados e manter no diferencial causas ginecológicas, urinárias, gastrointestinais e sistêmicas. Analgesia adequada pode ser oferecida sem impedir a investigação.",
      },
      {
        tipo: "laboratorio",
        titulo: "Exames iniciais",
        corpo: "PA 108 × 70 mmHg, FC 104 bpm, temperatura normal. O hemograma não mostra anemia importante. O teste de hCG é positivo. A ultrassonografia transvaginal não visualiza gestação intrauterina e mostra massa anexial direita com pequena quantidade de líquido livre.",
        pergunta: "Como interpretar a combinação?",
        resposta: "hCG positivo, ausência de gestação intrauterina e massa anexial aumentam a suspeita de gravidez ectópica, mas a interpretação deve integrar valores seriados, exame clínico e ultrassonografia. O hCG isolado não localiza a gestação.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Mudança de gravidade",
        corpo: "Durante a observação, a paciente piora: PA 82 × 50 mmHg, FC 126 bpm, dor intensa, defesa abdominal e aumento do líquido livre ao ultrassom.",
        pergunta: "O que muda imediatamente?",
        resposta: "O quadro sugere sangramento intra-abdominal por gravidez ectópica rota. A prioridade passa a ser estabilização, acesso venoso, avaliação de necessidade transfusional e acionamento imediato da equipe cirúrgica; não se deve aguardar duplicação do hCG ou nova consulta ambulatorial.",
      },
      {
        tipo: "desfecho",
        titulo: "Diagnóstico diferencial preservado",
        corpo: "Em outra paciente estável, com hCG negativo, a dor unilateral súbita, vômitos e ovário aumentado com massa anexial apontam para torção anexial.",
        pergunta: "Qual é a mensagem final para a equipe?",
        resposta: "Torção anexial é emergência cirúrgica. A ultrassonografia, com ou sem Doppler, auxilia, mas o diagnóstico é clínico e a condução deve ser urgente. A escolha entre detorção e procedimento definitivo considera idade, desejo reprodutivo, menopausa e evidência de doença ovariana.",
      },
    ],
    discussao: "Dor pélvica aguda exige raciocínio rápido e amplo. O teste de hCG deve integrar a avaliação de toda mulher em idade reprodutiva. Na ectópica, hCG e ultrassonografia são complementares; instabilidade e hemoperitônio transformam o quadro em emergência. Na torção, dor unilateral com náuseas, massa anexial e ovário aumentado exige avaliação cirúrgica urgente.",
    referencias: [
      "FEBRASGO — Protocolo nº 28: Abdome agudo em ginecologia: https://www.febrasgo.org.br/images/pec/Protocolos-assistenciais/n28---G---Abdome-agudo-em-ginecologia-2020.pdf",
      "Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf",
    ],
  },
];
