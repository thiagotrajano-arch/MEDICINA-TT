"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AtividadeSemana,
  EntradaFoco,
  EntradaSemana,
  EntradaTarefa,
  EstadoFoco,
  EstadoTarefa,
  FocoSemana,
  OrigemSemana,
  PrioridadeFoco,
  SemanaAtual,
  SemanaAtualDados,
  TarefaSemana,
} from "@/domain/semana/types";

const CHAVE_LOCAL = "codex:semana-atual";
const hoje = () => new Date();

type LocalState = { semana: SemanaAtual | null; focos: FocoSemana[]; tarefas: TarefaSemana[] };
type LinhaSemana = { id: string; inicio: string; fim: string; periodo: number | null; objetivo: string; estado: SemanaAtual["estado"]; origem: OrigemSemana; confirmada: boolean; criado_em: string; atualizado_em: string };
type LinhaFoco = { id: string; semana_id: string; disciplina_id: string; tema: string; subtema: string; prioridade: PrioridadeFoco; origem: FocoSemana["origem"]; confianca: number; estado: EstadoFoco; criado_em: string; atualizado_em: string };
type LinhaTarefa = { id: string; semana_id: string; data: string; titulo: string; atividade: AtividadeSemana; recurso_id: string; disciplina_id: string; tema: string; duracao_min: number | null; estado: EstadoTarefa; origem: OrigemSemana; criado_em: string; atualizado_em: string };

function idLocal(): string {
  try { return crypto.randomUUID(); } catch { return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

function lerLocal(): LocalState {
  if (typeof window === "undefined") return { semana: null, focos: [], tarefas: [] };
  try {
    const bruto = window.localStorage.getItem(CHAVE_LOCAL);
    if (!bruto) return { semana: null, focos: [], tarefas: [] };
    const valor = JSON.parse(bruto) as Partial<LocalState>;
    return { semana: valor.semana ?? null, focos: valor.focos ?? [], tarefas: valor.tarefas ?? [] };
  } catch { return { semana: null, focos: [], tarefas: [] }; }
}

function gravarLocal(valor: LocalState): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(CHAVE_LOCAL, JSON.stringify(valor)); } catch { /* armazenamento local é apenas fallback */ }
}

function inicioDaSemana(data: Date): Date {
  const resultado = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  const segunda = (resultado.getDay() + 6) % 7;
  resultado.setDate(resultado.getDate() - segunda);
  return resultado;
}

function dataISO(data: Date): string { return data.toISOString().slice(0, 10); }

export function periodoAtual(): { inicio: string; fim: string } {
  const inicio = inicioDaSemana(hoje());
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + 6);
  return { inicio: dataISO(inicio), fim: dataISO(fim) };
}

function mapearSemana(linha: LinhaSemana): SemanaAtual {
  return { id: linha.id, inicio: linha.inicio, fim: linha.fim, periodo: linha.periodo, objetivo: linha.objetivo, estado: linha.estado, origem: linha.origem, confirmada: linha.confirmada, criadoEm: linha.criado_em, atualizadoEm: linha.atualizado_em };
}

function mapearFoco(linha: LinhaFoco): FocoSemana {
  return { id: linha.id, semanaId: linha.semana_id, disciplinaId: linha.disciplina_id, tema: linha.tema, subtema: linha.subtema, prioridade: linha.prioridade, origem: linha.origem, confianca: Number(linha.confianca), estado: linha.estado, criadoEm: linha.criado_em, atualizadoEm: linha.atualizado_em };
}

function mapearTarefa(linha: LinhaTarefa): TarefaSemana {
  return { id: linha.id, semanaId: linha.semana_id, data: linha.data, titulo: linha.titulo, atividade: linha.atividade, recursoId: linha.recurso_id, disciplinaId: linha.disciplina_id, tema: linha.tema, duracaoMin: linha.duracao_min, estado: linha.estado, origem: linha.origem, criadoEm: linha.criado_em, atualizadoEm: linha.atualizado_em };
}

async function sessao(): Promise<{ supabase: SupabaseClient; userId: string } | null> {
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) return null;
    return { supabase, userId: data.session.user.id };
  } catch { return null; }
}

