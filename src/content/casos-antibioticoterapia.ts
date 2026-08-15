import type { CasoClinico } from "@/domain/content/types";

const SUBTEMA = "inf--antibioticoterapia--principios-de-antibioticoterapia-empirica";

export const CASOS_ANTIBIOTICOTERAPIA: CasoClinico[] = [
  {
    id: "caso-inf-atb-01",
    disciplinaId: "inf",
    subtemaId: SUBTEMA,
    titulo: "Sepse abdominal: do empírico ao descalonamento",
    resumo: "O caso treina a sequência foco–gravidade–cultura–controle de foco–reavaliação.",
    dificuldade: "avancada",
    tags: ["sepse", "controle de foco", "descalonamento", "stewardship"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Apresentação",
        corpo: "Homem de 67 anos, diabético, chega com 24 horas de dor em hipocôndrio direito, febre e confusão. PA 86/52 mmHg, FC 124 bpm, lactato elevado. Ultrassom sugere foco biliar complicado.",
        pergunta: "Quais são as prioridades antes de escolher o esquema?",
        resposta: "Reconhecer sepse com hipoperfusão, iniciar suporte, coletar culturas sem atrasar a primeira dose, escolher empírico conforme foco/gravidade/epidemiologia e acionar a equipe para controle da obstrução ou drenagem quando indicada.",
      },
      {
        tipo: "conduta",
        titulo: "Primeira hora",
        corpo: "Foram obtidas hemoculturas e a equipe de cirurgia/endoscopia foi acionada.",
        pergunta: "O que não pode ser esquecido além do antibiótico?",
        resposta: "Ressuscitação guiada por perfusão, vasopressor se necessário, monitorização de órgão e controle precoce do foco. Antibiótico sem drenagem de uma fonte obstruída pode falhar mesmo que o espectro esteja correto.",
      },
      {
        tipo: "laboratorio",
        titulo: "Reavaliação em 48 horas",
        corpo: "A drenagem foi realizada. Cultura identifica um bacilo Gram-negativo sensível a um agente de espectro mais estreito. O paciente está afebril e a função orgânica melhorou.",
        pergunta: "Como ajustar a terapia?",
        resposta: "Rever indicação, agente, sensibilidade, dose, via e duração; descalonar para o fármaco mais estreito ativo e trocar para via oral quando absorção, foco e estado clínico permitirem. Registrar o plano e a duração prevista.",
      },
    ],
    discussao: "O erro clássico é tratar o antibiótico como intervenção isolada. O raciocínio correto integra suporte, culturas, controle de foco e reavaliação diária; a terapia ampla inicial não deve permanecer por inércia.",
    referencias: [
      "ANVISA. PeGASUS — Programa de Gerenciamento de Antimicrobianos. https://www.gov.br/anvisa/pt-br/assuntos/servicosdesaude/prevencao-e-controle-de-infeccao-e-resistencia-microbiana/projetos-gvims/pegasus",
      "WHO. The WHO AWaRe antibiotic book. https://www.who.int/publications/i/item/9789240062382",
    ],
  },
  {
    id: "caso-inf-atb-02",
    disciplinaId: "inf",
    subtemaId: SUBTEMA,
    titulo: "Bacteriúria por ESBL: infecção ou colonização?",
    resumo: "O caso treina a interpretação do antibiograma sem tratar um resultado isolado.",
    dificuldade: "avancada",
    tags: ["ESBL", "urocultura", "colonização", "antibiograma"],
    etapas: [
      {
        tipo: "historia",
        titulo: "A cultura",
        corpo: "Mulher de 74 anos, institucionalizada, tem urocultura com Enterobacterales produtor de ESBL em coleta de rotina. Está afebril, sem disúria, dor lombar ou alteração do estado mental em relação ao basal.",
        pergunta: "O resultado exige antibiótico?",
        resposta: "Não por si só. Sem sintomas ou sinais compatíveis, o achado é bacteriúria assintomática/colonização até prova em contrário. Tratar o laudo isolado seleciona resistência e causa dano, salvo situações específicas previstas em protocolo.",
      },
      {
        tipo: "evolucao",
        titulo: "Mudança clínica",
        corpo: "Dois dias depois, apresenta febre, dor lombar, calafrios, hipotensão e elevação de creatinina. Nova coleta é feita antes da primeira dose, sem atrasar o tratamento.",
        pergunta: "Como estruturar a decisão agora?",
        resposta: "Há suspeita de pielonefrite complicada com sepse. Iniciar empírico guiado por foco, gravidade, função renal e histórico de sensibilidade; avaliar obstrução/controle de foco e ajustar assim que o antibiograma confirmar o mecanismo e o agente.",
      },
      {
        tipo: "desfecho",
        titulo: "Cultura definitiva",
        corpo: "O antibiograma confirma ESBL e uma opção dirigida ativa; não há obstrução urinária.",
        pergunta: "Qual é a regra editorial e clínica?",
        resposta: "Usar a orientação específica para ESBL, o sítio e a sensibilidade, sem copiar uma escolha universal. Ajustar dose à função renal, revisar via e duração e envolver infectologia/CCIH quando o caso ou o padrão de resistência for complexo.",
      },
    ],
    discussao: "O caso separa colonização de infecção e mostra por que a mesma bactéria pode não exigir tratamento em um momento e exigir terapia dirigida em outro. O antibiograma é ferramenta de decisão, não diagnóstico isolado.",
    referencias: [
      "IDSA. 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections. https://www.idsociety.org/practice-guideline/amr-guidance",
      "WHO. AWaRe classification of antibiotics, 2023. https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.04",
    ],
  },
];
