import type { Questao } from "@/domain/content/types";

export const QUESTOES_REUMATO_EXTRA: Questao[] = [
  {
    id: "reumato-extra-001",
    subtemaId: "reumato--sindrome-de-sjogren-e-behcet--diagnostico-e-conduta",
    disciplinaId: "reumato",
    enunciado: "Mulher com olho seco, boca seca, parÃ³tidas aumentadas e anti-Ro/SSA positivo deve ser acompanhada tambÃ©m por qual risco de longo prazo?",
    alternativas: [
      { letra: "A", texto: "Apendicite recorrente.", correta: false, comentario: "NÃ£o hÃ¡ relaÃ§Ã£o tÃ­pica entre SjÃ¶gren e apendicite recorrente." },
      { letra: "B", texto: "Hipoglicemia factÃ­cia.", correta: false, comentario: "Hipoglicemia factÃ­cia nÃ£o Ã© complicaÃ§Ã£o esperada da sÃ­ndrome." },
      { letra: "C", texto: "Linfoma, especialmente quando hÃ¡ aumento glandular persistente ou crioglobulinemia.", correta: true, comentario: "Correta: SjÃ¶gren aumenta risco de linfoma B, e parÃ³tida persistente, pÃºrpura/crioglobulinemia e complemento baixo elevam suspeita." },
      { letra: "D", texto: "Hemorragia subaracnoidea hereditÃ¡ria como regra.", correta: false, comentario: "NÃ£o Ã© associaÃ§Ã£o clÃ¡ssica nem eixo de seguimento." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["SjÃ¶gren", "anti-Ro", "linfoma"],
  },
  {
    id: "reumato-extra-002",
    subtemaId: "reumato--vasculites-por-imunocomplexos--crioglobulinemia-e-iga",
    disciplinaId: "reumato",
    enunciado: "Paciente com pÃºrpura palpÃ¡vel em membros inferiores, dor abdominal, artralgia e hematÃºria apÃ³s IVAS. Qual hipÃ³tese Ã© mais provÃ¡vel?",
    alternativas: [
      { letra: "A", texto: "Arterite de cÃ©lulas gigantes.", correta: false, comentario: "ACG acomete idosos com cefaleia, claudicaÃ§Ã£o mandibular e risco visual." },
      { letra: "B", texto: "Vasculite por IgA.", correta: true, comentario: "Correta: a tÃ©trade pÃºrpura palpÃ¡vel, artralgia, dor abdominal e rim apÃ³s infecÃ§Ã£o Ã© tÃ­pica de vasculite por IgA." },
      { letra: "C", texto: "Esclerose sistÃªmica limitada.", correta: false, comentario: "Esclerose sistÃªmica envolve Raynaud, pele espessada e autoanticorpos, nÃ£o essa tÃ©trade." },
      { letra: "D", texto: "Gota tofÃ¡cea.", correta: false, comentario: "Gota cursa com artrite cristalina, nÃ£o pÃºrpura palpÃ¡vel e hematÃºria glomerular." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["vasculite por IgA", "pÃºrpura palpÃ¡vel", "hematÃºria"],
  },
  {
    id: "reumato-extra-003",
    subtemaId: "reumato--miopatias-inflamatorias--dermatomiosite-e-polimiosite",
    disciplinaId: "reumato",
    enunciado: "Mulher de 52 anos com fraqueza proximal, CK elevada, rash heliotropo e pÃ¡pulas de Gottron. Qual preocupaÃ§Ã£o adicional deve entrar na avaliaÃ§Ã£o inicial?",
    alternativas: [
      { letra: "A", texto: "Excluir obrigatoriamente apendicite.", correta: false, comentario: "Apendicite nÃ£o explica fraqueza proximal crÃ´nica com CK alta e lesÃµes tÃ­picas." },
      { letra: "B", texto: "Suspender toda investigaÃ§Ã£o porque o rash fecha doenÃ§a benigna.", correta: false, comentario: "Dermatomiosite em adulto nÃ£o Ã© automaticamente benigna; pode associar neoplasia." },
      { letra: "C", texto: "Tratar apenas como fibromialgia.", correta: false, comentario: "Fibromialgia nÃ£o eleva CK nem causa pÃ¡pulas de Gottron." },
      { letra: "D", texto: "Rastrear neoplasia conforme idade e fatores de risco, alÃ©m de avaliar pulmÃ£o.", correta: true, comentario: "Correta: dermatomiosite adulta exige atenÃ§Ã£o a neoplasia oculta e doenÃ§a pulmonar intersticial." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["dermatomiosite", "CK", "neoplasia"],
  },
];