function tabelaAusente(error: { code?: string; message?: string } | null): boolean {
  return Boolean(error && (error.code === "42P01" || error.code === "PGRST205" || /relation .* does not exist|could not find the table/i.test(error.message ?? "")));
}

export async function carregarSemanaAtual(): Promise<SemanaAtualDados> {
  const local = lerLocal();
  const auth = await sessao();
  if (!auth) return { ...local, remoto: false };

  const hojeISO = dataISO(hoje());
  const { data: semana, error: erroSemana } = await auth.supabase.from("semana_estudo_usuario")
    .select("id,inicio,fim,periodo,objetivo,estado,origem,confirmada,criado_em,atualizado_em")
    .eq("owner_id", auth.userId).eq("estado", "ativa").lte("inicio", hojeISO).gte("fim", hojeISO)
    .order("atualizado_em", { ascending: false }).limit(1).maybeSingle();
  if (erroSemana) return tabelaAusente(erroSemana) ? { ...local, remoto: false } : { ...local, remoto: false };
  // Progresso local-first não desaparece quando a conta ainda não recebeu a
  // semana. Mostramos o rascunho local e mantemos o indicador de nuvem apagado.
  if (!semana) return local.semana ? { ...local, remoto: false } : { semana: null, focos: [], tarefas: [], remoto: true };

  const semanaAtual = mapearSemana(semana as LinhaSemana);
  const [focos, tarefas] = await Promise.all([
    auth.supabase.from("foco_semana_usuario").select("id,semana_id,disciplina_id,tema,subtema,prioridade,origem,confianca,estado,criado_em,atualizado_em").eq("owner_id", auth.userId).eq("semana_id", semanaAtual.id).order("prioridade", { ascending: true }),
    auth.supabase.from("tarefa_estudo_usuario").select("id,semana_id,data,titulo,atividade,recurso_id,disciplina_id,tema,duracao_min,estado,origem,criado_em,atualizado_em").eq("owner_id", auth.userId).eq("semana_id", semanaAtual.id).order("data", { ascending: true }).order("criado_em", { ascending: true }),
  ]);
  if (focos.error || tarefas.error) return { ...local, remoto: false };
  return { semana: semanaAtual, focos: (focos.data ?? []).map((item) => mapearFoco(item as LinhaFoco)), tarefas: (tarefas.data ?? []).map((item) => mapearTarefa(item as LinhaTarefa)), remoto: true };
}

function validarSemana(entrada: EntradaSemana): string[] {
  const erros: string[] = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entrada.inicio) || !/^\d{4}-\d{2}-\d{2}$/.test(entrada.fim)) erros.push("Informe o início e o fim da semana.");
  if (entrada.fim < entrada.inicio) erros.push("O fim não pode ser anterior ao início.");
  if ((entrada.objetivo ?? "").length > 500) erros.push("O objetivo deve ter no máximo 500 caracteres.");
  if (entrada.periodo !== null && entrada.periodo !== undefined && (!Number.isInteger(entrada.periodo) || entrada.periodo < 1 || entrada.periodo > 12)) erros.push("O período deve ficar entre 1 e 12.");
  return erros;
}

