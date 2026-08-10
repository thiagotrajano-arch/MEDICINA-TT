import type { ConteudoSubtema } from "@/domain/content/types";

const NICE_DEPRESSAO = "NICE NG222 — Depression in adults: treatment and management";
const NICE_BIPOLAR = "NICE CG185 — Bipolar disorder: assessment and management";
const NICE_PSICOSE = "NICE CG178 — Psychosis and schizophrenia in adults";
const NICE_AUTODANO = "NICE NG225 — Self-harm: assessment, management and preventing recurrence";

export const CONTEUDOS_PSIQ: Record<string, ConteudoSubtema> = {
  "psiq--entrevista-e-psicopatologia--anamnese-e-exame-do-estado-mental": {
    subtemaId: "psiq--entrevista-e-psicopatologia--anamnese-e-exame-do-estado-mental",
    titulo: "Anamnese psiquiátrica e exame do estado mental",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Objetivo clínico", corpo: "A entrevista psiquiátrica não é uma lista de sintomas: ela reconstrói **linha do tempo, sofrimento, funcionamento, contexto, substâncias, doenças clínicas e segurança**. O exame do estado mental (EEM) descreve o que é observado naquele encontro; a história explica duração, mudança e impacto." },
      { secao: "Roteiro em três camadas", corpo: "1. **Queixa e cronologia:** início, curso, gatilhos, episódios prévios e retorno ao basal.\n2. **Síndromes e diferenciais:** humor, ansiedade, psicose, cognição, sono, uso de substâncias e causas orgânicas.\n3. **Função e segurança:** autocuidado, estudo/trabalho, relações, capacidade, vulnerabilidades, autoagressão, violência e rede de apoio." },
      { secao: "Mapa do exame do estado mental", corpo: "Descreva cada domínio com linguagem observável. Evite rótulos vagos como “estranho” ou “confuso”; registre o fenômeno: latência aumentada, fuga de ideias, afeto incongruente, alucinação auditiva, desatenção flutuante.", figura: "psiq-exame-mental-map" },
      { secao: "Perguntas que mudam conduta", corpo: "- Houve período de energia/atividade anormalmente aumentada, menor necessidade de sono ou desinibição?\n- O sintoma surgiu junto de febre, intoxicação, abstinência, trauma, crise convulsiva ou mudança de medicamento?\n- Há plano, intenção, acesso a meios, agitação, comando alucinatório ou incapacidade de manter segurança?\n- Quem observa o paciente no cotidiano e consegue descrever perda funcional?" },
      { secao: "Sinais de causa orgânica", corpo: "Início abrupto, flutuação, desatenção, alteração de consciência, déficit focal, nova crise convulsiva, cefaleia atípica, febre, idade incomum de início, sinais autonômicos marcantes ou relação temporal com fármaco/substância exigem investigação clínica dirigida. Exame complementar não substitui hipótese: é escolhido para responder à pergunta clínica." },
      { secao: "Fechamento útil", corpo: "Finalize com uma formulação curta: **síndrome provável + diferenciais prioritários + fatores precipitantes/perpetuadores/protetores + risco atual + próximo passo**. Registre o que é fato, o que é relato e o que é inferência." },
      { secao: "Treino da semana", corpo: "Faça um EEM de 90 segundos após cada vinheta. Em seguida, escreva uma única frase de formulação e uma pergunta de segurança que ainda falta. Isso treina observação, síntese e decisão — não mera memorização de critérios." },
    ],
    referencias: [NICE_DEPRESSAO, NICE_BIPOLAR, NICE_PSICOSE, NICE_AUTODANO],
  },

  "psiq--transtornos-do-humor--depressao-e-avaliacao-de-seguranca": {
    subtemaId: "psiq--transtornos-do-humor--depressao-e-avaliacao-de-seguranca",
    titulo: "Depressão e avaliação de segurança",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Reconhecimento", corpo: "Depressão é uma síndrome de humor deprimido e/ou perda de interesse acompanhada por sintomas cognitivos, somáticos e funcionais. A gravidade não é a simples contagem de itens: considere duração, intensidade, prejuízo, comorbidades, psicose, catatonia, risco e capacidade de autocuidado." },
      { secao: "Antes de chamar de unipolar", corpo: "Investigue episódios prévios de ativação, menor necessidade de sono, aumento de atividade, fala acelerada, impulsividade e desinibição. História familiar, início precoce, recorrência e ativação com antidepressivo aumentam a suspeita de bipolaridade. Questionário isolado não confirma nem exclui o diagnóstico." },
      { secao: "Diferenciais prioritários", corpo: "Luto e reação adaptativa, transtorno bipolar, uso/abstinência de substâncias, hipotireoidismo, anemia, deficiência de B12, apneia do sono, dor crônica, demência, delirium e efeitos de medicamentos. Peça exames segundo história e exame, não como painel automático." },
      { secao: "Avaliação de segurança", corpo: "Perguntar sobre morte e suicídio não induz comportamento. Explore ideação, intenção, plano, preparação, acesso a meios, tentativas prévias, desesperança, agitação, intoxicação, psicose, impulsividade, proteção e possibilidade real de supervisão. Não reduza a decisão a “baixo/médio/alto risco” calculado por escala.", figura: "psiq-exame-mental-map" },
      { secao: "Conduta em camadas", corpo: "Decisão compartilhada e acompanhamento proporcional à necessidade. Intervenções psicológicas estruturadas, exercício/rotina e tratamento de comorbidades podem ser combinados com farmacoterapia quando indicada. Depressão grave, psicótica, catatônica, com risco imediato ou incapacidade de autocuidado exige avaliação especializada urgente." },
      { secao: "Acompanhamento", corpo: "Defina um alvo mensurável de função e sintomas, efeitos adversos esperados, data de revisão e plano para piora. Na fase inicial, monitore adesão, ativação, agitação, sono e mudança de ideação suicida. Melhora parcial pede revisão de diagnóstico, dose/duração, adesão e fatores perpetuadores." },
      { secao: "Ponto de prova", corpo: "Em uma vinheta de depressão, a pergunta que muda tudo é: **há história de hipomania/mania ou risco atual que exige outra rota?** Tratar a lista de sintomas sem responder isso é o erro clássico." },
    ],
    referencias: [NICE_DEPRESSAO, NICE_BIPOLAR, NICE_AUTODANO, "Ministério da Saúde — Prevenção do suicídio"],
  },

  "psiq--transtornos-do-humor--transtorno-bipolar": {
    subtemaId: "psiq--transtornos-do-humor--transtorno-bipolar",
    titulo: "Transtorno bipolar: reconhecer o polo e proteger a trajetória",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Conceito operacional", corpo: "O diagnóstico depende de episódio de mania ou hipomania bem caracterizado, não de “mudança de humor”. Procure mudança inequívoca do basal com energia/atividade aumentada, menor necessidade de sono, pressão de fala, aceleração do pensamento, grandiosidade e condutas de risco." },
      { secao: "Mania × hipomania", corpo: "Mania causa prejuízo importante, pode exigir hospitalização ou cursar com psicose. Hipomania é observável e representa mudança do funcionamento, mas sem prejuízo grave/hospitalização/psicose. Psicose durante elevação do humor classifica o episódio como mania." },
      { secao: "Na depressão", corpo: "Em todo adulto com depressão, pergunte por períodos de pelo menos quatro dias de hiperatividade ou desinibição. Isso não fecha o diagnóstico sozinho, mas indica avaliação especializada. Não use instrumento de rastreio como diagnóstico definitivo." },
      { secao: "Risco ampliado", corpo: "Avalie autoagressão, suicídio, exploração, gastos, sexo de risco, direção, conflito, violência, negligência de dependentes e dano reputacional. Envolver pessoa de confiança pode ser decisivo quando há perda de crítica, respeitando segurança e contexto." },
      { secao: "Conduta", corpo: "Mania/hipomania suspeita pede retirada de estimulantes precipitantes, revisão de antidepressivos e cuidado especializado. Tratamento de fase aguda e manutenção deve considerar episódios prévios, resposta, efeitos metabólicos, gestação, função renal/hepática, interações e preferência. Antidepressivo isolado em bipolaridade pode desestabilizar o curso." },
      { secao: "Monitorização longitudinal", corpo: "Mapa de humor/sono, adesão, sinais precoces, efeitos adversos e plano de crise. Peso, pressão e parâmetros metabólicos são fundamentais com fármacos de risco metabólico; função renal/tireoidiana ou hepática depende do estabilizador escolhido." },
      { secao: "Armadilha", corpo: "Irritabilidade isolada, insônia por ansiedade ou impulsividade crônica não equivalem a mania. O núcleo é **mudança episódica de energia/atividade e funcionamento**, com cronologia coerente." },
    ],
    referencias: [NICE_BIPOLAR],
  },

  "psiq--ansiedade-panico-e-toc--diagnostico-e-abordagem": {
    subtemaId: "psiq--ansiedade-panico-e-toc--diagnostico-e-abordagem",
    titulo: "Ansiedade, pânico e TOC: separar fenômeno, síndrome e urgência",
    atualizadoEm: "2026-08-09",
    origem: "complemento_ia",
    blocos: [
      { secao: "Três padrões", corpo: "**Ansiedade generalizada:** preocupação excessiva e difícil de controlar em vários domínios.\n**Pânico:** crises abruptas com pico rápido e medo de recorrência/evitação.\n**TOC:** obsessões intrusivas e/ou compulsões realizadas para reduzir ansiedade, com custo de tempo e função." },
      { secao: "Primeiro exclua perigo", corpo: "Dor torácica, síncope, hipoxemia, arritmia, tireotoxicose, hipoglicemia, intoxicação/abstinência e evento neurológico não devem ser chamados de pânico sem avaliação contextual. O primeiro episódio, apresentação atípica ou sinais objetivos orientam investigação clínica." },
      { secao: "Pergunta discriminativa", corpo: "No TOC, o pensamento costuma ser intrusivo, indesejado e reconhecido como próprio; o paciente tenta neutralizá-lo. Delírio é crença mantida com convicção apesar de evidência contrária. Insight pode variar, portanto avalie forma, função e contexto — não apenas conteúdo." },
      { secao: "Tratamento", corpo: "Psicoeducação e terapia cognitivo-comportamental são centrais. Exposição e prevenção de resposta é específica para TOC. ISRS pode ser indicado conforme síndrome e gravidade; resposta exige tempo e acompanhamento. Benzodiazepínico não corrige o ciclo de evitação e traz risco de tolerância, quedas e dependência." },
      { secao: "Plano funcional", corpo: "Escolha uma situação evitada, uma habilidade regulatória e um passo graduado de exposição. Meça melhora pelo retorno a atividades e redução de rituais/evitação, não apenas pela sensação de ansiedade no momento." },
      { secao: "Ponto de prova", corpo: "A crise de pânico é um fenômeno; transtorno do pânico exige recorrência e mudança comportamental persistente. TOC não é “mania de organização”: requer obsessão/compulsão com sofrimento ou prejuízo." },
    ],
    referencias: ["NICE CG113 — Generalised anxiety disorder and panic disorder in adults", "NICE CG31 — Obsessive-compulsive disorder and body dysmorphic disorder"],
  },

  "psiq--psicoses--primeiro-episodio-psicotico": {
    subtemaId: "psiq--psicoses--primeiro-episodio-psicotico",
    titulo: "Primeiro episódio psicótico: segurança, origem e tratamento precoce",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Síndrome, não etiologia", corpo: "Psicose reúne delírios, alucinações, pensamento/comportamento desorganizado e sintomas negativos. O primeiro encontro deve responder: há emergência? é primária, afetiva, relacionada a substância/medicamento ou secundária a doença clínica/neurológica?" },
      { secao: "Sinais de alarme orgânico", corpo: "Flutuação de consciência/atenção, déficit focal, crise convulsiva, febre, cefaleia nova, sinais autonômicos, catatonia, alteração cognitiva abrupta, idade atípica e relação temporal com substância ou medicamento. Exames são dirigidos por hipótese; TC, RM ou EEG não são pedidos de forma indiscriminada." },
      { secao: "Avaliação imediata", corpo: "Risco de auto/heteroagressão, comando alucinatório, agitação, vulnerabilidade, negligência, intoxicação, capacidade de consentir e suporte disponível. Se houver mania, depressão grave, perigo imediato ou incapacidade de autocuidado, encaminhe para cuidado especializado urgente." },
      { secao: "Rota assistencial", corpo: "Encaminhamento rápido a serviço especializado de primeiro episódio melhora acesso e continuidade. Para estados de risco aumentado, intervenções psicológicas e tratamento de comorbidades são preferidos; antipsicótico não deve ser usado apenas para tentar prevenir psicose sem diagnóstico estabelecido." },
      { secao: "Tratamento e seguimento", corpo: "Antipsicótico é combinado a cuidado psicossocial, psicoeducação, intervenção familiar e metas funcionais. Discuta efeitos adversos e monitore peso, pressão, glicemia/lipídios, efeitos extrapiramidais, prolactina e ECG conforme fármaco e risco. Persistência após dois ensaios adequados pede avaliação de resistência e clozapina em serviço especializado." },
      { secao: "Imagem privada relacionada", corpo: "Na sua biblioteca autenticada, as páginas de TC, RM e EEG foram classificadas neste subtema. Use-as para reconhecer **quando** uma apresentação exige investigação orgânica; não para inferir diagnóstico psiquiátrico por uma imagem isolada." },
      { secao: "Ponto de prova", corpo: "Antes de escolher antipsicótico, procure delirium, intoxicação/abstinência, mania e sinal neurológico. O melhor próximo passo frequentemente é garantir segurança e definir a origem sindrômica." },
    ],
    referencias: [NICE_PSICOSE, NICE_BIPOLAR],
  },

  "psiq--psicofarmacologia--principios-e-monitorizacao": {
    subtemaId: "psiq--psicofarmacologia--principios-e-monitorizacao",
    titulo: "Psicofarmacologia: prescrever com alvo e monitorização",
    atualizadoEm: "2026-08-09",
    origem: "complemento_ia",
    blocos: [
      { secao: "Regra de ouro", corpo: "Cada prescrição precisa de **diagnóstico/hipótese, sintoma-alvo, benefício esperado, risco relevante, prazo para avaliar e plano de continuidade ou retirada**. “Tomar e voltar se piorar” não é monitorização." },
      { secao: "Antes de iniciar", corpo: "Revise bipolaridade, psicose, suicídio, substâncias, gestação, epilepsia, função renal/hepática, QT, peso/metabolismo, interações e tratamentos anteriores. Registre medidas basais que realmente mudam a escolha ou o seguimento." },
      { secao: "Durante o tratamento", corpo: "Avalie adesão, resposta funcional, efeitos adversos, ativação, sedação, sintomas extrapiramidais, peso e parâmetros metabólicos conforme classe. Distinguir falha real de dose/duração inadequadas, baixa adesão, diagnóstico incorreto ou fator perpetuador não tratado." },
      { secao: "Polifarmácia crítica", corpo: "Antes de adicionar um segundo fármaco, pergunte qual problema ele resolve, qual interação cria e como será retirado. Simplificar pode reduzir quedas, prejuízo cognitivo, síndrome metabólica e erros de uso." },
      { secao: "Comunicação", corpo: "Explique latência, efeitos iniciais, sinais de alarme e como procurar ajuda. Decisão compartilhada melhora adesão e permite comparar benefício clínico com ônus do tratamento." },
      { secao: "Material visual privado", corpo: "A tabela de alvos e monitorização do PDF de Psiquiatria foi inserida em Minha mídia neste subtema. Use-a como apoio visual privado; confirme condutas na diretriz específica do diagnóstico e do fármaco." },
    ],
    referencias: [NICE_DEPRESSAO, NICE_BIPOLAR, NICE_PSICOSE],
  },

  "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro": {
    subtemaId: "psiq--sono-e-hipnosedativos--insonia-e-uso-seguro",
    titulo: "Insônia e hipnosedativos: do diagnóstico ao uso seguro",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Defina antes de tratar", corpo: "Caracterize dificuldade para iniciar/manter o sono ou despertar precoce, frequência, duração, oportunidade adequada para dormir e impacto diurno. Diário de sono ajuda a separar insônia de privação voluntária, atraso de fase e rotina irregular." },
      { secao: "Causas que mudam a rota", corpo: "Mania/hipomania, apneia obstrutiva, síndrome das pernas inquietas, dor, refluxo, dispneia, depressão/ansiedade, álcool, cafeína, estimulantes, retirada de sedativos e horários irregulares. Ronco com pausas, sonolência ao dirigir ou menor necessidade de sono sem cansaço são pistas de alto impacto." },
      { secao: "Tratamento de base", corpo: "Terapia cognitivo-comportamental para insônia (TCC-I) é a intervenção central: controle de estímulos, consolidação/restrição de tempo na cama com acompanhamento, reestruturação cognitiva e rotina circadiana. “Higiene do sono” isolada costuma ser insuficiente para insônia crônica." },
      { secao: "Decisão farmacológica", corpo: "Se fármaco for necessário, escolha pelo mecanismo do problema, idade, quedas, cognição, apneia, uso de substâncias, interações e duração planejada. Reavalie cedo; não transforme prescrição temporária em renovação automática.", figura: "psiq-hipnosedativos-seguranca-map" },
      { secao: "Benzodiazepínicos", corpo: "Uso prolongado associa-se a tolerância, dependência física, quedas, prejuízo cognitivo e maior risco com álcool/opioides. Após uso regular prolongado, não interrompa abruptamente: a retirada deve ser gradual, individualizada e supervisionada, ajustada aos sintomas." },
      { secao: "Material visual privado", corpo: "As duas páginas mais úteis do resumo de hipnosedativos foram adicionadas a Minha mídia e ligadas a este subtema: visão comparativa e melatonina/agonistas. Elas complementam, mas não substituem, o raciocínio por causa, risco e objetivo." },
      { secao: "Ponto de prova", corpo: "Insônia + energia aumentada + ausência de cansaço sugere redução da necessidade de sono na mania, não “insônia resistente”. Idoso com quedas e sedação pede revisão de hipnosedativos antes de acrescentar outro." },
    ],
    referencias: ["NICE HTG624 — Sleepio to treat insomnia and insomnia symptoms", "ASAM 2025 — Joint Clinical Practice Guideline on Benzodiazepine Tapering"],
  },

  "psiq--emergencias-psiquiatricas--avaliacao-de-seguranca-e-risco-suicida": {
    subtemaId: "psiq--emergencias-psiquiatricas--avaliacao-de-seguranca-e-risco-suicida",
    titulo: "Avaliação de segurança e risco suicida",
    atualizadoEm: "2026-08-09",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Princípio", corpo: "A avaliação serve para decidir necessidades e segurança, não para prever com certeza quem morrerá. Escalas não devem classificar pessoas em baixo/médio/alto risco nem decidir alta sozinhas." },
      { secao: "O que explorar", corpo: "Ideação atual, intenção, plano, preparação, acesso a meios, tentativa recente/prévia, letalidade percebida, impulsividade, intoxicação, agitação, desesperança, psicose, dor, perdas, isolamento, proteção, ajuda disponível e capacidade de seguir um plano." },
      { secao: "Formulação dinâmica", corpo: "Integre fatores históricos, estado atual, eventos iminentes e recursos. Pergunte o que tornou hoje diferente, o que poderia piorar nas próximas horas/dias e quem pode ajudar de forma concreta." },
      { secao: "Plano de segurança", corpo: "Construa colaborativamente: sinais pessoais de crise; estratégias internas; pessoas/lugares de distração; contatos de ajuda; serviços de urgência; redução de acesso a meios letais; e passo de seguimento. Entregar uma lista genérica de telefones não substitui o plano." },
      { secao: "Urgência", corpo: "Intenção/planejamento iminente, tentativa recente, intoxicação, psicose com comando, agitação grave, incapacidade de autocuidado ou ausência de ambiente seguro exigem intervenção imediata e avaliação presencial apropriada. Não deixe a pessoa sozinha quando há perigo imediato." },
      { secao: "Depois da crise", corpo: "Contato e seguimento precoce, revisão da formulação, tratamento da condição de base e comunicação entre serviços reduzem descontinuidade. O registro deve explicar raciocínio e plano, não apenas um rótulo de risco." },
    ],
    referencias: [NICE_AUTODANO, "Ministério da Saúde — Prevenção do suicídio"],
  },
};

