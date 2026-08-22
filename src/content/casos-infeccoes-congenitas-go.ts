import type { CasoClinico } from "@/domain/content/types";

export const CASOS_INFECCOES_CONGENITAS_GO: CasoClinico[] = [
  {
    id: "caso-go-storch-01",
    disciplinaId: "go",
    subtemaId: "go--infeccoes-congenitas-storch--sifilis-toxoplasmose-cmv-rubeola",
    titulo: "Teste reagente para sífilis no pré-natal",
    resumo: "Do rastreamento inicial à prevenção da transmissão vertical, com registro e seguimento materno.",
    dificuldade: "intermediaria",
    tags: ["sífilis gestacional", "pré-natal", "penicilina", "transmissão vertical"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Primeira consulta",
        corpo:
          "Gestante de 18 semanas, sem sintomas atuais, comparece à primeira consulta nesta unidade. Não possui caderneta completa e não sabe informar se já foi testada para sífilis nesta gestação. O teste rápido realizado na unidade é reagente.",
        pergunta: "A ausência de sintomas permite aguardar outro exame antes de tomar uma decisão?",
        resposta:
          "Não. A sífilis pode estar na fase latente, sem manifestações clínicas. O resultado reagente exige correlação com histórico, exame clínico e testes disponíveis, mas o Ministério da Saúde recomenda tratamento imediato da gestante após um teste reagente, sem criar atraso desnecessário.",
      },
      {
        tipo: "laboratorio",
        titulo: "Estadiamento e registro",
        corpo:
          "A paciente não apresenta lesões, não tem documentação de tratamento prévio e não consegue estabelecer quando ocorreu a infecção. O teste não treponêmico é reagente.",
        pergunta: "O que deve orientar o esquema e o seguimento?",
        resposta:
          "Sem informação confiável para definir a duração, o caso deve ser avaliado como infecção de duração ignorada conforme o protocolo vigente. O esquema deve ser completo para o estágio clínico definido pela equipe, com registro de cada dose, acompanhamento mensal por teste não treponêmico durante a gestação e investigação/tratamento da parceria para reduzir reinfecção.",
      },
      {
        tipo: "conduta",
        titulo: "Tratamento",
        corpo:
          "A unidade dispõe de benzilpenicilina benzatina e consegue acompanhar a paciente. Ela relata alergia remota à penicilina na infância, sem documentação do tipo de reação.",
        pergunta: "Qual princípio terapêutico não pode ser perdido?",
        resposta:
          "A benzilpenicilina benzatina é o tratamento com eficácia documentada na gestação para prevenir sífilis congênita. A história de alergia deve ser esclarecida e, se alergia imediata for confirmada, a gestante deve ser encaminhada para dessensibilização em ambiente apropriado, pois não se deve substituir a penicilina por um esquema considerado equivalente para prevenção da transmissão vertical.",
      },
      {
        tipo: "evolucao",
        titulo: "Seguimento obstétrico",
        corpo:
          "A paciente completa o esquema, mas retorna no terceiro trimestre sem o registro de uma das doses e informa que a última aplicação ocorreu há 12 dias. O parto ainda não está próximo.",
        pergunta: "O que precisa ser verificado antes de classificar o tratamento como adequado?",
        resposta:
          "É necessário conferir o esquema do estágio, as datas e os intervalos documentados. O intervalo entre doses não deve ultrapassar nove dias; se isso ocorreu, o esquema precisa ser reiniciado conforme a orientação vigente. Também deve ser confirmado que o tratamento foi iniciado até 30 dias antes do parto, além de manter registro e seguimento materno-fetal.",
      },
    ],
    discussao:
      "O caso organiza a prevenção da sífilis congênita em decisões práticas: não depender de sintomas para rastrear, tratar a gestante após teste reagente conforme protocolo, preservar a penicilina como tratamento de escolha na gestação, documentar doses e intervalos, acompanhar mensalmente e reduzir reinfecção com abordagem da parceria. A classificação final de tratamento adequado deve usar a versão vigente do protocolo e o registro clínico completo.",
    referencias: [
      "Ministério da Saúde — Sífilis em gestantes: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sifilis/gestantes",
      "Ministério da Saúde — Sífilis congênita: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/sifilis/gestantes/congenita/congenita",
      "Ministério da Saúde/CONITEC — PCDT para prevenção da transmissão vertical: https://www.gov.br/conitec/pt-br/midias/protocolos/20201113_pcdt_para_ptv_hiv_final.pdf",
    ],
  },
];
