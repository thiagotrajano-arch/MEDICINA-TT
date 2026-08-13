"use client";

export type EvidenciaCurricular = "confirmado" | "parcial" | "ausente";
export type EstadoEstudoCurricular = "pendente" | "em_estudo" | "revisar" | "dominado";

export interface SubtemaCurricularPrivado {
  id: string;
  ordem: number;
  titulo: string;
  objetivo: string;
  disciplinaPublicaId: string;
  subtemaPublicoId: string;
  evidenciaStatus: EvidenciaCurricular;
  estadoEstudo: EstadoEstudoCurricular;
  dificuldade: number | null;
  prioridadeOmed: "alta" | "media" | "baixa" | "nao_classificado";
  modalidadesImagem: string[];
  fontesQuestoes: string[];
  temResumo: boolean;
  temQuestoes: boolean;
  ultimaRevisao: string | null;
  proximaRevisao: string | null;
}

export interface ModuloCurricularPrivado {
  id: string;
  ordem: number;
  tipo: string;
  titulo: string;
  evidenciaStatus: EvidenciaCurricular;
  fonteLocalizacao: string;
  subtemas: SubtemaCurricularPrivado[];
}

export interface ComponenteCurricularPrivado {
  id: string;
  codigo: string;
  nome: string;
  periodo: number | null;
  categoria: string;
  situacao: string;
  evidenciaStatus: EvidenciaCurricular;
  fonteRotulo: string;
  observacao: string;
  modulos: ModuloCurricularPrivado[];
}

type ComponenteRow = { id: string; codigo: string; nome: string; periodo: number | null; categoria: string; situacao: string; evidencia_status: EvidenciaCurricular; fonte_rotulo: string; observacao: string };
type ModuloRow = { id: string; componente_id: string; ordem: number; tipo: string; titulo: string; evidencia_status: EvidenciaCurricular; fonte_localizacao: string };
type SubtemaRow = { id: string; modulo_id: string; ordem: number; titulo: string; objetivo: string; disciplina_publica_id: string; subtema_publico_id: string; evidencia_status: EvidenciaCurricular; estado_estudo: EstadoEstudoCurricular; dificuldade: number | null; prioridade_omed: SubtemaCurricularPrivado["prioridadeOmed"]; modalidades_imagem: string[] | null; fontes_questoes: string[] | null; ultima_revisao: string | null; proxima_revisao: string | null };
type RecursoRow = { subtema_id: string; recurso_tipo: "resumo" | "questao" | "caso" | "mapa" | "midia" | "material_privado"; estado: "sugerido" | "confirmado" | "rejeitado" };

async function sessaoCurricular() {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon();
  const { data } = await supabase.auth.getSession();
  return data.session?.user ? { supabase, userId: data.session.user.id } : null;
}

function migrationAusente(erro: { code?: string; message?: string } | null): boolean {
  return Boolean(erro && (erro.code === "42P01" || erro.code === "PGRST205" || erro.message?.includes("curriculo_componente_usuario")));
}

