import type { Questao } from "@/domain/content/types";

/**
 * Questões inéditas — nefrologia.
 * Gerado por scripts/gerar-conteudo.mts. Cada alternativa tem comentário próprio:
 * a errada explica por que está errada, não repete a justificativa da certa.
 */
export const QUESTOES_NEFRO: Questao[] = [
  {
    id: "nefro-001",
    subtemaId: "nefro--sindromes-glomerulares--nefritica-e-nefrotica",
    disciplinaId: "nefro",
    enunciado: "Menino de 8 anos apresenta hematúria macroscópica \"cor de coca-cola\", edema periorbitário e PA 150x100 mmHg, com início dos sintomas 12 dias após episódio de faringoamigdalite. O exame de urina mostra hematúria dismórfica com cilindros hemáticos e proteinúria de 1,2 g/24h. Qual o achado laboratorial mais esperado e o diagnóstico mais provável?",
    alternativas: [
      { letra: "A", texto: "C3 normal e IgA sérica elevada, compatível com nefropatia por IgA (doença de Berger)", correta: false, comentario: "A nefropatia por IgA cursa com hematúria sincrônica à infecção (dias), não com latência de 12 dias — o intervalo descrito não é compatível com esse diagnóstico." },
      { letra: "B", texto: "C3 diminuído, com normalização esperada em cerca de 8 semanas, compatível com glomerulonefrite pós-estreptocócica", correta: true, comentario: "A latência de 1 a 3 semanas após faringoamigdalite, associada a hematúria dismórfica, HAS e consumo transitório de C3, é o quadro clássico de GNPE, que ativa a via alternativa do complemento." },
      { letra: "C", texto: "C3 e C4 diminuídos, com FAN e anti-dsDNA positivos, compatível com nefrite lúpica", correta: false, comentario: "A nefrite lúpica consome tanto C3 quanto C4 e cursa com manifestações sistêmicas de lúpus (artralgia, rash), ausentes neste caso pediátrico com latência típica pós-infecciosa." },
      { letra: "D", texto: "Complemento normal e p-ANCA positivo, compatível com poliangeíte microscópica", correta: false, comentario: "A poliangeíte microscópica tem pico de incidência entre 50 e 70 anos e cursa com acometimento sistêmico (pulmonar), perfil incompatível com uma criança com quadro autolimitado pós-faringite." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["GNPE", "nefropatia por IgA", "síndrome nefrítica", "complemento"],
  },
  {
    id: "nefro-002",
    subtemaId: "nefro--sindromes-glomerulares--nefritica-e-nefrotica",
    disciplinaId: "nefro",
    enunciado: "Homem de 55 anos, em investigação de síndrome nefrótica (proteinúria 6 g/24h, albumina 2,1 g/dL), evolui subitamente com dor lombar direita intensa e hematúria macroscópica, sem febre. A ultrassonografia mostra rim direito aumentado de volume. Qual a hipótese diagnóstica mais provável e o mecanismo fisiopatológico associado?",
    alternativas: [
      { letra: "A", texto: "Pielonefrite aguda direita, favorecida pela perda urinária de imunoglobulinas", correta: false, comentario: "A ausência de febre e a apresentação com dor lombar súbita e hematúria macroscópica, sem sinais infecciosos, tornam a pielonefrite aguda menos provável neste caso." },
      { letra: "B", texto: "Trombose de veia renal, favorecida pelo estado de hipercoagulabilidade por perda urinária de antitrombina III e proteínas C e S", correta: true, comentario: "Dor lombar súbita incapacitante associada a hematúria macroscópica em paciente com síndrome nefrótica é o quadro clássico de trombose de veia renal, decorrente da perda urinária de fatores anticoagulantes." },
      { letra: "C", texto: "Cólica nefrética por nefrolitíase, favorecida por hipercalciúria da síndrome nefrótica", correta: false, comentario: "A síndrome nefrótica cursa classicamente com hipocalcemia (perda de proteína ligadora de vitamina D e de cálcio ligado à albumina), não hipercalciúria, o que enfraquece essa hipótese." },
      { letra: "D", texto: "Glomerulonefrite rapidamente progressiva com hemorragia intraglomerular bilateral", correta: false, comentario: "A GN rapidamente progressiva cursa com perda funcional renal progressiva ao longo de dias a semanas, não com dor lombar aguda unilateral e rim aumentado ao exame de imagem." },
    ],
    dificuldade: "avancada",
    estilo: "caso",
    tags: ["síndrome nefrótica", "complicações", "trombose de veia renal", "hipercoagulabilidade"],
  },
  {
    id: "nefro-003",
    subtemaId: "nefro--sindromes-glomerulares--nefritica-e-nefrotica",
    disciplinaId: "nefro",
    enunciado: "Mulher de 62 anos apresenta síndrome nefrótica (proteinúria 8 g/24h, albumina 2,4 g/dL), função renal normal, sem hematúria e sem uso de medicações novas. O anti-PLA2R sérico é fortemente positivo e o rastreio oncológico é negativo. Qual a conduta mais adequada quanto à confirmação diagnóstica e ao tratamento inicial?",
    alternativas: [
      { letra: "A", texto: "Biópsia renal obrigatória antes de qualquer conduta, pois é o único método capaz de confirmar o diagnóstico", correta: false, comentario: "Em quadro clínico típico com anti-PLA2R fortemente positivo, a sorologia pode substituir a biópsia para confirmação diagnóstica, tornando a biópsia dispensável nesse cenário específico." },
      { letra: "B", texto: "Iniciar imediatamente pulsoterapia com ciclofosfamida e corticoide, independentemente do grau de proteinúria ou da função renal", correta: false, comentario: "A intensidade da imunossupressão deve ser estratificada pelo risco de progressão (proteinúria, trajetória da função renal, título de anti-PLA2R); terapia agressiva imediata não é a conduta inicial padrão." },
      { letra: "C", texto: "Considerar o diagnóstico confirmado por sorologia, iniciar nefroproteção geral com bloqueio do SRAA e reservar imunossupressão para casos de maior risco de progressão", correta: true, comentario: "O quadro típico com anti-PLA2R fortemente positivo confirma nefropatia membranosa primária; a conduta atual inicia com nefroproteção e bloqueio do SRAA, reservando imunossupressão para pacientes de maior risco." },
      { letra: "D", texto: "Priorizar investigação de amiloidose renal com eletroforese de proteínas séricas antes de qualquer outra conduta", correta: false, comentario: "A positividade forte e específica do anti-PLA2R já direciona fortemente para nefropatia membranosa primária, tornando a investigação prioritária de amiloidose desnecessária neste momento." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["nefropatia membranosa", "anti-PLA2R", "biópsia renal", "síndrome nefrótica"],
  },
  {
    id: "nefro-004",
    subtemaId: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta",
    disciplinaId: "nefro",
    enunciado: "Paciente de 68 anos, internado há 3 dias por pneumonia com sepse, evolui com queda do débito urinário e aumento da creatinina sérica de 0,9 para 1,6 mg/dL em 48 horas. Ao exame, está hipotenso, taquicárdico, com mucosas secas e turgor cutâneo reduzido. Exames urinários mostram sódio urinário de 12 mEq/L, densidade 1.025, sedimento com cilindros hialinos, e relação ureia/creatinina plasmática > 20:1. Qual é a hipótese diagnóstica mais provável e a conduta inicial mais adequada?",
    alternativas: [
      { letra: "A", texto: "Necrose tubular aguda isquêmica; iniciar diálise de urgência devido à hipotensão.", correta: false, comentario: "A NTA isquêmica cursaria com FeNa > 2%, sódio urinário elevado e cilindros granulosos pigmentados, não com sedimento bland e cilindros hialinos; além disso, hipotensão isolada não é critério AEIOU para diálise de urgência." },
      { letra: "B", texto: "Injúria renal aguda pré-renal por hipoperfusão; a conduta é otimizar a volemia e tratar a sepse, sem indicação de diálise neste momento.", correta: true, comentario: "Os achados (sódio urinário baixo, densidade elevada, relação ureia/creatinina > 20:1 e sedimento bland com cilindros hialinos) são clássicos de hipoperfusão com túbulo íntegro, revertendo com correção da causa hemodinâmica." },
      { letra: "C", texto: "Nefrite intersticial aguda por antibiótico; suspender a droga suspeita e iniciar corticoide.", correta: false, comentario: "O sedimento não mostra cilindros leucocitários nem eosinofilúria, e o quadro clínico é compatível com hipoperfusão sistêmica na sepse, não com reação imunoalérgica a fármaco." },
      { letra: "D", texto: "Injúria renal aguda pós-renal por obstrução; solicitar sondagem vesical de alívio imediatamente.", correta: false, comentario: "Não há relato de globo vesical, dor em cólica ou hidronefrose (exame que confirmaria a causa obstrutiva); os achados laboratoriais apontam para causa pré-renal, não obstrutiva." },
    ],
    dificuldade: "intermediaria",
    estilo: "caso",
    tags: ["IRA", "pré-renal", "FeNa", "sepse", "diagnóstico diferencial"],
  },
  {
    id: "nefro-005",
    subtemaId: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta",
    disciplinaId: "nefro",
    enunciado: "Mulher de 58 anos, diabética tipo 2 e hipertensa, com doença renal crônica estágio G3aA2 (TFG 52 mL/min/1,73m², relação albumina/creatinina urinária 180 mg/g), está em uso de losartana 100 mg/dia, com boa adesão, pressão arterial controlada, função renal estável e potássio sérico normal no último exame. Segundo a diretriz vigente, qual é a conduta mais adequada para reduzir o risco de progressão da doença renal nesta paciente?",
    alternativas: [
      { letra: "A", texto: "Substituir a losartana por um inibidor da ECA, pois a associação teria maior efeito nefroprotetor combinado.", correta: false, comentario: "IECA e BRA têm eficácia nefroprotetora equivalente e não devem ser combinados entre si, pois a associação aumenta o risco de hipercalemia e de piora aguda da função renal sem benefício adicional comprovado." },
      { letra: "B", texto: "Associar um inibidor de SGLT2 à losartana, pois reduz a progressão da doença renal crônica e o risco cardiovascular independentemente do controle glicêmico.", correta: true, comentario: "Os inibidores de SGLT2 são hoje terapia nefroprotetora de primeira linha, associada ao IECA/BRA, em pacientes com DRC e albuminúria significativa, com benefício demonstrado inclusive fora do contexto glicêmico." },
      { letra: "C", texto: "Suspender a losartana e manter apenas dieta hipoproteica, já que no estágio G3a a paciente ainda não precisa de terapia farmacológica adicional.", correta: false, comentario: "Suspender o bloqueio do SRAA é contraindicado nesta paciente, pois o IECA/BRA é a base do tratamento antiproteinúrico e antihipertensivo nefroprotetor; retirá-lo pioraria o prognóstico renal." },
      { letra: "D", texto: "Aumentar a dose de losartana para o dobro da dose máxima recomendada, buscando maior redução da albuminúria.", correta: false, comentario: "Ultrapassar a dose máxima recomendada de BRA não traz benefício antiproteinúrico adicional comprovado e aumenta o risco de hipercalemia e hipotensão sem justificativa baseada em evidência." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    tags: ["DRC", "iSGLT2", "nefroproteção", "KDIGO", "diabetes"],
  },
  {
    id: "nefro-006",
    subtemaId: "nefro--injuria-renal-aguda-e-doenca-renal-cronica--diagnostico-e-conduta",
    disciplinaId: "nefro",
    enunciado: "Paciente com doença renal crônica estágio G5 (TFG 8 mL/min/1,73m²), ainda sem acesso definitivo para terapia renal substitutiva, é admitido com fraqueza muscular. Exames mostram potássio sérico de 7,2 mEq/L e eletrocardiograma com ondas T apiculadas e alargamento do complexo QRS, sem melhora após gluconato de cálcio, insulina com glicose e resina de troca iônica. Qual é a conduta mais apropriada neste momento?",
    alternativas: [
      { letra: "A", texto: "Repetir o gluconato de cálcio intravenoso e aguardar a resposta por mais 6 horas antes de definir nova conduta.", correta: false, comentario: "Hipercalemia grave com alteração eletrocardiográfica já refratária às medidas clínicas caracteriza indicação formal de diálise de urgência, não devendo ser postergada pela repetição de medidas temporárias já ineficazes." },
      { letra: "B", texto: "Iniciar diálise de urgência (hemodiálise), pois a hipercalemia refratária com alteração eletrocardiográfica é indicação formal de terapia renal substitutiva emergencial.", correta: true, comentario: "A combinação de hipercalemia grave, alteração eletrocardiográfica e refratariedade às medidas clínicas (cálcio, insulina/glicose, resina) é indicação clássica de diálise de urgência dentro do critério \"E\" do AEIOU." },
      { letra: "C", texto: "Iniciar diálise peritoneal ambulatorial, por ser a modalidade mais fisiológica e poder ser iniciada imediatamente sem necessidade de acesso vascular.", correta: false, comentario: "A diálise peritoneal exige cateter implantado cirurgicamente com período de maturação de dias antes do uso pleno, o que a torna inadequada para uma emergência hipercalêmica com risco imediato de vida." },
      { letra: "D", texto: "Administrar furosemida em dose alta associada a bicarbonato de sódio para forçar a caliurese antes de considerar diálise.", correta: false, comentario: "Com TFG tão reduzida (estágio G5), a resposta diurética à furosemida é mínima ou ausente, tornando essa medida ineficaz para controlar hipercalemia com risco de vida neste contexto." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["hipercalemia", "diálise de urgência", "AEIOU", "DRC", "emergência"],
  },
];
