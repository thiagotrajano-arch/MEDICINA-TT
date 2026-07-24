import type { ConteudoSubtema } from "@/domain/content/types";

function resumo(id: string, titulo: string, fonte: string, essencial: string, avaliacao: string, conduta: string, prova: string, figuraAvaliacao?: string | string[]): ConteudoSubtema {
  const area = id.startsWith("ped--") ? "Sociedade Brasileira de Pediatria — documentos científicos temáticos" : "FEBRASGO — protocolos e recomendações temáticas";
  return {
    subtemaId: id,
    titulo,
    atualizadoEm: "2026-07-21",
    origem: "complemento_ia",
    blocos: [
      { secao: "Definição e fundamentos", corpo: essencial },
      { secao: "Avaliação e diagnóstico", corpo: avaliacao, figura: figuraAvaliacao },
      { secao: "Conduta", corpo: conduta },
      { secao: "Pontos de prova / Pegadinhas", corpo: prova },
    ],
    referencias: [`Estratégia MED — ${fonte} (material fornecido pelo usuário)`, area, "Ministério da Saúde — protocolos assistenciais relacionados"],
  };
}

const R: ConteudoSubtema[] = [
  resumo(
    "go--urgencias-ginecologicas--abdome-agudo", "Abdome agudo em ginecologia", "Flashcard — Abdome Agudo em Ginecologia",
    "Dor pélvica aguda exige excluir gravidez ectópica rota, torção anexial, cisto hemorrágico e DIP, sem esquecer apendicite, doença urinária e causas gastrointestinais.",
    "Avaliar estabilidade e gravidez imediatamente. História temporal, sangramento, febre, exame abdominal/pélvico, hemograma/urina e ultrassonografia transvaginal com Doppler orientam; imagem normal não exclui torção.",
    "Instabilidade ou suspeita de rotura/torção requer cirurgia urgente. Tratar DIP com antibiótico amplo e manejar cisto conforme tamanho, hemorragia e estabilidade.",
    "**β-hCG é obrigatório em idade reprodutiva.** Fluxo Doppler preservado não exclui torção; atraso ameaça o ovário."
  ),
  resumo(
    "go--anatomia-e-embriologia--trato-genital-feminino", "Anatomia e embriologia do trato genital feminino", "Flashcard — Anatomia e Embriologia do Trato Genital Feminino",
    "Ductos müllerianos originam tubas, útero, colo e porção superior vaginal; seio urogenital contribui para porção inferior. Fusão/canalização inadequadas geram septos e anomalias uterinas.",
    "Investigar amenorreia, dor cíclica, infertilidade e perdas com exame e imagem. Diferenciar agenesia mülleriana de insensibilidade androgênica pela presença uterina, pelos e cariótipo/hormônios.",
    "Tratar apenas quando sintomático ou com impacto reprodutivo; septo uterino selecionado pode ser corrigido por histeroscopia. Avaliar anomalias renais associadas.",
    "Ovários não derivam de Müller e podem estar normais na agenesia uterina. **Septo e útero bicorno** têm manejo e imagem tridimensional distintos."
  ),
  resumo(
    "go--dor-pelvica--dor-cronica-e-dismenorreia", "Dor pélvica crônica e dismenorreia", "Flashcard — Dor Pélvica Crônica e Dismenorreia",
    "Dor pélvica crônica é multifatorial, envolvendo endometriose/adenomiose, musculoesquelético, bexiga, intestino e fatores psicossociais. Dismenorreia primária decorre de prostaglandinas sem doença estrutural.",
    "Mapear relação com ciclo, relação sexual, micção/evacuação e trauma; exame inclui assoalho pélvico. Ultrassom é inicial quando há suspeita estrutural; laparoscopia não é exame universal.",
    "AINE e supressão hormonal tratam dismenorreia; dor crônica exige plano multimodal, fisioterapia e tratamento de comorbidades, evitando cirurgias repetidas sem alvo.",
    "Dor progressiva, dispareunia profunda e infertilidade sugerem endometriose. **Componente central/nociplástico pode persistir** mesmo após tratar lesão."
  ),
  resumo(
    "go--patologia-endometrial--polipos-uterinos", "Pólipos uterinos", "Flashcard — Pólipos Uterinos",
    "Pólipo endometrial é crescimento focal que pode causar sangramento intermenstrual, pós-coital ou infertilidade; muitos são assintomáticos. Risco de malignidade cresce após menopausa e com fatores clínicos.",
    "Ultrassonografia transvaginal, sonohisterografia e histeroscopia identificam lesão focal. Sangramento pós-menopausa requer amostragem adequada mesmo com pólipo aparente.",
    "Histeroscopia permite remoção dirigida e histologia em sintomáticas, pós-menopausa ou risco aumentado. Observação pode ser adequada em pequenos pólipos assintomáticos de baixo risco.",
    "Curetagem às cegas pode perder lesão focal. **Todo pólipo removido deve ir para anatomopatológico.**"
  ),
  resumo(
    "go--sexualidade--disfuncoes-sexuais", "Sexualidade e disfunções sexuais", "Flashcard — Sexualidade",
    "Resposta sexual envolve desejo, excitação, orgasmo e resolução, modulados por saúde, vínculo, cultura e medicamentos. Disfunção só existe quando persistente e causa sofrimento.",
    "Entrevista privada e inclusiva avalia dor, desejo, excitação, orgasmo, violência, menopausa, humor e fármacos. Exame é dirigido; evitar patologizar variação normal.",
    "Educação, revisão medicamentosa, tratamento de dor/atrofia, fisioterapia e terapia sexual/psicológica são combinados conforme causa. Respeitar autonomia e diversidade.",
    "**Sofrimento é parte do critério.** Perguntar de forma aberta melhora diagnóstico; dor à penetração pode envolver assoalho hipertônico, não apenas infecção."
  ),
  resumo(
    "go--sindrome-pre-menstrual--diagnostico-e-manejo", "Síndrome pré-menstrual", "Flashcard — Síndrome Pré-menstrual",
    "SPM reúne sintomas físicos/afetivos cíclicos na fase lútea que melhoram com menstruação; transtorno disfórico apresenta predomínio afetivo e maior prejuízo.",
    "Confirmar com diário prospectivo por ciclos e excluir transtornos persistentes exacerbados no período, doença tireoidiana e efeitos de substâncias.",
    "Exercício, sono e medidas comportamentais ajudam. ISRS contínuo ou apenas na fase lútea é primeira linha para sintomas afetivos importantes; contraceptivos podem beneficiar algumas pacientes.",
    "Diagnóstico retrospectivo isolado superestima SPM. **Intervalo assintomático folicular** ajuda a diferenciar exacerbação pré-menstrual de transtorno contínuo."
  ),
  resumo(
    "go--oncologia-ginecologica--tumores-anexiais", "Tumores anexiais", "Material da aula — Tumores Anexiais",
    "Massa anexial pode ser funcional, benigna ou maligna. Idade, menopausa, sintomas e morfologia ultrassonográfica definem risco; torção e rotura são apresentações agudas.",
    "Ultrassonografia transvaginal caracteriza conteúdo, septos, papilas, vascularização, ascite e bilateralidade. Marcadores tumorais auxiliam em contexto selecionado, mas não rastreiam nem substituem imagem/histologia.",
    "Observar cisto simples de baixo risco conforme tamanho/idade; operar massa sintomática, persistente, suspeita ou complicada. Suspeita de malignidade deve ser encaminhada à oncoginecologia para cirurgia adequada.",
    "**CA-125 pode subir em doença benigna e ser normal em câncer inicial.** Evitar punção de massa suspeita por risco de disseminação.",
    "go-cisto-ovariano-us-real"
  ),
  resumo(
    "go--assistencia-ao-parto--parto-vaginal-operatorio", "Parto vaginal operatório", "Flashcard — Parto Vaginal Operatório",
    "Fórceps ou vácuo podem abreviar período expulsivo por comprometimento fetal ou necessidade materna, desde que requisitos sejam atendidos e operador seja treinado.",
    "Confirmar dilatação completa, membranas rotas, cabeça insinuada, posição conhecida, pelve adequada, bexiga vazia, analgesia e possibilidade imediata de cesárea.",
    "Escolher instrumento e técnica conforme situação; interromper tentativa sem progressão, desencaixe repetido ou limite seguro. Examinar mãe e RN após.",
    "**Posição fetal desconhecida e cabeça não insinuada contraindicam.** Vácuo é evitado em prematuridade precoce e não deve ser usado em apresentação facial."
  ),
  resumo(
    "ped--aleitamento-materno--manejo-do-aleitamento", "Manejo do aleitamento materno", "Flashcard — Aleitamento Materno",
    "Aleitamento exclusivo é recomendado nos primeiros meses e continuado com alimentação complementar. Produção depende de sucção/retirada eficaz; pega profunda reduz trauma e melhora transferência.",
    "Observar mamada: posição, boca aberta, lábio evertido, queixo encostado, sucção/deglutição. Avaliar diurese, ganho ponderal e mamas; dor persistente não é “normal”.",
    "Contato pele a pele, livre demanda, correção de pega e esvaziamento resolvem a maioria. Manter aleitamento na mastite e tratar infecção quando indicada; suplementar apenas com motivo e plano.",
    "Choro ou mamadas frequentes não provam pouco leite. **Ingurgitamento pede retirada eficaz, não interrupção.**"
  ),
  resumo(
    "ped--alergologia--anafilaxia-e-urticaria", "Anafilaxia e urticária", "Flashcard — Anafilaxia e Urticária",
    "Anafilaxia é reação sistêmica rápida com comprometimento respiratório/circulatório ou múltiplos sistemas após exposição. Urticária isolada é cutânea e frequentemente viral em crianças.",
    "Diagnóstico é clínico; não esperar exames. Avaliar via aérea, voz, sibilância, perfusão e trato gastrointestinal. Triptase pode apoiar depois, mas resultado normal não exclui.",
    "**Adrenalina IM na face anterolateral da coxa é primeira linha**, repetida se necessário; posicionar, oxigênio e volume complementam. Anti-histamínico não trata choque/broncoespasmo.",
    "Não atrasar adrenalina por medo de efeitos. Corticoide não evita confiavelmente reação bifásica. Prescrever plano e autoinjetor quando disponível/indicado."
  ),
  resumo(
    "ped--reumatologia--artrite-idiopatica-juvenil", "Artrite idiopática juvenil", "Flashcard — Artrite Idiopática Juvenil",
    "AIJ é artrite de início antes dos 16 anos, duração prolongada e causa desconhecida após exclusão. Subtipos variam por número de articulações, febre sistêmica, psoríase e entesite.",
    "Confirmar sinovite e excluir infecção, trauma, malignidade e lúpus. FAN estima risco de uveíte em alguns subtipos, não confirma AIJ; rastreio oftalmológico com lâmpada de fenda é obrigatório.",
    "Fisioterapia, AINE, infiltração, metotrexato e biológicos são escalonados por subtipo/atividade. Artrite séptica deve ser tratada antes de imunossuprimir quando suspeita.",
    "Uveíte pode ser **assintomática**. AIJ sistêmica associa febre cotidiana, exantema evanescente e risco de síndrome de ativação macrofágica."
  ),
  resumo(
    "ped--emergencias-pediatricas--choque-na-crianca", "Choque na criança", "Flashcard — Choque em Pediatria",
    "Choque é falha de perfusão e entrega de oxigênio; crianças mantêm PA até fase tardia. Taquicardia, extremidades frias/quentes, enchimento capilar, pulsos, consciência e diurese são mais precoces.",
    "Classificar provável hipovolêmico, distributivo, cardiogênico ou obstrutivo e procurar causa. Lactato ajuda tendência, mas não substitui exame. Hipotensão é sinal descompensado.",
    "Oxigênio, acesso, glicose e bolus de cristaloide titulados com reavaliação; usar antibiótico precoce na sepse e vasoativo quando refratário. Em cardiopatia/desnutrição, volumes menores e cautela.",
    "**Reavaliar após cada bolus** por hepatomegalia, crepitações e perfusão. Não aplicar volume automático sem considerar choque cardiogênico."
  ),
  resumo(
    "ped--gastroenterologia--constipacao-intestinal", "Constipação intestinal", "Flashcard — Constipação Intestinal",
    "Constipação funcional domina após período neonatal e pode gerar retenção dolorosa, fezes calibrosas e escape fecal. Ciclo dor-retenção perpetua o quadro.",
    "Buscar alarme: início no primeiro mês, mecônio tardio, distensão/vômito bilioso, falha de crescimento, anomalia neurológica/sacral ou sangue sem fissura. Sem alarme, diagnóstico é clínico.",
    "Desimpactar quando necessário, manter laxativo osmótico por tempo suficiente, rotina após refeições e educação sem punição. Fibra/líquido adequados ajudam, mas não substituem medicamento em retenção estabelecida.",
    "Escape fecal pode ser transbordamento, não diarreia. **Toque/exames não são rotina** na forma funcional típica."
  ),
  resumo(
    "ped--neonatologia--cuidados-neonatais", "Cuidados neonatais", "Flashcard — Cuidados Neonatais",
    "Cuidados imediatos priorizam termorregulação, contato pele a pele, aleitamento precoce, identificação e profilaxias. RN vigoroso permanece com a mãe e tem clampeamento oportuno conforme situação.",
    "Exame verifica adaptação, idade gestacional, malformações, trauma, risco infeccioso, glicemia em grupos de risco e eliminação. Triagens neonatal, auditiva, ocular, cardíaca e lingual seguem programa.",
    "Administrar vitamina K, vacinas e profilaxias conforme protocolo; orientar sono seguro e sinais de alerta. Evitar separação e aspiração/banho imediatos sem indicação.",
    "Apgar descreve adaptação, não decide sozinho reanimação nem prognóstico individual. **Temperatura é um sinal vital crítico.**"
  ),
  resumo(
    "ped--nutricao--deficiencias-vitaminicas-e-profilaxias", "Deficiências vitamínicas e profilaxias", "Flashcard — Deficiências Vitamínicas e Profilaxias",
    "Deficiências de ferro, vitaminas A/D/B12 e outros micronutrientes dependem de idade, dieta, prematuridade, má absorção e vulnerabilidade social. Profilaxias seguem grupos e políticas específicas.",
    "Avaliar alimentação, crescimento e sinais como palidez, alterações ósseas/neurológicas e infecções. Confirmar com exames dirigidos, evitando painéis e megadoses.",
    "Promover aleitamento e alimentação variada; suplementar ferro/vitaminas nas doses e janelas recomendadas. Tratar doença de base e monitorar resposta/toxicidade.",
    "Vitamina não é inócua: **A e D podem intoxicar**. Leite de vaca precoce aumenta risco de deficiência de ferro."
  ),
  resumo(
    "ped--nutricao--desnutricao-na-infancia", "Desnutrição na infância", "Flashcard — Desnutrição na Infância",
    "Desnutrição pode ser aguda (baixo peso para estatura/perímetro braquial) ou crônica (baixa estatura para idade) e resultar de ingestão, doença ou ambos. Edema bilateral caracteriza forma grave independentemente do peso.",
    "Medir antropometria corretamente e procurar edema, hipoglicemia, hipotermia, desidratação, infecção e anemia. Criança grave pode não apresentar febre/leucocitose.",
    "Casos graves seguem estabilização em fases: prevenir/tratar hipoglicemia/hipotermia, corrigir eletrólitos com cautela, antibiótico e alimentação terapêutica gradual; depois reabilitação e causa social/clínica.",
    "**Reposição agressiva inicial pode causar falência e síndrome de realimentação.** Edema pode mascarar perda ponderal."
  ),
  resumo(
    "ped--gastroenterologia--diarreia-aguda", "Diarreia aguda", "Flashcard — Diarreia",
    "Gastroenterite aguda é geralmente viral e autolimitada; maior risco é desidratação. Sangue, febre alta, toxemia, viagem e antibiótico ampliam diferencial.",
    "Classificar hidratação por estado mental, olhos, sede, pulso/perfusão e prega, não pelo número de evacuações. Investigar apenas disenteria, quadro prolongado/grave, surto ou imunossupressão.",
    "SRO é base; continuar aleitamento/alimentação e usar zinco conforme política aplicável. Via IV para choque/incapacidade de reidratar. Antibiótico e antidiarreico não são rotina.",
    "**SRO trata perdas mesmo com vômitos**, em pequenas alíquotas. Bebidas esportivas/refrigerantes têm composição inadequada."
  ),
  resumo(
    "ped--gastroenterologia--doenca-celiaca", "Doença celíaca", "Flashcard — Doença Celíaca em Pediatria",
    "Doença celíaca é enteropatia imune desencadeada por glúten em predispostos, com diarreia, distensão, anemia, baixa estatura ou apresentação extraintestinal.",
    "Dosar anti-transglutaminase IgA e IgA total **com glúten na dieta**. IgA deficiente exige testes IgG. Diagnóstico pediátrico pode seguir via com ou sem biópsia em critérios rigorosos.",
    "Dieta sem glúten permanente com nutricionista e monitoramento de crescimento, sintomas, sorologia e deficiências. Rastrear grupos de risco.",
    "Não retirar glúten antes de investigar. **Sorologia positiva isolada fora de critérios não autoriza diagnóstico informal.**"
  ),
  resumo(
    "ped--emergencias-pediatricas--abordagem-inicial", "Emergências pediátricas — abordagem inicial", "Flashcard — Emergências Pediátricas",
    "O Triângulo de Avaliação Pediátrica usa aparência, respiração e circulação cutânea para impressão rápida. Depois aplicar ABCDE, tratando ameaça antes de concluir diagnóstico.",
    "Reconhecer insuficiência respiratória, choque e disfunção neurológica. Medir glicemia cedo e usar equipamentos/doses por peso, estimando peso quando necessário.",
    "Abrir via aérea, ventilar/oxigenar, obter acesso IV/IO e tratar causa. Reavaliar continuamente; criança compensada pode deteriorar subitamente.",
    "**Bradicardia pediátrica costuma ser hipóxica**: ventilação é prioritária. Hipotensão é tardia no choque."
  ),
  resumo(
    "ped--pneumologia--fibrose-cistica", "Fibrose cística", "Flashcard — Fibrose Cística",
    "Doença autossômica recessiva do CFTR causa secreções espessas, doença pulmonar, insuficiência pancreática e suor salgado. Íleo meconial pode ser apresentação neonatal.",
    "Triagem neonatal é seguida por teste do suor; genética ajuda em resultados intermediários. Avaliar crescimento, elastase fecal, microbiologia respiratória e função pulmonar.",
    "Equipe multidisciplinar: fisioterapia/limpeza de vias, nutrição hipercalórica, enzimas pancreáticas/vitaminas e antibióticos dirigidos. Moduladores CFTR dependem da mutação.",
    "Triagem positiva não confirma. **Pseudomonas deve ser erradicada precocemente**; oxigênio isolado não trata exacerbação infecciosa."
  ),
  resumo(
    "ped--cardiologia--hipertensao-arterial", "Hipertensão na criança e no adolescente", "Flashcard — Hipertensão Arterial na Criança e no Adolescente",
    "PA pediátrica depende de idade, sexo e estatura até adolescência; hipertensão secundária é mais provável em pequenos/graves, enquanto obesidade impulsiona primária nos maiores.",
    "Usar manguito correto e confirmar em visitas; MAPA diferencia avental branco/mascarada. História, exame e exames buscam rim, coarctação, endócrino, fármacos e lesão de órgão.",
    "Mudança de estilo de vida é base na primária estável. Fármaco é indicado em sintomática, estágio importante, órgão-alvo, doença renal/diabetes ou falha não farmacológica.",
    "Manguito pequeno superestima PA. **PA em membros superiores e inferiores** ajuda a detectar coarctação."
  ),
  resumo(
    "ped--neonatologia--sepse-neonatal", "Sepse neonatal", "Flashcard — Icterícia e Sepse Neonatal",
    "Sepse precoce relaciona-se à transmissão perinatal; tardia, a ambiente/comunidade. Sinais são inespecíficos: instabilidade térmica, apneia, dificuldade alimentar, letargia e má perfusão.",
    "Colher hemocultura e avaliar líquor/urina conforme idade e estabilidade, sem atrasar antibiótico. Hemograma e PCR isolados não excluem; risco materno e exame seriado importam.",
    "Estabilizar e iniciar antibiótico empírico conforme início/ecologia local, ajustando ou suspendendo por culturas/evolução. Controlar foco e dispositivos.",
    "RN pode ter sepse **sem febre**. Antibiótico prolongado com culturas negativas também causa dano; reavaliar necessidade diariamente."
  ),
  resumo(
    "ped--infeccoes-congenitas--abordagem-neonatal", "Infecções congênitas — abordagem neonatal", "Flashcard — Infecções Congênitas",
    "Infecções congênitas compartilham RCF, hepatoesplenomegalia, icterícia, alterações neurológicas, oculares e auditivas, mas padrões e tempo materno diferenciam agentes.",
    "Integrar sorologia/diagnóstico materno, placenta, exame do RN e testes diretos no período apropriado. IgG neonatal pode ser materna; IgM/teste molecular têm interpretações específicas.",
    "Tratar agente quando houver terapia, avaliar audição/visão/neuroimagem e organizar seguimento do desenvolvimento. Prevenção inclui vacinação, rastreio e tratamento materno.",
    "**Ausência de sintomas ao nascer não exclui sequela tardia**, especialmente CMV. Não interpretar painel TORCH sem hipótese."
  ),
  resumo(
    "ped--nutricao--obesidade-na-infancia", "Obesidade na infância e adolescência", "Flashcard — Obesidade na Infância e na Adolescência",
    "Obesidade é doença crônica multifatorial diagnosticada por IMC/idade, com risco cardiometabólico e psicossocial. A maioria é exógena; baixa velocidade de crescimento sugere causa endócrina.",
    "Avaliar trajetória, PA, acantose, sono, saúde mental e alimentação/atividade familiar. Rastrear lipídios, glicemia e fígado conforme idade/risco.",
    "Intervenção familiar não estigmatizante em hábitos, sono, telas e atividade; tratar comorbidades. Medicamentos e cirurgia são opções especializadas em adolescentes selecionados.",
    "Obesidade com estatura preservada/alta raramente é hipotireoidismo como causa. **Linguagem centrada na pessoa** reduz dano e melhora adesão."
  ),
  resumo(
    "ped--infectologia--tuberculose-na-infancia", "Tuberculose na infância", "Flashcard — Tuberculose na Infância",
    "Crianças adoecem mais após infecção recente e podem ter formas disseminadas/meníngeas. Doença pulmonar costuma ser paucibacilar, com sintomas e radiografia menos específicos.",
    "Investigar contato, sintomas, teste imunológico e radiografia usando sistema de pontuação nacional; tentar confirmação bacteriológica com métodos apropriados, mas resultado negativo não exclui.",
    "Tratar conforme esquema pediátrico/peso, garantir adesão e estudar contatos. BCG protege principalmente contra formas graves, não impede toda infecção pulmonar.",
    "Criança pequena com contato bacilífero exige prioridade. **A fonte adulta deve ser procurada**, pois criança geralmente não é a origem da cadeia."
  ),
];

export const CONTEUDOS_ESTRATEGIA_EXTRAS: Record<string, ConteudoSubtema> = Object.fromEntries(R.map((x) => [x.subtemaId, x]));
