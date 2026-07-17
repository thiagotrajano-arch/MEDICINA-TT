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
};
