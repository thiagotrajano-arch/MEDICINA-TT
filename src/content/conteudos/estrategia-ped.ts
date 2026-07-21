import type { ConteudoSubtema } from "@/domain/content/types";

function resumo(id: string, titulo: string, fonte: string, essencial: string, avaliacao: string, conduta: string, prova: string): ConteudoSubtema {
  return {
    subtemaId: id,
    titulo,
    atualizadoEm: "2026-07-21",
    origem: "complemento_ia",
    blocos: [
      { secao: "Definição e fundamentos", corpo: essencial },
      { secao: "Avaliação e diagnóstico", corpo: avaliacao },
      { secao: "Conduta", corpo: conduta },
      { secao: "Pontos de prova / Pegadinhas", corpo: prova },
    ],
    referencias: [
      `Estratégia MED — ${fonte} (material fornecido pelo usuário)`,
      "Sociedade Brasileira de Pediatria — documentos científicos temáticos",
      "Ministério da Saúde — Saúde da Criança e Programa Nacional de Imunizações",
    ],
  };
}

const R: ConteudoSubtema[] = [
  resumo(
    "ped--neonatologia--reanimacao-neonatal", "Reanimação neonatal", "Flashcard — Reanimação Neonatal",
    "Antes do nascimento, realizar anamnese materna, conferir material e distribuir funções. Ao nascer, RN a termo, respirando/chorando e com bom tônus recebe cuidados de rotina; os demais seguem passos iniciais sob calor, com posicionamento de via aérea, secagem e estímulo.",
    "A decisão principal usa **respiração e frequência cardíaca**, não Apgar. FC deve ser reavaliada após cada etapa efetiva. Oximetria pré-ductal orienta oxigênio; considerar ECG para medida rápida da FC.",
    "A intervenção mais importante é **ventilação com pressão positiva eficaz** quando apneia/gasping ou FC <100. Se FC permanece <60 após ventilação corretiva, iniciar compressões coordenadas e escalonar conforme protocolo.",
    "A maior causa de falha é ventilação inadequada: corrigir máscara, posição, secreção obstrutiva, abertura da boca, pressão e via alternativa antes de avançar. **Apgar não guia reanimação.**"
  ),
  resumo(
    "ped--neonatologia--disturbios-respiratorios-do-rn", "Distúrbios respiratórios do RN", "Mapa Mental — Distúrbios Respiratórios do Período Neonatal",
    "Taquipneia transitória decorre de atraso na reabsorção do líquido pulmonar; síndrome do desconforto respiratório, de deficiência de surfactante; aspiração meconial causa obstrução e inflamação; pneumonia/sepse e pneumotórax são diferenciais graves.",
    "Avaliar idade gestacional, tipo de parto, mecônio, risco infeccioso, trabalho respiratório, saturação e radiografia quando indicada. Hipoglicemia, cardiopatia e hipertensão pulmonar podem imitar doença pulmonar.",
    "Suporte térmico, oxigênio/CPAP ou ventilação conforme gravidade; surfactante para SDR selecionada; antibiótico quando infecção não puder ser excluída. Deterioração súbita assimétrica exige pesquisar pneumotórax.",
    "TTN é mais comum após cesárea sem trabalho; SDR predomina no prematuro e mostra padrão reticulogranular. **Não aspirar traqueia rotineiramente apenas por mecônio.**"
  ),
  resumo(
    "ped--crescimento-e-desenvolvimento--marcos-do-desenvolvimento", "Marcos do desenvolvimento", "Mapa Mental — Desenvolvimento Neuropsicomotor",
    "Desenvolvimento integra motricidade grossa/fina, linguagem e interação social. A sequência é previsível, mas há faixa de normalidade; prematuros devem ser avaliados pela idade corrigida nos primeiros anos.",
    "Observar habilidades adquiridas, progressão e qualidade do movimento. **Perda de habilidade já adquirida é sempre sinal de alerta.** Ausência de marcos, assimetria, alteração de tônus ou falha social/linguística pede triagem e avaliação.",
    "Estimular interação, leitura, brincadeira e ambiente seguro; corrigir audição/visão/nutrição e encaminhar cedo para intervenção multiprofissional quando houver atraso.",
    "Não usar um marco isolado como diagnóstico. Regressão é mais preocupante que atraso estável. Idade corrigida = cronológica menos semanas que faltaram para 40."
  ),
  resumo(
    "ped--crescimento-e-desenvolvimento--curvas-de-crescimento", "Curvas e diagnóstico nutricional", "Mapa Mental — Diagnóstico Nutricional",
    "Crescimento deve ser avaliado longitudinalmente por peso, comprimento/altura, IMC e perímetro cefálico conforme idade/sexo. Escore-z permite comparar com padrão OMS; trajetória importa mais que um ponto isolado.",
    "Revisar técnica de medida, idade gestacional, ingestão, perdas, doenças e contexto familiar. Cruzamento de canais, baixa velocidade ou desproporção entre peso e estatura exige investigação.",
    "Classificar e tratar causa de déficit ou excesso, apoiar alimentação responsiva e acompanhar em intervalos adequados. Casos graves, edema, sinais sistêmicos ou falha persistente precisam avaliação ampliada.",
    "Peso/idade é sensível, mas não distingue emagrecimento de baixa estatura. **IMC/idade** avalia excesso; estatura/idade reflete comprometimento crônico."
  ),
  resumo(
    "ped--imunizacao--calendario-vacinal", "Calendário vacinal", "Mapa Mental — Imunizações",
    "Vacinas treinam resposta imune individual e produzem proteção coletiva. Calendário depende de idade, doses prévias, condições especiais e campanhas vigentes; atraso geralmente pede completar, não reiniciar esquema.",
    "Antes de vacinar, revisar caderneta, alergia grave a componente, imunossupressão, gestação e evento adverso verdadeiro. Resfriado leve, uso de antibiótico e prematuridade estável raramente contraindicam.",
    "Aplicar simultaneamente vacinas permitidas em sítios diferentes e registrar lote/data. Vacinas vivas parenterais não dadas no mesmo dia costumam exigir intervalo; imunossuprimidos usam calendário especial.",
    "**Falsa contraindicação é causa importante de oportunidade perdida.** Prematuro vacina pela idade cronológica, com exceções específicas como hepatite B em muito baixo peso."
  ),
  resumo(
    "ped--doencas-exantematicas--sarampo-rubeola-exantema-subito-escarlatina", "Doenças exantemáticas", "Mapa Mental — Doenças Exantemáticas",
    "Exantemas pediátricos são diferenciados por pródromo, progressão, febre e achados mucosos. Sarampo: febre alta, tosse, coriza, conjuntivite e Koplik; rubéola: quadro mais brando e adenopatia; exantema súbito surge após queda da febre; escarlatina acompanha faringite estreptocócica.",
    "Avaliar vacinação, exposição, gestantes/imunossuprimidos, distribuição e gravidade. Suspeita de sarampo exige confirmação laboratorial/notificação e isolamento respiratório adequado.",
    "Suporte na maioria das viroses; vitamina A no sarampo conforme protocolo; penicilina na escarlatina. Reconhecer meningococcemia, Kawasaki, reação medicamentosa grave e síndrome do choque como emergências.",
    "**Sarampo é contagioso antes do exantema.** Exantema do súbito aparece quando a criança melhora da febre. Língua em morango não é exclusiva de escarlatina."
  ),
  resumo(
    "ped--infeccoes-respiratorias-na-infancia--pneumonia", "Pneumonia na infância", "Mapa Mental — Pneumonia na Infância",
    "Pneumonia é infecção do parênquima; vírus predominam em menores, mas bactéria deve ser considerada conforme idade e gravidade. Taquipneia e esforço respiratório são achados centrais; ausculta pode ser pouco sensível.",
    "Diagnóstico ambulatorial é clínico. Radiografia não é rotina em caso leve típico; solicitar em hipoxemia, gravidade, complicação, dúvida ou falha terapêutica. Hemograma não distingue com segurança vírus de bactéria.",
    "Amoxicilina costuma ser primeira escolha na PAC bacteriana não complicada; suporte e oxigênio quando necessário. Internar se hipoxemia, incapacidade de ingerir, toxemia, complicação ou risco social/idade.",
    "Sibilância difusa favorece vírus, mas não exclui pneumonia. **Imagem residual não indica falha** se a criança melhora; derrame/empiema muda manejo."
  ),
  resumo(
    "ped--puericultura--consulta-de-puericultura", "Consulta de puericultura", "Mapas Mentais — Segurança e Desenvolvimento Neuropsicomotor",
    "Puericultura acompanha crescimento, desenvolvimento, alimentação, vacinação, sono, saúde bucal, vínculo e segurança. A consulta é preventiva e deve incorporar contexto familiar e determinantes sociais.",
    "Medir e plotar curvas, revisar marcos e caderneta, examinar de forma completa e rastrear visão, audição, anemia e saúde mental conforme idade/risco.",
    "Promover aleitamento/alimentação adequada, leitura e brincadeira, vacinação e prevenção de acidentes. Definir retorno e encaminhar precocemente qualquer desvio persistente.",
    "Não reduzir puericultura a peso e vacina. **Trajetória de crescimento e desenvolvimento** é mais informativa que comparação entre crianças."
  ),
  resumo(
    "ped--asma--diagnostico-e-controle", "Asma em pediatria", "Mapa Mental — Asma em Pediatria",
    "Asma causa sintomas respiratórios variáveis e limitação variável do fluxo por inflamação/hiperresponsividade. Sibilância recorrente, tosse noturna/exercício e resposta a broncodilatador apoiam diagnóstico.",
    "Em crianças capazes, demonstrar variabilidade por espirometria. Em pré-escolares, padrão clínico, fatores de risco e teste terapêutico ajudam; excluir corpo estranho, fibrose cística, cardiopatia e malácia.",
    "Controle requer educação, técnica inalatória, redução de gatilhos e corticoide inalatório conforme etapa. Exacerbação: broncodilatador inalatório repetido, oxigênio se hipoxemia e corticoide sistêmico na moderada/grave.",
    "**SABA isolado não controla inflamação.** Antes de subir etapa, conferir adesão, técnica e diagnóstico. Silêncio auscultatório em crise é sinal grave."
  ),
  resumo(
    "ped--eventos-no-lactente--brue-e-morte-subita", "BRUE e síndrome da morte súbita do lactente", "Mapa Mental — BRUE e SMSL",
    "BRUE é episódio breve, resolvido e inexplicado em lactente <1 ano com alteração de cor, respiração, tônus ou responsividade após história/exame sem causa. Se há engasgo, infecção, refluxo evidente ou convulsão, não é BRUE.",
    "Estratificar baixo versus alto risco por idade, prematuridade, duração, recorrência e necessidade de RCP. Baixo risco não precisa bateria de exames; alto risco é investigado conforme pistas.",
    "Orientar sono seguro: decúbito dorsal, superfície firme, ambiente sem objetos macios, evitar tabaco/superaquecimento e compartilhar quarto sem compartilhar cama. Capacitar cuidadores em RCP.",
    "BRUE não é diagnóstico etiológico nem sinônimo de quase-morte súbita. **Monitor domiciliar não previne SMSL.**"
  ),
  resumo(
    "ped--neurologia-pediatrica--cefaleias-na-infancia", "Cefaleias na infância", "Mapa Mental — Cefaleias na Infância",
    "Enxaqueca e cefaleia tensional são primárias comuns. Enxaqueca pediátrica pode ser bilateral, mais curta e associar náusea, foto/fonofobia; história familiar é frequente.",
    "Buscar sinais de alarme: início súbito máximo, déficit, alteração de consciência, papiledema, padrão progressivo, despertar/vômitos persistentes, imunossupressão, câncer ou idade muito baixa. Neuroimagem não é rotina sem alarme.",
    "Tratar crise precocemente com hidratação, ambiente calmo e analgésico adequado. Prevenção inclui sono, refeições, exercício, diário e profilaxia quando frequência/incapacidade justificarem.",
    "Sinusite é superdiagnosticada como causa de cefaleia. **Exame neurológico anormal muda a prioridade para causa secundária.**"
  ),
  resumo(
    "ped--infeccoes-respiratorias-na-infancia--coqueluche", "Coqueluche", "Mapa Mental — Coqueluche",
    "*Bordetella pertussis* causa fase catarral contagiosa seguida de tosse paroxística, guincho e vômito pós-tosse. Lactentes podem apresentar apneia/cianose sem guincho.",
    "Diagnóstico é clínico-epidemiológico com PCR/cultura na janela apropriada. Leucocitose com linfocitose pode ocorrer; avaliar gravidade e contatos vulneráveis.",
    "Macrolídeo reduz transmissão e é mais útil cedo; oferecer profilaxia a contatos indicados e atualizar vacinação. Internar lactentes pequenos com apneia, hipoxemia ou dificuldade alimentar.",
    "Tosse pode persistir após erradicação. **Fase catarral é a mais contagiosa** e parece resfriado comum."
  ),
  resumo(
    "ped--vasculites--doenca-de-kawasaki", "Doença de Kawasaki", "Mapa Mental — Doença de Kawasaki",
    "Vasculite de médios vasos com febre persistente e alterações mucocutâneas: conjuntivite não purulenta, boca/lábios, exantema, extremidades e linfonodo cervical. Forma incompleta ocorre, sobretudo em lactentes.",
    "Inflamação laboratorial apoia; ecocardiograma avalia coronárias, mas exame inicial normal não exclui. Excluir infecções e choque tóxico sem atrasar tratamento quando critérios são fortes.",
    "Imunoglobulina IV associada a aspirina reduz aneurisma; acompanhar ecocardiogramas e estratificar trombose conforme coronárias. Choque/disfunção cardíaca requer terapia intensiva.",
    "**Não esperar descamação**, achado tardio. Febre ≥5 dias e poucos critérios pode ser Kawasaki incompleta."
  ),
  resumo(
    "ped--gastroenterologia--refluxo-gastroesofagico", "Refluxo gastroesofágico em pediatria", "Mapa Mental — Doença do Refluxo Gastroesofágico em Pediatria",
    "Refluxo fisiológico é comum no lactente que cresce bem. DRGE implica sintomas/complicações como falha de crescimento, esofagite, hematêmese ou recusa alimentar; choro isolado raramente prova refluxo ácido.",
    "Diagnóstico costuma ser clínico. Sinais de alarme — vômito bilioso/projetil, sangue, febre, distensão, início tardio, déficit neurológico ou baixo ganho — exigem investigar outras causas.",
    "Evitar superalimentação, considerar espessamento e manter aleitamento. Supressão ácida é reservada a suspeita consistente de doença ácido-relacionada, pelo menor tempo necessário; posição prona só acordado/supervisionado.",
    "**Dormir sempre em decúbito dorsal**, mesmo com refluxo. Inibidor de ácido não trata regurgitação fisiológica nem cólica."
  ),
  resumo(
    "ped--febre--abordagem-da-crianca-febril", "Febre na pediatria", "Mapa Mental — Febre na Pediatria",
    "Febre é resposta regulada e deve ser interpretada pela idade, estado geral, duração, foco e vacinação. Lactente jovem tem maior risco de infecção bacteriana invasiva mesmo com aparência inicial boa.",
    "Confirmar temperatura, avaliar perfusão, respiração, hidratação, petéquias e sinais meníngeos. Protocolos de lactente febril usam idade e marcadores para definir urina, sangue, líquor e observação.",
    "Antitérmico visa conforto, não normalizar número. Tratar foco; iniciar antibiótico precoce quando sepse/meningite é possível. Orientar retorno por piora, prostração, dificuldade respiratória ou baixa diurese.",
    "Resposta ao antitérmico **não diferencia vírus de bactéria**. Petéquias com toxemia ou perfusão ruim são emergência."
  ),
  resumo(
    "ped--cardiologia--febre-reumatica", "Febre reumática", "Mapa Mental — Febre Reumática",
    "Complicação imune tardia de faringite por estreptococo do grupo A. Critérios de Jones combinam manifestações maiores/menores com evidência de infecção prévia; cardite pode ser subclínica ao ecocardiograma.",
    "Investigar poliartrite migratória, cardite, coreia, eritema marginado e nódulos; documentar estreptococo por teste/cultura ou títulos, reconhecendo que coreia tardia pode ser exceção.",
    "Erradicar estreptococo, controlar inflamação e insuficiência cardíaca e iniciar profilaxia secundária prolongada com penicilina conforme comprometimento cardíaco.",
    "Artrite costuma migrar e responder dramaticamente a anti-inflamatório. **Coreia pode aparecer meses depois e isoladamente.**"
  ),
  resumo(
    "ped--endocrinologia--hiperplasia-adrenal-congenita", "Hiperplasia adrenal congênita", "Mapa Mental — Hiperplasia Adrenal Congênita",
    "Na forma mais comum, deficiência de 21-hidroxilase reduz cortisol/aldosterona e eleva andrógenos. Pode causar virilização em meninas e crise perdedora de sal em ambos os sexos.",
    "Triagem neonatal usa 17-OH-progesterona. Vômitos, desidratação, hiponatremia e hipercalemia nas primeiras semanas sugerem crise. Confirmar hormônios e eletrólitos sem atrasar estabilização.",
    "Crise: volume, correção de glicose/eletrólitos e hidrocortisona. Manutenção repõe glicocorticoide e, nas formas perdedoras de sal, mineralocorticoide/sal; educação para dose de estresse é essencial.",
    "Menino pode nascer sem genitália ambígua e apresentar choque. **Não registrar sexo precipitadamente** em genitália atípica antes da avaliação especializada."
  ),
  resumo(
    "ped--endocrinologia--hipotireoidismo-congenito", "Hipotireoidismo congênito", "Mapa Mental — Hipotireoidismo Congênito",
    "Deficiência hormonal neonatal é frequentemente assintomática ao nascer, mas sem tratamento compromete neurodesenvolvimento. Disgenesia tireoidiana é causa comum.",
    "Triagem pelo teste do pezinho identifica TSH/T4 alterados; resultado positivo exige confirmação sérica imediata. Não esperar sintomas ou imagem para tratar.",
    "Iniciar levotiroxina rapidamente e monitorar T4/TSH, crescimento e desenvolvimento. Orientar administração e interferência de ferro, cálcio e soja.",
    "**Tempo até tratamento é decisivo.** Icterícia prolongada, macroglossia e hérnia umbilical são tardios e pouco sensíveis."
  ),
  resumo(
    "ped--nefrologia--infeccao-do-trato-urinario", "Infecção do trato urinário em pediatria", "Mapa Mental — ITU em Pediatria",
    "ITU febril em criança pequena pode representar pielonefrite e sinalizar anomalia urinária. Sintomas são inespecíficos em lactentes; crianças maiores apresentam disúria, frequência ou dor lombar.",
    "Coletar urina **antes do antibiótico** por método confiável; saco coletor serve para triagem, não confirma cultura positiva. Diagnóstico combina piúria e crescimento significativo conforme método.",
    "Tratar prontamente conforme idade, gravidade e resistência local. Ultrassonografia e investigação de refluxo são seletivas, guiadas por idade, recorrência e atipia.",
    "Cultura de saco positiva tem alto falso-positivo. **Nitrito negativo não exclui ITU**, especialmente com micções frequentes ou germes não redutores."
  ),
  resumo(
    "ped--adolescencia--puberdade", "Puberdade", "Mapa Mental — Puberdade",
    "Puberdade resulta da reativação do eixo gonadotrófico. Telarca costuma iniciar nas meninas; aumento testicular é o primeiro sinal nos meninos. Estirão e maturação óssea acompanham estágios de Tanner.",
    "Investigar desenvolvimento muito precoce/tardio, progressão rápida, sintomas neurológicos e discordância entre caracteres. Idade óssea, LH/FSH e esteroides são escolhidos conforme suspeita.",
    "Tratar doença de base. Puberdade precoce central progressiva pode receber análogo de GnRH; atraso constitucional pede acompanhamento, enquanto hipogonadismo requer abordagem etiológica.",
    "Pelos pubianos isolados refletem adrenarca, não necessariamente puberdade central. **Volume testicular diferencia** muitas causas no menino."
  ),
  resumo(
    "ped--vasculites--vasculite-por-iga", "Vasculite por IgA", "Mapa Mental — Púrpura de Henoch-Schönlein e Vasculite por IgA",
    "Vasculite por IgA produz púrpura palpável não trombocitopênica, artralgia/artrite, dor abdominal e acometimento renal, geralmente após infecção.",
    "Confirmar plaquetas normais, medir PA e pesquisar hematúria/proteinúria. Dor intensa pode preceder púrpura e associar-se a intussuscepção; edema escrotal também ocorre.",
    "Suporte e analgesia na maioria. Corticoide pode aliviar dor abdominal/articular grave, mas não substitui seguimento renal. Nefrite importante exige nefrologia.",
    "Púrpura predomina em pernas/nádegas. **Urina e PA devem ser acompanhadas por meses**, mesmo após melhora cutânea."
  ),
  resumo(
    "ped--seguranca--prevencao-de-acidentes", "Segurança na pediatria", "Mapa Mental — Segurança na Pediatria",
    "Acidentes variam com desenvolvimento: sufocação/queda no lactente, intoxicação/afogamento no pré-escolar e trânsito/violência no adolescente. Antecipação de risco é parte da consulta.",
    "Perguntar sobre sono, transporte, piscina, armas, medicamentos, telas e supervisão. Avaliar se o mecanismo é compatível com estágio e lesões; inconsistência pode indicar violência.",
    "Orientar cadeirinha adequada, capacete, barreiras para água/janelas, medicamentos trancados, sono seguro e número do centro de intoxicações. Notificar suspeita de maus-tratos conforme lei.",
    "**Afogamento é silencioso e rápido.** Não induzir vômito em intoxicação. Lesões incompatíveis com desenvolvimento exigem proteção, não confronto."
  ),
  resumo(
    "ped--alergologia--alergia-alimentar", "Alergia alimentar", "Mapas Mentais 1 e 2 — Alergia Alimentar",
    "Alergia pode ser IgE-mediada (início rápido: urticária, angioedema, broncoespasmo, anafilaxia), não IgE (enteropatias/proctocolite) ou mista. Intolerância não envolve mecanismo imune.",
    "História temporal é central. IgE/teste cutâneo demonstra sensibilização, não confirma sozinho; provocação oral supervisionada é padrão de referência quando necessária. Evitar painéis indiscriminados.",
    "Excluir apenas alimento comprovadamente implicado, com suporte nutricional. Anafilaxia exige adrenalina IM precoce e plano de ação; reintrodução e aquisição de tolerância devem ser avaliadas.",
    "**IgE positiva sem história não é diagnóstico.** Fórmula parcialmente hidrolisada não trata alergia à proteína do leite; dieta materna só quando lactente reage via leite materno e com orientação."
  ),
  resumo(
    "ped--nefrologia--enurese-noturna", "Enurese noturna", "Mapa Mental — Enurese Noturna",
    "Enurese é micção involuntária durante o sono em idade na qual continência é esperada. Monossintomática não tem sintomas urinários diurnos; primária nunca teve período seco prolongado.",
    "História e diário miccional avaliam frequência, constipação, ronco, polidipsia, ITU e estresse. Exame físico e urina simples costumam bastar; imagem não é rotina na forma típica.",
    "Educação, manejo de constipação, rotina hídrica/miccional e alarme são base. Desmopressina ajuda controle rápido/noites específicas, com restrição hídrica para evitar hiponatremia.",
    "Não punir nem culpabilizar. **Sintomas diurnos, ITU recorrente ou jato anormal** mudam para enurese não monossintomática e pedem investigação."
  ),
];

export const CONTEUDOS_ESTRATEGIA_PED: Record<string, ConteudoSubtema> = Object.fromEntries(R.map((x) => [x.subtemaId, x]));
