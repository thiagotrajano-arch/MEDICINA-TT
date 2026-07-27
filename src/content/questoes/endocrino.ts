import type { Questao } from "@/domain/content/types";

/**
 * Questões inéditas — endocrinologia.
 * Gerado por scripts/gerar-conteudo.mts. Cada alternativa tem comentário próprio:
 * a errada explica por que está errada, não repete a justificativa da certa.
 */
export const QUESTOES_ENDOCRINO: Questao[] = [
  {
    id: "endocrino-001",
    subtemaId: "endocrino--nodulo-e-cancer-de-tireoide--diagnostico-e-conduta",
    disciplinaId: "endocrino",
    enunciado: "Homem de 38 anos procura o ambulatorio por nodulo cervical percebido ha 6 meses. Ao exame, nodulo movel de cerca de 2,5 cm no lobo direito, sem linfonodomegalias palpaveis. Exames: TSH 0,06 mUI/L (VR 0,4-4,5), T4 livre discretamente elevado. A ultrassonografia mostra nodulo solido isoecoico, de margens regulares, sem microcalcificacoes, sem extensao extratireoidiana e sem linfonodos suspeitos. Qual a conduta mais adequada neste momento?",
    alternativas: [
      { letra: "A", texto: "Realizar punção aspirativa por agulha fina guiada por ultrassom do nódulo.", correta: false, comentario: "Puncionar agora inverte a ordem do algoritmo. Com **TSH suprimido**, é preciso primeiro documentar se o nódulo é autônomo — a citologia de um nódulo hiperfuncionante costuma vir hipercelular e frequentemente cai em categorias **indeterminadas de Bethesda**, empurrando para uma cirurgia desnecessária um nódulo que é benigno em quase 100% dos casos." },
      { letra: "B", texto: "Solicitar cintilografia de tireoide com tecnécio-99m ou iodo radioativo.", correta: true, comentario: "Correta. **TSH suprimido é a única indicação clássica de cintilografia na investigação de nódulo tireoidiano.** O exame separa o **nódulo quente (hipercaptante)**, que corresponde a adenoma tóxico com risco de malignidade desprezível e dispensa PAAF, sendo tratado como tireotoxicose (radioiodo, antitireoidiano ou cirurgia), do nódulo frio ou morno, que retorna ao algoritmo de estratificação ecográfica e eventual punção." },
      { letra: "C", texto: "Indicar tireoidectomia total, pelo tamanho do nódulo associado a tireotoxicose.", correta: false, comentario: "Cirurgia radical antes de qualquer definição diagnóstica ou funcional é desproporcional. Nenhum achado do caso — nódulo isoecoico, margens regulares, sem microcalcificações, sem linfonodos — indica malignidade, e **tamanho isoladamente não é critério de ressecção**. Mesmo que se confirme adenoma tóxico, o tratamento de primeira linha costuma ser o radioiodo, e a cirurgia expõe o paciente a hipoparatireoidismo e lesão do recorrente sem necessidade." },
      { letra: "D", texto: "Dosar tireoglobulina sérica para estimar a probabilidade de malignidade.", correta: false, comentario: "A tireoglobulina não tem qualquer valor diagnóstico nesta fase: ela se eleva em **bócio, tireoidite, adenoma e nódulo autônomo**, ou seja, em praticamente qualquer doença tireoidiana, e não distingue lesão benigna de maligna. Seu papel é restrito ao **seguimento pós-operatório do carcinoma diferenciado**, sempre dosada em conjunto com o anticorpo antitireoglobulina." },
    ],
    dificuldade: "fixacao",
    estilo: "conduta",
    tags: ["nodulo tireoidiano", "TSH", "cintilografia", "nodulo quente", "algoritmo diagnostico"],
  },
  {
    id: "endocrino-002",
    subtemaId: "endocrino--nodulo-e-cancer-de-tireoide--diagnostico-e-conduta",
    disciplinaId: "endocrino",
    enunciado: "Mulher de 51 anos, assintomatica, com nodulo tireoidiano de 2,0 cm descoberto em ultrassonografia de carotidas. TSH 2,1 mUI/L. Ultrassom: nodulo solido hipoecoico, margens regulares, sem microcalcificacoes e sem linfonodos suspeitos. Foi submetida a PAAF guiada, cujo laudo citologico foi \"neoplasia folicular\" (Bethesda IV). Qual a conduta mais apropriada?",
    alternativas: [
      { letra: "A", texto: "Repetir a PAAF em 6 a 12 semanas, para tentar obter material mais representativo.", correta: false, comentario: "A repetição da punção é a conduta de **Bethesda I** (material insatisfatório) e, em boa parte dos casos, de **Bethesda III**. Em Bethesda IV o material já foi adequado e conclusivo naquilo que a citologia consegue oferecer — repetir apenas devolverá o mesmo laudo, porque a limitação não é da amostra, e sim do método." },
      { letra: "B", texto: "Manter seguimento ultrassonográfico anual, já que o nódulo é hipoecoico de margens regulares.", correta: false, comentario: "Observar seria adequado para uma citologia **benigna (Bethesda II)**, não para uma categoria indeterminada com risco de malignidade em torno de **25 a 40%**. Além disso, o padrão ecográfico descrito corresponde a suspeição intermediária, e não a um achado tranquilizador como cisto puro ou nódulo espongiforme — não há como afastar carcinoma folicular apenas acompanhando a imagem." },
      { letra: "C", texto: "Indicar lobectomia (hemitireoidectomia) diagnóstica, podendo-se antes lançar mão de teste molecular.", correta: true, comentario: "Correta. Adenoma e carcinoma folicular têm **citologia idêntica**: a malignidade só se define pela demonstração de **invasão da cápsula e/ou invasão vascular**, o que exige o exame histológico da **peça cirúrgica completa**. Por isso Bethesda IV é uma indicação de **lobectomia diagnóstica**. **Testes moleculares** (BRAF, RAS, PAX8-PPARγ, TERT) têm exatamente aqui — nas categorias indeterminadas III e IV — seu melhor rendimento, podendo evitar a cirurgia quando o resultado é fortemente tranquilizador." },
      { letra: "D", texto: "Indicar tireoidectomia total com esvaziamento cervical central e programar iodoterapia.", correta: false, comentario: "É uma conduta excessiva para um diagnóstico que ainda não foi feito: a maioria dos nódulos Bethesda IV se revela **benigna** no anatomopatológico. Submeter a paciente de saída a tireoidectomia total significa impor hipotireoidismo definitivo e risco de hipoparatireoidismo e de lesão do laríngeo recorrente sem necessidade; o esvaziamento central profilático não se justifica sem doença linfonodal, e a iodoterapia não se programa antes de haver histologia e estratificação de risco." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    tags: ["Bethesda IV", "neoplasia folicular", "PAAF", "lobectomia", "teste molecular"],
  },
  {
    id: "endocrino-003",
    subtemaId: "endocrino--nodulo-e-cancer-de-tireoide--diagnostico-e-conduta",
    disciplinaId: "endocrino",
    enunciado: "Homem de 34 anos com nodulo tireoidiano de 2,2 cm. A PAAF revelou carcinoma medular de tireoide, e a dosagem de calcitonina serica retornou em 780 pg/mL, com CEA elevado. Nao ha historia familiar conhecida de doenca tireoidiana. Alem do planejamento da tireoidectomia total com esvaziamento do compartimento central, qual conduta e imprescindivel ANTES do procedimento cirurgico?",
    alternativas: [
      { letra: "A", texto: "Realizar iodoterapia neoadjuvante com I-131 para reduzir a massa tumoral.", correta: false, comentario: "O carcinoma medular origina-se das **células C (parafoliculares), derivadas da crista neural**, que **não expressam o simportador de sódio-iodeto** e portanto não concentram iodo radioativo. O I-131 é terapeuticamente inerte nessa neoplasia, em qualquer momento do tratamento — e a demora para operar apenas permitiria progressão linfonodal." },
      { letra: "B", texto: "Solicitar pesquisa de mutação germinativa do proto-oncogene RET e rastreio bioquímico de feocromocitoma com metanefrinas.", correta: true, comentario: "Correta. **Todo paciente com carcinoma medular deve ser submetido a teste germinativo do RET**, mesmo sem história familiar: cerca de **25%** dos casos aparentemente esporádicos são hereditários (**NEM2A, NEM2B** ou CMT familiar), com implicação direta para o rastreamento dos parentes. E, antes de qualquer anestesia, é **obrigatório afastar feocromocitoma** com metanefrinas plasmáticas ou urinárias — se houver, a **adrenalectomia precede a tireoidectomia**, sob pena de crise hipertensiva fatal no intraoperatório. Completa-se a avaliação com cálcio e PTH, pela associação com hiperparatireoidismo primário na NEM2A." },
      { letra: "C", texto: "Iniciar levotiroxina em dose supressiva para reduzir o estímulo trófico sobre o tumor.", correta: false, comentario: "A supressão do TSH tem racional apenas no **carcinoma diferenciado**, cujas células foliculares são TSH-dependentes. As células C **não respondem ao TSH**, de modo que a supressão não traz benefício oncológico algum e ainda expõe o paciente a **fibrilação atrial e perda de massa óssea**. No medular, a levotiroxina entra somente como **reposição** após a tireoidectomia, com alvo de TSH normal." },
      { letra: "D", texto: "Dosar tireoglobulina sérica para complementar o estadiamento e servir de marcador basal.", correta: false, comentario: "A tireoglobulina é sintetizada **exclusivamente pelas células foliculares** — o carcinoma medular simplesmente não a produz, e o resultado seria inútil como marcador desta doença. Os marcadores corretos, tanto para estadiamento quanto para seguimento, são a **calcitonina e o CEA**, cujo **tempo de duplicação** no pós-operatório é o melhor indicador prognóstico de agressividade." },
    ],
    dificuldade: "avancada",
    estilo: "caso",
    tags: ["carcinoma medular", "RET", "NEM2", "feocromocitoma", "calcitonina"],
  },
];
