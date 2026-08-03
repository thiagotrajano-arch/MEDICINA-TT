import type { Questao } from "@/domain/content/types";
import { QUESTOES_GO } from "./questoes/go";
import { QUESTOES_GO_LOTE_01 } from "./questoes/go-lote-01";
import { QUESTOES_PED } from "./questoes/pediatria";
import { QUESTOES_CIR } from "./questoes/cirurgia";
import { QUESTOES_INF } from "./questoes/infectologia";
import { QUESTOES_INF_LOTE_01 } from "./questoes/infectologia-lote-01";
import { QUESTOES_MFC } from "./questoes/mfc";
import { QUESTOES_ORIGINAIS } from "./questoes/originais";
import { QUESTOES_OMED_EXTRAIDAS } from "./omed-extraidos";
import { QUESTOES_PENDENTES_EXTRAIDAS } from "./questoes/pendentes-extraidas";
import { QUESTOES_CARDIO } from "./questoes/cardio";
import { QUESTOES_PNEUMO } from "./questoes/pneumo";
import { QUESTOES_NEURO } from "./questoes/neuro";
import { QUESTOES_OMEDV_2025 } from "./questoes/omedv-2025";
import { QUESTOES_REUMATO } from "./questoes/reumato";
import { QUESTOES_ENDOCRINO } from "./questoes/endocrino";
import { QUESTOES_GASTRO } from "./questoes/gastro";
import { QUESTOES_HEMATO } from "./questoes/hemato";
import { QUESTOES_NEFRO } from "./questoes/nefro";
import { QUESTOES_GASTRO_EXTRA } from "./questoes/gastro-extra";
import { QUESTOES_REUMATO_EXTRA } from "./questoes/reumato-extra";
import { QUESTOES_ONCO } from "./questoes/onco";
import { QUESTOES_OTORRINO } from "./questoes/otorrino";
import { QUESTOES_DERMA } from "./questoes/derma";

/**
 * Banco de questões — agregador.
 *
 * Módulos por disciplina (./questoes/<disc>.ts): questões transcritas dos
 * materiais do usuário com gabarito e comentários conferidos, mais o módulo
 * `originais.ts` com questões inéditas escritas para a plataforma.
 *
 * Para adicionar uma disciplina: crie ./questoes/<disc>.ts exportando um
 * `QUESTOES_<DISC>: Questao[]` e inclua-o no spread abaixo.
 */
export const QUESTOES: Questao[] = [
  ...QUESTOES_GO,
  ...QUESTOES_GO_LOTE_01,
  ...QUESTOES_PED,
  ...QUESTOES_CIR,
  ...QUESTOES_INF,
  ...QUESTOES_INF_LOTE_01,
  ...QUESTOES_MFC,
  ...QUESTOES_OMED_EXTRAIDAS,
  ...QUESTOES_PENDENTES_EXTRAIDAS,
  ...QUESTOES_ORIGINAIS,
  ...QUESTOES_CARDIO,
  ...QUESTOES_PNEUMO,
  ...QUESTOES_NEURO,
  ...QUESTOES_OMEDV_2025,
  ...QUESTOES_REUMATO,
  ...QUESTOES_ENDOCRINO,
  ...QUESTOES_GASTRO,
  ...QUESTOES_HEMATO,
  ...QUESTOES_NEFRO,
  ...QUESTOES_GASTRO_EXTRA,
  ...QUESTOES_REUMATO_EXTRA,
  ...QUESTOES_ONCO,
  ...QUESTOES_OTORRINO,
  ...QUESTOES_DERMA,
];
