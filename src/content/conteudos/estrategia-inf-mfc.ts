import type { ConteudoSubtema } from "@/domain/content/types";

function resumo(id: string, titulo: string, fonte: string, essencial: string, avaliacao: string, conduta: string, prova: string, referencias: string[]): ConteudoSubtema {
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
    referencias: [`Estratégia MED — ${fonte} (material fornecido pelo usuário)`, ...referencias],
  };
}

const INF = ["Ministério da Saúde — protocolos clínicos de Infectologia", "Anvisa — prevenção e controle de infecções relacionadas à assistência"];
const MFC = ["Constituição Federal de 1988 e Leis nº 8.080/1990 e 8.142/1990", "Ministério da Saúde — Sistema Único de Saúde e indicadores de saúde"];

const R: ConteudoSubtema[] = [
  resumo(
    "inf--hiv-aids--infeccoes-oportunistas", "Infecções oportunistas no HIV", "Mapa Mental — HIV",
    "O risco de infecção oportunista cresce com queda de CD4 e viremia não controlada. Pneumocistose, neurotoxoplasmose, criptococose, tuberculose, CMV e micobacterioses têm faixas de risco e apresentações próprias.",
    "Em pessoa com HIV e síndrome aguda/subaguda, integrar CD4/carga viral, imagem e amostras do sítio. Antes de TARV, rastrear TB, hepatites e infecções cuja síndrome inflamatória de reconstituição possa ser grave.",
    "Tratar a infecção específica, iniciar/otimizar TARV no momento apropriado e oferecer profilaxias primárias/secundárias conforme CD4 e imunidade. Interações com antirretrovirais precisam ser revisadas.",
    "**Não atrasar diagnóstico invasivo quando SNC/pulmão estão ameaçados.** A profilaxia pode ser suspensa após reconstituição imune sustentada conforme critérios específicos.", INF
  ),
  resumo(
    "inf--tuberculose--tb-latente", "Infecção latente por tuberculose", "Mapa Mental — Tuberculose",
    "ILTB é resposta imune ao *M. tuberculosis* sem doença ativa clínica/radiológica. Não transmite, mas pode reativar, sobretudo em contato recente, HIV, imunossupressão e candidatos a anti-TNF/transplante.",
    "Teste tuberculínico ou IGRA demonstra sensibilização, não diferencia ativa de latente. Antes da profilaxia, excluir TB ativa por sintomas, exame e radiografia, complementando investigação quando necessário.",
    "Tratar conforme esquemas preventivos nacionais, considerando idade, exposição, comorbidades, hepatotoxicidade e interações. Investigar e acompanhar contatos prioritários.",
    "**Teste positivo nunca deve levar diretamente à monoterapia sem excluir doença ativa**, pois isso seleciona resistência e atrasa cura. BCG pode influenciar interpretação do teste tuberculínico."
    , INF
  ),
  resumo(
    "inf--infeccoes-sexualmente-transmissiveis--corrimentos-e-ulceras-genitais", "Corrimentos e úlceras genitais", "Mapa Mental — Sífilis e Outras IST",
    "Corrimento uretral/cervical sugere gonococo/clamídia; vaginal exige diferenciar vaginose, candidíase e tricomoníase. Úlceras podem ser sífilis, herpes, cancroide ou causas não infecciosas.",
    "Usar testes moleculares quando disponíveis, microscopia/pH para vaginite e sorologias para sífilis/HIV. Examinar pele e mucosas e investigar DIP, gestação e violência quando pertinente.",
    "Tratamento sindrômico é útil quando diagnóstico rápido/retorno não são garantidos; tratar parceiros e orientar abstinência até conclusão. Ajustar ao resultado e notificar quando cabível.",
    "Aparência clássica ajuda, mas não é absoluta; **coinfecção é possível**. Candidíase não é, em regra, IST e parceiro assintomático não recebe tratamento rotineiro."
    , INF
  ),
  resumo(
    "inf--pneumonias--pneumonia-hospitalar-e-associada-a-ventilacao", "Pneumonia hospitalar e associada à ventilação", "Mapas Mentais — Pneumonias Bacterianas e IRAS",
    "Pneumonia hospitalar surge após internação e PAV após ventilação, sem incubação prévia. Etiologia e resistência dependem de ecologia local, antibióticos recentes e gravidade.",
    "Novo infiltrado com secreção purulenta, febre/leucocitose e piora de oxigenação sustenta suspeita, mas atelectasia, edema e SDRA imitam. Coletar cultura respiratória e sangue antes do antibiótico quando não atrasar.",
    "Iniciar cobertura empírica guiada por risco de resistência e antibiograma institucional, então **descalonar**. Prevenção inclui higiene de mãos, cabeceira elevada, reduzir sedação e retirar ventilação cedo.",
    "Colonização de aspirado não prova pneumonia. **Procalcitonina não deve decidir sozinha início do antibiótico**; duração é individualizada pela resposta e agente."
    , INF
  ),
  resumo(
    "inf--sindromes-febris--abordagem-da-febre-aguda", "Abordagem da febre aguda", "Mapas Mentais — Hepatoesplenomegalias e Síndrome Febril Íctero-hemorrágica",
    "Febre aguda é síndrome, não diagnóstico. Gravidade, duração, exposições, viagens, vetores, animais, água/alimentos, medicamentos e imunidade organizam o diferencial.",
    "Procurar sepse, meningismo, exantema/petéquias, icterícia, sangramento e foco. Hemograma, função orgânica, culturas e testes específicos são guiados pela síndrome; evitar sorologias indiscriminadas precoces.",
    "Estabilizar primeiro e tratar empiricamente quando atraso ameaça vida. Notificar doenças compulsórias, isolar quando indicado e revisar diagnóstico com evolução/resultados.",
    "**Antitérmico não testa etiologia.** Plaquetopenia + hemoconcentração sugere dengue; icterícia + insuficiência renal/hemorragia amplia para leptospirose e febre amarela, conforme epidemiologia."
    , INF
  ),
  resumo(
    "inf--acidentes-por-animais-peconhentos--reconhecimento-e-soroterapia", "Animais peçonhentos", "Mapa Mental — Animais Peçonhentos",
    "Acidentes ofídicos, escorpiônicos, araneídicos e por lagartas têm síndromes locais/sistêmicas próprias. Identificação clínica do envenenamento e gravidade é mais importante que capturar o animal.",
    "Avaliar dor/edema, sangramento/coagulação, neuroparalisia, miotoxicidade, injúria renal, disautonomia e choque. Registrar tempo, local e progressão; exames dependem da síndrome.",
    "Suporte, analgesia e **soro específico** quando indicado, na dose definida pela gravidade e não pelo peso. Não fazer torniquete, corte, sucção ou substâncias locais. Acionar centro toxicológico.",
    "Crianças podem evoluir mais gravemente no escorpionismo. Reação ao soro é tratável e **não contraindica** antiveneno necessário."
    , INF
  ),
  resumo(
    "inf--sindromes-infecciosas--hepatoesplenomegalias", "Hepatoesplenomegalias infecciosas", "Mapa Mental — Hepatoesplenomegalias Infecciosas",
    "Aumento de fígado/baço pode refletir hiperplasia imune, congestão, infiltração ou hipertensão portal. Infecções incluem mononucleose, leishmaniose visceral, malária, esquistossomose, hepatites e infecções disseminadas.",
    "Integrar duração da febre, perda ponderal, adenopatia, citopenias, viagens e exposição vetorial. Hemograma, função hepática, ultrassom e testes dirigidos evitam painéis sem contexto.",
    "Tratar etiologia e complicações. Evitar trauma/esporte quando esplenomegalia, especialmente mononucleose, por risco de rotura. Citopenia grave ou instabilidade exige avaliação urgente.",
    "Hepatoesplenomegalia febril prolongada com pancitopenia em área endêmica lembra **leishmaniose visceral**, mas doença hematológica é diferencial obrigatório."
    , INF
  ),
  resumo(
    "inf--micoses-invasivas--diagnostico-e-tratamento", "Micoses invasivas", "Mapa Mental — Micoses Invasivas",
    "Candidemia, aspergilose, criptococose e mucormicose predominam em imunossuprimidos, neutropênicos, críticos e usuários de dispositivos/antibióticos. Apresentação pode ser inespecífica e progressão rápida.",
    "Coletar culturas e usar antígenos/biomarcadores e imagem conforme hospedeiro; histopatologia/cultura de tecido diferencia invasão de colonização. Procurar foco ocular, cardíaco ou SNC quando indicado.",
    "Iniciar antifúngico apropriado à síndrome e retirar/controlar foco. Neutropenia e interações/toxicidade influenciam escolha. Mucormicose exige cirurgia precoce além de antifúngico.",
    "**Candida em sangue nunca é contaminante habitual.** Candida em secreção respiratória geralmente é colonização; Aspergillus pode exigir diagnóstico provável sem cultura positiva."
    , INF
  ),
  resumo(
    "inf--febre-no-imunossuprimido--neutropenia-febril-e-foi", "Neutropenia febril e febre de origem indeterminada", "Mapa Mental — Neutropenia Febril e Febre de Origem Indeterminada",
    "Neutropenia febril é emergência pelo risco de bacteremia rapidamente fatal; sinais inflamatórios podem ser mínimos. FOI é categoria distinta, definida por febre prolongada sem causa após investigação adequada.",
    "Na neutropenia: culturas, exame cuidadoso de pele/cateter/períneo e avaliação de órgão sem atrasar antibiótico. Estratificar risco para definir internação. Na FOI, reconstruir história e evitar exames repetitivos sem hipótese.",
    "Iniciar antibiótico antipseudomonas rapidamente na neutropenia de alto risco; ampliar apenas conforme foco, instabilidade e resistência. Febre persistente pode indicar fungo invasivo. FOI é tratada pela causa, evitando corticoide/antibiótico empírico indiscriminado em estável.",
    "**Não esperar resultado de cultura** no neutropênico febril. Exame retal invasivo deve ser evitado; ausência de pus não tranquiliza."
    , INF
  ),
  resumo(
    "inf--sindromes-febris--sindrome-febril-ictero-hemorragica", "Síndrome febril íctero-hemorrágica", "Mapa Mental — Síndrome Febril Íctero-hemorrágica",
    "Combinação de febre, icterícia e sangramento inclui leptospirose grave, febre amarela, malária grave, hepatites fulminantes, sepse e outras febres hemorrágicas conforme epidemiologia.",
    "Avaliar choque, consciência, diurese, exposição a enchente/roedores, viagem/vacina, vetores e drogas. Hemograma, coagulação, bilirrubinas/transaminases, função renal, lactato e testes etiológicos orientam.",
    "Suporte intensivo, manejo de choque/insuficiência renal/coagulopatia e terapia específica quando disponível. Isolamento e notificação seguem suspeita epidemiológica.",
    "Icterícia intensa com transaminases apenas moderadas e injúria renal favorece **leptospirose (síndrome de Weil)**; febre amarela costuma produzir AST muito elevada e risco hemorrágico."
    , INF
  ),
  resumo(
    "mfc--epidemiologia--indicadores-de-morbidade", "Indicadores de morbidade", "Mapa Mental — Medidas de Saúde Coletiva — Indicadores de Morbidade",
    "**Incidência** mede casos novos e risco/velocidade de adoecimento; **prevalência** mede casos existentes e carga. Prevalência depende de incidência e duração: aumenta com sobrevida longa e cai com cura rápida ou alta letalidade.",
    "Definir numerador, denominador, população, lugar e período antes de calcular. Densidade de incidência usa pessoa-tempo; incidência acumulada usa população inicialmente sob risco.",
    "Escolher indicador conforme decisão: incidência para etiologia/prevenção, prevalência para planejar serviços. Padronizar taxas quando comparar populações com estruturas diferentes.",
    "Mortalidade não é letalidade. **Prevalência alta não significa necessariamente risco alto**; pode refletir maior duração/sobrevida."
    , MFC
  ),
  resumo(
    "mfc--saude-publica--sus-principios-e-diretrizes", "SUS — princípios, diretrizes e marcos legais", "Mapas Mentais — Princípios e Diretrizes do SUS; Marcos Legais do SUS",
    "A Constituição de 1988 define saúde como direito de todos e dever do Estado. A Lei 8.080 organiza ações/serviços; a Lei 8.142 trata de participação social e transferências. Universalidade, integralidade e equidade orientam o sistema.",
    "Regionalização, hierarquização, descentralização e participação popular estruturam a rede. Conselhos são permanentes/deliberativos; conferências avaliam e propõem diretrizes periodicamente.",
    "Planejamento deve partir das necessidades territoriais, com APS coordenando cuidado e referência/contrarreferência. Responsabilidades são compartilhadas entre entes federativos.",
    "**Equidade não é oferecer o mesmo a todos**, mas responder a necessidades diferentes. Conselho e conferência não são sinônimos; controle social integra gestão do SUS."
    , MFC
  ),
  resumo(
    "mfc--etica-medica--principios-e-deveres", "Ética médica", "Mapa Mental — Ética Médica",
    "Ética clínica articula autonomia, beneficência, não maleficência e justiça. Consentimento informado é processo de informação, compreensão e decisão voluntária; capacidade é específica para a decisão e pode variar.",
    "Sigilo é regra, com exceções por autorização, dever legal ou justa causa. Documentar informação, decisão, conflitos e responsáveis. Em incapacidade, buscar representante e melhor interesse, preservando participação do paciente.",
    "Comunicar com clareza, evitar conflito de interesse, respeitar recusa informada e acionar comitê/rede quando dilema persistir. Notificações obrigatórias não equivalem a divulgação irrestrita.",
    "**Menor pode ter autonomia progressiva.** Prontuário pertence à instituição, mas o paciente tem direito de acesso às informações. Urgência permite intervenção necessária quando consentimento não pode ser obtido."
    , ["Conselho Federal de Medicina — Código de Ética Médica", "Legislação brasileira aplicável ao sigilo e consentimento"]
  ),
];

export const CONTEUDOS_ESTRATEGIA_INF_MFC: Record<string, ConteudoSubtema> = Object.fromEntries(R.map((x) => [x.subtemaId, x]));
