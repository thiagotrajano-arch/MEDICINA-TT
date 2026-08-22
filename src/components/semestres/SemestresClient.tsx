"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, GraduationCap, Search } from "lucide-react";

type Ciclo = { id: string; periodos: string; titulo: string; objetivo: string; eixos: string[] };
const CONEXOES = [
  { href: "/biblioteca", label: "Resumos", description: "Conteúdo por disciplina e subtema" },
  { href: "/questoes", label: "Questões", description: "Treino com progresso salvo" },
  { href: "/casos", label: "Casos clínicos", description: "Raciocínio clínico em etapas" },
  { href: "/mapas-mentais", label: "Mapas mentais", description: "Conceitos e relações-chave" },
  { href: "/midia", label: "Mídia pública", description: "Figuras com fonte e contexto" },
];

export function SemestresClient({ ciclos }: { ciclos: Ciclo[] }) {
  const [busca, setBusca] = useState("");
  const [cicloAtivo, setCicloAtivo] = useState("todos");
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return ciclos.filter((ciclo) => (cicloAtivo === "todos" || ciclo.id === cicloAtivo)
      && (!termo || [ciclo.titulo, ciclo.periodos, ciclo.objetivo, ...ciclo.eixos].some((texto) => texto.toLocaleLowerCase("pt-BR").includes(termo))));
  }, [busca, cicloAtivo, ciclos]);

  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="flex max-w-4xl items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-lg font-black text-accent-contrast">12</span>
          <div>
            <p className="legacy-eyebrow">Jornada longitudinal</p>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">Trilhas por semestre</h1>
            <p className="mt-4 max-w-3xl text-[15px] leading-7">Visualize os ciclos da formação e conecte cada etapa a conteúdo, treino e revisão sem misturar seus dados acadêmicos privados.</p>
            <div className="legacy-statline"><span>12 períodos</span><span>3 ciclos de estudo</span><span>Progresso privado</span></div>
          </div>
        </div>
      </section>

      <section className="product-toolbar mt-6 grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-bg px-3">
          <Search className="size-4 text-text-faint" /><span className="sr-only">Buscar nas trilhas</span>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar período, eixo ou objetivo" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" />
        </label>
        <div className="flex flex-wrap gap-2">
          {[["todos", "Todos"], ...ciclos.map((ciclo) => [ciclo.id, ciclo.titulo])].map(([id, label]) => (
            <button key={id} onClick={() => setCicloAtivo(id)} aria-pressed={cicloAtivo === id} className={`rounded-full border px-3 py-2 text-sm font-semibold ${cicloAtivo === id ? "border-accent bg-accent text-accent-contrast" : "border-border bg-surface text-text-muted hover:border-accent"}`}>{label}</button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {filtrados.map((ciclo, indice) => (
          <article key={ciclo.id} className="product-card overflow-hidden">
            <div className="border-b border-border bg-brand px-5 py-4 text-brand-contrast">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-aqua">{ciclo.periodos}</p>
              <div className="mt-2 flex items-center justify-between gap-3"><h2 className="text-xl font-black">{ciclo.titulo}</h2><span className="text-3xl font-black opacity-20">0{indice + 1}</span></div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-text-muted">{ciclo.objetivo}</p>
              <ul className="mt-4 grid gap-2">
                {ciclo.eixos.map((eixo) => <li key={eixo} className="flex gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-xs leading-5 text-text-muted"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-aqua" /><span>{eixo}</span></li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {!filtrados.length && <div className="state-panel mt-6 p-8 text-center"><GraduationCap className="mx-auto size-6 text-accent" /><h2 className="mt-3 font-black text-text">Nenhum ciclo encontrado</h2><p className="mt-1 text-sm text-text-muted">Altere o termo de busca ou selecione todos os ciclos.</p></div>}

      <section className="legacy-section mt-8 p-5 sm:p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Ecossistema de estudo</p>
        <h2 className="mt-1 text-xl font-black text-text">Acervos conectados</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">Acesse cada camada sem misturar conteúdo público, privado ou de curso.</p>
        <nav aria-label="Acervos relacionados ao curso" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CONEXOES.map((conexao) => <Link key={conexao.href} href={conexao.href} className="product-card group p-4"><span className="flex items-center justify-between text-sm font-black text-text">{conexao.label}<ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span><span className="mt-2 block text-xs leading-5 text-text-muted">{conexao.description}</span></Link>)}
        </nav>
      </section>

      <section className="state-panel mt-6 p-5 text-sm leading-6 text-text-muted">Os dados acadêmicos pessoais continuam na camada privada. Documentos seguem o fluxo PDF → Markdown → triagem antes de qualquer síntese.</section>
    </div>
  );
}
