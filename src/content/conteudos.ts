import type { ConteudoSubtema } from "@/domain/content/types";
import { CONTEUDOS_GO } from "./conteudos/go";
import { CONTEUDOS_PED } from "./conteudos/pediatria";
import { CONTEUDOS_INF } from "./conteudos/infectologia";
import { CONTEUDOS_CIR } from "./conteudos/cirurgia";
import { CONTEUDOS_MFC } from "./conteudos/mfc";
import { CONTEUDOS_ESTRATEGIA_GO } from "./conteudos/estrategia-go";
import { CONTEUDOS_ESTRATEGIA_PED } from "./conteudos/estrategia-ped";
import { CONTEUDOS_ESTRATEGIA_INF_MFC } from "./conteudos/estrategia-inf-mfc";
import { CONTEUDOS_ESTRATEGIA_EXTRAS } from "./conteudos/estrategia-extras";
import { CONTEUDOS_CARDIO } from "./conteudos/cardio";
import { CONTEUDOS_PNEUMO } from "./conteudos/pneumo";
import { CONTEUDOS_NEURO } from "./conteudos/neuro";
import { CONTEUDOS_OMED_EXTRAIDOS } from "./omed-extraidos";

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
const CONTEUDOS_BASE: Record<string, ConteudoSubtema> = {
  ...CONTEUDOS_GO,
  ...CONTEUDOS_PED,
  ...CONTEUDOS_INF,
  ...CONTEUDOS_CIR,
  ...CONTEUDOS_MFC,
  ...CONTEUDOS_ESTRATEGIA_GO,
  ...CONTEUDOS_ESTRATEGIA_PED,
  ...CONTEUDOS_ESTRATEGIA_INF_MFC,
  ...CONTEUDOS_ESTRATEGIA_EXTRAS,
  ...CONTEUDOS_CARDIO,
  ...CONTEUDOS_PNEUMO,
  ...CONTEUDOS_NEURO,
};

export const CONTEUDOS: Record<string, ConteudoSubtema> = Object.fromEntries(
  new Set([...Object.keys(CONTEUDOS_BASE), ...Object.keys(CONTEUDOS_OMED_EXTRAIDOS)])
    .values()
    .map((id) => {
      const base = CONTEUDOS_BASE[id];
      const extraido = CONTEUDOS_OMED_EXTRAIDOS[id];
      if (!base) return [id, extraido];
      if (!extraido) return [id, base];
      return [
        id,
        {
          ...base,
          atualizadoEm: extraido.atualizadoEm,
          blocos: [...base.blocos, ...extraido.blocos],
          referencias: [...new Set([...base.referencias, ...extraido.referencias])],
        },
      ];
    })
);
