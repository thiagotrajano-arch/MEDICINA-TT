import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_ROTURA_PREMATURA_MEMBRANAS: Record<string, ConteudoSubtema> = {
  "go--rotura-prematura-de-membranas--diagnostico-e-conduta": {
    subtemaId: "go--rotura-prematura-de-membranas--diagnostico-e-conduta",
    titulo: "Rotura prematura de membranas: diagnóstico e conduta",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Definição e diagnóstico", corpo: "Rotura prematura de membranas é a ruptura das membranas antes do início do trabalho de parto. O diagnóstico integra história, exame físico e testes como pH/nitrazina e cristalização; a ultrassonografia complementa a avaliação de líquido, idade gestacional, crescimento, posição e bem-estar fetal." },
      { secao: "Triagem de gravidade", corpo: "Depois de confirmar a rotura, avaliar idade gestacional, infecção intra-amniótica, descolamento de placenta, trabalho de parto, morte fetal e condição fetal. A presença de infecção ou comprometimento fetal muda a conduta independentemente da idade gestacional." },
      { secao: "Manejo expectante", corpo: "Em rotura pré-termo estável, sem infecção, descolamento ou sofrimento fetal, pode-se considerar manejo expectante hospitalar com corticoide, antibiótico conforme protocolo, avaliação de estreptococo do grupo B e monitorização materno-fetal seriada. Os detalhes dependem da idade gestacional e do serviço." },
      { secao: "Quando resolver", corpo: "Infecção intrauterina, descolamento, trabalho de parto avançado, morte fetal ou comprometimento fetal exigem conduta ativa. Ao termo, a decisão geralmente é resolutiva; entre 24 e 34 semanas, o prolongamento só é aceitável enquanto a avaliação permanecer favorável e com vigilância adequada." },
      { secao: "Pontos de prova e segurança", corpo: "- Ultrassom normal não exclui sozinho rotura.\n- Evitar transformar PCR isolado em decisão.\n- Não manter manejo expectante diante de infecção.\n- A idade gestacional organiza a conduta, mas não vence sinais de deterioração.\n- Monitorização materna e fetal é parte do tratamento." },
    ],
    referencias: [
      "FEBRASGO — Rotura prematura de membranas ovulares, Protocolo nº 18 (2024): https://www.febrasgo.org.br/images/pec/CNE_pdfs/fps2024/Protocolos%20cole%C3%A7%C3%A3o%202024-2025/n18%20-%20O%20-%20Rotura%20prematura%20de%20membranas%20ovulares.pdf",
      "Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf",
    ],
  },
};
