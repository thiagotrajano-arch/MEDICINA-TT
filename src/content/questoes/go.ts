import type { Questao } from "@/domain/content/types";

/**
 * Banco de questões — Ginecologia & Obstetrícia (OMED).
 * Transcritas fielmente do material do usuário (Banco de Questões OMED: GO),
 * com gabarito e comentários por alternativa conferidos com diretrizes
 * (MS / FEBRASGO / ACOG). Fonte marcada em cada questão.
 *
 * Primeiro lote. Novos blocos (demais questões do banco) são acrescentados aqui.
 */

const SUB = {
  suplementacao: "go--pre-natal--suplementacao-e-imunizacao-na-gestacao",
  roteiro: "go--pre-natal--roteiro-e-consultas-do-pre-natal",
  exames: "go--pre-natal--exames-por-trimestre",
  preEclampsia: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
  hipertensao: "go--sindromes-hipertensivas-da-gestacao--hipertensao-gestacional-vs-cronica",
  hellp: "go--sindromes-hipertensivas-da-gestacao--sindrome-hellp",
  hemorragia1: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola",
  hemorragia2: "go--hemorragias-da-gestacao--segunda-metade-dpp-placenta-previa",
} as const;

const FONTE = "Banco OMED · Ginecologia & Obstetrícia (material do usuário)";

