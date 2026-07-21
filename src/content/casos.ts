import type { CasoClinico } from "@/domain/content/types";
import { CASOS_EXTRAIDOS } from "./casos-extraidos";

/**
 * Casos clínicos — formato OMED/Einstein.
 *
 * Cada caso é revelado por ETAPAS: o estudante lê a vinheta, responde a
 * pergunta da etapa mentalmente, e só então revela o raciocínio. É o oposto de
 * ler um caso pronto — treina a decisão, que é o que a prova cobra.
 *
 * Ancorados em diretriz (MS, FEBRASGO, SBP, ACOG, Surviving Sepsis, TG18).
 */
export const CASOS: CasoClinico[] = [
  ...CASOS_EXTRAIDOS,
  // ── GO ────────────────────────────────────────────────────────
  {
    id: "caso-go-01",
    disciplinaId: "go",
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
    titulo: "Gestante de 34 semanas com cefaleia e epigastralgia",
    resumo: "Cefaleia, escotomas e dor epigástrica em gestante hipertensa. Da suspeita à conduta que salva.",
    dificuldade: "avancada",
    tags: ["pré-eclâmpsia", "iminência de eclâmpsia", "sulfato de magnésio"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo:
          "**Mariana, 26 anos, primigesta, 34 semanas** (DUM confiável, USG do 1º trimestre concordante).\n\nChega ao pronto-socorro obstétrico com **cefaleia holocraniana intensa há 6 horas**, que não melhorou com dipirona. Relata **\"pontos brilhantes\" na visão** e **dor \"em faixa\" no estômago** que começou há 2 horas. Nega perda de líquido, sangramento ou contrações.\n\nPré-natal com 7 consultas, sem intercorrências até a última consulta (há 10 dias), quando a PA era 128 × 82 mmHg.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo:
          "- **PA 168 × 112 mmHg** (confirmada em nova medida após 15 min: 164 × 108)\n- FC 92 bpm · FR 20 irpm · Tax 36,4 °C\n- Consciente, orientada, **hiperreflexia patelar (3+/4+)**\n- Edema de membros inferiores 2+/4+ e de face\n- **Dor à palpação de hipocôndrio direito**\n- AU 31 cm · BCF 142 bpm · útero tônus normal, sem contrações",
        pergunta:
          "Antes de qualquer exame laboratorial: qual é a síndrome, e o que essa tríade de sintomas significa?",
        resposta:
          "**Iminência de eclâmpsia.**\n\nA tríade **cefaleia + escotomas + epigastralgia** (dor em barra de Chaussier), somada a **PA ≥ 160 × 110** e **hiperreflexia**, é o aviso de que a convulsão está próxima.\n\n👉 O ponto que decide a prova: **não se espera a convulsão nem o resultado do laboratório**. O quadro clínico já basta para agir — a paciente está em pré-eclâmpsia com sinais de gravidade, com sinais neurológicos premonitórios.",
      },
      {
        tipo: "conduta",
        titulo: "Conduta imediata",
        corpo: "Você tem acesso venoso, monitorização e a medicação disponível.",
        pergunta: "Quais são as DUAS intervenções medicamentosas imediatas — e qual delas é a prioridade?",
        resposta:
          "**1) Sulfato de magnésio — a prioridade.** É o que previne a convulsão.\n- **Zuspan:** 4 g EV de ataque em 10–15 min + **1 g/h** EV contínuo;\n- Monitorar **reflexo patelar, diurese (≥ 25 mL/h) e FR (≥ 12 irpm)**;\n- Antídoto: **gluconato de cálcio**.\n\n**2) Anti-hipertensivo** para a PA grave: **hidralazina EV**, labetalol ou **nifedipina oral** (nunca sublingual). Alvo: reduzir a PA sem hipotensão brusca — **não** normalizar.\n\n⚠️ **A pegadinha clássica:** o sulfato **não é anti-hipertensivo**. Ele não baixa a pressão — previne a convulsão. São dois problemas distintos, com duas drogas distintas.",
      },
      {
        tipo: "laboratorio",
        titulo: "Laboratório",
        corpo:
          "| Exame | Resultado |\n|---|---|\n| Hemoglobina | 10,8 g/dL |\n| **Plaquetas** | **74.000/mm³** |\n| **AST / ALT** | **148 / 132 U/L** |\n| **LDH** | **820 U/L** |\n| Creatinina | 0,9 mg/dL |\n| Bilirrubina indireta | 1,6 mg/dL |\n| Esfregaço | **esquizócitos presentes** |\n| Proteinúria (fita) | 2+ |",
        pergunta: "O laboratório muda o diagnóstico. Para qual?",
        resposta:
          "**Síndrome HELLP.**\n\n- **H**emólise: esquizócitos + LDH 820 + BI elevada;\n- **E**levated **L**iver enzymes: AST/ALT > 2× o normal;\n- **L**ow **P**latelets: 74.000 (< 100.000).\n\n👉 Note: a **plaquetopenia é a alteração mais precoce e sensível** da HELLP.\n\n⚠️ E o detalhe que engana: a HELLP **pode ocorrer com PA apenas moderadamente elevada** — não é a pressão que define o diagnóstico. Aqui ela estava alta, mas nem sempre está.",
      },
      {
        tipo: "desfecho",
        titulo: "Resolução",
        corpo: "Paciente estabilizada, sulfato em curso, PA em queda para 148 × 94 mmHg.",
        pergunta: "Qual é o tratamento definitivo, e ele muda por ter 34 semanas?",
        resposta:
          "**O tratamento definitivo é a resolução da gestação (parto)** — e a **síndrome HELLP é indicação de interrupção independentemente da idade gestacional**.\n\nCom 34 semanas e HELLP instalada, **não há conduta expectante**: o risco materno (rotura hepática, CIVD, AVC) supera qualquer ganho de maturidade fetal.\n\n- Via de parto: obstétrica (a HELLP por si não indica cesárea; considerar plaquetas para anestesia neuroaxial — em geral **< 70–80.000** contraindica);\n- **Manter o sulfato por ≥ 24 h após o parto**;\n- Vigiar: a HELLP **pode piorar nas primeiras 48 h do puerpério**.",
      },
    ],
    discussao:
      "Este caso testa três decisões que separam quem entendeu de quem decorou:\n\n1. **Agir pela clínica, não pelo laboratório.** A iminência de eclâmpsia é diagnóstico clínico — esperar exames para dar sulfato é o erro que mata.\n2. **Separar os dois problemas.** Convulsão (sulfato) e hipertensão grave (anti-hipertensivo) são tratados por drogas diferentes. Confundir isso é a pegadinha mais cobrada do tema.\n3. **HELLP interrompe a gestação em qualquer idade gestacional.** A tentação de \"ganhar tempo\" com corticoide aos 34 semanas não se aplica quando a HELLP já está instalada.",
    referencias: [
      "FEBRASGO — Pré-eclâmpsia / Síndrome HELLP",
      "ACOG — Gestational Hypertension and Preeclampsia (Practice Bulletin)",
      "Ministério da Saúde — Manual de Gestação de Alto Risco",
    ],
  },

  // ── Pediatria ─────────────────────────────────────────────────
  {
    id: "caso-ped-01",
    disciplinaId: "ped",
    subtemaId: "ped--emergencias-pediatricas--desidratacao-e-reidratacao",
    titulo: "Lactente com diarreia e prostração",
    resumo: "Da classificação de desidratação à expansão volêmica: o cálculo que não pode errar.",
    dificuldade: "intermediaria",
    tags: ["desidratação", "choque", "plano C"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo:
          "**Lactente de 11 meses, 9 kg**, trazido pela mãe com **diarreia aquosa há 4 dias** (8–10 episódios/dia), **vômitos há 2 dias**. Aceita pouco líquido desde ontem.\n\nA mãe relata que ele está **\"muito molinho e dormindo demais\"** desde a manhã. **Última diurese há mais de 8 horas.**\n\nSem febre alta. Sem sangue nas fezes. Vacinação em dia (incluindo rotavírus).",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo:
          "- **Letárgico**, responde pouco ao estímulo\n- **Olhos muito encovados**, ausência de lágrimas\n- **Mucosas muito secas**\n- **Prega cutânea desfaz em ~3 segundos**\n- **Tempo de enchimento capilar 4 s**\n- **Pulsos radiais finos**, FC 178 bpm\n- PA 74 × 40 mmHg · FR 52 irpm · afebril",
        pergunta: "Classifique segundo o Ministério da Saúde. Qual o plano?",
        resposta:
          "**Desidratação GRAVE — Plano C.**\n\nOs achados que definem: **letargia** (rebaixamento de consciência), **incapacidade de beber**, **prega > 2 s**, **TEC > 3 s** e **pulsos finos**.\n\n👉 Mais do que desidratação grave, este lactente está em **choque hipovolêmico** — a taquicardia com pulsos finos e TEC alargado é choque, mesmo com PA ainda \"limítrofe\" (a criança compensa até descompensar de repente).\n\n⚠️ **A via oral está contraindicada** aqui: rebaixamento de consciência = risco de aspiração.",
      },
      {
        tipo: "conduta",
        titulo: "Conduta",
        corpo: "Você conseguiu acesso venoso periférico na primeira tentativa.",
        pergunta: "Qual solução, qual dose, e quanto em mL para esta criança?",
        resposta:
          "**Expansão volêmica rápida com cristaloide ISOTÔNICO:**\n- **Soro fisiológico 0,9%** ou **Ringer lactato**;\n- **20 mL/kg em bolus**, o mais rápido possível (15–20 min);\n- **20 × 9 kg = 180 mL**.\n\n**Reavaliar após cada bolus** (TEC, pulsos, consciência, diurese) e **repetir até 2–3 vezes** se persistirem os sinais de choque.\n\n⚠️ **Erros clássicos:**\n- **Soro glicosado 5% NUNCA** — é hipotônico, não expande o intravascular e causa **hiponatremia**;\n- Se não conseguir acesso venoso rapidamente → **via intraóssea**, sem hesitar.\n\nApós reverter o choque, seguir as fases do Plano C (< 1 ano: **30 mL/kg na 1ª hora + 70 mL/kg nas 5 h seguintes**).",
      },
      {
        tipo: "evolucao",
        titulo: "Evolução",
        corpo:
          "Após **2 expansões (360 mL total)**, a criança melhora: TEC 2 s, pulsos cheios, mais responsiva, FC 148 bpm. Iniciada a fase de reposição.\n\n**4 horas depois**, evolui com **distensão abdominal importante** e **ausência de ruídos hidroaéreos** à ausculta. Abdome timpânico, sem sinais de irritação peritoneal.",
        pergunta: "O que aconteceu?",
        resposta:
          "**Íleo paralítico por HIPOCALEMIA.**\n\nO raciocínio: a diarreia perde **potássio pelas fezes** de forma importante; a reposição volêmica **sem potássio** dilui ainda mais o K⁺ sérico. O resultado clássico é o **íleo paralítico** — distensão abdominal com silêncio à ausculta.\n\n**Conduta:** dosar eletrólitos e **repor potássio** (na hidratação de manutenção, após confirmar diurese presente).\n\n👉 Essa sequência — expansão → melhora → distensão com silêncio auscultatório — é a pegadinha de prova. Não é abdome cirúrgico; é eletrólito.",
      },
    ],
    discussao:
      "O caso cobra três coisas em cadeia:\n\n1. **Reconhecer choque, não só \"desidratação\".** Letargia + TEC alargado + pulsos finos = Plano C, via EV, sem tentativa de TRO.\n2. **O cálculo correto:** 20 mL/kg de cristaloide **isotônico**. Glicosado é erro grave (hipotônico → hiponatremia → edema cerebral).\n3. **Antecipar a hipocalemia.** Íleo paralítico após reidratação não é complicação cirúrgica — é potássio.",
    referencias: [
      "Ministério da Saúde — Manejo da diarreia aguda na infância (Planos A, B e C)",
      "Sociedade Brasileira de Pediatria — Tratado de Pediatria",
      "OMS — Treatment of diarrhoea: a manual for physicians",
    ],
  },

  // ── Infectologia ──────────────────────────────────────────────
  {
    id: "caso-inf-01",
    disciplinaId: "inf",
    subtemaId: "inf--meningites--bacteriana-vs-viral",
    titulo: "Idoso com febre, cefaleia e confusão mental",
    resumo: "A decisão que define o desfecho: quando puncionar, quando fazer TC, e o que não pode esperar.",
    dificuldade: "avancada",
    tags: ["meningite", "punção lombar", "Listeria"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo:
          "**Homem, 68 anos**, trazido pela filha ao pronto-socorro com **febre 39 °C há 1 dia**, **cefaleia intensa** e **confusão mental progressiva** desde a manhã.\n\nAntecedentes: **hipertensão**, **diabetes tipo 2**, **etilismo crônico**. Sem cirurgias ou trauma recente. Nega uso de antibiótico recente.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo:
          "- **Glasgow 13** (confuso, obedece comandos simples)\n- Tax 39,2 °C · PA 128 × 76 · FC 104 bpm\n- **Rigidez de nuca presente**\n- **Kernig e Brudzinski negativos**\n- **Sem déficit focal**, pupilas isocóricas e fotorreagentes\n- **Sem papiledema** à fundoscopia\n- Sem petéquias ou púrpura",
        pergunta: "Kernig e Brudzinski negativos afastam meningite?",
        resposta:
          "**Não. De jeito nenhum.**\n\nKernig e Brudzinski têm **sensibilidade baixa** (algo em torno de **5–30%**) — a **ausência não exclui** meningite. A tríade clássica completa (febre + cefaleia + rigidez de nuca) aparece numa **minoria** dos casos.\n\n👉 O que manda aqui é a **suspeita clínica**: febre + cefaleia + alteração do estado mental em idoso já é suficiente para investigar meningite agressivamente.",
      },
      {
        tipo: "conduta",
        titulo: "A decisão crítica",
        corpo:
          "A equipe discute: alguns querem pedir TC de crânio antes da punção lombar, por causa da confusão mental. A TC vai demorar cerca de 90 minutos para ficar pronta.",
        pergunta: "Pedir TC antes de puncionar? E o que NÃO pode esperar?",
        resposta:
          "**Duas respostas, e a segunda é a que salva:**\n\n**1) Sobre a TC:** os preditores de herniação são **imunossupressão, doença de SNC prévia, convulsão recente, papiledema, déficit focal ou rebaixamento importante da consciência**. Este paciente tem **Glasgow 13** e **diabetes** — é uma zona cinzenta que na prática justifica a TC.\n\n**2) MAS — e aqui está o ponto:** se a TC for indicada, **NÃO se espera o exame para tratar**. A sequência correta é:\n\n**Hemoculturas → ANTIBIÓTICO + dexametasona → TC → punção lombar**\n\n⚠️ **O erro que mata é atrasar o antibiótico.** Cada hora de atraso aumenta a mortalidade. A punção pode esperar 90 minutos; o antibiótico não.",
      },
      {
        tipo: "laboratorio",
        titulo: "Esquema empírico",
        corpo: "Você vai prescrever agora, antes da TC.",
        pergunta: "Qual esquema empírico para ESTE paciente especificamente? O que ele tem de diferente?",
        resposta:
          "**Ceftriaxona + Vancomicina + AMPICILINA** — e a ampicilina é o ponto da questão.\n\n- **Ceftriaxona 2 g EV 12/12h** — pneumococo e meningococo;\n- **Vancomicina** — pneumococo com sensibilidade reduzida a cefalosporina;\n- **⚠️ AMPICILINA 2 g EV 4/4h — para LISTERIA.**\n\n**Por que Listeria aqui?** O paciente tem **68 anos (> 50)** **e** é **etilista** — dois fatores de risco. E o detalhe decisivo: **a cefalosporina de 3ª geração NÃO cobre Listeria**. Esquecer a ampicilina nesse perfil é deixar o agente descoberto.\n\n**+ Dexametasona 0,15 mg/kg EV 6/6h**, **junto ou pouco antes da 1ª dose** do antibiótico — depois disso, perde parte do benefício.",
      },
      {
        tipo: "desfecho",
        titulo: "Líquor e desfecho",
        corpo:
          "TC sem sinais de efeito de massa. Punção realizada:\n\n| Parâmetro | Resultado |\n|---|---|\n| Aspecto | **Turvo** |\n| Células | **2.400/mm³ (88% PMN)** |\n| Proteína | **220 mg/dL** |\n| Glicose liquórica | **18 mg/dL** (glicemia 140) |\n| Gram | **cocos Gram-positivos** |",
        pergunta: "Interprete o líquor e ajuste a conduta.",
        resposta:
          "**Meningite bacteriana** — padrão inequívoco:\n- Turvo, **PMN predominante**, proteína alta;\n- **Glicose 18 com glicemia 140 = 13% da glicemia** (< 40% → consumo bacteriano).\n\n**Gram com cocos Gram-positivos → pneumococo.** Isso permite **descalonar**: suspender a ampicilina (Listeria é bacilo Gram-positivo, afastada pelo Gram) e manter ceftriaxona + vancomicina até o antibiograma.\n\n**Duração:** pneumococo = **10–14 dias**.\n\n⚠️ **Antes da alta: audiometria.** A **perda auditiva neurossensorial** é a principal sequela, especialmente na pneumocócica — e é justamente o que a dexametasona precoce reduz.",
      },
    ],
    discussao:
      "Este é o caso que mais reprova por uma razão só: **as pessoas atrasam o antibiótico**.\n\n1. **Sinais meníngeos negativos não excluem** — sensibilidade baixa.\n2. **TC quando indicada, mas nunca antes do antibiótico.** Hemocultura → ATB + dexa → TC → PL.\n3. **> 50 anos, etilista, gestante ou imunossuprimido ⇒ ampicilina**, porque a cefalosporina não cobre Listeria.\n4. **Dexametasona junto/antes da 1ª dose**, e **audiometria após a alta**.",
    referencias: [
      "IDSA — Practice Guidelines for the Management of Bacterial Meningitis",
      "Ministério da Saúde — Guia de Vigilância em Saúde (meningites)",
      "Material do usuário — Infectologia OMED · 15 Temas",
    ],
  },

  // ── Cirurgia ──────────────────────────────────────────────────
  {
    id: "caso-cir-01",
    disciplinaId: "cir",
    subtemaId: "cir--abdome-agudo--colecistite-e-colangite",
    titulo: "Dor em hipocôndrio direito com icterícia e febre",
    resumo: "Colecistite ou colangite? A distinção muda tudo — inclusive o que salva o paciente.",
    dificuldade: "avancada",
    tags: ["colangite", "Charcot", "CPRE"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo:
          "**Mulher, 62 anos, obesa**, com **dor em hipocôndrio direito há 2 dias**, agora **contínua e intensa**. Refere **febre com calafrios intensos** desde ontem e que a **filha notou os olhos amarelados** hoje pela manhã.\n\nAntecedente: episódios prévios de \"dor na boca do estômago\" após alimentação gordurosa, que passavam sozinhos em algumas horas.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo:
          "- **Icterícia 2+/4+** de escleras e pele\n- Tax **38,9 °C** · **PA 96 × 58 mmHg** · FC 116 bpm\n- **Sonolenta, desorientada no tempo**\n- Dor à palpação de hipocôndrio direito, **Murphy duvidoso**\n- Sem irritação peritoneal difusa",
        pergunta: "Nomeie a síndrome. Quantos elementos você reconhece?",
        resposta:
          "**Colangite aguda GRAVE — pêntade de Reynolds.**\n\n- **Tríade de Charcot:** dor em HCD ✓ + febre com calafrios ✓ + **icterícia** ✓\n- **+ Hipotensão** (96 × 58) ✓\n- **+ Confusão mental** ✓\n\n👉 **A icterícia é o que separa colangite de colecistite.** Colecistite obstrui o **cístico** (vesícula) — não dá icterícia. Colangite obstrui o **colédoco** — dá icterícia e sepse.\n\n⚠️ Pêntade de Reynolds = **choque séptico de foco biliar**. Isso é emergência, não \"observar e ver\".",
      },
      {
        tipo: "laboratorio",
        titulo: "Laboratório",
        corpo:
          "| Exame | Resultado |\n|---|---|\n| Leucócitos | 19.800 (12% bastões) |\n| **Bilirrubina total** | **6,8** (direta **5,2**) |\n| **Fosfatase alcalina** | **480 U/L** |\n| **GGT** | **610 U/L** |\n| AST / ALT | 92 / 88 U/L |\n| Amilase / Lipase | normais |\n| **Lactato** | **3,8 mmol/L** |\n| Creatinina | 1,6 mg/dL |",
        pergunta: "Que padrão é este, e o que ele localiza?",
        resposta:
          "**Padrão COLESTÁTICO** — e ele localiza a obstrução na **via biliar**.\n\n- **FA e GGT muito elevadas** + **hiperbilirrubinemia DIRETA** = colestase (obstrução);\n- **Transaminases apenas discretamente elevadas** — se estivessem em milhares, o padrão seria **hepatocelular** (hepatite), outra história;\n- **Amilase/lipase normais** afastam pancreatite biliar associada;\n- **Lactato 3,8 + creatinina 1,6** = **disfunção orgânica** → é sepse.",
      },
      {
        tipo: "conduta",
        titulo: "A conduta que define o desfecho",
        corpo:
          "Você inicia ressuscitação volêmica e antibiótico de amplo espectro. Após 3 horas, a paciente permanece hipotensa e sonolenta, apesar de volume e antibiótico adequados.",
        pergunta: "Por que ela não melhorou? O que falta?",
        resposta:
          "**Falta DRENAR a via biliar.** Antibiótico sozinho não resolve colangite.\n\n**O porquê fisiopatológico:** a obstrução eleva a pressão intraductal; acima de ~20 cmH₂O ocorre **refluxo colangiovenoso** — as bactérias são lançadas direto na circulação. **Enquanto a via biliar estiver obstruída e sob pressão, o paciente continua bacterêmico**, por mais antibiótico que receba.\n\n**Conduta: CPRE com papilotomia de URGÊNCIA** (1ª escolha para drenagem). Alternativas se a CPRE não for viável: drenagem trans-hepática percutânea ou cirúrgica.\n\n👉 **É o mesmo princípio da sepse: controle do foco.** Sem controlar o foco, nenhum antibiótico funciona.",
      },
      {
        tipo: "desfecho",
        titulo: "Depois da drenagem",
        corpo:
          "CPRE realizada com retirada de cálculo do colédoco e papilotomia. A paciente melhora em 12 horas: afebril, PA 118 × 72, lúcida, lactato normalizado.",
        pergunta: "A vesícula fica? Qual o próximo passo e quando?",
        resposta:
          "**Não fica — colecistectomia é indicada**, já que a origem é litiásica (a vesícula é a fábrica dos cálculos; deixá-la é garantir recidiva).\n\n**Quando:** **na mesma internação**, após a estabilização — não se manda para casa para operar \"daqui a 6 semanas\".\n\n👉 Isso conversa com a mudança de paradigma da **WSES 2020** para colecistite: **colecistectomia precoce (≤ 7 dias), na mesma internação**, é superior a esperar \"esfriar\". Menor tempo total de internação, sem aumento de complicações.\n\n**E o exame que confirmaria antes de indicar a CPRE, se houvesse tempo?** **CPRM** — não invasiva. Mas na colangite grave, não se atrasa a drenagem para confirmar por imagem.",
      },
    ],
    discussao:
      "O caso gira em torno de uma distinção e um princípio:\n\n1. **Icterícia separa colangite de colecistite.** Cístico obstruído = colecistite (sem icterícia). Colédoco obstruído = colangite (com icterícia e sepse).\n2. **Charcot → Reynolds** = a colangite virou choque séptico.\n3. **O princípio que vale para toda a medicina: controle do foco.** Antibiótico sem drenagem na colangite é como antibiótico sem drenar um abscesso — não funciona.\n4. **CPRM confirma; CPRE trata.** E na colangite grave, drena-se sem esperar confirmação.",
    referencias: [
      "Tokyo Guidelines 2018 (TG18) — colangite e colecistite agudas",
      "WSES 2020 — Guidelines on acute calculous cholecystitis",
      "Sabiston — Textbook of Surgery",
    ],
  },
  {
    id: "caso-cir-02",
    disciplinaId: "cir",
    subtemaId: "cir--abdome-agudo--colecistite-e-colangite",
    titulo: "Cólica biliar, colecistite ou coledocolitíase?",
    resumo: "Três apresentações do mesmo problema biliar — a duração da dor e o padrão dos exames é que separam uma da outra.",
    dificuldade: "intermediaria",
    tags: ["cólica biliar", "colecistite", "coledocolitíase", "Murphy"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo:
          "**Mulher, 45 anos, obesa, multípara**, relata episódios recorrentes de dor em hipocôndrio direito após refeições gordurosas, cada um durando 1–2 horas e cedendo espontaneamente — há meses.\n\nHoje, a dor começou há **18 horas** e **não cedeu** — está contínua, associada a náuseas e vômitos. Sem febre até o momento.",
        pergunta: "Diferencie os episódios prévios do episódio atual: qual a hipótese para cada um?",
        resposta:
          "**Episódios prévios: cólica biliar simples** — obstrução transitória do ducto cístico por cálculo, sem inflamação da parede vesicular. Duração tipicamente curta (horas), sem febre, cede espontaneamente quando o cálculo se desimpacta.\n\n**Episódio atual: dor persistente > 6 horas + náusea/vômito** sugere progressão para **colecistite aguda** — a obstrução não se desfez, e a estase biliar mantida inflama a parede da vesícula.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo: "Temperatura 38,2 °C, FC 96 bpm. Dor à palpação em hipocôndrio direito com interrupção da inspiração profunda durante a palpação (sinal de Murphy positivo). Sem icterícia.",
        pergunta: "O Murphy positivo + febre confirma o quê — e por que a AUSÊNCIA de icterícia aqui é uma pista importante?",
        resposta:
          "Confirma **colecistite aguda**. A ausência de icterícia é a pista-chave: a obstrução é do **ducto cístico** (drena só a vesícula), não do colédoco — a bilirrubina permanece normal ou pouco alterada.\n\nSe fosse **colangite**, a obstrução seria do **colédoco** (via biliar principal), e aí sim esperaríamos icterícia associada à febre.",
      },
      {
        tipo: "laboratorio",
        titulo: "Laboratório e imagem",
        corpo:
          "Leucocitose com desvio à esquerda. Bilirrubina e transaminases normais. USG: parede vesicular espessada (> 3 mm), líquido pericolecístico, cálculo impactado no colo/infundíbulo, Murphy ultrassonográfico positivo.",
        pergunta: "A USG confirma o diagnóstico. Qual a conduta e o timing recomendado pela diretriz atual (WSES 2020)?",
        resposta:
          "**Colecistectomia videolaparoscópica precoce** — dentro de 7 dias do início dos sintomas (idealmente nas primeiras 72h), **na mesma internação**.\n\n👉 É a mudança de paradigma da **WSES 2020**: abandonar a antiga conduta de \"esfriar\" o quadro por 6 semanas antes de operar. Cirurgia precoce reduz tempo total de internação, sem aumento de complicações.",
      },
      {
        tipo: "evolucao",
        titulo: "Evolução na espera pré-operatória",
        corpo: "Dois dias depois, ainda aguardando vaga cirúrgica, a paciente evolui com icterícia (bilirrubina total 4,2 mg/dL, padrão colestático) e piora do quadro geral.",
        pergunta: "O que aconteceu, e como isso muda a conduta imediata?",
        resposta:
          "Provável **migração do cálculo para o colédoco (coledocolitíase)** — com risco de evoluir para **colangite** se sobrevier infecção sobre essa obstrução.\n\n**Muda a conduta:** solicitar CPRM (ou colangiografia intraoperatória) para confirmar a coledocolitíase; confirmada, indicar **CPRE** (papilotomia + extração do cálculo) antes ou durante a colecistectomia, conforme o protocolo do serviço.",
      },
      {
        tipo: "desfecho",
        titulo: "Desfecho",
        corpo: "CPRE confirma e remove cálculo do colédoco distal com sucesso. Paciente segue para colecistectomia videolaparoscópica no mesmo internamento, com boa evolução.",
        pergunta: "Em uma frase: por que os 3 quadros deste caso são o MESMO problema em estágios diferentes?",
        resposta:
          "Porque formam um **espectro contínuo**: cálculo obstrui o cístico transitoriamente (**cólica biliar**) → obstrução persiste e inflama a vesícula (**colecistite**) → cálculo migra e obstrui o colédoco (**coledocolitíase**) → se infecta, vira **colangite**. A icterícia é o que separa \"doença só da vesícula\" de \"doença da via biliar principal\".",
      },
    ],
    discussao:
      "Três pontos-chave:\n\n1. **O espectro biliar é um continuum**: cólica biliar → colecistite → coledocolitíase → colangite, cada etapa definida por onde o cálculo está e há quanto tempo.\n2. **A icterícia é o divisor de águas** entre obstrução do cístico (só vesícula, sem icterícia) e obstrução do colédoco (via biliar principal, com icterícia).\n3. **WSES 2020 mudou o paradigma da colecistite** para cirurgia precoce na mesma internação — não mais \"esfriar\" por semanas.",
    referencias: [
      "WSES 2020 — Guidelines on acute calculous cholecystitis",
      "Tokyo Guidelines 2018 (TG18)",
      "Sabiston — Textbook of Surgery",
    ],
  },

  // ── MFC ───────────────────────────────────────────────────────
  {
    id: "caso-mfc-01",
    disciplinaId: "mfc",
    subtemaId: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade",
    titulo: "Um teste positivo nem sempre significa doença",
    resumo: "Um resultado positivo em rastreamento populacional gera dúvida: confiar no teste ou na prevalência da doença?",
    dificuldade: "intermediaria",
    tags: ["sensibilidade", "especificidade", "valor preditivo positivo", "prevalência"],
    etapas: [
      {
        tipo: "historia",
        titulo: "O cenário",
        corpo:
          "Você atua em uma unidade básica de saúde e realiza rastreamento de uma doença **rara** (prevalência de 1% na população) com um teste rápido de **sensibilidade 95%** e **especificidade 90%**.\n\nUma paciente assintomática, sem fatores de risco, tem resultado **POSITIVO**.",
        pergunta: "Antes de calcular qualquer coisa: qual pergunta você, como médico, deve se fazer diante desse resultado positivo numa doença rara?",
        resposta:
          "\"Qual a real probabilidade de a paciente ter a doença, dado esse resultado positivo?\" — ou seja, qual é o **Valor Preditivo Positivo (VPP)** desse teste **nesta população específica**, de prevalência baixa.\n\n👉 Sensibilidade e especificidade são propriedades **fixas** do teste (leem-se na vertical da tabela 2×2); o **VPP muda com a prevalência** (lê-se na horizontal).",
      },
      {
        tipo: "exame_fisico",
        titulo: "Fazendo as contas",
        corpo:
          "Suponha uma população de **10.000 pessoas** rastreadas. Prevalência de 1% → 100 doentes e 9.900 sadios. Sensibilidade 95%, especificidade 90%.",
        pergunta: "Quantos verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos você espera?",
        resposta:
          "Dos 100 doentes: **VP = 100 × 0,95 = 95**; **FN = 100 × 0,05 = 5**.\n\nDos 9.900 sadios: **VN = 9.900 × 0,90 = 8.910**; **FP = 9.900 × 0,10 = 990**.\n\nTotal de testes positivos = 95 + 990 = **1.085**.",
      },
      {
        tipo: "hipoteses",
        titulo: "Calculando o VPP",
        corpo: "Com esses números da tabela 2×2 em mãos...",
        pergunta: "Qual é o VPP desse teste, e o que isso significa na prática para essa paciente com resultado positivo?",
        resposta:
          "**VPP = VP / (VP + FP) = 95 / 1.085 ≈ 8,8%.**\n\nMesmo com um teste de boa sensibilidade/especificidade, numa doença **rara** a maioria absoluta dos resultados positivos (**91,2%**) é **falso positivo**. Não se deve tratar nem alarmar a paciente com base só nesse resultado — é necessário **confirmar com um teste mais específico (padrão-ouro)** antes de qualquer conduta definitiva.",
      },
      {
        tipo: "desfecho",
        titulo: "Desfecho",
        corpo: "A paciente é encaminhada para o teste confirmatório padrão-ouro, que vem negativo.",
        pergunta: "Isso configura um erro do teste rápido inicial? Como você explica esse resultado à paciente?",
        resposta:
          "**Não é um erro** no sentido de falha da tecnologia — é a matemática esperada de rastrear uma doença rara com um teste imperfeito: um número relevante de falsos positivos é **estatisticamente inevitável**, mesmo com um bom teste.\n\n**Explicação à paciente:** o teste de rastreio serve para **triagem** (alta sensibilidade = poucos casos perdidos), não para diagnóstico definitivo — por isso todo positivo em rastreio populacional precisa de confirmação antes de qualquer conclusão.",
      },
    ],
    discussao:
      "Três pontos-chave:\n\n1. **Sensibilidade e especificidade são propriedades intrínsecas do teste** — não mudam com a prevalência (leitura vertical da tabela 2×2).\n2. **VPP e VPN mudam com a prevalência** (leitura horizontal) — é por isso que o mesmo teste \"funciona diferente\" em populações diferentes.\n3. **Em doenças raras, mesmo testes muito bons geram muitos falsos positivos em números absolutos** — daí a necessidade de teste confirmatório antes de qualquer conduta, e o cuidado ao interpretar rastreamento em massa.",
    referencias: [
      "Fletcher & Fletcher — Epidemiologia Clínica",
      "Rouquayrol — Epidemiologia e Saúde",
    ],
  },
];
