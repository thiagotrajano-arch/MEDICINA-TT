import type { ConteudoSubtema } from "@/domain/content/types";

const NG215 = "NICE NG215 — Medicines associated with dependence or withdrawal symptoms";
const CG178 = "NICE CG178 — Psychosis and schizophrenia in adults";
const NG97 = "NICE NG97 — Dementia: assessment, management and support";
const WHO_DEMENCIA = "WHO 2026 — Risk reduction of cognitive decline and dementia";
const CORPUS = "Síntese autoral baseada nos PDFs privados do corpus batch-20260812-psiquiatria (não publicado), após conversão para Markdown; sem reprodução de texto ou imagem comercial.";

export const CONTEUDOS_NEUROPSIQ_RECENTES: Record<string, ConteudoSubtema> = {
  "psiq--psicofarmacologia--antidepressivos-antipsicoticos-e-estabilizadores": {
    subtemaId: "psiq--psicofarmacologia--antidepressivos-antipsicoticos-e-estabilizadores",
    titulo: "Antidepressivos, antipsicóticos e estabilizadores: escolha segura",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Objetivo clínico", corpo: "Escolha psicofarmacológica começa pela síndrome, pelo risco e pela trajetória do paciente — não pelo nome do remédio. Antes de tratar depressão, procure mania/hipomania, substâncias, delirium, causas clínicas, gestação, risco de suicídio e capacidade de seguimento." },
      { secao: "Antidepressivos", corpo: "Explique tempo de resposta, efeitos adversos e plano de revisão. Ativação, redução importante do sono, impulsividade ou piora da ideação suicida exigem contato precoce e reavaliação diagnóstica. Em suspeita de bipolaridade, antidepressivo isolado pode desestabilizar o curso; a decisão deve ser especializada." },
      { secao: "Antipsicóticos", corpo: "Antes e durante o uso, avalie peso/cintura, pressão, metabolismo, sintomas extrapiramidais, acatisia, prolactina quando pertinente, interações e risco de QT. A resposta deve ser acompanhada por função e sintomas, com revisão periódica da necessidade de manutenção.", figura: "psiq-exame-mental-map" },
      { secao: "Estabilizadores", corpo: "A escolha depende do polo predominante, recorrência, função renal/hepática, tireoide, interações, gestação, risco de toxicidade e preferência. Planeje exames e sinais de alerta antes da primeira dose; nunca trate monitorização como detalhe burocrático." },
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} Os materiais de psicofarmacologia e psiquiatria clínica foram usados para organizar mecanismo, indicação, monitorização e armadilhas em blocos curtos, sempre subordinados a diretrizes vigentes.` },
      { secao: "Pérola OMED", corpo: "Uma boa resposta não apenas nomeia a classe: explicita qual risco foi excluído, qual marcador será acompanhado e quando a conduta será reavaliada." },
    ], referencias: [CG178, "NICE NG222 — Depression in adults: treatment and management", "NICE CG185 — Bipolar disorder: assessment and management", CORPUS],
  },
  "psiq--sono-e-hipnosedativos--retirada-de-benzodiazepinicos-e-z-drugs": {
    subtemaId: "psiq--sono-e-hipnosedativos--retirada-de-benzodiazepinicos-e-z-drugs",
    titulo: "Retirada de benzodiazepínicos e Z-drugs",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Dependência não é julgamento", corpo: "Uso prolongado pode produzir dependência física mesmo quando o medicamento foi prescrito corretamente. Diferencie dependência, transtorno por uso, tolerância, recaída da insônia/ansiedade e sintomas de abstinência; a linguagem não estigmatizante melhora a segurança." },
      { secao: "Antes de reduzir", corpo: "Confirme fármaco, dose, duração, formulação, outros sedativos/álcool, comorbidades, quedas, epilepsia, gestação, função renal/hepática e histórico de retirada. Combine objetivo, ritmo flexível, sintomas esperados, sinais de alerta e canal de contato." },
      { secao: "Taper compartilhado", corpo: "A NICE recomenda redução gradual e em etapas, ajustada à resposta, com pausas ou passos menores quando necessário. Evite suspensão abrupta e não substitua automaticamente por outro medicamento associado à dependência. Trate a causa de base e ofereça medidas não farmacológicas para sono e ansiedade." },
      { secao: "Abstinência versus recaída", corpo: "Insônia, ansiedade, irritabilidade e sintomas autonômicos podem ocorrer após redução; sua relação temporal e flutuação ajudam a diferenciar abstinência de retorno da síndrome original. Confusão intensa, convulsão, delirium, instabilidade ou uso combinado de depressores exigem urgência." , figura: "psiq-hipnosedativos-seguranca-map"},
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} Os guias privados de hipnosedativos e psicofarmacologia foram sintetizados para enfatizar fluxo de retirada, segurança e revisão do diagnóstico, sem publicar páginas ou imagens comerciais.` },
      { secao: "Pérola OMED", corpo: "A conduta correta raramente é “parar hoje”: é construir uma retirada monitorada, reversível e proporcional ao risco." },
    ], referencias: [NG215, "NICE CG113 — Generalised anxiety disorder and panic disorder", CORPUS],
  },
  "psiq--transtornos-por-uso-de-substancias--intoxicacao-e-abstinencia": {
    subtemaId: "psiq--transtornos-por-uso-de-substancias--intoxicacao-e-abstinencia",
    titulo: "Intoxicação e abstinência: abordagem sindrômica",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Primeiro minuto", corpo: "Alteração do comportamento é uma emergência clínica até prova em contrário. Faça ABCDE, glicemia, temperatura, oximetria, avaliação de trauma e acesso a informação de acompanhante; procure toxíndrome em vez de adivinhar uma substância única." },
      { secao: "Intoxicação versus abstinência", corpo: "A intoxicação tende a refletir o efeito direto; a abstinência é a reação à redução/cessação após adaptação. Cronologia, sinais autonômicos, pupilas, pele, nível de consciência, convulsão e exposição a múltiplas substâncias orientam a hipótese." },
      { secao: "Risco imediato", corpo: "Depressão respiratória, hipoglicemia, hipertermia, convulsão, delirium, agitação perigosa e trauma mudam a prioridade. Mantenha vigilância para coingestão de álcool, benzodiazepínicos, opioides e outros depressores." },
      { secao: "Plano", corpo: "Estabilize, trate a síndrome comprovada, observe a evolução e ofereça encaminhamento para cuidado longitudinal. Não use sedação ou contenção como substitutos de diagnóstico, monitorização e ambiente seguro." },
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} Os PDFs de psiquiatria clínica e hipnosedativos foram usados para separar toxíndromes, retirada e segurança, enquanto a síntese pública permanece curta e baseada em decisão clínica.` },
    ], referencias: [NG215, "NICE CG115 — Alcohol-use disorders: diagnosis and management", CORPUS],
  },
  "psiq--transtornos-por-uso-de-substancias--alcool-e-sedativos-abordagem-clinica": {
    subtemaId: "psiq--transtornos-por-uso-de-substancias--alcool-e-sedativos-abordagem-clinica",
    titulo: "Álcool e sedativos: abordagem clínica segura",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Rastreio que muda conduta", corpo: "Pergunte quantidade, frequência, último uso, perdas funcionais, abstinência prévia, convulsões/delirium, uso de sedativos, opioides e suporte domiciliar. A história do cuidador e os registros de dispensação podem revelar risco que o paciente não consegue estimar." },
      { secao: "Abstinência alcoólica", corpo: "Tremor, sudorese, taquicardia, ansiedade, náuseas, alucinações, convulsões e delirium podem compor espectros diferentes. A piora da atenção e da consciência, instabilidade autonômica ou convulsão exige ambiente monitorado e tratamento protocolar, não acompanhamento casual." },
      { secao: "Combinação perigosa", corpo: "Álcool e benzodiazepínicos somam depressão do sistema nervoso central e risco de queda, aspiração e insuficiência respiratória. Não prescreva sedativo sem revisar álcool, outros depressores, direção, trabalho de risco e acesso a supervisão." },
      { secao: "Continuidade", corpo: "Após estabilizar, combine redução de danos, tratamento da dependência, saúde mental, sono, suporte social e plano para recaída. A meta é segurança e continuidade, não apenas uma escala menor no dia da consulta." },
    ], referencias: [NG215, "NICE CG115 — Alcohol-use disorders", CORPUS],
  },
  "neuro--neuroanatomia-clinica--vias-motoras-sensitivas-e-sindromes-cruzadas": {
    subtemaId: "neuro--neuroanatomia-clinica--vias-motoras-sensitivas-e-sindromes-cruzadas",
    titulo: "Vias motoras, sensitivas e síndromes cruzadas",
    atualizadoEm: "2026-08-16", origem: "edicao_manual",
    blocos: [
      { secao: "Localize antes de nomear", corpo: "Defina se o déficit é cortical, subcortical, tronco encefálico, medular, radicular, plexual, nervoso periférico, junção neuromuscular ou músculo. Lateralidade, padrão, nível sensitivo e reflexos valem mais do que um sintoma isolado." },
      { secao: "Via motora", corpo: "Lesão do neurônio motor superior tende a combinar fraqueza em padrão piramidal, hiperreflexia e sinal de liberação após a fase aguda; lesão do neurônio motor inferior produz fraqueza segmentar, atrofia, fasciculações e hiporreflexia. Sempre considere tempo de evolução." },
      { secao: "Sensibilidade", corpo: "Colunas dorsais carregam vibração e propriocepção; sistema anterolateral conduz dor e temperatura. Uma dissociação, um nível sensitivo ou uma distribuição em dermátomo pode estreitar a localização e a urgência da investigação." },
      { secao: "Síndromes cruzadas", corpo: "Déficit de nervo craniano ipsilateral com déficit corporal contralateral sugere tronco encefálico. A combinação precisa ser coerente com o nível anatômico; não force uma síndrome quando a semiologia não fecha." },
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} O atlas privado de neuroanatomia clínica orientou a organização dos circuitos e das relações anatômicas; o site publica apenas síntese autoral e usa o mapa de localização existente como apoio visual.`, figura: "neuro-localizacao-clinica-map" },
      { secao: "Pérola OMED", corpo: "“Fraqueza” é o começo da pergunta. O ponto de prova é justificar onde a lesão está e qual achado a confirma." },
    ], referencias: ["Neuroanatomia clínica visual e funcional — síntese autoral a partir do corpus privado", "NICE NG128 — Stroke and transient ischaemic attack in over 16s", CORPUS],
  },
  "neuro--amnesias-e-sindromes-demenciais--delirium-versus-demencia": {
    subtemaId: "neuro--amnesias-e-sindromes-demenciais--delirium-versus-demencia",
    titulo: "Delirium versus demência",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Diferença nuclear", corpo: "Delirium tem início agudo/subagudo, atenção prejudicada e curso flutuante; demência costuma ser insidiosa e progressiva, com consciência relativamente preservada no início. Podem coexistir, e a demência aumenta o risco de delirium." },
      { secao: "Busca de precipitantes", corpo: "Procure infecção, dor, retenção urinária, constipação, hipoxemia, desidratação, distúrbios metabólicos, abstinência, ambiente, privação de sono e fármacos anticolinérgicos ou sedativos. Revise prescrição antes de ampliar exames indiscriminadamente." },
      { secao: "Conduta", corpo: "Corrija causas, ofereça orientação, óculos/aparelho auditivo, hidratação, mobilidade, sono e presença familiar. Evite contenção e antipsicótico de rotina; se houver risco grave, a decisão deve ser excepcional, documentada e reavaliada." },
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} Os guias de síndromes demenciais foram condensados em um contraste de reconhecimento, causas reversíveis e segurança. Um paciente com desatenção aguda não deve ser encaminhado diretamente a um “diagnóstico de demência”.`, figura: "neuro-demencias-algoritmo-map" },
      { secao: "Pérola OMED", corpo: "A pergunta inicial não é “qual demência?”. É “o que mudou agora, e qual causa reversível ameaça o paciente?”." },
    ], referencias: [NG97, "NICE CG103 — Delirium: prevention, diagnosis and management", CORPUS],
  },
  "neuro--amnesias-e-sindromes-demenciais--fenotipos-demenciais-e-tratamento": {
    subtemaId: "neuro--amnesias-e-sindromes-demenciais--fenotipos-demenciais-e-tratamento",
    titulo: "Fenótipos demenciais e tratamento",
    atualizadoEm: "2026-08-16", origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Fenótipo antes do rótulo", corpo: "Alzheimer costuma iniciar com síndrome amnéstica; demência com corpos de Lewy combina flutuação, alucinações visuais recorrentes, parkinsonismo e sensibilidade a neurolépticos; frontotemporal começa por comportamento ou linguagem; vascular pode ter curso escalonado e disfunção executiva. Há sobreposição: use história, exame e evolução." },
      { secao: "Avaliação", corpo: "Documente informante, funcionalidade, cognição, humor, sono, marcha, medicamentos, audição/visão e fatores vasculares. Exames devem responder a hipóteses e excluir causas tratáveis; uma imagem isolada não determina o fenótipo." },
      { secao: "Tratamento e suporte", corpo: "A NICE recomenda inibidores de acetilcolinesterase para doença de Alzheimer leve a moderada e memantina em situações definidas de doença moderada/grave ou intolerância/contraindicação, com decisão especializada. Intervenções cognitivas, atividade, segurança domiciliar e apoio ao cuidador são parte do tratamento." },
      { secao: "Prevenção de risco", corpo: "A atualização da OMS reforça atividade física, controle de fatores cardiovasculares, cessação do tabaco, redução de álcool e cuidado auditivo. Suplementos vitamínicos não devem ser usados rotineiramente para prevenir declínio na ausência de deficiência documentada." },
      { secao: "Conteúdo recente aplicado", corpo: `${CORPUS} O guia privado de demências foi usado para organizar fenótipos, diferenciais, manejo e orientação ao cuidador, enquanto a síntese pública mantém referências abertas e linguagem própria.` },
      { secao: "Pérola OMED", corpo: "Fenótipo orienta hipótese; funcionalidade e segurança orientam a prioridade clínica." },
    ], referencias: [NG97, WHO_DEMENCIA, "NICE NG108 — Parkinson’s disease in adults", CORPUS],
  },
};