export async function salvarSemanaAtual(entrada: EntradaSemana): Promise<SemanaAtualDados> {
  const erros = validarSemana(entrada);
  if (erros.length) throw new Error(erros.join(" "));
  const atual = lerLocal();
  const auth = await sessao();
  if (!auth) {
    const agora = new Date().toISOString();
    const semana: SemanaAtual = atual.semana && atual.semana.inicio === entrada.inicio && atual.semana.fim === entrada.fim ? { ...atual.semana, periodo: entrada.periodo ?? null, objetivo: (entrada.objetivo ?? "").trim(), confirmada: entrada.confirmada ?? true, atualizadoEm: agora } : { id: idLocal(), inicio: entrada.inicio, fim: entrada.fim, periodo: entrada.periodo ?? null, objetivo: (entrada.objetivo ?? "").trim(), estado: "ativa", origem: "manual", confirmada: entrada.confirmada ?? true, criadoEm: agora, atualizadoEm: agora };
    const novo = { ...atual, semana, focos: atual.semana?.id === semana.id ? atual.focos : [], tarefas: atual.semana?.id === semana.id ? atual.tarefas : [] };
    gravarLocal(novo); return { ...novo, remoto: false };
  }

  const { data, error } = await auth.supabase.from("semana_estudo_usuario").upsert({ owner_id: auth.userId, inicio: entrada.inicio, fim: entrada.fim, periodo: entrada.periodo ?? null, objetivo: (entrada.objetivo ?? "").trim(), estado: "ativa", origem: "manual", confirmada: entrada.confirmada ?? true, atualizado_em: new Date().toISOString() }, { onConflict: "owner_id,inicio,fim" }).select("id,inicio,fim,periodo,objetivo,estado,origem,confirmada,criado_em,atualizado_em").single();
  if (error || !data) {
    if (tabelaAusente(error)) return salvarSemanaLocal(entrada);
    throw new Error("Não foi possível salvar a semana atual.");
  }
  const semana = mapearSemana(data as LinhaSemana);
  const [focos, tarefas] = await Promise.all([
    auth.supabase.from("foco_semana_usuario").select("id,semana_id,disciplina_id,tema,subtema,prioridade,origem,confianca,estado,criado_em,atualizado_em").eq("owner_id", auth.userId).eq("semana_id", semana.id).order("prioridade", { ascending: true }),
    auth.supabase.from("tarefa_estudo_usuario").select("id,semana_id,data,titulo,atividade,recurso_id,disciplina_id,tema,duracao_min,estado,origem,criado_em,atualizado_em").eq("owner_id", auth.userId).eq("semana_id", semana.id).order("data", { ascending: true }),
  ]);
  return { semana, focos: (focos.data ?? []).map((item) => mapearFoco(item as LinhaFoco)), tarefas: (tarefas.data ?? []).map((item) => mapearTarefa(item as LinhaTarefa)), remoto: !focos.error && !tarefas.error };
}

async function salvarSemanaLocal(entrada: EntradaSemana): Promise<SemanaAtualDados> {
  const atual = lerLocal(); const agora = new Date().toISOString();
  const semana: SemanaAtual = atual.semana && atual.semana.inicio === entrada.inicio && atual.semana.fim === entrada.fim ? { ...atual.semana, periodo: entrada.periodo ?? null, objetivo: (entrada.objetivo ?? "").trim(), confirmada: entrada.confirmada ?? true, atualizadoEm: agora } : { id: idLocal(), inicio: entrada.inicio, fim: entrada.fim, periodo: entrada.periodo ?? null, objetivo: (entrada.objetivo ?? "").trim(), estado: "ativa", origem: "manual", confirmada: entrada.confirmada ?? true, criadoEm: agora, atualizadoEm: agora };
  const novo = { ...atual, semana, focos: atual.semana?.id === semana.id ? atual.focos : [], tarefas: atual.semana?.id === semana.id ? atual.tarefas : [] };
  gravarLocal(novo); return { ...novo, remoto: false };
}

export async function salvarFocoSemana(semanaId: string, entrada: EntradaFoco): Promise<FocoSemana> {
  if (!entrada.disciplinaId.trim()) throw new Error("Escolha uma disciplina para o foco da semana.");
  const foco: FocoSemana = { id: idLocal(), semanaId, disciplinaId: entrada.disciplinaId.trim(), tema: (entrada.tema ?? "").trim(), subtema: (entrada.subtema ?? "").trim(), prioridade: entrada.prioridade ?? "media", origem: entrada.origem ?? "manual", confianca: entrada.confianca ?? 1, estado: entrada.estado ?? "confirmado", criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() };
  const auth = await sessao();
  if (auth) {
    const { data, error } = await auth.supabase.from("foco_semana_usuario").upsert({ owner_id: auth.userId, semana_id: semanaId, disciplina_id: foco.disciplinaId, tema: foco.tema, subtema: foco.subtema, prioridade: foco.prioridade, origem: foco.origem, confianca: foco.confianca, estado: foco.estado, atualizado_em: foco.atualizadoEm }, { onConflict: "owner_id,semana_id,disciplina_id,tema,subtema" }).select("id,semana_id,disciplina_id,tema,subtema,prioridade,origem,confianca,estado,criado_em,atualizado_em").single();
    if (data && !error) return mapearFoco(data as LinhaFoco);
    if (error && !tabelaAusente(error)) throw new Error("Não foi possível salvar o foco da semana.");
  }
  const local = lerLocal(); const focos = [...local.focos.filter((item) => !(item.semanaId === semanaId && item.disciplinaId === foco.disciplinaId && item.tema === foco.tema && item.subtema === foco.subtema)), foco]; gravarLocal({ ...local, focos }); return foco;
}

