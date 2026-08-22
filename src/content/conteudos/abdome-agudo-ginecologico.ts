import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_ABDOMEN_AGUDO_GINECOLOGICO: Record<string, ConteudoSubtema> = {
  "go--urgencias-ginecologicas--abdome-agudo": {
    subtemaId: "go--urgencias-ginecologicas--abdome-agudo",
    titulo: "Abdome agudo ginecológico",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Abordagem inicial", corpo: "Dor pélvica aguda exige avaliação imediata do estado geral, estabilidade hemodinâmica, padrão da dor, sangramento, sintomas urinários e gastrointestinais e exame físico dirigido. A investigação deve considerar causas ginecológicas e não ginecológicas. Analgesia adequada não precisa ser retardada." },
      { secao: "Teste de gravidez e imagem", corpo: "O hCG deve integrar a avaliação de toda mulher em idade reprodutiva com dor abdominal aguda. Ultrassonografia abdominal, pélvica ou transvaginal auxilia na identificação de gestação, massas anexiais e líquido livre; o exame deve ser interpretado junto com a clínica e não isoladamente." },
      { secao: "Gravidez ectópica", corpo: "hCG positivo não localiza a gestação. A suspeita de ectópica aumenta quando não há gestação intrauterina na ultrassonografia e existe massa anexial ou líquido livre, mas a decisão depende de valores seriados, exame clínico e imagem. Instabilidade, dor intensa e hemoperitônio exigem estabilização e avaliação cirúrgica urgente." },
      { secao: "Torção anexial", corpo: "Dor unilateral súbita, náuseas/vômitos e massa anexial dolorosa devem alertar para torção. Ovário aumentado, líquido livre e alterações ao Doppler podem apoiar a hipótese, mas a avaliação clínica é central. Torção anexial é emergência cirúrgica; a escolha do procedimento considera idade, fertilidade e doença ovariana." },
      { secao: "Pontos de prova e segurança", corpo: "- hCG é obrigatório no raciocínio de dor pélvica em idade reprodutiva.\n- hCG isolado não diagnostica localização da gestação.\n- Instabilidade e líquido livre podem indicar hemoperitônio.\n- Dor de torção não deve ser observada por vários dias.\n- O diagnóstico diferencial inclui apendicite, doença inflamatória pélvica, litíase, cisto hemorrágico e causas extra-abdominais." },
    ],
    referencias: [
      "FEBRASGO — Protocolo nº 28: Abdome agudo em ginecologia: https://www.febrasgo.org.br/images/pec/Protocolos-assistenciais/n28---G---Abdome-agudo-em-ginecologia-2020.pdf",
      "Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf",
    ],
  },
};
