"use client";

import { isSupabaseConfigured } from "@/infra/supabase/config";

const CHAVE_CONTEUDOS = "codex:progresso-conteudos";
const EVENTO_ATUALIZADO = "codex:progresso-conteudo-atualizado";
const conciliacoes = new Map<string, Promise<void>>();

export type TipoConteudoProgresso = "resumo" | "caso";

export interface ProgressoConteudo {
  tipo: TipoConteudoProgresso;
  itemId: string;
  primeiroAcessoEm: number;
  ultimoAcessoEm: number;
  etapa: number;
  concluido: boolean;
  favorito: boolean;
  anotacao: string;
  atualizadoEm: number;
}

interface ProgressoRemoto {
  alvo_tipo: TipoConteudoProgresso;
  alvo_id: string;
  primeiro_acesso_em: string;
  ultimo_acesso_em: string;
  etapa: number;
  concluido: boolean;
  favorito: boolean;
  anotacao: string;
  atualizado_em: string;
}

function chave(tipo: TipoConteudoProgresso, itemId: string): string {
  return `${tipo}:${itemId}`;
}

function lerMapa(): Record<string, ProgressoConteudo> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CHAVE_CONTEUDOS);
    return raw ? JSON.parse(raw) as Record<string, ProgressoConteudo> : {};
  } catch {
    return {};
  }
}

function gravarMapa(mapa: Record<string, ProgressoConteudo>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAVE_CONTEUDOS, JSON.stringify(mapa));
  } catch {
    // O estudo continua funcional mesmo se o navegador bloquear armazenamento.
  }
}

function emitir(item: ProgressoConteudo): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENTO_ATUALIZADO, { detail: item }));
}

export function observarProgressoConteudo(
  callback: (item: ProgressoConteudo) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = (evento: Event) => callback((evento as CustomEvent<ProgressoConteudo>).detail);
  window.addEventListener(EVENTO_ATUALIZADO, handler);
  return () => window.removeEventListener(EVENTO_ATUALIZADO, handler);
}

export function lerProgressoConteudos(): ProgressoConteudo[] {
  return Object.values(lerMapa()).sort((a, b) => b.ultimoAcessoEm - a.ultimoAcessoEm);
}

export function lerProgressoConteudo(
  tipo: TipoConteudoProgresso,
  itemId: string,
): ProgressoConteudo | null {
  return lerMapa()[chave(tipo, itemId)] ?? null;
}

function novoProgresso(tipo: TipoConteudoProgresso, itemId: string): ProgressoConteudo {
  const agora = Date.now();
  return {
    tipo,
    itemId,
    primeiroAcessoEm: agora,
    ultimoAcessoEm: agora,
    etapa: tipo === "caso" ? 1 : 0,
    concluido: false,
    favorito: false,
    anotacao: "",
    atualizadoEm: agora,
  };
}

export function atualizarProgressoConteudo(
  tipo: TipoConteudoProgresso,
  itemId: string,
  alteracoes: Partial<Pick<ProgressoConteudo,
    "ultimoAcessoEm" | "etapa" | "concluido" | "favorito" | "anotacao"
  >>,
): ProgressoConteudo {
  const mapa = lerMapa();
  const anterior = mapa[chave(tipo, itemId)] ?? novoProgresso(tipo, itemId);
  const item = { ...anterior, ...alteracoes, atualizadoEm: Date.now() };
  mapa[chave(tipo, itemId)] = item;
  gravarMapa(mapa);
  emitir(item);
  void enviarProgresso(item);
  return item;
}

export function registrarAcessoConteudo(
  tipo: TipoConteudoProgresso,
  itemId: string,
): ProgressoConteudo {
  const mapa = lerMapa();
  const existente = mapa[chave(tipo, itemId)];
  const base = existente ?? novoProgresso(tipo, itemId);
  const acessado = { ...base, ultimoAcessoEm: Date.now(), atualizadoEm: Date.now() };
  // Nao envia antes de consultar a conta: isso evita que um dispositivo novo
  // ou desatualizado apague favorito, anotacao e conclusao mais recentes.
  mapa[chave(tipo, itemId)] = acessado;
  gravarMapa(mapa);
  emitir(acessado);
  const k = chave(tipo, itemId);
  const conciliacao = conciliarAcesso(acessado, base, Boolean(existente))
    .finally(() => {
      if (conciliacoes.get(k) === conciliacao) conciliacoes.delete(k);
    });
  conciliacoes.set(k, conciliacao);
  return acessado;
}

async function sessaoSupabase() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { getSupabaseAnon } = await import("@/infra/supabase/client");
    const supabase = getSupabaseAnon();
    const atual = await supabase.auth.getSession();
    return atual.data.session?.user ? { supabase, user: atual.data.session.user } : null;
  } catch {
    return null;
  }
}

function paraRemoto(ownerId: string, item: ProgressoConteudo) {
  return {
    owner_id: ownerId,
    alvo_tipo: item.tipo,
    alvo_id: item.itemId,
    primeiro_acesso_em: new Date(item.primeiroAcessoEm).toISOString(),
    ultimo_acesso_em: new Date(item.ultimoAcessoEm).toISOString(),
    etapa: item.etapa,
    concluido: item.concluido,
    favorito: item.favorito,
    anotacao: item.anotacao,
    atualizado_em: new Date(item.atualizadoEm).toISOString(),
  };
}

