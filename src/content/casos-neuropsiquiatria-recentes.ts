import type { CasoClinico } from "@/domain/content/types";

export const CASOS_NEUROPSIQ_RECENTES: CasoClinico[] = [
  {
    id: "caso-psiq-recente-hipnosedativo-01", disciplinaId: "psiq", subtemaId: "psiq--sono-e-hipnosedativos--retirada-de-benzodiazepinicos-e-z-drugs", titulo: "Insônia após retirada rápida de benzodiazepínico", resumo: "Uso prolongado, redução abrupta e sintomas que podem ser abstinência ou recaída.", dificuldade: "intermediaria", tags: ["benzodiazepinico", "abstinencia", "sono"],
    etapas: [
      { tipo: "historia", titulo: "Linha do tempo", corpo: "Mulher de 44 anos usa benzodiazepínico noturno há 18 meses. Reduziu a dose pela metade por conta própria há cinco dias e passou a ter insônia, ansiedade, tremor leve e medo de “perder o controle”.", pergunta: "Qual informação você precisa antes de decidir a próxima redução?", resposta: "Confirme dose/formulação, último uso, outros sedativos e álcool, epilepsia, gestação, quedas, comorbidades, objetivo da retirada e sinais de gravidade. A cronologia é compatível com abstinência, mas recaída e outras causas também precisam ser avaliadas." },
      { tipo: "conduta", titulo: "Plano compartilhado", corpo: "Não há delirium, convulsão ou instabilidade. A paciente aceita acompanhamento semanal.", pergunta: "Qual é a estratégia mais segura?", resposta: "Retirada gradual e ajustável, com pausas ou passos menores se necessário, medidas não farmacológicas para sono/ansiedade e plano de contato para piora. Evite suspensão abrupta ou troca automática por outro medicamento dependente." },
    ],
    discussao: "O caso treina a diferença entre dependência física, abstinência e recaída. A resposta deve ser proporcional ao risco e construída com a pessoa, conforme NICE NG215.", referencias: ["NICE NG215 — Medicines associated with dependence or withdrawal symptoms", "Síntese autoral dos PDFs privados de hipnosedativos e psicofarmacologia — corpus batch-20260812-psiquiatria"],
  },
  {
    id: "caso-psiq-recente-alcool-01", disciplinaId: "psiq", subtemaId: "psiq--transtornos-por-uso-de-substancias--alcool-e-sedativos-abordagem-clinica", titulo: "Abstinência alcoólica com alteração da consciência", resumo: "Tremor, hiperatividade autonômica e confusão após interrupção do álcool.", dificuldade: "avancada", tags: ["alcool", "abstinencia", "delirium"],
    etapas: [
      { tipo: "historia", titulo: "Apresentação", corpo: "Homem de 52 anos, consumo diário de álcool, está há 48 horas sem beber. Apresenta tremor intenso, sudorese, taquicardia, alucinações visuais e desorientação. A família relata queda ontem.", pergunta: "Qual é a prioridade imediata?", resposta: "Tratar como abstinência grave/delirium até prova em contrário, com ABCDE, glicemia, temperatura, investigação de trauma e ambiente monitorado. Não é quadro para consulta de rotina." },
      { tipo: "conduta", titulo: "Depois da estabilização", corpo: "Após estabilização clínica e melhora da atenção, o paciente aceita ajuda.", pergunta: "O que evita uma alta fragmentada?", resposta: "Plano longitudinal para dependência, redução de danos, saúde mental, suporte social, prevenção de recaída e retorno definido. A fase aguda é o início do cuidado, não seu encerramento." },
    ],
    discussao: "Confusão e hiperatividade autonômica após cessação do álcool exigem urgência. A cronologia, o risco de convulsão/delirium e o uso concomitante de sedativos orientam a segurança.", referencias: ["NICE CG115 — Alcohol-use disorders: diagnosis and management", "NICE NG215 — Medicines associated with dependence or withdrawal symptoms"],
  },
  {
    id: "caso-neuro-recente-delirium-01", disciplinaId: "neuro", subtemaId: "neuro--amnesias-e-sindromes-demenciais--delirium-versus-demencia", titulo: "Confusão aguda em pessoa com demência", resumo: "Declínio cognitivo prévio não explica sozinho uma piora flutuante e desatenta.", dificuldade: "intermediaria", tags: ["delirium", "demencia", "idoso"],
    etapas: [
      { tipo: "historia", titulo: "Mudança aguda", corpo: "Idoso com demência leve, estável há meses, passa a alternar sonolência e agitação em 24 horas. Está desatento, com febre baixa e nova retenção urinária. A família pede “um remédio para acalmar”.", pergunta: "Qual síndrome deve ser reconhecida primeiro?", resposta: "Delirium sobreposto à demência. O início agudo, a desatenção e a flutuação exigem busca de precipitantes, sem atribuir tudo à demência de base." },
      { tipo: "conduta", titulo: "Ambiente e medicamentos", corpo: "A equipe revisa prescrição e encontra anticolinérgico recente; não há agressividade persistente após aliviar a retenção.", pergunta: "Qual intervenção é prioritária?", resposta: "Corrigir a causa, retirar o fator precipitante quando possível, orientar, hidratar, favorecer sono/mobilidade e usar apoio familiar. Antipsicótico não é automático; se considerado por risco grave, deve ser excepcional e reavaliado." },
    ],
    discussao: "Delirium é uma emergência de diagnóstico e contexto, frequentemente reversível. A demência aumenta vulnerabilidade, mas não transforma uma alteração aguda em progressão inevitável.", referencias: ["NICE CG103 — Delirium: prevention, diagnosis and management", "NICE NG97 — Dementia: assessment, management and support"],
  },
  {
    id: "caso-neuro-recente-demencia-01", disciplinaId: "neuro", subtemaId: "neuro--amnesias-e-sindromes-demenciais--fenotipos-demenciais-e-tratamento", titulo: "Fenótipo demencial e decisão compartilhada", resumo: "Flutuação, alucinações visuais e parkinsonismo direcionam a hipótese, mas não dispensam avaliação funcional.", dificuldade: "avancada", tags: ["corpos-de-lewy", "demencia", "cuidador"],
    etapas: [
      { tipo: "historia", titulo: "Padrão clínico", corpo: "Homem de 71 anos apresenta dois anos de flutuação cognitiva, alucinações visuais formadas e parkinsonismo. A família relata quedas e piora importante após uma dose de antipsicótico prescrita fora do serviço.", pergunta: "Qual hipótese e risco devem ser priorizados?", resposta: "Demência com corpos de Lewy é uma hipótese forte; sensibilidade a neurolépticos e risco de quedas precisam ser explicitamente avaliados. Não conclua pelo achado isolado de imagem." },
      { tipo: "conduta", titulo: "Próximo passo", corpo: "O cuidador pergunta se há tratamento e como proteger a casa.", pergunta: "Como responder?", resposta: "Complete história, cognição, funcionalidade, marcha, medicamentos, sono, audição/visão e suporte. Discuta opções especializadas, intervenções cognitivas e segurança domiciliar; a escolha farmacológica deve considerar fenótipo, tolerância, comorbidades e risco de efeitos adversos." },
    ],
    discussao: "O fenótipo organiza a hipótese e alerta para danos, mas funcionalidade, segurança e preferências orientam o plano. A abordagem segue NICE NG97 e prevenção de risco da OMS.", referencias: ["NICE NG97 — Dementia: assessment, management and support", "WHO 2026 — Risk reduction of cognitive decline and dementia", "Síntese autoral do guia privado de síndromes demenciais — corpus batch-20260812-psiquiatria"],
  },
];
