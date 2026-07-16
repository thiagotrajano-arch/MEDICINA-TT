import type { ConteudoSubtema } from "@/domain/content/types";
import { CONTEUDOS_GO } from "./conteudos/go";
import { CONTEUDOS_PED } from "./conteudos/pediatria";
import { CONTEUDOS_INF } from "./conteudos/infectologia";
import { CONTEUDOS_CIR } from "./conteudos/cirurgia";
import { CONTEUDOS_MFC } from "./conteudos/mfc";

/**
 * Resumos — agregador.
 *
 * Organizados em módulos por disciplina (./conteudos/<disc>.ts), na mesma
 * lógica do banco de questões. Cada resumo segue a estrutura de seções fixa
 * do briefing (Definição → Fisiopatologia → ... → Pontos de prova).
 *
 * `origem` registra a procedência: 'usuario_original' (material do usuário,
 * preservado e nunca sobrescrito), 'complemento_ia', 'atualizacao_diretriz'
 * ou 'edicao_manual'.
 *
 * Para adicionar uma disciplina: crie ./conteudos/<disc>.ts exportando
 * `CONTEUDOS_<DISC>: Record<string, ConteudoSubtema>` e inclua-o abaixo.
 */
export const CONTEUDOS: Record<string, ConteudoSubtema> = {
  ...CONTEUDOS_GO,
  ...CONTEUDOS_PED,
  ...CONTEUDOS_INF,
  ...CONTEUDOS_CIR,
  ...CONTEUDOS_MFC,
};