function doRemoto(row: ProgressoRemoto): ProgressoConteudo {
  return {
    tipo: row.alvo_tipo,
    itemId: row.alvo_id,
    primeiroAcessoEm: new Date(row.primeiro_acesso_em).getTime(),
    ultimoAcessoEm: new Date(row.ultimo_acesso_em).getTime(),
    etapa: row.etapa,
    concluido: row.concluido,
    favorito: row.favorito,
    anotacao: row.anotacao,
    atualizadoEm: new Date(row.atualizado_em).getTime(),
  };
}

async function enviarProgresso(item: ProgressoConteudo): Promise<void> {
  await conciliacoes.get(chave(item.tipo, item.itemId));
  const auth = await sessaoSupabase();
  if (!auth) return;
  const atual = lerProgressoConteudo(item.tipo, item.itemId) ?? item;
  await auth.supabase.from("progresso_conteudo").upsert(
    paraRemoto(auth.user.id, atual),
    { onConflict: "owner_id,alvo_tipo,alvo_id" },
  );
}

async function conciliarAcesso(
  acessado: ProgressoConteudo,
  baseLocal: ProgressoConteudo,
  existiaLocal: boolean,
): Promise<void> {
  const auth = await sessaoSupabase();
  if (!auth) return;
  const remoto = await auth.supabase.from("progresso_conteudo")
    .select("alvo_tipo,alvo_id,primeiro_acesso_em,ultimo_acesso_em,etapa,concluido,favorito,anotacao,atualizado_em")
    .eq("alvo_tipo", acessado.tipo)
    .eq("alvo_id", acessado.itemId)
    .maybeSingle();
  if (remoto.error) return;

  const atual = lerProgressoConteudo(acessado.tipo, acessado.itemId) ?? acessado;
  const salvo = remoto.data ? doRemoto(remoto.data as ProgressoRemoto) : null;
  const origem = salvo && (!existiaLocal || salvo.atualizadoEm > baseLocal.atualizadoEm)
    ? salvo
    : baseLocal;
  const mesclado: ProgressoConteudo = {
    ...origem,
    ultimoAcessoEm: acessado.ultimoAcessoEm,
    etapa: atual.etapa !== acessado.etapa ? atual.etapa : origem.etapa,
    concluido: atual.concluido !== acessado.concluido ? atual.concluido : origem.concluido,
    favorito: atual.favorito !== acessado.favorito ? atual.favorito : origem.favorito,
    anotacao: atual.anotacao !== acessado.anotacao ? atual.anotacao : origem.anotacao,
    atualizadoEm: Date.now(),
  };

  const mapa = lerMapa();
  mapa[chave(mesclado.tipo, mesclado.itemId)] = mesclado;
  gravarMapa(mapa);
  emitir(mesclado);
  await auth.supabase.from("progresso_conteudo").upsert(
    paraRemoto(auth.user.id, mesclado),
    { onConflict: "owner_id,alvo_tipo,alvo_id" },
  );
}

/** Reconciliacao last-write-wins: a copia mais recente vence por item. */
export async function sincronizarProgressoConteudos(): Promise<{
  conteudos: ProgressoConteudo[];
  sincronizado: boolean;
}> {
  const locais = lerProgressoConteudos();
  const auth = await sessaoSupabase();
  if (!auth) return { conteudos: locais, sincronizado: false };

  const remoto = await auth.supabase.from("progresso_conteudo")
    .select("alvo_tipo,alvo_id,primeiro_acesso_em,ultimo_acesso_em,etapa,concluido,favorito,anotacao,atualizado_em");
  if (remoto.error) return { conteudos: locais, sincronizado: false };

  const mapa = new Map<string, ProgressoConteudo>();
  for (const item of [...locais, ...((remoto.data ?? []) as ProgressoRemoto[]).map(doRemoto)]) {
    const k = chave(item.tipo, item.itemId);
    const atual = mapa.get(k);
    if (!atual || item.atualizadoEm > atual.atualizadoEm) mapa.set(k, item);
  }
  const mesclados = [...mapa.values()];
  if (mesclados.length) {
    const envio = await auth.supabase.from("progresso_conteudo").upsert(
      mesclados.map((item) => paraRemoto(auth.user.id, item)),
      { onConflict: "owner_id,alvo_tipo,alvo_id" },
    );
    if (envio.error) return { conteudos: locais, sincronizado: false };
  }
  gravarMapa(Object.fromEntries(mesclados.map((item) => [chave(item.tipo, item.itemId), item])));
  return { conteudos: mesclados.sort((a, b) => b.ultimoAcessoEm - a.ultimoAcessoEm), sincronizado: true };
}

export async function limparProgressoConteudos(): Promise<void> {
  if (typeof window !== "undefined") window.localStorage.removeItem(CHAVE_CONTEUDOS);
  const auth = await sessaoSupabase();
  if (!auth) return;
  await auth.supabase.from("progresso_conteudo").delete().eq("owner_id", auth.user.id);
}
