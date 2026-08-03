import type { Questao } from "@/domain/content/types";

const SUB = {
  pre: "go--pre-natal--roteiro-e-consultas-do-pre-natal",
  vac: "go--pre-natal--suplementacao-e-imunizacao-na-gestacao",
  preE: "go--sindromes-hipertensivas-da-gestacao--pre-eclampsia-e-eclampsia",
  hellp: "go--sindromes-hipertensivas-da-gestacao--sindrome-hellp",
  hem1: "go--hemorragias-da-gestacao--primeira-metade-abortamento-ectopica-mola",
  hem2: "go--hemorragias-da-gestacao--segunda-metade-dpp-placenta-previa",
} as const;
const FONTE = "Ministério da Saúde/FEBRASGO/ACOG — diretrizes de pré-natal, vacinação e síndromes obstétricas; lote editorial revisado em 2026-08-03.";
const alt = (letra: string, texto: string, correta: boolean, comentario: string) => ({ letra, texto, correta, comentario });
const q = (id: string, subtemaId: string, enunciado: string, alternativas: ReturnType<typeof alt>[], estilo: Questao["estilo"], tags: string[]): Questao => ({ id, subtemaId, disciplinaId: "go", enunciado, alternativas, dificuldade: "intermediaria", estilo, tags, fonte: FONTE });

