import type { Questao } from "@/domain/content/types";

export const QUESTOES_ONCO: Questao[] = [
  {
    id: "onco-001",
    subtemaId: "onco--emergencias-oncologicas--diagnostico-e-conduta",
    disciplinaId: "onco",
    enunciado: "Paciente em quimioterapia há 8 dias chega com febre de 38,6 °C e neutrófilos de 300/mm³, sem foco claro. Qual conduta inicial é mais adequada?",
    alternativas: [
      { letra: "A", texto: "Aguardar cultura positiva antes de antibiótico.", correta: false, comentario: "A cultura pode demorar e ser negativa; atraso em neutropenia febril aumenta mortalidade." },
      { letra: "B", texto: "Coletar culturas e iniciar antibiótico antipseudomonas imediatamente.", correta: true, comentario: "Correta: febre com neutropenia profunda é emergência infecciosa e exige antibiótico empírico amplo com cobertura antipseudomonas." },
      { letra: "C", texto: "Prescrever antitérmico e reavaliar em 48 horas.", correta: false, comentario: "Antitérmico isolado mascara evolução e não trata a bacteremia potencial." },
      { letra: "D", texto: "Iniciar apenas antiviral, pois a neutropenia sugere etiologia viral.", correta: false, comentario: "Vírus podem ocorrer, mas a ameaça imediata é bacteriana; antiviral é dirigido por suspeita específica." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["neutropenia febril", "emergência oncológica", "antibiótico"],
  },
  {
    id: "onco-002",
    subtemaId: "onco--cancer-de-pulmao--diagnostico-e-conduta",
    disciplinaId: "onco",
    enunciado: "Paciente com adenocarcinoma de pulmão metastático recém-diagnosticado tem bom performance status. Antes de escolher a primeira linha sistêmica, qual informação é indispensável?",
    alternativas: [
      { letra: "A", texto: "Apenas o tamanho do tumor primário.", correta: false, comentario: "Tamanho importa no estadiamento, mas não basta para selecionar terapia sistêmica metastática." },
      { letra: "B", texto: "Somente a presença de tosse ou hemoptise.", correta: false, comentario: "Sintomas orientam suporte, não definem imunoterapia ou terapia-alvo." },
      { letra: "C", texto: "Perfil molecular acionável e expressão de PD-L1.", correta: true, comentario: "Correta: biomarcadores e PD-L1 podem deslocar quimioterapia para terapia-alvo ou imunoterapia." },
      { letra: "D", texto: "Dosagem seriada de CEA para decidir quimioterapia.", correta: false, comentario: "CEA não substitui histologia, estadiamento nem biomarcadores terapêuticos." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["câncer de pulmão", "biomarcadores", "PD-L1"],
  },
  {
    id: "onco-003",
    subtemaId: "onco--principios-de-oncologia--estadiamento-e-tratamento",
    disciplinaId: "onco",
    enunciado: "Em oncologia, qual é o papel central do estadiamento TNM antes do tratamento?",
    alternativas: [
      { letra: "A", texto: "Definir extensão anatômica e orientar intenção terapêutica.", correta: true, comentario: "Correta: TNM organiza extensão e prognóstico, separando doença localizada, regional e metastática." },
      { letra: "B", texto: "Substituir completamente a biópsia.", correta: false, comentario: "Biópsia continua essencial para confirmar histologia." },
      { letra: "C", texto: "Determinar sozinho o esquema de imunoterapia.", correta: false, comentario: "Imunoterapia depende também de biomarcadores e contexto tumoral." },
      { letra: "D", texto: "Confirmar resposta ao tratamento sem exames posteriores.", correta: false, comentario: "Resposta requer reavaliação clínica, imagem e critérios específicos." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["TNM", "estadiamento", "oncologia"],
  },
  {
    id: "onco-004",
    subtemaId: "onco--farmacologia-oncologica-e-imunoterapia--principios-praticos",
    disciplinaId: "onco",
    enunciado: "Paciente em uso de anti-PD-1 desenvolve diarreia persistente e dor abdominal, sem patógeno identificado. Qual hipótese deve ser lembrada?",
    alternativas: [
      { letra: "A", texto: "Efeito esperado que nunca exige suspensão.", correta: false, comentario: "Eventos imunes podem ser graves e exigem graduação, suspensão temporária e corticoide conforme intensidade." },
      { letra: "B", texto: "Síndrome de lise tumoral intestinal.", correta: false, comentario: "Lise tumoral cursa com distúrbios metabólicos, não com colite isolada típica." },
      { letra: "C", texto: "Progressão tumoral como única possibilidade.", correta: false, comentario: "Progressão entra no diferencial, mas não é a única hipótese diante de imunoterapia." },
      { letra: "D", texto: "Colite imunomediada por checkpoint inhibitor.", correta: true, comentario: "Correta: checkpoint inhibitors podem causar colite autoimune, ponto clássico de farmacovigilância oncológica." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["imunoterapia", "anti-PD-1", "colite imunomediada"],
  },
];
