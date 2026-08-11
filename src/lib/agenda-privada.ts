"use client";

export const TIPOS_AGENDA = ["aula", "estudo", "revisao", "prova", "pessoal"] as const;
export type TipoAgenda = (typeof TIPOS_AGENDA)[number];

export interface EventoAgenda {
  id: string;
  titulo: string;
  inicio: string;
  fim: string | null;
  tipo: TipoAgenda;
  disciplinaId: string;
  tema: string;
  observacao: string;
  concluido: boolean;
}

export interface EntradaAgenda {
  titulo: string;
  inicio: string;
  fim?: string;
  tipo: TipoAgenda;
  disciplinaId?: string;
  tema?: string;
  observacao?: string;
}

type Linha = { id: string; titulo: string; inicio: string; fim: string | null; tipo: TipoAgenda; disciplina_id: string; tema: string; observacao: string; concluido: boolean };

function mapear(linha: Linha): EventoAgenda {
  return { id: linha.id, titulo: linha.titulo, inicio: linha.inicio, fim: linha.fim, tipo: linha.tipo, disciplinaId: linha.disciplina_id, tema: linha.tema, observacao: linha.observacao, concluido: linha.concluido };
}

function validar(entrada: EntradaAgenda): string[] {
  const erros: string[] = [];
  if (!entrada.titulo.trim() || entrada.titulo.trim().length > 180) erros.push("Informe um titulo de ate 180 caracteres.");
  if (!entrada.inicio || Number.isNaN(new Date(entrada.inicio).getTime())) erros.push("Informe data e horario de inicio.");
  if (entrada.fim && new Date(entrada.fim) < new Date(entrada.inicio)) erros.push("O fim nao pode ser anterior ao inicio.");
  if (!TIPOS_AGENDA.includes(entrada.tipo)) erros.push("Tipo de evento invalido.");
  if ((entrada.tema ?? "").length > 180 || (entrada.observacao ?? "").length > 2000) erros.push("Tema ou observacao excede o limite permitido.");
  return erros;
}

async function autenticacao() {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  const supabase = getSupabaseAnon();
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) throw new Error("Entre na sua conta para acessar sua agenda.");
  return { supabase, userId: data.session.user.id };
}

export async function carregarAgenda(inicio: Date, fim: Date): Promise<EventoAgenda[]> {
  const { supabase, userId } = await autenticacao();
  const { data, error } = await supabase.from("agenda_estudo_usuario")
    .select("id,titulo,inicio,fim,tipo,disciplina_id,tema,observacao,concluido")
    .eq("owner_id", userId).gte("inicio", inicio.toISOString()).lt("inicio", fim.toISOString()).order("inicio", { ascending: true });
  if (error) throw new Error("Nao foi possivel carregar sua agenda.");
  return ((data ?? []) as Linha[]).map(mapear);
}

export async function salvarEventoAgenda(entrada: EntradaAgenda): Promise<void> {
  const erros = validar(entrada); if (erros.length) throw new Error(erros.join(" "));
  const { supabase, userId } = await autenticacao();
  const { error } = await supabase.from("agenda_estudo_usuario").insert({ owner_id: userId, titulo: entrada.titulo.trim(), inicio: new Date(entrada.inicio).toISOString(), fim: entrada.fim ? new Date(entrada.fim).toISOString() : null, tipo: entrada.tipo, disciplina_id: entrada.disciplinaId?.trim() ?? "", tema: entrada.tema?.trim() ?? "", observacao: entrada.observacao?.trim() ?? "" });
  if (error) throw new Error("Nao foi possivel salvar o evento.");
}

export async function alternarEventoAgenda(item: EventoAgenda): Promise<void> {
  const { supabase, userId } = await autenticacao();
  const estado = !item.concluido;
  const { error } = await supabase.from("agenda_estudo_usuario").update({ concluido: estado, atualizado_em: new Date().toISOString() }).eq("owner_id", userId).eq("id", item.id);
  if (error) throw new Error("Nao foi possivel atualizar o evento.");

  // Eventos gerados pelo plano privado e tarefas semanais representam o mesmo
  // bloco. Mantemos os dois espelhos sincronizados para que concluir na
  // agenda também retire a pendência da fila da semana.
  const data = new Date(item.inicio).toISOString().slice(0, 10);
  const tarefas = await supabase.from("tarefa_estudo_usuario").select("id").eq("owner_id", userId).eq("data", data).eq("titulo", item.titulo).in("origem", ["agenda", "curso", "pdf"]);
  if (!tarefas.error && tarefas.data?.length) {
    await supabase.from("tarefa_estudo_usuario").update({ estado: estado ? "concluida" : "pendente", atualizado_em: new Date().toISOString() }).eq("owner_id", userId).in("id", tarefas.data.map((tarefa) => tarefa.id));
  }
}

export async function excluirEventoAgenda(id: string): Promise<void> {
  const { supabase, userId } = await autenticacao();
  const { error } = await supabase.from("agenda_estudo_usuario").delete().eq("owner_id", userId).eq("id", id);
  if (error) throw new Error("Nao foi possivel excluir o evento.");
}
