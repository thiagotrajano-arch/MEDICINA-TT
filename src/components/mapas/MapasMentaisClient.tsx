"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Search, Sparkles } from "lucide-react";

type Mapa = { index: number; disciplina: { id: string; nome: string }; tema: { nome: string }; subtema: { id: string; nome: string; altoRendimento?: boolean }; blocos: string[] };
const CORES = ["mindmap-amber", "mindmap-pink", "mindmap-sky", "mindmap-violet", "mindmap-orange", "mindmap-emerald"];
const RELACOES = ["reconhecer", "confirmar", "tratar", "evitar", "acompanhar", "prova"];

export function MapasMentaisClient({ mapas }: { mapas: Mapa[] }) {
  const [busca, setBusca] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("subtema") ?? "");
  const [disciplina, setDisciplina] = useState("todas");
  const [alto, setAlto] = useState(false);
  const [limite, setLimite] = useState(8);
  const disciplinas = useMemo(() => Array.from(new Map(mapas.map((m) => [m.disciplina.id, m.disciplina.nome])).entries()), [mapas]);
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return mapas.filter((m) => {
      if (disciplina !== "todas" && m.disciplina.id !== disciplina) return false;
      if (alto && !m.subtema.altoRendimento) return false;
      return !termo || [m.disciplina.nome, m.tema.nome, m.subtema.nome, ...m.blocos].some((x) => x.toLocaleLowerCase("pt-BR").includes(termo));
    });
  }, [alto, busca, disciplina, mapas]);
  const visiveis = filtrados.slice(0, limite);
  return <>
    <div className="product-toolbar mt-6 grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg px-3"><Search className="size-4 text-text-faint" /><span className="sr-only">Buscar mapas</span><input value={busca} onChange={(e) => { setBusca(e.target.value); setLimite(8); }} placeholder="Buscar diagnóstico, conceito ou ramo" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" /></label>
      <label className="sr-only" htmlFor="mapa-disciplina">Disciplina</label><select id="mapa-disciplina" value={disciplina} onChange={(e) => { setDisciplina(e.target.value); setLimite(8); }} className="h-10 rounded-lg border border-border bg-bg px-3 text-sm text-text"><option value="todas">Todas as disciplinas</option>{disciplinas.map(([id, nome]) => <option key={id} value={id}>{nome}</option>)}</select>
      <button onClick={() => { setAlto((v) => !v); setLimite(8); }} className={`h-10 rounded-lg border px-3 text-sm font-semibold ${alto ? "border-accent bg-accent-soft text-accent" : "border-border bg-bg text-text-muted"}`} aria-pressed={alto}><Sparkles className="mr-1 inline size-3.5" />Alto rendimento</button>
    </div>
    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-text-faint"><span>{filtrados.length} mapas encontrados · mostrando {visiveis.length}</span><span className="hidden sm:inline">Núcleo → relações nomeadas → estudo completo</span></div>
    <div className="mt-5 grid gap-6">{visiveis.map((mapa) => <MapaVisual key={mapa.subtema.id} mapa={mapa} />)}</div>
    {!visiveis.length && <p className="mt-8 rounded-xl border border-dashed border-border p-6 text-center text-sm text-text-muted">Nenhum mapa corresponde aos filtros.</p>}
    {visiveis.length < filtrados.length && <button onClick={() => setLimite((n) => n + 8)} className="mx-auto mt-8 flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-muted hover:border-accent hover:text-accent">Carregar mais mapas <ChevronDown className="size-4" /></button>}
  </>;
}

function MapaVisual({ mapa }: { mapa: Mapa }) {
  const ramos = mapa.blocos.length ? mapa.blocos : ["Definição", "Diagnóstico", "Conduta", "Revisão", "Complicações", "Pontos de prova"];
  const esquerda = ramos.slice(0, Math.ceil(ramos.length / 2));
  const direita = ramos.slice(Math.ceil(ramos.length / 2));
  const url = `/estudar/${encodeURIComponent(mapa.subtema.id)}`;
  const ramo = (texto: string, indice: number, lado: "esquerda" | "direita") => <Link href={url} key={`${lado}-${texto}`} className={`mindmap-node ${CORES[indice % CORES.length]} ${lado === "esquerda" ? "mindmap-node-left" : "mindmap-node-right"}`} aria-label={`${RELACOES[indice % RELACOES.length]}: ${texto}`}><span className="mindmap-arrow" aria-hidden="true">{lado === "esquerda" ? "→" : "←"}</span><span className="mindmap-relation">{RELACOES[indice % RELACOES.length]}</span><span>{texto}</span></Link>;
  return <section className="overflow-hidden rounded-2xl border border-border bg-surface" style={{ boxShadow: "var(--shadow)" }}><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Mapa {String(mapa.index).padStart(2, "0")} · {mapa.disciplina.nome}</p><p className="mt-1 text-xs text-text-faint">{mapa.tema.nome}{mapa.subtema.altoRendimento && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">alto rendimento</span>}</p></div><Link href={url} className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-accent-contrast hover:opacity-90">Abrir estudo</Link></div><div className="mindmap-visual"><div className="mindmap-column mindmap-column-left">{esquerda.map((texto, i) => ramo(texto, i, "esquerda"))}</div><Link href={url} className="mindmap-root"><span className="mindmap-root-kicker">conceito central</span><strong>{mapa.subtema.nome}</strong><span className="mindmap-root-hint">ver resumo completo</span></Link><div className="mindmap-column mindmap-column-right">{direita.map((texto, i) => ramo(texto, i + esquerda.length, "direita"))}</div></div></section>;
}
