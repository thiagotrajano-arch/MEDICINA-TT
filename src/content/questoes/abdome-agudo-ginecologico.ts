import type { Questao } from "@/domain/content/types";

const SUBTEMA = "go--urgencias-ginecologicas--abdome-agudo";
const FONTE =
  "FEBRASGO — Protocolo nº 28: Abdome agudo em ginecologia: https://www.febrasgo.org.br/images/pec/Protocolos-assistenciais/n28---G---Abdome-agudo-em-ginecologia-2020.pdf (acesso em 2026-08-22); Ministério da Saúde — Gestação de alto risco: https://bvsms.saude.gov.br/bvs/publicacoes/gestacao_alto_risco.pdf";

export const QUESTOES_ABDOMEN_AGUDO_GINECOLOGICO: Questao[] = [
  {
    id: "go-abdome-agudo-001",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Mulher em idade reprodutiva chega ao pronto atendimento com dor pélvica aguda. Qual exame laboratorial deve integrar a avaliação inicial mesmo que ela negue possibilidade de gravidez?",
    alternativas: [
      { letra: "A", texto: "Teste de gravidez com hCG, integrado à história, exame físico e aos exames dirigidos pelo quadro.", correta: true, comentario: "Correta. O protocolo da FEBRASGO recomenda hCG em mulheres em idade reprodutiva com dor abdominal aguda, pois gravidez ectópica pode se apresentar de forma inespecífica." },
      { letra: "B", texto: "Apenas amilase, pois causas ginecológicas não produzem dor abdominal aguda.", correta: false, comentario: "A dor pélvica aguda tem amplo diagnóstico diferencial ginecológico, urinário, gastrointestinal e sistêmico." },
      { letra: "C", texto: "Nenhum exame, pois a história negativa exclui gravidez ectópica.", correta: false, comentario: "A história isolada não exclui gestação; a avaliação deve ser objetiva e direcionada." },
      { letra: "D", texto: "Somente marcador tumoral ovariano, antes de qualquer exame de gravidez.", correta: false, comentario: "Marcador tumoral não substitui a avaliação inicial de emergência nem o teste de gravidez." },
    ],
    dificuldade: "fixacao",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["abdome agudo ginecológico", "dor pélvica", "hCG", "gravidez ectópica"],
  },
  {
    id: "go-abdome-agudo-002",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Gestante de localização ainda não definida apresenta dor pélvica intensa, tontura, taquicardia, hipotensão e líquido livre na ultrassonografia. Qual é a prioridade?",
    alternativas: [
      { letra: "A", texto: "Reconhecer possível hemoperitônio por gravidez ectópica rota, iniciar estabilização e acionar avaliação cirúrgica urgente.", correta: true, comentario: "Correta. Instabilidade hemodinâmica e líquido livre em paciente com suspeita de ectópica exigem resposta imediata; não se deve aguardar a evolução do hCG." },
      { letra: "B", texto: "Aguardar duplicação do hCG em 48 horas antes de qualquer conduta.", correta: false, comentario: "A espera é insegura em paciente instável e pode atrasar controle de hemorragia." },
      { letra: "C", texto: "Prescrever analgésico e dar alta porque líquido livre é sempre fisiológico.", correta: false, comentario: "Líquido livre deve ser interpretado com clínica e pode representar hemoperitônio; alta não é segura nesse cenário." },
      { letra: "D", texto: "Solicitar apenas tomografia ambulatorial, sem ressuscitação ou avaliação especializada.", correta: false, comentario: "A prioridade é estabilização e controle da emergência, com exames complementares sem atrasar a conduta." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["gravidez ectópica rota", "hemoperitônio", "instabilidade hemodinâmica"],
  },
  {
    id: "go-abdome-agudo-003",
    subtemaId: SUBTEMA,
    disciplinaId: "go",
    enunciado: "Mulher com dor unilateral súbita, náuseas, vômitos e massa anexial dolorosa apresenta ovário aumentado e líquido livre na ultrassonografia. Qual interpretação é mais adequada?",
    alternativas: [
      { letra: "A", texto: "Torção anexial é uma hipótese importante e requer avaliação ginecológica urgente, pois se trata de emergência cirúrgica.", correta: true, comentario: "Correta. A combinação clínica é típica de alerta para torção anexial; a ultrassonografia auxilia, mas a decisão é clínica e cirúrgica." },
      { letra: "B", texto: "A hipótese está excluída se ainda houver algum fluxo ao Doppler.", correta: false, comentario: "Fluxo ao Doppler não deve ser usado isoladamente para excluir torção; a avaliação clínica e especializada permanece necessária." },
      { letra: "C", texto: "A conduta é observar por uma semana antes de discutir cirurgia.", correta: false, comentario: "O atraso pode comprometer o anexo; o protocolo classifica torção como emergência cirúrgica." },
      { letra: "D", texto: "A presença de náuseas torna a hipótese exclusivamente gastrointestinal.", correta: false, comentario: "Náuseas e vômitos são compatíveis com torção e não excluem causa ginecológica." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["torção anexial", "massa ovariana", "Doppler", "emergência cirúrgica"],
  },
];
