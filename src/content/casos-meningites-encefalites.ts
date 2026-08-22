import type { CasoClinico } from "@/domain/content/types";

export const CASOS_MENINGITES_ENCEFALITES: CasoClinico[] = [
  {
    id: "caso-neuro-meningite-01",
    disciplinaId: "neuro",
    subtemaId: "neuro--meningites-e-encefalites--diagnostico-e-conduta",
    titulo: "Meningite suspeita: tratar sem atrasar",
    resumo: "Suspeita clínica, coleta de exames, decisão sobre punção lombar e prevenção de sequelas após a fase aguda.",
    dificuldade: "avancada",
    tags: ["meningite bacteriana", "líquor", "antibiótico", "sequelas"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Chegada à emergência",
        corpo: "Homem de 68 anos apresenta febre alta, cefaleia intensa e confusão mental progressiva. Ao exame, há rigidez de nuca, mas não há déficit focal evidente. A equipe suspeita de meningite adquirida na comunidade.",
        pergunta: "Qual é o enquadramento inicial?",
        resposta: "Meningite é uma emergência médica. A equipe deve iniciar avaliação imediata de gravidade, monitorização e coleta de exames apropriados, sem transformar a confirmação etiológica em pré-requisito para começar o cuidado urgente.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Punção e tratamento",
        corpo: "A punção lombar não está imediatamente disponível e a transferência para o setor de imagem levará tempo. O paciente permanece febril e mais sonolento.",
        pergunta: "O que não pode ser atrasado?",
        resposta: "Se a suspeita de meningite bacteriana for relevante, a primeira dose antimicrobiana não deve esperar o resultado do líquor nem uma demora logística evitável. A punção deve ser realizada assim que for segura e viável, com coleta de sangue e líquor quando possível.",
      },
      {
        tipo: "laboratorio",
        titulo: "Líquor e sangue",
        corpo: "Após o início do tratamento, o líquor é coletado: aspecto turvo, pleocitose com predomínio de neutrófilos, proteína elevada e glicose reduzida em relação à glicemia. Hemoculturas também são enviadas.",
        pergunta: "Como usar esses resultados?",
        resposta: "O padrão do líquor apoia meningite bacteriana, enquanto culturas, testes moleculares e exames sanguíneos ajudam a identificar o agente e ajustar o tratamento. O início prévio do antimicrobiano pode reduzir o rendimento de culturas, mas não torna a coleta inútil.",
      },
      {
        tipo: "conduta",
        titulo: "Cuidado após a fase aguda",
        corpo: "O paciente melhora, recebe alta após tratamento e a família pergunta se o acompanhamento terminou.",
        pergunta: "Que acompanhamento deve ser planejado?",
        resposta: "Deve-se procurar sequelas auditivas, cognitivas, neurológicas e comportamentais e encaminhar para avaliação e reabilitação conforme achados. A recuperação clínica imediata não exclui complicações de longo prazo.",
      },
    ],
    discussao: "O caso treina uma regra de segurança: quando meningite bacteriana é suspeita, tratar rapidamente. A punção lombar é importante para o diagnóstico, mas nunca deve gerar atraso perigoso do antimicrobiano. O raciocínio continua depois da alta, pois a doença pode deixar sequelas que exigem rastreio e reabilitação.",
    referencias: [
      "WHO guidelines on meningitis diagnosis, treatment and care (2025): https://www.who.int/publications/i/item/9789240108042",
      "WHO fact sheet — Meningitis: https://www.who.int/news-room/fact-sheets/detail/meningitis",
    ],
  },
];
