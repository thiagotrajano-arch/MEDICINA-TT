import type { Questao } from "@/domain/content/types";

const SUBTEMA = "gastro--hemorragia-digestiva--diagnostico-e-conduta";
const FONTE =
  "ESGE Guideline — Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: update 2021: https://www.esge.com/endoscopic-diagnosis-and-management-of-nonvariceal-upper-gastrointestinal-hemorrhage-esge-update-2021 (acesso em 2026-08-22)";

export const QUESTOES_HEMORRAGIA_DIGESTIVA: Questao[] = [
  {
    id: "gastro-hemorragia-001",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Adulto com melena, pressão normal e sem comorbidades apresenta Glasgow-Blatchford Score igual a 1 após avaliação inicial. Qual interpretação é mais adequada?",
    alternativas: [
      { letra: "A", texto: "É um paciente de muito baixo risco, que pode ser considerado para manejo ambulatorial com endoscopia programada, desde que a avaliação clínica e a estrutura local sejam adequadas.", correta: true, comentario: "Correta. A ESGE considera GBS 0–1 uma faixa de muito baixo risco, sem substituir julgamento clínico, reavaliação e organização de seguimento." },
      { letra: "B", texto: "O escore confirma sangramento varicoso e indica ligadura imediata.", correta: false, comentario: "O GBS estratifica risco antes da endoscopia; não identifica sozinho a etiologia varicosa." },
      { letra: "C", texto: "O paciente deve receber alta sem orientação ou retorno porque o risco é zero.", correta: false, comentario: "Muito baixo risco não significa risco zero; orientação, segurança e seguimento continuam necessários." },
      { letra: "D", texto: "O resultado obriga endoscopia em até 1 hora, independentemente da estabilidade.", correta: false, comentario: "A recomendação geral é endoscopia precoce após ressuscitação, em até 24 horas; urgência extrema depende do contexto clínico." },
    ],
    dificuldade: "intermediaria",
    estilo: "diagnostico",
    fonte: FONTE,
    tags: ["hemorragia digestiva alta", "Glasgow-Blatchford", "estratificação de risco"],
  },
  {
    id: "gastro-hemorragia-002",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Paciente com hemorragia digestiva alta não varicosa foi ressuscitado e a endoscopia mostra úlcera com sangramento ativo em jato. Qual abordagem endoscópica é recomendada?",
    alternativas: [
      { letra: "A", texto: "Injeção de epinefrina isoladamente, sem outra modalidade de hemostasia.", correta: false, comentario: "A epinefrina isolada não é recomendada para sangramento ativo de úlcera; deve ser associada a uma segunda modalidade hemostática." },
      { letra: "B", texto: "Terapia combinada com epinefrina e uma segunda modalidade, como terapia térmica de contato ou método mecânico.", correta: true, comentario: "Correta. Para sangramento ativo Forrest Ia/Ib, a ESGE recomenda epinefrina associada a segunda modalidade hemostática." },
      { letra: "C", texto: "Nenhuma intervenção, pois todo sangramento ativo cessa espontaneamente após a endoscopia diagnóstica.", correta: false, comentario: "Sangramento ativo tem alto risco de persistência ou ressangramento e requer hemostasia endoscópica." },
      { letra: "D", texto: "Apenas biópsia da borda da úlcera, adiando hemostasia até o resultado anatomopatológico.", correta: false, comentario: "A prioridade é controlar o sangramento; investigação etiológica não deve atrasar a hemostasia." },
    ],
    dificuldade: "intermediaria",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["úlcera sangrante", "Forrest Ia", "hemostasia endoscópica"],
  },
  {
    id: "gastro-hemorragia-003",
    subtemaId: SUBTEMA,
    disciplinaId: "gastro",
    enunciado: "Após hemostasia endoscópica de úlcera péptica, o paciente volta a apresentar melena e instabilidade. A nova endoscopia confirma ressangramento e a segunda tentativa de hemostasia falha. Qual é o próximo passo recomendado?",
    alternativas: [
      { letra: "A", texto: "Repetir indefinidamente a mesma injeção e observar por 72 horas.", correta: false, comentario: "Após falha da segunda tentativa endoscópica, é necessário avançar para controle radiológico ou cirúrgico conforme disponibilidade." },
      { letra: "B", texto: "Considerar embolização angiográfica transcateter; cirurgia fica indicada se a embolização não estiver disponível ou falhar.", correta: true, comentario: "Correta. Essa é a sequência recomendada pela ESGE para ressangramento refratário após nova tentativa endoscópica." },
      { letra: "C", texto: "Suspender toda reposição e iniciar dieta oral para testar tolerância.", correta: false, comentario: "A instabilidade e o ressangramento exigem reanimação e controle definitivo da fonte, não dieta oral." },
      { letra: "D", texto: "Dar alta se a hemoglobina ainda estiver acima de 10 g/dL.", correta: false, comentario: "A decisão é clínica e depende do controle do sangramento e da estabilidade; hemoglobina isolada não autoriza alta." },
    ],
    dificuldade: "avancada",
    estilo: "conduta",
    fonte: FONTE,
    tags: ["ressangramento", "embolização angiográfica", "úlcera péptica"],
  },
];
