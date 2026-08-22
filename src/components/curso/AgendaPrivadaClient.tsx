"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, LockKeyhole, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import type { Disciplina } from "@/domain/content/types";
import { resolverResumoEstudo } from "@/domain/curso/estudo-links";
import { alternarEventoAgenda, carregarAgenda, excluirEventoAgenda, salvarEventoAgenda, TIPOS_AGENDA, type EntradaAgenda, type EventoAgenda, type TipoAgenda } from "@/lib/agenda-privada";

const ROTULOS: Record<TipoAgenda, string> = { aula: "Aula", estudo: "Estudo", revisao: "Revisão", prova: "Prova", pessoal: "Pessoal" };
const ROTINAS_RAPIDAS: Array<{ titulo: string; tipo: TipoAgenda; tema: string; observacao: string }> = [
  { titulo: "Estudo focado", tipo: "estudo", tema: "Bloco de conteúdo", observacao: "50 minutos de estudo + 10 minutos de pausa." },
  { titulo: "Revisão de erros", tipo: "revisao", tema: "Questões erradas", observacao: "Revisar erros recentes e registrar o próximo passo." },
  { titulo: "Caso clínico", tipo: "estudo", tema: "Caso clínico", observacao: "Resolver, justificar conduta e ligar à mídia/resumo." },
  { titulo: "Mapa mental", tipo: "revisao", tema: "Mapa mental", observacao: "Revisar conceitos e relações do tema." },
];
const inicioMes = (data: Date) => new Date(data.getFullYear(), data.getMonth(), 1);
const fimMes = (data: Date) => new Date(data.getFullYear(), data.getMonth() + 1, 1);
const chaveDia = (data: Date) => `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
const paraInput = (data: Date) => `${chaveDia(data)}T${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}`;
const observacaoVisivel = (valor: string) => valor.replace(/^\[Plano privado[^\]]+\]\s*/u, "").trim();

export function AgendaPrivadaClient({ disciplinas }: { disciplinas: Disciplina[] }) {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [mes, setMes] = useState(() => inicioMes(new Date()));
  const [itens, setItens] = useState<EventoAgenda[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | TipoAgenda>("todos");
  const [apenasPendentes, setApenasPendentes] = useState(false);
  const [entrada, setEntrada] = useState<EntradaAgenda>(() => ({ titulo: "", inicio: paraInput(new Date()), tipo: "estudo", disciplinaId: "", tema: "", observacao: "" }));

  const carregar = async (referencia = mes) => {
    setOcupado(true);
    try {
      setItens(await carregarAgenda(inicioMes(referencia), fimMes(referencia)));
      setMensagem("");
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível carregar sua agenda.");
    } finally {
      setOcupado(false);
    }
  };

  useEffect(() => {
    let ativo = true;
    void import("@/infra/supabase/client").then(async ({ getSupabaseAnon }) => {
      const { data } = await getSupabaseAnon().auth.getSession();
      if (!ativo) return;
      const ok = Boolean(data.session?.user);
      setAutenticado(ok);
      if (ok) await carregar();
    }).catch(() => { if (ativo) setAutenticado(false); });
    return () => { ativo = false; };
    // carregamento inicial intencional; a troca de mês usa ações explícitas
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const porDia = useMemo(() => {
    const mapa = new Map<string, EventoAgenda[]>();
    for (const item of itens) {
      const dia = chaveDia(new Date(item.inicio));
      mapa.set(dia, [...(mapa.get(dia) ?? []), item]);
    }
    return mapa;
  }, [itens]);
  const dias = useMemo(() => {
    const primeiro = inicioMes(mes);
    const deslocamento = (primeiro.getDay() + 6) % 7;
    return Array.from({ length: 42 }, (_, indice) => new Date(mes.getFullYear(), mes.getMonth(), indice - deslocamento + 1));
  }, [mes]);
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return itens.filter((item) => (filtroTipo === "todos" || item.tipo === filtroTipo) && (!apenasPendentes || !item.concluido) && (!termo || [item.titulo, item.disciplinaId, item.tema, item.observacao].some((valor) => valor?.toLocaleLowerCase("pt-BR").includes(termo))));
  }, [apenasPendentes, busca, filtroTipo, itens]);
  const hoje = useMemo(() => filtrados.filter((item) => chaveDia(new Date(item.inicio)) === chaveDia(new Date())), [filtrados]);
  const pendentesGuiados = useMemo(() => filtrados.filter((item) => !item.concluido).slice(0, 8), [filtrados]);

  const linkDoItem = (item: EventoAgenda) => resolverResumoEstudo({ disciplinas, disciplinaId: item.disciplinaId, tema: item.tema, titulo: item.titulo });
  const moverMes = (delta: number) => { const proximo = new Date(mes.getFullYear(), mes.getMonth() + delta, 1); setMes(proximo); void carregar(proximo); };
  const aplicarRotina = (rotina: typeof ROTINAS_RAPIDAS[number]) => setEntrada((atual) => ({ ...atual, titulo: rotina.titulo, tipo: rotina.tipo, tema: rotina.tema, observacao: rotina.observacao, inicio: paraInput(new Date()) }));
  const salvar = async (evento: FormEvent) => { evento.preventDefault(); setOcupado(true); try { await salvarEventoAgenda(entrada); setEntrada({ titulo: "", inicio: paraInput(new Date()), tipo: "estudo", disciplinaId: "", tema: "", observacao: "" }); await carregar(); setMensagem("Compromisso salvo na sua agenda privada."); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Não foi possível salvar."); } finally { setOcupado(false); } };
  const concluir = async (item: EventoAgenda) => { setOcupado(true); try { await alternarEventoAgenda(item); await carregar(); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Não foi possível atualizar."); } finally { setOcupado(false); } };
  const excluir = async (item: EventoAgenda) => { if (!window.confirm(`Excluir "${item.titulo}"?`)) return; setOcupado(true); try { await excluirEventoAgenda(item.id); await carregar(); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Não foi possível excluir."); } finally { setOcupado(false); } };

  if (autenticado === null) return <div className="product-page max-w-5xl"><p role="status" aria-live="polite" className="legacy-loading">Verificando sua sessão...</p></div>;
  if (!autenticado) return <div className="product-page max-w-3xl"><section className="legacy-hero p-6"><LockKeyhole className="size-7 text-accent" /><h1 className="mt-3 text-2xl font-bold text-text">Agenda privada</h1><p className="mt-2 text-sm text-text-muted">Entre pela conta para ver ou registrar sua rotina. Nenhum evento é solicitado sem sessão.</p><Link href="/" className="mt-4 inline-flex text-sm font-semibold text-accent">Voltar ao início</Link></section></div>;

  return <div className="product-page max-w-6xl">
    <header className="legacy-hero p-6 sm:p-8"><div className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-accent-contrast"><CalendarDays className="size-7" /></span><div><p className="legacy-eyebrow">Espaço autenticado</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Agenda e rotina atual</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">Use a agenda como um painel diário: escolha uma rotina rápida, registre compromissos do semestre e marque o que foi concluído. Tudo fica sincronizado apenas com sua conta.</p></div></div></header>
    {mensagem && <p role="status" className="mt-5 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">{mensagem}</p>}
    <section className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft/50 p-5 sm:p-6" aria-live="polite"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Pendências guiadas</p><h2 className="mt-1 text-lg font-bold text-text">O que estudar agora</h2><p className="mt-1 text-sm text-text-muted">Cada item tenta levar diretamente ao resumo relacionado. Concluir um evento remove-o automaticamente desta fila.</p></div><button onClick={() => { setApenasPendentes(true); }} className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-muted">Ver só pendentes</button></div>{!pendentesGuiados.length ? <p className="mt-4 rounded-xl bg-surface p-4 text-sm font-semibold text-accent">Nenhuma pendência filtrada para este mês.</p> : <div className="mt-4 grid gap-2 md:grid-cols-2">{pendentesGuiados.map((item) => { const link = linkDoItem(item); return <article key={item.id} className="rounded-xl border border-border bg-surface p-3"><div className="flex items-start gap-3"><button aria-label="Concluir pendência" onClick={() => void concluir(item)} className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-border text-transparent hover:border-accent"><Check className="size-3.5" /></button><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-text">{item.tema || item.titulo}</p><p className="mt-1 text-xs text-text-muted">{item.disciplinaId || "Plano geral"} · {new Date(item.inicio).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</p>{link ? <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1"><Link href={link.href} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Estudar {link.subtemaNome}<ArrowRight className="size-3.5" /></Link><Link href={link.questoesHref} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Resolver questões<ArrowRight className="size-3.5" /></Link></div> : <p className="mt-2 text-xs text-text-faint">Tema sem resumo publicado; use a observação como roteiro.</p>}</div></div></article>; })}</div>}</section>
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-text">Foco de hoje</h2><p className="mt-1 text-sm text-text-muted">{hoje.length ? `${hoje.filter((item) => !item.concluido).length} pendência(s) para hoje.` : "Nenhum compromisso filtrado para hoje."}</p></div><button onClick={() => { setMes(inicioMes(new Date())); void carregar(inicioMes(new Date())); }} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted">Ir para hoje</button></div>{hoje.length > 0 && <div className="mt-4 grid gap-2 sm:grid-cols-2">{hoje.slice(0, 6).map((item) => <button key={item.id} onClick={() => void concluir(item)} className={`flex items-center gap-3 rounded-xl border border-border p-3 text-left ${item.concluido ? "bg-surface-2 text-text-faint line-through" : "bg-accent-soft text-accent"}`}><span className={`grid size-5 place-items-center rounded border ${item.concluido ? "border-accent bg-accent text-accent-contrast" : "border-border text-transparent"}`}><Check className="size-3.5" /></span><span className="min-w-0 truncate text-sm font-semibold">{item.titulo}</span><span className="ml-auto text-[11px] font-normal no-underline">{new Date(item.inicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></button>)}</div>}</section>
    <section className="mt-6 grid gap-2 sm:grid-cols-4" aria-label="Rotinas rápidas">{ROTINAS_RAPIDAS.map((rotina) => <button key={rotina.titulo} onClick={() => aplicarRotina(rotina)} className="rounded-xl border border-border bg-surface p-3 text-left transition-colors hover:border-accent"><p className="text-sm font-bold text-text">{rotina.titulo}</p><p className="mt-1 text-xs text-text-muted">Preencher novo compromisso</p></button>)}</section>
    <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}><div className="flex items-center justify-between gap-3"><button aria-label="Mês anterior" onClick={() => moverMes(-1)} className="rounded-lg border border-border p-2 text-text-muted hover:text-accent"><ChevronLeft className="size-4" /></button><h2 className="capitalize text-lg font-bold text-text">{mes.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</h2><div className="flex gap-2"><button onClick={() => { const hojeMes = inicioMes(new Date()); setMes(hojeMes); void carregar(hojeMes); }} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted">Hoje</button><button aria-label="Mês seguinte" onClick={() => moverMes(1)} className="rounded-lg border border-border p-2 text-text-muted hover:text-accent"><ChevronRight className="size-4" /></button></div></div><div className="mt-5 grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-border bg-border text-center text-[10px] font-bold uppercase tracking-wide text-text-faint">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((dia) => <div key={dia} className="bg-surface-2 py-2">{dia}</div>)}{dias.map((dia) => { const chave = chaveDia(dia); const eventos = (porDia.get(chave) ?? []).filter((item) => filtrados.some((visivel) => visivel.id === item.id)); const fora = dia.getMonth() !== mes.getMonth(); return <div key={chave} className={`min-h-24 bg-surface p-1.5 text-left ${fora ? "opacity-45" : ""}`}><p className="px-1 text-xs font-semibold text-text-muted">{dia.getDate()}</p>{eventos.slice(0, 3).map((item) => <button key={item.id} title={item.titulo} onClick={() => void concluir(item)} className={`mt-1 block w-full truncate rounded px-1.5 py-1 text-left text-[10px] font-semibold ${item.concluido ? "bg-surface-2 text-text-faint line-through" : "bg-accent-soft text-accent"}`}>{item.titulo}</button>)}{eventos.length > 3 && <p className="px-1 pt-1 text-[10px] text-text-faint">+{eventos.length - 3}</p>}</div>; })}</div></div>
      <form onSubmit={salvar} className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}><h2 className="flex items-center gap-2 text-lg font-bold text-text"><Plus className="size-5 text-accent" /> Novo compromisso</h2><p className="mt-1 text-sm text-text-muted">As rotinas rápidas preenchem este formulário; ajuste o tema e salve.</p><div className="mt-5 grid gap-3"><Campo label="Título"><input required value={entrada.titulo} maxLength={120} onChange={(e) => setEntrada({ ...entrada, titulo: e.target.value })} className={input} /></Campo><Campo label="Início"><input required type="datetime-local" value={entrada.inicio} onChange={(e) => setEntrada({ ...entrada, inicio: e.target.value })} className={input} /></Campo><Campo label="Fim (opcional)"><input type="datetime-local" value={entrada.fim ?? ""} onChange={(e) => setEntrada({ ...entrada, fim: e.target.value })} className={input} /></Campo><Campo label="Tipo"><select value={entrada.tipo} onChange={(e) => setEntrada({ ...entrada, tipo: e.target.value as TipoAgenda })} className={input}>{TIPOS_AGENDA.map((tipo) => <option key={tipo} value={tipo}>{ROTULOS[tipo]}</option>)}</select></Campo><Campo label="Disciplina"><input value={entrada.disciplinaId ?? ""} onChange={(e) => setEntrada({ ...entrada, disciplinaId: e.target.value })} placeholder="Ex.: Cardiologia" className={input} /></Campo><Campo label="Tema"><input value={entrada.tema ?? ""} onChange={(e) => setEntrada({ ...entrada, tema: e.target.value })} className={input} /></Campo><Campo label="Observação"><textarea rows={3} maxLength={2000} value={entrada.observacao ?? ""} onChange={(e) => setEntrada({ ...entrada, observacao: e.target.value })} className={`${input} resize-y`} /></Campo></div><button disabled={ocupado} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60"><Clock3 className="size-4" /> {ocupado ? "Salvando..." : "Salvar compromisso"}</button></form>
    </section>
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-bold text-text">Lista do mês</h2><p className="mt-1 text-sm text-text-muted">Filtre por tipo, busque por tema e marque o que concluiu.</p></div><button disabled={ocupado} onClick={() => void carregar()} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted"><RefreshCw className="size-3.5" /> Atualizar</button></div><div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto]"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-text-faint" /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar compromisso, tema ou disciplina" className={`${input} pl-9`} /></label><select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as typeof filtroTipo)} className={input}><option value="todos">Todos os tipos</option>{TIPOS_AGENDA.map((tipo) => <option key={tipo} value={tipo}>{ROTULOS[tipo]}</option>)}</select><label className="flex items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold text-text-muted"><input type="checkbox" checked={apenasPendentes} onChange={(e) => setApenasPendentes(e.target.checked)} />Só pendentes</label></div>{!filtrados.length ? <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Nenhum compromisso corresponde aos filtros atuais.</p> : <div className="mt-4 space-y-2">{filtrados.map((item) => { const detalhe = observacaoVisivel(item.observacao); const link = linkDoItem(item); return <article key={item.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-3"><button aria-label={item.concluido ? "Reabrir" : "Concluir"} onClick={() => void concluir(item)} className={`mt-0.5 grid size-5 place-items-center rounded border ${item.concluido ? "border-accent bg-accent text-accent-contrast" : "border-border text-transparent"}`}><Check className="size-3.5" /></button><div className="min-w-0 flex-1"><p className={`font-semibold text-text ${item.concluido ? "line-through opacity-60" : ""}`}>{item.titulo}</p><p className="mt-1 text-xs text-text-muted">{new Date(item.inicio).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · {ROTULOS[item.tipo]}{item.disciplinaId ? ` · ${item.disciplinaId}` : ""}{item.tema ? ` · ${item.tema}` : ""}</p>{detalhe && <p className="mt-2 whitespace-pre-line text-xs leading-5 text-text-faint">{detalhe}</p>}{link && <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1"><Link href={link.href} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Estudar {link.subtemaNome}<ArrowRight className="size-3.5" /></Link><Link href={link.questoesHref} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Resolver questões<ArrowRight className="size-3.5" /></Link></div>}</div><button aria-label="Excluir evento" onClick={() => void excluir(item)} className="text-text-faint hover:text-red-600"><Trash2 className="size-4" /></button></article>; })}</div>}</section>
  </div>;
}

const input = "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent";
function Campo({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-text-muted">{label}{children}</label>; }
