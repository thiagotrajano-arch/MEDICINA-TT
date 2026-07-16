import type { Questao } from "@/domain/content/types";

/**
 * Questões ORIGINAIS — escritas para esta plataforma (não extraídas dos PDFs).
 *
 * Mesmo estilo da OMED (vinheta clínica → conduta / próximo passo / interpretação
 * de exame), mas inéditas: nenhuma repete enunciado dos bancos importados.
 * Todas ancoradas em fatos estáveis de diretriz (MS, FEBRASGO, SBP, ACOG,
 * Surviving Sepsis, TG18, ATLS). Comentário em todas as alternativas.
 */

const FONTE = "Questão original — Codex Medicus (baseada em diretrizes)";

export const QUESTOES_ORIGINAIS: Questao[] = [
  // ── GINECOLOGIA & OBSTETRÍCIA ───────────────────────────────────
  {
    id: "orig-go-01",
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--sindrome-hellp",
    disciplinaId: "go",
    enunciado:
      "Gestante de 33 semanas chega ao pronto-socorro com dor epigástrica intensa e náuseas. PA 158/104 mmHg. Exames: plaquetas 78.000/mm³, AST 210 U/L, LDH 800 U/L, esquizócitos no sangue periférico e bilirrubina indireta elevada. Qual o diagnóstico e a base do raciocínio?",
    alternativas: [
      { letra: "A", texto: "Pré-eclâmpsia sem sinais de gravidade — os exames são inespecíficos na gestação.", correta: false, comentario: "Plaquetopenia e disfunção hepática são, por si só, critérios de gravidade — nunca inespecíficos." },
      { letra: "B", texto: "Síndrome HELLP — hemólise (esquizócitos, LDH e BI elevadas) + enzimas hepáticas elevadas + plaquetopenia < 100.000.", correta: true, comentario: "A tríade completa está presente. Note que a HELLP pode ocorrer com PA apenas moderadamente elevada — não é a pressão que define o diagnóstico." },
      { letra: "C", texto: "Esteatose hepática aguda da gestação.", correta: false, comentario: "Cursaria com hipoglicemia, coagulopatia e insuficiência hepática franca, sem o padrão hemolítico com esquizócitos." },
      { letra: "D", texto: "Púrpura trombocitopênica trombótica (PTT).", correta: false, comentario: "Diferencial real, mas exigiria febre e alterações neurológicas proeminentes com plaquetopenia muito mais grave, sem a hipertensão do contexto obstétrico." },
    ],
    dificuldade: "avancada",
    estilo: "caso",
    tags: ["HELLP", "hemólise", "plaquetopenia"],
    fonte: FONTE,
  },
  {
    id: "orig-go-02",
    subtemaId: "go--pre-natal--exames-por-trimestre",
    disciplinaId: "go",
    enunciado:
      "Gestante de 12 semanas, assintomática, traz VDRL 1:8 e teste treponêmico (FTA-Abs) reagente. Nega tratamento prévio de sífilis. Qual a conduta?",
    alternativas: [
      { letra: "A", texto: "Repetir o VDRL em 30 dias antes de qualquer decisão.", correta: false, comentario: "Adiar o tratamento na gestação aumenta o risco de sífilis congênita — não se espera." },
      { letra: "B", texto: "Tratar como sífilis latente de duração ignorada: penicilina benzatina 2,4 milhões UI IM, semanal, por 3 semanas.", correta: true, comentario: "Dois testes reagentes sem tratamento prévio e sem lesão/data definida = latente de duração ignorada → 3 doses. Tratar também a parceria." },
      { letra: "C", texto: "Não tratar: título 1:8 é considerado cicatriz sorológica.", correta: false, comentario: "Cicatriz sorológica exige tratamento adequado documentado — o que a paciente nega. Na dúvida, trata-se." },
      { letra: "D", texto: "Prescrever azitromicina 1 g VO em dose única.", correta: false, comentario: "Só a penicilina benzatina trata adequadamente o feto — é a única droga que previne sífilis congênita." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["sífilis", "pré-natal", "penicilina"],
    fonte: FONTE,
  },

  // ── PEDIATRIA ───────────────────────────────────────────────────
  {
    id: "orig-ped-01",
    subtemaId: "ped--emergencias-pediatricas--desidratacao-e-reidratacao",
    disciplinaId: "ped",
    enunciado:
      "Lactente de 12 kg com gastroenterite chega letárgico, enchimento capilar de 4 s e pulsos filiformes. Qual a conduta imediata e o volume correto?",
    alternativas: [
      { letra: "A", texto: "Plano B: SRO 75 mL/kg em 4 horas na unidade.", correta: false, comentario: "Há sinais de choque — a via oral é insuficiente e perigosa no rebaixamento de consciência." },
      { letra: "B", texto: "Expansão EV com cristaloide isotônico 20 mL/kg em bolus (240 mL), reavaliando a perfusão após cada expansão.", correta: true, comentario: "Choque hipovolêmico = Plano C: SF 0,9% ou Ringer lactato 20 mL/kg rápido. 20 × 12 = 240 mL. Reavaliar e repetir se persistirem os sinais." },
      { letra: "C", texto: "Soro glicosado 5% 20 mL/kg em bolus.", correta: false, comentario: "Solução hipotônica não expande o intravascular e causa hiponatremia — nunca é fluido de expansão." },
      { letra: "D", texto: "Sonda nasogástrica com SRO 20 mL/kg/h.", correta: false, comentario: "A gastróclise é alternativa na falha da TRO sem choque, não no choque estabelecido." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["choque", "desidratação grave", "plano C"],
    fonte: FONTE,
  },
  {
    id: "orig-ped-02",
    subtemaId: "ped--neonatologia--ictericia-neonatal",
    disciplinaId: "ped",
    enunciado:
      "RN a termo, 30 horas de vida, em aleitamento exclusivo, apresenta icterícia até a raiz das coxas. Mãe O negativo, RN O positivo, Coombs direto negativo. Qual a primeira providência?",
    alternativas: [
      { letra: "A", texto: "Dosar bilirrubina total e frações e plotar no nomograma de Bhutani conforme as horas de vida.", correta: true, comentario: "Icterícia extensa (zona 3+) nas primeiras 36 h exige quantificar a bilirrubina e interpretá-la por hora de vida — a avaliação visual é imprecisa e a decisão de fototerapia depende do nomograma." },
      { letra: "B", texto: "Iniciar fototerapia imediatamente sem dosar bilirrubina.", correta: false, comentario: "Trata-se às cegas: a indicação depende do valor e da hora de vida." },
      { letra: "C", texto: "Suspender o aleitamento por 48 h.", correta: false, comentario: "Não se suspende o aleitamento; ele deve ser estimulado para aumentar a eliminação de bilirrubina." },
      { letra: "D", texto: "Tranquilizar: com Coombs negativo, trata-se de icterícia fisiológica.", correta: false, comentario: "Coombs negativo afasta doença hemolítica imune, mas não torna fisiológica uma icterícia extensa e precoce — há incompatibilidade ABO possível e outras causas." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["icterícia neonatal", "Bhutani", "fototerapia"],
    fonte: FONTE,
  },

  // ── INFECTOLOGIA ────────────────────────────────────────────────
  {
    id: "orig-inf-01",
    subtemaId: "inf--sepse--reconhecimento-e-surviving-sepsis",
    disciplinaId: "inf",
    enunciado:
      "Paciente de 68 anos com pielonefrite chega com PA 84/50 mmHg mantida após 30 mL/kg de cristaloide, lactato 4,2 mmol/L e necessidade de noradrenalina para manter PAM ≥ 65. Qual a classificação e a meta terapêutica inicial?",
    alternativas: [
      { letra: "A", texto: "Sepse sem disfunção — apenas manter hidratação e antibiótico.", correta: false, comentario: "Há hipotensão refratária a volume com vasopressor e hiperlactatemia: é choque, não sepse simples." },
      { letra: "B", texto: "Choque séptico — antibiótico na primeira hora, cultura antes do antibiótico (se não atrasar), vasopressor para PAM ≥ 65 mmHg e reavaliação do lactato.", correta: true, comentario: "Choque séptico = necessidade de vasopressor para PAM ≥ 65 + lactato > 2 apesar da reposição volêmica adequada. O pacote da Surviving Sepsis prioriza antibiótico precoce, controle do foco e clareamento do lactato." },
      { letra: "C", texto: "Choque hipovolêmico — repetir 30 mL/kg de cristaloide antes de qualquer vasopressor.", correta: false, comentario: "Insistir só em volume após reposição adequada gera congestão; o vasopressor já está indicado." },
      { letra: "D", texto: "Choque cardiogênico — iniciar dobutamina como primeira droga.", correta: false, comentario: "O contexto é infeccioso com vasoplegia; inotrópico não é a primeira escolha." },
    ],
    dificuldade: "avancada",
    estilo: "caso",
    tags: ["sepse", "choque séptico", "lactato", "Surviving Sepsis"],
    fonte: FONTE,
  },
  {
    id: "orig-inf-02",
    subtemaId: "inf--arboviroses--dengue-classificacao-e-manejo",
    disciplinaId: "inf",
    enunciado:
      "Paciente no 5º dia de dengue apresenta queda da febre acompanhada de dor abdominal intensa, vômitos persistentes e hematócrito subindo com plaquetas caindo. Qual a interpretação e a conduta?",
    alternativas: [
      { letra: "A", texto: "Melhora clínica — a defervescência indica resolução; liberar para casa.", correta: false, comentario: "Erro clássico e perigoso: a defervescência marca justamente a entrada na fase crítica, quando ocorre o extravasamento plasmático." },
      { letra: "B", texto: "Dengue com sinais de alarme — internar e hidratar por via endovenosa, monitorando hematócrito e diurese.", correta: true, comentario: "Dor abdominal intensa e vômitos persistentes são sinais de alarme; a hemoconcentração confirma extravasamento. Conduta: grupo C — reposição EV imediata e vigilância." },
      { letra: "C", texto: "Dengue sem sinais de alarme — hidratação oral domiciliar e retorno em 48 h.", correta: false, comentario: "Os sinais de alarme já estão presentes; manejo domiciliar é inadequado." },
      { letra: "D", texto: "Transfundir plaquetas imediatamente pela queda plaquetária.", correta: false, comentario: "A plaquetopenia isolada não indica transfusão na dengue; o problema é o extravasamento plasmático, tratado com volume." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["dengue", "sinais de alarme", "fase crítica"],
    fonte: FONTE,
  },

  // ── CIRURGIA ────────────────────────────────────────────────────
  {
    id: "orig-cir-01",
    subtemaId: "cir--trauma--atls-atendimento-inicial",
    disciplinaId: "cir",
    enunciado:
      "Vítima de colisão automobilística chega com PA 80/50, FC 130, turgência jugular, abafamento de bulhas e murmúrio vesicular presente e simétrico. Qual a hipótese e a conduta imediata?",
    alternativas: [
      { letra: "A", texto: "Pneumotórax hipertensivo — descompressão torácica com agulha.", correta: false, comentario: "No hipertensivo o murmúrio estaria ABOLIDO no hemitórax afetado, com desvio de traqueia — aqui está simétrico." },
      { letra: "B", texto: "Tamponamento cardíaco (tríade de Beck) — pericardiocentese ou toracotomia conforme disponibilidade.", correta: true, comentario: "Hipotensão + turgência jugular + abafamento de bulhas = tríade de Beck, com pulmões limpos. É choque obstrutivo: drenar o pericárdio é o que salva." },
      { letra: "C", texto: "Choque hemorrágico classe IV — apenas transfusão maciça.", correta: false, comentario: "A hemorragia cursaria com jugulares COLABADAS; a turgência aponta obstrução ao enchimento." },
      { letra: "D", texto: "Contusão miocárdica — apenas monitorização e troponina.", correta: false, comentario: "Não explica a tríade nem justifica conduta expectante diante de instabilidade." },
    ],
    dificuldade: "avancada",
    estilo: "caso",
    tags: ["trauma", "tamponamento", "tríade de Beck", "ATLS"],
    fonte: FONTE,
  },
  {
    id: "orig-cir-02",
    subtemaId: "cir--abdome-agudo--apendicite-aguda",
    disciplinaId: "cir",
    enunciado:
      "Homem de 24 anos com dor periumbilical que migrou para a fossa ilíaca direita há 14 horas, anorexia, febre 37,9 °C, Blumberg positivo e leucocitose de 15.000. Qual a conduta mais apropriada?",
    alternativas: [
      { letra: "A", texto: "Apendicectomia, após antibiótico e analgesia — o diagnóstico é clínico e a imagem não é obrigatória neste quadro típico.", correta: true, comentario: "Homem jovem com quadro clássico e escore de Alvarado alto dispensa imagem obrigatória. Analgesia NÃO mascara o diagnóstico nem atrasa a cirurgia — é conduta humanizada e correta." },
      { letra: "B", texto: "Aguardar 24 h em observação sem analgesia, para não mascarar o exame físico.", correta: false, comentario: "Mito antigo e já refutado: negar analgesia não melhora a acurácia e é desnecessariamente cruel; postergar aumenta o risco de perfuração." },
      { letra: "C", texto: "Antibiótico isolado por 10 dias, sem cirurgia, para todos os casos.", correta: false, comentario: "O tratamento conservador é opção selecionada (apendicite não complicada, sem apendicolito, com paciente informado), não conduta universal." },
      { letra: "D", texto: "Colonoscopia de urgência para excluir neoplasia.", correta: false, comentario: "Sem indicação no quadro agudo e com risco de perfuração." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["apendicite", "Alvarado", "abdome agudo"],
    fonte: FONTE,
  },

  // ── MFC ─────────────────────────────────────────────────────────
  {
    id: "orig-mfc-01",
    subtemaId: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade",
    disciplinaId: "mfc",
    enunciado:
      "Um teste de rastreamento tem sensibilidade de 95% e especificidade de 90%. Aplicado numa população com prevalência de 1% da doença, o que acontece com o valor preditivo positivo (VPP)?",
    alternativas: [
      { letra: "A", texto: "Permanece alto, pois a sensibilidade é de 95%.", correta: false, comentario: "Confunde propriedades do teste com desempenho na população — sensibilidade não determina o VPP." },
      { letra: "B", texto: "Será baixo, pois em prevalência muito baixa os falsos-positivos superam os verdadeiros-positivos.", correta: true, comentario: "Com 1% de prevalência em 10.000 pessoas: 95 verdadeiros-positivos contra ~990 falsos-positivos → VPP ≈ 9%. É a razão de não se rastrear doença rara em população geral." },
      { letra: "C", texto: "Será exatamente 95%, igual à sensibilidade.", correta: false, comentario: "VPP e sensibilidade são grandezas distintas; coincidem apenas por acaso." },
      { letra: "D", texto: "Não pode ser calculado sem conhecer a incidência.", correta: false, comentario: "Basta prevalência, sensibilidade e especificidade (teorema de Bayes)." },
    ],
    dificuldade: "avancada",
    estilo: "exame",
    tags: ["VPP", "prevalência", "rastreamento", "Bayes"],
    fonte: FONTE,
  },
  {
    id: "orig-mfc-02",
    subtemaId: "mfc--prevencao--prevencao-quaternaria",
    disciplinaId: "mfc",
    enunciado:
      "Um homem de 75 anos, assintomático, com expectativa de vida estimada em 5 anos por comorbidades, solicita dosagem de PSA após ver uma propaganda. O médico explica os riscos de sobrediagnóstico e sobretratamento e, em decisão compartilhada, não solicita o exame. Essa conduta exemplifica:",
    alternativas: [
      { letra: "A", texto: "Prevenção primária.", correta: false, comentario: "A primária evita a doença ocorrer (ex.: vacinação), não é o caso." },
      { letra: "B", texto: "Prevenção secundária.", correta: false, comentario: "A secundária é justamente o rastreamento — o oposto do que foi feito aqui." },
      { letra: "C", texto: "Prevenção terciária.", correta: false, comentario: "A terciária reabilita quem já tem a doença estabelecida." },
      { letra: "D", texto: "Prevenção quaternária — proteger o paciente de intervenção médica desnecessária e do dano dela decorrente.", correta: true, comentario: "Prevenção quaternária: evitar o excesso de medicalização. Rastrear PSA com expectativa de vida < 10 anos gera sobrediagnóstico sem ganho de sobrevida." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["prevenção quaternária", "sobrediagnóstico", "PSA"],
    fonte: FONTE,
  },
];
