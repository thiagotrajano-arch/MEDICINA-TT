"use client";

import type { Questao } from "@/domain/content/types";
import { isSupabaseConfigured } from "@/infra/supabase/config";

/**
 * Progresso com estrategia local-first.
 *
 * Toda interacao e gravada imediatamente no navegador. Quando o Supabase esta
 * configurado e o estudante entra com e-mail e senha, a sessão persistente
 * sincroniza os mesmos eventos com RLS por usuário. Falhas de rede nunca
 * interrompem o estudo: a próxima leitura
 * do dashboard tenta reconciliar novamente as duas copias.
 */

const CHAVE_RESPOSTAS = "codex:respostas";
const CHAVE_SIMULADOS = "codex:simulados";

export interface RespostaRegistrada {
  id: string;
  questaoId: string;
  disciplinaId: string;
  correta: boolean;
  em: number;
}

export interface ResultadoSimulado {
  id: string;
  em: number;
  acertos: number;
  total: number;
  duracaoSeg: number;
  porDisciplina: Record<string, { acertos: number; total: number }>;
}

interface RespostaRemota {
  client_event_id: string | null;
  questao_id: string;
  correta: boolean;
  respondido_em: string;
  questao: { disciplina_id: string } | { disciplina_id: string }[];
}

interface SimuladoRemoto {
  client_event_id: string | null;
  finalizado_em: string;
  acertos: number;
  total: number;
  relatorio: unknown;
}

function novoId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ler<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao;
  try {
    const raw = window.localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : padrao;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Cota cheia ou storage bloqueado: a tela continua funcional.
  }
}

function comIds<T extends { id?: string; em: number }>(itens: T[], prefixo: string): (T & { id: string })[] {
  let alterou = false;
  const normalizados = itens.map((item, i) => {
    if (item.id) return item as T & { id: string };
    alterou = true;
    return { ...item, id: `${prefixo}-${item.em}-${i}` };
  });
  if (alterou) gravar(prefixo === "resposta" ? CHAVE_RESPOSTAS : CHAVE_SIMULADOS, normalizados);
  return normalizados;
}

export function lerRespostas(): RespostaRegistrada[] {
  return comIds(ler<Omit<RespostaRegistrada, "id">[]>(CHAVE_RESPOSTAS, []), "resposta");
}

export function lerSimulados(): ResultadoSimulado[] {
  return comIds(ler<Omit<ResultadoSimulado, "id">[]>(CHAVE_SIMULADOS, []), "simulado");
}

export function registrarResposta(q: Questao, correta: boolean): void {
  const resposta: RespostaRegistrada = {
    id: novoId(), questaoId: q.id, disciplinaId: q.disciplinaId, correta, em: Date.now(),
  };
  gravar(CHAVE_RESPOSTAS, [...lerRespostas(), resposta]);
  void enviarResposta(resposta);
}

export function registrarSimulado(r: Omit<ResultadoSimulado, "id">): void {
  const resultado = { ...r, id: novoId() };
  gravar(CHAVE_SIMULADOS, [...lerSimulados(), resultado]);
  void enviarSimulado(resultado);
}

async function sessaoSupabase() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const atual = await supabase.auth.getSession();
    if (atual.data.session?.user) return { supabase, user: atual.data.session.user };
    return null;
  } catch {
    return null;
  }
}

async function enviarResposta(r: RespostaRegistrada): Promise<void> {
  const auth = await sessaoSupabase();
  if (!auth) return;
  const { error } = await auth.supabase.from("resposta_usuario").upsert({
    owner_id: auth.user.id,
    client_event_id: r.id,
    questao_id: r.questaoId,
    correta: r.correta,
    respondido_em: new Date(r.em).toISOString(),
  }, { onConflict: "owner_id,client_event_id", ignoreDuplicates: true });
  if (error) console.error("[progresso] falha ao sincronizar resposta:", error);
}

async function enviarSimulado(r: ResultadoSimulado): Promise<void> {
  const auth = await sessaoSupabase();
  if (!auth) return;
  const { error } = await auth.supabase.from("simulado_resultado").upsert({
    owner_id: auth.user.id,
    client_event_id: r.id,
    finalizado_em: new Date(r.em).toISOString(),
    iniciado_em: new Date(r.em - r.duracaoSeg * 1000).toISOString(),
    acertos: r.acertos,
    total: r.total,
    relatorio: { duracaoSeg: r.duracaoSeg, porDisciplina: r.porDisciplina },
  }, { onConflict: "owner_id,client_event_id", ignoreDuplicates: true });
  if (error) console.error("[progresso] falha ao sincronizar simulado:", error);
}

