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
import { CONTEUDOS_REUMATO } from "./conteudos/reumato";
import { CONTEUDOS_ENDOCRINO } from "./conteudos/endocrino";
import { CONTEUDOS_GASTRO } from "./conteudos/gastro";
import { CONTEUDOS_HEMATO } from "./conteudos/hemato";
import { CONTEUDOS_NEFRO } from "./conteudos/nefro";
import { CONTEUDOS_GASTRO_EXTRA } from "./conteudos/gastro-extra";
import { CONTEUDOS_REUMATO_EXTRA } from "./conteudos/reumato-extra";
import { CONTEUDOS_ONCO } from "./conteudos/onco";
import { CONTEUDOS_OTORRINO } from "./conteudos/otorrino";
import { CONTEUDOS_DERMA } from "./conteudos/derma";
import { CONTEUDOS_NEURO_SEMANA, CONTEUDOS_PSIQ } from "./conteudos/neuropsiquiatria-semana";
import { CONTEUDOS_NEUROPSIQ_RECENTES } from "./conteudos/neuropsiquiatria-recentes";
import { CONTEUDOS_OMED_EXTRAIDOS } from "./omed-extraidos";
import { CONTEUDOS_ANTIBIOTICOTERAPIA } from "./conteudos/antibioticoterapia";
import { CONTEUDOS_GASTRO_HEMORRAGIA } from "./conteudos/gastro-hemorragia";
import { CONTEUDOS_DOENCAS_INFLAMATORIAS_INTESTINAIS } from "./conteudos/doencas-inflamatorias-intestinais";
import { CONTEUDOS_MENINGITES_ENCEFALITES } from "./conteudos/meningites-encefalites";

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
  ...CONTEUDOS_ANTIBIOTICOTERAPIA,
  ...CONTEUDOS_GASTRO_HEMORRAGIA,
  ...CONTEUDOS_DOENCAS_INFLAMATORIAS_INTESTINAIS,
  ...CONTEUDOS_MENINGITES_ENCEFALITES,
  ...CONTEUDOS_CIR,
  ...CONTEUDOS_MFC,
  ...CONTEUDOS_ESTRATEGIA_GO,
  ...CONTEUDOS_ESTRATEGIA_PED,
  ...CONTEUDOS_ESTRATEGIA_INF_MFC,
  ...CONTEUDOS_ESTRATEGIA_EXTRAS,
  ...CONTEUDOS_CARDIO,
  ...CONTEUDOS_PNEUMO,
  ...CONTEUDOS_NEURO,
  ...CONTEUDOS_REUMATO,
  ...CONTEUDOS_ENDOCRINO,
  ...CONTEUDOS_GASTRO,
  ...CONTEUDOS_HEMATO,
  ...CONTEUDOS_NEFRO,
  ...CONTEUDOS_GASTRO_EXTRA,
  ...CONTEUDOS_REUMATO_EXTRA,
  ...CONTEUDOS_ONCO,
  ...CONTEUDOS_OTORRINO,
  ...CONTEUDOS_DERMA,
  ...CONTEUDOS_NEURO_SEMANA,
  ...CONTEUDOS_PSIQ,
  ...CONTEUDOS_NEUROPSIQ_RECENTES,
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
