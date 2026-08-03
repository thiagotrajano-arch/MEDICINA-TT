import type { Questao } from "@/domain/content/types";

const SUB = {
  tb: "inf--tuberculose--diagnostico-e-tratamento",
  sifilis: "inf--infeccoes-sexualmente-transmissiveis--sifilis",
  hiv: "inf--hiv-aids--diagnostico-e-tarv",
  meningite: "inf--meningites--bacteriana-vs-viral",
  dengue: "inf--arboviroses--dengue-classificacao-e-manejo",
  storch: "inf--infeccoes-congenitas--storch-visao-infectologica",
  iras: "inf--infeccoes-relacionadas-a-assistencia-a-saude--prevencao-sitio-cirurgico-cateter-e-c-difficile",
} as const;

const MS_TB = "Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil, atualização vigente; lote editorial revisado em 2026-08-03.";
const MS_IST = "Ministério da Saúde — PCDT para Atenção Integral às Pessoas com IST e PCDT de prevenção da transmissão vertical, versão vigente; lote editorial revisado em 2026-08-03.";
const MS_HIV = "Ministério da Saúde — PCDT para Manejo da Infecção pelo HIV em Adultos e PCDT de PEP/PrEP, versão vigente; lote editorial revisado em 2026-08-03.";
const MS_ARB = "Ministério da Saúde — Guia de Vigilância em Saúde e manejo clínico de dengue, versão vigente; lote editorial revisado em 2026-08-03.";
const MS_CONG = "Ministério da Saúde — protocolos de infecções congênitas e PNI 2026; lote editorial revisado em 2026-08-03.";
const MS_IRAS = "Ministério da Saúde/Anvisa — prevenção e controle de IRAS; CDC/IDSA para algoritmo de C. difficile; lote editorial revisado em 2026-08-03.";

const alt = (letra: string, texto: string, correta: boolean, comentario: string) => ({ letra, texto, correta, comentario });
const q = (id: string, subtemaId: string, enunciado: string, alternativas: ReturnType<typeof alt>[], estilo: Questao["estilo"], tags: string[], fonte: string): Questao => ({ id, subtemaId, disciplinaId: "inf", enunciado, alternativas, dificuldade: "intermediaria", estilo, tags, fonte });

