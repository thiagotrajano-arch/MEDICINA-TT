import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_DOENCAS_INFLAMATORIAS_INTESTINAIS: Record<string, ConteudoSubtema> = {
  "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta": {
    subtemaId: "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta",
    titulo: "Doenças inflamatórias intestinais: diagnóstico e conduta",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Suspeita diagnóstica", corpo: "Diarreia crônica, sangue nas fezes, urgência e perda ponderal exigem distinguir doença inflamatória de infecção, doença funcional, fármacos e outras causas. Na suspeita de retocolite ulcerativa, causas infecciosas devem ser excluídas na apresentação, especialmente Clostridioides difficile." },
      { secao: "Confirmação e extensão", corpo: "O diagnóstico integra clínica, colonoscopia com avaliação do íleo terminal, biópsias de áreas afetadas e não afetadas e interpretação anatomopatológica. A extensão e a gravidade devem ser registradas porque mudam a escolha e o acompanhamento do tratamento." },
      { secao: "Monitoramento", corpo: "A avaliação não deve se limitar à melhora dos sintomas. Frequência evacuatória, sangramento e urgência são combinados com PCR, calprotectina fecal, endoscopia e, quando disponível e apropriado, ultrassom intestinal. O objetivo é remissão sustentada sem corticoide e melhora endoscópica." },
      { secao: "Colite ulcerativa aguda grave", corpo: "O paciente internado com colite ulcerativa aguda grave precisa de avaliação infecciosa, suporte, corticoide intravenoso quando indicado, profilaxia farmacológica de tromboembolismo venoso quando clinicamente apropriada e monitoramento diário. A falta de resposta deve desencadear discussão de terapia de resgate e cirurgia, sem prolongar indefinidamente tratamento ineficaz." },
      { secao: "Armadilhas", corpo: "- Sorologia não estabelece nem exclui retocolite ulcerativa.\n- Infecção por C. difficile pode coexistir e deve ser pesquisada.\n- Remissão sintomática isolada não garante controle endoscópico.\n- Corticoide não é estratégia de manutenção indefinida.\n- Na forma aguda grave, a avaliação cirúrgica precoce faz parte da segurança." },
    ],
    referencias: [
      "ACG Clinical Guideline Update: Ulcerative Colitis in Adults (2025): https://gi.org/journals-publications/ebgi/alkazzi_aug2025/",
      "ACG Guideline Highlights — Management of Ulcerative Colitis in Adults: https://webfiles.gi.org/GuidelineHighlights/UC-highlights-final.pdf",
    ],
  },
};
