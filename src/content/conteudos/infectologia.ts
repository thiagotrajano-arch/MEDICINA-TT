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
        figura: ["inf-tb-primaria-vs-pos", "inf-tb-miliar-rx-real"],
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
        figura: "inf-liquor",
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

  "inf--infeccoes-sexualmente-transmissiveis--sifilis": {
    subtemaId: "inf--infeccoes-sexualmente-transmissiveis--sifilis",
    titulo: "Sífilis (adquirida, gestacional e congênita)",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "IST (e infecção **verticalmente transmissível**) causada pela espiroqueta **Treponema pallidum**. Doença **sistêmica, em estágios**, com apresentações muito variáveis — \"a grande imitadora\".\n\n⭐ **Tema-curinga da OMED:** apareceu em **3 das 4 últimas edições** da prova.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O T. pallidum penetra por mucosas ou pele com solução de continuidade durante o contato sexual, multiplica-se localmente (**cancro**) e dissemina-se por via **linfo-hematogênica**.\n\n- Atravessa a **barreira placentária em qualquer fase gestacional** — o risco de transmissão vertical é **maior quanto mais recente** a infecção materna;\n- Cruza a **barreira hematoencefálica em qualquer estágio** — a neurossífilis pode ser precoce ou tardia (não é exclusiva da fase terciária).",
      },
      {
        secao: "Quadro clínico (estágios)",
        corpo:
          "**Primária** — **cancro duro**: úlcera **única, indolor**, bordos endurecidos, base limpa, com adenopatia satélite não dolorosa. **Resolve espontaneamente em 3–8 semanas mesmo sem tratamento** (o que dá falsa sensação de cura).\n\n**Secundária** (6–8 sem após o cancro) — roséola/exantema maculopapular que tipicamente acomete **palmas e plantas**, **condiloma plano**, **alopecia em clareira**, madarose, linfadenopatia generalizada, sintomas gripais.\n\n**Latente** — assintomática, com sorologia reagente. **Recente (< 1 ano)** ou **tardia (> 1 ano ou duração indeterminada)** — essa divisão **define o esquema terapêutico**.\n\n**Terciária** (anos depois) — **goma sifilítica**; **cardiovascular** (aortite/aneurisma de aorta **ascendente**); **neurossífilis tardia** (tabes dorsalis com ataxia sensitiva; **pupila de Argyll-Robertson** — acomoda mas não reage à luz; paralisia geral progressiva).",
        figura: ["inf-sifilis-estagios", "inf-sifilis-cancro-real", "inf-sifilis-secundaria-real"],
      },
      {
        secao: "Diagnóstico",
        corpo:
          "Exige **dois testes**: um treponêmico + um não-treponêmico.\n\n- **Treponêmicos** (FTA-Abs, teste rápido, ELISA): tornam-se reagentes **primeiro** e permanecem reagentes **pela vida toda**, mesmo após cura → **não servem para seguimento**.\n- **Não-treponêmicos** (VDRL, RPR): **quantificáveis em títulos** (ex.: 1:16) → usados para **atividade e seguimento**. **Queda de ≥ 2 diluições em 3 meses** (ou 4 em 6 meses) indica sucesso terapêutico. Podem dar **falso-positivo biológico** (gestação, LES, HIV, hanseníase, malária).\n\n**Fluxograma tradicional:** treponêmico (triagem) → se reagente, não-treponêmico (título/atividade). O MS também aceita o **fluxograma inverso** (VDRL primeiro).\n\n**Neurossífilis:** **VDRL no líquor** (alta especificidade, baixa sensibilidade) + pleocitose/hiperproteinorraquia.",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "- **Sífilis congênita:** radiografia de ossos longos com **periostite** e **metafisite** (bandas de rarefação; **sinal de Wimberger** — rarefação da metáfise proximal da tíbia); **pseudoparalisia de Parrot** (a criança \"poupa\" o membro pela dor).\n- **Sífilis cardiovascular terciária:** **aneurisma sacular de aorta ascendente** — **poupa tipicamente a aorta abdominal** (ao contrário do aneurisma aterosclerótico).\n- **Neurossífilis:** RM pode mostrar realce meníngeo ou gomas; frequentemente inespecífica.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **Cancro mole** (*H. ducreyi*): úlceras **múltiplas e dolorosas**, bordos irregulares, fundo sujo — o oposto do cancro duro;\n- **Herpes genital:** múltiplas vesículas/úlceras dolorosas;\n- Linfogranuloma venéreo;\n- **Farmacodermia:** o secundarismo pode mimetizar exantema medicamentoso — o acometimento **palmoplantar favorece sífilis**.",
      },
      {
        secao: "Tratamento",
        corpo:
          "⚠️ **A penicilina G benzatina é o único tratamento validado na gestação** — não há alternativa equivalente para prevenir a transmissão vertical. **Mesmo com relato de alergia, indica-se dessensibilização.**\n\n| Estágio | Esquema |\n|---|---|\n| Primária, secundária, latente **recente** (< 1 a) | Penicilina G benzatina **2,4 milhões UI IM, dose única** |\n| Latente **tardia**/indeterminada, terciária (exceto neuro) | Penicilina G benzatina **2,4 milhões UI IM, semanal por 3 semanas** |\n| **Neurossífilis** (qualquer fase) | Penicilina G **cristalina** 18–24 milhões UI/dia EV (3–4 mi 4/4h), **10–14 dias** — a benzatina **não atinge níveis liquóricos** |\n\nTratar sempre a(s) **parceria(s) sexual(is)**.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **Pré-natal adequado com testagem** (1º trimestre, 3º trimestre e no parto) é o principal determinante evitável da sífilis congênita;\n- **Sífilis congênita é evento sentinela de falha assistencial** — **notificação compulsória**;\n- Preservativo e rastreio de ISTs concomitantes.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Cancro duro = indolor**; **cancro mole = doloroso**. Inverter é a pegadinha clássica.\n- ★ **Exantema palmoplantar** = sífilis secundária até prova em contrário.\n- ★ **Treponêmico não serve para seguimento** — fica reagente a vida toda. Seguimento é com **VDRL em títulos**.\n- ★ **Neurossífilis não é exclusiva da terciária** — pode ocorrer em qualquer fase, e exige **penicilina cristalina EV**, nunca benzatina.\n- ★ **Alergia à penicilina na gestante ⇒ dessensibilizar**, não trocar a droga.\n- ★ O cancro **some sozinho** — o desaparecimento **não** significa cura.\n- ★ **Argyll-Robertson:** acomoda, mas não reage à luz.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas para IST",
      "Ministério da Saúde — Guia de Vigilância em Saúde (sífilis congênita)",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--hiv-aids--diagnostico-e-tarv": {
    subtemaId: "inf--hiv-aids--diagnostico-e-tarv",
    titulo: "HIV/AIDS — diagnóstico e TARV",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecção crônica pelo **HIV**, retrovírus que infecta linfócitos **T-CD4+**, macrófagos e células dendríticas, levando à depleção progressiva de CD4 e **imunodeficiência celular**.\n\n**AIDS** = HIV + **CD4 < 200 células/mm³** e/ou **doença definidora de aids**.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O HIV liga-se ao receptor **CD4** e aos correceptores **CCR5/CXCR4**, e integra seu genoma ao DNA do hospedeiro via **transcriptase reversa** e **integrase**.\n\nA replicação contínua causa ativação imune crônica e exaustão/depleção de CD4, com **destruição precoce e maciça dos linfócitos T de memória da mucosa intestinal (GALT)** já nas primeiras semanas. A imunossupressão progressiva abre espaço para as **infecções oportunistas típicas de cada faixa de CD4**.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "- **Infecção aguda** (2–4 sem após exposição): síndrome **mononucleose-like** — febre, faringite, linfadenopatia, exantema, mialgia. **Carga viral altíssima e sorologia possivelmente negativa** (janela imunológica) — momento de altíssima transmissibilidade.\n- **Latência clínica:** anos assintomáticos, com replicação viral persistente.\n- **Sintomática/AIDS:** infecções oportunistas e neoplasias definidoras conforme a faixa de CD4.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Fluxograma MS:** teste rápido ou **imunoensaio de 4ª geração** (detecta **antígeno p24 + anticorpos**, reduzindo a janela para ~2–3 semanas) → se reagente, confirmar com **2º teste rápido de fabricante diferente** OU **carga viral (RNA-HIV)**.\n\n- **CD4** define o estadiamento imunológico e o risco de oportunistas;\n- **Carga viral** monitora a resposta terapêutica (meta: **indetectável**);\n- ⚠️ A **genotipagem pré-tratamento não é mais obrigatória** em virgens de tratamento na era do dolutegravir (alta barreira genética).",
      },
      {
        secao: "Infecções oportunistas — imagem",
        corpo:
          "| Oportunista | Achado |\n|---|---|\n| **Pneumocistose** (*P. jirovecii*) | Infiltrado **intersticial bilateral em vidro fosco, poupando os ápices**, padrão \"asa de morcego\" perihilar |\n| **Neurotoxoplasmose** | RM: lesões **múltiplas com realce anelar** e edema perilesional, predomínio em núcleos da base |\n| **Linfoma primário de SNC** | RM: lesão **única**, realce **homogêneo** (diferencia da toxo pela **não resposta** ao tratamento empírico em 2 semanas) |\n| **Criptococose de SNC** | RM pode ser normal; a chave é a **pressão de abertura liquórica elevada** |\n| **Tuberculose** | Em imunossupressão avançada **pode não cavitar** — padrão atípico/miliar |",
      },
      {
        secao: "Tratamento",
        corpo:
          "**\"Treat all\":** TARV indicada para **todo paciente HIV+**, independentemente de CD4 e carga viral, iniciada o mais precocemente possível — reduz transmissibilidade e morbimortalidade.\n\n**Esquema preferencial de 1ª linha (adulto virgem de tratamento) — \"rapid start\":**\n**TDF + 3TC + DTG** (tenofovir + lamivudina + **dolutegravir**), dose fixa combinada, **1×/dia**, idealmente **no mesmo dia do diagnóstico**.\n\n**Coinfecção TB-HIV:** tratar a **TB imediatamente**; a TARV entra conforme o CD4:\n- **CD4 < 50:** TARV em **até 2 semanas** (o benefício supera o risco de SIRI);\n- **CD4 ≥ 50:** TARV entre **8–12 semanas** (menor risco de SIRI grave).",
      },
      {
        secao: "Profilaxias primárias",
        corpo:
          "| Situação | Profilaxia | Limiar de CD4 |\n|---|---|---|\n| **Pneumocistose** | **SMX-TMP** | CD4 < 200 |\n| **Neurotoxoplasmose** | **SMX-TMP** (mesma droga cobre ambas) | CD4 < 100 **+ IgG antitoxo reagente** |\n| **Complexo M. avium (MAC)** | Azitromicina semanal | CD4 < 50 |\n| Criptococose/Histoplasmose | Não se indica profilaxia primária de rotina | — |\n\nSuspender as profilaxias quando o CD4 recuperar acima do limiar por **≥ 3–6 meses** em TARV com carga indetectável.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **SIRI (síndrome de reconstituição imune inflamatória):** piora **paradoxal** de infecção oportunista preexistente após o início da TARV, pela resposta imune restaurada;\n- **Neoplasias definidoras:** sarcoma de Kaposi (HHV-8), linfoma não-Hodgkin, câncer de colo do útero invasivo;\n- Nefropatia e cardiomiopatia associadas ao HIV;\n- Falência terapêutica por má adesão → resistência.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **PrEP** (pré-exposição): tenofovir + entricitabina contínuo para grupos de alto risco;\n- **PEP** (pós-exposição): iniciar em **até 72 h** (idealmente 2 h), por **28 dias**, com o esquema TARV preferencial;\n- **Transmissão vertical:** TARV na gestação com meta de **carga indetectável no parto**; AZT intraparto se carga desconhecida/detectável; **cesárea eletiva se > 1000 cópias/mL** ou desconhecida perto do parto; AZT no RN por 4 semanas; **contraindicação absoluta de amamentação**;\n- **I = I (Indetectável = Intransmissível):** carga viral indetectável sustentada **elimina o risco de transmissão sexual**.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Treat all** — não existe mais \"esperar o CD4 cair\" para iniciar TARV.\n- ★ Esquema atual: **TDF + 3TC + DTG**, rapid start no dia do diagnóstico.\n- ★ **TB-HIV:** CD4 < 50 → TARV em **2 semanas**; CD4 ≥ 50 → **8 semanas**. (Não é \"no mesmo dia\" — equilíbrio com o risco de SIRI.)\n- ★ **Lesão anelar múltipla em RM de HIV+ = neurotoxoplasmose** até prova em contrário; se **não responder em 2 semanas**, pensar em **linfoma primário de SNC**.\n- ★ **SMX-TMP** trata **e** previne pneumocistose e toxoplasmose (mesma droga, dois limiares de CD4).\n- ★ **Amamentação é contraindicação ABSOLUTA no Brasil**, independentemente da carga viral — o \"I=I\" **não** libera amamentar.\n- ★ **Genotipagem pré-TARV não é mais rotina** em virgem de tratamento.\n- ★ Na aguda, a **sorologia pode ser negativa** com carga viral altíssima (janela).",
      },
    ],
    referencias: [
      "Ministério da Saúde — PCDT para Manejo da Infecção pelo HIV em Adultos",
      "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical do HIV",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--arboviroses--dengue-classificacao-e-manejo": {
    subtemaId: "inf--arboviroses--dengue-classificacao-e-manejo",
    titulo: "Dengue — classificação e manejo",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Arbovirose causada pelo **vírus da dengue** (DENV 1–4, *Flavivirus*), transmitida pela fêmea do **Aedes aegypti**. A infecção por um sorotipo confere imunidade **permanente contra aquele sorotipo** e apenas **transitória (e parcial) contra os demais** — por isso é possível adoecer até 4 vezes.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O evento central da dengue grave é o **aumento súbito da permeabilidade capilar** com **extravasamento de plasma** — não é sangramento primário.\n\nA **infecção secundária por sorotipo diferente** aumenta o risco de gravidade pelo fenômeno de **amplificação dependente de anticorpos (ADE)**: anticorpos heterotípicos não neutralizantes facilitam a entrada viral em macrófagos, ampliando a resposta inflamatória e a disfunção endotelial.\n\nA plaquetopenia e o sangramento são consequências; **o que mata é o choque por extravasamento**.",
      },
      {
        secao: "Fases da doença",
        corpo:
          "1. **Febril** (1º–3º dia): febre alta, cefaleia, dor retro-orbitária, mialgia/artralgia, exantema.\n2. **Crítica** (⚠️ **por volta da defervescência, 3º–6º dia**): é **quando a febre cai** que o extravasamento acontece — janela de 24–48 h em que o paciente pode chocar.\n3. **Recuperação:** reabsorção do plasma extravasado (risco de **hipervolemia** se a hidratação não for reduzida); pode surgir exantema \"ilhas de branco em mar vermelho\" e prurido.\n\n⚠️ **A queda da febre NÃO é melhora** — é o sinal de entrada na fase crítica.",
        figura: "inf-dengue-fases",
      },
      {
        secao: "Sinais de alarme",
        corpo:
          "- **Dor abdominal intensa e contínua** ou dor à palpação;\n- **Vômitos persistentes**;\n- **Acúmulo de líquidos** (ascite, derrame pleural/pericárdico);\n- **Sangramento de mucosas**;\n- **Letargia ou irritabilidade**;\n- **Hipotensão postural / lipotimia**;\n- **Hepatomegalia > 2 cm**;\n- **Aumento progressivo do hematócrito** (hemoconcentração).",
      },
      {
        secao: "Classificação e conduta (grupos MS)",
        corpo:
          "| Grupo | Definição | Conduta |\n|---|---|---|\n| **A** | Sem sinais de alarme, sem comorbidade/risco social | Hidratação **oral** domiciliar (60 mL/kg/dia, 1/3 com SRO); retorno se sinais de alarme |\n| **B** | Sem sinais de alarme, **com** sangramento espontâneo de pele (prova do laço +) **ou** condição de risco (gestante, < 2 a, > 65 a, comorbidade) | Hemograma; observação até resultado; hidratação oral |\n| **C** | **Com sinais de alarme** | **Internar**; hidratação **EV 10 mL/kg em 1 h**, reavaliando e repetindo até 3× |\n| **D** | **Choque / dengue grave** | **UTI**; expansão **20 mL/kg em até 20 min**; reavaliar |",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "- **Até o 5º dia:** **NS1** (antígeno) ou **RT-PCR**;\n- **A partir do 6º dia:** **sorologia IgM** (ELISA);\n- **Hemograma seriado** é o exame de acompanhamento essencial: **hematócrito subindo + plaquetas caindo** = extravasamento;\n- **Prova do laço:** triagem de fragilidade capilar (integra o grupo B).",
      },
      {
        secao: "Tratamento",
        corpo:
          "- **Hidratação é o pilar** — não existe antiviral.\n- **Sintomático:** **dipirona ou paracetamol**.\n- ⚠️ **Contraindicados: AAS e AINEs** (risco de sangramento e de síndrome de Reye em crianças).\n- **Transfusão de plaquetas NÃO é indicada** pela plaquetopenia isolada — apenas em sangramento grave com instabilidade.\n- Na fase de **recuperação**, **reduzir a hidratação** para não causar congestão/edema agudo de pulmão.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **Chikungunya:** **artralgia intensa e incapacitante**, frequentemente **crônica** (meses); febre alta e exantema precoce;\n- **Zika:** exantema **pruriginoso precoce**, febre baixa ou ausente, **conjuntivite não purulenta**; risco de **microcefalia** (vertical) e **Guillain-Barré**;\n- Leptospirose, malária, febre amarela, sepse bacteriana, riquetsioses.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **A defervescência marca o início da fase crítica** — nunca dar alta \"porque a febre baixou\".\n- ★ **O problema é extravasamento plasmático, não plaquetopenia** → trata-se com **volume**, não com plaqueta.\n- ★ **Não transfundir plaquetas** por número isolado.\n- ★ **AAS e AINE são proibidos.**\n- ★ Dengue grave por **infecção secundária com outro sorotipo** (ADE).\n- ★ **NS1 até o 5º dia; IgM a partir do 6º.**\n- ★ Na **recuperação**, reduzir volume — o risco vira **hipervolemia**.\n- ★ **Artralgia crônica = chikungunya**; **exantema pruriginoso + conjuntivite = zika**.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Dengue: diagnóstico e manejo clínico (adulto e criança)",
      "OMS — Dengue Guidelines for Diagnosis, Treatment, Prevention and Control",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--sepse--reconhecimento-e-surviving-sepsis": {
    subtemaId: "inf--sepse--reconhecimento-e-surviving-sepsis",
    titulo: "Sepse e choque séptico",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição (Sepsis-3)",
        corpo:
          "- **Sepse:** **disfunção orgânica ameaçadora à vida** causada por **resposta desregulada do hospedeiro** à infecção. Operacionalmente: infecção suspeita/confirmada **+ aumento ≥ 2 pontos no SOFA**.\n- **Choque séptico:** sepse com **necessidade de vasopressor** para manter **PAM ≥ 65 mmHg** **E** **lactato > 2 mmol/L**, **apesar de reposição volêmica adequada**. Mortalidade > 40%.\n\n⚠️ O conceito de **SIRS foi abandonado** como definidor (baixa especificidade) — a marca da sepse é a **disfunção orgânica**, não a resposta inflamatória.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "A resposta desregulada combina inflamação exuberante e imunossupressão:\n\n- **Vasodilatação/vasoplegia** com má distribuição de fluxo;\n- **Lesão endotelial** e **extravasamento capilar** → hipovolemia relativa e absoluta;\n- **Disfunção microcirculatória** e **coagulopatia** (ativação da coagulação com consumo → CIVD);\n- **Disfunção mitocondrial** → hipóxia citopática (a célula não usa o O₂ mesmo com oferta).\n\nO **lactato** elevado reflete hipoperfusão **e** estresse adrenérgico/disfunção mitocondrial — não é apenas marcador de hipóxia.",
      },
      {
        secao: "Reconhecimento",
        corpo:
          "- **qSOFA** (≥ 2 sugere risco, à beira do leito): **FR ≥ 22**, **alteração do estado mental (Glasgow < 15)**, **PAS ≤ 100 mmHg**. É ferramenta de **alerta**, não de diagnóstico — a Surviving Sepsis **desaconselha usá-lo como triagem única**.\n- **SOFA:** avalia 6 sistemas (respiratório, coagulação, hepático, cardiovascular, SNC, renal).\n- **NEWS/MEWS** são alternativas de triagem com melhor sensibilidade.",
      },
      {
        secao: "Conduta — pacote da 1ª hora",
        corpo:
          "1. **Dosar lactato** (repetir em 2–4 h se > 2);\n2. **Colher hemoculturas ANTES do antibiótico** — desde que **não atrase** o ATB em mais de ~45 min;\n3. **Antibiótico de amplo espectro na 1ª hora** (no choque séptico; na sepse sem choque, idealmente em até 1 h, aceitável até 3 h após avaliação);\n4. **Cristaloide 30 mL/kg** na hipotensão ou lactato ≥ 4 (⚠️ preferir **balanceado** — Ringer lactato — a soro fisiológico, pelo risco de acidose hiperclorêmica);\n5. **Vasopressor** se a PAM permanecer < 65 apesar do volume — **noradrenalina é a 1ª escolha**.\n\n⚠️ **Controle do foco** (drenagem de abscesso, retirada de cateter, desbridamento) é tão importante quanto o antibiótico — sepse com foco não controlado não melhora.",
      },
      {
        secao: "Tratamento avançado",
        corpo:
          "- **Alvo de PAM ≥ 65 mmHg**; noradrenalina; **vasopressina** como 2ª droga (poupadora de catecolamina);\n- **Dobutamina** se disfunção miocárdica com hipoperfusão persistente apesar de volume e PAM adequados;\n- **Hidrocortisona** (200 mg/dia) no **choque refratário** com necessidade crescente de vasopressor;\n- **Transfusão** apenas se **Hb < 7 g/dL** (estratégia restritiva), salvo isquemia ativa;\n- **Ventilação protetora** se SDRA: **volume corrente 6 mL/kg** de peso predito, pressão de platô < 30.",
      },
      {
        secao: "Metas e reavaliação",
        corpo:
          "- **Clareamento do lactato** (norteia a ressuscitação);\n- **Tempo de enchimento capilar** — reabilitado como meta simples e útil;\n- Diurese, nível de consciência, perfusão periférica;\n- ⚠️ **PVC e SvcO₂ isolados foram abandonados** como metas obrigatórias (após ProCESS/ARISE/ProMISe).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Sepse = infecção + disfunção orgânica.** SIRS **não** define mais.\n- ★ **Choque séptico = vasopressor para PAM ≥ 65 + lactato > 2 apesar de volume.**\n- ★ **Noradrenalina é o vasopressor de 1ª escolha** (não dopamina — maior arritmia).\n- ★ **Hemocultura antes do ATB, mas nunca atrasar o ATB por ela.**\n- ★ **30 mL/kg** de cristaloide; **balanceado > SF 0,9%**.\n- ★ **Controle do foco** é indispensável.\n- ★ **qSOFA é alerta, não diagnóstico** — e não deve ser triagem única.\n- ★ **Hidrocortisona só no choque refratário**, não em toda sepse.\n- ★ Transfundir só com **Hb < 7**.",
      },
    ],
    referencias: [
      "Surviving Sepsis Campaign — International Guidelines for Management of Sepsis and Septic Shock",
      "Singer M. et al. — The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3), JAMA",
      "Instituto Latino-Americano de Sepse (ILAS) — protocolos",
    ],
  },

  "inf--pneumonias--pneumonia-adquirida-na-comunidade": {
    subtemaId: "inf--pneumonias--pneumonia-adquirida-na-comunidade",
    titulo: "Pneumonia adquirida na comunidade (PAC)",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecção aguda do **parênquima pulmonar**. Classifica-se em:\n\n- **PAC** — adquirida na comunidade;\n- **PAH** — hospitalar (**≥ 48 h de internação**);\n- **PAV** — associada à ventilação mecânica.\n\n👉 A classificação não é burocracia: **cada categoria tem espectro de agentes e escolha antibiótica diferentes**.",
      },
      {
        secao: "Etiologia",
        corpo:
          "**PAC típica:** ***Streptococcus pneumoniae*** — o agente mais comum globalmente.\n\n**PAC atípica:**\n- ***Mycoplasma pneumoniae*** — jovens, \"pneumonia que anda\" (o paciente segue em pé);\n- *Chlamydophila pneumoniae*;\n- ***Legionella pneumophila*** — associada a **ar-condicionado / torres de resfriamento**; pode cursar com **SIADH (hiponatremia)** e diarreia.\n\n**PAH/PAV:** predomínio de **Gram-negativos** (Pseudomonas, Klebsiella, Acinetobacter) e ***S. aureus*** (incluindo **MRSA**), com muito mais multirresistência.",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "- Extremos de idade, tabagismo, **DPOC**;\n- **Etilismo** — risco de aspiração e de agentes específicos (**Klebsiella**);\n- Imunossupressão;\n- **Disfagia / rebaixamento de consciência** → broncoaspiração → **anaeróbios**;\n- **Hospitalização recente ou antibiótico prévio** → risco de multirresistência.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Típica:** início **agudo**, febre alta, calafrios, **tosse produtiva purulenta**, dor pleurítica, taquipneia; **estertores e broncofonia** ao exame.\n\n**Atípica:** início **insidioso**, **tosse seca**, sintomas extrapulmonares (cefaleia, mialgia, **diarreia na Legionella**). A ausculta pode ser **desproporcionalmente pobre** frente ao infiltrado radiológico — a chamada **\"dissociação clínico-radiológica\"**.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Clínico + radiológico** (infiltrado novo).\n\n**CURB-65** guia a decisão de internar — 1 ponto cada:\n- **C**onfusão;\n- **U**reia > 50 mg/dL;\n- **R**espiração (FR) ≥ 30;\n- **B**lood pressure < 90/60;\n- **65** anos ou mais.\n\n👉 **≥ 2 pontos → considerar internação.**\n\n**Hemocultura e cultura de escarro** nos casos graves/internados. **Antígeno urinário** para pneumococo e Legionella nos casos graves.",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**Radiografia de tórax é obrigatória** para confirmar:\n\n- **Consolidação lobar homogênea com broncograma aéreo** — padrão clássico da **típica (pneumocócica)**;\n- **Infiltrado intersticial/reticular difuso** — padrão **atípico** (Mycoplasma, viral);\n- **Broncopneumonia** (multifocal, peribrônquica) — *S. aureus*, aspiração.\n\n**TC de tórax** apenas em dúvida diagnóstica, suspeita de complicação (abscesso, empiema) ou paciente grave sem resposta.",
        figura: "inf-pneumonia-consolidacao-real",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **TEP** — pode simular pneumonia (dor pleurítica + infiltrado por infarto pulmonar);\n- **Tuberculose** — evolução mais arrastada;\n- **Insuficiência cardíaca descompensada** — edema pulmonar confunde no RX;\n- **Neoplasia com pneumonia obstrutiva pós-estenótica** — suspeitar se **não resolve ou recorre no mesmo local**.",
      },
      {
        secao: "Tratamento",
        corpo:
          "| Cenário | Esquema empírico |\n|---|---|\n| **Ambulatorial, hígido** | Amoxicilina (± clavulanato) **OU** macrolídeo se suspeita de atípico |\n| **Ambulatorial com comorbidade** | Amoxicilina-clavulanato **+** macrolídeo, **ou** quinolona respiratória isolada |\n| **Internado (enfermaria)** | Betalactâmico EV (ceftriaxona) **+** macrolídeo, **ou** quinolona respiratória isolada |\n| **Grave (UTI)** | Betalactâmico EV **+** macrolídeo (cobertura dupla) ± cobertura para Pseudomonas se fator de risco |\n| **PAH/PAV** | Amplo para Gram-negativos multirresistentes ± MRSA, conforme epidemiologia local |\n\n**Duração:** mínimo **5 dias** **E** afebril por **48–72 h** antes de suspender (PAC não complicada). Estender para 7–14 dias em Pseudomonas, *S. aureus* ou complicação.\n\n👉 **Suspende-se por critério clínico, não por dia fixo no calendário.**",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Derrame parapneumônico / empiema** — drenar se **loculado, pH < 7,2 ou purulento**;\n- **Abscesso pulmonar** — anaeróbios/aspiração; **cavitação com nível hidroaéreo**;\n- Sepse/choque séptico de foco pulmonar;\n- **Pneumonia necrosante** — *S. aureus*, especialmente cepas produtoras de **toxina PVL**.",
      },
      {
        secao: "Prevenção",
        corpo:
          "- **Vacina pneumocócica** (VPC e/ou polissacarídica, conforme faixa/risco);\n- **Vacina influenza anual** em grupos de risco (idosos, comorbidades, gestantes).\n\n👉 A influenza **predispõe a pneumonia bacteriana secundária** — classicamente por ***S. aureus*** e pneumococo.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Consolidação lobar + broncograma aéreo = típica (pneumococo).** Infiltrado intersticial = atípica.\n- ★ **CURB-65 ≥ 2 → internar.** Decore o acrônimo: Confusão, Ureia > 50, Respiração ≥ 30, BP < 90/60, ≥ 65 anos.\n- ★ **Legionella:** surto por **ar-condicionado** + **hiponatremia (SIADH)** + diarreia.\n- ★ **Mycoplasma:** jovem, tosse seca, \"dissociação clínico-radiológica\".\n- ★ **Suspender ATB por critério clínico** (afebril 48–72 h **e** mínimo 5 dias) — não por número fixo de dias.\n- ★ **Pneumonia que não resolve/recorre no mesmo lugar** → pensar em **neoplasia obstrutiva**.\n- ★ **Empiema:** drenar se pH < 7,2, loculado ou purulento.\n- ★ Pós-influenza → pneumonia bacteriana secundária por ***S. aureus***.",
      },
    ],
    referencias: [
      "Ministério da Saúde / Sociedade Brasileira de Pneumologia e Tisiologia — Diretrizes para PAC",
      "IDSA/ATS — Community-acquired Pneumonia in Adults",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--infeccao-do-trato-urinario--cistite-e-pielonefrite": {
    subtemaId: "inf--infeccao-do-trato-urinario--cistite-e-pielonefrite",
    titulo: "Infecção do trato urinário — cistite e pielonefrite",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecção bacteriana do trato urinário, classificada por:\n\n**Localização:**\n- **Cistite** — baixa;\n- **Pielonefrite** — alta.\n\n**Complexidade:**\n- **Não complicada** — trato urinário estruturalmente normal;\n- **Complicada** — anormalidade anatômica/funcional, **homem**, **gestante**, cateter, imunossupressão.\n\n👉 **Homem com ITU é \"complicada\" por definição** — sempre investigar próstata/via urinária.",
      },
      {
        secao: "Etiologia",
        corpo:
          "- ***Escherichia coli*** uropatogênica: **75–95%** dos casos não complicados, por **ascensão** da flora perineal pela uretra;\n- ***Klebsiella***;\n- ***Proteus mirabilis*** — produz **urease**, alcaliniza a urina → **cálculos de estruvita**;\n- ***Staphylococcus saprophyticus*** — mulheres jovens sexualmente ativas;\n- ***Enterococcus*** e ***Pseudomonas*** — mais em ITU complicada/hospitalar.",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "- **Sexo feminino** (uretra curta), atividade sexual;\n- **Gestação** — estase urinária pela progesterona + compressão uterina → **maior risco de progressão a pielonefrite**;\n- Diabetes, litíase, refluxo vesicoureteral;\n- **Sondagem vesical**;\n- **Hiperplasia prostática** (obstrução);\n- Menopausa (atrofia urogenital).",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Cistite:** disúria, polaciúria, urgência, dor suprapúbica — **sem febre e sem dor lombar**.\n\n**Pielonefrite:** febre, calafrios, **dor em flanco/lombar**, **Giordano positivo** (punho-percussão lombar dolorosa), náuseas/vômitos. Pode ocorrer **sem** sintomas baixos.\n\n⚠️ **Idosos podem apresentar apenas confusão mental ou queda funcional**, sem febre nem disúria clássica.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "- **EAS (urina I):** piúria (leucocitúria), **nitrito positivo** (sugere enterobactéria nitrato-redutase +), esterase leucocitária;\n- **Urocultura com antibiograma** — padrão-ouro. **Obrigatória** em: pielonefrite, ITU complicada, **gestante**, **homem** e recorrência. **Dispensável** na cistite não complicada típica de mulher jovem (trata-se empiricamente).\n\n⚠️ **Bacteriúria assintomática:** só se **rastreia e trata** em **gestantes** (risco de pielonefrite e prematuridade) e **antes de procedimento urológico invasivo**. **Fora isso — idoso, diabético, sondado crônico — NÃO se trata.**",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**Não é rotina** em cistite nem no 1º episódio de pielonefrite não complicada com boa resposta.\n\n**USG de vias urinárias quando:**\n- 1º episódio de pielonefrite **em criança**;\n- **ITU em homem**;\n- Suspeita de obstrução/litíase;\n- Sepse de foco urinário.\n\n**TC de abdome:** se **sem melhora em 72 h** de antibiótico adequado → investigar **abscesso renal/perirrenal** ou **pielonefrite enfisematosa** (diabéticos; gás no parênquima — emergência, frequentemente cirúrgica).\n\n👉 **Sem melhora em 72 h = investigar por imagem, não trocar o antibiótico às cegas.**",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **Vaginite/cervicite** — corrimento, sem piúria verdadeira;\n- **Uretrite por IST**;\n- **Cálculo ureteral** — dor em cólica, hematúria, sem piúria necessariamente;\n- Apendicite/anexite — **Giordano é específico de acometimento renal**;\n- **Prostatite aguda** — homem, toque retal doloroso (⚠️ evitar massagem prostática vigorosa: risco de bacteremia).",
      },
      {
        secao: "Tratamento",
        corpo:
          "| Quadro | 1ª linha | Duração |\n|---|---|---|\n| **Cistite não complicada** | Nitrofurantoína, **fosfomicina dose única**, ou SMX-TMP (conforme resistência local) | 3–5 dias (fosfomicina: dose única) |\n| **Pielonefrite leve/ambulatorial** | Fluoroquinolona (ciprofloxacino) VO | 7 dias |\n| **Pielonefrite grave/internada** | Ceftriaxona ou piperacilina-tazobactam EV, ajustar por cultura | 10–14 dias |\n| **Gestante** | **Cefalexina**, amoxicilina-clavulanato — ⚠️ **evitar quinolona e SMX-TMP** | 7 dias (cistite); **internar** se pielonefrite |\n\n**Posologia:** nitrofurantoína 100 mg 6/6h por 5 dias (⚠️ evitar se **TFG < 30** ou **próximo ao termo** da gestação); fosfomicina trometamol **3 g VO dose única**; ciprofloxacino 500 mg 12/12h (evitar na gestação e em crianças).",
      },
      {
        secao: "Complicações",
        corpo:
          "- Abscesso renal/perirrenal;\n- **Pielonefrite enfisematosa** — diabéticos, gás no parênquima renal, alta mortalidade;\n- Sepse urológica / choque séptico;\n- **Cicatriz renal e hipertensão secundária** — crianças com refluxo vesicoureteral não tratado;\n- Necrose de papila renal (diabéticos, uso crônico de analgésicos).",
      },
      {
        secao: "Prevenção",
        corpo:
          "- Hidratação adequada, **micção pós-coito**, evitar retenção prolongada;\n- **Profilaxia contínua** em baixa dose (nitrofurantoína ou SMX-TMP à noite) para **ITU de repetição (≥ 3 episódios/ano)**;\n- **Estrogênio tópico vaginal** em mulheres na pós-menopausa com ITU recorrente.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Cistite = sem febre, sem dor lombar.** Se tem febre e Giordano → **pielonefrite**.\n- ★ **Bacteriúria assintomática: só trata GESTANTE** (e pré-procedimento urológico). **Nunca** no idoso ou diabético assintomático — essa é a pegadinha nº 1 do tema.\n- ★ **Na gestante, sempre trata** — e com **betalactâmico** (cefalexina); **quinolona e SMX-TMP são proibidos**.\n- ★ **Homem com ITU = complicada por definição** → investigar.\n- ★ **Sem melhora em 72 h → imagem** (abscesso/obstrução), não trocar ATB às cegas.\n- ★ **Pielonefrite enfisematosa** = diabético + gás no rim na TC → emergência cirúrgica potencial.\n- ★ ***Proteus*** → urease → **cálculo de estruvita**.\n- ★ **Cistite não complicada em mulher jovem dispensa urocultura** — trata empiricamente.",
      },
    ],
    referencias: [
      "IDSA — Guidelines for Acute Uncomplicated Cystitis and Pyelonephritis in Women",
      "FEBRASGO / Ministério da Saúde — ITU na gestação",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--endocardite-infecciosa--criterios-de-duke-e-manejo": {
    subtemaId: "inf--endocardite-infecciosa--criterios-de-duke-e-manejo",
    titulo: "Endocardite infecciosa — critérios de Duke e manejo",
    atualizadoEm: "2026-07-16",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecção do **endocárdio**, tipicamente das **válvulas** (nativas ou próteses), caracterizada pela formação de **vegetações** — massas de plaquetas, fibrina e microrganismos.\n\n- **Aguda:** ***S. aureus***, evolução em **dias**, mais **destrutiva**;\n- **Subaguda:** ***Streptococcus viridans***, evolução em **semanas**, sobre válvula **previamente lesada**.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "A equação é: **bacteremia transitória** (procedimento dentário, cateter, drogas IV) **+ lesão endotelial prévia** (valvopatia reumática, prolapso mitral, válvula bicúspide, prótese) → adesão bacteriana → **vegetação**.\n\n👉 A vegetação explica **todo** o quadro clínico: ela **emboliza** (fenômenos vasculares), **destrói a válvula** (insuficiência cardíaca) e **libera antígenos** continuamente (fenômenos imunológicos).",
      },
      {
        secao: "Etiologia",
        corpo:
          "- ***Staphylococcus aureus*** — **a causa mais comum hoje**, inclusive em **válvula nativa**, superando o viridans nas séries recentes;\n- ***Streptococcus viridans*** — subaguda, pós-procedimento dentário;\n- ⚠️ ***Streptococcus bovis/gallolyticus*** — **associa-se a neoplasia de cólon → investigar com colonoscopia**;\n- **Grupo HACEK** — hemocultura de **crescimento lento** (avisar o laboratório);\n- **Usuário de drogas injetáveis → válvula TRICÚSPIDE** (direita), com **embolia pulmonar séptica**.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Febre prolongada + sopro novo ou modificado** é a dupla que levanta a suspeita.\n\n**Fenômenos vasculares** (embólicos):\n- **Lesões de Janeway** — máculas palmoplantares **indolores**;\n- Embolia séptica (AVC, infarto esplênico/renal).\n\n**Fenômenos imunológicos:**\n- **Nódulos de Osler** — **dolorosos**, em polpas digitais;\n- **Manchas de Roth** — hemorragia retiniana com centro claro;\n- Glomerulonefrite; fator reumatoide positivo.\n\nTambém: esplenomegalia, baqueteamento digital (formas subagudas prolongadas).\n\n💡 **Mnemônico:** **Os**ler = **dOloroso**; **Ja**neway = **indolor** (\"J\" de *just a macula*).",
      },
      {
        secao: "Diagnóstico — critérios de Duke modificados",
        corpo:
          "**Critérios MAIORES:**\n1. **Hemocultura positiva** para agente típico, em **2 amostras separadas**;\n2. **Evidência de envolvimento endocárdico** — vegetação ao eco, ou **nova regurgitação** valvar.\n\n**Critérios MENORES:**\n1. **Fator predisponente** (valvopatia, usuário de drogas IV);\n2. **Febre ≥ 38 °C**;\n3. **Fenômenos vasculares** (Janeway, êmbolos);\n4. **Fenômenos imunológicos** (Osler, Roth, FR+);\n5. Hemocultura que não preenche critério maior.\n\n👉 **Endocardite DEFINITIVA:** **2 maiores** **OU** **1 maior + 3 menores** **OU** **5 menores**.\n\n**Hemoculturas:** colher **3 conjuntos de sítios diferentes ANTES do antibiótico** (exceto se instabilidade exigir início imediato).",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "- **Ecocardiograma transtorácico (ETT):** triagem inicial;\n- **Transesofágico (ETE):** **maior sensibilidade** — preferido se **ETT negativo com alta suspeita**, **prótese valvar**, ou suspeita de **abscesso perivalvar**;\n- Achados: vegetação (massa **oscilante** aderida à válvula), regurgitação nova, abscesso perianular, deiscência de prótese;\n- **PET-CT / cintilografia com leucócitos marcados:** útil em **prótese valvar** com eco inconclusivo (critério de imagem incorporado às versões recentes de Duke);\n- **TC de crânio/abdome** se suspeita de êmbolos sépticos.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "- **Febre reumática** — sopro + febre, mas contexto e critérios de **Jones** diferem;\n- **Mixoma atrial** — simula vegetação e emboliza, mas **hemoculturas negativas**;\n- **Lúpus** — endocardite de **Libman-Sacks** (vegetações **estéreis**);\n- Febre de origem indeterminada por outras causas.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Antibioticoterapia prolongada, bactericida e ENDOVENOSA** — **4–6 semanas**, conforme agente e se válvula nativa ou prótese, guiada por hemocultura e antibiograma.\n\n**Empírico (antes da cultura):**\n- **Válvula nativa:** oxacilina/cefazolina + gentamicina (o aminoglicosídeo por curto período busca sinergismo — uso controverso, limitado pela nefrotoxicidade);\n- **Suspeita de MRSA ou prótese:** **vancomicina** ± rifampicina/gentamicina;\n- **Estreptococo sensível:** penicilina G ou ceftriaxona, 4 semanas.\n\n**⚠️ Indicações de CIRURGIA valvar:**\n1. **Insuficiência cardíaca refratária** (a mais frequente);\n2. **Infecção não controlada** — abscesso, deiscência de prótese, patógeno resistente/fúngico;\n3. **Êmbolos recorrentes** apesar de antibiótico adequado;\n4. **Vegetação > 10 mm** com alto risco embólico.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Insuficiência cardíaca** por destruição valvar — a principal causa de óbito e de indicação cirúrgica;\n- **Abscesso perivalvar/perianular** → ⚠️ **bloqueio AV novo sugere extensão para o feixe de condução**;\n- **Embolia séptica sistêmica** (AVC, infarto esplênico/renal); **embolia pulmonar séptica** na tricúspide;\n- Glomerulonefrite por imunocomplexos.",
      },
      {
        secao: "Prevenção",
        corpo:
          "**A profilaxia antibiótica antes de procedimento odontológico** (manipulação gengival/mucosa) hoje é reservada **apenas a grupos de altíssimo risco**:\n- **Prótese valvar**;\n- **Endocardite prévia**;\n- **Cardiopatia congênita cianótica** não corrigida, ou corrigida há **< 6 meses** com material protético;\n- Transplante cardíaco com valvopatia.\n\n**Esquema:** **amoxicilina 2 g VO dose única, 30–60 min antes**.\n\n⚠️ **Não é mais indicada de rotina** para a maioria das valvopatias — mudança importante e muito cobrada.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ ***S. aureus* é hoje a causa mais comum**, inclusive em válvula nativa — não é mais o viridans.\n- ★ **Duke: 2 maiores OU 1 maior + 3 menores OU 5 menores.**\n- ★ **3 hemoculturas de sítios diferentes ANTES do antibiótico.**\n- ★ **Osler dói, Janeway não.**\n- ★ ***S. bovis/gallolyticus* → colonoscopia** (neoplasia de cólon).\n- ★ **Usuário de drogas IV → tricúspide** → embolia **pulmonar** séptica.\n- ★ **ETE** se prótese, ETT negativo com alta suspeita, ou suspeita de abscesso.\n- ★ **Bloqueio AV novo = abscesso perianular** até prova em contrário.\n- ★ **Profilaxia odontológica só em altíssimo risco** (prótese, EI prévia, congênita cianótica) — não mais para toda valvopatia.\n- ★ Cirurgia: **IC refratária**, infecção não controlada, êmbolos recorrentes, vegetação > 10 mm.",
      },
    ],
    referencias: [
      "Critérios de Duke modificados",
      "ESC — Guidelines for the management of endocarditis",
      "AHA — Infective Endocarditis in Adults",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--hepatites-virais--interpretacao-sorologica": {
    subtemaId: "inf--hepatites-virais--interpretacao-sorologica",
    titulo: "Hepatites virais — interpretação sorológica",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Inflamação hepática causada pelos vírus **hepatotrópicos A, B, C, D e E**, que diferem em **via de transmissão**, **potencial de cronificação** e **conduta**. Tema muito integrado com GO (transmissão vertical) e Infectologia geral (coinfecção HIV).",
      },
      {
        secao: "Etiologia e transmissão",
        corpo:
          "- **A e E:** RNA vírus, transmissão **fecal-oral**, **não cronificam** (E também zoonótico — carne de porco malcozida);\n- **B:** DNA vírus, transmissão **sexual/parenteral/vertical**, pode cronificar — risco **inversamente proporcional à idade de aquisição** (até **90%** se adquirida no período neonatal);\n- **C:** RNA vírus, transmissão **parenteral predominante**, **alto potencial de cronificação (~75–85%)** — principal causa de hepatopatia crônica relacionada a transfusão/uso de drogas injetáveis no passado;\n- **D (delta):** RNA **defectivo**, **só replica na presença do HBV** (coinfecção ou superinfecção), agrava o curso da hepatite B.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Fase aguda:** pode ser assintomática (maioria dos casos de B e C) ou apresentar mal-estar, náuseas, dor em hipocôndrio direito, icterícia, colúria, acolia fecal. Hepatite B aguda pode ter **fenômenos extra-hepáticos** por imunocomplexos (poliartrite, urticária, glomerulonefrite).\n\n**Hepatite crônica (B/C):** frequentemente **assintomática por décadas** até estágio de cirrose/descompensação.",
      },
      {
        secao: "Diagnóstico sorológico",
        corpo:
          "| Marcador | Significado |\n|---|---|\n| Anti-HAV IgM | Infecção aguda por hepatite A |\n| HBsAg | Infecção atual por HBV (aguda ou crônica) |\n| Anti-HBc IgM | Infecção aguda/recente por HBV (**janela imunológica**, quando HBsAg já pode ter negativado) |\n| Anti-HBs | Imunidade (vacinal ou pós-infecção resolvida) |\n| HBeAg / HBV-DNA | Replicação viral ativa — maior infectividade |\n| Anti-HCV | **Triagem** — confirmar sempre com **HCV-RNA** (anti-HCV+ não distingue infecção ativa de cicatriz sorológica) |",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**USG de abdome:** hepatomegalia na fase aguda; na hepatite crônica avançada — fígado heterogêneo, nodular, com sinais de hipertensão portal (esplenomegalia, veia porta calibrosa, circulação colateral, ascite). **Elastografia hepática (FibroScan)** estima o grau de fibrose de forma não invasiva, reduzindo a necessidade de biópsia. **TC/RM com contraste** indicada para rastreio/caracterização de carcinoma hepatocelular em cirróticos (nódulo com **realce arterial e washout venoso**).",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "Hepatite medicamentosa/tóxica (paracetamol, fitoterápicos), hepatite autoimune, **doença de Wilson** (jovem + Kayser-Fleischer + ceruloplasmina baixa), esteato-hepatite, colangite (padrão colestático com dor + febre + icterícia — tríade de Charcot).",
      },
      {
        secao: "Tratamento",
        corpo:
          "- **Hepatite A/E:** suporte apenas (autolimitada); monitorar hepatite fulminante (rara);\n- **Hepatite B crônica:** **tenofovir** (alta barreira genética) é o antiviral de escolha, indicado conforme critérios de atividade (HBV-DNA elevado + ALT alterada ou fibrose significativa); tratamento geralmente prolongado/indefinido;\n- **Hepatite C:** **antivirais de ação direta (DAA)** — ex.: sofosbuvir + velpatasvir (esquemas pangenotípicos) — curam **> 95%** dos casos em 8–12 semanas; a era do interferon está superada.",
      },
      {
        secao: "Posologia e profilaxia",
        corpo:
          "**Tenofovir** 300 mg 1×/dia (ajustar por função renal). **Sofosbuvir/velpatasvir** 400/100 mg 1×/dia por 12 semanas (esquema pangenotípico padrão, SUS disponibiliza). **Vacina de hepatite B:** esquema 0-1-6 meses (ou combinada no PNI infantil); **imunoglobulina hiperimune (HBIG) + vacina no RN de mãe HBsAg+** nas primeiras **12–24h** de vida — as duas juntas, nunca só a vacina.",
      },
      {
        secao: "Complicações",
        corpo:
          "- Cirrose hepática e suas descompensações (ascite, encefalopatia, varizes);\n- **Carcinoma hepatocelular** (risco aumentado em B mesmo sem cirrose, por integração viral ao genoma; em C o risco é predominantemente ligado à cirrose);\n- **Hepatite fulminante** (rara, mais associada à hepatite B com coinfecção delta, ou **hepatite E em gestante** — mortalidade elevada);\n- Manifestações extra-hepáticas (crioglobulinemia mista na C, poliarterite nodosa na B).",
      },
      {
        secao: "Prevenção",
        corpo:
          "Vacina de hepatite A e B no calendário infantil (PNI). Transmissão vertical de hepatite B: RN de mãe HBsAg+ recebe **vacina + HBIG** nas primeiras horas de vida — reduz drasticamente a cronificação. **Não há vacina para hepatite C** — prevenção é triagem de sangue/hemoderivados, não compartilhamento de material perfurocortante, e tratamento universal de infectados.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Anti-HCV positivo não significa infecção ativa** — sempre confirmar com **HCV-RNA** antes de tratar ou dar prognóstico.\n- ★ Hepatite C hoje se cura em **> 95%** dos casos com DAA em 8–12 semanas — **não existe mais interferon como 1ª linha**.\n- ★ Quanto mais jovem ao adquirir hepatite B, **maior a chance de cronificação** — até 90% se transmissão vertical/neonatal sem profilaxia.\n- ★ RN de mãe HBsAg+ precisa de **vacina + HBIG juntas** nas primeiras 12–24h — a vacina isolada não basta.\n- ★ **Anti-HBc IgM** pode ser o único marcador positivo na \"janela\" entre HBsAg negativar e anti-HBs ainda não aparecer.\n- ★ **Hepatite E em gestante** tem risco de forma fulminante.\n- ★ **Hepatite delta só existe na presença de hepatite B** (coinfecção ou superinfecção) — piora o prognóstico.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas para Hepatite B e Coinfecções",
      "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas para Hepatite C e Coinfecções",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki": {
    subtemaId: "inf--doencas-exantematicas--sarampo-rubeola-escarlatina-e-kawasaki",
    titulo: "Doenças exantemáticas — sarampo, rubéola, escarlatina e Kawasaki",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Grupo de doenças infecciosas, predominantemente virais, que cursam com **exantema cutâneo característico** — o **padrão temporal** (quando a febre aparece/cede em relação ao exantema) e a **morfologia/distribuição** são as chaves diagnósticas mais cobradas em prova.",
      },
      {
        secao: "Etiologia",
        corpo:
          "**Sarampo** (*Paramyxovirus*), **rubéola** (*Togavirus*), **exantema súbito** (HHV-6), **eritema infeccioso** (Parvovírus B19 — infecta precursores eritroides, causando risco de crise aplásica/hidropsia fetal), **escarlatina** (exotoxina eritrogênica do *Streptococcus pyogenes*). Cobertura vacinal inadequada é o principal determinante de surtos de sarampo e rubéola (imunopreveníveis); **sarampo é um dos vírus mais transmissíveis conhecidos**.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "- **Sarampo:** pródromo 3–5 dias (tosse/coriza/conjuntivite) → **manchas de Koplik** → exantema céfalo-caudal maculopapular D3–D5;\n- **Rubéola:** pródromo leve → exantema rosado céfalo-caudal fugaz + **linfadenopatia retroauricular**;\n- **Escarlatina:** febre + faringite → exantema micropapular **\"em lixa\"** + Filatov/Pastia → descamação;\n- **Exantema súbito (HHV-6):** febre alta 3–4 dias **que cede E ENTÃO surge o exantema** (a criança melhora ao exantemar);\n- **Eritema infeccioso (Parvo B19):** **\"face esbofeteada\"** → exantema rendilhado em membros, poupando a face depois;\n- **Kawasaki** (vasculite, não infecciosa, mas sempre estudada junto): **febre ≥ 5 dias + 4 dos 5 critérios** — conjuntivite não exsudativa bilateral, alterações de mucosa oral (lábios fissurados, língua \"em framboesa\"), exantema polimorfo, alterações de extremidades (edema/eritema, descamação periungueal tardia), linfadenopatia cervical ≥ 1,5 cm;\n- **MIS-C** (síndrome inflamatória multissistêmica pediátrica pós-COVID): febre + inflamação multissistêmica + disfunção cardíaca, temporalmente associada a infecção prévia por SARS-CoV-2 — diferencial importante de Kawasaki.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "Predominantemente **clínico** pelo padrão do exantema e pródromos. Sorologia IgM específica confirma sarampo, rubéola e parvovírus quando necessário (**notificação compulsória exige confirmação laboratorial para sarampo/rubéola**). **Kawasaki é diagnóstico clínico** (critérios), sem exame único confirmatório — provas inflamatórias (PCR/VHS elevadas) e plaquetose são de apoio.",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**Kawasaki:** ecocardiograma **obrigatório** na suspeita (basal, 2 semanas e 6–8 semanas) para rastreio de **aneurisma de artéria coronária** — achado que define a gravidade e o seguimento a longo prazo. **MIS-C:** ecocardiograma também essencial (pode haver disfunção miocárdica/derrame pericárdico, além de aneurisma coronariano).",
        figura: ["inf-exantemas-padrao-temporal", "inf-sarampo-exantema-real"],
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "Farmacodermia (exantema morbiliforme por medicamento, sem pródromo viral característico); mononucleose (linfadenopatia generalizada + esplenomegalia; exantema pode surgir após amoxicilina); **Kawasaki × escarlatina** (ambas podem ter língua em framboesa — escarlatina tem cultura/teste rápido para estreptococo positivo e responde a penicilina).",
      },
      {
        secao: "Tratamento",
        corpo:
          "- **Sarampo, rubéola, eritema infeccioso, exantema súbito:** suporte (antitérmico, hidratação) — autolimitados; **vitamina A** recomendada pela OMS no sarampo (reduz morbimortalidade, especialmente em desnutridos);\n- **Escarlatina:** **penicilina** (ou amoxicilina) — tratar sempre, para prevenir complicações supurativas e não supurativas (febre reumática, GNPE);\n- **Kawasaki:** **imunoglobulina intravenosa (IVIG)** em dose única + **AAS** em dose alta na fase aguda, com redução para dose antiagregante após defervescência — reduz drasticamente o risco de aneurisma coronariano se iniciado nos primeiros **10 dias** de doença.",
      },
      {
        secao: "Posologia",
        corpo:
          "**IVIG** 2 g/kg em infusão única. **AAS:** 80–100 mg/kg/dia (fase aguda, dividido) → 3–5 mg/kg/dia (fase de manutenção antiagregante) — exceção importante: uso de AAS em criança é geralmente contraindicado (síndrome de Reye), mas é **indicação formal na doença de Kawasaki**.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Sarampo:** pneumonia (principal causa de óbito), otite média, panencefalite esclerosante subaguda (PEES, tardia e rara);\n- **Rubéola congênita:** catarata, surdez, cardiopatia (persistência do canal arterial) — tríade clássica se infecção no 1º trimestre;\n- **Parvovírus B19 na gestação:** hidropsia fetal não imune (crise aplásica fetal); em anemia hemolítica crônica: crise aplásica transitória grave;\n- **Kawasaki:** aneurisma de coronária, IAM na infância (raro mas grave);\n- **Escarlatina não tratada:** febre reumática, GNPE.",
      },
      {
        secao: "Prevenção",
        corpo:
          "**Tríplice viral (SCR)** — sarampo, caxumba, rubéola — 12 e 15 meses (calendário PNI); é a principal ferramenta de controle de surto. Isolamento de contato/aéreo no sarampo (extremamente contagioso). **Notificação compulsória imediata** de casos suspeitos de sarampo e rubéola.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ O detalhe que mais cai: a **relação temporal entre febre e exantema** diferencia as principais doenças exantemáticas.\n- ★ **Exantema súbito:** a criança melhora (fica afebril) **exatamente quando** o exantema aparece — padrão único.\n- ★ **Manchas de Koplik** precedem o exantema do sarampo e são **patognomônicas**.\n- ★ **Kawasaki: ecocardiograma sempre**, mesmo com critérios completos — o aneurisma coronariano define o seguimento.\n- ★ **AAS é contraindicado na maioria dos quadros pediátricos (Reye), EXCETO na doença de Kawasaki**.\n- ★ **Escarlatina não tratada** leva às mesmas complicações do estreptococo não tratado — sempre tratar com penicilina.\n- ★ **Rubéola congênita:** tríade **catarata + surdez + PCA**, maior risco se infecção no 1º trimestre.\n- ★ **Mnemônico Kawasaki = CRASH + febre:** Conjuntivite, Rash, Adenopatia, Strawberry tongue/mucosa, Hands-feet.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância em Saúde (sarampo e rubéola)",
      "Sociedade Brasileira de Pediatria — Doença de Kawasaki e MIS-C",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--zoonoses-e-doencas-emergentes--raiva-profilaxia-pos-exposicao": {
    subtemaId: "inf--zoonoses-e-doencas-emergentes--raiva-profilaxia-pos-exposicao",
    titulo: "Raiva — profilaxia pós-exposição",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Encefalite viral aguda causada por **Lyssavirus**, transmitida por mordedura/arranhadura de mamífero infectado (cão, gato, morcego, animais silvestres), com **letalidade próxima de 100% após o início dos sintomas**.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O vírus **neurotrópico**, inoculado na mordedura, **migra retrogradamente pelos nervos periféricos até o SNC** — período de incubação variável (dias a meses), conforme a **distância entre o local da mordida e o SNC**. Após atingir o SNC, causa encefalite fatal quase invariavelmente.",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "Mordedura por animal não vacinado ou sem possibilidade de observação; **exposição a morcegos** (inclusive sem mordida percebida, em ambiente fechado) — considerada sempre de risco.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Pródromo inespecífico** (febre, mal-estar, parestesia/dor no local da mordida) → **fase neurológica** com **hidrofobia** (espasmo faríngeo doloroso ao tentar beber água), **aerofobia**, agitação/hiperatividade autonômica (**forma furiosa**, mais comum) ou paralisia ascendente (**forma paralítica**, mimetiza Guillain-Barré) → coma e óbito.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Clínico** (história de exposição + quadro compatível) — confirmação laboratorial (imunofluorescência, PCR) geralmente pós-morte ou em centros de referência. **Não se aguarda confirmação para iniciar a profilaxia.**",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Não há tratamento curativo eficaz estabelecido após o início dos sintomas** (protocolos experimentais como o \"protocolo de Milwaukee\" têm resultados limitados). Toda a estratégia é **preventiva pós-exposição**.",
      },
      {
        secao: "Profilaxia pós-exposição",
        corpo:
          "1. **Lavagem exaustiva da ferida** com água e sabão imediatamente;\n2. **Soro/imunoglobulina antirrábica** se indicado pela gravidade da exposição;\n3. **Vacina de células Vero** (esquema conforme pré ou pós-exposição, e situação vacinal prévia).\n\nAvaliar **gravidade da exposição e status do animal**: cão/gato saudável e observável por **10 dias** → pode-se aguardar (suspender profilaxia se o animal permanecer assintomático); animal selvagem, morcego ou animal doente → **iniciar profilaxia imediatamente**.",
      },
      {
        secao: "Complicações",
        corpo:
          "Encefalite fatal — **mortalidade ~100% após o início dos sintomas**.",
      },
      {
        secao: "Prevenção",
        corpo:
          "Vacinação de cães/gatos (bloqueio da cadeia de transmissão urbana); observação do animal agressor por 10 dias quando possível; **todo acidente com morcego é considerado grave** e indica profilaxia completa, independentemente da gravidade aparente da lesão.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Todo acidente com morcego** é tratado como grave para fins de profilaxia antirrábica, mesmo que a lesão pareça superficial.\n- ★ **Hidrofobia + aerofobia** em paciente com história de mordedura semanas/meses antes = **raiva até prova em contrário**.\n- ★ **Não se aguarda confirmação laboratorial** de raiva para iniciar a profilaxia pós-exposição — a decisão é **clínico-epidemiológica**.\n- ★ **Mnemônico:** raiva = **2 H** — **H**idrofobia + **H**iperatividade autonômica (forma furiosa), ou paralisia ascendente (forma paralítica, minoria).",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância em Saúde (raiva) e Normas Técnicas de Profilaxia da Raiva Humana",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--zoonoses-e-doencas-emergentes--leptospirose-fases-e-manejo": {
    subtemaId: "inf--zoonoses-e-doencas-emergentes--leptospirose-fases-e-manejo",
    titulo: "Leptospirose — fases e manejo",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Zoonose causada pela espiroqueta ***Leptospira***, classicamente associada a **enchentes** e contato com água/lama contaminada por urina de roedores.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "A espiroqueta, eliminada na **urina de roedores** (principal reservatório — o rato de esgoto), **penetra por pele/mucosa lesada** em contato com água/lama contaminada. Dissemina-se e **lesa o endotélio vascular**, explicando o tropismo multissistêmico (rim, fígado, pulmão).",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "Enchentes/inundações urbanas, contato ocupacional (coleta de lixo, trabalho rural, limpeza de fossas), exposição recreativa a água doce parada.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Fase precoce (leptospirêmica):** febre, **mialgia intensa (especialmente de panturrilhas)**, cefaleia, **sufusão conjuntival** (hiperemia conjuntival **sem secreção**).\n\n**Fase tardia (imune), em minoria — síndrome de Weil:** **icterícia rubínica** (tom alaranjado), **injúria renal aguda**, hemorragia (a **pulmonar é a mais temida**).",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "Sorologia (**ELISA IgM**; **microaglutinação** como confirmatório), **PCR** nos primeiros dias da doença.",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "Nas formas graves, RX/TC de tórax pode mostrar **infiltrado alveolar difuso/hemorragia pulmonar** — reconhecer precocemente pela alta mortalidade. USG renal geralmente inespecífica na lesão renal aguda leptospirótica, que é tipicamente **não oligúrica, com hipocalemia** (diferente da maioria das IRAs).",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "**Leptospirose × dengue** (cocirculam em épocas de chuva — sufusão conjuntival e mialgia de panturrilha favorecem leptospirose; prova do laço/plaquetopenia mais marcada favorece dengue); hepatite viral (leptospirose causa icterícia com padrão **colestático**, bilirrubina direta predominante, sem grande elevação de transaminases).",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Penicilina cristalina ou doxiciclina** nos casos leves-moderados (ambulatorial) — quanto mais precoce, melhor. Suporte hemodinâmico/dialítico nas formas graves (síndrome de Weil).",
      },
      {
        secao: "Posologia",
        corpo:
          "**Leptospirose leve:** doxiciclina 100 mg 12/12h VO, 5–7 dias. **Leptospirose grave:** penicilina G cristalina EV ou ceftriaxona.",
      },
      {
        secao: "Complicações",
        corpo:
          "**Síndrome de Weil** (IRA + icterícia + hemorragia); **hemorragia pulmonar maciça** (principal causa de óbito na forma grave); miocardite.",
      },
      {
        secao: "Prevenção",
        corpo:
          "Evitar contato com água de enchente; uso de EPI em atividades de risco ocupacional; controle de roedores. Doxiciclina profilática pode ser considerada em exposição de risco muito específica (**não é rotina**).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Mialgia de panturrilha + sufusão conjuntival + contexto de enchente** = pensar leptospirose antes de dengue.\n- ★ **Síndrome de Weil** = icterícia + IRA + hemorragia (pulmonar é a mais temida e principal causa de óbito).\n- ★ A **IRA da leptospirose é classicamente NÃO oligúrica e cursa com hipocalemia** — diferente da maioria das IRAs.\n- ★ Não confundir leptospirose com dengue **só pela plaquetopenia** — sufusão conjuntival e mialgia de panturrilha apontam para leptospirose.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância em Saúde (leptospirose)",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--zoonoses-e-doencas-emergentes--mpox-monkeypox": {
    subtemaId: "inf--zoonoses-e-doencas-emergentes--mpox-monkeypox",
    titulo: "Mpox (monkeypox)",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Doença viral causada por **Orthopoxvirus**, que emergiu como preocupação global de saúde pública a partir de **2022**.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "Transmissão por **contato próximo/pele-a-pele** com lesões, fômites, ou secreções respiratórias prolongadas.",
      },
      {
        secao: "Fatores de risco",
        corpo:
          "Contato íntimo/sexual com caso confirmado; viagem a área endêmica.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "Febre + **linfadenopatia** (achado que diferencia de varíola clássica) + lesões cutâneas que evoluem em **estágios sincrônicos** (mácula → pápula → vesícula → pústula → crosta), podendo ser genitais/perianais na apresentação atual.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**PCR de lesão cutânea** (swab de vesícula/pústula).",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "Varicela — o mpox tem lesões mais profundas/uniformes em estágio e **linfadenopatia proeminente**, achado que ajuda a diferenciar.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Suporte** na maioria dos casos (autolimitado); **tecovirimat** disponível para casos graves/imunossuprimidos em protocolos específicos.",
      },
      {
        secao: "Complicações",
        corpo:
          "Sobreinfecção bacteriana de lesões; proctite (lesões perianais); raramente encefalite.",
      },
      {
        secao: "Prevenção",
        corpo:
          "Vacina (**ACAM2000/MVA-BN**) para contatos de alto risco e grupos prioritários; isolamento de casos até resolução das lesões.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Linfadenopatia proeminente** é o achado que diferencia clinicamente o mpox de varíola clássica e de varicela.\n- ★ As lesões evoluem em **estágios sincrônicos** (todas no mesmo estágio evolutivo simultaneamente).",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância Epidemiológica e Manejo Clínico do Mpox",
      "OMS — Mpox Clinical Management and Infection Prevention and Control Guidance",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--parasitoses-intestinais-e-protozooses--helmintiases-e-protozooses-diagnostico-e-tratamento": {
    subtemaId: "inf--parasitoses-intestinais-e-protozooses--helmintiases-e-protozooses-diagnostico-e-tratamento",
    titulo: "Parasitoses intestinais e protozooses — diagnóstico e tratamento",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecções por **helmintos e protozoários** do trato gastrointestinal, de altíssima prevalência em populações com saneamento precário — tema clássico de saúde pública e clínica médica/pediatria no Brasil.",
      },
      {
        secao: "Etiologia e mecanismo-chave",
        corpo:
          "| Parasito | Via de infecção | Mecanismo-chave |\n|---|---|---|\n| ***Ascaris lumbricoides*** | Ingestão de ovos | Ciclo pulmonar (Löffler) antes de amadurecer no intestino — pode causar obstrução intestinal/biliar em carga alta |\n| Ancilostomídeos (*Necator/Ancylostoma*) | Penetração ativa pela pele (pé descalço) | Migração pulmonar, fixação na mucosa intestinal com **espoliação sanguínea crônica → anemia ferropriva** |\n| ***Strongyloides stercoralis*** | Penetração cutânea | **Autoinfecção** (único helminto capaz de completar o ciclo dentro do hospedeiro) — risco de **hiperinfecção fatal** em imunossuprimidos/uso de corticoide |\n| ***Entamoeba histolytica*** | Fecal-oral (cistos) | Invade mucosa colônica (disenteria amebiana) e pode disseminar por via portal → **abscesso hepático amebiano** |\n| ***Giardia lamblia*** | Fecal-oral (cistos) | Adere ao epitélio duodenal, causa má absorção **sem invasão tecidual** |\n| *Taenia solium/saginata* | Ingestão de carne malcozida (cisticercos) | ***T. solium*: ingestão de OVOS** (não só a carne) causa **cisticercose** (larva migra para tecidos, incluindo SNC) |\n| ***Schistosoma mansoni*** | Penetração cutânea em água doce (caramujo *Biomphalaria*) | Migração e oviposição no plexo venoso mesentérico → **fibrose periportal (Symmers)** e hipertensão porta pré-sinusoidal |",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "**Fase pulmonar** (*Ascaris*, ancilostomídeos, *Strongyloides*): **síndrome de Löffler** — tosse seca, broncoespasmo, infiltrado migratório fugaz + eosinofilia.\n\n**Fase intestinal:** dor abdominal, diarreia (giardíase — esteatorreia por má absorção; amebíase — disenteria com muco/sangue), prurido anal noturno (enterobíase, típico em criança).\n\n**Strongyloides — síndrome de hiperinfecção:** em imunossuprimido/corticoide crônico — dor abdominal difusa, **sepse por Gram-negativos** (a larva \"carrega\" bactérias entéricas na migração transmural), pode ser fatal.\n\n**Esquistossomose:** fase aguda — **febre de Katayama** (febre, urticária, eosinofilia, hepatoesplenomegalia, 4–8 semanas pós-exposição); fase crônica — hepatoesplenomegalia com **função hepatocelular preservada** (fibrose pré-sinusoidal, diferente da cirrose).",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Exame Parasitológico de Fezes (EPF)** — método de Hoffman/Kato-Katz, idealmente **3 amostras em dias alternados** (aumenta a sensibilidade pela eliminação intermitente de ovos/cistos). **Método de Baermann-Moraes** para *Strongyloides* (mais sensível que o EPF comum). Sorologia útil em esquistossomose e cisticercose (ELISA). **Fita adesiva anal (Graham)** para enterobíase (ovos raramente aparecem no EPF de fezes).",
      },
      {
        secao: "Exames de imagem",
        corpo:
          "**Abscesso hepático amebiano:** USG/TC — lesão **única**, hipoecoica/hipodensa, tipicamente em **lobo direito**, conteúdo em \"pasta de chocolate\" se puncionado (raramente necessário puncionar). **Neurocisticercose:** TC/RM de crânio — lesões císticas múltiplas em diferentes estágios (vesicular, coloidal, calcificada) — **principal causa de epilepsia adquirida em área endêmica**. **Esquistossomose hepatoesplênica:** USG com fibrose periportal em \"cano de barro\" — achado que diferencia de cirrose.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "Abscesso hepático amebiano × piogênico (o piogênico geralmente é múltiplo, associado a foco biliar/diverticular); neurocisticercose × toxoplasmose de SNC (contexto epidemiológico e sorologia diferenciam); diarreia por giárdia × doença celíaca (EPF/antígeno fecal de giárdia esclarece).",
      },
      {
        secao: "Tratamento",
        corpo:
          "| Parasito | Fármaco de escolha |\n|---|---|\n| *Ascaris*, ancilostomídeos, enterobíase | Albendazol dose única (ou 3 dias conforme carga) — mebendazol alternativa |\n| *Strongyloides* | **Ivermectina** (albendazol é menos eficaz para este parasito) |\n| Giardíase | Metronidazol ou secnidazol/tinidazol (dose única) |\n| Amebíase (invasiva/disenteria/abscesso) | Metronidazol, seguido de agente luminal (teclozan/etofamida) |\n| Teníase | Praziquantel ou niclosamida |\n| Neurocisticercose | Albendazol ± corticoide — contraindicado se muitos cistos ou hipertensão intracraniana sem controle prévio |\n| Esquistossomose | Praziquantel dose única |",
      },
      {
        secao: "Posologia",
        corpo:
          "**Albendazol** 400 mg VO dose única (ascaris/ancilostomídeo/enterobíase) — repetir em 2 semanas na enterobíase. **Ivermectina** 200 mcg/kg/dia por 1–2 dias (*Strongyloides* — considerar 2 doses com intervalo de 2 semanas em imunossuprimido). **Metronidazol** 500–750 mg 8/8h por 7–10 dias (amebíase invasiva). **Praziquantel** 40–60 mg/kg dose única (esquistossomose).\n\n**★ Pérola de rastreio:** todo paciente de área endêmica que for iniciar corticoterapia prolongada ou imunossupressão deve ser **rastreado e tratado empiricamente para Strongyloides antes**, pelo risco de hiperinfecção fatal.",
      },
      {
        secao: "Complicações",
        corpo:
          "- ***Ascaris*:** obstrução intestinal (bolo de áscaris), obstrução biliar/pancreática;\n- **Ancilostomídeo:** anemia ferropriva crônica, atraso de desenvolvimento em crianças;\n- ***Strongyloides*:** síndrome de hiperinfecção/disseminada (mortalidade alta);\n- **Amebíase:** abscesso hepático, perfuração intestinal, ameboma;\n- **Esquistossomose:** hipertensão porta com varizes esofágicas (HDA), cor pulmonale esquistossomótico;\n- **Neurocisticercose:** epilepsia crônica, hidrocefalia.",
      },
      {
        secao: "Prevenção",
        corpo:
          "Saneamento básico, uso de calçados (ancilostomídeo/estrongiloidíase), lavagem de mãos e higienização de alimentos, tratamento em massa (desparasitação) em áreas de alta prevalência, cocção adequada de carne (teníase/cisticercose), evitar contato com água doce parada em área endêmica de esquistossomose.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ ***Strongyloides* é o único helminto capaz de autoinfecção** — por isso pode persistir décadas e causar hiperinfecção fatal muito tempo depois da exposição original.\n- ★ **Sempre rastrear/tratar Strongyloides ANTES de iniciar corticoide crônico** em paciente de área endêmica — pegadinha clássica.\n- ★ **Ivermectina, não albendazol**, é o tratamento de escolha para *Strongyloides*.\n- ★ **Teníase por *T. solium*:** comer **OVOS** (não só a carne) causa cisticercose.\n- ★ **Abscesso hepático amebiano:** lesão única em lobo direito; o piogênico tende a ser múltiplo.\n- ★ **Esquistossomose crônica preserva a função hepatocelular** (fibrose pré-sinusoidal) — diferente da cirrose verdadeira.\n- ★ **EPF deve ser feito em 3 amostras de dias alternados** — amostra única tem sensibilidade baixa.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Guia de Vigilância em Saúde (parasitoses intestinais)",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--antibioticoterapia--principios-de-antibioticoterapia-empirica": {
    subtemaId: "inf--antibioticoterapia--principios-de-antibioticoterapia-empirica",
    titulo: "Antibioticoterapia — princípios de uso racional e resistência bacteriana",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Princípios de escolha, uso racional e monitorização de antimicrobianos, e os principais **mecanismos de resistência bacteriana** — tema transversal, embutido em praticamente toda questão de foco infeccioso da prova.",
      },
      {
        secao: "Mecanismos de resistência",
        corpo:
          "| Mecanismo | Exemplo | Descrição |\n|---|---|---|\n| **Betalactamases (ESBL/KPC)** | Enterobactérias | Hidrolisam o anel betalactâmico. ESBL: resistente a cefalosporinas (usar carbapenêmico). KPC: resistente também a carbapenêmicos |\n| **Alteração de PBP (PBP2a)** | MRSA | Proteína ligadora de penicilina alterada → toda a classe dos betalactâmicos perde ação, **exceto ceftarolina**. Tratar com vancomicina/linezolida |\n| **Bomba de efluxo** | *Pseudomonas*, Gram-negativos | Expulsa o antibiótico da célula antes de agir — resistência a quinolonas e outros |\n| **Alteração de alvo ribossomal** | Pneumococo, Enterococo (VRE) | Muda o sítio de ligação (PBP no pneumococo resistente a penicilina; genes *van* no VRE) |\n\n**Mnemônico dos 4 mecanismos: \"EABP\"** — Enzima (betalactamase), Alvo alterado, Bomba de efluxo, Permeabilidade reduzida.",
      },
      {
        secao: "Fatores de risco para multirresistência",
        corpo:
          "Uso indiscriminado/sem indicação (infecção viral tratada com antibiótico), automedicação, doses/duração inadequadas, uso agropecuário maciço, internação prolongada e dispositivos invasivos (seleciona flora hospitalar multirresistente), imunossupressão. Suspeitar de multirresistência quando há **falha terapêutica apesar de antibiótico teoricamente adequado**, infecção associada a cuidados de saúde, ou colonização prévia conhecida.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Antibiograma** (teste de sensibilidade) é o padrão para guiar/ajustar terapia — **sempre coletar cultura antes de iniciar antibiótico** quando possível, sem atrasar o início em quadros graves/sépticos. Testes moleculares rápidos (PCR para genes de resistência — mecA no MRSA, blaKPC) aceleram a identificação em centros de referência.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "Falha terapêutica **por resistência** × falha **por foco não controlado** (abscesso não drenado, corpo estranho/cateter não retirado, dose inadequada) × febre não infecciosa (febre por droga, tromboembolismo) — sempre **reavaliar o foco** antes de simplesmente trocar o antibiótico.",
      },
      {
        secao: "Tratamento — princípios de uso racional",
        corpo:
          "**Terapia empírica inicial ampla** conforme foco/gravidade/epidemiologia local → **descalonar** assim que houver cultura/antibiograma (reduzir espectro, trocar para via oral quando possível). Ajustar dose por função renal/hepática; respeitar duração mínima eficaz. Terapia combinada reservada para sinergismo comprovado (ex.: endocardite por enterococo) ou cobertura polimicrobiana/multirresistente — **não é rotina** para a maioria das infecções.\n\n| Organismo resistente | Opções terapêuticas |\n|---|---|\n| MRSA | Vancomicina, linezolida, daptomicina (**não usar em pneumonia** — inativada pelo surfactante) |\n| ESBL (enterobactéria) | Carbapenêmico (meropenem/ertapenem) |\n| KPC/CRE (resistente a carbapenêmico) | Polimixina B, ceftazidima-avibactam, colistina — opções limitadas, discutir com CCIH |\n| VRE (enterococo resistente à vancomicina) | Linezolida, daptomicina |",
      },
      {
        secao: "Posologia",
        corpo:
          "Individualizada por foco/agente/função renal. Regra geral: ajustar por clearance de creatinina aminoglicosídeos, vancomicina e a maioria dos betalactâmicos; **não ajustar (ou ajustar minimamente)** azitromicina, ceftriaxona (excreção biliar predominante) e linezolida.",
      },
      {
        secao: "Complicações",
        corpo:
          "**Infecção por *Clostridioides difficile*** (colite pseudomembranosa) pós-uso de antibiótico de amplo espectro — **clindamicina, quinolonas e cefalosporinas** classicamente mais associadas. Nefrotoxicidade (aminoglicosídeos, vancomicina), ototoxicidade (aminoglicosídeos). Seleção progressiva de flora multirresistente institucional. Reações alérgicas (verdadeira alergia a betalactâmico é mais rara do que rotulado).",
      },
      {
        secao: "Prevenção",
        corpo:
          "Programas de **stewardship (PROA** — Programa de Otimização do Uso de Antimicrobianos): auditoria de prescrição, restrição de antimicrobianos de reserva, descalonamento ativo, educação continuada. Medidas de controle de infecção hospitalar: higienização das mãos, precaução de contato para multirresistentes, retirada precoce de dispositivos invasivos.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Descalonar** assim que possível é tão importante quanto escolher bem o empírico inicial — é o núcleo do uso racional.\n- ★ **Falha terapêutica pode ser por foco não controlado**, não só por resistência.\n- ★ **Daptomicina não funciona em pneumonia** (inativada pelo surfactante pulmonar) — pegadinha clássica sobre MRSA.\n- ★ **ESBL exige carbapenêmico; KPC** (resistente a carbapenêmico) é o próximo nível de gravidade, com opções limitadas.\n- ★ Alergia a betalactâmico relatada **nem sempre é verdadeira alergia mediada por IgE**.\n- ★ *C. difficile* pode ocorrer após qualquer antibiótico, mas classicamente mais com **clindamicina, quinolonas e cefalosporinas**.",
      },
    ],
    referencias: [
      "ANVISA — Programa Nacional de Prevenção e Controle de Infecções Relacionadas à Assistência à Saúde (PROA)",
      "IDSA — Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--imunizacoes-no-adulto--vacinas-do-adulto": {
    subtemaId: "inf--imunizacoes-no-adulto--vacinas-do-adulto",
    titulo: "Imunizações e profilaxias pós-exposição",
    atualizadoEm: "2026-07-17",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Estratégias de **prevenção primária** (vacinação) e de **bloqueio pós-exposição** que aparecem transversalmente em quase toda prova de infectologia/pediatria/GO do OMED — o **calendário vacinal foi o subtema isolado mais recorrente** nas últimas edições (5 aparições em 2 anos).",
      },
      {
        secao: "Tipos de vacina",
        corpo:
          "**Vírus vivo atenuado** (SCR, varicela, febre amarela, VOP historicamente, rotavírus): induzem resposta imune mais robusta e duradoura, mas são **contraindicadas em imunossuprimidos e, em geral, na gestação**.\n\n**Inativadas/subunidade/conjugadas** (VIP, hepatite B, pneumocócica conjugada, HPV, dTpa): **seguras em imunossuprimidos e gestantes**, mas costumam exigir múltiplas doses/reforços.",
      },
      {
        secao: "Calendário (PNI e adulto)",
        corpo:
          "| Vacina | Esquema |\n|---|---|\n| BCG | Dose única ao nascer |\n| Hepatite B | Ao nascer (1as 12–24h) + penta/hexavalente aos 2-4-6 meses |\n| Penta/hexavalente (DTP+Hib+HepB±VIP) | 2, 4, 6 meses |\n| VIP (poliomielite inativada) | 2, 4, 6 meses + reforço 15 meses — hoje **exclusivamente inativada** na rotina |\n| Pneumocócica conjugada | 2, 4 meses + reforço 12 meses |\n| Rotavírus (oral) | 2 doses: até 3m7d e até 5m15d de vida (janelas etárias estritas) |\n| Meningocócica ACWY | 3, 5 meses + reforço 12 meses — preferencial sobre MenC isolada |\n| Febre amarela | 9 meses + reforço 4 anos |\n| Tríplice viral (SCR) / tetra viral | 12 meses (SCR) + 15 meses (tetra viral ou varicela isolada) |\n| DTP (reforço) / dT adulto | 15 meses e 4-6 anos; **dT a cada 10 anos na vida adulta** (antecipar para 5 anos se ferimento de risco) |\n| Influenza | Anual, a partir de 6 meses (2 doses na 1ª vez se < 9 anos) |",
      },
      {
        secao: "Profilaxia pós-exposição",
        corpo:
          "| Situação | Profilaxia |\n|---|---|\n| Ferimento com potencial tetanogênico | Vacina dT/DTP conforme esquema prévio + soro/imunoglobulina antitetânica se esquema incompleto/desconhecido e ferimento de alto risco |\n| Exposição a raiva | Soro + vacina antirrábica conforme gravidade — ver tema Zoonoses |\n| Exposição sexual desprotegida a HIV | PEP em até 72h (idealmente 2h), TARV por 28 dias |\n| Contato domiciliar com meningite meningocócica | Rifampicina 2 dias (ou ceftriaxona/ciprofloxacino dose única) |\n| RN de mãe HBsAg+ | Vacina + imunoglobulina (HBIG) nas 1as 12–24h de vida |\n| Contato com hanseníase | Avaliação clínica + BCG conforme situação vacinal prévia |",
      },
      {
        secao: "Complicações",
        corpo:
          "Doença evitável por falha de cobertura vacinal (surtos de sarampo/coqueluche/difteria). Eventos adversos raros mas relevantes: **anafilaxia** (contraindica repetir a mesma vacina), intussuscepção (associação temporal restrita com a 1ª dose de rotavírus, monitorada, mas benefício-risco favorável à vacinação).",
      },
      {
        secao: "Prevenção",
        corpo:
          "Busca ativa de faltosos, vacinação em bolsões de baixa cobertura, comunicação de risco/enfrentamento de desinformação, **oportunizar vacinação em toda visita ao serviço de saúde** — \"oportunidade perdida de vacinação\" é indicador de qualidade a evitar.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Calendário vacinal foi o subtema isolado mais recorrente** do OMED nas últimas edições — vale decorar as janelas etárias exatas.\n- ★ Esquema atual de pólio é **exclusivamente VIP** — não se usa mais VOP na rotina.\n- ★ Vacina de vírus vivo é **contraindicada em gestante e imunossuprimido grave**; inativadas são seguras nesses grupos.\n- ★ **\"Oportunidade perdida de vacinação\"** é indicador de qualidade — checar/atualizar a caderneta em toda consulta.\n- ★ **MenACWY é hoje preferencial** sobre MenC isolado.\n- ★ **RN de mãe HBsAg+** precisa de vacina **+ HBIG** nas primeiras 12–24h — não é rotina de vacina isolada.\n- ★ Esquema atrasado: **continuar de onde parou**, sem reiniciar do zero, respeitando intervalos mínimos.\n- ★ **Mnemônico:** \"2-4-6\" é o esqueleto da maioria dos esquemas infantis (penta, VIP, pneumo, rotavírus).",
      },
    ],
    referencias: [
      "Ministério da Saúde — Programa Nacional de Imunizações (PNI): Calendário de Vacinação",
      "Sociedade Brasileira de Imunizações (SBIm) — Calendários de Vacinação",
      "Material do usuário — Infectologia OMED · 15 Temas (Resumo Absoluto)",
    ],
  },

  "inf--infeccoes-congenitas--storch-visao-infectologica": {
    subtemaId: "inf--infeccoes-congenitas--storch-visao-infectologica",
    titulo: "Infecções congênitas — visão infectológica (agente por agente)",
    atualizadoEm: "2026-07-18",
    origem: "usuario_original",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Enquanto o resumo de GO aborda as infecções congênitas pelo eixo **obstétrico** (rastreio pré-natal, conduta no parto), este resumo cobre o mesmo grupo de doenças pelo eixo **infectológico**: o agente, seu mecanismo de transmissão, a janela de maior risco e o racional de cada exame diagnóstico — incluindo agentes que a OMED cobra e que não entram no TORCH clássico (Chagas, hepatites B/C, tuberculose congênita, GBS, malária, listeriose, arboviroses periparto). Estimativa: **infecções congênitas respondem por parte relevante da morbimortalidade neonatal evitável**, e a banca costuma testar o **raciocínio diferencial por padrão de achado** (calcificação, tipo de exantema, tipo de sequela) mais do que a lista decorada de agentes.",
      },
      {
        secao: "Etiologia — o espectro além do TORCH clássico",
        corpo:
          "| Agente | Classe | Via principal |\n|---|---|---|\n| *Toxoplasma gondii* | Protozoário | Transplacentária (parasitemia materna aguda) |\n| *Treponema pallidum* | Espiroqueta | Transplacentária, **qualquer trimestre** |\n| CMV | Herpesvírus DNA | Transplacentária (primária ou não-primária) |\n| Rubéola | Togavírus RNA | Transplacentária |\n| HSV | Herpesvírus DNA | **Intraparto** (contato com secreções) |\n| Varicela-zóster | Herpesvírus DNA | Transplacentária (viremia materna) |\n| Parvovírus B19 | Parvovírus DNA | Transplacentária (tropismo por precursores eritroides) |\n| Zika | Flavivírus RNA | Transplacentária (neurotropismo) |\n| *Trypanosoma cruzi* (Chagas) | Protozoário | Transplacentária, qualquer momento da gestação |\n| HBV / HCV | Hepadnavírus / Flavivírus | Predominantemente **periparto** (contato com sangue/secreções) |\n| *Mycobacterium tuberculosis* | Micobactéria | Transplacentária (via veia umbilical → fígado fetal) ou aspiração de líquido amniótico infectado |\n| *Streptococcus agalactiae* (GBS) | Bactéria | Ascendente/intraparto |\n| *Plasmodium* spp. | Protozoário | Transplacentária (sequestro placentário) |\n| *Listeria monocytogenes* | Bactéria | Transplacentária/ascendente |\n| Dengue, Chikungunya | Flavivírus/Alfavírus | **Perinatal** (viremia materna próxima ao parto) |",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "**Regra geral (a maioria dos agentes):** quanto **mais precoce** a infecção na gestação, **menor a taxa de transmissão, mas maior a gravidade** (organogênese em curso); quanto mais tardia, maior a taxa de transmissão mas menor a gravidade estrutural (órgãos já formados). **A sífilis é a exceção clássica** — transmite-se com alta eficiência em qualquer trimestre e causa dano grave mesmo tardiamente.\n\n**Mecanismos de lesão específicos:**\n- **Parvovírus B19** — tropismo pelos precursores eritroides (receptor P antigen); destrói a linhagem eritroide → **anemia fetal grave → insuficiência cardíaca de alto débito → hidropisia não imune**.\n- **CMV/Toxoplasmose/Zika** — neurotropismo com padrões de calcificação **distintos** por mecanismo de necrose tecidual diferente (ver Diagnóstico diferencial).\n- **Sífilis** — invasão direta da espiroqueta em ossos (periostite/osteocondrite), pele e vísceras — lesão inflamatória difusa, não neurotrópica isolada.\n- **Tuberculose congênita** — bacilos alcançam o fígado fetal pela veia umbilical **antes** dos pulmões → o complexo primário costuma se formar no **fígado**, ao contrário da TB pós-natal (pulmonar).\n- **Listeriose** — sepse fetal com microabscessos multiorgânicos disseminados = **granulomatosis infantiseptica**.\n- **Malária** — sequestro de hemácias parasitadas no espaço interviloso placentário → insuficiência placentária → baixo peso/prematuridade (mecanismo indireto, não teratogênico direto).",
      },
      {
        secao: "Quadro clínico — pistas por agente",
        corpo:
          "| Achado-chave | Agente mais associado |\n|---|---|\n| Hidropisia fetal não imune + ACM-PVS elevado | Parvovírus B19 |\n| Vesículas no local do eletrodo de escalpo fetal | HSV neonatal (forma de SNC) |\n| \"Duplo contorno\" ósseo + rinite serossanguinolenta + pênfigo palmoplantar | Sífilis congênita precoce |\n| Petéquias + hepatoesplenomegalia + calcificação periventricular + falha no teste da orelhinha | CMV |\n| Tétrade de Sabin (coriorretinite + calcificação difusa + hidrocefalia + retardo mental) | Toxoplasmose |\n| Tríade de Gregg (catarata + cardiopatia [PCA] + surdez) | Rubéola |\n| Microcefalia com colapso craniano + artrogripose + calcificação subcortical | Zika |\n| Granulomatosis infantiseptica (abscessos multiorgânicos) | Listeria |\n| Complexo primário hepático | Tuberculose congênita |\n| Febre + irritabilidade + exantema + edema de extremidades no RN | Chikungunya periparto |\n| Plaquetopenia + sangramento em pontos de punção após quadro febril materno com dor retro-orbital | Dengue perinatal |",
      },
      {
        secao: "Diagnóstico — o racional de cada exame",
        corpo:
          "**Sorologia materna (IgM/IgG + avidez):** IgM+/IgG+ com **avidez baixa** (< 30%) = infecção recente (< ~4 meses) → maior risco; **avidez alta** (> 60%) no 1º trimestre = infecção antiga, pré-concepcional → risco desprezível para a gestação atual. Regra-chave: **IgM não atravessa a placenta** — IgM neonatal positivo é sempre infecção verdadeira do concepto; **IgG isolada no RN pode ser só transferência passiva materna** e exige seguimento sorológico seriado até negativar ou confirmar produção própria.\n\n**PCR em líquido amniótico** (toxoplasmose, CMV, parvovírus): não deve ser feito precocemente demais — para toxoplasmose, aguardar **≥ 18 semanas E ≥ 4 semanas da soroconversão materna** (falso-negativo se muito cedo).\n\n**Diagnóstico direto no RN:**\n- **Chagas** — sorologia materna/neonatal não confia (IgG materno cruza a placenta); no período neonatal precoce, o método de escolha é **parasitológico direto** (micro-hematócrito/Strout), já que a sorologia só é interpretável após 9–12 meses (quando o IgG materno já desapareceu).\n- **CMV** — **PCR em urina ou saliva nas primeiras 3 semanas de vida**; após esse prazo, não se distingue mais infecção congênita de adquirida no pós-natal.\n- **HIV neonatal** — o teste de anticorpos **não serve** para diagnóstico no RN (IgG materno persiste até 18 meses); usam-se testes moleculares (carga viral/PCR-DNA).\n- **Sífilis** — VDRL de sangue **periférico** do RN comparado ao título materno (não usar sangue de cordão, risco de contaminação/diluição).",
      },
      {
        secao: "Diagnóstico diferencial — padrões de imagem e achados",
        corpo:
          "| Achado de imagem | Interpretação |\n|---|---|\n| Calcificação **difusa** em parênquima (\"em pipoca\") | Toxoplasmose |\n| Calcificação **periventricular** | CMV |\n| Calcificação **cortical/subcortical** + colapso craniano | Zika |\n| Sinal de \"duplo contorno\" em ossos longos | Sífilis congênita |\n| Complexo primário **hepático** (não pulmonar) | Tuberculose congênita |\n\n| Sequela auditiva | Padrão |\n|---|---|\n| Surdez **presente ao nascer, estável** | Rubéola |\n| Surdez **progressiva, pode ser tardia** (principal causa infecciosa não genética) | CMV |",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Toxoplasmose:** infecção materna sem confirmação de infecção fetal → **espiramicina** (reduz transmissão, não trata o feto já infectado — não atravessa bem a barreira placentária); infecção fetal confirmada (PCR+) → esquema tríplice **sulfadiazina + pirimetamina + ácido folínico**, mantido no RN infectado por **12 meses**.\n\n**Sífilis:** penicilina é o **único fármaco que previne sífilis congênita** — em gestante alérgica grave, a conduta é **dessensibilização hospitalar**, nunca substituir por outro antibiótico (doxiciclina contraindicada na gestação; azitromicina com resistência documentada e não comprovadamente eficaz para o feto).\n\n**CMV sintomático:** valganciclovir oral por 6 meses (reduz progressão da surdez e melhora neurodesenvolvimento — evidência do estudo CASG).\n\n**HSV neonatal:** aciclovir IV em altas doses, independentemente da forma clínica (pele-olho-boca, SNC ou disseminada).\n\n**Chagas congênito:** **benzonidazol é indicado e eficaz em menores de 1 ano** (ao contrário do que muitos assumem) — a taxa de cura é maior quanto mais precoce o tratamento.\n\n**Hepatite B:** RN de mãe HBsAg+ recebe **vacina + imunoglobulina específica (HBIG) nas primeiras 12–24h de vida** — via de parto não altera significativamente o risco quando essa imunoprofilaxia é feita corretamente (não há indicação de cesárea eletiva só por isso).\n\n**HIV:** **dolutegravir (DTG) é hoje o esquema preferencial**, inclusive em mulheres em idade fértil e no primeiro trimestre (o sinal de defeito de tubo neural inicialmente reportado em Botsuana foi reavaliado como muito menor do que o temido); **aleitamento materno é proscrito** no Brasil independentemente de carga viral indetectável.",
      },
      {
        secao: "Situações especiais",
        corpo:
          "**Varicela:** janela de maior risco para a Síndrome da Varicela Congênita (cicatrizes cutâneas, hipoplasia de membros, defeitos oculares) é **13ª–20ª semana**; varicela materna nos **5 dias antes a 2 dias depois do parto** é a situação de maior risco de varicela neonatal grave (sem tempo de transferência de IgG materno).\n\n**Herpes genital no parto:** primoinfecção materna próxima ao parto (sem tempo de produzir e transferir anticorpos) é o cenário de **maior risco de transmissão (30–50%)** — contraintuitivamente maior que na recorrência (1–3%), por isso lesão ativa em primoinfecção indica cesariana mesmo com bolsa íntegra.\n\n**Gestante trabalhando com crianças pequenas + ascite fetal isolada com sorologias TORCH negativas** → pensar em **parvovírus B19** (exposição ocupacional clássica em creches/escolas).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Sífilis é a exceção** à regra transmissão↓/gravidade↑: transmite bem e agride em qualquer trimestre.\n- ★ **IgM não cruza a placenta** — sempre infecção verdadeira; **IgG isolada pode ser só passagem materna**.\n- ★ Padrão de calcificação: **difusa = toxo · periventricular = CMV · cortical/subcortical = Zika**.\n- ★ **Complexo primário da TB congênita é hepático**, não pulmonar — pega muita gente que generaliza da TB pós-natal.\n- ★ **Diagnóstico de Chagas neonatal precoce é parasitológico direto**, não sorológico (IgG materno atrapalha até os 9–12 meses).\n- ★ **Benzonidazol NÃO é contraindicado em < 1 ano** — é a faixa etária com melhor resposta ao tratamento no Chagas congênito.\n- ★ **CMV: PCR de urina/saliva só vale nas primeiras 3 semanas de vida.**\n- ★ **Herpes: maior risco é a primoinfecção materna tardia (30–50%)**, não a recorrência (1–3%) — inversão clássica cobrada.\n- ★ **HIV neonatal: teste de anticorpos não serve para diagnóstico** (IgG materno confunde até 18 meses) — usar PCR/carga viral.\n- ★ **Dolutegravir hoje é preferencial mesmo no 1º trimestre** — questão desatualizada pode cobrar o contrário.\n- ★ **Aleitamento materno é proscrito em mãe HIV+ no Brasil**, mesmo com carga viral indetectável.\n- ★ **Gestante em contato ocupacional com crianças pequenas + hidropisia/ascite fetal isolada** → pensar em parvovírus B19.",
      },
    ],
    referencias: [
      "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais",
      "Ministério da Saúde — Guia de Vigilância em Saúde (Doença de Chagas, Tuberculose)",
      "CDC — Congenital CMV, Toxoplasmosis and Syphilis Guidelines",
      "Sociedade Brasileira de Pediatria — Infecções Congênitas",
      "Material do usuário — Google Drive, doc 'infec congenita' (banco de questões perinatal)",
    ],
  },
};
