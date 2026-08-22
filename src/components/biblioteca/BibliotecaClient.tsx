"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Search, Sparkles } from "lucide-react";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";

export function BibliotecaClient({ disciplinas, grupos }: { disciplinas: Disciplina[]; grupos: GrupoDisciplina[] }) {
  const [busca, setBusca] = useState("");
  const [grupoAtivo, setGrupoAtivo] = useState<GrupoDisciplina | "todos">("todos");
  const filtradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return disciplinas.filter((disciplina) => {
      if (grupoAtivo !== "todos" && disciplina.grupo !== grupoAtivo) return false;
      return !termo || [disciplina.nome, ...disciplina.temas.flatMap((tema) => [tema.nome, ...tema.subtemas.map((subtema) => subtema.nome)])]
        .some((texto) => texto.toLocaleLowerCase("pt-BR").includes(termo));
    });
  }, [busca, disciplinas, grupoAtivo]);

  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="max-w-3xl">
          <p className="legacy-eyebrow">Base de conhecimento</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">Biblioteca clínica</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7">
            Navegue por disciplina, tema e subtema em uma trilha conectada a resumos, questões, casos e mapas.
          </p>
          <div className="legacy-statline">
            <span><BookOpen className="size-3.5" /> {disciplinas.length} disciplinas</span>
            <span>{filtradas.length} visíveis agora</span>
            <span>Conteúdo clínico integrado</span>
          </div>
        </div>
      </section>

      <section className="product-toolbar mt-6 grid gap-3 p-4">
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-bg px-3">
          <Search className="size-4 text-text-faint" />
          <span className="sr-only">Buscar na biblioteca</span>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar disciplina, tema ou subtema" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["todos", ...grupos] as (GrupoDisciplina | "todos")[]).map((grupo) => (
            <button key={grupo} onClick={() => setGrupoAtivo(grupo)} aria-pressed={grupoAtivo === grupo} className={`rounded-full border px-3 py-2 text-sm font-semibold ${grupoAtivo === grupo ? "border-accent bg-accent text-accent-contrast shadow-sm" : "border-border bg-surface text-text-muted hover:border-accent"}`}>
              {grupo === "todos" ? "Todos" : grupo}
            </button>
          ))}
        </div>
      </section>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-text-faint">Selecione uma disciplina para abrir a trilha completa</p>

      {grupos.map((grupo) => {
        const itens = filtradas.filter((disciplina) => disciplina.grupo === grupo);
        if (!itens.length) return null;
        return (
          <section key={grupo} className="mt-8">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Área clínica</p><h2 className="mt-1 text-xl font-black tracking-tight text-text">{grupo}</h2></div>
              <span className="text-xs text-text-faint">{itens.length} disciplinas</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {itens.map((disciplina) => {
                const totalSubtemas = disciplina.temas.reduce((total, tema) => total + tema.subtemas.length, 0);
                return (
                  <Link key={disciplina.id} href={`/biblioteca/${disciplina.slug}`} className="product-card group flex min-h-44 flex-col p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid size-11 flex-none place-items-center rounded-xl bg-brand text-xs font-black text-brand-contrast">{disciplina.marca}</span>
                      <div className="min-w-0"><div className="flex items-center gap-1.5 font-black text-text"><span className="truncate">{disciplina.nome}</span>{disciplina.omed && <Sparkles className="size-3.5 flex-none text-gold" />}</div><div className="mt-1 text-xs text-text-faint">{disciplina.temas.length} temas · {totalSubtemas} subtemas</div></div>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-6 text-xs font-semibold text-text-muted"><span>Explorar trilha</span><ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {!filtradas.length && <div className="state-panel mt-8 p-8 text-center"><Search className="mx-auto size-6 text-accent" /><h2 className="mt-3 font-black text-text">Nenhuma disciplina encontrada</h2><p className="mt-1 text-sm text-text-muted">Tente outro termo ou limpe o filtro de área.</p></div>}
    </div>
  );
}
