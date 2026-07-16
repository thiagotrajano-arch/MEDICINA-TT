import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Resumos — Pediatria.
 * Ancorados em MS, SBP e AAP; consolidados a partir do material do usuário
 * (Simulado de Pediatria — Gabarito Comentado) e das diretrizes vigentes.
 */

export const CONTEUDOS_PED: Record<string, ConteudoSubtema> = {
  "ped--emergencias-pediatricas--desidratacao-e-reidratacao": {
    subtemaId: "ped--emergencias-pediatricas--desidratacao-e-reidratacao",
    titulo: "Desidratação e reidratação na diarreia aguda",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Perda de água e eletrólitos que excede a ingesta, na maioria das vezes secundária a **gastroenterite aguda**. É a principal causa evitável de morte por diarreia na infância — e a **reidratação, não o antibiótico, é o que salva**.",
      },
      {
        secao: "Classificação (MS/OMS)",
        corpo:
          "| | **Sem desidratação (Plano A)** | **Algum grau (Plano B)** | **Grave (Plano C)** |\n|---|---|---|---|\n| Estado geral | Alerta | **Irritado/inquieto** | **Letárgico/inconsciente** |\n| Olhos | Normais | **Fundos** | Muito fundos |\n| Sede | Normal | **Sedento, bebe rápido** | **Não consegue beber** |\n| Prega cutânea | Desaparece rápido | **Desaparece lentamente** | **Desaparece muito lentamente (> 2 s)** |\n| Pulso/perfusão | Normal | Normal | **Filiforme; TEC > 3 s** |\n\nOs parâmetros mais fidedignos são **turgor cutâneo** e **estado neurológico**.",
      },
      {
        secao: "Conduta — Plano A (sem desidratação)",
        corpo:
          "Domicílio:\n- **Manter alimentação e aleitamento** (⚠️ **dieta zero é contraindicada**);\n- **SRO após cada evacuação** (< 1 a: 50–100 mL; ≥ 1 a: 100–200 mL);\n- **Zinco por 10–14 dias** (10 mg/dia se < 6 m; 20 mg/dia se ≥ 6 m);\n- Orientar os **sinais de retorno** (piora, vômitos persistentes, sangue nas fezes, prostração).",
      },
      {
        secao: "Conduta — Plano B (algum grau)",
        corpo:
          "**TRO supervisionada na unidade de saúde**:\n- **SRO 50–100 mL/kg em 4–6 h** (referência prática: **75 mL/kg**), oferecida em **pequenos volumes, frequentemente**;\n- Reavaliar ao final;\n- **Vômitos não são falha imediata** — reduzir o volume e aumentar a frequência resolve a maioria.\n\n**Falha da TRO → Plano C:** vômitos persistentes e volumosos (> 3–4/h) apesar da técnica correta.\n\n**Contraindicações formais à via oral:** **íleo paralítico** e **rebaixamento do nível de consciência** (risco de aspiração).",
      },
      {
        secao: "Conduta — Plano C (grave/choque)",
        corpo:
          "**Expansão EV imediata** com **cristaloide isotônico** (SF 0,9% ou **Ringer lactato**):\n- **20 mL/kg em bolus**, o mais rápido possível (15–20 min);\n- **Reavaliar perfusão** (TEC, pulsos, consciência, diurese) e **repetir até 2–3×** se persistirem sinais de choque;\n- Se acesso venoso não for obtido rapidamente → **via intraóssea**.\n\nApós reverter o choque, seguir as fases de reposição do MS (ex.: **< 1 ano: 30 mL/kg na 1ª hora + 70 mL/kg nas 5 h seguintes**), com reavaliação contínua.\n\n⚠️ **Nunca expandir com solução hipotônica** (SG 5%) — não expande o intravascular e causa **hiponatremia**.",
      },
      {
        secao: "SRO e zinco",
        corpo:
          "- **SRO de baixa osmolaridade (OMS):** **sódio 75 mEq/L, glicose 75 mmol/L** (~245 mOsm/L) — reduz vômitos e volume fecal em relação à fórmula antiga (90/111).\n- **Zinco:** reduz duração e gravidade do episódio **e previne novos episódios por 2–3 meses**. Indicado a **todos**, não só aos graves.\n- **Probióticos** (S. boulardii, L. GG): adjuvantes opcionais, reduzem ~1 dia.\n- ⚠️ **Água de coco e refrigerante não substituem a SRO** (composição eletrolítica inadequada).",
      },
      {
        secao: "Distúrbios hidroeletrolíticos",
        corpo:
          "- **Hiponatremia:** reidratação rápida com solução **hipotônica** → risco de **edema cerebral**;\n- **Hipocalemia:** perda fecal de potássio, agravada por reposição sem K⁺ → **íleo paralítico** (distensão abdominal + abolição de ruídos hidroaéreos após expansão é a pista clássica);\n- **Hipernatremia:** irritabilidade, sede intensa — corrigir **lentamente** (risco de edema cerebral se rápido).",
      },
      {
        secao: "Etiologia e quando usar antibiótico",
        corpo:
          "- **Rotavírus:** diarreia **aquosa**, sem sangue — principal causa viral (prevenível por vacina);\n- **Shigella:** **disenteria** (sangue + muco) com **febre alta e toxemia** → antibiótico se comprometimento do estado geral;\n- **STEC/E. coli O157:H7:** diarreia sanguinolenta → risco de **SHU** (anemia hemolítica + injúria renal + trombocitopenia) — ⚠️ **antibiótico pode aumentar o risco de SHU**;\n- **Giardia:** diarreia subaguda/crônica, sem sangue.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Plano A** = sem sinais; **Plano B** = algum grau (TRO supervisionada); **Plano C** = grave/choque (EV).\n- ★ **Zinco para todos**, 10–14 dias — não só nos graves.\n- ★ **SRO baixa osmolaridade = Na 75 / glicose 75.**\n- ★ **Dieta zero é contraindicada** — manter alimentação/aleitamento sempre.\n- ★ **Vômito não é falha da TRO** — reduzir volume e aumentar frequência.\n- ★ **Íleo paralítico e rebaixamento de consciência** contraindicam a via oral.\n- ★ **Expansão = 20 mL/kg de cristaloide ISOtônico** — nunca glicosado.\n- ★ **Íleo após expansão → pensar hipocalemia.**\n- ★ Diarreia sanguinolenta + oligúria + plaquetopenia = **SHU** (STEC).",
      },
    ],
    referencias: [
      "Ministério da Saúde — Manejo da diarreia aguda na infância (Planos A, B e C)",
      "OMS/UNICEF — Oral rehydration salts and zinc supplementation",
      "Sociedade Brasileira de Pediatria — Tratado de Pediatria",
    ],
  },

  "ped--infeccoes-respiratorias-na-infancia--bronquiolite": {
    subtemaId: "ped--infeccoes-respiratorias-na-infancia--bronquiolite",
    titulo: "Bronquiolite viral aguda",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "**Primeiro episódio de sibilância** em lactente (**< 2 anos**, tipicamente **< 12 meses**), precedido de **pródromo catarral** de via aérea superior. Principal causa de internação por doença respiratória no primeiro ano de vida.\n\nAgente principal: **Vírus Sincicial Respiratório (VSR)** — sazonal (outono/inverno).",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O VSR infecta o **epitélio dos bronquíolos**, causando **necrose do epitélio ciliar**, infiltrado inflamatório peribronquiolar, **edema de submucosa** e **hipersecreção de muco**.\n\nEsses debris celulares + muco + edema formam **rolhas que obstruem mecanicamente o lúmen** — é um processo **inflamatório-obstrutivo MECÂNICO**, **não broncoespasmo** por contração de musculatura lisa (como na asma).\n\n👉 **É essa fisiopatologia que explica por que broncodilatador e corticoide não funcionam:** não há broncoespasmo relevante a reverter (a musculatura lisa do lactente é pouco desenvolvida), e a inflamação não é da via eosinofílica/alérgica que responde a corticoide.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "Pródromo catarral (coriza, tosse, febre baixa) por 2–3 dias, evoluindo com:\n- **Taquipneia**, **tiragem** (subcostal, intercostal), batimento de asa de nariz;\n- **Sibilos e/ou estertores** difusos, tempo expiratório prolongado;\n- Dificuldade alimentar;\n- **Apneia** — pode ser a **primeira manifestação** em < 2 meses e prematuros.\n\nPico de gravidade tipicamente no **3º–5º dia**.",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Eminentemente clínico.** Exames **não são rotina**:\n- **Radiografia de tórax:** só se dúvida diagnóstica ou gravidade atípica. Quando feita: **hiperinsuflação**, retificação de arcos costais, **atelectasias laminares** (⚠️ atelectasia é frequentemente confundida com pneumonia e gera antibiótico desnecessário);\n- **Painel viral:** não muda a conduta (tratamento é de suporte independentemente do vírus); útil para coorte hospitalar;\n- **Hemograma/PCR:** não indicados de rotina.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Suporte é o tratamento** (AAP/SBP):\n- **Oxigenoterapia se SatO₂ < 90–92%**;\n- **Hidratação** (oral fracionada; EV ou sonda se não aceitar);\n- **Desobstrução nasal** (lavagem com soro fisiológico) — simples e eficaz;\n- **Cateter nasal de alto fluxo / CPAP** nos casos moderados-graves.\n\n**NÃO recomendados de rotina:**\n- ❌ **Broncodilatador** (β2) — pode-se considerar **teste terapêutico** apenas se forte suspeita de atopia/asma, **mantendo só se houver resposta objetiva**;\n- ❌ **Corticoide** (sistêmico ou inalatório);\n- ❌ **Antibiótico** (só se infecção bacteriana comprovada);\n- ❌ **Fisioterapia respiratória** de rotina;\n- ❌ Adrenalina nebulizada de rotina.",
      },
      {
        secao: "Fatores de risco para gravidade",
        corpo:
          "- **Idade < 12 semanas** e **prematuridade** — principais fatores para **apneia**;\n- Cardiopatia congênita com repercussão hemodinâmica;\n- Doença pulmonar crônica da prematuridade;\n- Imunodeficiência;\n- ⚠️ **Aleitamento materno exclusivo é fator PROTETOR**, não de risco.",
      },
      {
        secao: "Prevenção",
        corpo:
          "**Palivizumabe** (anticorpo monoclonal, imunização passiva mensal, até 5 doses na sazonalidade do VSR) — critérios do MS:\n- **Prematuros ≤ 28 semanas** com **< 1 ano** no início da sazonalidade;\n- **Cardiopatia congênita com repercussão hemodinâmica** ou **doença pulmonar da prematuridade**, até 2 anos.\n\n⚠️ **Não é indicado** para: prematuro tardio saudável, asma, cardiopatia **corrigida** sem repercussão.\n\nMedidas gerais: higiene das mãos, aleitamento materno, evitar tabagismo passivo e aglomerações.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Bronquiolite = 1º episódio de sibilância + pródromo viral em < 2 anos.**\n- ★ Tratamento é **suporte**: O₂ se SatO₂ < 90–92% + hidratação + desobstrução nasal.\n- ★ **Sem broncodilatador, sem corticoide, sem antibiótico de rotina** — saber **justificar pela fisiopatologia** (obstrução mecânica, não broncoespasmo).\n- ★ **Diagnóstico é clínico** — RX não é rotina (e a atelectasia vira \"pneumonia\" indevidamente).\n- ★ **Apneia** pode ser a 1ª manifestação em **< 12 semanas/prematuro**.\n- ★ **Palivizumabe:** ≤ 28 semanas < 1 ano, ou cardiopatia/pneumopatia **com repercussão** — **não** para asma nem prematuro tardio saudável.\n- ★ **Aleitamento é protetor.**",
      },
    ],
    referencias: [
      "American Academy of Pediatrics — Clinical Practice Guideline: Bronchiolitis",
      "Sociedade Brasileira de Pediatria — Diretrizes de bronquiolite viral aguda",
      "Ministério da Saúde — PCDT Palivizumabe",
    ],
  },

  "ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite": {
    subtemaId: "ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite",
    titulo: "Crupe (laringotraqueobronquite viral)",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Infecção viral da via aérea **superior** com **edema subglótico**, causando obstrução ao fluxo **inspiratório**. Pico entre **6 meses e 3 anos**.\n\nAgente principal: **vírus parainfluenza**. Tipicamente **noturno** e de melhora com ar frio/umidificado.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O edema inflamatório concentra-se na **região subglótica** — o ponto **mais estreito** da via aérea da criança (anel cricoide, único anel cartilaginoso completo).\n\nComo a resistência ao fluxo é **inversamente proporcional à 4ª potência do raio**, um edema de poucos milímetros reduz drasticamente a luz → **estridor inspiratório** e **tosse ladrante**.\n\n👉 A obstrução é **laríngea/subglótica**, **não brônquica** — por isso **broncodilatador não tem papel**.",
      },
      {
        secao: "Quadro clínico",
        corpo:
          "Tríade clássica: **febre + estridor inspiratório + tosse ladrante** (\"de cachorro\", metálica), com **rouquidão/disfonia**.\n\n**Classificação (escore de Westley, simplificado):**\n- **Leve:** estridor **apenas ao choro/agitação**, sem tiragem;\n- **Moderado:** **estridor em repouso** + tiragem, sem agitação;\n- **Grave:** estridor em repouso + tiragem intensa + **agitação/prostração**, hipoxemia (sinal tardio).",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "**Clínico.** A radiografia **não é necessária**; quando feita, mostra o **sinal da torre / ponta de lápis** (estreitamento subglótico) na incidência AP de pescoço.\n\n⚠️ **Não examinar a orofaringe com abaixador** se houver suspeita de **epiglotite** (risco de laringoespasmo e obstrução completa).",
      },
      {
        secao: "Tratamento",
        corpo:
          "- **Todos os graus (inclusive leve): corticoide em dose única** — **dexametasona 0,6 mg/kg** VO ou IM (alternativa: prednisolona; budesonida nebulizada). Reduz progressão, retorno e internação;\n- **Moderado/grave (estridor em repouso): + adrenalina nebulizada** (L-adrenalina ou racêmica) — age em **minutos** por **vasoconstrição** da mucosa edemaciada;\n- **Observar 3–4 h após a adrenalina** — efeito **transitório**, com risco de **rebote**;\n- Oxigênio se hipoxemia; manter a criança calma (agitação piora a obstrução).\n\n**Sem papel:** ❌ broncodilatador, ❌ antibiótico (é viral), ❌ nebulização com SF isolada.",
      },
      {
        secao: "Diagnóstico diferencial",
        corpo:
          "| | **Crupe** | **Epiglotite** |\n|---|---|---|\n| Início | Gradual, noturno | **Súbito, fulminante** |\n| Tosse | **Ladrante** | Ausente |\n| Estado geral | **Pouco toxemiado** | **Toxemiado, prostrado** |\n| Postura | Normal | **Tripé**, pescoço estendido |\n| Outros | Rouquidão | **Sialorreia, disfagia**, voz abafada |\n| Agente | Parainfluenza | ***H. influenzae* tipo b** |\n\n👉 O diferencial central é a **toxemia**. Outros: **traqueíte bacteriana**, **aspiração de corpo estranho** (súbito, sem pródromo), abscesso retrofaríngeo.",
      },
      {
        secao: "Complicações",
        corpo:
          "- **Insuficiência respiratória por obstrução completa** — complicação mais temida no crupe grave refratário;\n- Necessidade de via aérea avançada (rara);\n- **Rebote** após a adrenalina (motivo da observação obrigatória).",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Tosse ladrante + estridor + rouquidão = crupe**; sinal radiológico = **torre/ponta de lápis**.\n- ★ **Corticoide para TODOS**, inclusive no crupe leve (dexametasona 0,6 mg/kg dose única).\n- ★ **Adrenalina só se estridor EM REPOUSO** (moderado/grave) — e **observar 3–4 h pelo rebote**.\n- ★ **Broncodilatador não tem papel** — a obstrução é subglótica, não brônquica.\n- ★ **Epiglotite = toxemia + sialorreia + tripé**, sem tosse ladrante; agente = **Hib** (rara pós-vacina).\n- ★ **Não examinar a orofaringe** se suspeitar de epiglotite.\n- ★ Adrenalina age por **vasoconstrição** (não broncodilatação nem anti-inflamação).",
      },
    ],
    referencias: [
      "Sociedade Brasileira de Pediatria — Tratado de Pediatria (crupe viral)",
      "Nelson — Textbook of Pediatrics",
      "Material do usuário — Simulado de Pediatria OMED (gabarito comentado)",
    ],
  },

  "ped--neonatologia--ictericia-neonatal": {
    subtemaId: "ped--neonatologia--ictericia-neonatal",
    titulo: "Icterícia neonatal",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Coloração amarelada de pele e mucosas por **hiperbilirrubinemia**. Clinicamente visível a partir de **BT ~5 mg/dL** no RN. Ocorre em ~60% dos RN a termo — a maioria **fisiológica**, mas é preciso identificar as patológicas.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O RN é predisposto por três fatores:\n1. **Maior produção** de bilirrubina (massa eritrocitária alta + meia-vida menor da hemácia fetal);\n2. **Menor conjugação hepática** — a enzima **UDP-glucuroniltransferase (UGT1A1)** tem atividade fisiologicamente reduzida;\n3. **Maior recirculação êntero-hepática** (β-glicuronidase intestinal + flora ainda não estabelecida).\n\nA **bilirrubina indireta livre** (não ligada à albumina) é lipossolúvel e **atravessa a barreira hematoencefálica** → neurotoxicidade.",
      },
      {
        secao: "Fisiológica vs. patológica",
        corpo:
          "**Fisiológica:** início **após 24 h**, **pico entre o 3º e o 5º dia** no RN a termo, predomínio de **bilirrubina indireta**, resolução espontânea; a maioria **não precisa de fototerapia**.\n\n**Sinais de alerta para PATOLÓGICA:**\n- **Início < 24 h de vida** (⚠️ **sempre patológica**);\n- Aumento **> 5 mg/dL/dia**;\n- **BT acima do percentil 95** para as horas de vida (Bhutani);\n- **Bilirrubina direta > 1 mg/dL** ou **> 20% do total** → **colestase**;\n- Duração **> 2 semanas** (a termo).",
      },
      {
        secao: "Etiologia por tempo de aparecimento",
        corpo:
          "- **< 24 h — sempre patológica:** doença hemolítica (**incompatibilidade Rh** — Coombs +; **incompatibilidade ABO** — mãe **O**, RN **A/B**, Coombs + geralmente fraco), deficiência de **G6PD** (Coombs **negativo**), esferocitose, infecção congênita;\n- **2º–5º dia:** fisiológica; **icterícia do aleitamento** (\"de inanição\", precoce);\n- **> 1 semana:** **icterícia do leite materno** (tardia); hipotireoidismo congênito; infecção urinária; **colestase**.",
      },
      {
        secao: "Aleitamento × leite materno (a pegadinha clássica)",
        corpo:
          "| | **Do ALEITAMENTO** (precoce) | **Do LEITE MATERNO** (tardia) |\n|---|---|---|\n| Início | **1ª semana** (2º–4º dia) | **Após a 1ª semana**, pico 2ª–3ª sem |\n| Causa | **Ingesta insuficiente** (pega ruim) → ↑ recirculação êntero-hepática | Substâncias do leite inibem conjugação / ↑ recirculação |\n| Peso | **Perda excessiva** (> 10%) | **Ganhando bem** |\n| Conduta | **Corrigir a amamentação** (mais mamadas, ajustar pega) | **Manter aleitamento**; benigna e autolimitada |\n\n⚠️ **Em nenhuma das duas se suspende o aleitamento de rotina.**",
      },
      {
        secao: "Diagnóstico",
        corpo:
          "- **Zonas de Kramer** (avaliação visual, progressão craniocaudal) — apenas triagem, **imprecisa**;\n- **Bilirrubina total e frações** + plotagem no **nomograma de Bhutani** (BT × **horas de vida**) — é isso que define a conduta;\n- Se suspeita de hemólise: **tipagem sanguínea da mãe e do RN**, **Coombs direto**, hematócrito/reticulócitos, esfregaço, **G6PD**;\n- **Icterícia > 2 semanas:** obrigatório **dosar BT e frações** para rastrear **colestase**.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Fototerapia** — 1ª linha:\n- **Mecanismo:** converte a bilirrubina em **fotoisômeros hidrossolúveis** (**lumirrubina**), excretáveis na bile/urina **sem necessidade de conjugação hepática**;\n- **Indicação:** conforme o **nomograma**, considerando **horas de vida, idade gestacional e fatores de risco** (⚠️ **prematuro tardio tem limiar mais baixo** — usar o gráfico correto).\n\n**Imunoglobulina EV (IVIG):** doença hemolítica **Rh ou ABO** com hemólise ativa importante — reduz a necessidade de exsanguineotransfusão.\n\n**Exsanguineotransfusão:** níveis muito críticos ou **falha da fototerapia intensiva**; risco de encefalopatia iminente.",
      },
      {
        secao: "Complicações — encefalopatia bilirrubínica",
        corpo:
          "**Aguda:**\n- **Fase inicial:** **hipotonia, letargia, sucção débil**;\n- **Fase intermediária/avançada:** **hipertonia, opistótono**, febre, choro agudo;\n- **Fase final:** convulsões, apneia, coma.\n\n**Crônica (Kernicterus):** sequela definitiva — **paralisia cerebral atetoide**, **surdez neurossensorial**, paralisia do olhar vertical, displasia dentária.\n\n⚠️ Progressão **hipotonia → hipertonia** é muito cobrada: os sinais **iniciais são de HIPOtonia**.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Icterícia < 24 h = SEMPRE patológica.**\n- ★ **Fisiológica: pico no 3º–5º dia** (a termo), indireta, autolimitada.\n- ★ **Acolia + colúria = bilirrubina DIRETA = colestase** → excluir **atresia de vias biliares com urgência** (cirurgia de Kasai é tempo-dependente).\n- ★ **BD > 1 mg/dL ou > 20% do total** obriga investigar colestase.\n- ★ **Mãe O + RN A/B + Coombs + = incompatibilidade ABO.** **G6PD = Coombs NEGATIVO.**\n- ★ **Aleitamento (precoce) = perdendo peso**; **leite materno (tardia) = ganhando peso**. Não suspender o peito.\n- ★ **Fototerapia age por fotoisomerização (lumirrubina)** — dispensa conjugação hepática.\n- ★ **Enzima da conjugação = UDP-glucuroniltransferase (UGT1A1).**\n- ★ **Kernicterus** = complicação neurológica da **indireta**; sinais precoces = **hipotonia e letargia**.\n- ★ **Prematuro tardio: limiar mais baixo** — usar o gráfico da idade gestacional certa.",
      },
    ],
    referencias: [
      "Sociedade Brasileira de Pediatria — Icterícia neonatal (documentos científicos)",
      "American Academy of Pediatrics — Clinical Practice Guideline: Hyperbilirubinemia in the Newborn",
      "Nomograma de Bhutani",
    ],
  },

  "ped--emergencias-pediatricas--convulsao-febril": {
    subtemaId: "ped--emergencias-pediatricas--convulsao-febril",
    titulo: "Convulsão febril",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "Crise convulsiva associada a **febre**, em criança de **6 meses a 5 anos**, **sem infecção do SNC**, sem distúrbio metabólico agudo e **sem história prévia de crise afebril**.\n\nÉ a convulsão mais comum da infância (2–5% das crianças). **Pico aos 18 meses.** Prognóstico **excelente**.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "O cérebro imaturo tem **limiar convulsivo reduzido**; a **elevação rápida da temperatura** (mais que o valor absoluto) desencadeia a crise, em terreno de **predisposição genética** (história familiar é fator de risco importante).\n\n👉 Isso explica dois pontos cobrados: **antitérmico não previne** a recorrência (a crise ocorre na subida térmica, muitas vezes antes de se perceber a febre), e **febre mais baixa** no episódio associa-se a **maior** risco de recorrência (limiar mais baixo).",
      },
      {
        secao: "Classificação",
        corpo:
          "| | **Simples** (~70–75%) | **Complexa** |\n|---|---|---|\n| Tipo | **Generalizada** | **Focal** |\n| Duração | **< 15 min** | **≥ 15 min** |\n| Recorrência em 24 h | **Não** | **Sim** |\n| Pós-ictal | Breve, sem déficit | Pode ter **déficit (paralisia de Todd)** |\n\n**Basta UM** critério para ser **complexa**.\n\n**Estado de mal epiléptico febril:** crise **≥ 30 min** (ou crises repetidas sem recuperação da consciência nesse período). ⚠️ Não confundir com os **5 min** — que é o limiar **operacional para começar a tratar**.",
      },
      {
        secao: "Investigação",
        corpo:
          "Na **crise febril simples típica, sem sinais de alerta: NENHUM exame é obrigatório.** A investigação é dirigida à **causa da febre**, não à crise.\n\n- ❌ **EEG** — não indicado (não prediz epilepsia nem muda conduta);\n- ❌ **TC/RM de crânio** — só se déficit focal, trauma, sinais de HIC;\n- ❌ Eletrólitos/glicemia de rotina — só se clínica sugestiva.\n\n**Punção lombar — quando considerar:**\n- **Sinais meníngeos** ou **criança toxemiada/muito prostrada**;\n- **< 6–12 meses** (imunização incompleta contra agentes meningíticos; sinais meníngeos pouco confiáveis);\n- **Uso prévio de antibiótico** (pode mascarar meningite);\n- Crise **complexa** ou recuperação incompleta da consciência.",
      },
      {
        secao: "Sinais de alerta (pensar em causa NÃO febril)",
        corpo:
          "- **Rigidez de nuca, abaulamento de fontanela** → meningite/HIC;\n- **Alteração persistente do nível de consciência** → **meningite/encefalite**;\n- **Déficit neurológico focal** persistente;\n- Crise fora da faixa de 6 m–5 a;\n- Petéquias/púrpura.",
      },
      {
        secao: "Tratamento",
        corpo:
          "**Crise em curso > 5 minutos:** abortar com **benzodiazepínico** — **diazepam** (EV/retal) ou **midazolam** (IM/nasal/bucal), seguindo o protocolo de estado de mal.\n\n- ❌ **Dipirona/antitérmico não aborta crise**;\n- ❌ **Banho morno** não é conduta (e pode causar calafrio/desconforto);\n- ❌ **Fenitoína** não é 1ª escolha nesse contexto inicial.\n\n**Após a crise:** sonolência pós-ictal breve é **esperada**. Com boa recuperação e sem sinais de alerta → **alta com orientação aos pais**.\n\n**Profilaxia medicamentosa contínua (fenobarbital/diazepam): NÃO recomendada** — os efeitos adversos superam o benefício de prevenir um evento **benigno e autolimitado**.",
      },
      {
        secao: "Prognóstico e orientação aos pais",
        corpo:
          "- **Recorrência: ~30–40%.** Fatores de risco: **1ª crise < 12–18 meses**, **história familiar** positiva, **febre mais baixa** no episódio, curto intervalo febre-crise;\n- **Risco de epilepsia após crise SIMPLES: ~1–2%** — apenas discretamente acima da população geral (~1%);\n- **Desenvolvimento neuropsicomotor e intelectual: excelente**, sem diferença de quem nunca convulsionou;\n- Resolve espontaneamente até os **5–6 anos**;\n- ⚠️ **Antitérmico traz conforto, mas NÃO previne a recorrência** — dizer isso aos pais evita culpa e uso excessivo.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Simples = generalizada + < 15 min + única em 24 h.** Basta **um** critério para virar **complexa** (focal, ≥ 15 min ou recorrente).\n- ★ **Nenhum exame é obrigatório** na simples típica — nem EEG, nem TC.\n- ★ **Punção lombar:** < 6–12 meses, ATB prévio, sinais meníngeos ou consciência alterada.\n- ★ **Crise > 5 min → benzodiazepínico.** **Estado de mal = ≥ 30 min** (não confundir os dois números).\n- ★ **Antitérmico NÃO previne recorrência.**\n- ★ **Sem profilaxia contínua** — risco > benefício.\n- ★ **Epilepsia após simples ≈ 1–2%** (não 30%, não 10%).\n- ★ **Recorrência ~30–40%**; maior se **< 12 meses** e história familiar.\n- ★ **Febre pós-vacinal é gatilho válido** — não exclui o diagnóstico.\n- ★ **Alteração PERSISTENTE da consciência = meningite/encefalite** até prova em contrário.",
      },
    ],
    referencias: [
      "American Academy of Pediatrics — Febrile Seizures: Clinical Practice Guideline",
      "Sociedade Brasileira de Pediatria — Crise febril (documentos científicos)",
      "Material do usuário — Simulado de Pediatria OMED (gabarito comentado)",
    ],
  },
};
