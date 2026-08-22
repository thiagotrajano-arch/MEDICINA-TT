import type { Questao } from "@/domain/content/types";

const SUBTEMA = "go--infeccoes-congenitas-storch--sifilis-toxoplasmose-cmv-rubeola";
const FONTE_SIFILIS =
  "Ministério da Saúde — Sífilis em gestantes e sífilis congênita (acesso em 2026-08-22): https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sifilis/gestantes e https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sifilis/gestantes/congenita/congenita";
const FONTE_TOXO =
  "Ministério da Saúde — Notas técnicas de toxoplasmose e Nota Técnica nº 14/2020-COSMU/CGCIVI/DAPES/SAPS/MS (acesso em 2026-08-22): https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/toxoplasmose/notas-tecnicas";
const FONTE_RUBEOLA =
  "Ministério da Saúde — Síndrome da Rubéola Congênita (acesso em 2026-08-22): https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sindrome-da-rubeola-congenita/sindrome-da-rubeola-congenita";

export const QUESTOES_INFECCOES_CONGENITAS_GO: Questao[] = [
  {
    id: "go-storch-001",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado:
      "No pré-natal, em quais momentos a gestante deve ser testada para sífilis, além de situações de exposição de risco ou violência sexual?",
    alternativas: [
      {
        letra: "A",
        texto: "Somente na primeira consulta, se estiver assintomática.",
        correta: false,
        comentario: "A ausência de sintomas não exclui sífilis; o rastreio é repetido ao longo da gestação.",
      },
      {
        letra: "B",
        texto: "Na primeira consulta, no terceiro trimestre e no momento do parto ou aborto.",
        correta: true,
        comentario: "Correta. O Ministério da Saúde recomenda esses três momentos para ampliar a detecção e reduzir a transmissão vertical.",
      },
      {
        letra: "C",
        texto: "Apenas entre 35 e 37 semanas, junto com o swab para estreptococo do grupo B.",
        correta: false,
        comentario: "A testagem de sífilis não deve ser limitada ao período do swab de estreptococo do grupo B.",
      },
      {
        letra: "D",
        texto: "Somente se houver lesão genital ou história conhecida de parceria com sífilis.",
        correta: false,
        comentario: "A sífilis pode ser assintomática e o rastreio é recomendado para todas as gestantes nos momentos definidos.",
      },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: FONTE_SIFILIS,
    tags: ["pré-natal", "sífilis gestacional", "rastreamento", "transmissão vertical"],
  },
  {
    id: "go-storch-002",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado:
      "Gestante com teste reagente para sífilis pergunta quando o tratamento será considerado adequado para reduzir o risco de sífilis congênita. Qual resposta está de acordo com o Ministério da Saúde?",
    alternativas: [
      {
        letra: "A",
        texto: "Qualquer antibiótico eficaz contra sífilis, iniciado em qualquer momento da gestação.",
        correta: false,
        comentario: "Na gestação, a benzilpenicilina benzatina é o tratamento com eficácia documentada para prevenir a transmissão vertical.",
      },
      {
        letra: "B",
        texto: "Esquema completo com benzilpenicilina benzatina para o estágio clínico, iniciado até 30 dias antes do parto, respeitando o intervalo entre doses.",
        correta: true,
        comentario: "Correta. O tratamento adequado exige completude para o estágio, início até 30 dias antes do parto e intervalo entre doses que não ultrapasse nove dias.",
      },
      {
        letra: "C",
        texto: "Uma dose de penicilina benzatina, independentemente do estágio e da data do parto.",
        correta: false,
        comentario: "O esquema depende do estágio clínico e a data de início em relação ao parto faz parte do critério de adequação.",
      },
      {
        letra: "D",
        texto: "Tratamento da parceria sexual, mesmo sem tratamento da gestante.",
        correta: false,
        comentario: "A parceria deve ser abordada para reduzir reinfecção, mas isso não substitui o tratamento adequado da gestante.",
      },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE_SIFILIS,
    tags: ["sífilis gestacional", "penicilina", "tratamento adequado", "sífilis congênita"],
  },
  {
    id: "go-storch-003",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado:
      "Gestante de 10 semanas apresenta IgG e IgM positivos para toxoplasmose. Qual é a interpretação mais segura?",
    alternativas: [
      {
        letra: "A",
        texto: "O resultado isolado confirma infecção adquirida nas últimas semanas.",
        correta: false,
        comentario: "IgM pode persistir e a combinação IgG/IgM precisa ser interpretada com cronologia, confirmação e, quando indicada, avidez de IgG.",
      },
      {
        letra: "B",
        texto: "O resultado exclui toxoplasmose congênita porque a gestante está assintomática.",
        correta: false,
        comentario: "A infecção materna pode ser assintomática; ausência de sintomas não exclui risco fetal.",
      },
      {
        letra: "C",
        texto: "É necessário integrar idade gestacional, história e testes confirmatórios, sem definir a data da infecção apenas por essa dupla sorologia.",
        correta: true,
        comentario: "Correta. A condução nacional recomenda rastreamento e interpretação contextualizada; a avidez e a evolução sorológica ajudam a estimar o momento da infecção.",
      },
      {
        letra: "D",
        texto: "A sorologia deve ser ignorada até surgir alteração ultrassonográfica fetal.",
        correta: false,
        comentario: "A identificação e a intervenção precoces são justamente objetivos do rastreamento durante o pré-natal.",
      },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE_TOXO,
    tags: ["toxoplasmose gestacional", "IgG", "IgM", "avidez", "sorologia"],
  },
  {
    id: "go-storch-004",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado:
      "Uma mulher grávida sem evidência de imunidade para rubéola pergunta sobre a vacina tríplice viral. Qual orientação é correta?",
    alternativas: [
      {
        letra: "A",
        texto: "Aplicar a vacina durante a gestação para proteger imediatamente o feto.",
        correta: false,
        comentario: "A vacina contra rubéola não deve ser administrada durante a gestação; a imunização deve ser planejada antes da gravidez ou após o parto.",
      },
      {
        letra: "B",
        texto: "Não há nenhuma medida preventiva; deve-se aguardar sintomas maternos.",
        correta: false,
        comentario: "A prevenção depende da vacinação antes da gestação e da vigilância adequada quando há suspeita de infecção.",
      },
      {
        letra: "C",
        texto: "Registrar a suscetibilidade, evitar a vacina durante a gestação e programar vacinação após o parto.",
        correta: true,
        comentario: "Correta. O Ministério da Saúde orienta que gestantes não recebam a vacina contra rubéola e aguardem o pós-parto para vacinação.",
      },
      {
        letra: "D",
        texto: "Aplicar apenas a vacina contra rubéola no segundo trimestre.",
        correta: false,
        comentario: "Não se recomenda vacina de vírus vivo contra rubéola durante a gestação.",
      },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: FONTE_RUBEOLA,
    tags: ["rubéola", "síndrome da rubéola congênita", "vacinação", "pré-natal"],
  },
];