export async function carregarMapaCurricularPrivado(): Promise<{ componentes: ComponenteCurricularPrivado[]; migrationPendente: boolean }> {
  const auth = await sessaoCurricular();
  if (!auth) return { componentes: [], migrationPendente: false };
  const [componentes, modulos, subtemas, recursos] = await Promise.all([
    auth.supabase.from("curriculo_componente_usuario").select("id,codigo,nome,periodo,categoria,situacao,evidencia_status,fonte_rotulo,observacao").eq("owner_id", auth.userId).order("periodo", { ascending: true }).order("codigo", { ascending: true }),
    auth.supabase.from("curriculo_modulo_usuario").select("id,componente_id,ordem,tipo,titulo,evidencia_status,fonte_localizacao").eq("owner_id", auth.userId).order("ordem", { ascending: true }),
    auth.supabase.from("curriculo_subtema_usuario").select("id,modulo_id,ordem,titulo,objetivo,disciplina_publica_id,subtema_publico_id,evidencia_status,estado_estudo,dificuldade,prioridade_omed,modalidades_imagem,fontes_questoes,ultima_revisao,proxima_revisao").eq("owner_id", auth.userId).order("ordem", { ascending: true }),
    auth.supabase.from("curriculo_recurso_usuario").select("subtema_id,recurso_tipo,estado").eq("owner_id", auth.userId),
  ]);
  const primeiroErro = componentes.error ?? modulos.error ?? subtemas.error ?? recursos.error;
  if (migrationAusente(primeiroErro)) return { componentes: [], migrationPendente: true };
  if (primeiroErro) throw new Error("Não foi possível carregar o mapa curricular granular.");

  const recursosPorSubtema = new Map<string, Set<RecursoRow["recurso_tipo"]>>();
  for (const row of (recursos.data ?? []) as RecursoRow[]) {
    if (row.estado === "rejeitado") continue;
    const tipos = recursosPorSubtema.get(row.subtema_id) ?? new Set<RecursoRow["recurso_tipo"]>();
    tipos.add(row.recurso_tipo);
    recursosPorSubtema.set(row.subtema_id, tipos);
  }
  const topicosPorModulo = new Map<string, SubtemaCurricularPrivado[]>();
  for (const row of (subtemas.data ?? []) as SubtemaRow[]) {
    const lista = topicosPorModulo.get(row.modulo_id) ?? [];
    const tipos = recursosPorSubtema.get(row.id);
    lista.push({ id: row.id, ordem: row.ordem, titulo: row.titulo, objetivo: row.objetivo, disciplinaPublicaId: row.disciplina_publica_id, subtemaPublicoId: row.subtema_publico_id, evidenciaStatus: row.evidencia_status, estadoEstudo: row.estado_estudo, dificuldade: row.dificuldade, prioridadeOmed: row.prioridade_omed, modalidadesImagem: row.modalidades_imagem ?? [], fontesQuestoes: row.fontes_questoes ?? [], temResumo: tipos?.has("resumo") ?? false, temQuestoes: tipos?.has("questao") ?? false, ultimaRevisao: row.ultima_revisao, proximaRevisao: row.proxima_revisao });
    topicosPorModulo.set(row.modulo_id, lista);
  }
  const modulosPorComponente = new Map<string, ModuloCurricularPrivado[]>();
  for (const row of (modulos.data ?? []) as ModuloRow[]) {
    const lista = modulosPorComponente.get(row.componente_id) ?? [];
    lista.push({ id: row.id, ordem: row.ordem, tipo: row.tipo, titulo: row.titulo, evidenciaStatus: row.evidencia_status, fonteLocalizacao: row.fonte_localizacao, subtemas: topicosPorModulo.get(row.id) ?? [] });
    modulosPorComponente.set(row.componente_id, lista);
  }
  return {
    componentes: ((componentes.data ?? []) as ComponenteRow[]).map((row) => ({ id: row.id, codigo: row.codigo, nome: row.nome, periodo: row.periodo, categoria: row.categoria, situacao: row.situacao, evidenciaStatus: row.evidencia_status, fonteRotulo: row.fonte_rotulo, observacao: row.observacao, modulos: modulosPorComponente.get(row.id) ?? [] })),
    migrationPendente: false,
  };
}

export async function atualizarEstadoSubtemaCurricular(id: string, estado: EstadoEstudoCurricular): Promise<void> {
  const auth = await sessaoCurricular();
  if (!auth) throw new Error("Entre na sua conta para atualizar esta pendência.");
  const agora = new Date().toISOString();
  const payload: Record<string, string | null> = { estado_estudo: estado, atualizado_em: agora };
  if (estado === "dominado") payload.ultima_revisao = agora.slice(0, 10);
  const { error } = await auth.supabase.from("curriculo_subtema_usuario").update(payload).eq("owner_id", auth.userId).eq("id", id);
  if (error) throw new Error("Não foi possível atualizar o subtema.");
}
