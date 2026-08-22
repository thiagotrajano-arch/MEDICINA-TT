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
import { QUESTOES_PED_LOTE_01, QUESTOES_CIR_MFC_LOTE_01, QUESTOES_CARDIO_NEURO_PNEUMO_LOTE_01, QUESTOES_NEFRO_GASTRO_HEMATO_ENDO_LOTE_01 } from "./questoes/lotes-04-a-07";
import { QUESTOES_CARDIO_LOTE_02, QUESTOES_NEURO_LOTE_02, QUESTOES_PNEUMO_LOTE_02 } from "./questoes/cardio-neuro-pneumo-lote-02";
import { QUESTOES_CLINICAS_LOTE_20260803 } from "./questoes/clinicas-lote-20260803";
import { QUESTOES_NEUROPSIQ_SEMANA } from "./questoes/neuropsiquiatria-semana";
import { QUESTOES_NEUROPSIQ_RECENTES } from "./questoes/neuropsiquiatria-recentes";
import { QUESTOES_ANTIBIOTICOTERAPIA } from "./questoes/antibioticoterapia";
import { QUESTOES_ANIMAIS_PECONHENTOS } from "./questoes/animais-peconhentos";
import { QUESTOES_INFECCOES_CONGENITAS_GO } from "./questoes/infeccoes-congenitas-go";
import { QUESTOES_RASTREAMENTOS_MFC } from "./questoes/rastreamentos-mfc";
import { QUESTOES_DISFUNCOES_TIREOIDIANAS } from "./questoes/disfuncoes-tireoidianas";
import { QUESTOES_HEMORRAGIA_DIGESTIVA } from "./questoes/hemorragia-digestiva";
import { QUESTOES_DOENCAS_INFLAMATORIAS_INTESTINAIS } from "./questoes/doencas-inflamatorias-intestinais";
import { QUESTOES_MENINGITES_ENCEFALITES } from "./questoes/meningites-encefalites";
import { QUESTOES_ABDOMEN_AGUDO_GINECOLOGICO } from "./questoes/abdome-agudo-ginecologico";
import { QUESTOES_VIOLENCIA_SEXUAL } from "./questoes/violencia-sexual";
import { QUESTOES_ROTURA_PREMATURA_MEMBRANAS } from "./questoes/rotura-prematura-membranas";

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
  ...QUESTOES_ANTIBIOTICOTERAPIA,
  ...QUESTOES_ANIMAIS_PECONHENTOS,
  ...QUESTOES_INFECCOES_CONGENITAS_GO,
  ...QUESTOES_RASTREAMENTOS_MFC,
  ...QUESTOES_DISFUNCOES_TIREOIDIANAS,
  ...QUESTOES_HEMORRAGIA_DIGESTIVA,
  ...QUESTOES_DOENCAS_INFLAMATORIAS_INTESTINAIS,
  ...QUESTOES_MENINGITES_ENCEFALITES,
  ...QUESTOES_ABDOMEN_AGUDO_GINECOLOGICO,
  ...QUESTOES_VIOLENCIA_SEXUAL,
  ...QUESTOES_ROTURA_PREMATURA_MEMBRANAS,
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
  ...QUESTOES_PED_LOTE_01,
  ...QUESTOES_CIR_MFC_LOTE_01,
  ...QUESTOES_CARDIO_NEURO_PNEUMO_LOTE_01,
  ...QUESTOES_NEFRO_GASTRO_HEMATO_ENDO_LOTE_01,
  ...QUESTOES_CARDIO_LOTE_02,
  ...QUESTOES_NEURO_LOTE_02,
  ...QUESTOES_PNEUMO_LOTE_02,
  ...QUESTOES_CLINICAS_LOTE_20260803,
  ...QUESTOES_NEUROPSIQ_SEMANA,
  ...QUESTOES_NEUROPSIQ_RECENTES,
];
