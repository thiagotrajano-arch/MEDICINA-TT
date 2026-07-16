import type { Questao } from "@/domain/content/types";
import { QUESTOES_GO } from "./questoes/go";
import { QUESTOES_PED } from "./questoes/pediatria";

/**
 * Banco de questões — agregador.
 *
 * As questões são organizadas em módulos por disciplina (./questoes/<disc>.ts),
 * transcritas fielmente dos materiais do usuário com gabarito e comentários
 * conferidos. Este arquivo apenas reúne todos os módulos num único array.
 *
 * Para adicionar uma disciplina: crie ./questoes/<disc>.ts exportando um
 * `QUESTOES_<DISC>: Questao[]` e inclua-o no spread abaixo.
 */
export const QUESTOES: Questao[] = [
  ...QUESTOES_GO,
  ...QUESTOES_PED,
];
