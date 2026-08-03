"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, LockKeyhole, Plus, RefreshCw, Trash2 } from "lucide-react";
import { alternarEventoAgenda, carregarAgenda, excluirEventoAgenda, salvarEventoAgenda, TIPOS_AGENDA, type EntradaAgenda, type EventoAgenda, type TipoAgenda } from "@/lib/agenda-privada";

const ROTULOS: Record<TipoAgenda, string> = { aula: "Aula", estudo: "Estudo", revisao: "Revisao", prova: "Prova", pessoal: "Pessoal" };
const inicioMes = (data: Date) => new Date(data.getFullYear(), data.getMonth(), 1);
const fimMes = (data: Date) => new Date(data.getFullYear(), data.getMonth() + 1, 1);
const chaveDia = (data: Date) => `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
const paraInput = (data: Date) => `${chaveDia(data)}T${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}`;

export function AgendaPrivadaClient() {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [mes, setMes] = useState(() => inicioMes(new Date()));
  const [itens, setItens] = useState<EventoAgenda[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [entrada, setEntrada] = useState<EntradaAgenda>(() => ({ titulo: "", inicio: paraInput(new Date()), tipo: "estudo", disciplinaId: "", tema: "", observacao: "" }));

  const carregar = async (referencia = mes) => {
    setOcupado(true);
    try { setItens(await carregarAgenda(inicioMes(referencia), fimMes(referencia))); setMensagem(""); }
    catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel carregar sua agenda."); }
    finally { setOcupado(false); }
  };

  useEffect(() => {
    let ativo = true;
    void import("@/infra/supabase/client").then(async ({ getSupabaseAnon }) => {
      const { data } = await getSupabaseAnon().auth.getSession();
      if (!ativo) return;
      const ok = Boolean(data.session?.user); setAutenticado(ok); if (ok) await carregar();
    }).catch(() => { if (ativo) setAutenticado(false); });
    return () => { ativo = false; };
  // carregamento inicial intencional; a troca de mes usa acoes explicitas
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
    const primeiro = inicioMes(mes); const deslocamento = (primeiro.getDay() + 6) % 7;
    return Array.from({ length: 42 }, (_, indice) => new Date(mes.getFullYear(), mes.getMonth(), indice - deslocamento + 1));
  }, [mes]);

  const moverMes = (delta: number) => { const proximo = new Date(mes.getFullYear(), mes.getMonth() + delta, 1); setMes(proximo); void carregar(proximo); };
  const salvar = async (evento: FormEvent) => { evento.preventDefault(); setOcupado(true); try { await salvarEventoAgenda(entrada); setEntrada({ titulo: "", inicio: paraInput(new Date()), tipo: "estudo", disciplinaId: "", tema: "", observacao: "" }); await carregar(); setMensagem("Evento salvo na sua agenda privada."); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel salvar."); } finally { setOcupado(false); } };
  const concluir = async (item: EventoAgenda) => { setOcupado(true); try { await alternarEventoAgenda(item); await carregar(); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel atualizar."); } finally { setOcupado(false); } };
  const excluir = async (item: EventoAgenda) => { if (!window.confirm(`Excluir \"${item.titulo}\"?`)) return; setOcupado(true); try { await excluirEventoAgenda(item.id); await carregar(); } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel excluir."); } finally { setOcupado(false); } };

  if (autenticado === null) return <div className="mx-auto max-w-5xl px-5 py-12 text-sm text-text-muted">Verificando sua sessao...</div>;
  if (!autenticado) return <div className="mx-auto max-w-3xl px-5 py-12"><section className="rounded-2xl border border-border bg-surface p-6"><LockKeyhole className="size-7 text-accent" /><h1 className="mt-3 text-2xl font-bold text-text">Agenda privada</h1><p className="mt-2 text-sm text-text-muted">Entre pela conta para ver ou registrar sua rotina. Nenhum evento e solicitado sem sessao.</p><Link href="/" className="mt-4 inline-flex text-sm font-semibold text-accent">Voltar ao inicio</Link></section></div>;

  return <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
    <header className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}><div className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-accent-contrast"><CalendarDays className="size-7" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Espaco autenticado</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Agenda e rotina atual</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">Registre aulas, provas, estudos e revisoes do semestre atual. A agenda e privada, sincronizada com sua conta e pode ser reutilizada em cada novo periodo.</p></div></div></header>
    {mensagem && <p role="status" className="mt-5 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">{mensagem}</p>}
    <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex items-center justify-between gap-3"><button aria-label="Mes anterior" onClick={() => moverMes(-1)} className="rounded-lg border border-border p-2 text-text-muted hover:text-accent"><ChevronLeft className="size-4" /></button><h2 className="capitalize text-lg font-bold text-text">{mes.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</h2><div className="flex gap-2"><button onClick={() => { const hoje = inicioMes(new Date()); setMes(hoje); void carregar(hoje); }} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted">Hoje</button><button aria-label="Mes seguinte" onClick={() => moverMes(1)} className="rounded-lg border border-border p-2 text-text-muted hover:text-accent"><ChevronRight className="size-4" /></button></div></div>
        <div className="mt-5 grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-border bg-border text-center text-[10px] font-bold uppercase tracking-wide text-text-faint">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((dia) => <div key={dia} className="bg-surface-2 py-2">{dia}</div>)}{dias.map((dia) => { const chave = chaveDia(dia); const eventos = porDia.get(chave) ?? []; const fora = dia.getMonth() !== mes.getMonth(); return <div key={chave} className={`min-h-24 bg-surface p-1.5 text-left ${fora ? "opacity-45" : ""}`}><p className="px-1 text-xs font-semibold text-text-muted">{dia.getDate()}</p>{eventos.slice(0, 3).map((item) => <button key={item.id} title={item.titulo} onClick={() => void concluir(item)} className={`mt-1 block w-full truncate rounded px-1.5 py-1 text-left text-[10px] font-semibold ${item.concluido ? "bg-surface-2 text-text-faint line-through" : "bg-accent-soft text-accent"}`}>{item.titulo}</button>)}{eventos.length > 3 && <p className="px-1 pt-1 text-[10px] text-text-faint">+{eventos.length - 3}</p>}</div>; })}</div>
      </div>
      <form onSubmit={salvar} className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}><h2 className="flex items-center gap-2 text-lg font-bold text-text"><Plus className="size-5 text-accent" /> Novo compromisso</h2><p className="mt-1 text-sm text-text-muted">Use esta rotina como modelo em cada semestre.</p><div className="mt-5 grid gap-3"><Campo label="Titulo"><input required value={entrada.titulo} maxLength={180} onChange={(e) => setEntrada({ ...entrada, titulo: e.target.value })} className={input} /></Campo><Campo label="Inicio"><input required type="datetime-local" value={entrada.inicio} onChange={(e) => setEntrada({ ...entrada, inicio: e.target.value })} className={input} /></Campo><Campo label="Fim (opcional)"><input type="datetime-local" value={entrada.fim ?? ""} onChange={(e) => setEntrada({ ...entrada, fim: e.target.value })} className={input} /></Campo><Campo label="Tipo"><select value={entrada.tipo} onChange={(e) => setEntrada({ ...entrada, tipo: e.target.value as TipoAgenda })} className={input}>{TIPOS_AGENDA.map((tipo) => <option key={tipo} value={tipo}>{ROTULOS[tipo]}</option>)}</select></Campo><Campo label="Disciplina"><input value={entrada.disciplinaId ?? ""} onChange={(e) => setEntrada({ ...entrada, disciplinaId: e.target.value })} placeholder="Ex.: Cardiologia" className={input} /></Campo><Campo label="Tema"><input value={entrada.tema ?? ""} onChange={(e) => setEntrada({ ...entrada, tema: e.target.value })} className={input} /></Campo><Campo label="Observacao"><textarea rows={3} maxLength={2000} value={entrada.observacao ?? ""} onChange={(e) => setEntrada({ ...entrada, observacao: e.target.value })} className={`${input} resize-y`} /></Campo></div><button disabled={ocupado} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60"><Clock3 className="size-4" /> {ocupado ? "Salvando..." : "Salvar compromisso"}</button></form>
    </section>
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-text">Lista do mes</h2><p className="mt-1 text-sm text-text-muted">Marque para concluir; a alteracao fica sincronizada na conta.</p></div><button disabled={ocupado} onClick={() => void carregar()} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted"><RefreshCw className="size-3.5" /> Atualizar</button></div>{!itens.length ? <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Nenhum compromisso neste mes. Comece registrando sua rotina atual ou uma prova.</p> : <div className="mt-4 space-y-2">{itens.map((item) => <article key={item.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-3"><button aria-label={item.concluido ? "Reabrir" : "Concluir"} onClick={() => void concluir(item)} className={`mt-0.5 grid size-5 place-items-center rounded border ${item.concluido ? "border-accent bg-accent text-accent-contrast" : "border-border text-transparent"}`}><Check className="size-3.5" /></button><div className="min-w-0 flex-1"><p className={`font-semibold text-text ${item.concluido ? "line-through opacity-60" : ""}`}>{item.titulo}</p><p className="mt-1 text-xs text-text-muted">{new Date(item.inicio).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · {ROTULOS[item.tipo]}{item.disciplinaId ? ` · ${item.disciplinaId}` : ""}{item.tema ? ` · ${item.tema}` : ""}</p></div><button aria-label="Excluir evento" onClick={() => void excluir(item)} className="text-text-faint hover:text-red-600"><Trash2 className="size-4" /></button></article>)}</div>}</section>
  </div>;
}

const input = "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent";
function Campo({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-text-muted">{label}{children}</label>; }
