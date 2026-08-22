import type { Questao } from "@/domain/content/types";

const SUBTEMA = "go--rotura-prematura-de-membranas--diagnostico-e-conduta";
const FONTE =
  "FEBRASGO — Rotura prematura de membranas ovulares, Protocolo nº 18 (2024): https://www.febrasgo.org.br/images/pec/CNE_pdfs/fps2024/Protocolos%20cole%C3%A7%C3%A3o%202024-2025/n18%20-%20O%20-%20Rotura%20prematura%20de%20membranas%20ovulares.pdf (acesso em 2026-08-22); Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf";

export const QUESTOES_ROTURA_PREMATURA_MEMBRANAS: Questao[] = [
  {
    id: "go-rpm-001",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Gestante relata saída contínua de líquido pela vagina antes do início das contrações. Qual conjunto integra a confirmação diagnóstica da rotura prematura de membranas?",
    alternativas: [
      { letra: "A", texto: "História clínica, exame físico com avaliação apropriada e testes como pH/nitrazina ou cristalização, usando ultrassonografia como complemento.", correta: true, comentario: "Correta. O protocolo FEBRASGO descreve diagnóstico baseado em história, exame físico e testes laboratoriais; a ultrassonografia auxilia na avaliação." },
      { letra: "B", texto: "Apenas ultrassonografia com índice de líquido amniótico normal exclui rotura.", correta: false, comentario: "Ultrassonografia é complementar e um índice normal não deve, isoladamente, excluir rotura." },
      { letra: "C", texto: "Somente toque vaginal digital repetido até observar líquido no colo.", correta: false, comentario: "A investigação deve ser dirigida e o toque digital repetido pode aumentar risco infeccioso; não é o teste confirmatório principal." },
      { letra: "D", texto: "Dosagem sérica de beta-hCG, pois toda saída de líquido na gestação é gravidez ectópica.", correta: false, comentario: "Beta-hCG não confirma rotura de membranas e a hipótese depende da idade gestacional e da apresentação clínica." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["rotura prematura de membranas", "nitrazina", "cristalização", "diagnóstico"],
  },
  {
    id: "go-rpm-002",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Gestante de 29 semanas com rotura pré-termo apresenta febre, dor uterina, taquicardia materna e alteração do bem-estar fetal. Qual princípio deve orientar a conduta?",
    alternativas: [
      { letra: "A", texto: "Suspeitar de infecção intra-amniótica e adotar conduta ativa, independentemente de tentar prolongar a gestação.", correta: true, comentario: "Correta. Infecção intrauterina é indicação de conduta ativa imediata; não se deve manter manejo expectante diante de deterioração infecciosa." },
      { letra: "B", texto: "Manter conduta expectante obrigatória até 34 semanas, mesmo com sinais de infecção.", correta: false, comentario: "Sinais de infecção mudam a prioridade e contraindicam insistir em prolongamento automático." },
      { letra: "C", texto: "Aguardar apenas o resultado de PCR isolado antes de iniciar qualquer conduta.", correta: false, comentario: "A decisão deve integrar clínica, exames e vitalidade fetal; não pode depender de um marcador isolado." },
      { letra: "D", texto: "Indicar alta domiciliar porque a prematuridade é o único risco relevante.", correta: false, comentario: "Infecção e comprometimento fetal são riscos imediatos que exigem avaliação hospitalar e conduta ativa." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["rotura pré-termo", "corioamnionite", "infecção intra-amniótica", "vitalidade fetal"],
  },
  {
    id: "go-rpm-003",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Gestante com rotura pré-termo confirmada está estável, sem infecção, sem descolamento, com feto vivo e 29 semanas. Qual estratégia geral é compatível com os protocolos?",
    alternativas: [
      { letra: "A", texto: "Manejo expectante hospitalar com corticoide, antibiótico conforme protocolo, monitorização materno-fetal e reavaliações seriadas.", correta: true, comentario: "Correta. Em cenário estável e pré-termo, o manejo expectante exige internação/monitorização e medidas para reduzir riscos da prematuridade e infecção." },
      { letra: "B", texto: "Alta imediata sem retorno porque a ausência de febre elimina risco de infecção.", correta: false, comentario: "Ausência inicial de febre não elimina risco; o acompanhamento seriado é parte da segurança." },
      { letra: "C", texto: "Parto imediato em qualquer idade gestacional, sem avaliar infecção ou condição fetal.", correta: false, comentario: "A conduta depende da idade gestacional, infecção, descolamento, trabalho de parto e vitalidade fetal." },
      { letra: "D", texto: "Repouso absoluto como único tratamento, sem corticoide, antibiótico ou monitorização.", correta: false, comentario: "Repouso isolado não constitui manejo completo; medidas e monitorização dependem do protocolo e do contexto." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["rotura pré-termo", "conduta expectante", "corticoide antenatal", "monitorização"],
  },
];
