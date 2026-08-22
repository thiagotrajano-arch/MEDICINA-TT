import type { Questao } from "@/domain/content/types";

const SUBTEMA = "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias";
const FONTE =
  "Ministério da Saúde — Violência sexual: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/violencia-sexual/violencia-sexual (acesso em 2026-08-22); Ministério da Saúde — PEP: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aids-hiv/pep";

export const QUESTOES_VIOLENCIA_SEXUAL: Questao[] = [
  {
    id: "go-violencia-sexual-001",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Pessoa em situação de violência sexual chega a uma unidade de saúde sem boletim de ocorrência. Qual é a conduta inicial mais adequada?",
    alternativas: [
      { letra: "A", texto: "Acolher em ambiente privativo, oferecer assistência integral e iniciar avaliação/profilaxias conforme o caso; o atendimento de saúde não depende de boletim de ocorrência.", correta: true, comentario: "Correta. O Ministério da Saúde orienta acolhimento, privacidade e cuidado integral; não é necessário BO para acessar o serviço de saúde." },
      { letra: "B", texto: "Recusar atendimento até que a pessoa apresente registro policial e identificação do agressor.", correta: false, comentario: "O acesso à assistência não depende de BO nem da identificação do agressor." },
      { letra: "C", texto: "Realizar interrogatório detalhado diante da equipe inteira para acelerar a investigação criminal.", correta: false, comentario: "A abordagem deve evitar julgamento e revitimização, preservar privacidade e registrar apenas o necessário para o cuidado." },
      { letra: "D", texto: "Encaminhar exclusivamente à polícia, pois profilaxias não fazem parte do atendimento de saúde.", correta: false, comentario: "O serviço de saúde deve ofertar acolhimento, profilaxias, contracepção de emergência quando indicada e seguimento." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["violência sexual", "acolhimento", "privacidade", "revitimização"],
  },
  {
    id: "go-violencia-sexual-002",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Pessoa em situação de violência sexual procura atendimento 48 horas após a exposição. Qual afirmação sobre a PEP para HIV é mais adequada?",
    alternativas: [
      { letra: "A", texto: "É uma medida de emergência e deve ser iniciada o mais cedo possível, dentro da janela de até 72 horas quando indicada, com acompanhamento do serviço.", correta: true, comentario: "Correta. O Ministério da Saúde informa que a PEP para HIV deve começar o mais cedo possível e pode ser indicada até 72 horas após a exposição." },
      { letra: "B", texto: "Só pode ser iniciada se a pessoa apresentar sintomas de infecção pelo HIV.", correta: false, comentario: "PEP é prevenção após exposição de risco; não depende de sintomas, que geralmente não orientam a decisão inicial." },
      { letra: "C", texto: "Deve ser aguardado o resultado de todos os exames por uma semana antes de iniciar a profilaxia.", correta: false, comentario: "A demora reduz a oportunidade de prevenção; exames e avaliação devem ocorrer sem atrasar o início quando indicado." },
      { letra: "D", texto: "A PEP substitui contracepção de emergência e a avaliação de hepatite B e outras IST.", correta: false, comentario: "O cuidado é integral: PEP para HIV é um componente, não substitui avaliação de gravidez, hepatite B e outras IST." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["PEP", "HIV", "72 horas", "profilaxia"],
  },
  {
    id: "go-violencia-sexual-003",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Sobre a notificação de violência sexual no serviço de saúde, qual afirmação é correta?",
    alternativas: [
      { letra: "A", texto: "A notificação compulsória deve ser realizada conforme o fluxo vigente, sem substituir o cuidado e sem ser confundida com envio automático da identidade à segurança pública.", correta: true, comentario: "Correta. O Ministério da Saúde orienta notificação em 24 horas para vigilância; a notificação de saúde não é automaticamente encaminhada à segurança pública." },
      { letra: "B", texto: "A notificação só pode ocorrer depois de autorização do agressor.", correta: false, comentario: "A notificação é uma obrigação sanitária conforme os fluxos vigentes e não depende de autorização do agressor." },
      { letra: "C", texto: "A notificação elimina a necessidade de consentimento e de comunicação respeitosa durante o cuidado.", correta: false, comentario: "Notificar não autoriza revitimização; o cuidado deve preservar privacidade, autonomia e comunicação ética." },
      { letra: "D", texto: "A notificação deve ser feita apenas se houver lesão física visível.", correta: false, comentario: "Violência sexual não exige lesão visível para justificar acolhimento, cuidado e notificação conforme a norma." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["notificação compulsória", "vigilância", "privacidade", "violência sexual"],
  },
];
