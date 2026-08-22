import type { CasoClinico } from "@/domain/content/types";

export const CASOS_DISFUNCOES_TIREOIDIANAS: CasoClinico[] = [
  {
    id: "caso-endocrino-tireoide-01",
    disciplinaId: "endocrino",
    subtemaId: "endocrino--disfuncoes-tireoidianas--hipotireoidismo-e-hipertireoidismo",
    titulo: "TSH alterado não é diagnóstico isolado",
    resumo: "Interpretação integrada de sintomas, TSH e T4 livre em suspeita de disfunção tireoidiana.",
    dificuldade: "intermediaria",
    tags: ["hipotireoidismo", "TSH", "T4 livre", "monitoramento"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Sintomas inespecíficos",
        corpo: "Mulher de 39 anos relata fadiga, sonolência, constipação e dificuldade de concentração há vários meses. Não usa amiodarona, lítio ou hormônios tireoidianos e não está grávida.",
        pergunta: "Os sintomas confirmam hipotireoidismo?",
        resposta: "Não. Eles aumentam a suspeita, mas são inespecíficos. A avaliação deve integrar história, exame físico e testes de função tireoidiana; não se deve diagnosticar ou tratar apenas pela presença de sintomas.",
      },
      {
        tipo: "laboratorio",
        titulo: "Primeiro painel",
        corpo: "TSH = 14 mUI/L e T4 livre abaixo do intervalo de referência. A paciente está hemodinamicamente estável e não há sinais de emergência.",
        pergunta: "Como interpretar esse padrão?",
        resposta: "TSH elevado com T4 livre reduzido é compatível com hipotireoidismo primário manifesto. A equipe deve confirmar contexto, etiologia provável, medicamentos, comorbidades e necessidade de tratamento conforme o PCDT e o cuidado clínico individual.",
      },
      {
        tipo: "conduta",
        titulo: "Plano de cuidado",
        corpo: "A paciente pergunta se pode iniciar qualquer produto vendido como suplemento para tireoide e repetir os exames no mesmo dia.",
        pergunta: "Qual orientação é segura?",
        resposta: "Não substituir tratamento prescrito por suplementos nem ajustar hormônio por conta própria. A terapia, quando indicada, deve seguir a orientação profissional e o protocolo vigente; o monitoramento deve respeitar o intervalo necessário para avaliar resposta, adesão, interações e necessidade de ajuste.",
      },
      {
        tipo: "evolucao",
        titulo: "Resultado discordante",
        corpo: "Em outro paciente, o TSH está alto, mas o T4 livre permanece normal e o resultado se repete. Ele tem 68 anos, doença coronariana estável e poucos sintomas.",
        pergunta: "Por que a decisão não deve ser automática?",
        resposta: "Esse padrão sugere hipotireoidismo subclínico. A decisão depende da magnitude e persistência do TSH, idade, sintomas, risco cardiovascular, anticorpos, medicamentos e preferências, equilibrando benefícios e riscos; não se deve transpor automaticamente a conduta do hipotireoidismo manifesto.",
      },
    ],
    discussao: "O eixo do caso é separar sintomas de confirmação bioquímica e reconhecer os padrões: TSH alto com T4 livre baixo indica hipotireoidismo primário manifesto; TSH alto com T4 livre normal indica forma subclínica, cuja decisão é contextual. O tratamento e o monitoramento devem seguir o PCDT vigente e a avaliação clínica, sem automedicação.",
    referencias: [
      "Ministério da Saúde/CONITEC — PCDT do Hipotireoidismo: https://www.gov.br/conitec/pt-br/midias/relatorios/2021/20210423_pcdt_hipotireoidismo_586.pdf",
      "Ministério da Saúde/UFRGS — Protocolos de Endocrinologia: https://bvsms.saude.gov.br/bvs/publicacoes/protocolos_atencao_basica_atencao_especializada_endocrinologia.pdf",
    ],
  },
];
