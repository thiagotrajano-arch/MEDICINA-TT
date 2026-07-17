import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Resumos — Ginecologia & Obstetrícia.
 * Ancorados em FEBRASGO / ACOG / Ministério da Saúde.
 */

export const CONTEUDOS_GO: Record<string, ConteudoSubtema> = {
  "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia": {
    subtemaId: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
    titulo: "Pré-eclâmpsia e eclâmpsia",
    atualizadoEm: "2026-07-15",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "**Pré-eclâmpsia (PE):** hipertensão arterial (PA ≥ 140 × 90 mmHg em duas medidas com ≥ 4 h de intervalo) que surge **após 20 semanas** de gestação, em gestante previamente normotensa, associada a **proteinúria** OU a **disfunção de órgão-alvo** mesmo sem proteinúria.\n\n**Eclâmpsia:** ocorrência de **crise convulsiva tônico-clônica** (ou coma) em gestante com pré-eclâmpsia, não atribuível a outra causa.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "A raiz do problema é a **falha da segunda onda de invasão trofoblástica**: as arteríolas espiraladas não sofrem a remodelação fisiológica e permanecem como **vasos de alta resistência**, com camada muscular preservada.\n\nO resultado é **hipoperfusão placentária** → liberação de fatores **antiangiogênicos** (↑**sFlt-1**, ↓**PlGF**) → **disfunção endotelial sistêmica materna**, que explica todo o quadro: vasoconstrição (hipertensão), aumento da permeabilidade (edema), ativação plaquetária (plaquetopenia) e lesão de órgão-alvo.\n\nNo rim, a lesão característica é a **endoteliose glomerulocapilar**, responsável pela proteinúria.",
        figura: "go-pre-eclampsia-fisiopato",
      },
      {
        secao: "Critérios diagnósticos",
        corpo:
          "PA ≥ 140 × 90 mmHg após 20 semanas **+ pelo menos um**:\n\n- **Proteinúria:** ≥ 300 mg/24 h, ou relação proteína/creatinina ≥ 0,3, ou fita ≥ 1+;\n- **Ou disfunção de órgão-alvo** (mesmo sem proteinúria): plaquetopenia < 100.000/mm³; creatinina > 1,1 mg/dL (ou dobro do basal); transaminases ≥ 2× o normal; edema agudo de pulmão; sintomas cerebrais/visuais.",
      },
      {
        secao: "Classificação (diagnóstico diferencial)",
        corpo:
          "- **Hipertensão gestacional:** HAS após 20 sem, **sem** proteinúria e **sem** disfunção de órgão-alvo;\n- **Pré-eclâmpsia:** HAS após 20 sem **+** proteinúria ou disfunção de órgão-alvo;\n- **Hipertensão crônica:** diagnosticada **antes de 20 semanas** ou persistente após o puerpério;\n- **PE sobreposta à HAS crônica:** hipertensa crônica que desenvolve proteinúria nova/piora acentuada ou disfunção de órgão-alvo.",
      },
      {
        secao: "Sinais de gravidade",
        corpo:
          "Definem **PE com sinais de gravidade** (qualquer um):\n\n- PA ≥ **160 × 110** mmHg;\n- Plaquetopenia < 100.000/mm³;\n- Transaminases elevadas / dor persistente em hipocôndrio direito ou epigástrio;\n- Creatinina > 1,1 mg/dL ou injúria renal;\n- Edema agudo de pulmão;\n- Sintomas cerebrais ou visuais (cefaleia intensa, escotomas);\n- **Síndrome HELLP** (hemólise, ↑enzimas hepáticas, plaquetopenia).\n\n⚠️ A **magnitude da proteinúria (> 5 g) deixou de ser critério de gravidade** nas diretrizes atuais.",
      },
      {
        secao: "Iminência de eclâmpsia",
        corpo:
          "Tríade clássica de alerta: **cefaleia + escotomas + epigastralgia** (dor em barra de Chaussier), frequentemente com hiperreflexia.\n\nÉ o sinal de que a convulsão está próxima — **iniciar sulfato de magnésio imediatamente**, sem esperar a crise acontecer.",
      },
      {
        secao: "Conduta",
        corpo:
          "- **Sulfato de magnésio** é a droga de escolha para **prevenir e tratar convulsão** (eclâmpsia) na PE com sinais de gravidade:\n  - **Zuspan:** 4 g EV de ataque (10–15 min) + **1 g/h** EV contínuo;\n  - **Pritchard:** 4 g EV + 10 g IM de ataque (5 g em cada nádega), depois 5 g IM a cada 4 h.\n  - Manter por **≥ 24 h após o parto** ou após a última convulsão.\n  - Monitorar **reflexo patelar, diurese e frequência respiratória**; antídoto = **gluconato de cálcio**.\n- **Anti-hipertensivo** para PA grave (≥ 160 × 110): **hidralazina EV, labetalol ou nifedipina oral** (não sublingual). Alvo: reduzir sem hipotensão brusca — não normalizar a PA.\n- **Tratamento definitivo é a resolução da gestação (parto)** — momento individualizado pela idade gestacional e gravidade. A **PE sem gravidade a termo (≥ 37 sem) → indução do parto**.\n- **< 34 semanas estável:** conduta expectante com corticoide para maturação pulmonar e monitorização rigorosa materno-fetal.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **AAS em baixa dose (100–150 mg/dia)** para gestantes de **alto risco**, iniciado idealmente entre **12–16 semanas** (antes de 16 sem) e mantido até ~36 semanas;\n- **Suplementação de cálcio** em populações com baixa ingesta.\n\nNão previnem: repouso absoluto, dieta hipossódica, restrição hídrica, vitaminas C/E.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- Proteinúria **não é mais obrigatória** para o diagnóstico se houver disfunção de órgão-alvo.\n- Sulfato de magnésio **não é anti-hipertensivo** — é anticonvulsivante/neuroprotetor. Precisa de anti-hipertensivo em paralelo.\n- Sinal de intoxicação por magnésio: **abolição do reflexo patelar** (precede a depressão respiratória) → suspender + **gluconato de cálcio**.\n- **Proteinúria > 5 g NÃO é mais critério de gravidade** (mudança recente, muito cobrada).\n- **IECA/BRA são contraindicados** na gestação; **atenolol** associa-se a restrição de crescimento fetal.\n- **Nifedipina oral** sim, **sublingual não** (queda abrupta e imprevisível).\n- A **HELLP pode cursar com PA apenas moderadamente elevada** — não é a pressão que define.\n- Na HELLP, a **plaquetopenia é a alteração mais precoce e sensível**.",
      },
    ],
    referencias: [
      "FEBRASGO — Manual de Gestação de Alto Risco / Pré-eclâmpsia (edição vigente)",
      "ACOG — Gestational Hypertension and Preeclampsia (Practice Bulletin)",
      "Ministério da Saúde — Manual de gestação de alto risco",
    ],
  },

  "go--pre-natal--roteiro-e-consultas-do-pre-natal": {
    subtemaId: "go--pre-natal--roteiro-e-consultas-do-pre-natal",
    titulo: "Roteiro e consultas do pré-natal",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição e objetivos",
        corpo:
          "Conjunto de ações de vigilância da gestação com o objetivo de **reduzir morbimortalidade materna e perinatal**, identificar e manejar riscos, e preparar para o parto e o puerpério.\n\n**Mínimo de 6 consultas** (MS): 1 no 1º trimestre, 2 no 2º e 3 no 3º — **início o mais precoce possível** (idealmente até 12 semanas). Idealmente: mensais até 28 sem, quinzenais de 28–36 sem, semanais de 36 sem até o parto. **O pré-natal não tem alta** — segue até o parto.",
      },
      {
        secao: "Suplementação",
        corpo:
          "- **Ácido fólico 400 mcg/dia** — idealmente **pré-concepcional** (≥ 30 dias antes) até o fim do 1º trimestre, para prevenir **defeitos do tubo neural**. **5 mg/dia** apenas em **alto risco** (antecedente de DTN, uso de anticonvulsivante, diabetes, obesidade importante);\n- **Ferro elementar profilático** a partir da **20ª semana** até o 3º mês pós-parto;\n- **Cálcio** se baixa ingesta (também previne pré-eclâmpsia);\n- **AAS 100–150 mg/dia** de **12–16 semanas** se alto risco para pré-eclâmpsia.",
      },
      {
        secao: "Exames por trimestre",
        corpo:
          "**1º trimestre:** tipagem sanguínea + fator Rh + **Coombs indireto** (se Rh−); hemograma; glicemia de jejum; **VDRL/teste rápido de sífilis**; **HIV**; **hepatite B (HBsAg)**; toxoplasmose (IgG/IgM); urina I + **urocultura**; **USG obstétrica** (datação); citopatológico se indicado.\n\n**2º trimestre:** **TOTG 75 g entre 24–28 semanas**; repetir VDRL e HIV; **USG morfológica (20–24 sem)**.\n\n**3º trimestre:** repetir hemograma, VDRL, HIV, HBsAg, urocultura, toxoplasmose (se suscetível); **swab vaginal/anal para GBS entre 35–37 semanas**.",
      },
      {
        secao: "Rastreios-chave",
        corpo:
          "- **Diabetes gestacional:** TOTG 75 g em 24–28 sem. **Basta UM valor alterado**: **jejum ≥ 92**, **1 h ≥ 180**, **2 h ≥ 153** mg/dL. (Jejum ≥ 126 ou 2 h ≥ 200 = **diabetes prévio/overt**.)\n- **Aloimunização Rh:** gestante **Rh− com Coombs indireto negativo** → repetir **a cada 4 semanas** + **imunoglobulina anti-D na 28ª semana** (e pós-parto se RN Rh+, e após eventos sensibilizantes: sangramento, amniocentese, trauma). Se **Coombs +** (já sensibilizada) → seguimento com **Doppler de artéria cerebral média** (pico de velocidade sistólica) para anemia fetal.\n- **GBS:** swab 35–37 sem. **Profilaxia intraparto independentemente do swab** se: **urocultura + para GBS na gestação atual** ou **RN anterior com doença invasiva por GBS**.\n- **Toxoplasmose:** IgG+/IgM− = **imune, não repetir**. IgG−/IgM− = **suscetível, repetir trimestralmente** + orientar prevenção. IgM+ → **teste de avidez** (alta avidez no 1º trimestre afasta infecção recente).\n- **Aneuploidias:** rastreio combinado do 1º trimestre (**11–13 sem 6 d**: TN + osso nasal + marcadores séricos).",
      },
      {
        secao: "Vacinação",
        corpo:
          "**Recomendadas:** **dTpa** (a partir da **20ª semana**, **em toda gestação**, para transferir anticorpos contra coqueluche), **influenza** (qualquer idade gestacional), **hepatite B**, **COVID-19**.\n\n⚠️ **Contraindicadas — vacinas de vírus vivo atenuado:** **tríplice viral (SCR)**, **varicela**, **febre amarela** (relativa — avaliar risco/benefício em área endêmica), **HPV**, **BCG**.",
      },
      {
        secao: "Exame físico e propedêutica",
        corpo:
          "- **Altura uterina** (curva do cartão): abaixo do **percentil 10** → investigar com **USG + dopplervelocimetria** (diferencia **restrição de crescimento** de **feto constitucionalmente pequeno**);\n- **BCF** (a partir de ~10–12 sem com sonar);\n- **PA** em toda consulta;\n- **Manobras de Leopold** (a partir de ~36 sem):\n  - **1º tempo:** o que ocupa o fundo (polo pélvico = massa **grande, irregular, amolecida**; cefálico = **duro, regular, liso**);\n  - **2º tempo:** posição do dorso;\n  - **3º tempo:** apresentação e mobilidade;\n  - **4º tempo:** insinuação — **dedos convergem = NÃO insinuado**; **divergem = insinuado**.",
      },
      {
        secao: "Critérios de alto risco",
        corpo:
          "Encaminhamento ao pré-natal de alto risco: **diabetes prévio à gestação**, hipertensão crônica, cardiopatia, nefropatia, doenças autoimunes, **antecedente de pré-eclâmpsia grave/eclâmpsia**, trombofilias, HIV, **3 ou mais abortos consecutivos**, isoimunização Rh, neoplasias.\n\n⚠️ Idade materna isolada, primiparidade, IMC normal e **dois abortos precoces** não são, por si, critérios de alto risco.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Ácido fólico 400 mcg pré-concepcional** (5 mg só em alto risco); **ferro a partir da 20ª semana**.\n- ★ **TOTG: UM valor alterado já fecha DMG** (92 / 180 / 153).\n- ★ **Rh− Coombs−:** repetir Coombs a cada 4 sem + **anti-D na 28ª semana**. O **grupo ABO do parceiro não importa** — o que importa é o Rh.\n- ★ **Toxo IgG+/IgM− = imune, não repete.**\n- ★ **dTpa a cada gestação, a partir de 20 semanas** (não é dose única na vida).\n- ★ **Vírus vivo é proibido** (tríplice viral, varicela, HPV).\n- ★ **Bacteriúria assintomática na gestação SEMPRE se trata** + urocultura de controle (risco de pielonefrite e prematuridade).\n- ★ **GBS: urocultura + na gestação atual = profilaxia intraparto**, independentemente do swab.\n- ★ **Leopold 4º tempo: dedos convergem = não insinuado.**\n- ★ **USG morfológica (20–24 sem) = rastreio de malformações estruturais** — não é para datar (datação é no 1º trimestre).",
      },
    ],
    referencias: [
      "Ministério da Saúde — Caderneta da Gestante e Manual de Pré-natal e Puerpério",
      "FEBRASGO — Protocolos de Assistência Pré-natal",
      "Ministério da Saúde — Manual de Gestação de Alto Risco",
    ],
  },

  "go--hemorragias-da-gestacao--segunda-metade-dpp-placenta-previa": {
    subtemaId: "go--hemorragias-da-gestacao--segunda-metade-dpp-placenta-previa",
    titulo: "Hemorragias da 2ª metade — DPP e placenta prévia",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Sangramento após **20 semanas** de gestação. As duas causas principais — e o diferencial mais cobrado — são o **descolamento prematuro de placenta (DPP)** e a **placenta prévia (PP)**.\n\nOutras: **rotura uterina**, **vasa prévia**, causas cervicais/vaginais.",
      },
      {
        secao: "DPP × Placenta prévia — o quadro comparativo",
        corpo:
          "| | **DPP** | **Placenta prévia** |\n|---|---|---|\n| **Dor** | **Intensa, súbita** | **Ausente (indolor)** |\n| **Sangramento** | **Escuro**, pequena quantidade (pode ser **oculto**) | **Vermelho vivo**, abundante |\n| **Tônus uterino** | **Hipertônico (\"útero em lenho\")** | **Normal** |\n| **Início** | Súbito | **Insidioso, de repetição** |\n| **Sofrimento fetal** | **Precoce e frequente** | Raro (inicialmente) |\n| **Relação com o volume** | Repercussão **desproporcional** ao sangramento visível | Proporcional |\n| **USG** | **Baixa sensibilidade** (dx é **CLÍNICO**) | **Confirma** o diagnóstico |\n| **Toque vaginal** | Pode ser feito | ⚠️ **CONTRAINDICADO** |\n\n👉 A pegadinha central: **o sangramento do DPP engana** — grande parte fica retida (hematoma retroplacentário), então a paciente pode chocar com pouco sangue visível.",
        figura: "go-dpp-vs-pp",
      },
      {
        secao: "DPP — fisiopatologia e fatores de risco",
        corpo:
          "Separação da placenta **normalmente inserida** antes do parto → hematoma retroplacentário → **irritação miometrial (hipertonia)** e perda da superfície de trocas → **sofrimento fetal agudo**.\n\n**Fatores de risco:** **hipertensão** (o principal — crônica ou pré-eclâmpsia), **trauma**, tabagismo, cocaína, idade avançada, multiparidade, **DPP prévio**, polidrâmnio/gemelar (descompressão súbita), corioamnionite, rotura prematura de membranas.",
      },
      {
        secao: "DPP — diagnóstico e conduta",
        corpo:
          "**Diagnóstico é CLÍNICO**: sangramento + dor + **hipertonia**. ⚠️ **USG normal NÃO exclui DPP** (sensibilidade ~25–50%) — não perca tempo esperando imagem.\n\n**Conduta:**\n- **Estabilizar** (2 acessos calibrosos, volume, hemoderivados, exames com coagulograma);\n- **Amniotomia precoce** — reduz a pressão intrauterina, a passagem de tromboplastina para a circulação materna e acelera o parto;\n- **Feto vivo e viável → resolução IMEDIATA**, pela via mais rápida (geralmente **cesárea**; parto vaginal se iminente);\n- **Feto morto → preferir via vaginal** se a mãe estiver estável (menor morbidade), monitorando coagulopatia.\n\n**Complicações:** **CIVD** (a mais temida — pela liberação de tromboplastina; DPP é a **principal causa obstétrica de CIVD**), **útero de Couvelaire** (apoplexia uteroplacentária → atonia), insuficiência renal aguda, choque, óbito fetal.",
      },
      {
        secao: "Placenta prévia — definição e conduta",
        corpo:
          "Implantação da placenta no **segmento inferior**, recobrindo ou próxima ao **orifício interno do colo**. Classificação atual (USG **transvaginal**, é segura):\n- **Placenta prévia:** recobre o orifício interno;\n- **Placenta baixa:** bordo a **< 20 mm** do orifício interno, sem recobrir.\n\n⚠️ **Diagnóstico definitivo só após 28 semanas** — antes disso ocorre \"migração placentária\" com o crescimento do segmento inferior.\n\n**Fatores de risco:** **cicatriz uterina prévia (cesáreas)** — o principal, **multiparidade**, idade avançada, tabagismo, gemelar, curetagens prévias.\n\n**Conduta:**\n- ⚠️ **NUNCA fazer toque vaginal** (risco de descolar a placenta e provocar hemorragia maciça) — **exame especular** sim;\n- **Estável, pré-termo:** conduta **expectante** — repouso, abstinência sexual, corticoide se < 34 sem, seguimento;\n- **Sangramento intenso ou termo:** **cesárea** (obrigatória se recobre o orifício).\n\n**Associação crítica:** cesárea prévia + placenta prévia → **acretismo placentário** (risco cresce com o número de cesáreas) → planejar parto em centro com hemoterapia.",
      },
      {
        secao: "Outras causas",
        corpo:
          "- **Rotura uterina:** dor lacerante seguida de **parada súbita da dinâmica uterina**, **subida da apresentação**, alteração da FCF, choque. **Fator de risco principal: cicatriz uterina CORPORAL (clássica)** — muito mais que a segmentar transversa. → **Laparotomia de emergência**;\n- **Vasa prévia:** sangramento **fetal** à amniorrexe + **sofrimento fetal agudo desproporcional** ao volume perdido → cesárea de emergência.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **DPP = dor + hipertonia + sangue escuro**, em **hipertensa**. **PP = indolor + sangue vivo + tônus normal**.\n- ★ **DPP é diagnóstico CLÍNICO — USG normal não exclui.**\n- ★ **Toque vaginal é PROIBIDO na suspeita de placenta prévia** (especular pode).\n- ★ **DPP → amniotomia precoce** + resolução imediata se feto vivo.\n- ★ **DPP é a principal causa obstétrica de CIVD**; **útero de Couvelaire** → atonia.\n- ★ **Placenta baixa = bordo < 20 mm** do orifício interno.\n- ★ **Só se define PP após 28 semanas** (migração placentária).\n- ★ **Cesárea prévia + PP = risco de acretismo** — a associação mais cobrada.\n- ★ **Rotura uterina: cicatriz CORPORAL** é o grande fator de risco (não a segmentar).\n- ★ **Gestante Rh− com sangramento → imunoglobulina anti-D.**\n- ★ **Atonia uterina é a causa mais comum de hemorragia pós-parto.**",
      },
    ],
    referencias: [
      "FEBRASGO — Hemorragias da segunda metade da gestação",
      "Ministério da Saúde — Manual de Gestação de Alto Risco",
      "Zugaib — Obstetrícia",
    ],
  },

  "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola": {
    subtemaId: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola",
    titulo: "Hemorragias da primeira metade — abortamento, gravidez ectópica e mola",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Sangramento vaginal em gestação **< 20 semanas**, cujas três causas centrais são: **abortamento** (causa mais comum), **gravidez ectópica (GE)** — implantação fora da cavidade endometrial, **95–97% tubária** (ampola **70–80%**) — e **doença trofoblástica gestacional (mola hidatiforme)**. A GE é a **principal causa de morte materna no 1º trimestre** em países desenvolvidos.",
      },
      {
        secao: "Curva do β-hCG — a chave diagnóstica comum",
        corpo:
          "Produzido pelo sinciciotrofoblasto, **dobra a cada 48–72h** em gestação intrauterina viável.\n\n- **Zona discriminatória:** 1.500–2.000 mUI/mL — acima desse valor o saco gestacional **deve** ser visível à USG transvaginal;\n- **Incremento ≥ 50–53% em 48h** → provável gestação intrauterina viável (não exclui GE);\n- **Incremento < 50% ou platô** → suspeitar de GE ou gestação intrauterina não viável;\n- **Queda acentuada (> 50% em 48h)** → sugere abortamento; **queda lenta** também pode ocorrer em GE em resolução;\n- Na **mola completa**, hCG é **muito elevado (> 100.000 mUI/mL)**.",
      },
      {
        secao: "Abortamento — classificação e conduta",
        corpo:
          "50–60% por **aneuploidias** (trissomias são as mais comuns).\n\n| Tipo | OE cervical | USG | Conduta |\n|---|---|---|---|\n| Ameaça | Fechado | Embrião vivo, BCF+ | Expectante; repouso relativo |\n| Inevitável/Incompleto | Aberto | SG em expulsão / restos ovulares | Esvaziamento: **AMIU** (≤ 12 sem, método preferido pela OMS) ou curetagem; alternativa misoprostol |\n| Completo | Fechado | Cavidade vazia | Acompanhamento clínico |\n| Retido | Fechado | Sem BCF ou SG anembrionado | Misoprostol 800 mcg vaginal → curetagem se falha |\n| Infectado | Aberto, purulento | Restos + sinais de infecção | ATB amplo espectro (clindamicina + gentamicina ± ampicilina) + esvaziamento — **urgência** |\n| Habitual (≥ 3 perdas) | — | — | Investigar cariótipo do casal, SAAF, trombofilias, malformações uterinas |\n\n**Critérios USG de inviabilidade (ACOG):** embrião ≥ 7 mm sem BCF, ou saco gestacional ≥ 25 mm sem embrião.\n\n**Insuficiência cervical:** dilatação indolor no 2º trimestre → **cerclagem** (McDonald/Shirodkar) entre 12–16 semanas se ≥ 3 perdas de 2º trimestre ou colo < 25 mm com história de prematuridade.",
      },
      {
        secao: "Gravidez ectópica — anatomia e fisiopatologia",
        corpo:
          "A **ampola tubária** é o local mais comum de implantação (70–80%) porque é onde ocorre a **fecundação**; a **intersticial (2–4%)** é a mais grave pela irrigação miometrial rica → ruptura catastrófica.\n\nO blastocisto retido na tuba além do tempo fisiológico (3–4 dias) se implanta numa mucosa **sem decidualização robusta** → o trofoblasto invade diretamente a parede tubária, sem a barreira que a decídua ofereceria no útero → erosão vascular progressiva → **três desfechos**: abortamento tubário, ruptura (hemorragia maciça súbita) ou reabsorção espontânea (raro).\n\n**Sangramento vaginal é de origem UTERINA**, não tubária — reflete a queda relativa de hormônios em relação a uma gestação intrauterina normal.",
      },
      {
        secao: "Gravidez ectópica — fatores de risco",
        corpo:
          "- **GE prévia** (6–8×) — maior FR isolado;\n- **DIP/salpingite, especialmente por *Chlamydia*** (3–7×);\n- Cirurgia tubária prévia, inclusive laqueadura (4–5×);\n- Endometriose (2–3×), tabagismo dose-dependente (2–3×), idade > 35 anos, FIV.\n\n⚠️ **Pegadinha clássica:** o **DIU não aumenta o risco absoluto** de GE (é altamente eficaz contra qualquer gestação) — mas, na rara falha contraceptiva, a **proporção relativa** de GE entre as gestações que ocorrem é maior, pois protege menos contra implantação tubária do que intrauterina. Mesmo raciocínio para **contracepção com progestágeno isolado**.",
      },
      {
        secao: "Gravidez ectópica — quadro clínico",
        corpo:
          "**Tríade clássica** (amenorreia + dor pélvica + sangramento vaginal) presente em **apenas ~50%** dos casos — sua ausência **não exclui** o diagnóstico.\n\n- **GE íntegra:** dor pélvica leve-moderada, sangramento discreto intermitente;\n- **GE rota (emergência):** dor abdominal súbita intensa, defesa/irritação peritoneal, choque, **dor em ombro (sinal de Laffon** — irritação frênica por hemoperitônio subdiafragmático);\n- Outros sinais: **grito de Douglas** (dor à mobilização do colo), massa anexial dolorosa, **sinal de Proust** (abaulamento doloroso do fundo de saco posterior), **sinal de Cullen** (equimose periumbilical, hemoperitônio extenso e lento).",
      },
      {
        secao: "Gravidez ectópica — diagnóstico",
        corpo:
          "**Algoritmo:** β-hCG positivo → USG transvaginal:\n- **SG intrauterino visível** → exclui GE (exceto heterotópica, rara, suspeitar em FIV);\n- **SG ausente + β-hCG acima da zona discriminatória** → altamente sugestivo de GE;\n- **β-hCG abaixo da zona discriminatória** → repetir em 48h e reavaliar pela curva.\n\n**Achados USG:** **anel tubário** (\"sinal do bagel/donut\"), líquido livre no Douglas (hemoperitônio), SG com embrião em topografia anexial (diagnóstico definitivo).\n\n⚠️ **Não confundir pseudossaco gestacional** (coleção líquida **central**, sem duplo halo decidual, por reação decidual) com **SG verdadeiro** (**excêntrico**, com duplo halo, vesícula vitelínica/embrião) — armadilha clássica que atrasa o diagnóstico de GE.",
      },
      {
        secao: "Gravidez ectópica — tratamento",
        corpo:
          "**Expectante:** β-hCG baixo (< 1.000–1.500) e em queda espontânea, paciente estável, sem sinais de ruptura — seguimento seriado até negativar (sucesso 50–70%).\n\n**Clínico — metotrexato (MTX)**, antagonista do ácido fólico: dose única 50 mg/m² IM. Critérios ideais: hemodinâmica estável, **GE íntegra**, **β-hCG < 5.000** (fator preditivo mais importante), massa < 3,5–4 cm, **ausência de BCF**, função hepática/renal e hemograma normais. β-hCG dosado nos **D4 e D7** — queda ≥ 15% → seguimento semanal; queda < 15% → considerar 2ª dose. Sucesso 85–95% se hCG < 5.000. **Evitar AINEs, álcool e ácido fólico/vitaminas com folato** durante o tratamento (antagonizam o mecanismo).\n\n**Cirúrgico:** **salpingostomia linear** (conservadora, preserva a tuba, risco de trofoblasto persistente 5–20%) se desejo de fertilidade e tuba contralateral comprometida; **salpingectomia** (radical) se GE rota, tuba muito danificada ou recorrência na mesma tuba. **Via laparoscópica** sempre que estável; **laparotomia** se choque/hemoperitônio maciço.\n\n**Imunoglobulina anti-D** em toda gestante Rh negativo com GE.",
      },
      {
        secao: "Mola hidatiforme",
        corpo:
          "| | Mola completa | Mola parcial |\n|---|---|---|\n| Cariótipo | 46,XX (diandria, todos paternos) | 69,XXY/XXX (triploidia) |\n| Embrião | Ausente | Presente (malformado) |\n| β-hCG | Muito elevado (> 100.000) | Moderadamente elevado |\n| Risco de neoplasia trofoblástica (NTG) | 15–20% | 5% |\n\n**USG:** imagem em **\"flocos de neve\"/\"cacho de uva\"** (mola completa); **cistos tecaluteínicos bilaterais** por hiperestimulação do hCG.\n\n**Tratamento:** **vácuo-aspiração** (método preferido) — **nunca misoprostol** (risco de embolização trofoblástica); tipagem + anti-D se Rh negativo; **contracepção obrigatória** durante o seguimento (não usar DIU).\n\n**Seguimento:** β-hCG semanal até 3 valores normais consecutivos, depois mensal por 6 meses (mola completa) ou 12 meses. **Suspeitar de NTG** se hCG em platô (± 10% em 3 semanas), elevação (> 10% em 2 semanas) ou não negativar em 6 meses.\n\n**Complicações da mola:** NTG, hiperêmese grave, **hipertireoidismo** (hCG estimula receptor de TSH), **pré-eclâmpsia precoce (< 20 semanas)** — pista diagnóstica clássica, embolização trofoblástica.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "**GE × corpo lúteo hemorrágico:** ambos causam dor anexial aguda com líquido livre — a chave é o **β-hCG e a localização do SG**. **GE × abortamento completo:** padrão de queda do β-hCG (queda acentuada e consistente no abortamento). **GE × torção anexial/apendicite/DIP:** β-hCG negativo nesses diferenciais.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **GE:** choque hipovolêmico (ruptura), trofoblasto persistente (pós-salpingostomia), infertilidade/redução de fertilidade, recorrência (10–15% após 1 episódio, 25% após 2), isoimunização Rh;\n- **Abortamento infectado:** sepse;\n- **Mola:** NTG (mola invasora, coriocarcinoma, tumor de sítio placentário).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Ampola tubária** é o sítio mais comum de GE (é onde ocorre a fecundação); **intersticial** é a mais grave (irrigação miometrial).\n- ★ **DIU não aumenta o risco absoluto de GE** — aumenta a proporção relativa apenas em caso de falha.\n- ★ **Tríade clássica de GE presente em só ~50%** dos casos — não descartar pela ausência.\n- ★ **Sinal de Laffon** = dor em ombro por irritação frênica (hemoperitônio).\n- ★ **Pseudossaco (central, sem duplo halo) ≠ SG verdadeiro (excêntrico, com duplo halo)** — confundir os dois atrasa o diagnóstico de GE.\n- ★ **MTX exige β-hCG < 5.000, GE íntegra, ausência de BCF** — e **nunca** ácido fólico/AINEs durante o tratamento.\n- ★ **AMIU é o método preferido pela OMS** para esvaziamento até 12 semanas.\n- ★ **Nunca usar misoprostol na mola** (embolização trofoblástica) — vácuo-aspiração é o método.\n- ★ **Pré-eclâmpsia antes de 20 semanas** é pista para mola hidatiforme.\n- ★ Critérios USG de abortamento: **embrião ≥ 7 mm sem BCF** ou **SG ≥ 25 mm sem embrião**.",
      },
    ],
    referencias: [
      "FEBRASGO — Abortamento, Gravidez Ectópica e Doença Trofoblástica Gestacional",
      "ACOG — Practice Bulletin: Tubal Ectopic Pregnancy",
      "Ministério da Saúde — Manual de Gestação de Alto Risco",
      "Material do usuário — OMED GO · Material Completo (10 Temas)",
    ],
  },

  "go--infeccoes-congenitas-storch--sifilis-toxoplasmose-cmv-rubeola": {
    subtemaId: "go--infeccoes-congenitas-storch--sifilis-toxoplasmose-cmv-rubeola",
    titulo: "Infecções congênitas (TORCH) — sífilis, toxoplasmose, CMV, rubéola",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecções adquiridas pelo feto/RN por via **transplacentária** (a mais comum), durante o **parto** (contato com secreções do canal) ou no período **neonatal imediato**. Acrônimo **TORCH**: **T**oxoplasmose, **O**utras (sífilis, varicela, parvovírus B19, Zika, HIV, hepatite B), **R**ubéola, **C**itomegalovírus, **H**erpes simples.\n\n**CMV é a infecção congênita mais comum do mundo** (0,5–2% dos nascidos vivos); **sífilis congênita é a mais cobrada em provas brasileiras** por sua relevância em saúde pública (~9/1.000 nascidos vivos e em ascensão).",
      },
      {
        secao: "Princípio geral de transmissão × gravidade",
        corpo:
          "| Trimestre | Taxa de transmissão | Gravidade se ocorrer |\n|---|---|---|\n| 1º | Baixa | Alta (organogênese → malformações estruturais) |\n| 2º | Intermediária | Intermediária |\n| 3º | Alta | Baixa (órgãos já formados; sequelas mais funcionais) |\n\n⚠️ **Exceção fundamental: a sífilis** tem alta taxa de transmissão transplacentária **em qualquer trimestre** e pode causar dano grave em qualquer fase — não segue o padrão inverso das demais TORCH.\n\n**Sorologia fetal/neonatal:** a produção fetal de **IgM** é possível a partir do 2º trimestre — **IgM não atravessa a placenta**, então IgM positiva no RN indica infecção verdadeira. **IgG materna atravessa livremente** — IgG isolada positiva no RN pode ser só transferência passiva, exigindo reavaliação sorológica seriada.",
      },
      {
        secao: "Quadro clínico — gatilhos para investigação",
        corpo:
          "| Achado | Infecções mais associadas |\n|---|---|\n| Hepatoesplenomegalia | Toxoplasmose, sífilis, CMV, rubéola |\n| Petéquias/púrpura (\"blueberry muffin baby\") | Rubéola, CMV |\n| Microcefalia | Zika (mais grave), CMV, toxoplasmose, rubéola |\n| Calcificações intracranianas | Toxoplasmose (**difusas**), CMV (**periventriculares**), Zika (**corticais/subcorticais**) |\n| Coriorretinite | Toxoplasmose (clássica), CMV, herpes |\n| Surdez neurossensorial | **CMV** (principal causa infecciosa não genética de surdez congênita), rubéola |\n| Cardiopatia congênita | Rubéola (PCA, estenose pulmonar periférica) |\n| Hidropisia fetal não imune | Parvovírus B19 |\n| Artrogripose/contraturas | Zika |\n| Rinite serossanguinolenta, lesões cutaneomucosas | Sífilis congênita precoce |",
      },
      {
        secao: "Toxoplasmose — sorologia e diagnóstico",
        corpo:
          "*Toxoplasma gondii*; transmissão por ingestão de oocistos (fezes de gato, solo contaminado) ou cistos teciduais (carne crua/mal passada).\n\n| IgM | IgG | Interpretação | Conduta |\n|---|---|---|---|\n| − | − | Suscetível | Repetir sorologia trimestralmente |\n| − | + | Imunidade prévia | Sem risco |\n| + | − | Infecção aguda recente ou falso+ | Repetir em 2–3 sem |\n| + | + | Recente OU antiga com IgM residual | **Teste de avidez de IgG** |\n\n**Avidez de IgG:** alta (> 60%) → infecção há > 12–16 semanas (se no 1º trimestre, provavelmente pré-concepcional, baixo risco); baixa (< 30%) → infecção recente → **tratar**.\n\n**Tétrade de Sabin:** coriorretinite + calcificações **difusas** + hidrocefalia + retardo mental. **80–90% dos RN infectados são assintomáticos ao nascer**, podendo desenvolver coriorretinite anos depois (sequela mais comum a longo prazo).",
      },
      {
        secao: "Sífilis congênita — rastreamento e diagnóstico",
        corpo:
          "*Treponema pallidum*; transmissão transplacentária em **qualquer trimestre** (70–100% na sífilis primária/secundária materna não tratada).\n\n**Rastreamento obrigatório (MS):** VDRL/teste rápido no **1º trimestre, 3º trimestre e no parto**.\n\n**Diagnóstico no RN:** VDRL de sangue periférico **comparado à titulação materna**; hemograma, hepatograma; **radiografia de ossos longos** (osteocondrite/periostite); **punção lombar** se qualquer alteração clínica/laboratorial; fundo de olho.",
      },
      {
        secao: "Rubéola, CMV, herpes, Zika, varicela, parvovírus B19",
        corpo:
          "**Rubéola:** risco de síndrome congênita depende fortemente da IG — **1º trimestre até 80–90%** de malformação, **após 20 semanas risco muito baixo**. Tríade de Gregg: cardiopatia + catarata + surdez.\n\n**CMV:** infecção congênita mais comum do mundo. **PCR na urina/saliva nas primeiras 3 semanas de vida** é o padrão-ouro — após esse prazo não se distingue mais infecção congênita de pós-natal.\n\n**Herpes neonatal:** predominantemente **intraparto**. Risco de transmissão: **primoinfecção materna no 3º trimestre = 30–50%** (o maior risco, sem tempo de transferência de anticorpos); **recorrência materna = apenas 1–3%**.\n\n**Zika:** RT-PCR no soro/urina maternos (janela curta); **atenção à reação cruzada sorológica com dengue**; calcificações **corticais/subcorticais**; microcefalia grave + artrogripose.\n\n**Parvovírus B19:** IgM materna; **Doppler de artéria cerebral média** (pico de velocidade sistólica ↑ = anemia fetal) substitui a cordocentese diagnóstica na triagem; risco de hidropisia fetal não imune.",
      },
      {
        secao: "Diagnóstico diferencial — padrão de calcificação",
        corpo:
          "A principal ferramenta diferencial entre as TORCH é o **padrão de calcificação intracraniana**: **difusa → toxoplasmose**; **periventricular → CMV**; **cortical/subcortical → Zika**. Microcefalia muito acentuada + artrogripose → Zika; associada a calcificações periventriculares + surdez → CMV.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Toxoplasmose materna:** soroconversão sem infecção fetal confirmada → **espiramicina** 3g/dia (reduz transmissão vertical em ~60%); infecção fetal confirmada (PCR+ no líquido amniótico) → **esquema tríplice (SPAF)** — sulfadiazina + pirimetamina + ácido folínico.\n\n**Sífilis materna:** primária/secundária/latente recente → penicilina benzatina 2,4 milhões UI IM dose única; latente tardia/indeterminada → semanal por 3 semanas. **Critérios de tratamento adequado:** penicilina (único fármaco eficaz — **nunca substituir por eritromicina/azitromicina**, mesmo em alérgica — dessensibilizar e tratar com penicilina), iniciado ≥ 30 dias antes do parto, queda documentada do VDRL, parceiro tratado.\n\n**RN:** mãe adequadamente tratada + RN assintomático + VDRL ≤ materno → penicilina benzatina dose única; mãe não/inadequadamente tratada, RN sintomático, ou neurossífilis → **penicilina cristalina IV por 10 dias**.\n\n**CMV sintomático:** ganciclovir IV ou valganciclovir VO por **6 meses** (reduz progressão da surdez). **Herpes:** aciclovir IV 60 mg/kg/dia por 14–21 dias. **Varicela:** VZIG em até 96h da exposição se gestante suscetível; aciclovir se doença ativa. **Rubéola e Zika:** sem tratamento específico — prevenção (vacina contraindicada na gestação) e suporte.\n\n**Conduta obstétrica no herpes genital:** lesão ativa no trabalho de parto → **cesariana**; sem lesões visíveis → parto vaginal permitido; primoinfecção nas últimas 6 semanas → considerar cesariana eletiva mesmo sem lesões visíveis.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Sífilis tardia** (> 2 anos): tíbia em sabre, nariz em sela, **tríade de Hutchinson** (ceratite intersticial, surdez, dentes de Hutchinson);\n- **Toxoplasmose:** coriorretinite recorrente tardia mesmo em assintomático ao nascer;\n- **CMV:** surdez progressiva mesmo em assintomático (10–15% desenvolvem tardiamente);\n- **Rubéola:** cardiopatia, catarata, surdez (manifestação isolada mais comum), diabetes na infância;\n- **Zika:** síndrome congênita com sequelas neurológicas permanentes.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **CMV = infecção congênita mais comum do mundo**; **sífilis = mais cobrada em provas BR**.\n- ★ **Sífilis é a EXCEÇÃO** à regra transmissão↓/gravidade↑ no 1º trimestre — transmite bem em qualquer IG.\n- ★ Padrão de calcificação: **difusa (toxo) × periventricular (CMV) × cortical/subcortical (Zika)**.\n- ★ **IgM não atravessa a placenta** — IgM+ no RN = infecção verdadeira; **IgG isolada pode ser só transferência passiva materna**.\n- ★ **VDRL obrigatório 3× na gestação** (1º tri, 3º tri, parto).\n- ★ **Nunca trocar penicilina por outro antibiótico na sífilis gestacional** — dessensibilizar se alérgica.\n- ★ **PCR de CMV na urina/saliva só é válido nas primeiras 3 semanas** de vida para confirmar infecção congênita.\n- ★ **Herpes: maior risco na primoinfecção materna tardia (30–50%)**, não na recorrência (1–3%) — contraintuitivo, muito cobrado.\n- ★ **Reação cruzada Zika × dengue** na sorologia é armadilha diagnóstica clássica.\n- ★ **Doppler de ACM substitui cordocentese** na triagem de anemia fetal por parvovírus B19.",
      },
    ],
    referencias: [
      "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais",
      "CDC — Guidelines for Congenital Toxoplasmosis, CMV, and Syphilis",
      "FEBRASGO — Protocolos de Infecções Congênitas em Obstetrícia",
      "Material do usuário — OMED GO · Material Completo (10 Temas)",
    ],
  },

  "go--assistencia-ao-parto--mecanismo-e-fases-do-parto": {
    subtemaId: "go--assistencia-ao-parto--mecanismo-e-fases-do-parto",
    titulo: "Mecanismo e fases do parto",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "O trabalho de parto normal progride por **fases sequenciais** e o feto em apresentação cefálica fletida atravessa a bacia por **7 movimentos cardinais**. Entender esse mecanismo fisiológico é a base para reconhecer qualquer distocia (anormalidade em um dos **3 Ps**: Passageiro, Passagem, Potência).",
      },
      {
        secao: "Bacia obstétrica",
        corpo:
          "| Estreito | Diâmetro principal | Valor normal | Significado |\n|---|---|---|---|\n| Superior (entrada) | Conjugata vera obstétrica | ≥ 10 cm | Se < 10 cm: desproporção cefalopélvica de entrada |\n| Médio (escavação) | Biespinha ciática | ≥ 10 cm | **Estreito mais frequentemente responsável por obstrução** |\n| Inferior (saída) | Subpubococcígeo | ≥ 9,5 cm | Raramente causa obstrução isolada |\n\n**Classificação de Caldwell-Moloy:** **ginecoide** (arredondada, ~50% das mulheres, prognóstico favorável); **androide** (triangular, desfavorável, favorece occipitoposterior persistente); **antropoide** (oval anteroposterior, geralmente permite parto vaginal); **platipeloide** (oval transverso, desfavorável — diâmetro AP reduzido dificulta insinuação).",
      },
      {
        secao: "Fases do trabalho de parto",
        corpo:
          "| Fase | Período |\n|---|---|\n| 1º (dilatação) | Início do TP até dilatação completa (10 cm) — subdividida em fase latente e ativa |\n| 2º (expulsivo) | Dilatação completa até o nascimento |\n| 3º (dequitação) | Nascimento até saída da placenta — normal até 30 min |\n| 4º (Greenberg) | 1ª hora pós-parto — vigilância rigorosa para hemorragia pós-parto |\n\n**Mudança conceitual fundamental (ACOG/SMFM 2014, baseada no estudo de Zhang et al. 2010):** a **fase ativa começa a partir de 6 cm** de dilatação — não mais 4 cm como no Friedman clássico. **Não se diagnostica \"falha de progressão\" antes de 6 cm** — evolução lenta antes disso é fase latente prolongada, o que **não é indicação isolada de cesariana**.\n\n**Critérios de parada de progressão (ACOG/SMFM 2014):** na fase ativa (≥ 6 cm), sem progressão por **4h com contrações adequadas** ou **6h com contrações inadequadas** apesar de ocitocina otimizada → cesariana. No 2º período: nulípara > 3h com peridural (ou > 2h sem) / multípara > 2h com peridural (ou > 1h sem) → parto instrumentado ou cesariana.",
      },
      {
        secao: "Os 7 movimentos cardinais (apresentação cefálica fletida)",
        corpo:
          "1. **Insinuação (encaixamento):** o maior diâmetro do polo cefálico atravessa o estreito superior;\n2. **Descida:** progressão contínua pela bacia;\n3. **Flexão:** o mento se aproxima do tórax, apresentando o menor diâmetro cefálico possível (**suboccipitobregmático, ~9,5 cm**);\n4. **Rotação interna:** o occipício roda sob a sínfise púbica (occipitopúbica) ou, menos comumente, para o sacro;\n5. **Extensão (deflexão):** a cabeça se estende ao passar sob a sínfise no desprendimento;\n6. **Rotação externa (restituição):** a cabeça já desprendida gira para realinhar com o eixo dos ombros;\n7. **Expulsão:** desprendimento do ombro anterior, depois posterior, e do restante do corpo.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Fase ativa começa em 6 cm**, não 4 cm — mudança de paradigma muito cobrada (ACOG/SMFM 2014, estudo de Zhang).\n- ★ **Fase latente prolongada não é indicação de cesariana** — conduta é suporte e deambulação.\n- ★ **Estreito médio (biespinha ciática)** é o mais comumente responsável por obstrução, não o superior.\n- ★ **Diâmetro suboccipitobregmático (~9,5 cm)** é o de apresentação na flexão máxima — o menor possível.\n- ★ **Pelve androide e platipeloide** têm prognóstico desfavorável para parto vaginal; **ginecoide** é a mais favorável e mais comum.\n- ★ **Prova de trabalho de parto** (observar a evolução real) é mais confiável que pelvimetria radiológica para avaliar adequação pélvica.",
      },
    ],
    referencias: [
      "ACOG/SMFM — Obstetric Care Consensus: Safe Prevention of the Primary Cesarean Delivery (2014)",
      "Zhang J. et al. — Contemporary Patterns of Spontaneous Labor, Obstetrics & Gynecology (2010)",
      "Material do usuário — OMED GO · Material Completo (10 Temas)",
    ],
  },

  "go--assistencia-ao-parto--partograma": {
    subtemaId: "go--assistencia-ao-parto--partograma",
    titulo: "Partograma e distocia",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "**Distocia** = \"parto difícil\", qualquer anormalidade na progressão do trabalho de parto, decorrente de alteração em um ou mais dos **3 Ps**: **P**otência (contrações), **P**assageiro (feto) e **P**assagem (bacia/canal). **Partograma** é a representação gráfica que monitora dilatação cervical, descida da apresentação e contrações, identificando precocemente padrões anormais. **É a indicação mais comum de cesariana primária**, sob o rótulo de \"falha de progressão\" — 20–25% dos partos têm algum grau de distocia.",
      },
      {
        secao: "Classificação por componente (3 Ps)",
        corpo:
          "- **Potência → distocia funcional:** hipoatividade (< 3 contrações/10 min ou intensidade reduzida), hiperatividade/taquissistolia (> 5/10 min), incoordenação (sem gradiente descendente eficaz), hipertonia (tônus basal elevado, associada a DPP ou excesso de ocitocina);\n- **Passageiro → distocia fetal:** macrossomia, apresentações anômalas (pélvica, córmica, defletida), occipitoposterior persistente;\n- **Passagem → distocia mecânica/DCP:** pelve estreita ou desfavorável, tumores prévios (miomas, cistos), septos vaginais.",
      },
      {
        secao: "Distocia funcional × mecânica (DCP) — o diferencial central",
        corpo:
          "| | Funcional | Mecânica (DCP) |\n|---|---|---|\n| Contrações | Fracas, incoordenadas ou hipertônicas | **Adequadas**, mas sem progressão apesar disso |\n| Descida | Pode progredir ao corrigir a dinâmica | Apresentação **permanece alta**, não desce |\n| Resposta à ocitocina | Geralmente melhora | **Não melhora** |\n| Partograma | Ultrapassa linha de **alerta** | Ultrapassa linha de **ação** mesmo com ocitocina otimizada |\n| Tratamento | Amniotomia + ocitocina | **Cesariana** |\n\nSinais indiretos de DCP: apresentação alta apesar de boa dinâmica, **moldagem craniana acentuada e bossa serossanguínea** ao toque.",
      },
      {
        secao: "Interpretação do partograma",
        corpo:
          "1. Está em **fase ativa (≥ 6 cm)**? Se não: fase latente prolongada (> 20h nulípara / > 14h multípara) → suporte, **não indicar cesariana** por isso isoladamente;\n2. Se sim: onde está a curva em relação às linhas de alerta e ação?\n   - **À esquerda da linha de alerta:** evolução normal;\n   - **Entre alerta e ação, contrações inadequadas:** amniotomia + ocitocina;\n   - **Entre alerta e ação, contrações já adequadas:** reavaliar causa mecânica;\n   - **Ultrapassa a linha de ação mesmo com contrações adequadas (otimizadas):** suspeitar DCP → cesariana.",
      },
      {
        secao: "Distocia de apresentação",
        corpo:
          "**Pélvica:** avaliar critérios para parto vaginal (experiência da equipe, peso fetal, tipo pélvico); versão cefálica externa antes do TP a termo; cesariana é a via mais segura fora de centros experientes. **Córmica (transversa):** parto vaginal inviável se mantida → cesariana. **Occipitoposterior persistente:** manejo expectante (muitas rotam espontaneamente); rotação manual ou parto instrumentado por profissional experiente.",
      },
      {
        secao: "Distocia de ombro — protocolo HELPERR",
        corpo:
          "Diagnóstico pelo **\"sinal da tartaruga\"** (cabeça desprende e retrai contra o períneo, sem progressão dos ombros).\n\n1. **H — Help:** chamar equipe (obstetra experiente, neonatologista);\n2. **E — Episiotomia** (avaliar necessidade — facilita acesso, não resolve a obstrução óssea);\n3. **L — Legs (McRoberts):** hiperflexão das coxas maternas — retifica a lordose, aumenta o diâmetro AP efetivo;\n4. **P — Pressure (Rubin I):** pressão **suprapúbica** (nunca fúndica) — promove adução do ombro anterior;\n5. **E — Enter (Rubin II/Woods):** manobras rotacionais internas;\n6. **R — Remove:** extração do braço posterior;\n7. **R — Roll (Gaskin):** posição de quatro apoios.\n\n**McRoberts + pressão suprapúbica resolve 50–90%** dos casos quando aplicadas precocemente. **Zavanelli** (reintrodução da cabeça + cesariana) é o último recurso.\n\n⚠️ **NUNCA:** pressão no fundo uterino (Kristeller — piora a impactação) ou tração excessiva/lateral da cabeça (principal mecanismo da **paralisia de Erb-Duchenne**, C5-C6, postura em \"gorjeta de garçom\").",
      },
      {
        secao: "Complicações",
        corpo:
          "- Sofrimento fetal agudo (compressão de cordão, hipóxia);\n- Rotura uterina (TP obstruído prolongado, especialmente em útero cicatricial);\n- **Hemorragia pós-parto por atonia** (fadiga miometrial após esforço contrátil prolongado);\n- Infecção puerperal (múltiplos toques, bolsa rota prolongada);\n- Lesão de plexo braquial e fratura de clavícula (distocia de ombro).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Distocia funcional responde à ocitocina; DCP não** — esse é o ponto-chave para decidir entre otimizar dinâmica ou indicar cesariana.\n- ★ **Fase latente prolongada não indica cesariana isoladamente.**\n- ★ **Pressão suprapúbica, NUNCA fúndica** (Kristeller é proibida) na distocia de ombro.\n- ★ **McRoberts é a primeira manobra ativa** do HELPERR (após Help e avaliar episiotomia).\n- ★ **Tração excessiva da cabeça = principal causa de paralisia de Erb-Duchenne.**\n- ★ **Manobra de Zavanelli é o último recurso**, após falha de todas as demais.\n- ★ Critérios de tempo: fase ativa **4h (contrações adequadas) / 6h (inadequadas)**; 2º período nulípara **3h com peridural/2h sem**, multípara **2h com/1h sem**.\n- ★ Hemorragia pós-parto após TP prolongado é por **atonia** (fadiga miometrial), não por outra causa.",
      },
    ],
    referencias: [
      "OMS — Recomendações sobre Partograma e Assistência ao Trabalho de Parto",
      "ACOG Practice Bulletin 178 — Shoulder Dystocia",
      "FEBRASGO — Protocolos de Distocia e Assistência ao Parto",
      "Material do usuário — OMED GO · Material Completo (10 Temas)",
    ],
  },
};
