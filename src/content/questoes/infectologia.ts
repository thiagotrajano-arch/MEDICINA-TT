import type { Questao } from "@/domain/content/types";

/**
 * Banco de questões — Infectologia (OMED VI).
 * Extraídas do "Infectologia OMED · Simulado 160 Questões (Gabarito
 * Comentado)" do usuário, via scripts/extract-pdf.mts. Conferidas com o
 * material e com as diretrizes do MS.
 *
 * Lote 1: Temas 01–03 (Tuberculose, Meningites, Sífilis) — Q1–Q13.
 */

const SUB = {
  tbDx: "inf--tuberculose--diagnostico-e-tratamento",
  tbLatente: "inf--tuberculose--tb-latente",
  meningite: "inf--meningites--bacteriana-vs-viral",
  sifilis: "inf--infeccoes-sexualmente-transmissiveis--sifilis",
} as const;

const FONTE = "Simulado OMED Infectologia — 160 questões comentadas (material do usuário)";

export const QUESTOES_INF: Questao[] = [
  // ── TUBERCULOSE ─────────────────────────────────────────────────
  {
    id: "inf-tb-001",
    subtemaId: SUB.tbDx,
    disciplinaId: "inf",
    enunciado:
      "O foco de Ghon, associado à linfadenopatia hilar satélite, constitui o complexo primário de Ranke na tuberculose. Esse achado é típico de qual forma da doença?",
    alternativas: [
      { letra: "A", texto: "TB pós-primária (reativação), tipicamente em ápices pulmonares.", correta: false, comentario: "A reativação cursa com cavitações apicais, sem complexo primário." },
      { letra: "B", texto: "TB primária, mais comum em crianças, após o primeiro contato com o bacilo.", correta: true, comentario: "Foco de Ghon (lesão parenquimatosa) + linfonodo hilar = complexo de Ranke, marca da primoinfecção." },
      { letra: "C", texto: "TB miliar, por disseminação hematogênica maciça.", correta: false, comentario: "A miliar mostra micronódulos difusos ('grão de milho'), não complexo primário." },
      { letra: "D", texto: "TB pleural, por contiguidade de um foco subpleural.", correta: false, comentario: "Cursa com derrame pleural exsudativo, não com esse complexo." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["tuberculose", "complexo de Ranke", "TB primária"],
    fonte: FONTE,
  },
  {
    id: "inf-tb-002",
    subtemaId: SUB.tbDx,
    disciplinaId: "inf",
    enunciado:
      "Segundo o Ministério da Saúde, qual exame é preconizado como teste de escolha inicial para todo sintomático respiratório, substituindo a baciloscopia como primeira linha onde disponível?",
    alternativas: [
      { letra: "A", texto: "Cultura em meio líquido (MGIT).", correta: false, comentario: "É o padrão-ouro, mas demorada — não serve como triagem inicial." },
      { letra: "B", texto: "PPD (prova tuberculínica).", correta: false, comentario: "Avalia infecção latente, não doença ativa." },
      { letra: "C", texto: "TRM-TB (teste rápido molecular, GeneXpert).", correta: true, comentario: "O MS preconiza o TRM-TB como primeira linha: detecta o DNA do bacilo em ~2h e ainda identifica resistência à rifampicina." },
      { letra: "D", texto: "IGRA (interferon-gamma release assay).", correta: false, comentario: "Também avalia infecção latente, não doença ativa." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    tags: ["tuberculose", "TRM-TB", "GeneXpert"],
    fonte: FONTE,
  },
  {
    id: "inf-tb-003",
    subtemaId: SUB.tbDx,
    disciplinaId: "inf",
    enunciado:
      "Qual a duração total recomendada do tratamento da tuberculose meningoencefálica e osteoarticular com o esquema básico (RHZE/RH)?",
    alternativas: [
      { letra: "A", texto: "6 meses, igual à forma pulmonar.", correta: false, comentario: "6 meses é a duração da TB pulmonar; essas formas exigem tratamento mais longo." },
      { letra: "B", texto: "9 meses.", correta: false, comentario: "Não é a duração preconizada pelo MS para essas formas." },
      { letra: "C", texto: "12 meses, com fase de manutenção estendida.", correta: true, comentario: "TB meningoencefálica e osteoarticular: 12 meses (2 RHZE + 10 RH). Na meníngea associa-se corticoide." },
      { letra: "D", texto: "18 meses, exigindo fármacos de segunda linha.", correta: false, comentario: "Segunda linha só na resistência; o esquema básico é mantido." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["tuberculose", "TB meningoencefálica", "duração"],
    fonte: FONTE,
  },
  {
    id: "inf-tb-004",
    subtemaId: SUB.tbDx,
    disciplinaId: "inf",
    enunciado:
      "Paciente em uso do esquema RHZE evolui com discromatopsia (perda da percepção vermelho-verde) e redução da acuidade visual. Qual fármaco é o responsável mais provável?",
    alternativas: [
      { letra: "A", texto: "Rifampicina.", correta: false, comentario: "Causa coloração alaranjada de secreções e hepatotoxicidade, não neurite óptica." },
      { letra: "B", texto: "Isoniazida.", correta: false, comentario: "Classicamente causa neuropatia PERIFÉRICA (prevenida com piridoxina)." },
      { letra: "C", texto: "Pirazinamida.", correta: false, comentario: "Associa-se a hiperuricemia/artralgia e hepatotoxicidade." },
      { letra: "D", texto: "Etambutol.", correta: true, comentario: "O etambutol causa neurite óptica dose-dependente: discromatopsia vermelho-verde e queda da acuidade visual." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["tuberculose", "etambutol", "neurite óptica"],
    fonte: FONTE,
  },
  {
    id: "inf-tb-005",
    subtemaId: SUB.tbLatente,
    disciplinaId: "inf",
    enunciado:
      "No tratamento da infecção latente pelo M. tuberculosis (ILTB/TPT), qual esquema é hoje considerado preferencial por melhor adesão?",
    alternativas: [
      { letra: "A", texto: "Isoniazida isolada por 6–9 meses.", correta: false, comentario: "Esquema clássico, mas longo — adesão bem pior." },
      { letra: "B", texto: "Rifampicina isolada por 4 meses.", correta: false, comentario: "É alternativa válida, porém o 3HP é o preferencial pela posologia semanal." },
      { letra: "C", texto: "3HP: isoniazida + rifapentina semanal, por 3 meses.", correta: true, comentario: "Apenas 12 doses semanais — curso curto com adesão muito superior, hoje preferencial." },
      { letra: "D", texto: "RHZE por 2 meses seguido de RH por 1 mês.", correta: false, comentario: "Esse é esquema de doença ATIVA, não de infecção latente." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["ILTB", "3HP", "rifapentina"],
    fonte: FONTE,
  },
  {
    id: "inf-tb-006",
    subtemaId: SUB.tbDx,
    disciplinaId: "inf",
    enunciado:
      "Paciente em tratamento de TB pulmonar apresenta urina e suor com coloração alaranjada após início do RHZE. Qual a conduta?",
    alternativas: [
      { letra: "A", texto: "Suspender o esquema e investigar hepatotoxicidade.", correta: false, comentario: "Não há relação com hepatotoxicidade; suspender por isso comprometeria o tratamento." },
      { letra: "B", texto: "Reduzir a dose de rifampicina pela metade.", correta: false, comentario: "Reduzir dose favorece resistência, sem qualquer benefício." },
      { letra: "C", texto: "Tranquilizar o paciente: é efeito benigno da rifampicina, sem necessidade de suspender.", correta: true, comentario: "A rifampicina cora secreções de laranja-avermelhado — efeito esperado e inofensivo; orientar evita abandono." },
      { letra: "D", texto: "Substituir a rifampicina por uma quinolona.", correta: false, comentario: "Trocar droga de primeira linha por efeito benigno é inadequado." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    tags: ["rifampicina", "efeito adverso", "adesão"],
    fonte: FONTE,
  },

  // ── MENINGITES ──────────────────────────────────────────────────
  {
    id: "inf-men-007",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado:
      "Qual a principal indicação de tomografia de crânio ANTES da punção lombar na suspeita de meningite bacteriana?",
    alternativas: [
      { letra: "A", texto: "Todo paciente, sem exceção.", correta: false, comentario: "TC universal atrasa o antibiótico e piora o desfecho — não se faz de rotina." },
      { letra: "B", texto: "Apenas em pacientes acima de 60 anos.", correta: false, comentario: "A idade isolada não é o critério." },
      { letra: "C", texto: "Imunossupressão, lesão de SNC prévia, convulsão recente, papiledema, déficit focal ou rebaixamento importante da consciência.", correta: true, comentario: "São os preditores de lesão com efeito de massa (risco de herniação). Fora deles, punciona-se direto. Se a TC for necessária, colher hemocultura e iniciar ATB ANTES do exame." },
      { letra: "D", texto: "Apenas quando há suspeita de meningite viral.", correta: false, comentario: "A TC não diferencia meningite viral de bacteriana." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["meningite", "punção lombar", "TC de crânio"],
    fonte: FONTE,
  },
  {
    id: "inf-men-008",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado:
      "Em qual situação a Listeria monocytogenes deve ser obrigatoriamente coberta no esquema empírico da meningite bacteriana?",
    alternativas: [
      { letra: "A", texto: "Crianças entre 1 e 5 anos.", correta: false, comentario: "Nessa faixa predominam meningococo e pneumococo." },
      { letra: "B", texto: "Pacientes acima de 50 anos, gestantes, etilistas ou imunossuprimidos.", correta: true, comentario: "São os grupos de risco para Listeria → acrescentar AMPICILINA ao esquema (a cefalosporina de 3ª geração não cobre Listeria)." },
      { letra: "C", texto: "Apenas em recém-nascidos.", correta: false, comentario: "O RN é grupo de risco, mas não o único — a cobertura vai além dele." },
      { letra: "D", texto: "Não é necessário cobrir Listeria em nenhuma faixa etária.", correta: false, comentario: "Deixar Listeria descoberta nos grupos de risco é erro grave." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["meningite", "Listeria", "ampicilina"],
    fonte: FONTE,
  },
  {
    id: "inf-men-009",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado:
      "A dexametasona reduz sequelas neurológicas (especialmente perda auditiva) na meningite bacteriana. Qual o momento ideal de administração?",
    alternativas: [
      { letra: "A", texto: "Apenas após a cultura do líquor identificar o agente.", correta: false, comentario: "Esperar a cultura perde completamente a janela terapêutica." },
      { letra: "B", texto: "24 horas após o antibiótico, quando a lise bacteriana já ocorreu.", correta: false, comentario: "Tarde demais: o objetivo é justamente conter a inflamação DA lise." },
      { letra: "C", texto: "Junto ou pouco antes da primeira dose do antibiótico.", correta: true, comentario: "O corticoide precisa estar presente quando a lise bacteriana liberar componentes inflamatórios — depois disso perde o benefício." },
      { letra: "D", texto: "Somente na meningite meningocócica confirmada.", correta: false, comentario: "O maior benefício é justamente na pneumocócica." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["meningite", "dexametasona"],
    fonte: FONTE,
  },
  {
    id: "inf-men-010",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado: "Sobre a quimioprofilaxia de contatos próximos na meningite bacteriana, assinale a correta:",
    alternativas: [
      { letra: "A", texto: "É indicada de rotina tanto para meningococo quanto para pneumococo.", correta: false, comentario: "Não há indicação de rotina no pneumococo." },
      { letra: "B", texto: "Indicada na doença meningocócica (rifampicina 600 mg 12/12h por 2 dias no adulto) e seletivamente no Hib, mas não é rotina no pneumococo.", correta: true, comentario: "Meningococo e Hib têm transmissão por contato próximo prolongado; o pneumococo não justifica quimioprofilaxia de contatos." },
      { letra: "C", texto: "Indicada apenas se o caso índice evoluir para óbito.", correta: false, comentario: "A indicação independe do desfecho do caso índice." },
      { letra: "D", texto: "Feita exclusivamente com ceftriaxona IM em todos os contatos.", correta: false, comentario: "A ceftriaxona é alternativa (ex.: gestantes); a rifampicina é a opção padrão." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["meningite", "quimioprofilaxia", "rifampicina"],
    fonte: FONTE,
  },
  {
    id: "inf-men-011",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado:
      "Qual a principal sequela da meningite bacteriana (sobretudo pneumocócica) que justifica audiometria após a alta?",
    alternativas: [
      { letra: "A", texto: "Perda auditiva neurossensorial.", correta: true, comentario: "É a sequela mais frequente (inflamação coclear/VIII par) — daí a audiometria de rotina após a alta e o uso precoce de dexametasona." },
      { letra: "B", texto: "Cegueira cortical.", correta: false, comentario: "Possível, porém rara." },
      { letra: "C", texto: "Paralisia facial periférica bilateral.", correta: false, comentario: "Não é a sequela característica." },
      { letra: "D", texto: "Anosmia permanente.", correta: false, comentario: "Não é sequela típica de meningite bacteriana." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["meningite", "sequela", "perda auditiva"],
    fonte: FONTE,
  },
  {
    id: "inf-men-012",
    subtemaId: SUB.meningite,
    disciplinaId: "inf",
    enunciado: "Sobre os sinais de Kernig e Brudzinski na suspeita de meningite, qual afirmativa está correta?",
    alternativas: [
      { letra: "A", texto: "Têm alta sensibilidade isolada; a ausência de ambos exclui meningite com segurança.", correta: false, comentario: "Perigoso: a ausência NÃO exclui meningite." },
      { letra: "B", texto: "Têm sensibilidade baixa isoladamente; a ausência não exclui meningite.", correta: true, comentario: "A sensibilidade é baixa (~5–30%) — a suspeita clínica manda puncionar mesmo com esses sinais negativos." },
      { letra: "C", texto: "São específicos apenas para meningite viral.", correta: false, comentario: "Refletem irritação meníngea de qualquer etiologia." },
      { letra: "D", texto: "Devem substituir a punção lombar quando positivos.", correta: false, comentario: "Nada substitui a punção — é ela que define etiologia e conduta." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["meningite", "Kernig", "Brudzinski", "semiologia"],
    fonte: FONTE,
  },

  // ── SÍFILIS ─────────────────────────────────────────────────────
  {
    id: "inf-sif-013",
    subtemaId: SUB.sifilis,
    disciplinaId: "inf",
    enunciado: "Qual característica diferencia classicamente o cancro duro (sífilis primária) do cancro mole (H. ducreyi)?",
    alternativas: [
      { letra: "A", texto: "O cancro duro é doloroso e o cancro mole é indolor.", correta: false, comentario: "Está invertido." },
      { letra: "B", texto: "O cancro duro é indolor e o cancro mole é doloroso.", correta: true, comentario: "Cancro duro (T. pallidum): úlcera única, indolor, base endurecida, fundo limpo. Cancro mole (H. ducreyi): múltiplas, dolorosas, fundo sujo." },
      { letra: "C", texto: "Apenas o cancro mole apresenta adenopatia satélite.", correta: false, comentario: "Ambos cursam com adenopatia; no cancro mole ela supura (bubão)." },
      { letra: "D", texto: "O cancro duro é sempre múltiplo.", correta: false, comentario: "Classicamente é lesão ÚNICA." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["sífilis", "cancro duro", "cancro mole"],
    fonte: FONTE,
  },
];
