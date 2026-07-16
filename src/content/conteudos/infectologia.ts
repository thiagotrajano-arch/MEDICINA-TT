import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Resumos — Infectologia.
 * Extraídos do "Infectologia OMED · 15 Temas" (Resumo Absoluto) do usuário via
 * scripts/extract-pdf.mts, reorganizados na estrutura de seções da plataforma.
 * origem = 'usuario_original' → material do usuário, preservado.
 */

export const CONTEUDOS_INF: Record<string, ConteudoSubtema> = {
  "inf--tuberculose--diagnostico-e-tratamento": {
    subtemaId: "inf--tuberculose--diagnostico-e-tratamento",
    titulo: "Tuberculose — diagnóstico e tratamento",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Doença infecciosa granulomatosa crônica causada pelo **Mycobacterium tuberculosis** (bacilo de Koch), um **BAAR** (bacilo álcool-ácido resistente) de crescimento lento, transmitido por **via aérea** (gotículas/aerossóis ao tossir, falar, espirrar).\n\nAcomete predominantemente o **pulmão (~85%)**, mas qualquer órgão pode ser afetado (TB extrapulmonar). O Brasil está entre os **30 países de alta carga** global segundo a OMS.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "Após a inalação, o bacilo é fagocitado por macrófagos alveolares, mas **resiste à destruição** (inibe a fusão fagossomo-lisossomo) e se multiplica.\n\n- Forma-se o **foco de Ghon** (lesão parenquimatosa primária) que, somado à **linfadenopatia hilar satélite**, constitui o **complexo primário de Ranke**.\n- A imunidade celular (Th1, IFN-γ) contém a infecção em **granulomas caseosos** na maioria — resultando em **infecção latente (ILTB)**, não infecciosa e assintomática.\n- A **reativação** (TB pós-primária, tipicamente em **ápices pulmonares** — melhor tensão de O₂) ocorre por queda de imunidade.",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "- Contato domiciliar com bacilífero;\n- **PVHIV** (risco ~20–30× maior);\n- Privados de liberdade, população em situação de rua, indígenas, profissionais de saúde;\n- Silicose, desnutrição, tabagismo, etilismo;\n- Corticoide crônico, **imunobiológicos anti-TNF**, diabetes, extremos de idade.\n\nA transmissão depende da carga bacilar do caso índice, do tempo de exposição e da ventilação do ambiente — **bacilíferos (baciloscopia +) são a principal fonte**.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**TB pulmonar:** tosse produtiva **> 2–3 semanas** (definição de *sintomático respiratório* — base da busca ativa), febre vespertina, sudorese noturna, emagrecimento, astenia; hemoptise nas formas cavitárias avançadas.\n\n**Formas extrapulmonares** (mais comuns em PVHIV e crianças):\n- **Pleural:** derrame exsudativo, **ADA elevado**;\n- **Ganglionar/escrofulose:** linfadenopatia cervical fistulizante;\n- **Meningoencefálica:** subaguda, com comprometimento de pares cranianos e hidrocefalia;\n- **Óssea (mal de Pott):** espondilodiscite, geralmente coluna torácica baixa;\n- **Miliar:** disseminação hematogênica; imunossuprimidos e crianças pequenas.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "- **TRM-TB (teste rápido molecular, GeneXpert):** PCR que detecta o DNA do M. tuberculosis **e a resistência à rifampicina** em ~2h. É o **teste de escolha inicial preconizado pelo MS** para todo sintomático respiratório, substituindo a baciloscopia como primeira linha onde disponível (S ~88%, E ~95%).\n- **Baciloscopia direta (BAAR no escarro):** 2 amostras; barata e rápida, mas sensibilidade moderada (exige carga bacilar significativa).\n- **Cultura + teste de sensibilidade:** **padrão-ouro**; demora semanas (meio sólido) a dias (meio líquido/MGIT). Indicada em suspeita de resistência, falência, formas extrapulmonares e imunossuprimidos.\n- **PPD e IGRA:** avaliam **infecção latente** — **não diagnosticam doença ativa** (não distinguem infecção de doença).",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "A **radiografia de tórax é obrigatória** em todo sintomático respiratório, mesmo com baciloscopia negativa.\n\n- **TB primária:** complexo primário (nódulo parenquimatoso + linfonodo hilar), podendo haver atelectasia; comum em crianças.\n- **TB pós-primária (reativação):** **cavitação em lobos superiores / segmento apical dos lobos inferiores** — achado clássico de prova.\n- **TB miliar:** micronódulos difusos < 2–3 mm bilaterais (\"grãos de milho\").\n- **TB pleural:** derrame unilateral, em geral sem cavitação associada.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Esquema Básico (EB):**\n- **Fase intensiva (2 meses):** Rifampicina + Isoniazida + Pirazinamida + Etambutol (**RHZE**, comprimido 4-em-1 de dose fixa combinada);\n- **Fase de manutenção (4 meses):** Rifampicina + Isoniazida (**RH**, 2-em-1).\n\n**TB meningoencefálica e osteoarticular:** mesmo esquema, porém com manutenção estendida — **total de 12 meses** (Nota Informativa MS). Na meningoencefálica, **associar corticoide** (prednisona ou dexametasona) para reduzir sequela e mortalidade.\n\nTomada **única diária**, preferencialmente em jejum. O **Tratamento Diretamente Observado (TDO)** é a estratégia preferencial.",
      },
      {
        secao: "Posologia e efeitos adversos",
        corpo:
          "- **Rifampicina (R)** — 10 mg/kg/dia (máx 600 mg): suor e urina **alaranjados** (benigno, *não* suspender); hepatotoxicidade; **indutor enzimático** (reduz eficácia de anticoncepcional oral e varfarina).\n- **Isoniazida (H)** — 5–10 mg/kg/dia (máx 400 mg): **neuropatia periférica** (associar **piridoxina/B6** em gestantes, desnutridos, etilistas, PVHIV, DM); hepatotoxicidade.\n- **Pirazinamida (Z)** — 25–35 mg/kg/dia (máx 2 g): hiperuricemia/artralgia; **a mais hepatotóxica das quatro**.\n- **Etambutol (E)** — 15–25 mg/kg/dia (máx 1,6 g): **neurite óptica retrobulbar** — discromatopsia (vermelho-verde primeiro) e queda da acuidade visual; evitar em < 10 anos.\n\n⚠️ **Hepatotoxicidade:** suspender o esquema se **TGO/TGP > 5× LSN assintomático** ou **> 3× LSN com sintomas/icterícia**; reintroduzir escalonadamente (R → H → Z) após normalização.",
      },
      {
        secao: "Complicações",
        corpo:
          "- Hemoptise maciça (aspergiloma em cavidade residual);\n- Fibrose pulmonar e bronquiectasias sequelares;\n- Empiema pleural / fístula broncopleural;\n- Hidrocefalia e vasculite (TB meníngea);\n- **TB multidroga-resistente (TB-MDR:** resistência a R+H) — pior prognóstico, esquema prolongado com fármacos de 2ª linha.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **BCG ao nascer** (dose única, intradérmica): protege principalmente contra **formas graves na infância** (miliar, meníngea); proteção limitada contra a TB pulmonar do adulto.\n- **Tratamento da Infecção Latente (ILTB/TPT)** após PPD/IGRA positivos em contatos, PVHIV, uso de anti-TNF etc. Esquemas: **3HP** (isoniazida + rifapentina semanal por 3 meses — **preferencial atualmente**, melhor adesão); rifampicina 4 meses; isoniazida 6–9 meses.\n- **Notificação compulsória**, busca ativa de sintomáticos respiratórios e investigação de contatos são pilares do Plano Nacional pelo Fim da TB.",
      },
      {
        secao: "Fluxograma",
        corpo:
          "1. **Sintomático respiratório** (tosse ≥ 2–3 semanas) → solicitar **TRM-TB no escarro** (1ª linha) **+ radiografia de tórax**.\n2. **TRM-TB positivo** → detecta o bacilo **e** a resistência à rifampicina simultaneamente.\n3. **Sensível à rifampicina** → **Esquema Básico** (RHZE 2 m + RH 4 m). **Resistente** → encaminhar para esquema especial (TB-DR).\n4. **Baciloscopia de controle mensal.** Cura = 2 baciloscopias negativas + critério clínico-radiológico.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ O **TRM-TB é o exame de 1ª linha** do MS para sintomático respiratório — **não é só a baciloscopia**.\n- ★ **Cavitação em ápice / segmento apical de lobo inferior** = padrão de **reativação** (pós-primária), o mais cobrado.\n- ★ **TB meningoencefálica e óssea: 12 meses** de tratamento (não 6!) — mudança recente, pegadinha atual.\n- ★ **Corticoide** é adjuvante formal na **TB meníngea** (reduz sequela), **não** na pulmonar isolada.\n- ★ **Etambutol = neurite óptica com discromatopsia** — clássico fármaco↔efeito adverso.\n- ★ **Rifampicina colore fluidos de laranja** — benigno, **não suspender** por isso.\n- ★ **PPD/IGRA não diagnosticam doença ativa** — servem para infecção latente.\n- ★ **3HP** é hoje o esquema preferencial de TPT pela adesão.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil",
      "Ministério da Saúde — Nota Informativa sobre duração do tratamento (formas meningoencefálica e osteoarticular)",
      "OMS — Global Tuberculosis Report",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--meningites--bacteriana-vs-viral": {
    subtemaId: "inf--meningites--bacteriana-vs-viral",
    titulo: "Meningites — bacteriana vs. viral",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Processo inflamatório das **meninges** (aracnoide e pia-máter) e do **líquido cefalorraquidiano (LCR)**, de etiologia infecciosa (bacteriana, viral, fúngica, tuberculosa) ou não infecciosa.\n\n**Emergência médica** — a forma bacteriana tem alta morbimortalidade quando o tratamento é postergado.",
      },
      {
        secao: "Etiologia",
        corpo:
          "Os agentes variam por **faixa etária**:\n\n- **Neonatos:** *Streptococcus agalactiae* (grupo B), *E. coli*, **Listeria monocytogenes**;\n- **Lactentes, crianças e adultos jovens:** *Streptococcus pneumoniae* e *Neisseria meningitidis* (meningocócica — petéquias/púrpura, potencial para síndrome de Waterhouse-Friderichsen);\n- **> 50 anos ou imunossuprimidos:** acrescentar cobertura para **Listeria**.\n\nA invasão pode ser **hematogênica** (bacteremia) ou **por contiguidade** (sinusite, otite, fratura de base de crânio com fístula liquórica).",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "- Extremos de idade;\n- **Asplenia / anemia falciforme** (risco para encapsulados: pneumococo, meningococo, Hib);\n- Fístula liquórica;\n- **Deficiência de complemento** (meningococo recorrente);\n- Aglomeração (dormitórios, quartéis — meningocócica);\n- Ausência de vacinação.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Tríade clássica:** febre + cefaleia + rigidez de nuca — presente completa em uma **minoria** dos casos (sensibilidade baixa isolada).\n\n**Sinais de irritação meníngea:** **Kernig** (dor à extensão do joelho com quadril fletido) e **Brudzinski** (flexão involuntária dos joelhos à flexão passiva do pescoço).\n\nPodem associar-se: fotofobia, vômitos, rebaixamento de consciência, convulsões, abaulamento de fontanela (lactentes) e **petéquias/púrpura** (sugere meningococcemia — gravíssimo, tratar sem atraso).",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "A **punção lombar** (análise do LCR) é o exame definidor. Solicitar: citologia global e diferencial, bioquímica (glicose, proteína), **Gram**, cultura, látex/PCR para os principais agentes, **ADA** (suspeita de TB) e **VDRL** (neurossífilis) no líquor.\n\n**Hemoculturas antes do antibiótico** — mas **não atrasar o ATB** para colhê-las se a punção/hemocultura forem demorar.\n\nProcalcitonina e PCR séricos ajudam a diferenciar causa viral, mas **não substituem o líquor**.",
      },
      {
        secao: "Interpretação do líquor",
        corpo:
          "| | **Bacteriana** | **Viral** | **Tuberculosa** |\n|---|---|---|---|\n| Aspecto | Turvo/purulento | Límpido | Límpido/xantocrômico |\n| Células | > 1000, **PMN** | < 500, linfomono | 50–500, linfomono |\n| Proteína | ↑↑ (> 100) | normal / ↑ leve | ↑ (50–200) |\n| Glicose | ↓↓ (< 40% da glicemia) | normal | ↓ |",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**TC de crânio antes da punção NÃO é rotina.** Está indicada quando há **risco de herniação**:\n\n- Imunossupressão;\n- Doença de SNC prévia (lesão expansiva, AVC, abscesso);\n- Convulsão recente;\n- Papiledema;\n- Déficit neurológico focal;\n- Rebaixamento importante da consciência (Glasgow < 10–12).\n\nFora dessas situações, **colher o líquor sem atrasar por imagem**. Se a TC for necessária, colher hemocultura e **iniciar o antibiótico antes do exame**.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **Encefalite viral** (herpética — considerar aciclovir empírico se quadro compatível, LCR claro);\n- **Hemorragia subaracnóidea** (cefaleia \"pior da vida\", súbita; sangue no LCR, xantocromia);\n- **Abscesso cerebral** (déficit focal, febre pode ser discreta);\n- Meningite asséptica por AINE/imunobiológicos.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Empírico, iniciado o mais rápido possível (idealmente em até 1 h da suspeita), nunca aguardando confirmação laboratorial:**\n\n- **Adultos até ~50 anos:** **Ceftriaxona** (pneumococo e meningococo) + **Vancomicina** (pneumococo com sensibilidade reduzida a cefalosporina);\n- **> 50 anos, etilistas, gestantes, imunossuprimidos:** acrescentar **Ampicilina** (Listeria — **não coberta por cefalosporina**);\n- **Neonatos:** Ampicilina + **Cefotaxima** (evita-se ceftriaxona pelo risco de deslocar bilirrubina da albumina);\n- **Pós-trauma/pós-neurocirurgia:** Vancomicina + cefepima (antipseudomonas) ou meropenem.\n\n**Corticoide adjuvante:** **Dexametasona junto ou pouco antes da 1ª dose de antibiótico** — reduz sequelas (especialmente **perda auditiva**) na meningite pneumocócica e por H. influenzae.",
      },
      {
        secao: "Posologia",
        corpo:
          "- **Ceftriaxona** 2 g EV 12/12h — 1ª linha empírica; atravessa a BHE inflamada;\n- **Vancomicina** 15–20 mg/kg EV 8–12/12h — alvo de vancocinemia 15–20 mcg/mL;\n- **Ampicilina** 2 g EV 4/4h — acrescentar se > 50 a / gestante / imunossuprimido (Listeria);\n- **Dexametasona** 0,15 mg/kg EV 6/6h por 2–4 dias — junto com/antes da 1ª dose de ATB.\n\n**Duração:** meningococo **7 dias**; pneumococo **10–14 dias**; Listeria/BGN **21 dias**; TB meníngea **12 meses** (RHZE + corticoide).",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Perda auditiva neurossensorial** — principal sequela, especialmente pneumocócica; **audiometria pós-alta é obrigatória**;\n- Hidrocefalia;\n- Convulsões e epilepsia sequelar;\n- **Síndrome de Waterhouse-Friderichsen** (hemorragia adrenal bilateral na meningococcemia fulminante: choque + CIVD);\n- Trombose de seio venoso, empiema subdural.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **Quimioprofilaxia de contatos:** indicada na doença **meningocócica** (rifampicina 600 mg 12/12h por 2 dias no adulto) e seletivamente no **Hib** — **não é rotina no pneumococo**;\n- **Vacinação:** meningocócicas (C, ACWY, B), pneumocócicas e Hib no calendário.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Nunca atrase o antibiótico** esperando TC ou líquor — colha hemocultura e trate.\n- ★ A TC prévia só é necessária diante dos **preditores de herniação** (imunossupressão, déficit focal, convulsão, papiledema, rebaixamento).\n- ★ **Ampicilina para Listeria** em > 50 anos, gestante, etilista, imunossuprimido — a cefalosporina **não** cobre.\n- ★ **Dexametasona junto/antes do ATB** — depois da lise bacteriana, perde o benefício.\n- ★ **Kernig e Brudzinski têm sensibilidade baixa** — ausência **não** exclui meningite.\n- ★ **Perda auditiva** é a principal sequela → audiometria após a alta.\n- ★ Petéquias/púrpura = meningococcemia → gravíssimo, tratar imediatamente.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância em Saúde (meningites)",
      "IDSA — Practice Guidelines for Bacterial Meningitis",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },
};
