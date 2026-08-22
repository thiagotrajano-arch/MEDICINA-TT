import type { ConteudoSubtema } from "@/domain/content/types";

/**
 * Resumos — MFC / Metodologia Científica.
 * Consolidados a partir do "MFC — Banco de Questões OMED VI" do usuário e da
 * literatura padrão de epidemiologia clínica.
 */

export const CONTEUDOS_MFC: Record<string, ConteudoSubtema> = {
  "mfc--rastreamentos--rastreamentos-populacionais": {
    subtemaId: "mfc--rastreamentos--rastreamentos-populacionais",
    titulo: "Rastreamentos populacionais",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      {
        secao: "O que é — e o que não é",
        corpo: "Rastreamento aplica um teste a pessoas **assintomáticas** de uma população-alvo definida para identificar doença pré-clínica ou lesões precursoras. Não é sinônimo de investigar sintomas: quem tem queixa precisa de avaliação diagnóstica. Um programa responsável também precisa prever confirmação, tratamento e seguimento para resultados alterados.",
      },
      {
        secao: "Organizado versus oportunístico",
        corpo: "O rastreamento **organizado** define população-alvo, convocação, periodicidade, registro e fluxo de cuidado. O oportunístico ocorre durante atendimentos por outras razões e pode perder pessoas que não acessam o serviço, além de concentrar exames em quem já procura a rede. A existência de um exame disponível não significa que toda pessoa deva fazê-lo em qualquer intervalo.",
      },
      {
        secao: "Colo do útero — atualização nacional",
        corpo: "A diretriz brasileira aprovada em 2025 incorporou o teste molecular para detecção de DNA-HPV oncogênico como exame primário do rastreamento organizado. A citologia pode participar do fluxo complementar após resultado positivo, conforme a diretriz e a implantação local da rede. A periodicidade depende do método e do protocolo vigente; não se deve transformar a prática em repetição anual automática.",
      },
      {
        secao: "Mama — faixa prioritária",
        corpo: "A atualização do INCA divulgada em 2025 passou a priorizar mamografia de rastreamento para mulheres de **50 a 74 anos**, a cada dois anos, como estratégia com maior comprovação de redução de mortalidade. Fora da faixa prioritária, a decisão deve considerar contexto individual, benefícios, falsos positivos, exames adicionais e sobrediagnóstico.",
      },
      {
        secao: "Benefícios, vieses e danos",
        corpo: "O desfecho mais importante é reduzir a **mortalidade específica**, não apenas aumentar a sobrevida contada a partir do diagnóstico. O lead-time pode fazer a sobrevida aparente crescer sem adiar o óbito; o length-time seleciona doenças de evolução mais lenta; e o sobrediagnóstico detecta alterações que nunca causariam dano. Falsos positivos podem gerar ansiedade e procedimentos desnecessários.",
      },
      {
        secao: "Pontos de prova",
        corpo: "- Pessoa sintomática: investigação diagnóstica, não rastreamento.\n- Resultado positivo: achado de triagem, não diagnóstico confirmado.\n- Todo programa precisa de confirmação e tratamento acessíveis.\n- A periodicidade é parte da recomendação; fazer mais exames não garante mais benefício.\n- Decisão compartilhada deve apresentar benefícios e danos, respeitando a diretriz nacional e a organização local do SUS.",
      },
    ],
    referencias: [
      "Ministério da Saúde — Como funciona o rastreamento do câncer no SUS?: https://www.gov.br/saude/pt-br/composicao/saes/atencao-ao-cancer/faq/faq/como-funciona-o-rastreamento-do",
      "Ministério da Saúde/CONITEC — Diretriz Brasileira para Rastreamento do Câncer do Colo do Útero (2025): https://www.gov.br/saude/pt-br/assuntos/pcdt/r/rastreamento-cancer-do-colo-do-utero/view",
      "INCA — Detecção precoce do câncer de mama (atualização de 2025): https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude",
      "Ministério da Saúde — Câncer: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/saude-de-a-z/c/cancer",
    ],
  },
  "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade": {
    subtemaId: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade",
    titulo: "Testes diagnósticos — sensibilidade, especificidade e valores preditivos",
    atualizadoEm: "2026-07-16",
    origem: "edicao_manual",
    blocos: [
      {
        secao: "A tabela 2×2 — a base de tudo",
        corpo:
          "Todo o tema sai desta tabela. Memorize a **posição**, não as fórmulas soltas:\n\n| | **Doente** | **Não doente** |\n|---|---|---|\n| **Teste +** | **a** (verdadeiro-positivo) | **b** (falso-positivo) |\n| **Teste −** | **c** (falso-negativo) | **d** (verdadeiro-negativo) |\n\n👉 A regra de ouro: **sensibilidade e especificidade leem a tabela na VERTICAL** (partem de quem tem/não tem a doença); **valores preditivos leem na HORIZONTAL** (partem do resultado do teste). É daí que decorre tudo o que vem abaixo.",
        figura: "mfc-tabela-2x2",
      },
      {
        secao: "Sensibilidade e especificidade",
        corpo:
          "- **Sensibilidade = a/(a+c)** — *entre os DOENTES, quantos o teste pega?* Responde à pergunta do teste **positivo entre doentes**.\n- **Especificidade = d/(b+d)** — *entre os SADIOS, quantos o teste corretamente inocenta?*\n\n**São propriedades INTRÍNSECAS do teste** — **não mudam com a prevalência** da doença na população. É essa estabilidade que as torna úteis para comparar testes entre si.",
      },
      {
        secao: "Valores preditivos",
        corpo:
          "- **VPP = a/(a+b)** — *dado um teste POSITIVO, qual a probabilidade de a pessoa estar doente?*\n- **VPN = d/(c+d)** — *dado um teste NEGATIVO, qual a probabilidade de estar sadia?*\n\n⚠️ **VPP e VPN DEPENDEM DA PREVALÊNCIA** — é a diferença conceitual mais cobrada.\n\n**Por quê?** Quanto mais rara a doença, mais gente sadia é testada, e mais **falsos-positivos** aparecem em números absolutos — diluindo os verdadeiros-positivos.\n\n**Exemplo numérico (memorize a lógica, não o número):** teste com S = 95% e E = 90% numa população de **10.000** com **prevalência de 1%**:\n- 100 doentes → **95 verdadeiros-positivos**;\n- 9.900 sadios → 10% de falsos-positivos → **990 falsos-positivos**;\n- **VPP = 95/(95+990) ≈ 9%**.\n\n👉 Um teste \"excelente\" gera **VPP de 9%** numa doença rara. **É por isso que não se rastreia doença de baixa prevalência na população geral.**",
      },
      {
        secao: "SnNOUT e SpPIN",
        corpo:
          "Os dois mnemônicos que resolvem a maioria das questões:\n\n- **SnNOUT** — teste muito **S**e**n**sível, quando **N**egativo, **exclui** (rules **OUT**) a doença. Por quê? Alta sensibilidade = **poucos falsos-negativos** → se deu negativo, dificilmente é doente. **Serve para triagem/rastreamento.**\n- **SpPIN** — teste muito **Sp**ecífico, quando **P**ositivo, **confirma** (rules **IN**) a doença. Alta especificidade = **poucos falsos-positivos** → se deu positivo, dificilmente é sadio. **Serve para confirmação.**\n\n**Aplicação prática:** rastreia-se com teste sensível (não deixar doente escapar) e **confirma-se** com teste específico (não rotular sadio como doente). É a lógica do fluxograma do HIV e da sífilis.",
      },
      {
        secao: "Razão de verossimilhança (likelihood ratio)",
        corpo:
          "Combina sensibilidade e especificidade e **não depende da prevalência** — por isso é a medida mais útil na beira do leito:\n\n- **LR+ = S/(1−E)** — quanto o **teste positivo** aumenta a chance de doença;\n- **LR− = (1−S)/E** — quanto o **teste negativo** reduz.\n\n**Interpretação:** **LR+ > 10** ou **LR− < 0,1** alteram a probabilidade de forma **significativa**. **LR = 1** = o teste **não muda nada** (inútil).\n\nÉ o instrumento que operacionaliza o **raciocínio bayesiano**: probabilidade pré-teste → aplica LR → probabilidade pós-teste.",
      },
      {
        secao: "Curva ROC e ponto de corte",
        corpo:
          "A **curva ROC** plota **sensibilidade (eixo Y)** contra **1 − especificidade (eixo X)** para todos os pontos de corte possíveis.\n\n- **AUC = 1,0** → discriminação **perfeita**;\n- **AUC = 0,5** → **linha diagonal** — equivale a **sortear no cara ou coroa**: o teste **não discrimina** doente de sadio;\n- Quanto **mais próximo do canto superior esquerdo**, melhor.\n\n**Trade-off do ponto de corte:** baixar o corte **aumenta a sensibilidade e reduz a especificidade** (mais positivos, mais falsos-positivos) — e vice-versa. **Não existe ganhar nos dois**; escolhe-se conforme o objetivo (rastrear vs. confirmar).",
      },
      {
        secao: "Vieses do rastreamento",
        corpo:
          "Três armadilhas que fazem um rastreamento **parecer** eficaz sem salvar ninguém:\n\n- **Viés de antecipação diagnóstica (lead time):** o diagnóstico é feito mais cedo, então a **sobrevida medida a partir do diagnóstico** aumenta — **sem que a data do óbito mude**. Sobrevida maior ≠ vida mais longa;\n- **Viés de duração (length time):** o rastreamento capta preferencialmente os tumores **de crescimento lento** (que ficam mais tempo detectáveis), que já teriam melhor prognóstico;\n- **Sobrediagnóstico:** detectar doença que **nunca causaria sintoma nem morte** — e tratá-la só gera dano (é o que fundamenta a **prevenção quaternária**).\n\n👉 Por isso o desfecho válido de rastreamento é **mortalidade específica pela doença**, não sobrevida.",
      },
      {
        secao: "Pontos de prova / Pegadinhas",
        corpo:
          "- ★ **Sensibilidade e especificidade NÃO mudam com a prevalência; VPP e VPN MUDAM.** É a pegadinha nº 1.\n- ★ **SnNOUT** (sensível + negativo = exclui) / **SpPIN** (específico + positivo = confirma).\n- ★ **Sensibilidade = a/(a+c)** — parte dos **doentes**. Não confundir com VPP (parte do **teste positivo**).\n- ★ **Doença rara → VPP baixo**, mesmo com teste ótimo (muitos falsos-positivos em números absolutos).\n- ★ **AUC = 0,5 → teste inútil** (equivale a sorteio). AUC = 1 → perfeito.\n- ★ **LR = 1 → o teste não agrega nada.** LR+ > 10 ou LR− < 0,1 são clinicamente relevantes.\n- ★ **Não dá para aumentar sensibilidade e especificidade ao mesmo tempo** mexendo no corte — é trade-off.\n- ★ **Lead time bias:** sobrevida maior **sem** adiar o óbito. Desfecho correto de rastreio = **mortalidade específica**.\n- ★ **Rastreia com sensível, confirma com específico.**",
      },
    ],
    referencias: [
      "Fletcher & Fletcher — Epidemiologia Clínica: Elementos Essenciais",
      "Gordis — Epidemiologia",
      "Material do usuário — MFC OMED VI (Banco de Questões / Resumo Absoluto)",
    ],
  },
};