export async function salvarTarefaSemana(semanaId: string, entrada: EntradaTarefa): Promise<TarefaSemana> {
  if (!entrada.titulo.trim()) throw new Error("Dê um título para o próximo passo.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entrada.data)) throw new Error("Informe a data do próximo passo.");
  const agora = new Date().toISOString(); const tarefa: TarefaSemana = { id: idLocal(), semanaId, data: entrada.data, titulo: entrada.titulo.trim(), atividade: entrada.atividade ?? "outro", recursoId: (entrada.recursoId ?? "").trim(), disciplinaId: (entrada.disciplinaId ?? "").trim(), tema: (entrada.tema ?? "").trim(), duracaoMin: entrada.duracaoMin ?? null, estado: entrada.estado ?? "pendente", origem: entrada.origem ?? "manual", criadoEm: agora, atualizadoEm: agora };
  const auth = await sessao();
  if (auth) {
    const { data, error } = await auth.supabase.from("tarefa_estudo_usuario").insert({ owner_id: auth.userId, semana_id: semanaId, data: tarefa.data, titulo: tarefa.titulo, atividade: tarefa.atividade, recurso_id: tarefa.recursoId, disciplina_id: tarefa.disciplinaId, tema: tarefa.tema, duracao_min: tarefa.duracaoMin, estado: tarefa.estado, origem: tarefa.origem }).select("id,semana_id,data,titulo,atividade,recurso_id,disciplina_id,tema,duracao_min,estado,origem,criado_em,atualizado_em").single();
    if (data && !error) return mapearTarefa(data as LinhaTarefa);
    if (error && !tabelaAusente(error)) throw new Error("Não foi possível salvar o próximo passo.");
  }
  const local = lerLocal(); const tarefas = [...local.tarefas, tarefa]; gravarLocal({ ...local, tarefas }); return tarefa;
}

export async function alternarTarefaSemana(tarefa: TarefaSemana): Promise<TarefaSemana> {
  const estado: EstadoTarefa = tarefa.estado === "concluida" ? "pendente" : "concluida";
  const atualizado: TarefaSemana = { ...tarefa, estado, atualizadoEm: new Date().toISOString() };
  const auth = await sessao();
  if (auth) {
    const { data, error } = await auth.supabase.from("tarefa_estudo_usuario").update({ estado, atualizado_em: atualizado.atualizadoEm }).eq("owner_id", auth.userId).eq("id", tarefa.id).select("id,semana_id,data,titulo,atividade,recurso_id,disciplina_id,tema,duracao_min,estado,origem,criado_em,atualizado_em").single();
    if (data && !error) {
      // O plano privado cria um evento de agenda espelho com o mesmo título e
      // dia. Atualizar os dois lados evita que a fila volte a mostrar algo já
      // concluído na agenda.
      const inicioDia = new Date(`${tarefa.data}T00:00:00-03:00`);
      const fimDia = new Date(inicioDia);
      fimDia.setUTCDate(fimDia.getUTCDate() + 1);
      const eventos = await auth.supabase.from("agenda_estudo_usuario").select("id").eq("owner_id", auth.userId).eq("titulo", tarefa.titulo).gte("inicio", inicioDia.toISOString()).lt("inicio", fimDia.toISOString()).like("observacao", "[Plano privado%");
      if (!eventos.error && eventos.data?.length) {
        await auth.supabase.from("agenda_estudo_usuario").update({ concluido: estado === "concluida", atualizado_em: atualizado.atualizadoEm }).eq("owner_id", auth.userId).in("id", eventos.data.map((evento) => evento.id));
      }
      return mapearTarefa(data as LinhaTarefa);
    }
    if (error && !tabelaAusente(error)) throw new Error("Não foi possível atualizar o próximo passo.");
  }
  const local = lerLocal(); const tarefas = local.tarefas.map((item) => item.id === tarefa.id ? atualizado : item); gravarLocal({ ...local, tarefas }); return atualizado;
}
