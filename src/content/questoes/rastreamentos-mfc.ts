import type { Questao } from "@/domain/content/types";

const SUBTEMA = "mfc--rastreamentos--rastreamentos-populacionais";
const FONTE_MS =
  "Ministério da Saúde — Como funciona o rastreamento do câncer no SUS? (acesso em 2026-08-22): https://www.gov.br/saude/pt-br/composicao/saes/atencao-ao-cancer/faq/faq/como-funciona-o-rastreamento-do";
const FONTE_COLO =
  "Ministério da Saúde/CONITEC — Diretriz Brasileira para Rastreamento do Câncer do Colo do Útero, atualizada em 2025: https://www.gov.br/saude/pt-br/assuntos/pcdt/r/rastreamento-cancer-do-colo-do-utero/view";
const FONTE_MAMA =
  "INCA/Ministério da Saúde — Versão para profissionais de saúde: detecção precoce do câncer de mama (atualização de 2025): https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude";

export const QUESTOES_RASTREAMENTOS_MFC: Questao[] = [
  {
    id: "mfc-rast-001",
    subtemaId: SUBTEMA,
    disciplinaId: "mfc",
    enunciado: "Qual característica define rastreamento populacional?",
    alternativas: [
      { letra: "A", texto: "Investigação de uma pessoa com sintoma já presente, para confirmar o diagnóstico.", correta: false, comentario: "Isso é investigação diagnóstica, não rastreamento de população assintomática." },
      { letra: "B", texto: "Aplicação sistemática de exame em pessoas assintomáticas de uma população-alvo definida, com fluxo previsto para resultados alterados.", correta: true, comentario: "Correta. Rastreamento exige população-alvo assintomática, teste definido e caminho de confirmação/seguimento; não é apenas pedir um exame isolado." },
      { letra: "C", texto: "Solicitação de qualquer exame disponível durante uma consulta, sem necessidade de protocolo.", correta: false, comentario: "Exame oportunístico sem população-alvo ou fluxo de seguimento não caracteriza programa organizado de rastreamento." },
      { letra: "D", texto: "Exame feito apenas em pessoas com história familiar de alto risco.", correta: false, comentario: "Pessoas de alto risco podem precisar de vigilância individualizada; isso não define rastreamento populacional de risco habitual." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    fonte: FONTE_MS,
    tags: ["rastreamento", "atenção primária", "população assintomática", "prevenção"],
  },
  {
    id: "mfc-rast-002",
    subtemaId: SUBTEMA,
    disciplinaId: "mfc",
    enunciado: "Uma pessoa assintomática com colo do útero, de 32 anos, pergunta sobre a estratégia nacional atual para rastreamento do câncer do colo do útero no SUS. Qual alternativa está correta?",
    alternativas: [
      { letra: "A", texto: "O teste molecular para DNA-HPV oncogênico é utilizado como exame primário, conforme a diretriz nacional vigente e a organização local da rede.", correta: true, comentario: "Correta. A diretriz brasileira de 2025 aprovou o rastreamento organizado com teste molecular para DNA-HPV oncogênico; a implantação depende da rede assistencial organizada." },
      { letra: "B", texto: "A citologia foi abolida em qualquer situação e não pode participar do fluxo após resultado alterado.", correta: false, comentario: "A citologia pode ter papel complementar no fluxo de investigação de resultados positivos, conforme a diretriz vigente." },
      { letra: "C", texto: "O rastreamento deve começar apenas após os 50 anos.", correta: false, comentario: "A faixa etária nacional não se limita a pessoas acima de 50 anos." },
      { letra: "D", texto: "Um resultado negativo obriga repetição mensal para não perder lesões precursoras.", correta: false, comentario: "A periodicidade depende do método e do protocolo; o rastreamento organizado não é mensal." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE_COLO,
    tags: ["câncer do colo do útero", "DNA-HPV", "rastreamento organizado", "SUS"],
  },
  {
    id: "mfc-rast-003",
    subtemaId: SUBTEMA,
    disciplinaId: "mfc",
    enunciado: "Segundo a atualização divulgada pelo INCA para o rastreamento populacional do câncer de mama no SUS, qual é a faixa etária prioritária e a periodicidade da mamografia?",
    alternativas: [
      { letra: "A", texto: "40 a 49 anos, anualmente, para toda a população de risco habitual.", correta: false, comentario: "Essa não é a faixa etária prioritária atual divulgada pelo INCA para o rastreamento populacional no SUS." },
      { letra: "B", texto: "50 a 74 anos, a cada dois anos, como estratégia prioritária baseada nas melhores evidências disponíveis.", correta: true, comentario: "Correta. A atualização de 2025 do INCA passou a priorizar 50–74 anos com periodicidade bienal; fora dessa faixa, a decisão deve considerar riscos e benefícios com orientação profissional." },
      { letra: "C", texto: "50 a 69 anos, a cada cinco anos, sem necessidade de decisão compartilhada.", correta: false, comentario: "A faixa prioritária foi atualizada para 50–74 anos e o intervalo recomendado é bienal." },
      { letra: "D", texto: "Toda idade adulta, com mamografia semestral, independentemente de sintomas ou risco.", correta: false, comentario: "Rastreamento populacional precisa de população-alvo e periodicidade definidas; não se recomenda mamografia semestral para todas as pessoas." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: FONTE_MAMA,
    tags: ["câncer de mama", "mamografia", "INCA", "rastreamento"],
  },
  {
    id: "mfc-rast-004",
    subtemaId: SUBTEMA,
    disciplinaId: "mfc",
    enunciado: "Ao conversar sobre rastreamento com uma pessoa assintomática, qual desfecho e qual risco devem ser explicados para evitar uma falsa impressão de benefício?",
    alternativas: [
      { letra: "A", texto: "Aumento da sobrevida medida desde o diagnóstico prova, sozinho, que o rastreamento prolongou a vida; sobrediagnóstico não é relevante.", correta: false, comentario: "A sobrevida pode aumentar por antecipação diagnóstica sem alterar a data do óbito; sobrediagnóstico é um dano possível." },
      { letra: "B", texto: "O benefício deve ser avaliado por desfechos relevantes, como redução da mortalidade específica, ponderando falsos positivos, sobrediagnóstico e tratamentos desnecessários.", correta: true, comentario: "Correta. Rastreamento pode produzir danos e a sobrevida aparente isolada é vulnerável a vieses; o balanço benefício–dano precisa ser discutido." },
      { letra: "C", texto: "Todo resultado positivo equivale a câncer confirmado e já indica tratamento.", correta: false, comentario: "Resultado positivo é um achado de triagem e precisa de investigação confirmatória antes de diagnóstico ou tratamento." },
      { letra: "D", texto: "Quanto mais exames anuais forem feitos, maior será necessariamente a redução de mortalidade.", correta: false, comentario: "Mais frequência pode aumentar falsos positivos e sobrediagnóstico sem benefício adicional comprovado." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE_MS,
    tags: ["rastreamento", "sobrediagnóstico", "mortalidade", "prevenção quaternária"],
  },
];
