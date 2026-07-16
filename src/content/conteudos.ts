import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Study content (seed).
 *
 * These are authored from stable, guideline-consistent facts (FEBRASGO/ACOG for
 * pre-eclampsia). Bulk content will be imported from the user's own materials
 * (Drive + PDFs) and layered as versions — the user's original is always preserved.
 *
 * Keyed by subtema id (see taxonomy.ts).
 */
export const CONTEUDOS: Record<string, ConteudoSubtema> = {
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
        secao: "Critérios diagnósticos",
        corpo:
          "PA ≥ 140 × 90 mmHg após 20 semanas **+ pelo menos um**:\n\n- **Proteinúria:** ≥ 300 mg/24 h, ou relação proteína/creatinina ≥ 0,3, ou fita ≥ 1+;\n- **Ou disfunção de órgão-alvo** (mesmo sem proteinúria): plaquetopenia < 100.000/mm³; creatinina > 1,1 mg/dL (ou dobro do basal); transaminases ≥ 2× o normal; edema agudo de pulmão; sintomas cerebrais/visuais.",
      },
      {
        secao: "Sinais de gravidade",
        corpo:
          "Definem **PE com sinais de gravidade** (qualquer um):\n\n- PA ≥ **160 × 110** mmHg;\n- Plaquetopenia < 100.000/mm³;\n- Transaminases elevadas / dor persistente em hipocôndrio direito ou epigástrio;\n- Creatinina > 1,1 mg/dL ou injúria renal;\n- Edema agudo de pulmão;\n- Sintomas cerebrais ou visuais (cefaleia intensa, escotomas);\n- **Síndrome HELLP** (hemólise, ↑enzimas hepáticas, plaquetopenia).",
      },
      {
        secao: "Conduta",
        corpo:
          "- **Sulfato de magnésio** é a droga de escolha para **prevenir e tratar convulsão** (eclâmpsia) na PE com sinais de gravidade — esquemas de Pritchard (IM) ou Zuspan (IV). Monitorar reflexos, diurese e frequência respiratória; antídoto = **gluconato de cálcio**.\n- **Anti-hipertensivo** para PA grave (≥ 160 × 110): **hidralazina, labetalol ou nifedipina**. Alvo: reduzir sem hipotensão brusca.\n- **Tratamento definitivo é a resolução da gestação (parto)** — momento individualizado pela idade gestacional e gravidade.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **AAS em baixa dose** para gestantes de **alto risco**, idealmente iniciado entre **12–16 semanas**.\n- **Suplementação de cálcio** em populações com baixa ingesta.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- Proteinúria **não é mais obrigatória** para o diagnóstico se houver disfunção de órgão-alvo.\n- Sulfato de magnésio **não é anti-hipertensivo** — é anticonvulsivante/neuroprotetor.\n- Sinal de intoxicação por magnésio: **abolição do reflexo patelar** (precede depressão respiratória).",
      },
    ],
    referencias: [
      "FEBRASGO — Manual de Gestação de Alto Risco / Pré-eclâmpsia (edição vigente)",
      "ACOG — Gestational Hypertension and Preeclampsia (Practice Bulletin)",
      "Ministério da Saúde — Manual de gestação de alto risco",
    ],
  },
};
