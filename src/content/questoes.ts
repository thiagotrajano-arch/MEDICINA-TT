import type { Questao } from "@/domain/content/types";

/**
 * Question bank (seed).
 *
 * These seed questions are authored from stable guideline facts and clearly
 * sourced. The user's real OMED simulados (MFC 80Q, Cirurgia 160Q, Infecto 160Q,
 * Pediatria, GO...) will be bulk-imported and classified into this same shape.
 */
export const QUESTOES: Questao[] = [
  {
    id: "q-go-pe-001",
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
    disciplinaId: "go",
    enunciado:
      "Gestante de 34 semanas, previamente normotensa, apresenta PA de 165 × 112 mmHg, cefaleia intensa e escotomas. Exames: plaquetas 88.000/mm³, TGO 2,5× o limite. Qual a conduta medicamentosa mais adequada para prevenir eclâmpsia?",
    alternativas: [
      { letra: "A", texto: "Captopril por via oral", correta: false, comentario: "IECA é contraindicado na gestação (teratogênico) e não previne convulsão." },
      { letra: "B", texto: "Sulfato de magnésio", correta: true, comentario: "É a droga de escolha para prevenção/tratamento da convulsão na PE com sinais de gravidade (esquemas de Pritchard ou Zuspan)." },
      { letra: "C", texto: "Diazepam em bolus", correta: false, comentario: "Benzodiazepínico não é a primeira linha; o sulfato de magnésio é superior na prevenção de recorrência de convulsão eclâmptica." },
      { letra: "D", texto: "Furosemida endovenosa", correta: false, comentario: "Diurético não tem papel na prevenção de convulsão e pode piorar a volemia; reservado a situações específicas como edema pulmonar." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["pré-eclâmpsia", "sulfato de magnésio", "obstetrícia"],
    fonte: "Seed — FEBRASGO/ACOG",
  },
  {
    id: "q-go-pe-002",
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
    disciplinaId: "go",
    enunciado:
      "Sobre o diagnóstico de pré-eclâmpsia, assinale a alternativa correta:",
    alternativas: [
      { letra: "A", texto: "A proteinúria é obrigatória para o diagnóstico.", correta: false, comentario: "Desde as diretrizes atuais, a proteinúria deixou de ser obrigatória quando há disfunção de órgão-alvo." },
      { letra: "B", texto: "Pode ser diagnosticada antes de 20 semanas na ausência de doença trofoblástica.", correta: false, comentario: "Por definição, a PE surge após 20 semanas; hipertensão antes disso sugere hipertensão crônica." },
      { letra: "C", texto: "Hipertensão após 20 semanas com plaquetopenia < 100.000 e sem proteinúria caracteriza pré-eclâmpsia.", correta: true, comentario: "Disfunção de órgão-alvo (aqui, plaquetopenia) fecha o diagnóstico mesmo sem proteinúria." },
      { letra: "D", texto: "Requer PA ≥ 160 × 110 mmHg para ser diagnosticada.", correta: false, comentario: "≥ 160 × 110 define gravidade, não o diagnóstico, que se dá a partir de ≥ 140 × 90." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["pré-eclâmpsia", "critérios diagnósticos"],
    fonte: "Seed — FEBRASGO/ACOG",
  },
  {
    id: "q-go-pe-003",
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
    disciplinaId: "go",
    enunciado:
      "Durante infusão de sulfato de magnésio, qual achado clínico indica intoxicação e deve motivar suspensão imediata da droga?",
    alternativas: [
      { letra: "A", texto: "Abolição do reflexo patelar", correta: true, comentario: "A perda do reflexo patelar é sinal precoce de toxicidade e antecede a depressão respiratória; antídoto = gluconato de cálcio." },
      { letra: "B", texto: "Cefaleia leve", correta: false, comentario: "Cefaleia não é sinal de intoxicação por magnésio." },
      { letra: "C", texto: "Hiperreflexia", correta: false, comentario: "A toxicidade causa HIPOrreflexia/arreflexia, não hiperreflexia." },
      { letra: "D", texto: "Taquicardia isolada", correta: false, comentario: "Não é marcador de toxicidade do magnésio." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["sulfato de magnésio", "toxicidade", "segurança"],
    fonte: "Seed — FEBRASGO/ACOG",
  },
];
