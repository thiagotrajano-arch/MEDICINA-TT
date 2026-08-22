import type { Questao } from "@/domain/content/types";

const SUBTEMA = "neuro--meningites-e-encefalites--diagnostico-e-conduta";
const FONTE =
  "WHO guidelines on meningitis diagnosis, treatment and care (2025): https://www.who.int/publications/i/item/9789240108042 (acesso em 2026-08-22)";

export const QUESTOES_MENINGITES_ENCEFALITES: Questao[] = [
  {
    id: "neuro-meningite-001",
    subtemaId: SUBTEMA,
    disciplinaId: "neuro",
    enunciado: "Paciente com febre, cefaleia, rigidez de nuca e alteração do estado mental tem suspeita de meningite bacteriana. A punção lombar vai demorar por indisponibilidade temporária do serviço. Qual conduta é mais segura?",
    alternativas: [
      { letra: "A", texto: "Iniciar antimicrobiano empírico assim que possível; a punção lombar deve ser feita quando for segura, mas não pode atrasar o tratamento da suspeita bacteriana.", correta: true, comentario: "Correta. A OMS considera meningite uma emergência e orienta que a punção não atrase a primeira dose quando há suspeita bacteriana." },
      { letra: "B", texto: "Aguardar o líquor antes de qualquer antibiótico, mesmo que o paciente piore.", correta: false, comentario: "Aguardar a punção pode atrasar tratamento efetivo e aumentar risco de desfecho ruim." },
      { letra: "C", texto: "Dar apenas analgésico e reavaliar em 24 horas, pois rigidez de nuca não é sinal de gravidade.", correta: false, comentario: "O conjunto clínico exige atendimento urgente, investigação e tratamento apropriados." },
      { letra: "D", texto: "Descartar meningite porque a tríade clássica não aparece completa em todos os casos.", correta: false, comentario: "A ausência de um sinal clássico não exclui a doença; a suspeita clínica orienta a urgência." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["meningite", "punção lombar", "antimicrobiano", "emergência"],
  },
  {
    id: "neuro-meningite-002",
    subtemaId: SUBTEMA,
    disciplinaId: "neuro",
    enunciado: "Na investigação de meningite, qual é o papel combinado do líquor e do sangue?",
    alternativas: [
      { letra: "A", texto: "Líquor e sangue podem ser usados para identificar o agente, orientar tratamento e, no caso bacteriano, apoiar o teste de susceptibilidade antimicrobiana.", correta: true, comentario: "Correta. A OMS destaca a análise do líquor e exames sanguíneos para diagnóstico etiológico e orientação terapêutica." },
      { letra: "B", texto: "A cultura do líquor é desnecessária se o paciente estiver febril.", correta: false, comentario: "A febre não define o agente nem substitui a investigação microbiológica quando possível." },
      { letra: "C", texto: "Apenas a imagem cerebral confirma meningite e o líquor não tem utilidade.", correta: false, comentario: "O líquor é central na investigação; imagem tem indicações específicas e não substitui a análise do LCR." },
      { letra: "D", texto: "O sangue serve apenas para medir hemoglobina e não contribui para etiologia.", correta: false, comentario: "Exames sanguíneos podem contribuir para identificação do agente e decisões de tratamento." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["líquor", "hemocultura", "diagnóstico etiológico"],
  },
  {
    id: "neuro-meningite-003",
    subtemaId: SUBTEMA,
    disciplinaId: "neuro",
    enunciado: "Após sobreviver a meningite bacteriana, um paciente pergunta por que precisa de acompanhamento depois da alta. Qual orientação é mais adequada?",
    alternativas: [
      { letra: "A", texto: "O seguimento deve procurar complicações neurológicas, auditivas, cognitivas e comportamentais, pois sequelas podem persistir mesmo após a cura da infecção aguda.", correta: true, comentario: "Correta. A OMS ressalta o cuidado de longo prazo porque uma parcela relevante dos sobreviventes desenvolve complicações." },
      { letra: "B", texto: "A alta encerra o cuidado porque meningite nunca causa sequelas tardias.", correta: false, comentario: "Meningite pode deixar sequelas, incluindo perda auditiva e alterações neurológicas ou cognitivas." },
      { letra: "C", texto: "Somente o hemograma anual é necessário, sem avaliação funcional.", correta: false, comentario: "A avaliação deve ser orientada por possíveis sequelas, não apenas por hemograma." },
      { letra: "D", texto: "Acompanhamento só é necessário em pacientes que tiveram exantema.", correta: false, comentario: "O risco de sequelas não depende exclusivamente da presença de exantema." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["meningite", "sequelas", "reabilitação", "audição"],
  },
];