export const QUESTOES_INF_LOTE_01: Questao[] = [
  q("inf-lote01-001", SUB.tb, "Em sintomático respiratório com acesso ao teste rápido molecular, qual exame deve iniciar a investigação de tuberculose pulmonar?", [
    alt("A", "Teste rápido molecular para tuberculose, com avaliação de resistência à rifampicina quando disponível.", true, "O TRM-TB aumenta a rapidez diagnóstica e pode detectar resistência à rifampicina; cultura e teste de sensibilidade continuam importantes conforme o caso."),
    alt("B", "IGRA isolado, porque diferencia doença ativa de infecção latente.", false, "IGRA indica resposta imunológica e não diferencia sozinho tuberculose ativa de infecção latente."),
    alt("C", "Radiografia normal exclui tuberculose pulmonar com segurança.", false, "Radiografia pode ser normal em alguns contextos e não substitui investigação microbiológica quando há suspeita clínica."),
    alt("D", "Sorologia sérica para anticorpos contra o bacilo.", false, "Sorologia não é teste recomendado para confirmar tuberculose pulmonar ativa."),
  ], "diagnostico", ["tuberculose", "TRM-TB"], MS_TB),
  q("inf-lote01-002", SUB.tb, "Paciente com tuberculose pulmonar apresenta escarro positivo e inicia tratamento. Qual princípio evita erro de acompanhamento?", [
    alt("A", "A resposta deve ser acompanhada clinicamente e com avaliação bacteriológica conforme o protocolo, não apenas por melhora da tosse.", true, "Melhora clínica isolada não prova conversão bacteriológica nem exclui resistência ou baixa adesão."),
    alt("B", "Após sete dias sem febre, a investigação pode ser encerrada.", false, "A ausência de febre não encerra o tratamento nem substitui acompanhamento microbiológico."),
    alt("C", "A cultura deve ser omitida porque o TRM já define toda a duração terapêutica.", false, "O TRM ajuda no diagnóstico, mas não substitui todo o acompanhamento e teste de sensibilidade."),
    alt("D", "A radiografia mensal isolada é o melhor marcador de cura.", false, "Imagem evolui mais lentamente e não substitui avaliação bacteriológica e clínica."),
  ], "conduta", ["tuberculose", "seguimento"], MS_TB),
  q("inf-lote01-003", SUB.sifilis, "Gestante com sífilis deve receber penicilina benzatina. Qual afirmação é correta?", [
    alt("A", "A penicilina é o tratamento de escolha na gestação; alergia deve levar a dessensibilização e não a troca por esquema equivalente.", true, "A penicilina é a única opção com eficácia comprovada para prevenir sífilis congênita; gestante alérgica deve ser dessensibilizada."),
    alt("B", "Doxiciclina é preferida porque atravessa melhor a placenta.", false, "Tetraciclinas não são a alternativa preferencial na gestação e não substituem penicilina para prevenção vertical."),
    alt("C", "Azitromicina em dose única é sempre equivalente à penicilina.", false, "Macrolídeos não oferecem confiabilidade suficiente para prevenir transmissão vertical."),
    alt("D", "O tratamento pode ser adiado até o resultado do ultrassom fetal.", false, "Não se deve atrasar tratamento indicado aguardando imagem fetal."),
  ], "conduta", ["sifilis", "gestacao", "transmissao vertical"], MS_IST),
  q("inf-lote01-004", SUB.sifilis, "Recém-nascido de mãe com tratamento inadequado para sífilis apresenta sinais clínicos compatíveis. Qual conduta é mais segura?", [
    alt("A", "Investigar acometimento e tratar com penicilina por esquema de dez dias quando indicado pelo protocolo neonatal.", true, "RN sintomático ou exposto a tratamento materno inadequado exige avaliação completa e tratamento parenteral adequado, não dose isolada automática."),
    alt("B", "Observar sem tratamento se o VDRL neonatal não for quatro vezes maior.", false, "Título não quatro vezes maior não exclui sífilis congênita, sobretudo diante de sintomas e tratamento materno inadequado."),
    alt("C", "Usar apenas amoxicilina oral por cinco dias.", false, "Esse esquema não é o tratamento recomendado para sífilis congênita."),
    alt("D", "Tratar somente se houver febre.", false, "Sífilis congênita pode ser assintomática ou manifestar-se sem febre."),
  ], "conduta", ["sifilis congenita", "recem-nascido"], MS_IST),
  q("inf-lote01-005", SUB.hiv, "Pessoa com HIV em TARV mantém carga viral indetectável de forma sustentada. Qual orientação é correta?", [
    alt("A", "A supressão viral sustentada reduz o risco de transmissão sexual a zero quando os critérios de adesão e acompanhamento são atendidos.", true, "O princípio I=I depende de supressão viral sustentada, adesão e seguimento; não significa abandonar prevenção de outras IST."),
    alt("B", "A carga viral indetectável elimina a necessidade de qualquer seguimento.", false, "Seguimento continua necessário para adesão, toxicidade, comorbidades e outras infecções sexualmente transmissíveis."),
    alt("C", "A TARV deve ser interrompida após duas cargas virais indetectáveis.", false, "Interrupção favorece rebote viral e resistência; não é recomendada por esse motivo."),
    alt("D", "A indetectabilidade impede transmissão por qualquer via, inclusive compartilhamento de agulhas.", false, "I=I refere-se à transmissão sexual; outras vias têm medidas preventivas próprias."),
  ], "conduta", ["HIV", "I=I", "carga viral"], MS_HIV),
  q("inf-lote01-006", SUB.hiv, "Após exposição sexual de risco, quando a PEP para HIV deve ser iniciada?", [
    alt("A", "O mais cedo possível, idealmente nas primeiras horas e até o limite de 72 horas após a exposição.", true, "A PEP é urgência médica e perde efetividade com atraso; deve ser avaliada até 72 horas conforme protocolo."),
    alt("B", "Somente após seis semanas, quando o teste de anticorpos ficar positivo.", false, "Esperar soroconversão perde a janela de prevenção pós-exposição."),
    alt("C", "Apenas se a pessoa-fonte tiver sintomas de AIDS.", false, "A decisão depende do risco da exposição e da avaliação da fonte, não de sintomas tardios."),
    alt("D", "Depois de 30 dias, porque o tratamento precoce aumenta resistência.", false, "O benefício depende do início imediato; não se espera 30 dias."),
  ], "conduta", ["HIV", "PEP", "exposicao"], MS_HIV),
  q("inf-lote01-007", SUB.meningite, "Na suspeita de meningite bacteriana, a tomografia será necessária antes da punção lombar. O que não pode ser atrasado?", [
    alt("A", "Coletar hemoculturas quando possível e iniciar antimicrobiano empírico imediatamente, sem esperar a tomografia.", true, "Quando a punção ou imagem for atrasada, o antimicrobiano não deve esperar; o tratamento precoce reduz morbidade e mortalidade."),
    alt("B", "Aguardar o líquor para decidir se há indicação de antibiótico.", false, "O atraso terapêutico é perigoso em meningite bacteriana suspeita."),
    alt("C", "Iniciar apenas corticoide e reavaliar em 24 horas.", false, "Corticoide não substitui antimicrobiano empírico."),
    alt("D", "Adiar culturas porque o antibiótico sempre invalida qualquer resultado.", false, "Culturas devem ser colhidas rapidamente quando isso não atrasa o tratamento."),
  ], "conduta", ["meningite", "antibiotico", "punçao lombar"], "Ministério da Saúde/IDSA — manejo de meningite bacteriana; revisão editorial 2026-08-03."),
  q("inf-lote01-008", SUB.meningite, "Em adulto com suspeita de meningite bacteriana e fator de risco para Listeria, qual componente deve ser acrescentado ao esquema empírico?", [
    alt("A", "Ampicilina, além da cobertura empírica para pneumococo e meningococo.", true, "Idade avançada, gestação ou imunossupressão aumentam a importância de Listeria, que não é coberta adequadamente por cefalosporina de terceira geração."),
    alt("B", "Metronidazol isolado.", false, "Metronidazol não oferece a cobertura empírica apropriada para Listeria nesse cenário."),
    alt("C", "Oseltamivir isolado.", false, "Antiviral para influenza não substitui cobertura bacteriana em meningite suspeita."),
    alt("D", "Fluconazol em todo adulto com cefaleia.", false, "Antifúngico não é componente universal do esquema bacteriano empírico."),
  ], "conduta", ["meningite", "Listeria", "ampicilina"], "Ministério da Saúde/IDSA — manejo de meningite bacteriana; revisão editorial 2026-08-03."),
  q("inf-lote01-009", SUB.dengue, "Paciente com dengue apresenta dor abdominal intensa e vômitos persistentes no período de queda da febre. Como interpretar?", [
    alt("A", "São sinais de alarme e exigem reavaliação clínica, hematócrito e hidratação guiada pela gravidade.", true, "Dor abdominal intensa e vômitos persistentes podem indicar extravasamento plasmático e evolução para dengue grave."),
    alt("B", "Indicam apenas gastrite associada e não mudam o acompanhamento.", false, "Esses sintomas estão entre os sinais de alarme reconhecidos no manejo da dengue."),
    alt("C", "Confirmam dengue hemorrágica sem necessidade de exame clínico.", false, "Sinais de alarme não equivalem sozinhos a uma classificação completa de dengue grave."),
    alt("D", "Indicam que anti-inflamatório não esteroidal deve ser iniciado.", false, "AINEs aumentam risco hemorrágico e devem ser evitados na dengue."),
  ], "diagnostico", ["dengue", "sinais de alarme"], MS_ARB),
  q("inf-lote01-010", SUB.dengue, "Qual analgésico deve ser evitado na suspeita de dengue por aumentar risco de sangramento e lesão renal?", [
    alt("A", "Ácido acetilsalicílico e outros anti-inflamatórios não esteroidais.", true, "AINEs interferem na hemostasia e podem agravar sangramento ou lesão renal; a analgesia deve seguir protocolo seguro."),
    alt("B", "Paracetamol em dose apropriada.", false, "Paracetamol pode ser usado com atenção à dose e à função hepática, conforme orientação clínica."),
    alt("C", "Medidas físicas para conforto.", false, "Medidas físicas não aumentam risco hemorrágico e podem auxiliar no conforto."),
    alt("D", "Hidratação oral quando tolerada.", false, "Hidratação é parte do manejo e não é analgésico de risco hemorrágico."),
  ], "conduta", ["dengue", "AINE", "sangramento"], MS_ARB),
  q("inf-lote01-011", SUB.storch, "Qual exame confirma infecção congênita por CMV quando coletado nas primeiras três semanas de vida?", [
    alt("A", "PCR para CMV em saliva ou urina, coletada até 21 dias de vida.", true, "A janela precoce ajuda a distinguir infecção congênita de aquisição pós-natal; após ela, amostra neonatal arquivada pode ser necessária."),
    alt("B", "IgG isolada no sangue do lactente aos seis meses.", false, "IgG pode refletir anticorpos maternos e não confirma infecção congênita."),
    alt("C", "Radiografia de tórax normal.", false, "Imagem torácica não confirma CMV congênito."),
    alt("D", "Teste de avidez de IgG do lactente.", false, "Avidez é usada principalmente na interpretação materna, não como confirmação neonatal isolada."),
  ], "diagnostico", ["CMV", "congenito", "PCR"], MS_CONG),
  q("inf-lote01-012", SUB.storch, "Gestante com IgM e IgG positivos para toxoplasmose deve ter a interpretação baseada em qual conjunto?", [
    alt("A", "Cronologia, avidez de IgG, confirmação sorológica, ultrassonografia seriada e avaliação fetal quando indicada.", true, "IgM pode persistir; nenhum resultado isolado define sozinho infecção recente ou infecção fetal."),
    alt("B", "IgM isolada sempre prova infecção adquirida na última semana.", false, "IgM pode persistir por meses e precisa de contexto e confirmação."),
    alt("C", "Ultrassom normal exclui infecção fetal.", false, "Ultrassom normal não exclui completamente infecção fetal ou sequelas futuras."),
    alt("D", "IgG positiva torna desnecessária qualquer avaliação adicional.", false, "IgG indica contato, mas não resolve cronologia ou acometimento fetal."),
  ], "diagnostico", ["toxoplasmose", "gestacao", "avidez"], MS_CONG),
  q("inf-lote01-013", SUB.sifilis, "Em pessoa com úlcera genital única, indolor e de base limpa, qual hipótese deve ser priorizada?", [
    alt("A", "Sífilis primária, sem esquecer investigação laboratorial e tratamento conforme o protocolo.", true, "Cancro duro costuma ser indolor e acompanhado de linfonodomegalia regional; a aparência não substitui testagem."),
    alt("B", "Herpes genital como diagnóstico obrigatório.", false, "Herpes costuma causar vesículas e úlceras dolorosas, mas apresentações variam; não é obrigatório pela descrição."),
    alt("C", "Candidíase invasiva.", false, "Candidíase não é a principal hipótese para úlcera genital única indolor."),
    alt("D", "Úlcera aftosa sem necessidade de investigar IST.", false, "A possibilidade de IST exige avaliação e abordagem de parcerias quando indicada."),
  ], "diagnostico", ["sifilis", "ulcera genital", "IST"], MS_IST),
  q("inf-lote01-014", SUB.hiv, "Pessoa com exposição recorrente ao HIV e risco sexual persistente busca prevenção antes de uma nova exposição. Qual estratégia é apropriada?", [
    alt("A", "Avaliar PrEP, testagem para HIV e IST, função renal e adesão, conforme o esquema disponível e o protocolo vigente.", true, "PrEP é prevenção para pessoas HIV negativas com risco contínuo e exige avaliação clínica e testagem periódica."),
    alt("B", "Usar PEP diariamente por tempo indefinido sem avaliação.", false, "PEP é uma estratégia pós-exposição de duração definida; risco recorrente pede avaliação de PrEP."),
    alt("C", "Iniciar TARV sem confirmar o status sorológico.", false, "TARV trata infecção pelo HIV; prevenção exige confirmar status e escolher estratégia adequada."),
    alt("D", "Apenas reduzir a frequência de testes, pois o risco é comportamental.", false, "Reduzir testagem não previne infecção e pode atrasar diagnóstico."),
  ], "conduta", ["HIV", "PrEP", "prevencao combinada"], MS_HIV),
  q("inf-lote01-015", SUB.iras, "Qual medida tem maior impacto transversal para interromper transmissão de microrganismos em serviços de saúde?", [
    alt("A", "Higienização das mãos nos momentos indicados, com técnica e produto adequados.", true, "A higiene das mãos é medida central para interromper transmissão cruzada e deve ser combinada a precauções padrão e específicas."),
    alt("B", "Usar luvas substituindo higienização das mãos.", false, "Luvas não substituem higiene antes e depois do contato e podem transmitir contaminação."),
    alt("C", "Prescrever antibiótico profilático para toda internação.", false, "Profilaxia indiscriminada aumenta eventos adversos e resistência e não previne transmissão cruzada."),
    alt("D", "Manter portas fechadas em todas as enfermarias.", false, "Porta fechada pode ser necessária em situações específicas, mas não substitui higiene das mãos."),
  ], "conduta", ["IRAS", "higiene das mãos", "prevencao"], MS_IRAS),
  q("inf-lote01-016", SUB.iras, "Paciente com diarreia clinicamente significativa após antibiótico deve ser investigado para C. difficile. Qual prática é inadequada?", [
    alt("A", "Testar pacientes sem diarreia apenas porque estão internados.", true, "Testar assintomáticos aumenta detecção de colonização e pode levar a diagnóstico e tratamento inadequados."),
    alt("B", "Usar algoritmo laboratorial institucional em fezes não formadas.", false, "A interpretação combinada de contexto e testes faz parte da abordagem diagnóstica."),
    alt("C", "Rever antibióticos desnecessários e medidas de contato quando houver suspeita.", false, "Revisão de antimicrobianos e precaução de contato são medidas importantes."),
    alt("D", "Distinguir colonização de doença clínica antes de tratar.", false, "O diagnóstico requer síndrome clínica compatível, não apenas detecção do organismo."),
  ], "diagnostico", ["C. difficile", "diarreia", "IRAS"], MS_IRAS),
  q("inf-lote01-017", SUB.tb, "Em contato domiciliar de caso de tuberculose pulmonar, qual avaliação inicial é essencial?", [
    alt("A", "Investigar sintomas, realizar teste indicado para infecção e excluir doença ativa antes de tratar infecção latente.", true, "O portão de segurança é não tratar como latente alguém que ainda pode ter doença ativa."),
    alt("B", "Iniciar tratamento de infecção latente sem perguntar sobre sintomas.", false, "Sintomas e avaliação clínica são necessários para não perder doença ativa."),
    alt("C", "Fazer apenas hemograma e encerrar a avaliação.", false, "Hemograma não exclui tuberculose ativa nem define infecção latente."),
    alt("D", "Considerar o contato protegido se não houver tosse no primeiro dia.", false, "Ausência de tosse isolada não exclui infecção ou doença."),
  ], "conduta", ["tuberculose", "contato", "infecçao latente"], MS_TB),
  q("inf-lote01-018", SUB.sifilis, "Após tratamento de sífilis, qual componente é indispensável para verificar resposta e reinfecção?", [
    alt("A", "Seguimento clínico e sorológico quantitativo, com avaliação de adesão e novas exposições.", true, "A queda esperada do título e a identificação de nova exposição orientam resposta, falha ou reinfecção."),
    alt("B", "Repetir apenas teste treponêmico, que permanece negativo após cura.", false, "Testes treponêmicos podem permanecer reagentes e não são o melhor marcador quantitativo de resposta."),
    alt("C", "Suspender acompanhamento se a lesão desaparecer.", false, "A melhora clínica não exclui persistência, falha ou reinfecção."),
    alt("D", "Usar PCR de sangue como único marcador em todos os casos.", false, "PCR não é o marcador universal de resposta ao tratamento."),
  ], "conduta", ["sifilis", "seguimento", "VDRL"], MS_IST),
  q("inf-lote01-019", SUB.dengue, "Na dengue com sinais de alarme, qual princípio orienta a hidratação?", [
    alt("A", "Cristaloide isotônico com reavaliação clínica e hematócrito seriados, ajustando volume à resposta e ao extravasamento.", true, "Hidratação deve ser individualizada; excesso pode causar sobrecarga quando o extravasamento regride."),
    alt("B", "Infundir grande volume fixo até normalizar completamente o hematócrito.", false, "Volume fixo e alvo isolado podem causar sobrecarga e não substituem avaliação clínica."),
    alt("C", "Evitar qualquer líquido intravenoso porque a dengue é viral.", false, "Sinais de alarme podem exigir hidratação parenteral e monitorização."),
    alt("D", "Usar coloide como primeira escolha em todos os pacientes.", false, "Cristaloides são a base inicial na maioria dos cenários; coloide fica para situações específicas."),
  ], "conduta", ["dengue", "hidratacao", "sinais de alarme"], MS_ARB),
  q("inf-lote01-020", SUB.storch, "Recém-nascido de mãe HBsAg positiva deve receber qual medida no nascimento?", [
    alt("A", "Vacina contra hepatite B e imunoglobulina específica, em locais anatômicos distintos, o mais cedo possível.", true, "A imunoprofilaxia combinada reduz transmissão vertical e deve ser feita conforme o calendário técnico vigente."),
    alt("B", "Somente vacina aos dois meses.", false, "Adiar perde a janela de prevenção da transmissão perinatal."),
    alt("C", "Somente imunoglobulina sem iniciar vacinação.", false, "A proteção exige completar o esquema vacinal além da imunoglobulina inicial."),
    alt("D", "Aguardar carga viral materna para decidir.", false, "A conduta neonatal não deve aguardar carga viral quando o status HBsAg é conhecido."),
  ], "conduta", ["hepatite B", "transmissao vertical", "recem-nascido"], MS_CONG),
];
