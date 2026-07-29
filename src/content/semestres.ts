/**
 * Estrutura pública de orientação. Não contém matrícula, desempenho, planos,
 * documentos ou qualquer outro dado curricular individual.
 */
export interface CicloFormacao {
  id: string;
  titulo: string;
  periodos: string;
  objetivo: string;
  eixos: string[];
}

export const CICLOS_FORMACAO: CicloFormacao[] = [
  {
    id: "fundamentos",
    titulo: "Fundamentos e habilidades",
    periodos: "1º ao 4º período",
    objetivo: "Construir bases biomédicas, comunicação clínica e raciocínio em saúde coletiva.",
    eixos: ["Ciências básicas", "Habilidades clínicas", "Atenção primária", "Urgência inicial"],
  },
  {
    id: "ciclo-clinico",
    titulo: "Ciclo clínico",
    periodos: "5º ao 8º período",
    objetivo: "Integrar mecanismos, diagnóstico, condutas e prática supervisionada em cenários clínicos.",
    eixos: ["Clínica médica", "Cirurgia", "Saúde da mulher", "Saúde da criança"],
  },
  {
    id: "internato",
    titulo: "Internato e prática avançada",
    periodos: "9º ao 12º período",
    objetivo: "Consolidar decisões clínicas, cuidado longitudinal, urgências e trabalho em equipe.",
    eixos: ["Rodízios clínicos", "Urgências", "Atenção básica", "Eletivos e revisão"],
  },
];
