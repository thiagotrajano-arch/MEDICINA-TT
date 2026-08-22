import type { CasoClinico } from "@/domain/content/types";

export const CASOS_DOENCAS_INFLAMATORIAS_INTESTINAIS: CasoClinico[] = [
  {
    id: "caso-gastro-dii-01",
    disciplinaId: "gastro",
    subtemaId: "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta",
    titulo: "Colite ulcerativa aguda grave: excluir infecção e medir resposta",
    resumo: "Diarreia sanguinolenta, avaliação inicial, tratamento hospitalar e decisão de resgate em colite ulcerativa aguda grave.",
    dificuldade: "avancada",
    tags: ["retocolite ulcerativa", "colite aguda grave", "C. difficile", "corticoide IV"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Apresentação",
        corpo: "Mulher de 31 anos apresenta 10 evacuações sanguinolentas por dia, urgência intensa, febre baixa e perda de 4 kg em um mês. Nunca recebeu diagnóstico de doença inflamatória intestinal.",
        pergunta: "Qual é o primeiro cuidado diagnóstico antes de definir imunossupressão?",
        resposta: "Avaliar gravidade e excluir causas infecciosas, especialmente Clostridioides difficile, com história, exames de fezes e avaliação laboratorial. A suspeita de retocolite não autoriza ignorar infecção concomitante.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Gravidade",
        corpo: "Está taquicárdica, desidratada e com dor abdominal difusa sem sinais de perfuração. Hemoglobina 9,6 g/dL, PCR elevada, albumina baixa e eletrólitos alterados. O teste para C. difficile é negativo.",
        pergunta: "Como a gravidade deve orientar o plano?",
        resposta: "A paciente precisa de internação, reposição e monitoramento estreito, integrando frequência das evacuações, sangramento, sinais vitais, hemograma, PCR, albumina e avaliação endoscópica apropriada. A gravidade não deve ser definida por um único número.",
      },
      {
        tipo: "laboratorio",
        titulo: "Confirmação",
        corpo: "A colonoscopia limitada por inflamação intensa mostra comprometimento contínuo a partir do reto. Biópsias de áreas afetadas e não afetadas são encaminhadas à patologia; não há evidência de megacólon tóxico.",
        pergunta: "Que elementos sustentam a confirmação e o acompanhamento?",
        resposta: "O padrão clínico, a extensão, a endoscopia e a histologia são integrados para confirmar e classificar a doença. Calprotectina fecal e PCR podem ajudar a acompanhar resposta ou suspeita de recaída, sem substituir a avaliação clínica e endoscópica quando indicada.",
      },
      {
        tipo: "conduta",
        titulo: "Tratamento hospitalar",
        corpo: "A equipe decide tratar como colite ulcerativa aguda grave, com necessidade de observação hospitalar e avaliação diária da resposta.",
        pergunta: "Quais pilares devem ser lembrados no início?",
        resposta: "A atualização do ACG destaca corticoide intravenoso, profilaxia farmacológica de tromboembolismo venoso quando clinicamente apropriada e monitoramento estruturado. O plano deve ser individualizado, com equipe de gastroenterologia e cirurgia envolvidas precocemente se a evolução for desfavorável.",
      },
      {
        tipo: "desfecho",
        titulo: "Resposta insuficiente",
        corpo: "Após período de avaliação, a paciente mantém evacuações frequentes com sangue, taquicardia e marcadores inflamatórios elevados, sem melhora clínica adequada.",
        pergunta: "Qual é a próxima decisão segura?",
        resposta: "Reavaliar resposta, excluir complicações e discutir terapia de resgate conforme protocolo especializado, além de avaliação cirúrgica precoce. A ausência de melhora não deve levar a prolongar indefinidamente corticoide ou adiar controle definitivo da doença.",
      },
    ],
    discussao: "O caso reforça que doenças inflamatórias intestinais exigem diagnóstico de exclusão infecciosa, classificação de extensão e gravidade e acompanhamento por múltiplos domínios. Na colite ulcerativa aguda grave, o eixo é tratar no hospital, prevenir complicações, medir resposta em tempo adequado e planejar resgate ou cirurgia sem atrasos evitáveis.",
    referencias: [
      "ACG Clinical Guideline Update: Ulcerative Colitis in Adults (2025): https://gi.org/journals-publications/ebgi/alkazzi_aug2025/",
      "ACG Guideline Highlights — Management of Ulcerative Colitis in Adults: https://webfiles.gi.org/GuidelineHighlights/UC-highlights-final.pdf",
    ],
  },
];
