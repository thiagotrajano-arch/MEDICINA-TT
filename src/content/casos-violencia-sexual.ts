import type { CasoClinico } from "@/domain/content/types";

export const CASOS_VIOLENCIA_SEXUAL: CasoClinico[] = [
  {
    id: "caso-go-violencia-sexual-01",
    disciplinaId: "go",
    subtemaId: "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias",
    titulo: "Acolhimento e cuidado integral após violência sexual",
    resumo: "Privacidade, profilaxias, contracepção de emergência, notificação e seguimento sem revitimização.",
    dificuldade: "intermediaria",
    tags: ["violência sexual", "PEP", "acolhimento", "notificação"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Chegada ao serviço",
        corpo: "Pessoa adulta procura uma unidade de saúde 36 horas após uma situação de violência sexual. Está assustada, pede que o atendimento seja reservado e não fez boletim de ocorrência.",
        pergunta: "Qual deve ser a primeira atitude da equipe?",
        resposta: "Acolher em ambiente privativo, escutar sem julgamento, respeitar a autonomia e organizar assistência integral. O atendimento não deve ser recusado pela ausência de boletim de ocorrência e não pode ser conduzido como interrogatório policial.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Plano de cuidado",
        corpo: "Após consentimento e explicação das etapas, a pessoa aceita avaliação clínica, exames e discussão sobre coleta de vestígios. Relata exposição sem método contraceptivo e não sabe seu estado vacinal para hepatite B.",
        pergunta: "Quais componentes devem ser lembrados?",
        resposta: "O plano pode incluir exame clínico e ginecológico quando indicado e consentido, coleta de vestígios, contracepção de emergência quando aplicável, testagem, profilaxias para HIV, hepatite B e outras IST, apoio psicológico/social e seguimento. Cada etapa deve ser explicada e respeitar a pessoa atendida.",
      },
      {
        tipo: "conduta",
        titulo: "PEP e prazo",
        corpo: "A equipe confirma que a exposição ocorreu há 36 horas. Não há contraindicação clínica conhecida à profilaxia e o serviço dispõe de PEP.",
        pergunta: "Como conduzir a decisão?",
        resposta: "A PEP para HIV é uma medida de emergência e, quando indicada, deve ser iniciada o mais cedo possível dentro da janela recomendada, sem esperar a conclusão de todos os exames. Também é necessário avaliar hepatite B, outras IST, gravidez e necessidade de contracepção de emergência conforme protocolos vigentes.",
      },
      {
        tipo: "desfecho",
        titulo: "Notificação e continuidade",
        corpo: "A pessoa aceita o seguimento, mas teme que a notificação resulte automaticamente em contato policial e exposição de sua identidade.",
        pergunta: "Como explicar a notificação e o retorno?",
        resposta: "A equipe deve explicar, com linguagem clara, a notificação compulsória em saúde conforme o prazo e fluxo vigentes, preservando confidencialidade e evitando revitimização. A notificação sanitária não substitui o cuidado e não deve ser apresentada como envio automático da identidade à segurança pública. O retorno deve acompanhar adesão, efeitos, exames, saúde mental e proteção social.",
      },
    ],
    discussao: "O atendimento é clínico, ético e intersetorial: começa com privacidade e acolhimento, segue com prevenção de gravidez e ISTs quando indicada, inclui notificação sanitária e termina apenas quando há plano de seguimento e proteção. A ausência de BO não pode bloquear o cuidado.",
    referencias: [
      "Ministério da Saúde — Violência sexual: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/violencia-sexual/violencia-sexual",
      "Ministério da Saúde — Profilaxia Pós-Exposição: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aids-hiv/pep",
      "Ministério da Saúde — Norma Técnica de atenção humanizada: https://bvsms.saude.gov.br/bvs/publicacoes/atencao_humanizada_pessoas_violencia_sexual_norma_tecnica.pdf",
    ],
  },
];
