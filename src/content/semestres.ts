export type StatusSemestre = "concluido" | "em-curso" | "futuro";

export interface SemestreCurso {
  id: string;
  numero: number;
  titulo: string;
  status: StatusSemestre;
  disciplinas: string[];
  planosLidos: number;
  objetivo: string;
}

const semestre = (
  numero: number,
  status: StatusSemestre,
  disciplinas: string[],
  objetivo: string,
  planosLidos = 0,
): SemestreCurso => ({
  id: `semestre-${numero}`,
  numero,
  titulo: `${numero}º semestre`,
  status,
  disciplinas,
  planosLidos,
  objetivo,
});

export const SEMESTRES: SemestreCurso[] = [
  semestre(1, "concluido", ["Atenção Primária I", "Bases Biológicas da Prática Médica I", "Bases Complementares da Medicina I", "Habilidades Clínicas da Prática Médica I", "Urgência e Emergência I"], "Componentes aproveitados por equivalência no histórico acadêmico."),
  semestre(2, "concluido", ["Atenção Primária II", "Bases Biológicas da Prática Médica II", "Bases Complementares da Medicina II", "Cirurgia I", "Habilidades Clínicas da Prática Médica II"], "Componentes aproveitados por equivalência no histórico acadêmico."),
  semestre(3, "concluido", ["Atenção Primária III", "Bases Biológicas da Prática Médica III", "Bases Complementares da Medicina III", "Habilidades Clínicas da Prática Médica III", "Urgência e Emergência II"], "Componentes aproveitados por equivalência no histórico acadêmico."),
  semestre(4, "concluido", ["Atenção Primária IV", "Bases Biológicas da Prática Médica IV", "Bases Complementares da Medicina IV", "Habilidades Clínicas da Prática Médica IV", "Urgência e Emergência III"], "Componentes aproveitados por equivalência no histórico acadêmico."),
  semestre(5, "em-curso", ["Atenção Primária V", "Bases Biológicas da Prática Médica V", "Bases Biológicas da Prática Médica VI", "Bases Complementares da Medicina V", "Cirurgia II", "Habilidades Clínicas da Prática Médica V", "Habilidades Clínicas da Prática Médica VI"], "Componentes restantes aparecem na matrícula atual; cinco planos de ensino já foram lidos no SISCAD.", 5),
  semestre(6, "em-curso", ["Atenção Primária VI", "Bases Biológicas da Prática Médica VII", "Bases Biológicas da Prática Médica VIII", "Bases Complementares da Medicina VI", "Cirurgia III", "Habilidades Clínicas da Prática Médica VII", "Habilidades Clínicas da Prática Médica VIII"], "Período acadêmico atual. A maior parte já foi aprovada; Bases Complementares VI permanece na matrícula atual.", 1),
  semestre(7, "futuro", ["Atenção Primária VII", "Bases Biológicas da Prática Médica IX", "Bases Biológicas da Prática Médica X", "Bases Complementares da Medicina VII", "Cirurgia IV", "Habilidades Clínicas da Prática Médica IX", "Habilidades Clínicas da Prática Médica X"], "Próximo ciclo pré-internato previsto na semestralização oficial."),
  semestre(8, "futuro", ["Atenção Primária VIII", "Bases Biológicas da Prática Médica XI", "Bases Biológicas da Prática Médica XII", "Bases Complementares da Medicina VIII", "Habilidades Clínicas da Prática Médica XI", "Habilidades Clínicas da Prática Médica XII", "Urgência e Emergência IV"], "Fechamento do ciclo pré-internato previsto na semestralização oficial."),
  semestre(9, "futuro", ["Estágio em Cirurgia I", "Estágio em Clínica Médica I", "Estágio em Saúde da Mulher I", "Urgências Cirúrgicas", "Urgências Clínicas"], "Início do internato, condicionado aos pré-requisitos curriculares."),
  semestre(10, "futuro", ["Especialidade Eletiva", "Atenção Básica / MFC I", "Atenção Básica / MFC II", "Estágio em Pediatria I", "Urgências Pediátricas"], "Internato com Atenção Básica, Pediatria e estágio eletivo."),
  semestre(11, "futuro", ["Estágio em Cirurgia II", "Estágio em Clínica Médica II", "Estágio em Saúde da Mulher II", "Urgências Ginecológicas e Obstétricas"], "Internato avançado em grandes áreas clínicas e cirúrgicas."),
  semestre(12, "futuro", ["Atenção Básica / MFC III", "Atenção Básica / MFC IV", "Estágio em Pediatria II"], "Conclusão do internato e dos componentes finais do curso."),
];
