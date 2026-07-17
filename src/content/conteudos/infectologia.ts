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
        figura: "inf-tb-primaria-vs-pos",
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
        figura: "inf-sifilis-estagios",
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
};
