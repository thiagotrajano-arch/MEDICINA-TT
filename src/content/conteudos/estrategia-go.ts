import type { ConteudoSubtema } from "@/domain/content/types";

const DATA = "2026-07-21";

function resumo(
  subtemaId: string,
  titulo: string,
  fonte: string,
  essencial: string,
  avaliacao: string,
  conduta: string,
  prova: string,
): ConteudoSubtema {
  return {
    subtemaId,
    titulo,
    atualizadoEm: DATA,
    origem: "complemento_ia",
    blocos: [
      { secao: "Definição e fundamentos", corpo: essencial },
      { secao: "Avaliação e diagnóstico", corpo: avaliacao },
      { secao: "Conduta", corpo: conduta },
      { secao: "Pontos de prova / Pegadinhas", corpo: prova },
    ],
    referencias: [
      `Estratégia MED — ${fonte} (material fornecido pelo usuário)`,
      "FEBRASGO — protocolos e recomendações temáticas",
      "Ministério da Saúde — Atenção ao pré-natal, parto e puerpério",
    ],
  };
}

const RESUMOS: ConteudoSubtema[] = [
  resumo(
    "go--pre-natal--exames-por-trimestre", "Exames por trimestre", "Mapa Mental — Pré-natal",
    "O pré-natal combina **rastreamento universal** com investigação dirigida por risco. Na primeira consulta, confirmar idade gestacional, tipagem/Rh, hemograma, glicemia, urina/urocultura e sorologias recomendadas; repetir exames conforme trimestre, epidemiologia e achados.",
    "A ultrassonografia do primeiro trimestre é a melhor para datação. Rastreios de diabetes, anemia, infecções e aloimunização têm janelas próprias. Resultado alterado exige confirmação e manejo; exame normal não substitui vigilância clínica de PA, ganho ponderal, altura uterina e vitalidade fetal.",
    "Registrar resultados na caderneta, tratar infecções e deficiências, atualizar vacinação e encaminhar ao alto risco quando houver doença materna, alteração fetal ou exame crítico. Solicitar apenas testes com benefício demonstrado, evitando painéis indiscriminados.",
    "**Urocultura é recomendada mesmo sem sintomas.** Datação precoce é mais confiável que ultrassonografia tardia. Sorologia deve ser interpretada com história vacinal, risco e possibilidade de falso-positivo."
  ),
  resumo(
    "go--pre-natal--suplementacao-e-imunizacao-na-gestacao", "Suplementação e imunização na gestação", "Mapa Mental — Pré-natal",
    "Suplementação e vacinação previnem desfechos materno-fetais. **Ácido fólico** deve começar idealmente antes da concepção; ferro é indicado conforme política de saúde e avaliação de anemia. Cálcio tem papel especial quando a ingestão é baixa e há risco de pré-eclâmpsia.",
    "Revisar dieta, hemograma, fatores de risco para defeito do tubo neural e histórico vacinal. Vacinas inativadas recomendadas podem ser administradas na gestação; vacinas de microrganismos vivos são, em regra, contraindicadas.",
    "Atualizar influenza, dTpa e outras vacinas conforme calendário vigente e situação epidemiológica. Individualizar doses altas de folato e outras suplementações. Evitar polivitamínicos sem indicação e excesso de vitamina A retinoide.",
    "**dTpa em cada gestação** protege o recém-nascido por anticorpos maternos. Vacina viva inadvertida não é indicação automática de interrupção da gestação."
  ),
  resumo(
    "go--sindromes-hipertensivas-da-gestacao--hipertensao-gestacional-vs-cronica", "Hipertensão gestacional vs. crônica", "Mapa Mental — Síndromes Hipertensivas da Gestação",
    "Hipertensão **crônica** antecede a gestação, surge antes de 20 semanas ou persiste no puerpério. Hipertensão **gestacional** aparece após 20 semanas sem proteinúria nem disfunção orgânica. Pré-eclâmpsia sobreposta ocorre quando a hipertensa crônica desenvolve novos sinais de doença placentária/órgão-alvo.",
    "Confirmar PA com técnica adequada e medidas repetidas. Avaliar proteinúria, plaquetas, creatinina, transaminases, sintomas neurológicos e crescimento fetal. A ausência de proteinúria não exclui pré-eclâmpsia quando há lesão de órgão-alvo.",
    "Controlar hipertensão persistente com fármacos compatíveis com gestação, vigiar mãe e feto e planejar parto conforme diagnóstico, controle e gravidade. IECA e BRA são contraindicados.",
    "A fronteira de **20 semanas** ajuda, mas mola, doença renal e síndrome antifosfolípide podem produzir apresentações atípicas. Piora súbita da PA ou nova disfunção em hipertensa crônica sugere sobreposição."
  ),
  resumo(
    "go--sindromes-hipertensivas-da-gestacao--sindrome-hellp", "Síndrome HELLP", "Mapa Mental — Síndromes Hipertensivas da Gestação",
    "HELLP reúne **hemólise, elevação de enzimas hepáticas e plaquetopenia** e representa forma grave do espectro hipertensivo gestacional. Pode ocorrer antes ou depois do parto e nem sempre cursa com hipertensão extrema.",
    "Suspeitar diante de dor epigástrica/hipocôndrio direito, náuseas, mal-estar ou sangramento. Solicitar hemograma/plaquetas, AST/ALT, bilirrubinas, LDH, função renal e esfregaço; excluir esteatose hepática aguda, PTT/SHU e hepatites.",
    "Estabilizar, prevenir convulsão com sulfato de magnésio quando indicado, tratar PA grave, corrigir coagulopatia conforme clínica e programar resolução da gestação após estabilização materna. Corticoide fetal não deve atrasar parto necessário.",
    "**Plaquetopenia costuma ser a alteração mais precoce.** Dor em barra com exames em piora exige ação mesmo sem proteinúria exuberante."
  ),
  resumo(
    "go--diabetes-na-gestacao--diabetes-gestacional", "Diabetes gestacional", "Mapa Mental — Diabetes Mellitus na Gestação",
    "A resistência insulínica aumenta pela ação de hormônios placentários. Hiperglicemia materna atravessa a placenta e estimula hiperinsulinemia fetal, explicando macrossomia, polidrâmnio e hipoglicemia neonatal. Diabetes manifesto no início da gestação deve ser distinguido de DM gestacional.",
    "Rastrear glicemia no início do pré-natal e usar TOTG 75 g na janela recomendada quando não houver diabetes manifesto. Um valor alterado nos pontos de corte gestacionais estabelece DMG. Avaliar crescimento fetal e controle glicêmico.",
    "Primeira linha: plano alimentar, atividade física segura e automonitorização. Introduzir insulina quando metas não forem atingidas ou houver sinais de repercussão fetal; metformina pode ser considerada em situações selecionadas conforme protocolo e decisão compartilhada.",
    "Malformações se associam sobretudo ao **diabetes pré-gestacional descompensado** durante organogênese. Toda mulher com DMG precisa reclassificação glicêmica no puerpério."
  ),
  resumo(
    "go--diabetes-na-gestacao--rastreio-e-manejo", "Rastreio e manejo do diabetes na gestação", "Mapa Mental — Diabetes Mellitus na Gestação",
    "O rastreio separa diabetes manifesto de hiperglicemia diagnosticada durante a gestação. No mapa-fonte: jejum de **92–125 mg/dL** sugere DMG; ≥126 mg/dL sugere diabetes manifesto, mediante confirmação apropriada; no TOTG 75 g, avaliar jejum, 1 h e 2 h.",
    "Metas usuais do material: jejum <95, 1 h pós-prandial <140 e 2 h <120 mg/dL. Interpretar perfil em conjunto com adesão, crescimento fetal, líquido amniótico e risco de hipoglicemia.",
    "Ajustar insulina pelo horário da alteração: basal para jejum/pré-prandial e prandial para picos após refeições. Planejar momento do parto individualmente e reduzir/reavaliar tratamento após dequitação placentária.",
    "Não usar HbA1c isoladamente para rastrear DMG. **TOTG pós-parto** é preferível para reclassificação, pois o risco futuro de DM2 permanece elevado."
  ),
  resumo(
    "go--puerperio--puerperio-fisiologico-e-patologico", "Puerpério fisiológico e patológico", "Mapas Mentais — Infecção Puerperal e Hemorragia Pós-parto",
    "O puerpério envolve involução uterina, mudança dos lóquios, estabelecimento da lactação e reajuste cardiovascular. Sinais de alerta incluem sangramento excessivo, febre, dor pélvica crescente, dispneia, cefaleia/hipertensão e sofrimento psíquico.",
    "Avaliar sinais vitais, tônus/altura uterina, quantidade do sangramento, períneo/incisão, mamas e risco tromboembólico. Febre puerperal exige localizar foco: endométrio, ferida, trato urinário, mama, pulmão ou trombose pélvica.",
    "Promover contato pele a pele, aleitamento, analgesia, mobilização e contracepção. Hemorragia e sepse demandam protocolos imediatos; endometrite pós-parto costuma exigir antibiótico de amplo espectro com cobertura polimicrobiana.",
    "**Lóquios têm evolução esperada**, mas odor fétido, subinvolução e dor uterina sugerem infecção. Hipertensão grave e eclâmpsia podem surgir após o parto."
  ),
  resumo(
    "go--rastreamento-em-ginecologia--cancer-de-colo-do-utero", "Rastreamento do câncer do colo do útero", "Mapa Mental — Rastreamento do Câncer de Colo de Útero",
    "O rastreamento identifica lesões precursoras relacionadas ao HPV antes do câncer invasivo. A população-alvo, idade de início/término e intervalo devem seguir o programa nacional vigente e variam conforme o teste primário disponível.",
    "Citologia alterada ou teste de HPV positivo é conduzido conforme risco, idade e achado. Sangramento pós-coital, lesão visível ou sintomas não são situação de rastreamento: exigem avaliação diagnóstica.",
    "Garantir coleta adequada, rastreabilidade do resultado e encaminhamento para colposcopia quando indicado. Vacinação contra HPV reduz risco, mas não elimina rastreamento na população já elegível.",
    "**Rastreamento é para assintomáticas.** Não rastrear cedo demais nem repetir anualmente sem indicação; imunossuprimidas seguem protocolo específico."
  ),
  resumo(
    "go--rastreamento-em-ginecologia--cancer-de-mama", "Rastreamento do câncer de mama", "Mapa Mental — Rastreamento do Câncer de Mama",
    "Mamografia é o exame de rastreamento com evidência para mulheres de risco habitual na faixa etária definida pelo programa. Risco elevado por mutação, forte história familiar ou irradiação torácica exige estratégia individualizada.",
    "Distinguir rastreamento de investigação: nódulo, descarga papilar suspeita, retração ou alteração cutânea pedem avaliação diagnóstica, exame clínico e imagem dirigida. BI-RADS orienta seguimento e necessidade de biópsia.",
    "Aplicar decisão compartilhada quando recomendações divergirem, explicando benefícios, falso-positivos e sobrediagnóstico. Achado suspeito requer confirmação histológica.",
    "**Ultrassonografia não substitui mamografia como rastreio populacional.** Autoexame não reduz mortalidade, mas conhecimento corporal ajuda a reconhecer sintomas."
  ),
  resumo(
    "go--sangramento-uterino-anormal--abordagem-do-sua", "Abordagem do sangramento uterino anormal", "Mapa Mental — Sangramento Uterino Anormal",
    "SUA é sangramento anormal em volume, regularidade, frequência ou duração. O sistema **PALM-COEIN** separa causas estruturais (pólipo, adenomiose, leiomioma, malignidade/hiperplasia) e não estruturais (coagulopatia, disfunção ovulatória, endométrio, iatrogenia e não classificadas).",
    "Primeiro excluir gestação e avaliar estabilidade/hemodinâmica e anemia. História, exame pélvico, hemograma e ultrassonografia orientam. Amostragem endometrial depende de idade, risco de hiperplasia e persistência do quadro.",
    "No sangramento agudo, estabilizar e usar terapia hormonal ou antifibrinolítica quando apropriado; cirurgia se instabilidade/refratariedade. No crônico, tratar a causa e alinhar com desejo reprodutivo.",
    "**PALM é estrutural; COEIN é não estrutural.** Sangramento pós-menopausa exige investigação endometrial até prova em contrário."
  ),
  resumo(
    "go--amenorreia-e-ciclo-menstrual--investigacao-de-amenorreia", "Investigação de amenorreia", "Mapa Mental — Amenorreia",
    "Amenorreia pode ser primária ou secundária. O raciocínio percorre quatro eixos: gestação, trato de saída/útero, ovário e eixo hipotálamo-hipófise, além de causas endócrinas sistêmicas.",
    "Em toda amenorreia secundária, **β-hCG é o primeiro exame**. Depois avaliar TSH, prolactina e gonadotrofinas conforme quadro; exame físico busca caracteres sexuais, hiperandrogenismo, galactorreia e malformações. Ultrassonografia verifica útero e ovários.",
    "Tratar a causa: corrigir déficit energético, manejar hiperprolactinemia/doença tireoidiana, oferecer proteção endometrial na anovulação e terapia hormonal quando indicada, preservando fertilidade e saúde óssea.",
    "FSH alto sugere falência ovariana; FSH baixo/inadequadamente normal sugere causa central. Amenorreia com dor cíclica lembra obstrução do trato de saída."
  ),
  resumo(
    "go--amenorreia-e-ciclo-menstrual--fisiologia-do-ciclo-menstrual", "Fisiologia do ciclo menstrual", "Mapa Mental — Ciclo Menstrual",
    "O eixo hipotálamo-hipófise-ovário coordena fase folicular, ovulação e fase lútea. FSH recruta folículos; estradiol prolifera endométrio e, sustentado em nível alto, gera feedback positivo e pico de LH; progesterona do corpo lúteo transforma o endométrio em secretor.",
    "A fase folicular é a mais variável. A ovulação ocorre após o pico de LH; sem fecundação, luteólise reduz progesterona/estradiol e desencadeia menstruação. Muco cervical e temperatura basal refletem esse ciclo.",
    "Usar a fisiologia para interpretar anovulação, infertilidade e escolha de contraceptivos. Exames hormonais só têm valor quando coletados e interpretados na fase adequada.",
    "**Fase lútea é relativamente constante; folicular varia.** Progesterona domina após ovulação e eleva discretamente a temperatura basal."
  ),
  resumo(
    "go--planejamento-familiar--metodos-contraceptivos", "Métodos contraceptivos", "Mapa Mental — Planejamento Familiar",
    "A escolha contraceptiva considera eficácia no uso típico, reversibilidade, comorbidades, preferências e proteção contra IST. Métodos reversíveis de longa ação (DIU e implante) têm alta eficácia por baixa dependência de adesão.",
    "Excluir contraindicações relevantes, sobretudo ao estrogênio: trombose atual/prévia de alto risco, enxaqueca com aura, tabagismo após 35 anos, hipertensão grave e certas condições puerperais. Preservativo continua necessário para reduzir IST.",
    "Oferecer decisão compartilhada e início rápido quando gestação puder ser razoavelmente excluída. Orientar efeitos esperados, sinais de alerta, contracepção de emergência e retorno à fertilidade.",
    "**DIU não é restrito a nulíparas.** Antibiótico profilático rotineiro na inserção não é regra. Contraceptivo combinado não deve ser usado quando estrogênio é contraindicado."
  ),
  resumo(
    "go--miomatose-e-adenomiose--adenomiose", "Adenomiose", "Mapa Mental — Adenomiose",
    "Adenomiose é presença de glândulas/estroma endometriais no miométrio, produzindo útero globoso, dismenorreia e sangramento aumentado. Difere de endometriose, que se localiza fora do útero.",
    "Ultrassonografia transvaginal é primeira linha; RM ajuda em dúvida e planejamento. Achados incluem miométrio heterogêneo, assimetria de paredes e pequenos cistos miometriais. Diagnóstico definitivo clássico é histológico.",
    "Tratamento depende de sintomas e desejo reprodutivo: AINE, terapias hormonais e SIU-LNG; histerectomia é definitiva para doença refratária em quem não deseja gestar.",
    "Adenomiose tende a causar **aumento uterino difuso**; leiomioma costuma formar nódulos bem delimitados."
  ),
  resumo(
    "go--assistencia-a-vitima-de-violencia-sexual--atendimento-integral-e-profilaxias", "Assistência à vítima de violência sexual", "Mapa Mental — Assistência a Vítima de Violência Sexual",
    "O atendimento deve ser acolhedor, privado, não julgador e centrado na autonomia. Assistência médica independe de boletim de ocorrência. Registrar história e achados com consentimento, preservando cadeia de custódia quando aplicável.",
    "Avaliar lesões, risco de gestação, exposições a HIV/hepatites/IST, saúde mental e segurança imediata. Coletas forenses e exames devem respeitar tempo, consentimento e protocolo local.",
    "Oferecer contracepção de emergência, profilaxias para IST e HIV dentro da janela indicada, vacinação/imunoglobulina para hepatite B quando cabível, seguimento sorológico e suporte psicossocial. Acionar rede de proteção conforme idade e legislação.",
    "**Nunca condicionar cuidado à denúncia.** Não realizar procedimentos sem consentimento; documentar literalmente informações relevantes e evitar revitimização."
  ),
  resumo(
    "go--oncologia-ginecologica--cancer-do-corpo-do-utero", "Câncer do corpo do útero", "Mapa Mental — Câncer do Corpo do Útero",
    "O câncer endometrial costuma apresentar sangramento pós-menopausa. Exposição estrogênica sem oposição — obesidade, anovulação, nuliparidade e tamoxifeno — aumenta risco; síndrome de Lynch é fator hereditário importante.",
    "Ultrassonografia transvaginal estratifica o endométrio no sangramento pós-menopausa, mas confirmação é por amostragem/histologia. Histeroscopia ajuda em lesão focal ou amostra insuficiente.",
    "Tratamento primário geralmente é estadiamento cirúrgico com histerectomia e salpingo-ooforectomia; extensão, histologia e risco definem linfonodos e adjuvância. Preservação de fertilidade é excepcional e rigorosamente selecionada.",
    "**Sangramento pós-menopausa é câncer até investigação adequada.** Rastreamento populacional de assintomáticas não é recomendado."
  ),
  resumo(
    "go--infeccoes-ginecologicas--cervicites", "Cervicites", "Mapa Mental — Cervicites",
    "Cervicite é inflamação do colo, frequentemente por *Chlamydia trachomatis* ou *Neisseria gonorrhoeae*. Pode ser assintomática ou causar corrimento, sangramento pós-coital e friabilidade cervical.",
    "Testes moleculares são preferidos para clamídia/gonococo; investigar outras IST e gravidez. Dor pélvica, febre ou dor à mobilização cervical levantam DIP.",
    "Tratar empiricamente conforme risco e possibilidade de seguimento, ou de modo dirigido quando teste rápido estiver disponível. Tratar parceiros, orientar abstinência até conclusão e testar cura/reteste quando recomendado.",
    "Cervicite é **trato genital inferior**; dor à mobilização/uterina/anexial muda o raciocínio para DIP e exige cobertura ampliada."
  ),
  resumo(
    "go--mastologia--doencas-benignas-da-mama", "Doenças benignas da mama", "Mapa Mental — Doenças Benignas da Mama",
    "Mastalgia cíclica, cistos e fibroadenoma são comuns. A prioridade é distinguir quadro benigno de sinais suspeitos: massa dura/fixa, retração, pele em casca de laranja, descarga sanguinolenta unilateral ou adenopatia.",
    "A avaliação tríplice combina história/exame, imagem apropriada à idade e biópsia quando indicada. Ultrassonografia diferencia sólido de cístico; mamografia complementa conforme faixa etária e risco.",
    "Reassegurar e acompanhar achados concordantemente benignos; aspirar cisto sintomático selecionado e biopsiar lesões suspeitas ou discordantes. Mastite lactacional requer esvaziamento da mama e antibiótico quando bacteriana.",
    "**Imagem e exame devem ser concordantes.** Massa persistente com imagem negativa ainda exige reavaliação; descarga multiorificial leitosa difere de descarga papilar patológica."
  ),
  resumo(
    "go--infeccoes-ginecologicas--doencas-da-vulva-e-vagina", "Doenças da vulva e vagina", "Mapa Mental — Doenças de Vulva e Vagina",
    "Dermatoses, infecções, cistos e neoplasias podem causar prurido, dor ou lesões vulvovaginais. Morfologia, distribuição, idade e sintomas orientam o diagnóstico.",
    "Inspecionar toda a vulva/períneo e realizar exame especular quando apropriado. Lesão pigmentada, ulcerada, endurecida, persistente ou refratária requer biópsia. Líquen escleroso associa-se a prurido e placas esbranquiçadas com risco neoplásico.",
    "Tratar causa específica, evitar irritantes e orientar cuidado de barreira. Corticoide tópico potente é base do líquen escleroso; abscesso de Bartholin pode exigir drenagem e avaliação especial após 40 anos.",
    "**Prurido crônico não deve ser tratado repetidamente como candidíase sem exame.** Lesão vulvar persistente pede histologia."
  ),
  resumo(
    "go--endometriose--diagnostico-e-manejo", "Endometriose — diagnóstico e manejo", "Mapa Mental — Endometriose",
    "Endometriose é tecido semelhante ao endométrio fora da cavidade uterina. Os “4 D” clássicos são **dismenorreia progressiva, dispareunia profunda, dor pélvica crônica e dificuldade para engravidar**; intensidade dos sintomas não acompanha necessariamente o estágio.",
    "Diagnóstico é clínico apoiado por ultrassonografia transvaginal especializada ou RM. Endometrioma e doença profunda podem ser mapeados por imagem; laparoscopia fica para indicação terapêutica/dúvida, não como obrigação para toda paciente.",
    "Para dor sem desejo gestacional imediato: AINE e supressão hormonal com combinado/progestagênio; opções de segunda linha exigem avaliação de efeitos. Cirurgia é indicada em refratariedade, obstrução, massa suspeita e situações reprodutivas selecionadas.",
    "**CA-125 não diagnostica endometriose.** Tratamento hormonal controla sintomas, mas não melhora fertilidade durante o uso; decisão cirúrgica deve considerar reserva ovariana."
  ),
  resumo(
    "go--infertilidade-conjugal--investigacao-do-casal", "Infertilidade conjugal", "Mapa Mental — Infertilidade Conjugal",
    "Infertilidade é ausência de gestação após período de relações regulares sem contracepção; investigar mais cedo quando idade materna é maior ou há fator de risco. O casal deve ser avaliado simultaneamente.",
    "Eixos básicos: ovulação, reserva/idade ovariana, anatomia uterotubária e sêmen. Espermograma é inicial no parceiro; história menstrual sugere ovulação; histerossalpingografia avalia permeabilidade quando indicada.",
    "Tratar causa reversível e orientar janela fértil. Indução de ovulação, inseminação ou fertilização in vitro dependem de idade, duração, fator masculino/tubário e reserva ovariana.",
    "Não iniciar investigação apenas pela mulher. **Idade feminina é determinante prognóstico**, e exame de reserva não equivale a chance espontânea isoladamente."
  ),
  resumo(
    "go--uroginecologia--prolapso-de-orgaos-pelvicos", "Prolapso de órgãos pélvicos", "Mapa Mental — Prolapso de Órgãos Pélvicos",
    "Prolapso é descida da parede vaginal anterior/posterior, útero ou cúpula por falha do suporte pélvico. Partos vaginais, idade, hipoestrogenismo, obesidade e aumento crônico da pressão abdominal contribuem.",
    "Sintoma cardinal é sensação de peso/bola vaginal, podendo coexistir disfunção urinária, evacuatória ou sexual. Exame com esforço quantifica compartimentos pelo POP-Q e pesquisa incontinência oculta.",
    "Observação, fisioterapia e pessário atendem casos leves ou preferência conservadora. Cirurgia é individualizada por compartimento, atividade sexual, desejo uterino e risco de recorrência.",
    "Estágio anatômico não determina sozinho tratamento: **sintomas e objetivos da paciente** guiam. Sempre avaliar função urinária e intestinal."
  ),
  resumo(
    "go--infeccoes-ginecologicas--ulceras-genitais", "Úlceras genitais", "Mapa Mental — Úlceras Genitais",
    "Úlcera genital pode resultar de sífilis, herpes, cancroide e causas não infecciosas. Cancro sifilítico tende a ser único e indolor; herpes produz vesículas/úlceras dolorosas agrupadas, mas apresentações atípicas são frequentes.",
    "Testar sífilis e HIV; usar PCR/cultura para herpes quando disponível e avaliar epidemiologia. Coinfecção é possível, portanto aparência isolada não basta.",
    "Iniciar tratamento sindrômico quando retorno for incerto e ajustar após resultados. Tratar parceiros conforme etiologia, orientar redução de transmissão e investigar violência/trauma quando pertinente.",
    "**Dor não exclui sífilis e ausência de vesícula não exclui herpes.** Úlcera persistente ou atípica requer biópsia e avaliação de doença inflamatória/neoplasia."
  ),
  resumo(
    "go--perdas-gestacionais--abortamento-de-repeticao", "Abortamento de repetição", "Mapa Mental — Abortamento de Repetição",
    "Perda gestacional recorrente exige confirmação do número e idade das perdas e abordagem acolhedora. Causas incluem alterações cromossômicas, anatomia uterina, síndrome antifosfolípide e fatores endócrinos; muitos casos permanecem sem causa definida.",
    "Revisar produtos de concepção quando disponíveis, anatomia uterina, TSH e critérios laboratoriais/clínicos de SAF. Não solicitar painéis extensos de trombofilia hereditária ou imunológicos sem indicação.",
    "Tratar causa identificada: aspirina/heparina na SAF obstétrica, correção de septo selecionado, controle endócrino e aconselhamento genético. Oferecer suporte e ultrassonografia precoce em nova gestação.",
    "**Progesterona não é solução universal.** Prognóstico pode ser favorável mesmo sem etiologia, especialmente em mulheres mais jovens."
  ),
  resumo(
    "go--aloimunizacao-materna--doenca-hemolitica-perinatal", "Aloimunização materna e doença hemolítica perinatal", "Mapa Mental — Aloimunização Materna e Doença Hemolítica Perinatal",
    "A mãe produz IgG contra antígeno eritrocitário fetal, frequentemente RhD, causando anemia e hidropisia. Coombs indireto rastreia anticorpos maternos; profilaxia anti-D previne sensibilização, mas não trata mulher já sensibilizada.",
    "Determinar tipagem materna, anticorpo/título e antigenicidade paterna/fetal. Em gestação de risco, Doppler da artéria cerebral média estima anemia; velocidade sistólica elevada indica investigação/tratamento fetal.",
    "Administrar imunoglobulina anti-D nos momentos recomendados e após eventos sensibilizantes à gestante RhD negativa não sensibilizada. Anemia fetal grave pode exigir transfusão intrauterina e parto em centro especializado.",
    "**Coombs indireto positivo muda a conduta:** não repetir anti-D como se fosse profilaxia de sensibilização já instalada. Doppler substituiu amniocentese seriada em grande parte do acompanhamento."
  ),
  resumo(
    "go--liquido-amniotico--oligodramnio-e-polidramnio", "Alterações do volume do líquido amniótico", "Mapa Mental — Alteração do Volume do Líquido Amniótico",
    "Oligodrâmnio associa-se a rotura de membranas, insuficiência placentária e anomalias urinárias; polidrâmnio a diabetes, malformações que impedem deglutição, anemia e causas idiopáticas.",
    "Confirmar por ultrassonografia (maior bolsão vertical ou índice), avaliar membranas, crescimento, anatomia fetal, diabetes e sinais de anemia/infecção conforme quadro.",
    "Tratar a causa e intensificar vigilância. Oligodrâmnio com comprometimento fetal pode exigir parto; polidrâmnio grave sintomático pode demandar medidas especializadas. Evitar intervenções baseadas em uma medida isolada sem contexto.",
    "Oligodrâmnio precoce e prolongado ameaça desenvolvimento pulmonar; polidrâmnio aumenta risco de **prolapso de cordão e atonia pós-parto**."
  ),
  resumo(
    "go--assistencia-ao-parto--bacia-obstetrica-e-estatica-fetal", "Bacia obstétrica, pelvimetria e estática fetal", "Mapa Mental — Bacia Obstétrica, Pelvimetria e Estática Fetal",
    "Estática fetal descreve situação, apresentação, posição e atitude. Apresentação cefálica fletida é a mais favorável; deflexões, apresentação pélvica e transversa mudam mecanismo e via de parto.",
    "Manobras de Leopold e toque vaginal identificam polo, dorso, apresentação e variedade de posição. Pelvimetria clínica tem limitações e não deve, isoladamente, predizer falha de parto.",
    "Acompanhar descida e rotação no trabalho de parto. Distocia é diagnosticada pela evolução clínica, contrações e relação feto-pélvica, evitando cesárea por suspeita não confirmada.",
    "**Situação transversa não permite parto vaginal de feto único a termo.** Caput e moldagem podem confundir estação; variedade occipitoposterior prolonga trabalho."
  ),
  resumo(
    "go--gestacao-multipla--diagnostico-e-manejo", "Gestação múltipla", "Mapa Mental — Gestação Múltipla",
    "Corionicidade, mais que zigotia, define risco. Gestação monocoriônica compartilha placenta e pode desenvolver síndrome de transfusão feto-fetal; monoamniótica acrescenta risco de entrelaçamento de cordões.",
    "Definir corionicidade no primeiro trimestre pelo número de placentas/sacos e sinais ultrassonográficos. Vigiar crescimento, líquido e discordância com frequência maior nos monocoriônicos.",
    "Suplementação, prevenção de prematuridade e momento/via de parto dependem da corionicidade, apresentação do primeiro feto e complicações. Complicações monocoriônicas exigem medicina fetal.",
    "O **sinal do lambda** sugere dicoriônica; **sinal do T**, monocoriônica diamniótica. A morte de um gemelar tem impacto maior quando a circulação é compartilhada."
  ),
  resumo(
    "go--hemorragia-pos-parto--prevencao-e-manejo", "Hemorragia pós-parto", "Mapa Mental — HPP — Hemorragia Pós-parto",
    "HPP é emergência obstétrica. Organizar causas pelos **4 Ts**: tônus (atonia), trauma, tecido retido e trombina/coagulopatia. Atonia é a causa mais frequente.",
    "Reconhecer pela perda sanguínea e, sobretudo, repercussão clínica. Avaliar simultaneamente tônus uterino, canal de parto, placenta e coagulação; quantificar sangramento e acionar protocolo maciço cedo.",
    "Massagem uterina e uterotônico são iniciais na atonia, junto com acesso venoso, reposição balanceada, aquecimento e ácido tranexâmico precoce quando indicado. Escalonar para balão, suturas/compressão, embolização ou cirurgia conforme resposta.",
    "Não esperar hipotensão: gestantes compensam perdas importantes. **Metilergometrina é evitada na hipertensão; carboprost, na asma.**"
  ),
  resumo(
    "go--inducao-e-pos-datismo--indicacoes-e-metodos", "Indução do parto e pós-datismo", "Mapa Mental — Indução do Parto e Pós-datismo",
    "Indução inicia trabalho de parto antes do início espontâneo quando benefício de terminar a gestação supera o risco. Avaliar indicação, contraindicações ao parto vaginal, apresentação, bem-estar fetal e colo pelo índice de Bishop.",
    "Colo desfavorável pede maturação cervical mecânica ou farmacológica conforme cicatriz uterina e protocolo; colo favorável permite ocitocina/amniotomia. Monitorar taquissistolia e frequência fetal.",
    "No pós-datismo, confirmar datação e programar vigilância/indução conforme idade gestacional e diretriz. Falha de indução só deve ser declarada após tempo e condições adequadas.",
    "**Misoprostol é contraindicado em cicatriz uterina relevante pelo risco de rotura.** Bishop baixo não é contraindicação; indica maturação."
  ),
  resumo(
    "go--puerperio--infeccao-puerperal", "Infecção puerperal", "Mapa Mental — Infecção Puerperal",
    "Infecção puerperal inclui endometrite, infecção de ferida, ITU, mastite e tromboflebite pélvica. Cesariana, trabalho prolongado, múltiplos toques e rotura prolongada aumentam risco de endometrite.",
    "Febre com dor uterina, subinvolução e lóquios fétidos sugere endometrite, mas avaliar todas as fontes. Persistência apesar de antibiótico adequado levanta abscesso, produto retido ou tromboflebite pélvica séptica.",
    "Iniciar antibiótico de amplo espectro com cobertura polimicrobiana na endometrite e controlar foco. Ferida com coleção precisa drenagem; mastite geralmente permite manter esvaziamento/aleitamento.",
    "**Febre nas primeiras 24 h tem diferencial amplo.** Ausência de cultura positiva não exclui endometrite, que é diagnóstico predominantemente clínico."
  ),
  resumo(
    "go--fisiologia-da-gestacao--modificacoes-maternas", "Modificações fisiológicas da gestação", "Mapa Mental — Modificações Fisiológicas da Gestação",
    "A gestação aumenta volume plasmático e débito cardíaco, reduz resistência vascular e produz anemia dilucional. Há hiperventilação com alcalose respiratória compensada, hipercoagulabilidade e aumento do ritmo de filtração glomerular.",
    "Interpretar exames com faixas gestacionais: creatinina e hemoglobina podem cair; fosfatase alcalina placentária sobe; leucocitose moderada pode ser fisiológica. Sintomas intensos ou disfunção orgânica não devem ser atribuídos automaticamente à gestação.",
    "Adaptar doses e investigação ao novo volume/distribuição e prevenir trombose conforme risco. Orientar refluxo, constipação e edema dependente, mantendo vigilância de sinais patológicos.",
    "**PA tende a cair no segundo trimestre.** Creatinina “normal” para não gestante pode representar disfunção renal na gestação."
  ),
  resumo(
    "go--crescimento-e-obito-fetal--restricao-de-crescimento-fetal", "Restrição de crescimento fetal e óbito fetal", "Mapa Mental — Restrição de Crescimento Fetal e Óbito Fetal",
    "RCF é incapacidade de atingir potencial de crescimento, frequentemente por insuficiência placentária; não é sinônimo de pequeno constitucional. Início precoce associa-se mais a doença placentária grave/anomalias; tardio pode ser sutil.",
    "Ultrassonografia seriada avalia biometria, líquido e velocidade de crescimento. Doppler umbilical, cerebral e ducto venoso estratifica redistribuição e deterioração. Investigar causas maternas, fetais e placentárias.",
    "Controlar doença materna, vigiar vitalidade e decidir parto equilibrando hipóxia e prematuridade. Óbito fetal requer confirmação, investigação dirigida e cuidado do luto.",
    "Peso < percentil 10 não basta para RCF; **Doppler e trajetória** distinguem risco. Não repetir biometria em intervalo curto demais."
  ),
  resumo(
    "go--rotura-prematura-de-membranas--diagnostico-e-conduta", "Rotura prematura de membranas", "Mapa Mental — Rotura Prematura de Membranas",
    "RPM é rotura antes do trabalho de parto; quando pré-termo, soma risco de prematuridade e infecção. História de perda líquida deve ser confirmada com exame especular estéril.",
    "Observar líquido no fórnice/saída cervical e usar testes auxiliares se dúvida. Evitar toque vaginal digital sem trabalho de parto, pois aumenta infecção. Avaliar corioamnionite, apresentação, vitalidade e idade gestacional.",
    "A termo, geralmente indicar parto. Pré-termo estável pode receber antibiótico de latência, corticoide e vigilância conforme idade gestacional; infecção, sofrimento fetal ou trabalho avançado indicam resolução.",
    "**Toque digital repetido é pegadinha clássica.** Febre, taquicardia materno-fetal, dor uterina e líquido fétido sugerem corioamnionite e contraindicam expectativa."
  ),
  resumo(
    "go--prematuridade--trabalho-de-parto-prematuro", "Prematuridade e trabalho de parto prematuro", "Mapa Mental — TPP — Prematuridade e Trabalho de Parto Prematuro",
    "TPP requer contrações regulares associadas a modificação cervical antes do termo. Contrações isoladas sem mudança cervical não confirmam diagnóstico.",
    "Avaliar colo, membranas, infecção, sangramento e vitalidade. Comprimento cervical e fibronectina podem ajudar em cenários selecionados, sobretudo para excluir parto iminente.",
    "Corticoide antenatal reduz morbidade neonatal na janela apropriada; sulfato de magnésio pode ser usado para neuroproteção fetal em prematuridade precoce. Tocolítico ganha tempo para essas medidas, não “cura” TPP, e é contraindicado quando parto é necessário.",
    "Não fazer tocólise em corioamnionite, sofrimento fetal, hemorragia importante ou contraindicação materna. **O objetivo é 48 horas úteis**, não prolongamento indefinido."
  ),
  resumo(
    "go--avaliacao-fetal--ultrassom-em-obstetricia", "Ultrassom em obstetrícia", "Mapa Mental — Ultrassom em Obstetrícia",
    "Ultrassonografia confirma localização/viabilidade, data gestação, avalia anatomia, placenta, líquido e crescimento. O exame do primeiro trimestre é o mais preciso para datação.",
    "Escolher estudo conforme pergunta: translucência/anatomia precoce, morfológico, biometria e Doppler. Divergência de datas é corrigida segundo idade gestacional e margem aceita, não por cada exame tardio.",
    "Usar Doppler para suspeita de insuficiência placentária/anemia e não como rastreio indiscriminado em baixo risco. Achados anormais exigem aconselhamento e seguimento apropriado.",
    "**Ultrassom tardio não deve redatar repetidamente a gestação.** Peso fetal é estimativa com margem de erro, especialmente nos extremos."
  ),
  resumo(
    "go--avaliacao-fetal--vitalidade-fetal", "Vitalidade fetal", "Mapa Mental — Vitalidade Fetal",
    "Movimentos fetais, cardiotocografia, perfil biofísico e Doppler avaliam risco de hipóxia por perspectivas diferentes. A escolha depende do risco, idade gestacional e contexto clínico.",
    "Cardiotocografia analisa linha de base, variabilidade, acelerações e desacelerações. Perfil biofísico combina parâmetros agudos e líquido amniótico; Doppler avalia resistência placentária e redistribuição.",
    "Resultado não tranquilizador deve ser confirmado/interpretado no contexto e pode exigir reanimação intrauterina, avaliação adicional ou parto. Evitar iatrogenia por teste isolado mal indicado.",
    "**Variabilidade moderada é forte sinal de bem-estar neurológico naquele momento.** Desaceleração tardia repetitiva sugere insuficiência uteroplacentária."
  ),
];

export const CONTEUDOS_ESTRATEGIA_GO: Record<string, ConteudoSubtema> = Object.fromEntries(
  RESUMOS.map((item) => [item.subtemaId, item]),
);