export const QUESTOES_GO_LOTE_01: Questao[] = [
  q("go-lote01-001", SUB.pre, "No primeiro contato de pré-natal, qual conjunto organiza a avaliação inicial?", [
    alt("A", "Idade gestacional, riscos maternos e fetais, história clínica, exame físico, exames indicados e plano de seguimento.", true, "A consulta inicial precisa construir linha de base e estratificar risco, não apenas solicitar ultrassom."),
    alt("B", "Somente ultrassonografia morfológica, deixando história para o terceiro trimestre.", false, "História e estratificação não podem ser adiadas."),
    alt("C", "Apenas tipagem sanguínea, pois os demais exames dependem de sintomas.", false, "O pré-natal inclui rastreios e avaliação clínica mais ampla."),
    alt("D", "Apenas avaliação fetal, sem investigação de comorbidades maternas.", false, "Comorbidades maternas modificam risco e conduta desde o início."),
  ], "conduta", ["pré-natal", "primeira consulta"]),
  q("go-lote01-002", SUB.pre, "Gestante com hipertensão crônica deve ser acompanhada no pré-natal com qual princípio?", [
    alt("A", "Diferenciar doença crônica de hipertensão gestacional e vigiar sinais de pré-eclâmpsia sobreposta.", true, "A elevação de proteinúria, sintomas ou disfunção orgânica pode indicar pré-eclâmpsia sobreposta."),
    alt("B", "Suspender todo anti-hipertensivo assim que confirmar a gravidez.", false, "Ajuste deve considerar segurança materno-fetal e níveis pressóricos; suspensão automática é inadequada."),
    alt("C", "Considerar qualquer pressão acima de 120/80 como emergência obstétrica.", false, "Diagnóstico e gravidade usam critérios padronizados e medidas confirmadas."),
    alt("D", "Excluir pré-eclâmpsia se a pressão já era elevada antes da gestação.", false, "Doença sobreposta pode ocorrer e exige vigilância."),
  ], "conduta", ["hipertensão crônica", "pré-eclâmpsia sobreposta"]),
  q("go-lote01-003", SUB.vac, "Qual vacina é recomendada durante a gestação para proteção materna e neonatal contra coqueluche?", [
    alt("A", "dTpa, conforme o calendário vigente e a idade gestacional recomendada.", true, "A vacinação materna permite transferência de anticorpos ao recém-nascido e deve seguir o calendário nacional."),
    alt("B", "Tríplice viral viva em qualquer trimestre.", false, "Vacinas vivas atenuadas têm restrições na gestação."),
    alt("C", "BCG para todas as gestantes no terceiro trimestre.", false, "BCG não é vacina de rotina para gestantes."),
    alt("D", "Varicela viva para reduzir risco fetal imediato.", false, "Vacina viva de varicela não é administrada rotineiramente durante a gestação."),
  ], "conduta", ["vacinação", "dTpa", "gestação"]),
  q("go-lote01-004", SUB.vac, "Sobre ácido fólico no pré-natal, qual orientação é mais adequada?", [
    alt("A", "Iniciar idealmente antes da concepção e manter conforme risco e protocolo local.", true, "A suplementação periconcepcional reduz defeitos do tubo neural; dose pode variar conforme risco."),
    alt("B", "Iniciar apenas após a ultrassonografia morfológica.", false, "A prevenção é mais eficaz quando começa antes ou no início da gestação."),
    alt("C", "Usar vitamina A retinoide para prevenir malformações.", false, "Retinoides são teratogênicos e não têm essa indicação preventiva."),
    alt("D", "Suspender toda suplementação após o teste positivo.", false, "O acompanhamento deve individualizar suplementação e necessidades maternas."),
  ], "conduta", ["ácido fólico", "pré-concepção"]),
  q("go-lote01-005", SUB.preE, "Gestante apresenta PA 168/112 mmHg confirmada e cefaleia persistente. Qual prioridade?", [
    alt("A", "Tratar hipertensão grave imediatamente e avaliar sinais de gravidade, sem esperar todos os exames.", true, "PA grave sustentada aumenta risco de AVC e exige tratamento rápido associado à avaliação obstétrica."),
    alt("B", "Aguardar proteinúria de 24 horas antes de agir.", false, "A urgência hipertensiva não deve aguardar coleta demorada."),
    alt("C", "Prescrever apenas repouso domiciliar.", false, "Repouso não trata hipertensão grave nem sintomas neurológicos."),
    alt("D", "Administrar sulfato de magnésio como único anti-hipertensivo.", false, "Sulfato previne convulsão; não substitui anti-hipertensivo de ação rápida."),
  ], "conduta", ["pré-eclâmpsia", "hipertensão grave"]),
  q("go-lote01-006", SUB.preE, "Em pré-eclâmpsia com sinais neurológicos, qual é a função principal do sulfato de magnésio?", [
    alt("A", "Prevenir e tratar convulsão eclâmptica.", true, "O sulfato é anticonvulsivante obstétrico; a pressão grave precisa de fármaco anti-hipertensivo separado."),
    alt("B", "Induzir maturidade pulmonar fetal.", false, "Corticoide antenatal, quando indicado, tem essa finalidade; sulfato não."),
    alt("C", "Substituir a resolução da gestação em HELLP.", false, "HELLP e outras indicações exigem estabilização e resolução conforme o caso."),
    alt("D", "Corrigir anemia hemolítica.", false, "Sulfato não corrige hemólise nem plaquetopenia."),
  ], "conduta", ["sulfato de magnésio", "eclâmpsia"]),
  q("go-lote01-007", SUB.hellp, "Qual combinação define a síndrome HELLP?", [
    alt("A", "Hemólise, elevação de enzimas hepáticas e plaquetopenia.", true, "A sigla resume hemolysis, elevated liver enzymes e low platelets; sintomas e gravidade guiam resolução."),
    alt("B", "Hiperglicemia, edema e leucocitose persistente.", false, "Esses achados não compõem a definição da síndrome."),
    alt("C", "Hiperbilirrubinemia direta, febre e coagulopatia isolada.", false, "Podem ocorrer em outras doenças e não definem HELLP sozinhos."),
    alt("D", "Hipotensão, elevação de creatinina e proteinúria.", false, "São alterações possíveis de gravidade, mas não correspondem ao acrônimo HELLP."),
  ], "diagnostico", ["HELLP", "hemólise", "plaquetas"]),
  q("go-lote01-008", SUB.hellp, "Gestante com HELLP estabelecida e 34 semanas está estável após estabilização inicial. Qual princípio orienta a conduta definitiva?", [
    alt("A", "Resolver a gestação quando a indicação materna ou fetal supera o benefício de prolongar, sem usar corticoide para mascarar deterioração.", true, "HELLP instalada pode exigir resolução independentemente de uma tentativa de prolongamento; decisão depende de gravidade e estabilidade."),
    alt("B", "Manter expectante obrigatoriamente até 37 semanas.", false, "A idade gestacional isolada não supera sinais de gravidade ou deterioração materna."),
    alt("C", "Alta após normalizar a pressão por 24 horas.", false, "HELLP requer observação hospitalar e decisão obstétrica definitiva."),
    alt("D", "Usar apenas ferro e repetir plaquetas em uma semana.", false, "Suplementação não trata a síndrome aguda."),
  ], "conduta", ["HELLP", "resolução da gestação"]),
  q("go-lote01-009", SUB.hem1, "Paciente com atraso menstrual, dor unilateral e instabilidade hemodinâmica apresenta líquido livre no abdome. Qual conduta?", [
    alt("A", "Reanimação simultânea e tratamento cirúrgico urgente de provável gestação ectópica rota.", true, "Instabilidade e hemoperitônio tornam a prioridade controle da hemorragia, não metotrexato ou observação."),
    alt("B", "Metotrexato ambulatorial sem confirmação de estabilidade.", false, "Metotrexato exige estabilidade hemodinâmica, ausência de rotura e critérios clínicos e laboratoriais apropriados."),
    alt("C", "Aguardar queda espontânea do beta-hCG.", false, "Aguardar pode ser fatal diante de hemorragia interna."),
    alt("D", "Prescrever progesterona e retorno em 72 horas.", false, "Progesterona não controla hemorragia intra-abdominal nem trata gestação ectópica rota; a prioridade é cirurgia."),
  ], "conduta", ["ectópica", "hemoperitônio", "choque"]),
  q("go-lote01-010", SUB.hem1, "Em gestação de localização desconhecida e paciente estável, qual conduta evita interrupção indevida?", [
    alt("A", "Correlacionar sintomas, beta-hCG seriado e ultrassom transvaginal repetido, sem usar um valor isolado como diagnóstico definitivo.", true, "Curvas e imagem seriada orientam localização; zona discriminatória não é um gatilho absoluto para interromper gestação."),
    alt("B", "Administrar metotrexato em todo beta-hCG acima da zona discriminatória.", false, "A decisão exige correlação clínica, ultrassonografia seriada e critérios de segurança; um valor isolado não basta."),
    alt("C", "Descartar ectópica se não houver dor.", false, "Ectópica pode ser assintomática ou pouco dolorosa inicialmente, portanto o seguimento seriado continua obrigatório."),
    alt("D", "Encerrar seguimento após um ultrassom sem saco gestacional.", false, "Um exame precoce pode ser inconclusivo e deve ser correlacionado com beta-hCG seriado e nova imagem."),
  ], "diagnostico", ["gestação de localização desconhecida", "beta-hCG"]),
  q("go-lote01-011", SUB.hem1, "Qual achado clínico favorece mola hidatiforme completa?", [
    alt("A", "Sangramento, útero maior que o esperado e beta-hCG muito elevado, com ultrassom sem embrião viável.", true, "O quadro clássico combina proliferação trofoblástica e ausência de feto na forma completa; confirmação é histopatológica."),
    alt("B", "Beta-hCG indetectável e feto com crescimento normal.", false, "Não corresponde ao padrão de doença trofoblástica gestacional."),
    alt("C", "Dor pélvica isolada com ultrassom normal.", false, "Dor isolada é inespecífica e não define mola."),
    alt("D", "Proteinúria isolada após 20 semanas.", false, "Proteinúria isolada não diagnostica mola."),
  ], "diagnostico", ["mola", "doença trofoblástica"]),
  q("go-lote01-012", SUB.hem2, "Sangramento vermelho vivo, indolor e recorrente no terceiro trimestre sugere qual diagnóstico?", [
    alt("A", "Placenta prévia, até que ultrassonografia localize a placenta.", true, "O toque vaginal digital é evitado até excluir placenta prévia porque pode precipitar hemorragia grave."),
    alt("B", "Descolamento prematuro de placenta obrigatoriamente.", false, "DPP costuma associar dor e hipertonia, embora o sangramento possa ser oculto."),
    alt("C", "Rotura uterina sem avaliação hemodinâmica.", false, "Rotura é uma emergência possível, mas o padrão clássico descrito favorece placenta prévia."),
    alt("D", "Trabalho de parto normal sem necessidade de imagem.", false, "A localização placentária é crucial antes de exame digital e conduta."),
  ], "diagnostico", ["placenta prévia", "sangramento"]),
  q("go-lote01-013", SUB.hem2, "Qual conjunto favorece descolamento prematuro de placenta?", [
    alt("A", "Dor abdominal, hipertonia uterina, sangramento que pode ser oculto e sofrimento fetal.", true, "O DPP pode produzir hemorragia retroplacentária importante mesmo com pouco sangue exteriorizado."),
    alt("B", "Sangramento indolor e útero flácido recorrente.", false, "Sangramento indolor e útero flácido favorecem placenta prévia, não o padrão doloroso e hipertônico do DPP."),
    alt("C", "Colo fechado e ausência de dor excluem DPP.", false, "DPP pode ocorrer com sinais variáveis e sangramento oculto, por isso a ausência de um sinal não exclui o diagnóstico."),
    alt("D", "Apenas prurido gestacional.", false, "Prurido não é quadro típico de DPP e aponta para investigação dermatológica ou colestase, conforme o contexto."),
  ], "diagnostico", ["DPP", "hipertonia uterina"]),
  q("go-lote01-014", SUB.preE, "Em gestante com crise convulsiva e suspeita de eclâmpsia, qual intervenção vem primeiro após segurança da via aérea?", [
    alt("A", "Sulfato de magnésio e controle da hipertensão grave, com estabilização materna antes da resolução obstétrica.", true, "A prioridade é interromper convulsão e prevenir recorrência; depois estabiliza-se e define-se parto."),
    alt("B", "Tomografia fetal antes de qualquer medicação.", false, "Não existe justificativa para atrasar suporte materno e anticonvulsivante."),
    alt("C", "Diazepam como primeira escolha universal, sem sulfato.", false, "Benzodiazepínicos podem ser usados em situações específicas, mas sulfato é preferencial na eclâmpsia."),
    alt("D", "Indução imediata sem estabilizar a mãe.", false, "A mãe deve ser estabilizada antes da resolução, salvo impossibilidade extrema."),
  ], "conduta", ["eclâmpsia", "sulfato de magnésio"]),
  q("go-lote01-015", SUB.pre, "Qual é uma função central da ultrassonografia obstétrica do primeiro trimestre?", [
    alt("A", "Confirmar localização e vitalidade, datar a gestação e avaliar número de fetos quando aplicável.", true, "A datação precoce reduz erros posteriores e a localização exclui situações como gestação ectópica quando visualizada intrauterina."),
    alt("B", "Excluir todas as malformações fetais.", false, "A avaliação morfológica detalhada ocorre em janela específica e não exclui tudo no primeiro exame."),
    alt("C", "Substituir a avaliação clínica materna.", false, "Imagem complementa, mas não substitui anamnese e exame."),
    alt("D", "Determinar a via de parto em qualquer gestação.", false, "Via de parto depende de evolução, condições maternas e fetais e contexto obstétrico."),
  ], "exame", ["ultrassonografia", "datação"]),
  q("go-lote01-016", SUB.pre, "Em pré-natal de baixo risco, qual orientação melhora segurança sem medicalizar excessivamente?", [
    alt("A", "Acompanhar consultas e exames por cronograma, educar sinais de alarme e revisar vacinas e comorbidades.", true, "Pré-natal combina vigilância planejada, educação e prevenção; não exige exames indiscriminados em toda consulta."),
    alt("B", "Solicitar tomografia mensal de rotina.", false, "Tomografia não é exame de rotina do pré-natal de baixo risco."),
    alt("C", "Indicar repouso absoluto para toda gestante.", false, "Repouso absoluto não é recomendação universal e pode causar danos."),
    alt("D", "Evitar vacinação até o puerpério.", false, "Vacinas indicadas na gestação protegem mãe e bebê e seguem calendário."),
  ], "conduta", ["pré-natal", "baixo risco", "educação"]),
  q("go-lote01-017", SUB.hellp, "Plaquetas abaixo de 100.000/mm³ e transaminases elevadas em gestante hipertensa exigem qual raciocínio?", [
    alt("A", "Investigar HELLP e hemólise, sem esperar que a pressão esteja extremamente elevada para reconhecer gravidade.", true, "HELLP pode ocorrer com níveis pressóricos variáveis; sintomas, plaquetas, enzimas e hemólise orientam diagnóstico."),
    alt("B", "Descartar doença porque a proteinúria é negativa.", false, "Proteinúria não é necessária para reconhecer todas as apresentações de gravidade."),
    alt("C", "Considerar trombocitopenia gestacional simples automaticamente.", false, "Plaquetopenia com hipertensão e elevação de enzimas exige excluir HELLP e outras causas."),
    alt("D", "Tratar com ferro oral e repetir exames em um mês.", false, "A apresentação pode ser obstétrica grave e requer avaliação imediata."),
  ], "diagnostico", ["HELLP", "plaquetopenia"]),
  q("go-lote01-018", SUB.hem1, "Qual achado torna metotrexato inadequado para gestação ectópica?", [
    alt("A", "Instabilidade hemodinâmica ou suspeita de rotura, que exige controle cirúrgico da hemorragia.", true, "Metotrexato é opção para pacientes selecionadas, estáveis e capazes de seguimento; não trata choque ou rotura."),
    alt("B", "Paciente estável com seguimento garantido.", false, "Esse é justamente o perfil que pode permitir tratamento medicamentoso quando outros critérios são atendidos."),
    alt("C", "Beta-hCG baixo e massa pequena.", false, "Esses fatores podem favorecer sucesso, dependendo do protocolo."),
    alt("D", "Ausência de atividade cardíaca embrionária.", false, "Pode ser compatível com tratamento medicamentoso em critérios adequados."),
  ], "conduta", ["ectópica", "metotrexato"]),
  q("go-lote01-019", SUB.hem2, "Por que não se faz toque vaginal digital antes de excluir placenta prévia?", [
    alt("A", "Porque o dedo pode descolar placenta sobre o colo e desencadear hemorragia materno-fetal grave.", true, "O diagnóstico deve ser esclarecido por ultrassonografia e o exame digital só é considerado após excluir inserção baixa."),
    alt("B", "Porque o toque sempre induz trabalho de parto em qualquer gestante.", false, "O risco específico é hemorragia quando há placenta prévia, não indução universal do parto."),
    alt("C", "Porque a ultrassonografia é contraindicada no sangramento.", false, "Ultrassonografia é ferramenta central e geralmente segura nesse contexto."),
    alt("D", "Porque sangue vaginal torna todo exame impossível.", false, "Exame especular cuidadoso pode ser indicado em ambiente apropriado; o problema é o toque digital sem localização placentária."),
  ], "conduta", ["placenta prévia", "toque vaginal"]),
  q("go-lote01-020", SUB.preE, "Qual combinação diferencia hipertensão gestacional de pré-eclâmpsia?", [
    alt("A", "Pré-eclâmpsia envolve hipertensão após 20 semanas com proteinúria ou disfunção orgânica; hipertensão gestacional não apresenta esses achados no diagnóstico.", true, "A distinção usa critérios clínicos e laboratoriais atuais, e a ausência de proteinúria não exclui pré-eclâmpsia se houver disfunção orgânica."),
    alt("B", "Apenas o número de consultas define a síndrome.", false, "Consultas não substituem critérios diagnósticos."),
    alt("C", "Toda hipertensão após 20 semanas é eclâmpsia.", false, "Eclâmpsia exige convulsão não explicada por outra causa."),
    alt("D", "Proteinúria isolada antes de 20 semanas confirma pré-eclâmpsia.", false, "Proteinúria prévia pode indicar doença renal ou hipertensão crônica; cronologia é essencial."),
  ], "diagnostico", ["hipertensão gestacional", "pré-eclâmpsia"]),
];
