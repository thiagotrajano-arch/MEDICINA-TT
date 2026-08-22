import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_VIOLENCIA_SEXUAL: Record<string, ConteudoSubtema> = {
  "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias": {
    subtemaId: "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias",
    titulo: "Atendimento integral após violência sexual",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Acolhimento e privacidade", corpo: "O primeiro atendimento pode ocorrer em qualquer serviço de saúde. Deve ser feito de forma humanizada, em ambiente privativo, com escuta qualificada, respeito à autonomia e prevenção de julgamento ou revitimização. A ausência de boletim de ocorrência não impede o acesso ao cuidado." },
      { secao: "Avaliação integral", corpo: "O atendimento pode incluir registro da história necessária ao cuidado, exame clínico e ginecológico quando indicado e consentido, coleta de vestígios, exames complementares, contracepção de emergência, avaliação de gravidez, profilaxias para HIV, hepatite B e outras IST, apoio psicológico/social e seguimento." },
      { secao: "PEP", corpo: "A PEP para HIV é medida de emergência e deve ser iniciada o mais cedo possível quando indicada, dentro da janela de até 72 horas após a exposição. A decisão deve seguir o protocolo vigente e não deve ser atrasada pela espera de todos os resultados laboratoriais." },
      { secao: "Notificação e rede", corpo: "A violência sexual é agravo de notificação compulsória conforme fluxo sanitário vigente, incluindo prazo de 24 horas informado pelo Ministério da Saúde. A notificação em saúde não deve ser confundida com envio automático da identidade à segurança pública. O cuidado deve articular atenção à saúde, proteção social e saúde mental." },
      { secao: "Pontos de prova e segurança", corpo: "- Não exigir BO para atender.\n- Evitar interrogatório, censura e revitimização.\n- PEP para HIV: iniciar cedo, até 72 horas quando indicada.\n- Avaliar hepatite B, outras IST, gravidez e contracepção de emergência.\n- Notificar conforme a norma, preservando confidencialidade e mantendo seguimento." },
    ],
    referencias: [
      "Ministério da Saúde — Violência sexual: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/violencia-sexual/violencia-sexual",
      "Ministério da Saúde — Profilaxia Pós-Exposição: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aids-hiv/pep",
      "Ministério da Saúde — Norma Técnica de atenção humanizada: https://bvsms.saude.gov.br/bvs/publicacoes/atencao_humanizada_pessoas_violencia_sexual_norma_tecnica.pdf",
    ],
  },
};
