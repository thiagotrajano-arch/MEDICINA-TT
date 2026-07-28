export type StatusSemestre = "aguardando-documentos" | "em-organizacao" | "pronto";

export interface SemestreCurso {
  id: string;
  numero: number;
  titulo: string;
  status: StatusSemestre;
  disciplinas: string[];
  documentos: number;
  objetivo: string;
}

const criarSemestre = (numero: number): SemestreCurso => ({
  id: `semestre-${numero}`,
  numero,
  titulo: `${numero}º semestre`,
  status: "aguardando-documentos",
  disciplinas: [],
  documentos: 0,
  objetivo:
    "Aguardando matriz curricular, planos de ensino, cronogramas e materiais enviados pelo estudante.",
});

export const SEMESTRES: SemestreCurso[] = Array.from({ length: 12 }, (_, indice) =>
  criarSemestre(indice + 1),
);
