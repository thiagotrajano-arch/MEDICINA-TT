import type { ConteudoSubtema } from "@/domain/content/types";

const ID = "inf--antibioticoterapia--principios-de-antibioticoterapia-empirica";

/** Síntese autoral: uso racional, classes e resistência; não substitui protocolo local. */
export const CONTEUDOS_ANTIBIOTICOTERAPIA: Record<string, ConteudoSubtema> = {
  [ID]: {
    subtemaId: ID,
    titulo: "Antibioticoterapia: escolha, uso racional e resistência",
    atualizadoEm: "2026-08-15",
    origem: "atualizacao_diretriz",
    blocos: [
      {
        secao: "Objetivos",
        corpo: "Ao terminar, você deve conseguir: distinguir infecção de colonização, escolher um empírico pelo foco e pela gravidade, coletar culturas sem atrasar uma emergência, ajustar a terapia por função renal/hepática e descalonar quando houver dados microbiológicos.",
      },
      {
        secao: "Pré-requisitos",
        corpo: "Revisar microbiologia básica, síndromes infecciosas, interpretação de Gram/cultura/antibiograma, sepse e princípios de farmacocinética/farmacodinâmica.",
      },
      {
        secao: "Síntese OMED",
        corpo: "Antibiótico não trata febre isolada. A sequência de prova é: **1)** confirmar probabilidade de infecção bacteriana; **2)** identificar foco, gravidade e hospedeiro; **3)** colher culturas se isso não atrasar a primeira dose; **4)** iniciar empírico proporcional ao risco; **5)** reavaliar em 48–72 h; **6)** descalonar, trocar para via oral ou suspender quando a evidência permitir. Controle de foco e suporte de órgão são partes do tratamento, não etapas opcionais.",
      },
      {
        secao: "Anatomia e fisiologia relevante",
        corpo: "A distribuição do fármaco depende do compartimento infectado: abscesso, osso, SNC, pulmão, urina e bile têm barreiras e concentrações diferentes. Drenagem, retirada de cateter ou desbridamento podem ser necessários para que a concentração antimicrobiana seja efetiva.",
      },
      {
        secao: "Fisiopatologia",
        corpo: "A pressão seletiva elimina bactérias sensíveis e favorece subpopulações resistentes. Dose insuficiente, duração excessiva, espectro desnecessariamente amplo e exposição repetida aumentam esse efeito; a resistência também se dissemina por elementos genéticos móveis entre bactérias.",
      },
      {
        secao: "Epidemiologia e fatores de risco",
        corpo: "Risco de resistência aumenta com antibiótico recente, internação prolongada, dispositivo invasivo, colonização prévia, infecção associada à assistência, imunossupressão e epidemiologia local. O antibiograma do serviço e os padrões regionais devem pesar mais que uma lista universal.",
      },
      {
        secao: "Classes, mecanismo e espectro",
        corpo: `| Classe | Alvo/mecanismo | Ponto de estudo |
|---|---|---|
| Penicilinas e cefalosporinas | Parede bacteriana, PBPs | Espectro varia por geração; alergia e betalactamase mudam a escolha |
| Carbapenêmicos | Parede bacteriana, amplo espectro | Reservar para indicações justificadas, especialmente Gram-negativos produtores de ESBL |
| Macrolídeos | Síntese proteica 50S | Patógenos respiratórios/atípicos; atenção a QT e interações |
| Tetraciclinas | Síntese proteica 30S | Patógenos intracelulares e algumas resistências; restrições etárias/gestação |
| Aminoglicosídeos | Síntese proteica 30S | Bactericidas, dependem de monitorização e têm nefro/ototoxicidade |
| Fluoroquinolonas | DNA girase/topoisomerase | Boa penetração, mas efeitos adversos e pressão seletiva limitam uso |
| Glicopeptídeos | Parede bacteriana | Vancomicina para Gram-positivos selecionados; monitorar exposição |
| Oxazolidinonas | Síntese proteica 50S | Linezolida cobre alguns Gram-positivos resistentes; atenção a mielossupressão/interações |
| Lipopeptídeos | Despolarização de membrana | Daptomicina não deve ser usada em pneumonia |
| Nitroimidazóis | Dano ao DNA em anaeróbios | Metronidazol cobre anaeróbios selecionados; não substitui cobertura para aeróbios |

O espectro nominal nunca substitui foco, antibiograma, penetração tecidual e segurança do paciente.`,
      },
      {
        secao: "Diagnóstico e diferenciais",
        corpo: "Antes de trocar ou ampliar o esquema, reavalie: diagnóstico alternativo não infeccioso, colonização em vez de infecção, foco não controlado, dose/intervalo inadequados, penetração insuficiente, adesão e novo foco. Culturas devem ser interpretadas com o quadro clínico; um resultado isolado não transforma colonização em infecção.",
      },
      {
        secao: "Exames e interpretação",
        corpo: "Colete culturas pertinentes antes do antibiótico quando isso não atrasar uma emergência. Use Gram, cultura e antibiograma para estreitar o esquema; testes moleculares podem acelerar a identificação de mecanismos, mas não dispensam correlação clínica. Documente foco, hora da coleta, hora da primeira dose e plano de reavaliação.",
      },
      {
        secao: "Tratamento e conduta",
        corpo: "Empírico grave = foco + gravidade + hospedeiro + epidemiologia local. Em choque/sepse, iniciar rapidamente e controlar o foco. Em estabilidade, evite ampliar sem indicação. Na reavaliação, suspenda se infecção não for sustentada, descalone para o agente mais estreito, troque para via oral quando absorção e estado clínico permitirem e use a menor duração eficaz validada para o foco.",
      },
      {
        secao: "Posologia e ajuste",
        corpo: "A dose é individual: peso, função renal/hepática, gravidade, volume de distribuição, MIC e local da infecção. Betalactâmicos são tempo-dependentes e podem exigir infusão prolongada em protocolos de infecção grave; vancomicina requer monitorização de exposição quando disponível; aminoglicosídeos exigem atenção a níveis e intervalo. Nunca copie uma dose sem conferir bula, protocolo institucional e população (adulto, criança, gestante ou insuficiência orgânica).",
      },
      {
        secao: "Resistência e terapia dirigida",
        corpo: "ESBL, AmpC, CRE, MRSA, VRE, CRAB e *Pseudomonas* com resistência difícil exigem decisão dirigida por espécie, sítio e sensibilidade. A orientação IDSA para Gram-negativos resistentes fornece opções preferenciais por mecanismo, mas ressalta que colonização não deve ser tratada e que a epidemiologia/registro local importa. Não use polimixina, carbapenêmico ou combinação ampla por reflexo; discuta com infectologia/CCIH quando o caso for complexo.",
      },
      {
        secao: "Complicações e prognóstico",
        corpo: "Eventos importantes: alergia/anafilaxia, lesão renal, hepatotoxicidade, citopenias, QT longo, tendinopatia, neurotoxicidade e infecção por *Clostridioides difficile*. O risco cresce com exposição desnecessária e com cursos prolongados. Reavalie diariamente a necessidade, a via, a dose e a duração.",
      },
      {
        secao: "Armadilhas de prova",
        corpo: "- Febre persistente não prova resistência: procure foco não drenado e diagnóstico alternativo.\n- Daptomicina não trata pneumonia.\n- Carbapenêmico não é resposta automática para toda bactéria resistente; espécie, sítio e sensibilidade importam.\n- Alergia vaga à penicilina não equivale a anafilaxia documentada; investigar evita alternativas piores.\n- Antibioticoprofilaxia cirúrgica é indicação específica e não deve virar tratamento prolongado.\n- Descalonamento é parte do tratamento correto, não uma perda de potência.",
      },
      {
        secao: "Mapa mental",
        corpo: "**Suspeita clínica** → confirmar foco e gravidade → coletar culturas sem atrasar emergência → empírico proporcional ao risco → suporte + controle de foco → reavaliar em 48–72 h → **descalonar / via oral / suspender** → registrar duração e monitorar toxicidade.\n\n**Resistência** → identificar mecanismo e sítio → conferir antibiograma/MIC → escolher opção dirigida → ajustar por órgão e PK/PD → envolver CCIH/infectologia quando necessário.",
      },
      {
        secao: "Questões de fixação",
        corpo: "Resolva as questões do subtema logo após a leitura; a fila inclui descalonamento, controle de foco, resistência, alergia, posologia e stewardship.",
      },
      {
        secao: "Casos relacionados",
        corpo: "Treine dois casos: sepse com foco controlável e cultura que permite descalonamento; infecção urinária por Gram-negativo produtor de ESBL com decisão dirigida por antibiograma.",
      },
    ],
    referencias: [
      "IDSA. 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections. https://www.idsociety.org/practice-guideline/amr-guidance",
      "WHO. The WHO AWaRe antibiotic book. https://www.who.int/publications/i/item/9789240062382",
      "WHO. AWaRe classification of antibiotics, 2023. https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.04",
      "ANVISA. Programa de Gerenciamento de Antimicrobianos em Hospitais do SUS (PeGASUS). https://www.gov.br/anvisa/pt-br/assuntos/servicosdesaude/prevencao-e-controle-de-infeccao-e-resistencia-microbiana/projetos-gvims/pegasus",
    ],
  },
};
