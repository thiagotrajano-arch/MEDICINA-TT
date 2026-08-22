import type { CasoClinico } from "@/domain/content/types";

export const CASOS_RASTREAMENTOS_MFC: CasoClinico[] = [
  {
    id: "caso-mfc-rast-01",
    disciplinaId: "mfc",
    subtemaId: "mfc--rastreamentos--rastreamentos-populacionais",
    titulo: "Rastreamento sem transformar triagem em diagnóstico",
    resumo: "Uma consulta de prevenção organiza indicação, periodicidade e seguimento sem perder de vista os danos do excesso.",
    dificuldade: "intermediaria",
    tags: ["rastreamento", "câncer de mama", "DNA-HPV", "sobrediagnóstico"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Consulta preventiva",
        corpo: "Pessoa de 56 anos, assintomática, procura a UBS porque ouviu que deve fazer todos os exames de câncer anualmente. Não tem história pessoal de câncer nem fator de alto risco conhecido.",
        pergunta: "Qual é o primeiro passo antes de pedir uma bateria de exames?",
        resposta: "Definir o objetivo: rastreamento é dirigido a pessoas assintomáticas, dentro de uma população-alvo e periodicidade definidas por diretriz. Também é necessário verificar sintomas, história familiar, exames prévios e se há indicação de investigação diagnóstica ou vigilância individualizada.",
      },
      {
        tipo: "conduta",
        titulo: "Mama",
        corpo: "A paciente pergunta especificamente sobre mamografia. Não apresenta nódulo, descarga papilar ou outra queixa mamária.",
        pergunta: "Como orientar o rastreamento populacional no SUS?",
        resposta: "A atualização do INCA de 2025 prioriza mamografia entre 50 e 74 anos, a cada dois anos, para redução de mortalidade no rastreamento populacional. Pessoas fora dessa faixa que desejarem o exame precisam receber orientação profissional sobre benefícios, falsos positivos, exames adicionais e sobrediagnóstico.",
      },
      {
        tipo: "laboratorio",
        titulo: "Colo do útero na família",
        corpo: "A paciente também pergunta se a filha de 32 anos, assintomática e com colo do útero, deve fazer Papanicolau todo ano. A filha tem acesso à rede que já iniciou o teste molecular para HPV.",
        pergunta: "Qual princípio deve orientar a resposta?",
        resposta: "A diretriz brasileira atualizada em 2025 utiliza o teste molecular para DNA-HPV oncogênico como exame primário no rastreamento organizado, com fluxo de investigação para resultados positivos. A orientação deve seguir a implantação local da rede e a periodicidade do método, não uma repetição anual automática.",
      },
      {
        tipo: "evolucao",
        titulo: "Resultado alterado",
        corpo: "A mamografia vem com achado que exige investigação complementar. A paciente interpreta o resultado como confirmação de câncer e pede tratamento imediato.",
        pergunta: "Como corrigir a interpretação sem minimizar o achado?",
        resposta: "Um resultado de rastreamento alterado não é diagnóstico definitivo. É necessário encaminhar para o fluxo confirmatório apropriado, explicar a necessidade de investigação e reconhecer que o rastreamento pode gerar falsos positivos; a confirmação deve ocorrer sem atraso indevido, mas sem iniciar tratamento oncológico apenas pela triagem.",
      },
    ],
    discussao:
      "O caso diferencia rastreamento, diagnóstico precoce e investigação confirmatória. A decisão de rastrear depende de população-alvo, teste, intervalo, acesso a confirmação e tratamento. A conversa clínica deve incluir redução de mortalidade como desfecho relevante e os danos possíveis do excesso, especialmente falsos positivos, sobrediagnóstico e procedimentos desnecessários.",
    referencias: [
      "Ministério da Saúde — Como funciona o rastreamento do câncer no SUS?: https://www.gov.br/saude/pt-br/composicao/saes/atencao-ao-cancer/faq/faq/como-funciona-o-rastreamento-do",
      "INCA — Detecção precoce do câncer de mama: https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude",
      "Ministério da Saúde/CONITEC — Diretriz Brasileira para Rastreamento do Câncer do Colo do Útero: https://www.gov.br/saude/pt-br/assuntos/pcdt/r/rastreamento-cancer-do-colo-do-utero/view",
    ],
  },
];