export const QUESTOES_GO: Questao[] = [
  // ── BLOCO 1 · PRÉ-NATAL ─────────────────────────────────────────
  {
    id: "go-pn-01",
    subtemaId: SUB.suplementacao,
    disciplinaId: "go",
    enunciado:
      "Uma gestante de 12 semanas, sem comorbidades prévias, comparece à primeira consulta de pré-natal e questiona sobre a suplementação vitamínica. De acordo com as recomendações do Ministério da Saúde e da FEBRASGO, qual a conduta correta?",
    alternativas: [
      { letra: "A", texto: "Iniciar 400 mcg de ácido fólico e 40 mg de ferro elementar imediatamente.", correta: false, comentario: "O ferro elementar profilático é iniciado a partir da 20ª semana, não imediatamente." },
      { letra: "B", texto: "5 mg de ácido fólico no 1º trimestre e 60 mg de ferro a partir da 20ª semana.", correta: false, comentario: "5 mg é a dose para gestantes de alto risco de defeito do tubo neural; a dose habitual é 400 mcg." },
      { letra: "C", texto: "Manter ácido fólico até o fim e iniciar ferro só se Hb < 11 g/dL.", correta: false, comentario: "O ferro é profilático (a partir de 20 sem), não apenas terapêutico; ácido fólico é mais importante no 1º trimestre." },
      { letra: "D", texto: "400 mcg de ácido fólico (idealmente pré-concepcional) e 60 mg de ferro elementar após a 20ª semana.", correta: true, comentario: "Ácido fólico 400 mcg idealmente no período pré-concepcional/1º trimestre (prevenção de DTN) e ferro elementar profilático a partir da 20ª semana." },
      { letra: "E", texto: "Polivitamínico com cálcio, ômega-3 e 100 mg de ferro desde o 1º trimestre.", correta: false, comentario: "Não há indicação de polivitamínico completo de rotina nem de ferro em alta dose no 1º trimestre." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    tags: ["pré-natal", "suplementação", "ácido fólico", "ferro"],
    fonte: FONTE,
  },
  {
    id: "go-pn-02",
    subtemaId: SUB.roteiro,
    disciplinaId: "go",
    enunciado:
      "Gestante A negativo, parceiro O positivo, Coombs indireto negativo no início do pré-natal. Qual a orientação correta para o seguimento?",
    alternativas: [
      { letra: "A", texto: "Imunoglobulina anti-D imediatamente.", correta: false, comentario: "A profilaxia anti-D de rotina é feita na 28ª semana (e no pós-parto se RN Rh+), não no início." },
      { letra: "B", texto: "Repetir Coombs indireto a cada 4 semanas; se negativo, profilaxia anti-D na 28ª semana.", correta: true, comentario: "Gestante Rh negativa não sensibilizada: monitorar Coombs indireto e realizar profilaxia com anti-D na 28ª semana." },
      { letra: "C", texto: "Doppler de artéria cerebral média mensal.", correta: false, comentario: "O Doppler de ACM avalia anemia fetal em gestantes JÁ sensibilizadas (Coombs positivo)." },
      { letra: "D", texto: "Não há risco de sensibilização, pois o parceiro é O.", correta: false, comentario: "O grupo ABO do parceiro não elimina o risco Rh; o que importa é o fator Rh." },
      { letra: "E", texto: "Repetir Coombs apenas no 3º trimestre.", correta: false, comentario: "O acompanhamento deve ser seriado (a cada 4 semanas), não único." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["pré-natal", "aloimunização Rh", "Coombs", "anti-D"],
    fonte: FONTE,
  },
  {
    id: "go-pn-03",
    subtemaId: SUB.exames,
    disciplinaId: "go",
    enunciado:
      "Triagem do 1º trimestre: Toxoplasmose IgG positivo e IgM negativo. Qual a interpretação e conduta?",
    alternativas: [
      { letra: "A", texto: "Infecção aguda; iniciar espiramicina.", correta: false, comentario: "IgM negativo afasta infecção aguda." },
      { letra: "B", texto: "Susceptível; repetir sorologia trimestralmente.", correta: false, comentario: "Susceptível seria IgG e IgM negativos." },
      { letra: "C", texto: "Paciente imune; não há necessidade de repetir este exame no pré-natal.", correta: true, comentario: "IgG+ / IgM− indica imunidade (infecção antiga); não há risco de toxoplasmose congênita e não se repete a sorologia." },
      { letra: "D", texto: "Inconclusivo; solicitar teste de avidez imediatamente.", correta: false, comentario: "A avidez é útil quando IgM é positivo, para datar a infecção." },
      { letra: "E", texto: "Infecção crônica; iniciar pirimetamina e sulfadiazina.", correta: false, comentario: "Não há infecção ativa a tratar." },
    ],
    dificuldade: "fixacao",
    estilo: "exame",
    tags: ["pré-natal", "toxoplasmose", "sorologia"],
    fonte: FONTE,
  },
  {
    id: "go-pn-05",
    subtemaId: SUB.roteiro,
    disciplinaId: "go",
    enunciado:
      "Em relação ao rastreio de Estreptococo do Grupo B (GBS), qual situação indica antibioticoprofilaxia intraparto independentemente do resultado do swab?",
    alternativas: [
      { letra: "A", texto: "Cesariana eletiva com membranas íntegras.", correta: false, comentario: "Cesárea eletiva com bolsa íntegra e fora de trabalho de parto não requer profilaxia para GBS." },
      { letra: "B", texto: "Urocultura positiva para GBS em qualquer fase da gestação atual.", correta: true, comentario: "Bacteriúria por GBS na gestação indica alta colonização e profilaxia intraparto, independentemente do swab." },
      { letra: "C", texto: "Gestação anterior com swab positivo, mas sem sepse neonatal.", correta: false, comentario: "O antecedente que indica profilaxia é o RN anterior com doença invasiva por GBS." },
      { letra: "D", texto: "Trabalho de parto a termo com bolsa rota há 6 horas.", correta: false, comentario: "Isoladamente não indica; a decisão depende do swab/ fatores de risco." },
      { letra: "E", texto: "Febre intraparto isolada com swab negativo recente.", correta: false, comentario: "Febre intraparto é abordada como corioamnionite; não é a resposta pedida sobre GBS." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["pré-natal", "GBS", "profilaxia intraparto"],
    fonte: FONTE,
  },
  {
    id: "go-pn-13",
    subtemaId: SUB.exames,
    disciplinaId: "go",
    enunciado:
      "Gestante obesa, TOTG 75 g com 26 semanas: jejum 90 mg/dL; 1h 185 mg/dL; 2h 151 mg/dL. Qual o diagnóstico?",
    alternativas: [
      { letra: "A", texto: "Glicemia de jejum alterada.", correta: false, comentario: "O jejum de 90 está abaixo do ponto de corte (92 mg/dL)." },
      { letra: "B", texto: "Diabetes Melito Gestacional (DMG).", correta: true, comentario: "Basta UM valor alterado no TOTG: jejum ≥92, 1h ≥180, 2h ≥153. Aqui 1h = 185 (≥180) fecha DMG." },
      { letra: "C", texto: "Diabetes prévio (overt).", correta: false, comentario: "Overt exige jejum ≥126 ou 2h ≥200 ou glicemia aleatória ≥200 com sintomas." },
      { letra: "D", texto: "Tolerância normal.", correta: false, comentario: "Há um valor alterado (1h)." },
      { letra: "E", texto: "Repetir o exame.", correta: false, comentario: "Um valor alterado já confirma DMG; não se repete." },
    ],
    dificuldade: "intermediaria",
    estilo: "exame",
    tags: ["pré-natal", "diabetes gestacional", "TOTG"],
    fonte: FONTE,
  },
  {
    id: "go-pn-16",
    subtemaId: SUB.exames,
    disciplinaId: "go",
    enunciado:
      "Sífilis latente tardia (ou de duração ignorada) diagnosticada no 2º trimestre. Qual o esquema terapêutico adequado?",
    alternativas: [
      { letra: "A", texto: "Penicilina G Benzatina 2,4 milhões UI, dose única, IM.", correta: false, comentario: "Dose única trata apenas a sífilis recente (primária/secundária/latente precoce)." },
      { letra: "B", texto: "Penicilina G Benzatina 2,4 milhões UI IM, semanal por 3 semanas (7,2 milhões UI).", correta: true, comentario: "Sífilis latente tardia/ignorada: 3 doses semanais de penicilina benzatina." },
      { letra: "C", texto: "Ceftriaxona 1 g IM por 10 dias.", correta: false, comentario: "Não é o esquema padrão para sífilis na gestação." },
      { letra: "D", texto: "Doxiciclina 100 mg VO por 15 dias.", correta: false, comentario: "Tetraciclinas são contraindicadas na gestação; ademais não previnem sífilis congênita." },
      { letra: "E", texto: "Azitromicina 1 g VO, dose única.", correta: false, comentario: "Não recomendada na gestação (resistência e não previne sífilis congênita)." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["pré-natal", "sífilis", "penicilina"],
    fonte: FONTE,
  },
  {
    id: "go-pn-17",
    subtemaId: SUB.preEclampsia,
    disciplinaId: "go",
    enunciado:
      "Gestante de alto risco por pré-eclâmpsia grave em gestação anterior. Qual intervenção profilática está indicada (FEBRASGO/MS)?",
    alternativas: [
      { letra: "A", texto: "AAS (100–150 mg/dia) e cálcio (se baixa ingesta), iniciados entre 12–16 semanas.", correta: true, comentario: "Profilaxia baseada em evidência: AAS em baixa dose iniciado antes de 16 semanas + cálcio quando a ingesta é baixa." },
      { letra: "B", texto: "Repouso absoluto no leito a partir do 2º trimestre.", correta: false, comentario: "Repouso absoluto não previne pré-eclâmpsia e aumenta risco tromboembólico." },
      { letra: "C", texto: "Dieta hipossódica rigorosa e restrição de líquidos.", correta: false, comentario: "Não previne pré-eclâmpsia." },
      { letra: "D", texto: "Metildopa 250 mg/dia profilático.", correta: false, comentario: "Anti-hipertensivo não previne o desenvolvimento de pré-eclâmpsia." },
      { letra: "E", texto: "Vitaminas C e E.", correta: false, comentario: "Antioxidantes não demonstraram benefício profilático." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["pré-eclâmpsia", "profilaxia", "AAS", "cálcio"],
    fonte: FONTE,
  },

  // ── BLOCO 2 · PRÉ-ECLÂMPSIA ─────────────────────────────────────
  {
    id: "go-pe-01",
    subtemaId: SUB.hipertensao,
    disciplinaId: "go",
    enunciado:
      "Primigesta, 32 semanas, PA 145/92 e 142/90 (intervalo de 4h), assintomática, sem proteinúria e sem disfunção de órgão-alvo. Diagnóstico e conduta?",
    alternativas: [
      { letra: "A", texto: "Pré-eclâmpsia sem gravidade; iniciar sulfato de magnésio.", correta: false, comentario: "Sem proteinúria nem disfunção de órgão-alvo não há pré-eclâmpsia; MgSO4 não está indicado." },
      { letra: "B", texto: "Hipertensão gestacional; acompanhamento e controle pressórico.", correta: true, comentario: "HAS após 20 semanas SEM proteinúria e SEM disfunção de órgão-alvo = hipertensão gestacional." },
      { letra: "C", texto: "Pré-eclâmpsia sobreposta; interrupção imediata.", correta: false, comentario: "Sobreposta exige hipertensão crônica prévia." },
      { letra: "D", texto: "Hipertensão crônica; metildopa e ecocardiograma.", correta: false, comentario: "Crônica é diagnosticada antes de 20 semanas ou persistente após o puerpério." },
      { letra: "E", texto: "Hipertensão do jaleco branco; MAPA.", correta: false, comentario: "Duas medidas elevadas em ambiente controlado tornam essa hipótese improvável." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["hipertensão gestacional", "diagnóstico"],
    fonte: FONTE,
  },
  {
    id: "go-pe-02",
    subtemaId: SUB.preEclampsia,
    disciplinaId: "go",
    enunciado:
      "34 semanas: cefaleia holocraniana intensa, escotomas e epigastralgia; PA 165/110; plaquetas 110.000, DHL 650, AST 80. Diagnóstico e conduta para prevenir convulsão?",
    alternativas: [
      { letra: "A", texto: "Pré-eclâmpsia sem gravidade; MgSO4 (Pritchard).", correta: false, comentario: "Os sintomas neurológicos e PA ≥160/110 caracterizam gravidade." },
      { letra: "B", texto: "Síndrome HELLP; MgSO4 (Zuspan).", correta: false, comentario: "Plaquetas de 110.000 (>100.000) não preenchem critério de HELLP." },
      { letra: "C", texto: "Iminência de eclâmpsia; MgSO4 (Zuspan).", correta: true, comentario: "Cefaleia + escotomas + epigastralgia com PA grave = iminência de eclâmpsia; MgSO4 previne a convulsão." },
      { letra: "D", texto: "Eclâmpsia; diazepam EV.", correta: false, comentario: "Não houve convulsão (não é eclâmpsia) e o MgSO4 é superior ao diazepam." },
      { letra: "E", texto: "Pré-eclâmpsia grave; hidralazina e observação.", correta: false, comentario: "Falta a prevenção da convulsão (MgSO4), que é o alvo da pergunta." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["pré-eclâmpsia", "iminência de eclâmpsia", "sulfato de magnésio"],
    fonte: FONTE,
  },
  {
    id: "go-pe-06",
    subtemaId: SUB.preEclampsia,
    disciplinaId: "go",
    enunciado:
      "Qual das opções NÃO constitui critério de gravidade da pré-eclâmpsia segundo as diretrizes atuais da ACOG?",
    alternativas: [
      { letra: "A", texto: "Cefaleia persistente não responsiva a analgésicos.", correta: false, comentario: "É critério de gravidade (sintoma neurológico)." },
      { letra: "B", texto: "Plaquetopenia < 100.000/mm³.", correta: false, comentario: "É critério de gravidade." },
      { letra: "C", texto: "Proteinúria de 24h > 5 g.", correta: true, comentario: "A magnitude da proteinúria deixou de ser critério de gravidade nas diretrizes atuais." },
      { letra: "D", texto: "Edema agudo de pulmão.", correta: false, comentario: "É critério de gravidade." },
      { letra: "E", texto: "Transaminases > 2× o normal.", correta: false, comentario: "É critério de gravidade (disfunção hepática)." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["pré-eclâmpsia", "critérios de gravidade", "ACOG"],
    fonte: FONTE,
  },
  {
    id: "go-pe-07",
    subtemaId: SUB.preEclampsia,
    disciplinaId: "go",
    enunciado: "Sobre o sulfato de magnésio no esquema de Zuspan, qual assertiva está correta?",
    alternativas: [
      { letra: "A", texto: "Ataque de 4 g EV em 10–15 min, seguido de 1 g/h em bomba de infusão contínua.", correta: true, comentario: "Esquema de Zuspan: 4 g EV de ataque e manutenção EV contínua de 1 g/h." },
      { letra: "B", texto: "Ataque de 10 g IM (5 g em cada nádega) e 5 g IM a cada 4h.", correta: false, comentario: "Esse é o esquema de Pritchard (intramuscular)." },
      { letra: "C", texto: "Ataque de 6 g EV e 2 g/h contínuo.", correta: false, comentario: "Doses acima do padrão de Zuspan." },
      { letra: "D", texto: "Ataque de 4 g EV e manutenção por via oral.", correta: false, comentario: "A manutenção do MgSO4 não é por via oral." },
      { letra: "E", texto: "Zuspan é contraindicado na eclâmpsia.", correta: false, comentario: "Zuspan é amplamente usado inclusive na eclâmpsia." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["sulfato de magnésio", "Zuspan"],
    fonte: FONTE,
  },
  {
    id: "go-pe-16",
    subtemaId: SUB.preEclampsia,
    disciplinaId: "go",
    enunciado:
      "Paciente com eclâmpsia em uso de MgSO4 apresenta diminuição do reflexo patelar e FR de 10 irpm. Qual a conduta?",
    alternativas: [
      { letra: "A", texto: "Administrar nova dose de MgSO4.", correta: false, comentario: "Os sinais indicam toxicidade — nova dose agravaria o quadro." },
      { letra: "B", texto: "Suspender o MgSO4 e administrar gluconato de cálcio 1 g EV.", correta: true, comentario: "Sinais de intoxicação por magnésio (hiporreflexia + depressão respiratória): suspender e usar o antídoto, gluconato de cálcio." },
      { letra: "C", texto: "Apenas observar (efeitos esperados).", correta: false, comentario: "Depressão respiratória não é efeito aceitável — é sinal de toxicidade." },
      { letra: "D", texto: "Administrar furosemida.", correta: false, comentario: "Não é a conduta para toxicidade aguda por magnésio." },
      { letra: "E", texto: "Intubação orotraqueal imediata.", correta: false, comentario: "Reservada se houver falência respiratória apesar do antídoto." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["sulfato de magnésio", "toxicidade", "gluconato de cálcio"],
    fonte: FONTE,
  },
  {
    id: "go-pe-17",
    subtemaId: SUB.hellp,
    disciplinaId: "go",
    enunciado:
      "Sobre a Síndrome HELLP, qual alteração laboratorial é considerada a mais precoce e sensível?",
    alternativas: [
      { letra: "A", texto: "Aumento de bilirrubina indireta.", correta: false, comentario: "A hemólise é parte da síndrome, mas a plaquetopenia é o marcador mais precoce/sensível." },
      { letra: "B", texto: "Elevação de AST/ALT > 500 UI/L.", correta: false, comentario: "A elevação hepática costuma ser mais tardia." },
      { letra: "C", texto: "Trombocitopenia (plaquetopenia).", correta: true, comentario: "A queda de plaquetas é a alteração mais precoce e sensível na HELLP." },
      { letra: "D", texto: "Hemoglobinúria.", correta: false, comentario: "Achado tardio e inespecífico." },
      { letra: "E", texto: "Hipofibrinogenemia.", correta: false, comentario: "Ocorre em casos avançados com coagulopatia." },
    ],
    dificuldade: "intermediaria",
    estilo: "exame",
    tags: ["HELLP", "plaquetopenia"],
    fonte: FONTE,
  },

  // ── BLOCO 3 · SANGRAMENTOS (2ª metade) ──────────────────────────
  {
    id: "go-sg-06",
    subtemaId: SUB.hemorragia2,
    disciplinaId: "go",
    enunciado:
      "Gestante de 34 semanas, hipertensa, com dor abdominal intensa e súbita, sangramento vaginal escuro em pequena quantidade, útero hipertônico ('em lenho') e taquicardia materna. Diagnóstico?",
    alternativas: [
      { letra: "A", texto: "Placenta prévia.", correta: false, comentario: "Placenta prévia cursa com sangramento vermelho vivo, indolor e sem hipertonia." },
      { letra: "B", texto: "Descolamento prematuro de placenta (DPP).", correta: true, comentario: "Dor súbita + hipertonia ('útero em lenho') + sangramento escuro em hipertensa é o quadro clássico de DPP." },
      { letra: "C", texto: "Rotura uterina.", correta: false, comentario: "Cursa com parada da dinâmica e dor com colapso; contexto habitual é cicatriz uterina/trabalho de parto." },
      { letra: "D", texto: "Vasa prévia.", correta: false, comentario: "Sangramento fetal à amniorrexe, com sofrimento fetal agudo." },
      { letra: "E", texto: "Trabalho de parto prematuro.", correta: false, comentario: "Não explica a hipertonia mantida e o sangramento escuro." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["DPP", "sangramento", "hipertonia"],
    fonte: FONTE,
  },
  {
    id: "go-sg-07",
    subtemaId: SUB.hemorragia2,
    disciplinaId: "go",
    enunciado: "Qual é um fator de risco clássico para placenta prévia?",
    alternativas: [
      { letra: "A", texto: "Primigestação.", correta: false, comentario: "A multiparidade, não a primigestação, é fator de risco." },
      { letra: "B", texto: "Idade materna precoce.", correta: false, comentario: "O risco aumenta com idade materna avançada." },
      { letra: "C", texto: "Cicatriz uterina prévia (cesarianas anteriores).", correta: true, comentario: "Cesáreas prévias e cicatrizes uterinas são fatores de risco clássicos para placenta prévia (e acretismo)." },
      { letra: "D", texto: "Hipertensão arterial crônica.", correta: false, comentario: "Associa-se mais a DPP e RCF." },
      { letra: "E", texto: "ITU de repetição.", correta: false, comentario: "Não é fator de risco para placenta prévia." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    tags: ["placenta prévia", "fatores de risco"],
    fonte: FONTE,
  },

  // ── BLOCO 4 · GRAVIDEZ ECTÓPICA (1ª metade) ─────────────────────
  {
    id: "go-ec-03",
    subtemaId: SUB.hemorragia1,
    disciplinaId: "go",
    enunciado:
      "Qual sinal clínico é característico de irritação diafragmática pelo hemoperitônio na gestação ectópica rota?",
    alternativas: [
      { letra: "A", texto: "Sinal de Cullen.", correta: false, comentario: "Equimose periumbilical (hemorragia retroperitoneal)." },
      { letra: "B", texto: "Sinal de Grey-Turner.", correta: false, comentario: "Equimose em flancos." },
      { letra: "C", texto: "Sinal de Laffont.", correta: true, comentario: "Dor no ombro por irritação diafragmática do hemoperitônio (sinal de Laffont)." },
      { letra: "D", texto: "Sinal de Blumberg.", correta: false, comentario: "Descompressão dolorosa (irritação peritoneal), não específico do diafragma." },
      { letra: "E", texto: "Sinal de Proust.", correta: false, comentario: "Dor/abaulamento no fundo de saco de Douglas ao toque ('grito de Douglas')." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    tags: ["gestação ectópica", "hemoperitônio", "semiologia"],
    fonte: FONTE,
  },
  {
    id: "go-ec-05",
    subtemaId: SUB.hemorragia1,
    disciplinaId: "go",
    enunciado:
      "Gestação ectópica tubária íntegra. Quais critérios permitem o tratamento medicamentoso com metotrexato (dose única)?",
    alternativas: [
      { letra: "A", texto: "Massa > 5 cm e embrião vivo com BCF presentes.", correta: false, comentario: "Embrião vivo e massa grande são critérios contra o MTX." },
      { letra: "B", texto: "β-hCG > 10.000, dor intensa e instabilidade.", correta: false, comentario: "Instabilidade e β-hCG muito alto contraindicam o MTX (indicam cirurgia)." },
      { letra: "C", texto: "Massa ≤ 3,5 cm, estabilidade hemodinâmica, sem embrião vivo e β-hCG < 5.000.", correta: true, comentario: "Critérios clássicos de elegibilidade para MTX: estável, massa pequena, sem atividade cardíaca e β-hCG baixo." },
      { letra: "D", texto: "Desejo de fertilidade, independentemente de β-hCG/massa.", correta: false, comentario: "A elegibilidade depende de critérios objetivos, não só do desejo reprodutivo." },
      { letra: "E", texto: "Hemoperitônio moderado à ultrassonografia.", correta: false, comentario: "Hemoperitônio sugere rotura/instabilidade — contraindicação ao MTX." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["gestação ectópica", "metotrexato", "critérios"],
    fonte: FONTE,
  },
];