/** Envia pendencias locais e incorpora eventos remotos no dashboard. */
export async function sincronizarProgresso(): Promise<{
  respostas: RespostaRegistrada[];
  simulados: ResultadoSimulado[];
  sincronizado: boolean;
}> {
  const respostasLocais = lerRespostas();
  const simuladosLocais = lerSimulados();
  const auth = await sessaoSupabase();
  if (!auth) return { respostas: respostasLocais, simulados: simuladosLocais, sincronizado: false };

  const [envioRespostas, envioSimulados] = await Promise.all([
    respostasLocais.length
      ? auth.supabase.from("resposta_usuario").upsert(respostasLocais.map((r) => ({
          owner_id: auth.user.id,
          client_event_id: r.id,
          questao_id: r.questaoId,
          correta: r.correta,
          respondido_em: new Date(r.em).toISOString(),
        })), { onConflict: "owner_id,client_event_id", ignoreDuplicates: true })
      : Promise.resolve(null),
    simuladosLocais.length
      ? auth.supabase.from("simulado_resultado").upsert(simuladosLocais.map((r) => ({
          owner_id: auth.user.id,
          client_event_id: r.id,
          finalizado_em: new Date(r.em).toISOString(),
          iniciado_em: new Date(r.em - r.duracaoSeg * 1000).toISOString(),
          acertos: r.acertos,
          total: r.total,
          relatorio: { duracaoSeg: r.duracaoSeg, porDisciplina: r.porDisciplina },
        })), { onConflict: "owner_id,client_event_id", ignoreDuplicates: true })
      : Promise.resolve(null),
  ]);
  if (envioRespostas?.error) console.error("[progresso] falha ao enviar respostas pendentes:", envioRespostas.error);
  if (envioSimulados?.error) console.error("[progresso] falha ao enviar simulados pendentes:", envioSimulados.error);

  const [rr, sr] = await Promise.all([
    auth.supabase.from("resposta_usuario")
      .select("client_event_id,questao_id,correta,respondido_em,questao!inner(disciplina_id)")
      .order("respondido_em", { ascending: true }),
    auth.supabase.from("simulado_resultado")
      .select("client_event_id,finalizado_em,acertos,total,relatorio")
      .order("finalizado_em", { ascending: true }),
  ]);
  if (rr.error || sr.error) return { respostas: respostasLocais, simulados: simuladosLocais, sincronizado: false };

  const respostasRemotas: RespostaRegistrada[] = ((rr.data ?? []) as unknown as RespostaRemota[]).map((row) => ({
    id: row.client_event_id ?? "",
    questaoId: row.questao_id,
    disciplinaId: Array.isArray(row.questao) ? row.questao[0]?.disciplina_id : row.questao?.disciplina_id,
    correta: row.correta,
    em: new Date(row.respondido_em).getTime(),
  })).filter((r) => r.id && r.disciplinaId && Number.isFinite(r.em));
  const simuladosRemotos: ResultadoSimulado[] = ((sr.data ?? []) as unknown as SimuladoRemoto[]).map((row) => {
    const relatorio = row.relatorio && typeof row.relatorio === "object"
      ? row.relatorio as Record<string, unknown>
      : {};
    return {
      id: row.client_event_id ?? "",
      em: new Date(row.finalizado_em).getTime(),
      acertos: row.acertos,
      total: row.total,
      duracaoSeg: Number(relatorio.duracaoSeg ?? 0),
      porDisciplina: (relatorio.porDisciplina ?? {}) as ResultadoSimulado["porDisciplina"],
    };
  }).filter((r) => r.id && Number.isFinite(r.em));

  const respostas = unirPorId(respostasLocais, respostasRemotas);
  const simulados = unirPorId(simuladosLocais, simuladosRemotos);
  gravar(CHAVE_RESPOSTAS, respostas);
  gravar(CHAVE_SIMULADOS, simulados);
  return { respostas, simulados, sincronizado: true };
}

function unirPorId<T extends { id: string; em: number }>(a: T[], b: T[]): T[] {
  return [...new Map([...a, ...b].map((item) => [item.id, item])).values()].sort((x, y) => x.em - y.em);
}

export async function limparProgresso(): Promise<void> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CHAVE_RESPOSTAS);
    window.localStorage.removeItem(CHAVE_SIMULADOS);
  }
  const auth = await sessaoSupabase();
  if (!auth) return;
  await Promise.all([
    auth.supabase.from("resposta_usuario").delete().eq("owner_id", auth.user.id),
    auth.supabase.from("simulado_resultado").delete().eq("owner_id", auth.user.id),
  ]);
}

export interface Estatisticas {
  respondidas: number;
  acertos: number;
  erros: number;
  percentual: number;
  porDisciplina: Record<string, { acertos: number; total: number; pct: number }>;
  sequencia: number;
  ultimos14Dias: { dia: string; total: number; acertos: number }[];
}

function chaveDia(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function calcularEstatisticas(respostas: RespostaRegistrada[]): Estatisticas {
  const acertos = respostas.filter((r) => r.correta).length;
  const respondidas = respostas.length;
  const porDisciplina: Estatisticas["porDisciplina"] = {};
  for (const r of respostas) {
    const d = (porDisciplina[r.disciplinaId] ??= { acertos: 0, total: 0, pct: 0 });
    d.total++;
    if (r.correta) d.acertos++;
  }
  for (const d of Object.values(porDisciplina)) d.pct = d.total ? Math.round((d.acertos / d.total) * 100) : 0;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const porDia = new Map<string, { total: number; acertos: number }>();
  for (const r of respostas) {
    const k = chaveDia(r.em);
    const e = porDia.get(k) ?? { total: 0, acertos: 0 };
    e.total++;
    if (r.correta) e.acertos++;
    porDia.set(k, e);
  }
  const ultimos14Dias = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(d.getDate() - (13 - i));
    return { dia: chaveDia(d.getTime()), ...(porDia.get(chaveDia(d.getTime())) ?? { total: 0, acertos: 0 }) };
  });
  let sequencia = 0;
  const cursor = new Date(hoje);
  if (!porDia.has(chaveDia(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
  while (porDia.has(chaveDia(cursor.getTime()))) {
    sequencia++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return { respondidas, acertos, erros: respondidas - acertos, percentual: respondidas ? Math.round((acertos / respondidas) * 100) : 0, porDisciplina, sequencia, ultimos14Dias };
}

export function embaralhar<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
