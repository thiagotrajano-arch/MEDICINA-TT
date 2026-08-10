/**
 * Sincroniza o mapa curricular privado já confirmado pelos planos do SISCAD.
 *
 * Não publica plano, link ou dado pessoal. Usa a conta que já possui registros
 * na camada privada e preserva datas/dificuldade manuais existentes.
 *
 * Uso:
 *   npx tsx scripts/sync-private-curriculum.mts
 *   npx tsx scripts/sync-private-curriculum.mts --apply
 */
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();

const aplicar = process.argv.includes("--apply");
const MARCADOR = "[Mapa curricular confirmado 2026-08-09]";

type Status = "concluida" | "cursando";
type Linha = { disciplina_id: string; periodo: number; status: Status; observacao: string };

const linhas: Linha[] = [
  { disciplina_id: "Atenção Primária I", periodo: 1, status: "concluida", observacao: "SUS, políticas e redes; determinantes sociais; território, cadastro, diagnóstico comunitário; MFC, prevenção, promoção e educação em saúde." },
  { disciplina_id: "BBPM I", periodo: 1, status: "concluida", observacao: "Citologia, histologia, anatomia, genética, embriologia, bioquímica, fisiologia, imunologia e farmacologia; bases cardio, respiratória, sentidos, SNC e coagulação." },
  { disciplina_id: "Bases Complementares I", periodo: 1, status: "concluida", observacao: "Busca de evidências, bioética, bioestatística introdutória, inglês instrumental e informática aplicada à saúde." },
  { disciplina_id: "Cirurgia I", periodo: 1, status: "concluida", observacao: "Biossegurança, assepsia, anestesia local, suturas, curativos, punção venosa e preparo/administração de medicamentos." },
  { disciplina_id: "HCPM I", periodo: 1, status: "concluida", observacao: "Comunicação clínica, anamnese, sinais vitais, exame físico geral, relação médico-paciente e registro clínico." },

  { disciplina_id: "Atenção Primária II", periodo: 2, status: "concluida", observacao: "Risco e vulnerabilidade; vigilância; educação e indicadores; cuidado crônico e coordenação pela APS." },
  { disciplina_id: "BBPM II", periodo: 2, status: "concluida", observacao: "Sistemas nervoso, locomotor, imune, gastrointestinal, urinário e endócrino, integrados a imagem, farmacologia e mecanismos de doença." },
  { disciplina_id: "Bases Complementares II", periodo: 2, status: "concluida", observacao: "Desenhos de estudo, estatística, epidemiologia e leitura crítica." },
  { disciplina_id: "HCPM II", periodo: 2, status: "concluida", observacao: "Exame cardiovascular, respiratório, vascular e abdominal normal; hemograma, radiografia de tórax e urinálise iniciais." },
  { disciplina_id: "Urgência e Emergência I", periodo: 2, status: "concluida", observacao: "Primeiros socorros, suporte básico, DEA, corpo estranho, imobilização, acesso intraósseo, sondagens e animais peçonhentos." },

  { disciplina_id: "Atenção Primária III", periodo: 3, status: "concluida", observacao: "Família e domicílio; genograma, ecomapa e APGAR; PTS e clínica ampliada; gestação, RN, adolescência e velhice." },
  { disciplina_id: "BBPM III", periodo: 3, status: "concluida", observacao: "Reprodução, desenvolvimento, envelhecimento, pré-natal, genética, nutrição e fundamentos de saúde mental." },
  { disciplina_id: "Bases Complementares III", periodo: 3, status: "concluida", observacao: "Libras e acessibilidade; busca, citação, gerenciadores, escrita científica e ética." },
  { disciplina_id: "HCPM III", periodo: 3, status: "concluida", observacao: "Semiologia do ciclo de vida e introdução à entrevista em saúde mental." },
  { disciplina_id: "Tópicos Especiais em Saúde I", periodo: 3, status: "concluida", observacao: "Cuidado centrado, dor, SNA, anestésicos locais, integração neuroimunoendócrina e saúde oral." },
  { disciplina_id: "Urgência e Emergência III", periodo: 3, status: "concluida", observacao: "Emergências pediátricas, ressuscitação, trauma, TCE e aspiração de corpo estranho." },

  { disciplina_id: "Atenção Primária IV", periodo: 4, status: "concluida", observacao: "Risco infeccioso, vigilância, SINAN, redes e educação em saúde." },
  { disciplina_id: "BBPM IV", periodo: 4, status: "concluida", observacao: "Infectologia e dermatologia; antimicrobianos, microbiologia, parasitologia, imunidade, patologia e imagem." },
  { disciplina_id: "Bases Complementares IV", periodo: 4, status: "concluida", observacao: "Libras, epidemiologia, desenhos de estudo e ética em pesquisa." },
  { disciplina_id: "HCPM IV", periodo: 4, status: "concluida", observacao: "Semiologia infecciosa, abdominal, respiratória, reumatológica e cutânea; EPI, imagem e olho vermelho." },
  { disciplina_id: "Tópicos em Saúde da Mulher", periodo: 4, status: "concluida", observacao: "Anatomia e semiologia mamária, BI-RADS e câncer de mama." },
  { disciplina_id: "Urgência e Emergência II", periodo: 4, status: "concluida", observacao: "RCP, via aérea, ventilação, trauma, intoxicação, desastre e regulação." },
  { disciplina_id: "Tópicos Especiais em Saúde IV", periodo: 4, status: "concluida", observacao: "Imunidade inata/adaptativa, inflamassoma, complemento, MHC, BCR/TCR e tolerância." },

  { disciplina_id: "Atenção Primária VI", periodo: 5, status: "concluida", observacao: "Saúde do homem, RAPS, álcool/drogas, MCCP, Consultório na Rua, SRQ-20, AUDIT e CAGE." },
  { disciplina_id: "BBPM VII", periodo: 5, status: "concluida", observacao: "Cardiologia, pneumologia, vascular, ECG, gasometria, imagem e farmacologia relacionada." },
  { disciplina_id: "HCPM VII", periodo: 5, status: "concluida", observacao: "Semiologia e investigação clínica cardiorrespiratória e vascular." },
  { disciplina_id: "BBPM VIII", periodo: 5, status: "concluida", observacao: "Hematologia, oncologia, otorrinolaringologia e endocrinologia; radiologia e farmacologia." },
  { disciplina_id: "HCPM VIII", periodo: 5, status: "concluida", observacao: "Exame físico e investigação em hemato-onco, endocrinologia e otorrino." },
  { disciplina_id: "Bases Complementares V", periodo: 5, status: "concluida", observacao: "TCC, desenho de estudo, causalidade, imunidade coletiva e ética." },
  { disciplina_id: "Cirurgia III", periodo: 5, status: "concluida", observacao: "Princípios perioperatórios e integração com especialidades cirúrgicas." },

  { disciplina_id: "Atenção Primária V", periodo: 6, status: "cursando", observacao: "Pessoa idosa, avaliação multidimensional, IVCF-20, IVSF-10, ICOPE, fragilidade, demência, estimulação cognitiva e SUS–SUAS." },
  { disciplina_id: "BBPM V", periodo: 6, status: "cursando", observacao: "Reumatologia, anestesia, ortopedia, patologia, farmacologia e imagem." },
  { disciplina_id: "HCPM V", periodo: 6, status: "cursando", observacao: "Exame osteoarticular e integração com reumatologia/ortopedia." },
  { disciplina_id: "BBPM VI", periodo: 6, status: "cursando", observacao: "Neurosemiologia/neuroanatomia; cefaleia, vertigem, AVC, delirium, epilepsia; ansiedade, depressão, psicose, bipolaridade, psicofarmacologia e emergências." },
  { disciplina_id: "Bases Complementares VI", periodo: 6, status: "cursando", observacao: "PICOT, randomização, farmacovigilância, estatística, revisão sistemática e uso crítico de IA." },
  { disciplina_id: "Cirurgia II", periodo: 6, status: "cursando", observacao: "Anestesia, via aérea, ortopedia e trauma." },
  { disciplina_id: "HCPM VI", periodo: 6, status: "cursando", observacao: "Plano de ensino ainda indisponível no SISCAD; manter lacuna explícita e não inferir conteúdo." },
];

