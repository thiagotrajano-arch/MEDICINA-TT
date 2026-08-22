import type { CasoClinico } from "@/domain/content/types";

export const CASOS_ROTURA_PREMATURA_MEMBRANAS: CasoClinico[] = [
  {
    id: "caso-go-rpm-01",
    disciplinaId: "go",
    subtemaId: "go--rotura-prematura-de-membranas--diagnostico-e-conduta",
    titulo: "Rotura prematura de membranas: confirmar, vigiar e saber interromper",
    resumo: "Diagnóstico clínico, avaliação da idade gestacional, rastreio de infecção e escolha entre manejo expectante e resolução.",
    dificuldade: "avancada",
    tags: ["RPM", "rotura pré-termo", "corioamnionite", "prematuridade"],
    etapas: [
      {
        tipo: "historia",
        titulo: "Queixa inicial",
        corpo: "Gestante de 29 semanas relata saída súbita e contínua de líquido claro pela vagina há 8 horas, sem contrações regulares. Nega febre e sangramento.",
        pergunta: "Como iniciar a investigação?",
        resposta: "Confirmar a história, avaliar estado materno e fetal, realizar exame apropriado e utilizar testes para líquido amniótico conforme disponibilidade. A ultrassonografia complementa a avaliação de idade gestacional, crescimento, apresentação e líquido, mas não substitui o raciocínio clínico.",
      },
      {
        tipo: "exame_fisico",
        titulo: "Avaliação inicial",
        corpo: "Temperatura 36,8 °C, FC 92 bpm, sem dor uterina. O exame especular demonstra líquido no canal vaginal. Cardiotocografia sem alteração aguda e ultrassom com oligoâmnio.",
        pergunta: "Qual é a classificação e a estratégia geral?",
        resposta: "O quadro é compatível com rotura pré-termo de membranas. Como não há infecção, descolamento, trabalho de parto avançado ou comprometimento fetal, a estratégia geral é manejo expectante hospitalar com medidas para reduzir complicações da prematuridade e vigilância materno-fetal.",
      },
      {
        tipo: "conduta",
        titulo: "Manejo expectante",
        corpo: "A equipe discute corticoide antenatal, antibiótico conforme protocolo, avaliação de estreptococo do grupo B e monitorização clínica e fetal. A paciente pergunta por que não pode simplesmente permanecer em casa sem retorno.",
        pergunta: "Como explicar a necessidade de vigilância?",
        resposta: "Mesmo sem febre na chegada, podem surgir infecção intra-amniótica, descolamento, trabalho de parto ou comprometimento fetal. Por isso, o manejo exige avaliações seriadas e reavaliação da idade gestacional, vitalidade, sinais clínicos e exames conforme protocolo.",
      },
      {
        tipo: "desfecho",
        titulo: "Sinal de interrupção",
        corpo: "Após alguns dias, a gestante apresenta febre, taquicardia, dor uterina e alteração da frequência cardíaca fetal.",
        pergunta: "O que muda?",
        resposta: "O conjunto sugere infecção intra-amniótica e comprometimento fetal. A conduta passa a ser ativa, com tratamento da infecção e resolução da gestação conforme avaliação obstétrica; não se deve insistir no prolongamento expectante até uma idade gestacional fixa.",
      },
    ],
    discussao: "A rotura prematura de membranas não é uma única situação: a idade gestacional, a presença de infecção, descolamento, trabalho de parto e vitalidade fetal definem o caminho. A conduta expectante em cenário estável exige vigilância; sinais de infecção ou deterioração fetal mudam a prioridade para resolução.",
    referencias: [
      "FEBRASGO — Rotura prematura de membranas ovulares, Protocolo nº 18 (2024): https://www.febrasgo.org.br/images/pec/CNE_pdfs/fps2024/Protocolos%20cole%C3%A7%C3%A3o%202024-2025/n18%20-%20O%20-%20Rotura%20prematura%20de%20membranas%20ovulares.pdf",
      "Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf",
    ],
  },
];
