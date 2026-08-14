"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, Check, CircleAlert, Cloud, CloudOff, Plus, RotateCcw, Target } from "lucide-react";
import type { Disciplina } from "@/domain/content/types";
import { resolverResumoEstudo } from "@/domain/curso/estudo-links";
import type { AtividadeSemana, EntradaFoco, EstadoTarefa, PrioridadeTarefa, SemanaAtualDados, TarefaSemana } from "@/domain/semana/types";
import { alternarTarefaSemana, atualizarEstadoTarefaSemana, carregarSemanaAtual, periodoAtual, salvarFocoSemana, salvarSemanaAtual, salvarTarefaSemana } from "@/lib/semana-atual";
import { MateriaisDaSemanaPanel } from "@/components/semana/MateriaisDaSemanaPanel";

const ATIVIDADES: Array<{ id: AtividadeSemana; label: string }> = [
  { id: "resumo", label: "Resumo" },
  { id: "questoes", label: "Questões" },
  { id: "caso", label: "Caso clínico" },
  { id: "revisao", label: "Revisão" },
  { id: "mapa", label: "Mapa mental" },
  { id: "pdf", label: "PDF" },
  { id: "outro", label: "Outro" },
];

type Props = { disciplinas: Disciplina[]; compacto?: boolean };

export function SemanaAtualPanel({ disciplinas, compacto = false }: Props) {
  const semanaPadrao = useMemo(() => periodoAtual(), []);
  const [dados, setDados] = useState<SemanaAtualDados>({ semana: null, focos: [], tarefas: [], remoto: false });
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [semana, setSemana] = useState({ inicio: semanaPadrao.inicio, fim: semanaPadrao.fim, periodo: "", objetivo: "" });
  const [foco, setFoco] = useState({ disciplinaId: "", tema: "", subtema: "", prioridade: "media" as EntradaFoco["prioridade"] });
  const [tarefa, setTarefa] = useState({ data: semanaPadrao.inicio, titulo: "", objetivo: "", atividade: "questoes" as AtividadeSemana, duracaoMin: "", prioridade: "media" as PrioridadeTarefa });

  const carregar = async () => {
    setCarregando(true);
    try {
      const atual = await carregarSemanaAtual();
      setDados(atual);
      if (atual.semana) {
        setSemana({ inicio: atual.semana.inicio, fim: atual.semana.fim, periodo: atual.semana.periodo ? String(atual.semana.periodo) : "", objetivo: atual.semana.objetivo });
        const focoAtual = atual.focos.find((item) => item.estado !== "rejeitado");
        if (focoAtual) setFoco({ disciplinaId: focoAtual.disciplinaId, tema: focoAtual.tema, subtema: focoAtual.subtema, prioridade: focoAtual.prioridade });
      }
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível carregar a semana atual.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { void Promise.resolve().then(() => carregar()); }, []);

  const tarefasOrdenadas = useMemo(() => [...dados.tarefas].sort((a, b) => Number(a.estado === "concluido") - Number(b.estado === "concluido") || pesoPrioridade(a.prioridade) - pesoPrioridade(b.prioridade) || a.data.localeCompare(b.data) || a.criadoEm.localeCompare(b.criadoEm)), [dados.tarefas]);
  const tarefasPendentes = useMemo(() => tarefasOrdenadas.filter((item) => item.estado !== "concluido" && item.estado !== "bloqueado"), [tarefasOrdenadas]);
  const tarefasConcluidas = dados.tarefas.length - tarefasPendentes.length;
  const percentual = dados.tarefas.length ? Math.round((tarefasConcluidas / dados.tarefas.length) * 100) : 0;
  const proximaTarefa = tarefasPendentes[0] ?? null;

  const salvar = async (evento: FormEvent) => {
    evento.preventDefault();
    setOcupado(true);
    setMensagem("");
    try {
      const salvo = await salvarSemanaAtual({ inicio: semana.inicio, fim: semana.fim, periodo: semana.periodo ? Number(semana.periodo) : null, objetivo: semana.objetivo, confirmada: true });
      let focos = salvo.focos;
      if (foco.disciplinaId) {
        await salvarFocoSemana(salvo.semana!.id, foco);
        focos = (await carregarSemanaAtual()).focos;
      }
      setDados({ ...salvo, focos });
      setMensagem("Semana atual confirmada. O site só usará este foco como evidência da sua rotina.");
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível salvar a semana atual.");
    } finally {
      setOcupado(false);
    }
  };

  const adicionarTarefa = async (evento: FormEvent) => {
    evento.preventDefault();
    if (!dados.semana) {
      setMensagem("Confirme a semana antes de adicionar um próximo passo.");
      return;
    }
    setOcupado(true);
    setMensagem("");
    try {
      await salvarTarefaSemana(dados.semana.id, { data: tarefa.data, titulo: tarefa.titulo, objetivo: tarefa.objetivo, atividade: tarefa.atividade, duracaoMin: tarefa.duracaoMin ? Number(tarefa.duracaoMin) : null, disciplinaId: foco.disciplinaId, tema: foco.tema, subtema: foco.subtema, prioridade: tarefa.prioridade });
      setTarefa((atual) => ({ ...atual, titulo: "", objetivo: "", duracaoMin: "" }));
      await carregar();
      setMensagem("Próximo passo salvo na semana.");
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível salvar o próximo passo.");
    } finally {
      setOcupado(false);
    }
  };

  const alternar = async (item: TarefaSemana) => {
    setOcupado(true);
    setMensagem("");
    try {
      await alternarTarefaSemana(item);
      await carregar();
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível atualizar a tarefa.");
    } finally {
      setOcupado(false);
    }
  };

  const mudarEstado = async (item: TarefaSemana, estado: EstadoTarefa) => {
    setOcupado(true);
    setMensagem("");
    try {
      await atualizarEstadoTarefaSemana(item, estado);
      await carregar();
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível atualizar o estado.");
    } finally {
      setOcupado(false);
    }
  };

  if (carregando) return <section className="mt-6 rounded-2xl border border-border bg-surface p-5" aria-label="Carregando semana atual"><div className="h-4 w-40 animate-pulse rounded bg-surface-2" /><div className="mt-3 h-10 animate-pulse rounded-xl bg-surface-2" /></section>;

  const rotuloSincronizacao = dados.remoto ? "Sincronizada com sua conta" : "Salva neste dispositivo até a sessão ser conectada";
  return <section className={`mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 ${compacto ? "" : "shadow-[var(--shadow)]"}`} aria-labelledby="titulo-semana-atual">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3"><span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent"><CalendarCheck className="size-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Contexto privado</p><h2 id="titulo-semana-atual" className="mt-1 text-lg font-bold text-text">Semana atual</h2><p className="mt-1 text-sm text-text-muted">O foco só muda quando você confirma; OMED é apenas desempate.</p></div></div>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-text-muted">{dados.remoto ? <Cloud className="size-3.5 text-accent" /> : <CloudOff className="size-3.5 text-gold" />}{rotuloSincronizacao}</span>
    </div>

    {mensagem && <p role="status" className="mt-4 rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-xs text-text-muted">{mensagem}</p>}
    {!dados.semana && <p className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-border bg-surface-2 p-3 text-xs leading-5 text-text-muted"><CircleAlert className="mt-0.5 size-4 shrink-0 text-gold" />Nenhuma semana foi confirmada ainda. O site não vai adivinhar a matéria atual.</p>}

    <form onSubmit={salvar} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Campo label="Início"><input required type="date" value={semana.inicio} onChange={(e) => setSemana({ ...semana, inicio: e.target.value })} className={input} /></Campo>
      <Campo label="Fim"><input required type="date" value={semana.fim} onChange={(e) => setSemana({ ...semana, fim: e.target.value })} className={input} /></Campo>
      <Campo label="Período"><select value={semana.periodo} onChange={(e) => setSemana({ ...semana, periodo: e.target.value })} className={input}><option value="">Não informado</option>{Array.from({ length: 12 }, (_, i) => i + 1).map((item) => <option key={item} value={item}>{item}º período</option>)}</select></Campo>
      <Campo label="Disciplina em foco"><select value={foco.disciplinaId} onChange={(e) => setFoco({ ...foco, disciplinaId: e.target.value })} className={input}><option value="">Confirmar depois</option>{disciplinas.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></Campo>
      <button disabled={ocupado} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60"><Target className="size-4" />{ocupado ? "Salvando…" : dados.semana ? "Atualizar foco" : "Confirmar semana"}</button>
      <Campo label="Objetivo da semana" extra="Opcional"><input maxLength={500} value={semana.objetivo} onChange={(e) => setSemana({ ...semana, objetivo: e.target.value })} placeholder="Ex.: consolidar cardio antes da prova" className={`${input} sm:col-span-2 lg:col-span-4`} /></Campo>
      {foco.disciplinaId && <div className="grid gap-3 sm:col-span-2 lg:col-span-5 lg:grid-cols-3"><Campo label="Tema"><input maxLength={180} value={foco.tema} onChange={(e) => setFoco({ ...foco, tema: e.target.value })} className={input} /></Campo><Campo label="Subtema"><input maxLength={180} value={foco.subtema} onChange={(e) => setFoco({ ...foco, subtema: e.target.value })} className={input} /></Campo><Campo label="Prioridade"><select value={foco.prioridade} onChange={(e) => setFoco({ ...foco, prioridade: e.target.value as EntradaFoco["prioridade"] })} className={input}><option value="alta">Alta</option><option value="media">Média</option><option value="baixa">Baixa</option></select></Campo></div>}
    </form>

    {dados.semana && <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.72fr)]">
      <div>
        <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-4" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Fila que se atualiza sozinha</p><h3 className="mt-1 text-base font-bold text-text">Próximo estudo recomendado</h3></div><span className="rounded-full bg-surface px-2.5 py-1 text-xs font-bold text-accent">{tarefasConcluidas}/{dados.tarefas.length} · {percentual}%</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percentual}%` }} /></div>
          {proximaTarefa ? <div className="mt-4 flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-accent"><BookOpen className="size-4" /></span><div className="min-w-0"><p className="text-sm font-bold text-text">{proximaTarefa.tema || proximaTarefa.titulo}</p><p className="mt-1 text-xs leading-5 text-text-muted">{proximaTarefa.disciplinaId || "Plano geral"} · {proximaTarefa.titulo}</p>{(() => { const link = resolverResumoEstudo({ disciplinas, disciplinaId: proximaTarefa.disciplinaId, tema: proximaTarefa.tema, titulo: proximaTarefa.titulo, recursoId: proximaTarefa.recursoId }); return link ? <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1"><Link href={link.href} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Estudar resumo: {link.subtemaNome}<ArrowRight className="size-3.5" /></Link><Link href={link.questoesHref} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Resolver questões<ArrowRight className="size-3.5" /></Link></div> : <p className="mt-2 text-xs text-text-faint">Ainda sem resumo publicado para este vínculo; use o tema como roteiro e registre a lacuna.</p>; })()}</div></div> : <p className="mt-3 text-sm font-semibold text-accent">Tudo concluído nesta semana. Escolha um ponto fraco para revisão espaçada.</p>}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-text">Próximos passos</h3><button type="button" onClick={() => void carregar()} className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-faint hover:text-accent"><RotateCcw className="size-3.5" /> Atualizar</button></div>{!dados.tarefas.length ? <p className="mt-3 rounded-xl bg-surface-2 p-3 text-xs text-text-muted">Nenhum passo planejado. Comece com uma ação pequena e rastreável.</p> : <><div className="mt-3 space-y-2">{(mostrarTodas ? tarefasOrdenadas : tarefasOrdenadas.slice(0, 6)).map((item) => <Tarefa key={item.id} item={item} disciplinas={disciplinas} onToggle={() => void alternar(item)} onEstado={(estado) => void mudarEstado(item, estado)} disabled={ocupado} />)}</div>{dados.tarefas.length > 6 && <button type="button" onClick={() => setMostrarTodas((atual) => !atual)} className="mt-3 text-xs font-bold text-accent hover:underline">{mostrarTodas ? "Mostrar menos" : `Ver todos os ${dados.tarefas.length} passos`}</button>}</>}
      </div>
      <form onSubmit={adicionarTarefa} className="rounded-xl border border-border bg-surface-2 p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-text"><Plus className="size-4 text-accent" /> Adicionar próximo passo</h3>
        <div className="mt-3 grid gap-3">
          <Campo label="Título"><input required maxLength={180} value={tarefa.titulo} onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })} placeholder="Ex.: revisar 10 questões de valvopatias" className={input} /></Campo>
          <Campo label="Objetivo" extra="Opcional"><input maxLength={500} value={tarefa.objetivo} onChange={(e) => setTarefa({ ...tarefa, objetivo: e.target.value })} placeholder="O que precisa ficar claro ao final" className={input} /></Campo>
          <div className="grid grid-cols-2 gap-3"><Campo label="Data"><input required type="date" value={tarefa.data} onChange={(e) => setTarefa({ ...tarefa, data: e.target.value })} className={input} /></Campo><Campo label="Duração"><input type="number" min="1" max="720" value={tarefa.duracaoMin} onChange={(e) => setTarefa({ ...tarefa, duracaoMin: e.target.value })} placeholder="min" className={input} /></Campo></div>
          <div className="grid grid-cols-2 gap-3"><Campo label="Atividade"><select value={tarefa.atividade} onChange={(e) => setTarefa({ ...tarefa, atividade: e.target.value as AtividadeSemana })} className={input}>{ATIVIDADES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Campo><Campo label="Prioridade"><select value={tarefa.prioridade} onChange={(e) => setTarefa({ ...tarefa, prioridade: e.target.value as PrioridadeTarefa })} className={input}><option value="critica">Crítica</option><option value="alta">Alta</option><option value="media">Média</option><option value="baixa">Baixa</option></select></Campo></div>
          <button disabled={ocupado} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-muted hover:border-accent hover:text-accent disabled:opacity-60"><Plus className="size-4" /> Salvar passo</button>
        </div>
      </form>
    </div>}
    {dados.semana && <MateriaisDaSemanaPanel semanaId={dados.semana.id} />}
  </section>;
}

function Tarefa({ item, disciplinas, onToggle, onEstado, disabled }: { item: TarefaSemana; disciplinas: Disciplina[]; onToggle: () => void; onEstado: (estado: EstadoTarefa) => void; disabled: boolean }) {
  const link = resolverResumoEstudo({ disciplinas, disciplinaId: item.disciplinaId, tema: item.tema, titulo: item.titulo, recursoId: item.recursoId });
  return <article className={`flex w-full items-start gap-3 rounded-xl border border-border p-3 transition-colors hover:border-accent ${item.estado === "concluido" ? "bg-surface-2" : "bg-surface"}`}>
    <button type="button" aria-label={item.estado === "concluido" ? "Reabrir tarefa" : "Concluir tarefa"} disabled={disabled || item.estado === "bloqueado"} onClick={onToggle} className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded border ${item.estado === "concluido" ? "border-accent bg-accent text-accent-contrast" : "border-border text-transparent"}`}><Check className="size-3.5" /></button>
    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className={`text-sm font-semibold ${item.estado === "concluido" ? "text-text-faint line-through" : "text-text"}`}>{item.titulo}</p><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${corEstado(item.estado)}`}>{rotuloEstado(item.estado)}</span><span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-text-faint">{item.prioridade}</span></div><p className="mt-1 text-xs text-text-muted">{item.subtema || item.tema || "Conteúdo guiado pelo título"}{item.disciplinaId ? ` · ${item.disciplinaId}` : ""} · {new Date(`${item.data}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}{item.duracaoMin ? ` · ${item.duracaoMin} min` : ""}</p>{item.objetivo && <p className="mt-1 text-xs leading-5 text-text-faint">{item.objetivo}</p>}<div className="mt-2 flex flex-wrap items-center gap-2"><label className="text-[11px] font-semibold text-text-faint">Estado <select aria-label={`Estado de ${item.titulo}`} disabled={disabled} value={item.estado} onChange={(e) => onEstado(e.target.value as EstadoTarefa)} className="ml-1 rounded-md border border-border bg-bg px-2 py-1 text-xs text-text"><option value="planejado">Planejado</option><option value="em_andamento">Em andamento</option><option value="revisao_devida">Revisão devida</option><option value="concluido">Concluído</option><option value="bloqueado">Bloqueado</option></select></label>{item.proximaRevisao && <span className="text-[11px] text-text-faint">Próxima revisão: {new Date(item.proximaRevisao).toLocaleDateString("pt-BR")}</span>}{item.reaberturas > 0 && <span className="text-[11px] text-text-faint">Reaberta {item.reaberturas}×</span>}</div>{item.bloqueioMotivo && <p className="mt-2 rounded-lg bg-danger/10 px-2.5 py-2 text-xs text-danger">Bloqueio: {item.bloqueioMotivo}</p>}{link && <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1"><Link href={link.href} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">{link.fallback ? "Abrir resumo relacionado" : `Estudar ${link.subtemaNome}`}<ArrowRight className="size-3.5" /></Link><Link href={link.questoesHref} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">Resolver questões<ArrowRight className="size-3.5" /></Link></div>}</div>
  </article>;
}

function Campo({ label, extra, children }: { label: string; extra?: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-text-muted">{label}{extra && <span className="ml-1 font-normal text-text-faint">{extra}</span>}{children}</label>; }
const input = "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent";

function pesoPrioridade(prioridade: PrioridadeTarefa): number { return { critica: 0, alta: 1, media: 2, baixa: 3 }[prioridade]; }
function rotuloEstado(estado: TarefaSemana["estado"]): string { return { planejado: "Planejado", em_andamento: "Em andamento", revisao_devida: "Revisão devida", concluido: "Concluído", bloqueado: "Bloqueado" }[estado]; }
function corEstado(estado: TarefaSemana["estado"]): string { return { planejado: "bg-surface-2 text-text-muted", em_andamento: "bg-accent-soft text-accent", revisao_devida: "bg-gold/15 text-gold", concluido: "bg-accent-soft text-accent", bloqueado: "bg-danger/10 text-danger" }[estado]; }
