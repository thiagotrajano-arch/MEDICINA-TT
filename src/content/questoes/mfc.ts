import type { Questao } from "@/domain/content/types";

/**
 * Banco de questões — MFC / Metodologia Científica (OMED VI).
 * Extraídas do "MFC — Banco de 80 Questões + Gabarito Comentado" do usuário,
 * via scripts/extract-pdf.mts. Gabarito conferido contra o próprio material.
 *
 * Lote 1: Temas 01–03 (Delineamentos, Medidas de Associação, Testes
 * diagnósticos) — Q1–Q12.
 */

const SUB = {
  estudos: "mfc--epidemiologia--tipos-de-estudo",
  associacao: "mfc--epidemiologia--medidas-de-associacao",
  testes: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade",
} as const;

const FONTE = "Banco OMED MFC — 80 questões com gabarito (material do usuário)";

export const QUESTOES_MFC: Questao[] = [
  // ── TEMA 01 · DELINEAMENTOS DE ESTUDO ───────────────────────────
  {
    id: "mfc-del-01",
    subtemaId: SUB.estudos,
    disciplinaId: "mfc",
    enunciado:
      "Um estudo seleciona pacientes já diagnosticados com uma doença rara e um grupo sem a doença, investigando retrospectivamente a exposição prévia a um fator de risco. Esse delineamento é:",
    alternativas: [
      { letra: "A", texto: "Coorte prospectiva.", correta: false, comentario: "A coorte parte da EXPOSIÇÃO e observa o desfecho prospectivamente — lógica oposta." },
      { letra: "B", texto: "Caso-controle.", correta: true, comentario: "Parte do DESFECHO (doentes vs. não doentes) e investiga a exposição retrospectivamente — definição operacional do caso-controle." },
      { letra: "C", texto: "Ensaio clínico randomizado.", correta: false, comentario: "No ECR o investigador ALOCA a exposição; aqui apenas observa." },
      { letra: "D", texto: "Transversal.", correta: false, comentario: "O transversal mede exposição e desfecho no mesmo momento, sem retrospectiva." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["delineamento", "caso-controle", "epidemiologia"],
    fonte: FONTE,
  },
  {
    id: "mfc-del-02",
    subtemaId: SUB.estudos,
    disciplinaId: "mfc",
    enunciado: "Qual delineamento é mais eficiente para investigar uma doença de baixíssima prevalência na população geral?",
    alternativas: [
      { letra: "A", texto: "Estudo transversal.", correta: false, comentario: "Capturaria pouquíssimos casos numa amostra populacional." },
      { letra: "B", texto: "Coorte prospectiva.", correta: false, comentario: "Exigiria coorte enorme por muitos anos para acumular poucos eventos." },
      { letra: "C", texto: "Estudo ecológico.", correta: false, comentario: "Trabalha com dados agregados; não permite inferência individual." },
      { letra: "D", texto: "Caso-controle.", correta: true, comentario: "Para doenças raras é o mais eficiente: parte diretamente dos casos já identificados, sem acompanhar coorte enorme." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["delineamento", "doença rara", "caso-controle"],
    fonte: FONTE,
  },
  {
    id: "mfc-del-03",
    subtemaId: SUB.estudos,
    disciplinaId: "mfc",
    enunciado: "A principal propriedade da randomização em um ensaio clínico é:",
    alternativas: [
      { letra: "A", texto: "Eliminar a necessidade de grupo controle.", correta: false, comentario: "O controle continua essencial; a randomização define COMO se aloca a ele." },
      { letra: "B", texto: "Garantir cegamento automático dos pesquisadores.", correta: false, comentario: "Randomização e cegamento são procedimentos distintos e independentes." },
      { letra: "C", texto: "Tornar dispensável o cálculo de tamanho amostral.", correta: false, comentario: "O cálculo amostral permanece necessário." },
      { letra: "D", texto: "Distribuir igualmente entre os grupos os fatores de confusão conhecidos E desconhecidos.", correta: true, comentario: "É a propriedade exclusiva da randomização: distribui também os confundidores que o pesquisador nem sabe que existem — nenhum desenho observacional replica isso." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["randomização", "ensaio clínico", "confundimento"],
    fonte: FONTE,
  },
  {
    id: "mfc-del-04",
    subtemaId: SUB.estudos,
    disciplinaId: "mfc",
    enunciado: "Em um ensaio de não-inferioridade, a hipótese nula a ser rejeitada é:",
    alternativas: [
      { letra: "A", texto: "O novo tratamento é superior ao padrão.", correta: false, comentario: "Superioridade é o objetivo de outro tipo de ensaio." },
      { letra: "B", texto: "Não há diferença entre os tratamentos.", correta: false, comentario: "Essa é a hipótese nula do ensaio de superioridade clássico." },
      { letra: "C", texto: "O novo tratamento é pior que o padrão além de uma margem pré-especificada.", correta: true, comentario: "A não-inferioridade inverte a lógica: rejeitar essa nula permite concluir não-inferioridade (não superioridade)." },
      { letra: "D", texto: "O novo tratamento é idêntico ao placebo.", correta: false, comentario: "Não corresponde à estrutura de hipótese do desenho." },
    ],
    dificuldade: "avancada",
    estilo: "fixacao",
    tags: ["não-inferioridade", "hipótese nula"],
    fonte: FONTE,
  },

  // ── TEMA 02 · MEDIDAS DE ASSOCIAÇÃO ─────────────────────────────
  {
    id: "mfc-ass-05",
    subtemaId: SUB.associacao,
    disciplinaId: "mfc",
    enunciado: "Em um estudo caso-controle, a medida de associação que deve ser obrigatoriamente utilizada é:",
    alternativas: [
      { letra: "A", texto: "Risco Relativo.", correta: false, comentario: "O RR exige conhecer a incidência real — impossível no caso-controle, onde a proporção de casos é definida pelo desenho." },
      { letra: "B", texto: "Odds Ratio.", correta: true, comentario: "No caso-controle a proporção de expostos é artificial (definida pelo desenho), tornando o RR matematicamente inválido — usa-se OR." },
      { letra: "C", texto: "Hazard Ratio.", correta: false, comentario: "Exige análise de sobrevida com tempo até o evento." },
      { letra: "D", texto: "Redução Absoluta de Risco.", correta: false, comentario: "Depende de riscos absolutos, não calculáveis no caso-controle." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["odds ratio", "caso-controle"],
    fonte: FONTE,
  },
  {
    id: "mfc-ass-06",
    subtemaId: SUB.associacao,
    disciplinaId: "mfc",
    enunciado: "Um Risco Relativo de 3,0 significa que o grupo exposto tem, em relação ao não exposto:",
    alternativas: [
      { letra: "A", texto: "300% de risco a mais.", correta: false, comentario: "Pegadinha clássica: 3× o risco equivale a 200% A MAIS, não 300%." },
      { letra: "B", texto: "30% de risco a mais.", correta: false, comentario: "Corresponderia a RR = 1,3." },
      { letra: "C", texto: "Risco idêntico.", correta: false, comentario: "Risco idêntico é RR = 1,0." },
      { letra: "D", texto: "3 vezes o risco (ou seja, 200% de risco a mais).", correta: true, comentario: "RR = 3,0 → risco 3× maior; o aumento percentual é (3−1)×100 = 200%." },
    ],
    dificuldade: "intermediaria",
    estilo: "fixacao",
    tags: ["risco relativo", "interpretação"],
    fonte: FONTE,
  },
  {
    id: "mfc-ass-07",
    subtemaId: SUB.associacao,
    disciplinaId: "mfc",
    enunciado: "Um intervalo de confiança de 95% para um Odds Ratio que vai de 0,7 a 1,4 deve ser interpretado como:",
    alternativas: [
      { letra: "A", texto: "Associação protetora estatisticamente significativa.", correta: false, comentario: "Exigiria o intervalo inteiro abaixo de 1." },
      { letra: "B", texto: "Associação de risco estatisticamente significativa.", correta: false, comentario: "Exigiria o intervalo inteiro acima de 1." },
      { letra: "C", texto: "Erro de cálculo, pois o intervalo não pode conter o valor 1.", correta: false, comentario: "Pode conter 1 perfeitamente — é justamente o que indica não significância." },
      { letra: "D", texto: "Resultado não estatisticamente significativo, pois o intervalo cruza o valor nulo (1).", correta: true, comentario: "O IC cruza OR = 1 → não significativo a 5%, independentemente da tendência do ponto estimado." },
    ],
    dificuldade: "intermediaria",
    estilo: "fixacao",
    tags: ["intervalo de confiança", "odds ratio", "significância"],
    fonte: FONTE,
  },
  {
    id: "mfc-ass-08",
    subtemaId: SUB.associacao,
    disciplinaId: "mfc",
    enunciado: "O Número Necessário para Tratar (NNT) é calculado como:",
    alternativas: [
      { letra: "A", texto: "1 dividido pela Redução Absoluta de Risco.", correta: true, comentario: "NNT = 1/RAR, arredondado para o inteiro superior — quantos pacientes tratar para evitar um desfecho adverso." },
      { letra: "B", texto: "1 dividido pelo Risco Relativo.", correta: false, comentario: "O RR é uma razão; o NNT depende da diferença ABSOLUTA de risco." },
      { letra: "C", texto: "Odds Ratio multiplicado por 100.", correta: false, comentario: "Não há relação matemática desse tipo." },
      { letra: "D", texto: "Diferença entre sensibilidade e especificidade.", correta: false, comentario: "São conceitos de acurácia diagnóstica, não de efeito terapêutico." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["NNT", "redução absoluta de risco"],
    fonte: FONTE,
  },

  // ── TEMA 03 · SENSIBILIDADE E ESPECIFICIDADE ────────────────────
  {
    id: "mfc-tes-09",
    subtemaId: SUB.testes,
    disciplinaId: "mfc",
    enunciado: "A sensibilidade de um teste diagnóstico é definida como:",
    alternativas: [
      { letra: "A", texto: "Proporção de sadios corretamente identificados como negativos.", correta: false, comentario: "Essa é a definição de especificidade." },
      { letra: "B", texto: "Proporção de doentes corretamente identificados como positivos.", correta: true, comentario: "Sensibilidade = a/(a+c): entre os verdadeiramente doentes, quantos o teste 'pega'." },
      { letra: "C", texto: "Probabilidade de doença dado um resultado positivo.", correta: false, comentario: "Essa é a definição de valor preditivo positivo (VPP)." },
      { letra: "D", texto: "Probabilidade de ausência de doença dado um resultado negativo.", correta: false, comentario: "Essa é a definição de valor preditivo negativo (VPN)." },
    ],
    dificuldade: "fixacao",
    estilo: "fixacao",
    tags: ["sensibilidade", "acurácia diagnóstica"],
    fonte: FONTE,
  },
  {
    id: "mfc-tes-10",
    subtemaId: SUB.testes,
    disciplinaId: "mfc",
    enunciado: "Diferente da sensibilidade e da especificidade, os valores preditivos (VPP e VPN) de um teste:",
    alternativas: [
      { letra: "A", texto: "Variam conforme a prevalência da doença na população testada.", correta: true, comentario: "VPP e VPN dependem da prevalência; sensibilidade e especificidade são propriedades intrínsecas do teste." },
      { letra: "B", texto: "São sempre constantes, independente da população testada.", correta: false, comentario: "É justamente o contrário — mudam com a prevalência." },
      { letra: "C", texto: "Só podem ser calculados em ensaios clínicos randomizados.", correta: false, comentario: "São calculáveis em qualquer estudo de acurácia diagnóstica." },
      { letra: "D", texto: "Substituem completamente a necessidade de sensibilidade e especificidade.", correta: false, comentario: "São complementares, não substitutos." },
    ],
    dificuldade: "intermediaria",
    estilo: "fixacao",
    tags: ["valor preditivo", "prevalência"],
    fonte: FONTE,
  },
  {
    id: "mfc-tes-11",
    subtemaId: SUB.testes,
    disciplinaId: "mfc",
    enunciado: "Um teste com altíssima sensibilidade, quando NEGATIVO, é mais útil para:",
    alternativas: [
      { letra: "A", texto: "Excluir a doença (rule out).", correta: true, comentario: "Regra SnNOUT: teste muito Sensível, quando Negativo, exclui (rules OUT) a doença — poucos falsos-negativos." },
      { letra: "B", texto: "Confirmar a doença (rule in).", correta: false, comentario: "Confirmar exige alta ESPECIFICIDADE com teste positivo (SpPIN)." },
      { letra: "C", texto: "Determinar o prognóstico.", correta: false, comentario: "Sensibilidade é propriedade diagnóstica, não prognóstica." },
      { letra: "D", texto: "Substituir o padrão-ouro definitivamente.", correta: false, comentario: "Nenhum teste de triagem substitui o padrão-ouro." },
    ],
    dificuldade: "intermediaria",
    estilo: "fixacao",
    tags: ["SnNOUT", "sensibilidade", "rastreamento"],
    fonte: FONTE,
  },
  {
    id: "mfc-tes-12",
    subtemaId: SUB.testes,
    disciplinaId: "mfc",
    enunciado: "Numa curva ROC, uma área sob a curva (AUC) de 0,5 indica que o teste:",
    alternativas: [
      { letra: "A", texto: "Tem discriminação perfeita entre doentes e sadios.", correta: false, comentario: "Discriminação perfeita corresponde a AUC = 1,0." },
      { letra: "B", texto: "É equivalente a um sorteio aleatório, sem capacidade discriminativa real.", correta: true, comentario: "AUC = 0,5 é a diagonal da ROC — equivale a jogar uma moeda; o teste não discrimina." },
      { letra: "C", texto: "Tem sensibilidade de 100%.", correta: false, comentario: "Não se deduz sensibilidade a partir da AUC isolada." },
      { letra: "D", texto: "Tem especificidade de 100%.", correta: false, comentario: "Não se deduz especificidade a partir da AUC isolada." },
    ],
    dificuldade: "intermediaria",
    estilo: "fixacao",
    tags: ["curva ROC", "AUC"],
    fonte: FONTE,
  },
];
