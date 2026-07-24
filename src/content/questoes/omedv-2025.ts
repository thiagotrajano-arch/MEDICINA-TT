import type { Questao } from "@/domain/content/types";

/**
 * Questões de múltipla escolha da prova oficial V OMED — Ciclo Clínico,
 * 2ª fase (2025), extraídas de provas-oficiais-omed/omed5-2025-2fase-clinico.pdf
 * com gabarito oficial (omed5-2025-gabarito-2fase-clinico.pdf). O gabarito só
 * traz a letra correta, sem justificativa por alternativa — os comentários de
 * cada distrator foram escritos a partir de diretrizes nomeadas (nunca
 * inventando mecanismo/fato clínico), seguindo o padrão já usado para
 * material sem gabarito comentado no restante do banco.
 *
 * A prova tem 25 questões de múltipla escolha; só as 12 abaixo entraram —
 * as demais foram descartadas por não terem subtema correspondente na
 * taxonomia atual, por a questão ter sido oficialmente anulada (nº 10), ou
 * por exigirem uma diretriz muito específica (ex.: protocolo do MS de 2025)
 * que eu não tinha confiança suficiente para comentar com precisão.
 */
export const QUESTOES_OMEDV_2025: Questao[] = [
  {
    id: "cardio-omedv2025-01",
    subtemaId: "cardio--pericardite-aguda-e-tamponamento--diagnostico-e-conduta",
    disciplinaId: "cardio",
    enunciado:
      "Homem de 45 anos dá entrada no serviço com queixa de dor pré-cordial há 48 horas. Refere que sentiu uma dor súbita, intensa e mantida nesse tempo, com piora ao deitar e melhora quando se inclina para frente. Nega episódios anteriores, nega falta de ar importante, palpitações ou síncope. Nega comorbidades e medicações de uso contínuo, com uso recente de dipirona por quadro gripal. No exame físico, o paciente está em bom estado geral, 37,5°C, com pressão arterial de 120/80 mmHg, frequência cardíaca de 88 bpm e saturação de oxigênio de 98% em ar ambiente. Realizado ECG, e solicitados exames laboratoriais ainda pendentes. Considerando o quadro do paciente, fez parte do manejo da doença mais provavelmente evidenciada:",
    alternativas: [
      { letra: "A", texto: "Administração de AAS, clopidogrel, enoxaparina e estatina.", correta: false, comentario: "Esse é o manejo de SCA/IAM, não de pericardite; a dor aqui é posicional (piora deitado, melhora inclinado à frente), não anginosa, e o quadro típico após pródromo gripal é de pericardite aguda." },
      { letra: "B", texto: "Complementação diagnóstica com angiotomografia de tórax.", correta: false, comentario: "AngioTC de tórax é o exame para investigar TEP; não há fatores de risco (imobilização, neoplasia, uso de estrogênio) nem quadro (dispneia importante, taquicardia significativa) que sustentem essa hipótese aqui." },
      { letra: "C", texto: "Infusão de gluconato de cálcio e insulina regular com glicose.", correta: false, comentario: "Esse é o manejo de hipercalemia grave (estabilização de membrana + deslocamento intracelular de potássio), sem relação com o quadro apresentado." },
      { letra: "D", texto: "Analgesia com anti-inflamatório não esteroidal e colchicina.", correta: true, comentario: "Tratamento de primeira linha da pericardite aguda idiopática/viral: AINE em dose anti-inflamatória associado à colchicina, que reduz recorrência. A dor pleurítica que piora em decúbito dorsal e melhora com o tronco inclinado à frente, após pródromo gripal, é o quadro clássico." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["pericardite", "dor torácica", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 1, com gabarito oficial",
  },
  {
    id: "cardio-omedv2025-02",
    subtemaId: "cardio--doenca-arterial-periferica-e-claudicacao-intermitente--diagnostico-e-conduta",
    disciplinaId: "cardio",
    enunciado:
      "Homem, 68 anos, apresenta claudicação intermitente bilateral, principalmente em região de panturrilhas, após andar 300 metros, há cerca de 7 meses. É obeso grau I, hipertenso em uso de hidroclorotiazida 25mg e tabagista (30 anos-maço). No exame físico, apresenta pulsos femorais palpáveis e simétricos e pulsos poplíteos e distais dos membros inferiores não palpáveis. Apresentava veias reticulares e telangiectasias bilateralmente, com varizes de pequeno calibre na face medial das pernas. Índice tornozelo-braquial de 0,60 à esquerda e 0,63 à direita. Considerando a patologia prioritária no caso, qual a conduta mais adequada?",
    alternativas: [
      { letra: "A", texto: "Introdução de cilostazol, exercício físico e ultrassonografia Doppler para classificar a doença.", correta: false, comentario: "Cilostazol e USG Doppler têm papel complementar, mas o diagnóstico já está clinicamente estabelecido (claudicação + ausência de pulsos distais + ITB <0,9 bilateral) — a conduta inicial prioritária é o tratamento clínico de base, não a escalada farmacológica isolada." },
      { letra: "B", texto: "Realizar angiografia de membros inferiores para programação cirúrgica de revascularização.", correta: false, comentario: "Revascularização é reservada para claudicação incapacitante refratária ao tratamento clínico ou isquemia crítica de membro — não é a conduta inicial neste paciente, ainda sem falha terapêutica documentada." },
      { letra: "C", texto: "Iniciar tratamento clínico com ácido acetilsalicílico (AAS) e estímulo à deambulação orientada.", correta: true, comentario: "Primeira linha da DAOP sintomática: antiagregação com AAS (a DAOP é marcador de doença aterosclerótica sistêmica) associada a programa de exercício supervisionado, a intervenção com melhor evidência para aumentar a distância de claudicação." },
      { letra: "D", texto: "Controle de fatores de risco cardiovascular, uso de meia elástica e orientação de atividade física.", correta: false, comentario: "O controle de fatores de risco e a atividade física fazem parte do manejo, mas meia elástica de compressão é tratamento de insuficiência venosa, não de doença arterial — pode ser deletéria em membro com perfusão já comprometida (ITB <0,9)." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["DAOP", "claudicação intermitente", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 3, com gabarito oficial",
  },
  {
    id: "cardio-omedv2025-03",
    subtemaId: "cardio--hipertensao-resistente-e-refrataria--diagnostico-e-conduta",
    disciplinaId: "cardio",
    enunciado:
      "Manuel, 58 anos, comparece a consulta de rotina na UBS para seguimento de sua Diabetes Mellitus, hipertensão arterial sistêmica e gota. Faz uso de Enalapril, Nifedipino e Hidroclorotiazida, todos na máxima dose tolerada, usa Metformina e Insulina NPH, além de alopurinol. Nega outras doenças, cirurgias ou internações. Nega qualquer queixa, porém refere que está marcando sua pressão 3 vezes por dia em casa, desde última consulta, em que a PA deu 150/90, ficando na faixa diária de 140-160/80-100 mmHg. Na consulta, a pressão de Manuel é novamente aferida em ambos os membros com resultado 150/100 bilateral. Considerando o exposto, como podemos classificar o quadro de Manuel e qual o próximo passo para o manejo de sua hipertensão segundo a Sociedade Brasileira de Hipertensão:",
    alternativas: [
      { letra: "A", texto: "Refratária; Substituir a hidroclorotiazida por Clortalidona.", correta: false, comentario: "O quadro (3 classes em dose máxima, incluindo diurético, sem controle) define hipertensão RESISTENTE, não refratária (que exige ≥5 classes incluindo espironolactona sem controle); trocar o tiazídico não é o próximo passo definido pela SBH nesse estágio." },
      { letra: "B", texto: "Refratária; Substituir o Nifedipino por um Betabloqueador.", correta: false, comentario: "Mesma imprecisão de classificação — não é refratária. A SBH recomenda ADICIONAR espironolactona como 4º agente antes de trocar classes já otimizadas." },
      { letra: "C", texto: "Resistente; Trocar o Enalapril por Sacubitril-Valsartana.", correta: false, comentario: "A classificação como resistente está correta, mas sacubitril-valsartana não é o próximo passo padronizado pela SBH para HAS resistente — está mais associado ao manejo de insuficiência cardíaca com fração de ejeção reduzida." },
      { letra: "D", texto: "Resistente; Adição de uma Espironolactona ao tratamento.", correta: true, comentario: "PA não controlada com 3 classes em dose máxima tolerada, incluindo diurético, define hipertensão arterial RESISTENTE. A SBH recomenda a adição de espironolactona como 4º fármaco, com base em evidência de superioridade nesse cenário (estudo PATHWAY-2)." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["hipertensão resistente", "espironolactona", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 17, com gabarito oficial",
  },
  {
    id: "go-omedv2025-01",
    subtemaId: "go--infeccoes-ginecologicas--vulvovaginites",
    disciplinaId: "go",
    enunciado:
      "G.B.S, 25 anos, gestante com 10 semanas, comparece à consulta com queixa de corrimento há 1 semana. Refere que o corrimento com odor fétido. Nega dor, febre ou prurido intenso na região. Refere boa movimentação fetal, sem dinâmica uterina ou perda de líquido ou sangue. Ao exame ginecológico, presença de moderada quantidade de corrimento acinzentado, com pH de 4,8 e teste das aminas positivo. Considerando o provável diagnóstico, qual o tratamento?",
    alternativas: [
      { letra: "A", texto: "Aplicação de nistatina via vaginal por 14 dias.", correta: false, comentario: "Nistatina trata candidíase vulvovaginal, não vaginose bacteriana; o quadro (corrimento acinzentado, pH >4,5, teste das aminas positivo) é típico de vaginose, não de candidíase (que cursa com prurido intenso e corrimento grumoso, sem odor)." },
      { letra: "B", texto: "Monoterapia com Clindamicina VO por 7 dias.", correta: true, comentario: "Na gestação, o tratamento de escolha da vaginose bacteriana sintomática é metronidazol ou clindamicina por via oral; clindamicina oral é alternativa validada em qualquer trimestre." },
      { letra: "C", texto: "Dose única de ceftriaxona IM e Azitromicina VO.", correta: false, comentario: "Esse é o esquema para cervicite por gonococo/clamídia, não para vaginose bacteriana — o quadro (pH elevado, teste das aminas positivo, sem corrimento mucopurulento cervical ou dor pélvica) não sugere IST cervical." },
      { letra: "D", texto: "Ducha vaginal de bicarbonato de sódio semanal.", correta: false, comentario: "Duchas vaginais não são recomendadas como tratamento e podem favorecer a disbiose vaginal e o risco de vaginose recorrente e de infecção ascendente na gestação." },
    ],
    dificuldade: "intermediaria",
    estilo: "omed",
    tags: ["vaginose bacteriana", "gestação", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 6, com gabarito oficial",
  },
  {
    id: "go-omedv2025-02",
    subtemaId: "go--prematuridade--trabalho-de-parto-prematuro",
    disciplinaId: "go",
    enunciado:
      "Gestante primigesta de 24 anos, com 21 semanas gestacionais, compareceu a 5° consulta de pré-natal de baixo risco. Traz consigo o resultado de um ultrassom transvaginal realizado há 5 dias, evidenciando gestação de 19 semanas e 4 dias, com placenta posterior, feto vivo, único, batimentos cardíacos fetais 144 e colo do útero impérvio, medindo 21mm. Paciente não apresenta comorbidades ou queixas. Considerando o caso, qual a conduta mais indicada:",
    alternativas: [
      { letra: "A", texto: "Indicar cerclagem terapêutica, por risco de perda gestacional e parto prematuro.", correta: false, comentario: "Cerclagem é indicada em incompetência istmocervical (história de perda gestacional tardia recorrente ou dilatação indolor do colo) ou colo muito curto com história de parto prematuro prévio; aqui não há história obstétrica de risco que justifique procedimento invasivo isoladamente." },
      { letra: "B", texto: "Seguimento habitual em pré-natal de baixo risco, sem condutas adicionais.", correta: false, comentario: "Colo medindo 21mm (<25mm) no rastreio ultrassonográfico é achado de risco para parto prematuro e demanda intervenção profilática, não apenas observação." },
      { letra: "C", texto: "Indicação de uso de progesterona por via vaginal até a 36° semana gestacional.", correta: true, comentario: "Em gestante assintomática com colo curto (<25mm) no rastreio, a progesterona vaginal reduz o risco de parto prematuro e é a conduta primária recomendada, mantida até em torno de 36 semanas." },
      { letra: "D", texto: "Investigação de infecção de trato urinário/genital e introdução de pessário.", correta: false, comentario: "Rastrear ITU/corrimento é razoável em qualquer pré-natal, mas não é a conduta específica diante de colo curto; a paciente não tem queixas que sugiram infecção ativa, e a progesterona vaginal tem evidência mais consistente que o pessário como primeira linha nesse cenário." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["colo curto", "prematuridade", "progesterona", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 5, com gabarito oficial",
  },
  {
    id: "ped-omedv2025-01",
    subtemaId: "ped--doencas-exantematicas--sarampo-rubeola-exantema-subito-escarlatina",
    disciplinaId: "ped",
    enunciado:
      "J.P.A., 6 anos, é trazido pelo pai, pois iniciou com quadro de picos febris de 38° há 2 dias com aparecimento de manchas vermelhas no rosto, pelos braços e pernas, que pioraram desde ontem ao retornar da aula de futebol. Pai refere que o filho havia acabado de melhorar de uma gripe recente e, atualmente, não trata nenhuma doença. Ao exame físico, nenhuma alteração além das lesões de pele. Considerando o diagnóstico mais provável do paciente (eritema infeccioso), assinale a alternativa que contém uma complicação clássica dessa doença:",
    alternativas: [
      { letra: "A", texto: "Crise Aplásica.", correta: true, comentario: "O parvovírus B19 infecta diretamente precursores eritroides na medula óssea; em crianças hígidas isso costuma passar despercebido, mas é a via fisiopatológica da complicação mais temida da doença — a crise aplásica transitória, grave em pacientes com anemias hemolíticas crônicas (falciforme, esferocitose) que dependem de reticulocitose compensatória." },
      { letra: "B", texto: "Convulsão febril.", correta: false, comentario: "Convulsão febril está associada a picos febris de forma geral (qualquer causa de febre em lactentes/pré-escolares), não é uma complicação específica do eritema infeccioso por parvovírus B19." },
      { letra: "C", texto: "Meningite asséptica.", correta: false, comentario: "Meningite asséptica é complicação mais associada a outras viroses (enterovírus, caxumba) — não é manifestação característica da infecção por parvovírus B19 em crianças imunocompetentes." },
      { letra: "D", texto: "Encefalite Infecciosa.", correta: false, comentario: "Encefalite não é complicação classicamente associada ao eritema infeccioso; a via de complicação relevante do parvovírus B19 é hematológica (crise aplásica), não neurológica." },
    ],
    dificuldade: "intermediaria",
    estilo: "omed",
    tags: ["eritema infeccioso", "parvovírus B19", "exantema", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 7, com gabarito oficial",
  },
  {
    id: "ped-omedv2025-02",
    subtemaId: "ped--imunizacao--calendario-vacinal",
    disciplinaId: "ped",
    enunciado:
      "J.J.J., 3 anos e 6 meses, hígida, sem queixas, comparece para consulta de puericultura. Na revisão da carteira de vacinação, observa-se que a paciente não recebeu nenhuma vacina após os seus 7 meses, além de não ter recebido a 2° dose da vacina de rotavírus. Considerando o calendário nacional de vacinação de 2025, assinale a alternativa que contém apenas vacinas indicadas e pendentes para realização na criança?",
    alternativas: [
      { letra: "A", texto: "Rotavírus, Tríplice-viral e Febre Amarela.", correta: false, comentario: "A vacina de rotavírus tem janela etária máxima de aplicação (a última dose deve ser aplicada até cerca de 7 meses e 29 dias, conforme o calendário do PNI); aos 3 anos e 6 meses, a criança já ultrapassou essa janela — rotavírus não pode mais ser aplicado, o que torna esta alternativa incorreta." },
      { letra: "B", texto: "Pneumocócica 10V, Varicela e VIP.", correta: false, comentario: "Essas vacinas fazem parte do esquema de rotina do primeiro/segundo ano de vida; a alternativa C reúne de forma mais precisa as vacinas cujo status de pendência é inequívoco pela história de ausência de doses após os 7 meses." },
      { letra: "C", texto: "Hepatite A, Meningo ACWY, DTP.", correta: true, comentario: "Estando sem vacinação desde os 7 meses, ficam pendentes Hepatite A, Meningocócica ACWY (reforço) e DTP (reforço) — todas ainda dentro de janela etária válida para essa criança, diferentemente do rotavírus, que já não pode mais ser aplicado." },
      { letra: "D", texto: "Tetra-viral, VOP e Febre Amarela.", correta: false, comentario: "A VOP (vacina oral pólio) é usada como reforço apenas em crianças que já completaram o esquema primário com VIP, aos 4 anos — nessa idade (3 anos e 6 meses) ainda não é o momento padrão dessa dose de reforço." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["calendário vacinal", "PNI", "puericultura", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 8, com gabarito oficial",
  },
  {
    id: "ped-omedv2025-03",
    subtemaId: "ped--infeccoes-congenitas--abordagem-neonatal",
    disciplinaId: "ped",
    enunciado:
      "RN feminino, 38 semanas, nascida por parto vaginal, é trazida para avaliação neonatal de rotina. Ao nascimento, seu VDRL apresenta título de 1/16. O histórico materno revela sífilis tratada durante o segundo trimestre da gestação com 3 doses de penicilina benzatina, porém sem comprovante no cartão pré-natal ou VDRL pós tratamento. À admissão, VDRL materno foi de 1/4. Ao exame físico, a recém-nascida está assintomática, sem lesões cutâneas ou hepatoesplenomegalia. Hemograma, função hepática e radiografia de ossos longos estão normais. Considerando as diretrizes atuais para manejo de recém-nascidos expostos à sífilis congênita, qual a conduta mais apropriada neste caso?",
    alternativas: [
      { letra: "A", texto: "Internar a recém-nascida para penicilina G cristalina endovenosa por 10 dias, devido ao título VDRL elevado (1/16), independentemente do estado clínico.", correta: true, comentario: "Sem comprovação documental do tratamento materno e sem VDRL pós-tratamento confirmando queda adequada do título, o tratamento materno é considerado não documentado para fins de conduta neonatal. Some-se o título do RN (1/16) sendo 4× o materno (1/4) — critério clássico para tratar como sífilis congênita confirmada, mesmo assintomática." },
      { letra: "B", texto: "Não tratar a recém-nascida, apenas repetir o VDRL seriado aos 2, 3 e 6 meses de vida, pois a mãe foi adequadamente tratada e a RN está assintomática.", correta: false, comentario: "Seguimento sorológico sem tratamento só se aplica quando o tratamento materno está claramente documentado e comprovadamente adequado (incluindo queda de título) — o que não é o caso aqui, pela ausência de registro no cartão e de VDRL pós-tratamento." },
      { letra: "C", texto: "Administrar uma dose única de penicilina benzatina IM na dose pediátrica, com acompanhamento clínico e sorológico seriado.", correta: false, comentario: "O esquema de dose única é reservado a cenários de menor risco (tratamento materno documentado e adequado, título do RN não maior que o materno); aqui o título do RN é 4× o materno e o tratamento materno não está comprovado." },
      { letra: "D", texto: "Avaliar a evolução do título sorológico e considerar tratamento apenas se houver aumento do título ou surgimento de sinais clínicos de sífilis congênita.", correta: false, comentario: "Postergar o tratamento para 'esperar piora' é inadequado: o título do RN 4× o materno somado ao tratamento materno não documentado já são critérios suficientes para tratamento presuntivo imediato, independentemente da evolução clínica futura." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["sífilis congênita", "neonatologia", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 23, com gabarito oficial",
  },
  {
    id: "inf-omedv2025-01",
    subtemaId: "inf--hiv-aids--diagnostico-e-tarv",
    disciplinaId: "inf",
    enunciado:
      "Paciente 38 anos internado por tosse produtiva persistente há 15 dias, com piora do padrão respiratório nas últimas 72h. Relata que apresentava febre alta no final do dia e vem perdendo peso nas últimas semanas, apresentando teste do escarro positivo para Tuberculose (TB). Ademais, durante investigação, paciente recebe também o diagnóstico de HIV, com contagem viral de 22.000 cópias e CD4 de 178 células por mm³. Considerando o caso, qual deve ser a conduta em relação à ordem de início da terapia para TB e terapias anti-retrovirais (TARV)?",
    alternativas: [
      { letra: "A", texto: "Iniciar ambos os tratamentos para TB e TARV simultaneamente.", correta: false, comentario: "Início simultâneo aumenta o risco de síndrome inflamatória de reconstituição imune (SIRI) e de sobreposição de toxicidades/interações entre os esquemas — não é a estratégia recomendada." },
      { letra: "B", texto: "Iniciar tratamento de TB, porém adiar início da TARV por 2 semanas.", correta: true, comentario: "O tratamento da tuberculose deve sempre ser priorizado primeiro; com CD4 ≥50 células/mm³ (aqui 178), as diretrizes recomendam iniciar a TARV dentro de 2 a 8 semanas após o início do tratamento antituberculose, reduzindo o risco de SIRI associada à reconstituição imune precoce." },
      { letra: "C", texto: "Iniciar TARV, porém iniciar tratamento de TB após aumento de CD4.", correta: false, comentario: "Postergar o tratamento da tuberculose ativa é inaceitável — TB não tratada é rapidamente progressiva e transmissível; a TARV nunca deve atrasar o início do tratamento antituberculose." },
      { letra: "D", texto: "Iniciar tratamento de TB e adiar início da TARV até seu término.", correta: false, comentario: "Adiar a TARV até o fim do tratamento de TB (6+ meses) prolonga desnecessariamente a imunossupressão e o risco de outras infecções oportunistas; as diretrizes recomendam início mais precoce da TARV, dentro de semanas." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["HIV", "tuberculose", "TARV", "coinfecção", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 11, com gabarito oficial",
  },
  {
    id: "cir-omedv2025-01",
    subtemaId: "cir--urologia-cirurgica--litiase-hpb-e-emergencias-escrotais",
    disciplinaId: "cir",
    enunciado:
      "João, 70 anos, procura a unidade de saúde com queixas de jato urinário fraco, esforço para urinar, noctúria (acorda 3 a 4 vezes à noite para urinar) e sensação de esvaziamento incompleto da bexiga há 6 meses. Nega dor, febre ou sangue na urina. Ao exame, está em bom estado geral, afebril, com toque retal revelando próstata aumentada, de superfície lisa, bordas regulares e indolor. O PSA foi solicitado e veio com valor de 2,1 ng/mL. O exame de urina é normal. Com base nesse quadro, qual a melhor conduta inicial?",
    alternativas: [
      { letra: "A", texto: "Solicitar ultrassonografia de rins e vias urinárias e iniciar antibiótico empírico.", correta: false, comentario: "Não há dados sugestivos de infecção (afebril, sem dor, EAS normal); antibiótico empírico não tem indicação aqui." },
      { letra: "B", texto: "Encaminhar o paciente para avaliação urológica com biópsia prostática por risco de neoplasia.", correta: false, comentario: "PSA normal (2,1 ng/mL) e próstata de superfície lisa, bordas regulares e indolor ao toque são achados tranquilizadores, sem sinais de alerta para neoplasia que justifiquem biópsia neste momento." },
      { letra: "C", texto: "Iniciar tratamento com alfa-bloqueador e realizar acompanhamento dos sintomas.", correta: true, comentario: "Quadro típico de hiperplasia prostática benigna com sintomas do trato urinário inferior; alfa-bloqueador (ex.: tansulosina) é primeira linha para alívio sintomático, com acompanhamento clínico subsequente." },
      { letra: "D", texto: "Indicar prostatectomia total e suspender o acompanhamento com PSA.", correta: false, comentario: "Prostatectomia é conduta cirúrgica reservada a casos refratários ao tratamento clínico ou com complicações (retenção urinária recorrente, litíase vesical, insuficiência renal) — desproporcional como conduta inicial." },
    ],
    dificuldade: "intermediaria",
    estilo: "omed",
    tags: ["HPB", "urologia", "alfa-bloqueador", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 12, com gabarito oficial",
  },
  {
    id: "cir-omedv2025-02",
    subtemaId: "cir--hernias-da-parede-abdominal--inguinal-femoral-incisional",
    disciplinaId: "cir",
    enunciado:
      "Um homem de 62 anos, obeso (IMC 34 kg/m²), portador de hérnia incisional mediana volumosa há 8 anos, procura atendimento ambulatorial para avaliação cirúrgica. Relata desconforto abdominal progressivo e limitação funcional, mas sem sinais de encarceramento. Ao exame físico, nota-se abaulamento volumoso em abdome médio e inferior, irredutível, sem sinais flogísticos. A tomografia computadorizada mostra hérnia ventral contendo alças intestinais e omento, sem sinais de obstrução. O volume do saco herniário (VH) foi estimado em 5.200 cm³ e o volume da cavidade abdominal (VCA) em 18.000 cm³, utilizando as medidas dos eixos longitudinal, transversal e ântero-posterior conforme a metodologia descrita por Tanaka et al. Com base nesses achados, qual deve ser a conduta pré-operatória mais adequada para este paciente?",
    alternativas: [
      { letra: "A", texto: "Indicar correção cirúrgica imediata, uma vez que a tomografia não mostrou sinais de encarceramento.", correta: false, comentario: "Hérnias volumosas com grande perda de domicílio têm risco de síndrome compartimental abdominal e falência respiratória no pós-operatório se operadas diretamente, sem preparo prévio da cavidade." },
      { letra: "B", texto: "Solicitar pneumoperitônio progressivo pré-operatório, devido à relação VH/VCA ≥ 25%.", correta: true, comentario: "5.200/18.000 ≈ 29%. Pela metodologia de Tanaka et al., relação VH/VCA ≥ 25% indica perda de domicílio significativa; o pneumoperitônio progressivo pré-operatório expande gradualmente a cavidade, reduzindo o risco de síndrome compartimental e insuficiência respiratória pós-operatória." },
      { letra: "C", texto: "Contraindicar cirurgia devido ao risco elevado de complicações respiratórias e compressão abdominal no pós-operatório.", correta: false, comentario: "O risco elevado é motivo para preparo pré-operatório (pneumoperitônio progressivo), não para contraindicação definitiva — hérnias incisionais volumosas sintomáticas continuam tendo indicação cirúrgica após preparo adequado." },
      { letra: "D", texto: "Prescrever antibioticoprofilaxia e aguardar redução espontânea do conteúdo herniário antes da cirurgia.", correta: false, comentario: "Hérnias incisionais volumosas e crônicas (8 anos de evolução) não regridem espontaneamente; antibioticoprofilaxia não tem papel nessa fase, já que não há sinais de infecção." },
    ],
    dificuldade: "avancada",
    estilo: "omed",
    tags: ["hérnia incisional", "pneumoperitônio progressivo", "parede abdominal", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 24, com gabarito oficial",
  },
  {
    id: "neuro-omedv2025-01",
    subtemaId: "neuro--cefaleias-primarias-e-sinais-de-alarme--diagnostico-e-conduta",
    disciplinaId: "neuro",
    enunciado:
      "Paciente M.C., feminina, 20 anos, hígida, procura atendimento em ambulatório de neurologia com queixa de dores de cabeça. Relata ao menos 4 episódios por semana de dor pulsátil, unilateral, acompanhados de foto e fonofobia, muitas vezes também com náuseas e vômitos, sem melhora ao uso de analgesia simples, com duração que oscila de horas a dias. Nega alterações sensoperceptivas associadas às dores. Neste momento, encontra-se assintomática. Sabendo se tratar de um quadro de enxaqueca sem aura, qual o tratamento mais adequado à paciente para manejo do quadro?",
    alternativas: [
      { letra: "A", texto: "Sumatriptana de uso contínuo.", correta: false, comentario: "Triptanos são medicação abortiva (para a crise aguda), não profilática — não se usam de forma contínua; o uso frequente de triptanos pode inclusive causar cefaleia por uso excessivo de medicação." },
      { letra: "B", texto: "Propranolol de uso contínuo.", correta: true, comentario: "A frequência relatada (≥4 episódios por semana, muito incapacitantes) preenche critério para tratamento profilático, não apenas abortivo. Betabloqueador é uma das primeiras opções profiláticas validadas para enxaqueca, reduzindo frequência e intensidade das crises a longo prazo." },
      { letra: "C", texto: "Topiramato apenas se crise.", correta: false, comentario: "Topiramato é também um medicamento de perfil profilático (uso contínuo), não uma medicação 'se crise' — a alternativa contém uma contradição em si mesma." },
      { letra: "D", texto: "Naratriptana apenas se crise.", correta: false, comentario: "Isoladamente 'se crise' trataria apenas os episódios agudos, sem reduzir sua frequência; dado o alto número de crises semanais, essa abordagem exclusivamente abortiva é insuficiente." },
    ],
    dificuldade: "intermediaria",
    estilo: "omed",
    tags: ["enxaqueca", "profilaxia", "cefaleia primária", "OMED"],
    fonte: "Prova oficial V OMED — Ciclo Clínico, 2ª fase (2025), questão de múltipla escolha 22, com gabarito oficial",
  },
];
