"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, CircleAlert, Images, ListChecks, RefreshCw, Search } from "lucide-react";
import { atualizarEstadoSubtemaCurricular, carregarMapaCurricularPrivado, type ComponenteCurricularPrivado, type EstadoEstudoCurricular, type SubtemaCurricularPrivado } from "@/lib/curriculo-granular-privado";

const ESTADOS: EstadoEstudoCurricular[] = ["pendente", "em_estudo", "revisar", "dominado"];
const ESTADO_LABEL: Record<EstadoEstudoCurricular, string> = { pendente: "Pendente", em_estudo: "Em estudo", revisar: "Revisar", dominado: "Dominado" };
const CATEGORIA_LABEL: Record<string, string> = { bbpm: "BBPM", hcpm: "HCPM", aps: "APS", cirurgia: "Cirurgia", urgencia: "Urgência e emergência", outro: "Outros" };

const normalizar = (valor: string) => valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function MapaCurricularPrivado() {
  const [componentes, setComponentes] = useState<ComponenteCurricularPrivado[]>([]);
  const [migrationPendente, setMigrationPendente] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [periodo, setPeriodo] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [prioridade, setPrioridade] = useState("todas");
  const [evidencia, setEvidencia] = useState("todas");
  const [somentePendentes, setSomentePendentes] = useState(false);

  const carregar = async () => {
    setCarregando(true);
    setMensagem("");
    try {
      const dados = await carregarMapaCurricularPrivado();
      setComponentes(dados.componentes);
      setMigrationPendente(dados.migrationPendente);
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível carregar o mapa curricular.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    let ativo = true;
    void carregarMapaCurricularPrivado()
      .then((dados) => {
        if (!ativo) return;
        setComponentes(dados.componentes);
        setMigrationPendente(dados.migrationPendente);
      })
      .catch((erro: unknown) => {
        if (!ativo) return;
        setMensagem(erro instanceof Error ? erro.message : "Não foi possível carregar o mapa curricular.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => { ativo = false; };
  }, []);

  const todosSubtemas = useMemo(() => componentes.flatMap((componente) => componente.modulos.flatMap((modulo) => modulo.subtemas)), [componentes]);
  const metricas = useMemo(() => ({
    componentes: componentes.length,
    subtemas: todosSubtemas.length,
    pendentes: todosSubtemas.filter((item) => item.estadoEstudo !== "dominado").length,
    dominados: todosSubtemas.filter((item) => item.estadoEstudo === "dominado").length,
    vinculados: todosSubtemas.filter((item) => item.temResumo || item.temQuestoes).length,
    imagensPendentes: todosSubtemas.filter((item) => item.modalidadesImagem.length > 0).length,
  }), [componentes, todosSubtemas]);

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    return componentes.filter((componente) => (categoria === "todas" || componente.categoria === categoria) && (periodo === "todos" || componente.periodo === Number(periodo))).map((componente) => ({
      ...componente,
      modulos: componente.modulos.map((modulo) => ({
        ...modulo,
        subtemas: modulo.subtemas.filter((subtema) => {
          if (somentePendentes && subtema.estadoEstudo === "dominado") return false;
          if (estado !== "todos" && subtema.estadoEstudo !== estado) return false;
          if (prioridade !== "todas" && subtema.prioridadeOmed !== prioridade) return false;
          if (evidencia !== "todas" && subtema.evidenciaStatus !== evidencia) return false;
          return !termo || normalizar(`${componente.codigo} ${componente.nome} ${modulo.titulo} ${subtema.titulo} ${subtema.objetivo}`).includes(termo);
        }),
      })).filter((modulo) => modulo.subtemas.length > 0),
    })).filter((componente) => componente.modulos.length > 0);
  }, [busca, categoria, componentes, estado, evidencia, periodo, prioridade, somentePendentes]);

  const mudarEstado = async (subtema: SubtemaCurricularPrivado, estado: EstadoEstudoCurricular) => {
    const anterior = subtema.estadoEstudo;
    setComponentes((atuais) => atuais.map((componente) => ({ ...componente, modulos: componente.modulos.map((modulo) => ({ ...modulo, subtemas: modulo.subtemas.map((item) => item.id === subtema.id ? { ...item, estadoEstudo: estado } : item) })) })));
    try {
      await atualizarEstadoSubtemaCurricular(subtema.id, estado);
      setMensagem(`“${subtema.titulo}” atualizado para ${ESTADO_LABEL[estado].toLowerCase()}.`);
    } catch (erro) {
      setComponentes((atuais) => atuais.map((componente) => ({ ...componente, modulos: componente.modulos.map((modulo) => ({ ...modulo, subtemas: modulo.subtemas.map((item) => item.id === subtema.id ? { ...item, estadoEstudo: anterior } : item) })) })));
      setMensagem(erro instanceof Error ? erro.message : "Não foi possível atualizar o subtema.");
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }} aria-labelledby="mapa-curricular-titulo">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Mapa curricular privado</p>
          <h2 id="mapa-curricular-titulo" className="mt-1 text-lg font-bold text-text">Componentes → módulos → cada subtema</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-text-muted">A granularidade reflete a evidência disponível. “Parcial” significa que o eixo foi confirmado, mas o calendário aula a aula ainda não foi recuperado.</p>
        </div>
        <button type="button" disabled={carregando} onClick={() => void carregar()} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted hover:border-accent hover:text-accent disabled:opacity-50"><RefreshCw className="size-3.5" /> Atualizar</button>
      </div>

      {mensagem && <p role="status" className="mt-4 rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-text-muted">{mensagem}</p>}
      {migrationPendente && <p className="mt-4 flex items-start gap-2 rounded-xl border border-gold/40 bg-gold-soft p-3 text-xs leading-5 text-text-muted"><CircleAlert className="mt-0.5 size-4 shrink-0 text-gold" />A estrutura granular já está no código, mas a migration privada ainda precisa ser aplicada antes da importação.</p>}

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        <Metrica valor={metricas.componentes} label="de 26 componentes" />
        <Metrica valor={metricas.subtemas} label="subtemas" />
        <Metrica valor={metricas.pendentes} label="a revisar" />
        <Metrica valor={metricas.dominados} label="dominados" />
        <Metrica valor={metricas.vinculados} label="ligados ao site" />
        <Metrica valor={metricas.imagensPendentes} label="com alvo de imagem" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_160px_120px_150px_140px_150px]">
        <label className="relative block"><span className="sr-only">Buscar no currículo</span><Search className="pointer-events-none absolute left-3 top-3 size-4 text-text-faint" /><input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar módulo, aula ou subtema" className="w-full rounded-lg border border-border bg-bg py-2.5 pl-9 pr-3 text-sm text-text outline-none focus:border-accent" /></label>
        <select value={categoria} onChange={(evento) => setCategoria(evento.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todas">Todas as áreas</option>{Object.entries(CATEGORIA_LABEL).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select>
        <select value={periodo} onChange={(evento) => setPeriodo(evento.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todos">Períodos</option>{Array.from({ length: 12 }, (_, indice) => indice + 1).map((item) => <option key={item} value={item}>{item}º período</option>)}</select>
        <select value={estado} onChange={(evento) => setEstado(evento.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todos">Todos os estados</option>{ESTADOS.map((item) => <option key={item} value={item}>{ESTADO_LABEL[item]}</option>)}</select>
        <select value={prioridade} onChange={(evento) => setPrioridade(evento.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todas">Prioridade OMED</option><option value="alta">Alta</option><option value="media">Média</option><option value="baixa">Baixa</option><option value="nao_classificado">Não classificada</option></select>
        <select value={evidencia} onChange={(evento) => setEvidencia(evento.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todas">Toda evidência</option><option value="confirmado">Confirmada</option><option value="parcial">Parcial</option><option value="ausente">Ausente</option></select>
      </div>
      <div className="mt-3 flex justify-end">
        <label className="flex min-h-10 items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold text-text-muted"><input type="checkbox" checked={somentePendentes} onChange={(evento) => setSomentePendentes(evento.target.checked)} />Só pendentes</label>
      </div>

      {carregando ? <p className="mt-5 text-sm text-text-muted">Carregando o mapa privado…</p> : !componentes.length ? <p className="mt-5 rounded-xl border border-dashed border-border bg-surface-2 p-4 text-sm text-text-muted">O mapa ainda não foi importado. Nenhum conteúdo foi presumido.</p> : !filtrados.length ? <p className="mt-5 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Nenhum subtema corresponde aos filtros atuais.</p> : <div className="mt-5 space-y-3">{filtrados.map((componente) => <Componente key={componente.id} componente={componente} onEstado={mudarEstado} />)}</div>}
    </section>
  );
}

function Componente({ componente, onEstado }: { componente: ComponenteCurricularPrivado; onEstado: (subtema: SubtemaCurricularPrivado, estado: EstadoEstudoCurricular) => Promise<void> }) {
  const total = componente.modulos.reduce((soma, modulo) => soma + modulo.subtemas.length, 0);
  return <details className="group rounded-xl border border-border bg-surface-2">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4"><div><p className="font-bold text-text">{componente.codigo} · {componente.nome}</p><p className="mt-1 text-xs text-text-muted">{componente.periodo ? `${componente.periodo}º período · ` : ""}{componente.modulos.length} módulos · {total} subtemas</p></div><Evidencia status={componente.evidenciaStatus} /></summary>
    <div className="space-y-3 border-t border-border p-3 sm:p-4">{componente.modulos.map((modulo) => <details key={modulo.id} className="rounded-xl border border-border bg-surface"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3"><div><p className="text-sm font-bold text-text">{modulo.ordem}. {modulo.titulo}</p><p className="mt-1 text-[11px] uppercase tracking-wide text-text-faint">{modulo.tipo} · {modulo.subtemas.length} subtemas</p></div><Evidencia status={modulo.evidenciaStatus} /></summary><div className="space-y-2 border-t border-border p-3">{modulo.subtemas.map((subtema) => <Subtema key={subtema.id} subtema={subtema} onEstado={onEstado} />)}</div></details>)}</div>
  </details>;
}

function Subtema({ subtema, onEstado }: { subtema: SubtemaCurricularPrivado; onEstado: (subtema: SubtemaCurricularPrivado, estado: EstadoEstudoCurricular) => Promise<void> }) {
  const resumo = subtema.temResumo && subtema.subtemaPublicoId ? `/estudar/${encodeURIComponent(subtema.subtemaPublicoId)}` : "";
  const questoes = subtema.temQuestoes && subtema.subtemaPublicoId ? `/questoes?disciplina=${encodeURIComponent(subtema.disciplinaPublicaId)}&subtema=${encodeURIComponent(subtema.subtemaPublicoId)}&modo=novas` : "";
  const midia = subtema.modalidadesImagem.length > 0 ? `/minha-midia?busca=${encodeURIComponent(subtema.titulo)}&disciplina=${encodeURIComponent(subtema.disciplinaPublicaId)}&subtema=${encodeURIComponent(subtema.titulo)}&subtemaId=${encodeURIComponent(subtema.subtemaPublicoId)}` : "";
  return <article className="rounded-lg border border-border bg-bg p-3"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold text-text">{subtema.ordem}. {subtema.titulo}</p>{subtema.prioridadeOmed === "alta" && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">OMED alta</span>}<Evidencia status={subtema.evidenciaStatus} /></div>{subtema.objetivo && <p className="mt-1 text-xs leading-5 text-text-muted">{subtema.objetivo}</p>}</div><select aria-label={`Estado de ${subtema.titulo}`} value={subtema.estadoEstudo} onChange={(evento) => void onEstado(subtema, evento.target.value as EstadoEstudoCurricular)} className="rounded-lg border border-border bg-surface px-2 py-1.5 text-xs font-semibold text-text-muted">{ESTADOS.map((estado) => <option key={estado} value={estado}>{ESTADO_LABEL[estado]}</option>)}</select></div>
    {(subtema.modalidadesImagem.length > 0 || subtema.fontesQuestoes.length > 0) && <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-text-faint">{subtema.modalidadesImagem.length > 0 && <span className="inline-flex items-center gap-1"><Images className="size-3" />{subtema.modalidadesImagem.join(" · ")}</span>}{subtema.fontesQuestoes.length > 0 && <span className="inline-flex items-center gap-1"><ListChecks className="size-3" />{subtema.fontesQuestoes.join(" · ")}</span>}</div>}
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
      {resumo && <Link href={resumo} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"><BookOpenCheck className="size-3.5" />Estudar resumo<ArrowRight className="size-3.5" /></Link>}
      {questoes && <Link href={questoes} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"><ListChecks className="size-3.5" />Resolver questões<ArrowRight className="size-3.5" /></Link>}
      {midia && <Link href={midia} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"><Images className="size-3.5" />Abrir mídia<ArrowRight className="size-3.5" /></Link>}
      {!resumo && <span className="text-[11px] font-semibold text-gold">Resumo pendente</span>}
      {!questoes && <span className="text-[11px] font-semibold text-gold">Questões pendentes</span>}
    </div>
  </article>;
}

function Evidencia({ status }: { status: "confirmado" | "parcial" | "ausente" }) { return <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status === "confirmado" ? "bg-success-soft text-success" : status === "parcial" ? "bg-gold-soft text-gold" : "bg-danger-soft text-danger"}`}>{status}</span>; }
function Metrica({ valor, label }: { valor: number; label: string }) { return <div className="rounded-xl border border-border bg-surface-2 p-3"><p className="text-lg font-bold text-text">{valor}</p><p className="text-xs text-text-muted">{label}</p></div>; }
