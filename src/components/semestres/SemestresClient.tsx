"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Search } from "lucide-react";

type Ciclo = { id: string; periodos: string; titulo: string; objetivo: string; eixos: string[] };
const CONEXOES = [
  { href: "/biblioteca", label: "Resumos", description: "Conteudo por disciplina e subtema" },
  { href: "/questoes", label: "Questoes", description: "Treino com progresso salvo" },
  { href: "/casos", label: "Casos clinicos", description: "Raciocinio clinico em etapas" },
  { href: "/mapas-mentais", label: "Mapas mentais", description: "Conceitos e relacoes-chave" },
  { href: "/midia", label: "Midia publica", description: "Figuras com fonte e contexto" },
];

export function SemestresClient({ ciclos }: { ciclos: Ciclo[] }) {
  const [busca, setBusca] = useState("");
  const [cicloAtivo, setCicloAtivo] = useState("todos");
  const filtrados = useMemo(() => { const termo = busca.trim().toLocaleLowerCase("pt-BR"); return ciclos.filter((c) => (cicloAtivo === "todos" || c.id === cicloAtivo) && (!termo || [c.titulo, c.periodos, c.objetivo, ...c.eixos].some((x) => x.toLocaleLowerCase("pt-BR").includes(termo)))); }, [busca, cicloAtivo, ciclos]);
  return <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10"><section className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}><div className="flex max-w-4xl items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-contrast">12</span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Organizacao de revisao</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Trilhas por semestre</h1><p className="mt-3 text-[15px] leading-7 text-text-muted">Uma visão organizada dos ciclos da formacao. A conexao com disciplinas, resumos, questoes e progresso pode crescer sem mudar esta arquitetura.</p><div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted"><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">12 periodos de referencia</span><span className="rounded-full bg-surface-2 px-3 py-1 text-gold">3 ciclos de estudo</span><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">progresso privado</span></div></div></div></section>
    <section className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_auto]"><label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg px-3"><Search className="size-4 text-text-faint" /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar periodo, eixo ou objetivo" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" /></label><div className="flex flex-wrap gap-2">{[["todos", "Todos"], ...ciclos.map((c) => [c.id, c.titulo])].map(([id, label]) => <button key={id} onClick={() => setCicloAtivo(id)} className={`rounded-full border px-3 py-1.5 text-sm font-medium ${cicloAtivo === id ? "border-accent bg-accent-soft text-accent" : "border-border bg-bg text-text-muted hover:border-accent"}`}>{label}</button>)}</div></section>
    <p className="mt-4 text-xs text-text-faint">{filtrados.length} ciclo(s) visivel(is). Os periodos individuais podem ser adicionados progressivamente.</p>
    <section className="mt-4 grid gap-4 lg:grid-cols-3">{filtrados.map((ciclo) => <article key={ciclo.id} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}><p className="text-xs font-semibold text-accent">{ciclo.periodos}</p><h2 className="mt-1 text-xl font-bold text-text">{ciclo.titulo}</h2><p className="mt-3 text-sm leading-6 text-text-muted">{ciclo.objetivo}</p><ul className="mt-4 grid gap-2">{ciclo.eixos.map((eixo) => <li key={eixo} className="flex gap-2 rounded-lg bg-surface-2 px-3 py-2 text-xs leading-5 text-text-muted"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" /><span>{eixo}</span></li>)}</ul></article>)}</section>
    <section className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6"><h2 className="text-lg font-bold text-text">Acervos conectados</h2><p className="mt-2 text-sm leading-6 text-text-muted">Acesse cada camada sem misturar conteúdo público, privado ou de curso.</p><nav aria-label="Acervos relacionados ao curso" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{CONEXOES.map((c) => <Link key={c.href} href={c.href} className="rounded-xl border border-border bg-surface-2 p-3 transition-colors hover:border-accent/50 hover:bg-accent-soft"><span className="text-sm font-semibold text-accent">{c.label}</span><span className="mt-1 block text-xs leading-5 text-text-muted">{c.description}</span></Link>)}</nav></section>
    <section className="mt-7 rounded-xl border border-dashed border-border bg-surface-2 p-5 text-sm leading-6 text-text-muted">Os dados acadêmicos pessoais continuam na camada privada. Documentos seguem o fluxo PDF → Markdown → triagem antes de qualquer síntese.</section>
  </div>;
}