export const CONTEUDOS_NEURO_SEMANA: Record<string, ConteudoSubtema> = {
  "neuro--neuroanatomia-clinica--localizacao-neurologica": {
    subtemaId: "neuro--neuroanatomia-clinica--localizacao-neurologica",
    titulo: "Neuroanatomia clínica: localizar antes de nomear",
    atualizadoEm: "2026-08-09",
    origem: "complemento_ia",
    blocos: [
      { secao: "Método", corpo: "1. Defina início e evolução.\n2. Identifique sistema predominante: motor, sensitivo, coordenação, linguagem, consciência, visão ou nervos cranianos.\n3. Localize o nível anatômico.\n4. Só então escolha etiologias e exames." },
      { secao: "Mapa de localização", corpo: "Sinais positivos valem mais quando formam um padrão. Afasia localiza córtex dominante; déficit de nervo craniano ipsilateral com hemiparesia contralateral sugere tronco; nível sensitivo aponta medula; arreflexia e flacidez apontam unidade motora periférica.", figura: "neuro-localizacao-clinica-map" },
      { secao: "Córtex e subcórtex", corpo: "Córtex: afasia, apraxia, agnosia, negligência, crise focal e defeito campimétrico. Subcórtex: síndrome motora/sensitiva pura, lentificação e disfunção de circuitos sem sinal cortical maior." },
      { secao: "Tronco, cerebelo e medula", corpo: "Tronco combina vias longas com pares cranianos. Cerebelo causa ataxia, dismetria e nistagmo sem fraqueza primária. Medula combina sinal piramidal abaixo da lesão, nível sensitivo e possível disfunção esfincteriana." },
      { secao: "Periférico", corpo: "Raiz segue miótomo/dermátomo e pode causar dor radicular; plexo cruza nervos; mononeuropatia segue um nervo; polineuropatia é comprimento-dependente; junção neuromuscular causa fatigabilidade sem perda sensitiva; músculo costuma produzir fraqueza proximal." },
      { secao: "Imagem com pergunta", corpo: "TC é rápida para hemorragia e emergência; RM detalha parênquima, fossa posterior, medula e vias. A imagem deve testar uma hipótese anatômica. Achado incidental não explica automaticamente o exame clínico." },
      { secao: "Integração desta semana", corpo: "As páginas privadas de vias sensitivas, tronco, sistema límbico, vascularização, via visual e neuroradiologia foram classificadas em Minha mídia. Estude cada uma depois de prever a localização pela vinheta." },
    ],
    referencias: ["Blumenfeld H. Neuroanatomy Through Clinical Cases", "AHA/ASA — princípios de avaliação de AVC agudo"],
  },
};
