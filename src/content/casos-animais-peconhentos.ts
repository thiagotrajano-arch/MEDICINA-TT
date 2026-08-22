import type { CasoClinico } from "@/domain/content/types";

export const CASOS_ANIMAIS_PECONHENTOS: CasoClinico[] = [
  {
    id: "caso-inf-animais-peconhentos-01",
    disciplinaId: "inf",
    subtemaId: "inf--acidentes-por-animais-peconhentos--reconhecimento-e-soroterapia",
    titulo: "Jararaca e edema progressivo no membro inferior",
    resumo: "Reconhecimento clínico, classificação do acidente botrópico e encaminhamento seguro para soroterapia.",
    dificuldade: "intermediaria",
    tags: ["acidente botrópico", "ofidismo", "soroterapia", "coagulopatia"],
    etapas: [
      {
        tipo: "historia",
        titulo: "História",
        corpo: "Homem de 34 anos é mordido no dorso do pé esquerdo durante atividade rural. Não conseguiu capturar a serpente. Chega ao serviço de saúde cerca de 2 horas depois, consciente, com dor local crescente e sem dispneia.",
        pergunta: "A ausência de fotografia da serpente impede o atendimento inicial?",
        resposta: "Não. O diagnóstico de envenenamento ofídico é principalmente clínico-epidemiológico. A identificação segura do animal pode ajudar, mas não deve atrasar avaliação, classificação e encaminhamento.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Exame físico",
        corpo: "PA 128 × 78 mmHg, FC 96 bpm, consciente e perfundido. Há edema e equimose do pé até a perna, atingindo dois segmentos do membro, além de pequeno sangramento gengival. Não há choque nem alteração neurológica.",
        pergunta: "Como classificar o quadro e quais dados devem ser acompanhados?",
        resposta: "O padrão é compatível com acidente botrópico moderado: edema em dois segmentos, com sangramento discreto e sem choque. Devem ser acompanhados o exame clínico seriado, tempo de coagulação/coagulograma, hemograma e função renal, conforme o PCDT vigente.",
      },
      {
        tipo: "conduta",
        titulo: "Conduta imediata",
        corpo: "A unidade não possui estoque de antiveneno, mas consegue estabilizar o paciente e acionar regulação para hospital de referência.",
        pergunta: "Qual é a conduta segura enquanto o encaminhamento é organizado?",
        resposta: "Manter o paciente em repouso, retirar objetos constritivos do membro, evitar torniquete, cortes, sucção e substâncias caseiras, obter acesso e monitorização conforme gravidade, coletar exames sem atrasar a transferência e encaminhar rapidamente para serviço habilitado. A soroterapia, quando indicada pela classificação, é administrada por via intravenosa em ambiente preparado e conforme o PCDT/local protocol.",
      },
      {
        tipo: "evolucao",
        titulo: "Reavaliação",
        corpo: "Durante a observação, o edema progride e o tempo de coagulação permanece alterado. Não há hipotensão, anúria ou sangramento maior.",
        pergunta: "O que esse achado exige?",
        resposta: "Reavaliação clínica e laboratorial contínua pela equipe que conduz a soroterapia. Persistência de coagulopatia ou surgimento de sangramento, choque ou injúria renal exige seguir o protocolo vigente e tratar complicações; não se deve presumir que uma única avaliação encerrou o risco.",
      },
    ],
    discussao: "O caso treina quatro decisões: (1) não atrasar o atendimento por falta de identificação fotográfica; (2) classificar a gravidade pela extensão do edema e manifestações sistêmicas; (3) evitar medidas populares lesivas, como torniquete, incisão e sucção; e (4) monitorar coagulação, hemograma, função renal e evolução mesmo após iniciar o tratamento específico. A escolha e a quantidade do antiveneno devem seguir a versão vigente do PCDT e a disponibilidade do serviço de referência.",
    referencias: [
      "Ministério da Saúde — Acidentes por animais peçonhentos: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos",
      "Ministério da Saúde — Acidentes ofídicos: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/acidentes-ofidicos",
      "CONITEC — PCDT de acidentes ofídicos: https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-ofidicos",
    ],
  },
];
