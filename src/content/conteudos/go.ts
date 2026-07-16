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
};
