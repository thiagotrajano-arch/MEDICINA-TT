import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Resumos — Cirurgia.
 * Consolidados a partir do "Cirurgia — Banco de Questões OMED VI" do usuário
 * e das diretrizes vigentes (Tokyo Guidelines 2018, WSES 2020).
 */

export const CONTEUDOS_CIR: Record<string, ConteudoSubtema> = {
  "cir--abdome-agudo--colecistite-e-colangite": {
    subtemaId: "cir--abdome-agudo--colecistite-e-colangite",
    titulo: "Colecistite e colangite agudas",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "Definição",
        corpo:
          "- **Colecistite aguda:** inflamação da **vesícula biliar**, em > 90% dos casos por **obstrução do ducto cístico** por cálculo (colecistite **litiásica**).\n- **Colangite aguda:** infecção da **via biliar principal**, decorrente de **obstrução** (mais comum: **coledocolitíase**) + **estase** + proliferação bacteriana → **bacteriemia**. É potencialmente **fatal**.\n\n👉 A distinção-chave: **colecistite = vesícula obstruída** (cístico); **colangite = colédoco obstruído + infecção sistêmica**. Por isso a colangite cursa com **icterícia e sepse**, e a colecistite não.",
      },
      {
        secao: "Fisiopatologia",
        corpo:
          "**Colecistite:** cálculo impacta no infundíbulo/ducto cístico → distensão da vesícula → isquemia da parede e inflamação química (lisolecitina) → infecção bacteriana **secundária** (E. coli, Klebsiella, Enterococcus). A evolução pode chegar a **empiema, gangrena e perfuração**.\n\n**Colangite:** a obstrução eleva a **pressão intraductal**; acima de ~20 cmH₂O ocorre **refluxo colangiovenoso/linfático**, lançando bactérias diretamente na circulação → **sepse de origem biliar**.\n\n👉 É isso que explica a conduta: na colangite, **antibiótico sozinho não resolve** — enquanto a via biliar estiver obstruída e sob pressão, o paciente continua bacterêmico. **A drenagem é o tratamento.**",
      },
      {
        secao: "Colecistite — quadro e critérios (TG18)",
        corpo:
          "**Clínica:** dor em **hipocôndrio direito** > 6 h (diferente da cólica biliar, que é autolimitada), **sinal de Murphy** (parada inspiratória à palpação do HCD), febre, náuseas.\n\n**Critérios diagnósticos TG18 — exigem as TRÊS categorias:**\n- **(A) Sinais locais:** Murphy, dor/massa em HCD;\n- **(B) Sinais sistêmicos:** febre, **PCR elevada**, leucocitose;\n- **(C) Confirmação por imagem.**\n\n**Achados ultrassonográficos** (USG é o exame inicial de escolha): **espessamento de parede > 4 mm**, **Murphy ultrassonográfico**, **líquido pericolecístico**, cálculo/lama, distensão vesicular.\n\n⚠️ **Dilatação do ducto pancreático principal NÃO é critério** de colecistite (é achado pancreático).",
      },
      {
        secao: "Colecistite — classificação de gravidade e conduta",
        corpo:
          "| Grau | Definição | Conduta |\n|---|---|---|\n| **I (leve)** | Sem disfunção, inflamação leve | **Colecistectomia videolaparoscópica precoce** |\n| **II (moderada)** | Leucocitose > 18.000, massa palpável, > 72 h de evolução, inflamação local importante | **CVL precoce** (cirurgião experiente) |\n| **III (grave)** | **Disfunção orgânica** (cardiovascular, neurológica, respiratória, renal, hepática, hematológica) | **Estabilizar** + ATB + **colecistostomia percutânea**; CVL **após** estabilização |\n\n**Momento da cirurgia (WSES 2020 — mudança de paradigma):** **colecistectomia precoce, idealmente em até 7 dias** do início dos sintomas, **na mesma internação**. É **superior** à conduta antiga de \"esperar esfriar\" 6 semanas: menor tempo total de internação, **sem aumento de complicações**. A **via laparoscópica é preferida mesmo na fase aguda**.",
      },
      {
        secao: "Colangite — quadro clínico",
        corpo:
          "**Tríade de Charcot** (presente em ~50–70%): **dor em HCD + febre (com calafrios) + icterícia**.\n\n**Pêntade de Reynolds** (colangite **grave/tóxica**): tríade de Charcot **+ hipotensão + confusão mental** → é **choque séptico de foco biliar**, exige drenagem de urgência.\n\n**Laboratório:** **padrão colestático** — **FA e GGT elevadas** com **hiperbilirrubinemia DIRETA**. (Elevação isolada e importante de transaminases sugere padrão **hepatocelular**/hepatite; amilase e lipase são marcadores pancreáticos.)",
      },
      {
        secao: "Colangite — diagnóstico e conduta",
        corpo:
          "**Imagem:**\n- **USG:** inicial — mostra dilatação de vias biliares, mas tem baixa sensibilidade para ver o cálculo no colédoco;\n- **CPRM (colangiorressonância):** **exame não invasivo de escolha para confirmar coledocolitíase** antes de indicar terapêutica;\n- **CPRE:** **diagnóstica E terapêutica**, porém **invasiva** — reservada para **drenar**, não para confirmar;\n- **Ecoendoscopia:** alternativa de alta acurácia.\n\n**Conduta (tripé):**\n1. **Suporte + antibiótico** de amplo espectro cobrindo Gram-negativos e anaeróbios;\n2. ⚠️ **DRENAGEM da via biliar** — o pilar. **CPRE com papilotomia** é a 1ª escolha; alternativas: drenagem trans-hepática percutânea, cirúrgica;\n3. **Colecistectomia** posteriormente, se a origem for litiásica.\n\n**Urgência da drenagem:** imediata na colangite **grave** (pêntade de Reynolds/choque) ou refratária ao ATB.",
      },
      {
        secao: "Litíase biliar — tipos de cálculo",
        corpo:
          "- **Colesterol** (mais comum no Ocidente): **obesidade, dislipidemia**, sexo feminino, idade, perda rápida de peso, multiparidade (os \"4 F\": *female, forty, fertile, fat*);\n- **Pigmentares PRETOS:** **hemólise crônica** (anemia falciforme, esferocitose) e **cirrose** — excesso de bilirrubina não conjugada;\n- **Pigmentares CASTANHOS:** **infecção biliar crônica e estase** (parasitoses de via biliar).\n\n⚠️ Preto = **hemólise/cirrose**; castanho = **infecção/estase**. Trocar os dois é pegadinha clássica.",
      },
      {
        secao: "Síndromes e complicações",
        corpo:
          "- **Síndrome de Mirizzi:** **compressão extrínseca do ducto hepático comum** por cálculo impactado no **infundíbulo/ducto cístico** → icterícia obstrutiva **mesmo sem cálculo no colédoco**. Importa porque **aumenta o risco de lesão iatrogênica de via biliar** na colecistectomia;\n- **Íleo biliar:** **fístula colecistoentérica** (vesícula-duodeno) → cálculo grande migra e obstrui o íleo terminal. Tríade de Rigler: **pneumobilia + obstrução intestinal + cálculo ectópico**;\n- **Colecistite alitiásica:** paciente crítico, jejum prolongado, NPT, grande queimado — alta taxa de gangrena;\n- **Empiema, gangrena, perfuração**; **pancreatite biliar**.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **TG18 exige as 3 categorias**: sinais locais **+** sistêmicos **+** imagem. Nenhuma isolada fecha.\n- ★ **WSES 2020: colecistectomia PRECOCE (≤ 7 dias), na mesma internação** — a conduta de \"esperar esfriar 6 semanas\" está **superada**.\n- ★ **Laparoscopia é preferida mesmo na fase aguda.**\n- ★ **Grau III (disfunção orgânica) + instável → colecistostomia percutânea**, não cirurgia de imediato.\n- ★ **Charcot = dor + febre + icterícia.** **Reynolds = Charcot + hipotensão + confusão** (grave).\n- ★ **Na colangite, ANTIBIÓTICO SOZINHO NÃO RESOLVE — tem que DRENAR** (CPRE).\n- ★ **CPRM = confirmar** (não invasiva); **CPRE = tratar** (invasiva).\n- ★ **Cálculo preto = hemólise/cirrose; castanho = infecção/estase.**\n- ★ **Mirizzi = compressão do hepático comum** por cálculo no infundíbulo → risco de lesão de via biliar.\n- ★ **Dilatação do ducto pancreático não é critério de colecistite.**\n- ★ Padrão **colestático = FA/GGT + BD**; transaminases altíssimas = hepatocelular.",
      },
    ],
    referencias: [
      "Tokyo Guidelines 2018 (TG18) — diagnóstico e manejo de colecistite e colangite agudas",
      "WSES 2020 — Guidelines on acute calculous cholecystitis",
      "Sabiston — Textbook of Surgery",
      "Material do usuário — Cirurgia OMED VI (Banco de Questões / Resumo Absoluto)",
    ],
  },
};
