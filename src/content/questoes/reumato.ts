import type { Questao } from "@/domain/content/types";

/**
 * Banco de questões — reumatologia.
 * Questões inéditas, escritas para os 4 subtemas novos de src/content/conteudos/reumato.ts.
 * Comentário genuinamente distinto por alternativa (não replicado), fundamentado
 * em conhecimento médico geral e diretrizes nomeadas (ver referencias do resumo).
 */
export const QUESTOES_REUMATO: Questao[] = [
  {
    id: "reumato-001",
    subtemaId: "reumato--vasculites-de-grandes-e-medios-vasos--diagnostico-e-conduta",
    disciplinaId: "reumato",
    enunciado:
      "Mulher, 68 anos, procura o pronto-socorro com cefaleia temporal intensa há 5 dias, refratária a analgésico comum, associada a dor à mastigação prolongada. Há 2 dias, refere um episódio de turvação visual transitória no olho direito, já resolvido. Ao exame, artéria temporal direita espessada e dolorosa à palpação. VHS de 92mm/h. Qual a conduta mais adequada neste momento?",
    alternativas: [
      { letra: "A", texto: "Solicitar biópsia de artéria temporal e aguardar o resultado antes de iniciar qualquer tratamento.", correta: false, comentario: "Esperar o resultado da biópsia atrasa o tratamento de uma condição com risco iminente de cegueira; a biópsia deve ser colhida, mas não é pré-requisito para começar o corticoide." },
      { letra: "B", texto: "Iniciar corticoide em dose alta imediatamente, sem aguardar a biópsia, pelo risco de perda visual permanente.", correta: true, comentario: "Cefaleia temporal + claudicação de mandíbula + VHS muito elevado em mulher idosa é o quadro clássico de arterite de células gigantes; o episódio visual transitório já sinaliza risco iminente de NOIA e cegueira irreversível — o corticoide deve começar de imediato, com a biópsia colhida em seguida (ela pode ser feita mesmo já em corticoterapia, sem perder sensibilidade relevante nos primeiros dias)." },
      { letra: "C", texto: "Prescrever anti-inflamatório não esteroidal e reavaliar em 7 dias.", correta: false, comentario: "AINE não trata a inflamação granulomatosa da arterite de células gigantes nem previne a progressão para perda visual; a conduta correta diante de sintoma visual associado é corticoterapia imediata." },
      { letra: "D", texto: "Solicitar angio-TC de crânio e pescoço e tratar conforme o achado radiológico.", correta: false, comentario: "A angio-TC pode documentar espessamento parietal, mas não deve atrasar o início do corticoide — a decisão terapêutica aqui é clínica e urgente, não depende de confirmação de imagem antes de agir." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["arterite de células gigantes", "vasculite", "reumatologia"],
    fonte: "Questão inédita, elaborada para a plataforma a partir de conhecimento médico geral (critérios ACR/EULAR de vasculite de grandes vasos)",
  },
  {
    id: "reumato-002",
    subtemaId: "reumato--vasculites-anca-associadas--diagnostico-e-conduta",
    disciplinaId: "reumato",
    enunciado:
      "Homem, 45 anos, com quadro de sinusite crônica recorrente há 8 meses, refratária a múltiplos ciclos de antibiótico, evolui com hemoptise leve e, no exame de urina de rotina, hematúria dismórfica e proteinúria. TC de tórax mostra nódulos pulmonares bilaterais, um deles com cavitação central. Qual o padrão de autoanticorpo mais provável de ser encontrado neste paciente?",
    alternativas: [
      { letra: "A", texto: "c-ANCA com especificidade antiproteinase-3 (anti-PR3).", correta: true, comentario: "A tríade de acometimento de vias aéreas superiores refratário (sinusite crônica), vias aéreas inferiores com nódulo cavitado e rim (glomerulonefrite) é o quadro clássico de granulomatose com poliangiite (GPA/Wegener), tipicamente associada ao padrão c-ANCA/anti-PR3, positivo em até 90% dos casos." },
      { letra: "B", texto: "p-ANCA com especificidade antimieloperoxidase (anti-MPO), sem outro achado associado.", correta: false, comentario: "O padrão p-ANCA/anti-MPO isolado é mais típico de poliangiite microscópica, que classicamente NÃO acomete vias aéreas superiores nem forma nódulos cavitados — a presença de sinusite crônica e cavitação pulmonar aponta para GPA, não PAM." },
      { letra: "C", texto: "Anticorpo antimembrana basal glomerular, sem ANCA associado.", correta: false, comentario: "O anticorpo antimembrana basal glomerular (síndrome de Goodpasture) causa síndrome pulmão-rim, mas não explica a sinusite crônica refratária nem o nódulo cavitado — esses achados de via aérea são característicos das vasculites ANCA-associadas com granuloma, não de Goodpasture." },
      { letra: "D", texto: "ANCA tipicamente negativo, com eosinofilia periférica marcante como principal marcador.", correta: false, comentario: "Eosinofilia marcante com ANCA frequentemente negativo é o padrão da granulomatose eosinofílica com poliangiite (Churg-Strauss), que tem asma de longa data como pródromo obrigatório — ausente neste caso, cujo quadro (VAS + cavitação + rim) aponta para GPA." },
    ],
    dificuldade: "avancada",
    estilo: "diagnostico",
    tags: ["vasculite ANCA", "GPA", "Wegener", "reumatologia"],
    fonte: "Questão inédita, elaborada para a plataforma a partir de conhecimento médico geral (critérios ACR/EULAR de vasculites ANCA-associadas)",
  },
  {
    id: "reumato-003",
    subtemaId: "reumato--esclerose-sistemica--diagnostico-e-conduta",
    disciplinaId: "reumato",
    enunciado:
      "Mulher, 38 anos, com diagnóstico de esclerose sistêmica cutânea difusa há 3 anos (anti-Scl-70 positivo), em uso de prednisona 30mg/dia por piora recente do espessamento cutâneo, é trazida ao pronto-socorro com pressão arterial de 190x120 mmHg e creatinina que subiu de 0,9 para 2,8 mg/dL em 4 dias. Qual a conduta mais apropriada?",
    alternativas: [
      { letra: "A", texto: "Suspender o inibidor da enzima conversora de angiotensina, caso em uso, pelo risco de piorar ainda mais a função renal.", correta: false, comentario: "O raciocínio é invertido: diante de crise renal esclerodérmica, o IECA é a conduta que muda o desfecho e deve ser iniciado (ou mantido) mesmo com a creatinina subindo — suspendê-lo pioraria o prognóstico renal." },
      { letra: "B", texto: "Iniciar inibidor da enzima conversora de angiotensina em dose plena, mesmo com a função renal em piora.", correta: true, comentario: "O quadro é típico de crise renal esclerodérmica: HAS maligna de início abrupto + IRA em paciente com forma cutânea difusa, precipitada pelo uso de corticoide em dose alta (>20mg/dia é fator de risco reconhecido). O IECA em dose plena é a conduta que altera o desfecho, mesmo que a creatinina continue subindo nos primeiros dias — não deve ser adiado nem suspenso por esse motivo." },
      { letra: "C", texto: "Aumentar a dose de prednisona para controlar a suposta atividade inflamatória renal.", correta: false, comentario: "Corticoide em dose alta é fator de risco reconhecido para desencadear a crise renal esclerodérmica, não uma conduta terapêutica para ela — aumentar a dose tende a piorar o quadro." },
      { letra: "D", texto: "Solicitar biópsia renal antes de qualquer intervenção farmacológica para confirmar o diagnóstico.", correta: false, comentario: "O quadro clínico (HAS maligna + IRA abrupta em esclerose sistêmica difusa recém-exposta a corticoide) já é suficientemente característico para justificar início imediato do IECA; atrasar o tratamento para biopsiar primeiro expõe a paciente a dano renal potencialmente irreversível." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["esclerose sistêmica", "crise renal esclerodérmica", "reumatologia"],
    fonte: "Questão inédita, elaborada para a plataforma a partir de conhecimento médico geral (EULAR/ACR — esclerose sistêmica)",
  },
  {
    id: "reumato-004",
    subtemaId: "reumato--espondiloartrites--diagnostico-e-conduta",
    disciplinaId: "reumato",
    enunciado:
      "Homem, 27 anos, refere dor lombar baixa há 5 meses, de início insidioso, com rigidez matinal de cerca de 1 hora. Nota que a dor piora quando fica muito tempo sentado ou deitado e melhora nitidamente após se exercitar. Nega trauma. Radiografia de sacroilíacas realizada há 1 mês foi laudada como normal. Qual a conduta mais adequada diante da suspeita clínica mantida?",
    alternativas: [
      { letra: "A", texto: "Descartar espondiloartrite, já que a radiografia de sacroilíacas foi normal.", correta: false, comentario: "A radiografia pode ser normal nas fases iniciais da doença, antes de haver erosão óssea visível — um resultado normal não descarta espondiloartrite quando a suspeita clínica pelo padrão de dor é forte." },
      { letra: "B", texto: "Solicitar ressonância magnética de sacroilíacas, em busca de edema de medula óssea.", correta: true, comentario: "O padrão de dor descrito (piora com repouso, melhora com exercício, rigidez matinal prolongada, início insidioso antes dos 45 anos) é característico de dor lombar inflamatória. Quando a radiografia é normal ou inconclusiva mas a suspeita clínica permanece forte, a RM identifica precocemente o edema de medula óssea — a lesão inflamatória ativa mais sensível, que antecede a erosão visível no raio-x." },
      { letra: "C", texto: "Solicitar HLA-B27 como exame de rastreio inicial; se negativo, encerrar a investigação.", correta: false, comentario: "HLA-B27 não deve ser usado como rastreio isolado nem como critério de exclusão — está presente em até 90% dos pacientes com espondilite anquilosante, mas sua ausência não afasta o diagnóstico, e sua presença isolada também não confirma (só 6% dos portadores do alelo desenvolvem a doença)." },
      { letra: "D", texto: "Iniciar imunobiológico anti-TNF diretamente, já que o quadro clínico é característico.", correta: false, comentario: "O manejo escalona por etapas: AINE em dose plena por pelo menos 4 semanas é a primeira linha; o imunobiológico é reservado para falha terapêutica documentada, não é a conduta inicial mesmo com quadro clínico típico." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["espondiloartrite", "espondilite anquilosante", "reumatologia"],
    fonte: "Questão inédita, elaborada para a plataforma a partir de conhecimento médico geral (ASAS/EULAR — espondiloartrite axial)",
  },
];
