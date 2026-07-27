import type { Questao } from "@/domain/content/types";

export const QUESTOES_GASTRO_EXTRA: Questao[] = [
  {
    id: "gastro-extra-001",
    subtemaId: "gastro--doenca-de-wilson--diagnostico-e-conduta",
    disciplinaId: "gastro",
    enunciado: "Jovem com hepatite crÃ´nica inexplicada, tremor, disartria e anel de Kayser-Fleischer deve ser investigado inicialmente com qual raciocÃ­nio?",
    alternativas: [
      { letra: "A", texto: "DoenÃ§a de Wilson, com ceruloplasmina, cobre urinÃ¡rio de 24h e avaliaÃ§Ã£o oftalmolÃ³gica/hepÃ¡tica.", correta: true, comentario: "Correta: hepatopatia em jovem com sinais neurolÃ³gicos e anel corneano Ã© Wilson atÃ© prova em contrÃ¡rio." },
      { letra: "B", texto: "Hepatite A crÃ´nica, pois HAV cronifica em jovens.", correta: false, comentario: "HAV nÃ£o causa hepatite crÃ´nica como regra." },
      { letra: "C", texto: "Hemocromatose clÃ¡ssica como primeira hipÃ³tese isolada.", correta: false, comentario: "Hemocromatose pode causar hepatopatia, mas nÃ£o explica bem esse fenÃ³tipo neurolÃ³gico/corneano jovem." },
      { letra: "D", texto: "SÃ­ndrome de Gilbert como explicaÃ§Ã£o para sinais neurolÃ³gicos.", correta: false, comentario: "Gilbert Ã© hiperbilirrubinemia indireta benigna e nÃ£o causa hepatopatia crÃ´nica com disartria." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["Wilson", "ceruloplasmina", "Kayser-Fleischer"],
  },
  {
    id: "gastro-extra-002",
    subtemaId: "gastro--doenca-hepatica-alcoolica--diagnostico-e-conduta",
    disciplinaId: "gastro",
    enunciado: "Paciente com uso pesado de Ã¡lcool, icterÃ­cia recente, AST 180, ALT 70, INR elevado e bilirrubina alta. Qual interpretaÃ§Ã£o Ã© mais adequada?",
    alternativas: [
      { letra: "A", texto: "O padrÃ£o exclui hepatite alcoÃ³lica porque AST nÃ£o passou de 1000.", correta: false, comentario: "Transaminases muito altas sugerem isquemia/toxicidade; hepatite alcoÃ³lica costuma ter valores moderados." },
      { letra: "B", texto: "A relaÃ§Ã£o AST/ALT nÃ£o tem utilidade nesse contexto.", correta: false, comentario: "RelaÃ§Ã£o AST/ALT elevada Ã© pista Ãºtil quando encaixa no contexto." },
      { letra: "C", texto: "Hepatite alcoÃ³lica Ã© provÃ¡vel; estratificar gravidade e contraindicaÃ§Ãµes antes de considerar corticoide.", correta: true, comentario: "Correta: icterÃ­cia recente, AST>ALT moderado e coagulopatia sugerem hepatite alcoÃ³lica grave a estratificar." },
      { letra: "D", texto: "Tratamento principal Ã© apenas vitamina C.", correta: false, comentario: "Suporte nutricional e tiamina importam, mas nÃ£o substituem abstinÃªncia e estratificaÃ§Ã£o terapÃªutica." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["hepatite alcoÃ³lica", "AST ALT", "cirrose"],
  },
];
