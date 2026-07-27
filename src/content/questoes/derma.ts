import type { Questao } from "@/domain/content/types";

export const QUESTOES_DERMA: Questao[] = [
  {
    id: "derma-001",
    subtemaId: "derma--piodermites--diagnostico-e-conduta",
    disciplinaId: "derma",
    enunciado: "Paciente apresenta coleção purulenta flutuante em pele, sem instabilidade. Qual medida é central no tratamento?",
    alternativas: [
      { letra: "A", texto: "Apenas corticoide tópico.", correta: false, comentario: "Corticoide pode piorar infecção e não remove pus." },
      { letra: "B", texto: "Incisão e drenagem.", correta: true, comentario: "Correta: abscesso é coleção; a intervenção principal é drenagem, com antibiótico conforme gravidade e risco." },
      { letra: "C", texto: "Antifúngico oral.", correta: false, comentario: "Abscesso bacteriano comum não é tratado com antifúngico." },
      { letra: "D", texto: "Observação sem intervenção, pois todo abscesso drena espontaneamente.", correta: false, comentario: "Aguardar pode ampliar a infecção; coleção purulenta precisa drenagem quando acessível." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["abscesso", "piodermite", "drenagem"],
  },
  {
    id: "derma-002",
    subtemaId: "derma--neoplasias-cutaneas--cbc-cec-e-melanoma",
    disciplinaId: "derma",
    enunciado: "Lesão pigmentada assimétrica, com bordas irregulares, múltiplas cores e crescimento recente. Qual conduta inicial é mais adequada?",
    alternativas: [
      { letra: "A", texto: "Biópsia excisional com margens estreitas quando factível.", correta: true, comentario: "Correta: suspeita de melanoma exige diagnóstico histológico adequado, preferencialmente excisional, para medir Breslow." },
      { letra: "B", texto: "Crioterapia imediata sem histologia.", correta: false, comentario: "Crioterapia destrói tecido e impede estadiamento histológico." },
      { letra: "C", texto: "Antibiótico tópico por 14 dias.", correta: false, comentario: "Não há padrão infeccioso." },
      { letra: "D", texto: "Raspar superficialmente apenas a parte pigmentada.", correta: false, comentario: "Biópsia superficial pode subestimar profundidade e prejudicar conduta." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["melanoma", "ABCDE", "Breslow"],
  },
];
