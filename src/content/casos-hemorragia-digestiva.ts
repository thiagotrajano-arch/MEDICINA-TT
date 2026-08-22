import type { CasoClinico } from "@/domain/content/types";

const REFERENCIAS = [
  "ESGE Guideline — Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: update 2021: https://www.esge.com/endoscopic-diagnosis-and-management-of-nonvariceal-upper-gastrointestinal-hemorrhage-esge-update-2021",
  "Ministério da Saúde/SAMU 192 — BC21 HDA: https://www.gov.br/saude/pt-br/composicao/saes/samu-192/publicacoes/protocolo-de-suporte-basico-de-vida-1-2.pdf",
];

export const CASOS_HEMORRAGIA_DIGESTIVA: CasoClinico[] = [
  {
    id: "caso-gastro-hemorragia-01",
    disciplinaId: "gastro",
    subtemaId: "gastro--hemorragia-digestiva--diagnostico-e-conduta",
    titulo: "Melena, instabilidade e úlcera sangrante",
    resumo: "Da avaliação inicial à hemostasia e ao plano diante de ressangramento após úlcera péptica.",
    dificuldade: "avancada",
    tags: ["hemorragia digestiva alta", "úlcera péptica", "endoscopia", "ressangramento"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Apresentação",
        corpo: "Homem de 59 anos chega com dois episódios de melena e tontura. Usa ibuprofeno quase diariamente por dor lombar. Está pálido, sudorético e relata fraqueza intensa.",
        pergunta: "Qual é a prioridade antes de definir a etiologia?",
        resposta: "Reconhecer a possível hemorragia digestiva alta e avaliar imediatamente estabilidade hemodinâmica, via aérea, perfusão, acesso venoso e necessidade de ressuscitação. A investigação etiológica não deve atrasar estabilização e monitorização.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Estratificação inicial",
        corpo: "PA 92 × 58 mmHg, FC 118 bpm, extremidades frias. Hemoglobina 8,7 g/dL, ureia elevada e creatinina discretamente aumentada. Após medidas iniciais, mantém suspeita de sangramento ativo.",
        pergunta: "Como organizar o próximo passo?",
        resposta: "Após ressuscitação e avaliação clínica, calcular um escore pré-endoscópico como o Glasgow-Blatchford ajuda a estratificar risco. Pacientes que não são de muito baixo risco devem permanecer em avaliação hospitalar e seguir para endoscopia alta precoce, idealmente em até 24 horas após estabilização.",
      },
      {
        tipo: "laboratorio",
        titulo: "Endoscopia",
        corpo: "A endoscopia mostra úlcera duodenal com sangramento em jato. Não há sinais de perfuração. O endoscopista dispõe de injeção e métodos térmico e mecânico.",
        pergunta: "Qual hemostasia é mais adequada?",
        resposta: "Sangramento ativo de úlcera deve receber terapia combinada: epinefrina associada a uma segunda modalidade, como terapia térmica de contato ou método mecânico. A injeção isolada não é a estratégia recomendada.",
      },
      {
        tipo: "conduta",
        titulo: "Pós-hemostasia",
        corpo: "O sangramento foi controlado. O paciente permanece internado para observação e recebe tratamento antisecretor conforme protocolo institucional.",
        pergunta: "O que deve ser revisto para reduzir recorrência?",
        resposta: "Revisar e suspender o uso desnecessário de anti-inflamatório, investigar e tratar causas da úlcera conforme avaliação clínica, manter acompanhamento e explicar sinais de alarme. O tratamento pós-endoscopia e a vigilância devem seguir o protocolo local e a diretriz vigente.",
      },
      {
        tipo: "desfecho",
        titulo: "Ressangramento",
        corpo: "Três dias depois, o paciente apresenta nova melena, taquicardia e queda da pressão. A nova endoscopia confirma ressangramento e a segunda tentativa de hemostasia falha.",
        pergunta: "Qual é a estratégia de resgate?",
        resposta: "Após falha da segunda tentativa endoscópica, deve-se considerar embolização angiográfica transcateter. Cirurgia é considerada quando a embolização não está disponível ou após falha do tratamento radiológico, sempre em paralelo à ressuscitação e à avaliação multidisciplinar.",
      },
    ],
    discussao: "O caso integra quatro decisões: estabilizar antes de investigar; usar escore pré-endoscópico sem substituir julgamento clínico; tratar sangramento ativo com terapia endoscópica combinada; e escalar para embolização ou cirurgia quando o ressangramento persiste apesar de nova hemostasia. A diretriz não transforma escore ou hemoglobina isolados em autorização para alta.",
    referencias: REFERENCIAS,
  },
];
