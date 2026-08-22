import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_MENINGITES_ENCEFALITES: Record<string, ConteudoSubtema> = {
  "neuro--meningites-e-encefalites--diagnostico-e-conduta": {
    subtemaId: "neuro--meningites-e-encefalites--diagnostico-e-conduta",
    titulo: "Meningites e encefalites: diagnóstico e conduta",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Emergência clínica", corpo: "Meningite suspeita exige atendimento urgente. Febre, cefaleia, rigidez de nuca, alteração da consciência, convulsões ou exantema podem aparecer em combinações diferentes; a ausência da tríade completa não exclui a doença." },
      { secao: "Líquor sem atraso terapêutico", corpo: "A punção lombar é central para analisar o líquor e identificar o agente, mas nunca deve atrasar a primeira dose antimicrobiana quando meningite bacteriana é suspeita. O tratamento deve começar assim que possível, enquanto a coleta é organizada com segurança." },
      { secao: "Diagnóstico etiológico", corpo: "Líquor e sangue podem ser submetidos a cultura, testes moleculares e outros exames conforme disponibilidade. Os resultados ajudam a identificar o patógeno, orientar susceptibilidade e ajustar o tratamento; o esquema empírico deve considerar idade, imunossupressão, epidemiologia e resistência local." },
      { secao: "Após a alta", corpo: "A doença pode causar perda auditiva, alterações cognitivas, comportamentais, neurológicas e outras sequelas. O seguimento deve ser proporcional ao risco e incluir avaliação funcional e reabilitação quando necessário." },
      { secao: "Pontos de prova e segurança", corpo: "- Meningite é emergência.\n- Antibiótico não deve esperar o líquor se houver suspeita bacteriana relevante.\n- Exames de sangue e líquor são complementares.\n- Imagem pode ser necessária em cenários selecionados, mas não substitui tratamento urgente.\n- Cura da infecção não encerra automaticamente o cuidado." },
    ],
    referencias: [
      "WHO guidelines on meningitis diagnosis, treatment and care (2025): https://www.who.int/publications/i/item/9789240108042",
      "WHO fact sheet — Meningitis: https://www.who.int/news-room/fact-sheets/detail/meningitis",
    ],
  },
};
