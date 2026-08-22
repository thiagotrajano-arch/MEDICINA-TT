import type { Questao } from "@/domain/content/types";

const SUBTEMA = "gastro--doencas-inflamatorias-intestinais--diagnostico-e-conduta";
const FONTE =
  "ACG Clinical Guideline Update: Ulcerative Colitis in Adults (2025), resumo oficial ACG: https://gi.org/journals-publications/ebgi/alkazzi_aug2025/ (acesso em 2026-08-22)";

export const QUESTOES_DOENCAS_INFLAMATORIAS_INTESTINAIS: Questao[] = [
  {
    id: "gastro-dii-001",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Paciente com diarreia sanguinolenta, urgência evacuatória e suspeita de retocolite ulcerativa está em investigação inicial. Qual estratégia é mais adequada?",
    alternativas: [
      { letra: "A", texto: "Excluir causas infecciosas, especialmente Clostridioides difficile, e confirmar a doença com avaliação endoscópica e biópsias de áreas afetadas e não afetadas.", correta: true, comentario: "Correta. A diretriz recomenda excluir infecção na apresentação e integrar colonoscopia, íleo terminal e biópsias para confirmação diagnóstica." },
      { letra: "B", texto: "Confirmar o diagnóstico exclusivamente por painel sorológico, sem necessidade de endoscopia.", correta: false, comentario: "A diretriz recomenda contra testes sorológicos para estabelecer ou excluir o diagnóstico de retocolite ulcerativa." },
      { letra: "C", texto: "Iniciar imunossupressão antes de colher fezes, pois infecção e doença inflamatória são indistinguíveis.", correta: false, comentario: "A investigação deve excluir infecção e orientar o tratamento; imunossupressão empírica sem avaliação pode causar dano." },
      { letra: "D", texto: "Solicitar apenas hemograma, pois marcadores inflamatórios não ajudam no acompanhamento.", correta: false, comentario: "CRP, calprotectina fecal, endoscopia e outros dados podem contribuir para avaliação e monitoramento." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["retocolite ulcerativa", "Clostridioides difficile", "colonoscopia", "biópsia"],
  },
  {
    id: "gastro-dii-002",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Em paciente com retocolite ulcerativa em tratamento, qual é um alvo de acompanhamento coerente com a abordagem treat-to-target atual?",
    alternativas: [
      { letra: "A", texto: "Apenas desaparecer a dor, sem necessidade de avaliar atividade endoscópica ou marcadores de inflamação.", correta: false, comentario: "Melhora sintomática é importante, mas não resume o alvo terapêutico nem exclui inflamação persistente." },
      { letra: "B", texto: "Remissão sem corticoide e melhora endoscópica, com uso de marcadores como calprotectina fecal para apoiar o monitoramento.", correta: true, comentario: "Correta. A atualização enfatiza remissão sustentada sem corticoide, melhora endoscópica e monitoramento integrado." },
      { letra: "C", texto: "Manter corticoide indefinidamente porque remissão clínica e endoscópica são incompatíveis.", correta: false, comentario: "Corticoide é estratégia de indução em contextos selecionados, não alvo de manutenção indefinida." },
      { letra: "D", texto: "Usar somente anticorpos séricos para acompanhar atividade, pois a calprotectina não tem utilidade.", correta: false, comentario: "A diretriz recomenda contra sorologia para prognóstico e reconhece utilidade de calprotectina no acompanhamento." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["treat-to-target", "calprotectina fecal", "remissão endoscópica"],
  },
  {
    id: "gastro-dii-003",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Paciente internado com colite ulcerativa aguda grave apresenta diarreia sanguinolenta intensa. Qual conjunto inicial é compatível com a diretriz atual?",
    alternativas: [
      { letra: "A", texto: "Testar C. difficile, iniciar corticoide intravenoso quando indicado, fazer profilaxia farmacológica de tromboembolismo e monitorar resposta para decidir resgate.", correta: true, comentario: "Correta. A atualização destaca teste para C. difficile na apresentação, corticoide IV, profilaxia de TVP e reavaliação antes da terapia de resgate." },
      { letra: "B", texto: "Evitar profilaxia de tromboembolismo porque todo sangramento intestinal a contraindica automaticamente.", correta: false, comentario: "Na colite ulcerativa aguda grave, a diretriz destaca profilaxia farmacológica; a decisão deve considerar o cenário clínico, não uma regra automática." },
      { letra: "C", texto: "Manter o paciente sem tratamento por uma semana para observar a evolução espontânea.", correta: false, comentario: "A gravidade exige tratamento e monitoramento hospitalar estruturados, não observação passiva." },
      { letra: "D", texto: "Usar apenas antibiótico de amplo espectro como tratamento padrão de toda colite ulcerativa aguda grave.", correta: false, comentario: "Antibiótico não substitui a abordagem padrão com avaliação infecciosa, corticoide IV e decisão de resgate quando necessário." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["colite ulcerativa aguda grave", "corticoide intravenoso", "tromboembolismo"],
  },
];