type Existente = {
  disciplina_id: string;
  data_inicio: string | null;
  data_fim: string | null;
  dificuldade: number | null;
  observacao: string;
};

async function main() {
  const db = getSupabaseAdmin();
  const { data: catalogo, error: catalogoErro } = await db
    .from("midia_privada_usuario")
    .select("owner_id")
    .limit(1);
  if (catalogoErro) throw new Error("conta privada: " + catalogoErro.message);
  const owner = catalogo?.[0]?.owner_id as string | undefined;
  if (!owner) throw new Error("Nenhuma conta proprietária encontrada.");

  const { data: atuais, error: atuaisErro } = await db
    .from("curso_disciplina_usuario")
    .select("disciplina_id,data_inicio,data_fim,dificuldade,observacao")
    .eq("owner_id", owner);
  if (atuaisErro) throw new Error("curso privado: " + atuaisErro.message);
  const porId = new Map((atuais as Existente[]).map((linha) => [linha.disciplina_id, linha]));

  const payload = linhas.map((linha) => {
    const atual = porId.get(linha.disciplina_id);
    const semVersaoAntiga = (atual?.observacao ?? "")
      .split(MARCADOR)[0]
      .trim();
    const observacao = [semVersaoAntiga, MARCADOR, linha.observacao]
      .filter(Boolean)
      .join("\n")
      .slice(0, 2000);
    return {
      owner_id: owner,
      ...linha,
      data_inicio: atual?.data_inicio ?? null,
      data_fim: atual?.data_fim ?? null,
      dificuldade: atual?.dificuldade ?? null,
      observacao,
      origem: "markdown",
      atualizado_em: new Date().toISOString(),
    };
  });

  const resumo = {
    aplicar,
    registros: payload.length,
    concluidas: payload.filter((linha) => linha.status === "concluida").length,
    cursando: payload.filter((linha) => linha.status === "cursando").length,
    existentesPreservados: payload.filter((linha) => porId.has(linha.disciplina_id)).length,
  };
  if (!aplicar) {
    console.log(JSON.stringify(resumo, null, 2));
    return;
  }

  const { error: upsertErro } = await db
    .from("curso_disciplina_usuario")
    .upsert(payload, { onConflict: "owner_id,disciplina_id" });
  if (upsertErro) throw new Error("sincronização: " + upsertErro.message);

  const eventos = linhas.map((linha) => ({
    owner_id: owner,
    disciplina_id: linha.disciplina_id,
    tipo: porId.has(linha.disciplina_id) ? "atualizada" : "importada",
    origem: "markdown",
    campos: ["periodo", "status", "observacao"],
  }));
  const { error: eventoErro } = await db.from("curso_disciplina_evento").insert(eventos);
  if (eventoErro) throw new Error("histórico: " + eventoErro.message);
  console.log(JSON.stringify({ ...resumo, sincronizados: payload.length, erros: 0 }, null, 2));
}

main().catch((erro) => {
  console.error("[curso] " + (erro instanceof Error ? erro.message : String(erro)));
  process.exitCode = 1;
});
