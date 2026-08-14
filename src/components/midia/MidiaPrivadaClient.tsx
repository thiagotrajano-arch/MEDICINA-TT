"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { BookOpen, FileImage, Image as ImageIcon, LockKeyhole, Maximize2, RefreshCw, Search, ShieldCheck, Trash2, Upload, X } from "lucide-react";
import { carregarMidiaPrivada, excluirMidiaPrivada, salvarMidiaPrivada, type EntradaMidiaPrivada, type MidiaPrivada, type TipoOrigemMidiaPrivada } from "@/lib/midia-privada";
import { CatalogoMateriaisPrivados } from "@/components/midia/CatalogoMateriaisPrivados";
import { DISCIPLINAS } from "@/content/taxonomy";

const vazio: EntradaMidiaPrivada = { titulo: "", tipoOrigem: "pdf_comercial", disciplina: "", tema: "", subtema: "", diagnostico: "", modalidade: "", fonte: "", pagina: null, periodo: null, caso: "", observacao: "", pacienteAnonimizado: false, autorizacaoPaciente: false };
const ROTULOS: Record<TipoOrigemMidiaPrivada, string> = { pdf_comercial: "Material comercial", paciente: "Paciente anonimizado e autorizado", propria_privada: "Imagem própria / referência restrita" };
const STATUS_TRIAGEM: Record<MidiaPrivada["triagemStatus"], string> = { util: "Útil", contextual: "Contextual", revisao_pendente: "Revisão pendente", nao_util: "Não usar" };

function hrefResumo(item: MidiaPrivada): string | null {
  if (item.subtemaId) return `/estudar/${encodeURIComponent(item.subtemaId)}`;
  const termos = [item.subtema, item.tema, item.diagnostico].filter(Boolean).map((x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  if (!termos.length) return null;
  for (const disciplina of DISCIPLINAS) for (const tema of disciplina.temas) for (const subtema of tema.subtemas) {
    const nome = subtema.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (termos.some((termo) => termo === nome || termo.includes(nome) || nome.includes(termo))) return `/estudar/${encodeURIComponent(subtema.id)}`;
  }
  return null;
}

export function MidiaPrivadaClient() {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [itens, setItens] = useState<MidiaPrivada[]>([]);
  const [entrada, setEntrada] = useState<EntradaMidiaPrivada>(vazio);
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [confirmacaoPrivada, setConfirmacaoPrivada] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | TipoOrigemMidiaPrivada>("todos");
  const [filtroTriagem, setFiltroTriagem] = useState<"todos" | MidiaPrivada["triagemStatus"]>("todos");
  const [filtroDisciplina, setFiltroDisciplina] = useState("todas");
  const [filtroTema, setFiltroTema] = useState("todos");
  const [filtroSubtema, setFiltroSubtema] = useState("todos");
  const [filtroDiagnostico, setFiltroDiagnostico] = useState("todos");
  const [filtroFonte, setFiltroFonte] = useState("todos");
  const [filtroModalidade, setFiltroModalidade] = useState("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");
  const [filtroCaso, setFiltroCaso] = useState("todos");
  const [selecionado, setSelecionado] = useState<MidiaPrivada | null>(null);

  const carregar = async () => {
    setOcupado(true);
    try { setItens(await carregarMidiaPrivada()); }
    catch (e) { setMensagem(e instanceof Error ? e.message : "Não foi possível carregar sua mídia."); }
    finally { setOcupado(false); }
  };

  useEffect(() => {
    let ativo = true;
    let cancelar: (() => void) | undefined;
    void import("@/infra/supabase/client").then(async ({ getSupabaseAnon }) => {
      const parametros = new URLSearchParams(window.location.search);
      const disciplinaId = parametros.get("disciplina") ?? "";
      const disciplinaNome = DISCIPLINAS.find((item) => item.id === disciplinaId)?.nome ?? disciplinaId;
      const subtema = parametros.get("subtema") ?? "";
      const buscaInicial = parametros.get("busca") ?? subtema;
      if (buscaInicial) setBusca(buscaInicial);
      if (disciplinaNome) setFiltroDisciplina(disciplinaNome);
      if (subtema) setFiltroSubtema(subtema);
      if (disciplinaNome || subtema) setEntrada((atual) => ({ ...atual, disciplina: disciplinaNome, subtema }));
      const supabase = getSupabaseAnon();
      const { data } = await supabase.auth.getSession();
      if (!ativo) return;
      const ok = Boolean(data.session?.user);
      setAutenticado(ok);
      if (ok) await carregar();
      const a = supabase.auth.onAuthStateChange((_evento, sessao) => {
        if (!ativo) return;
        setAutenticado(Boolean(sessao?.user));
        if (sessao?.user) void carregar();
        else setItens([]);
      });
      cancelar = () => a.data.subscription.unsubscribe();
    }).catch(() => { if (ativo) setAutenticado(false); });
    return () => { ativo = false; cancelar?.(); };
    // carregamento inicial intencional; a sessão é observada pelo listener acima
  }, []);

  const alterar = <K extends keyof EntradaMidiaPrivada>(campo: K, valor: EntradaMidiaPrivada[K]) => setEntrada((atual) => ({ ...atual, [campo]: valor }));
  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    if (!arquivos.length) { setMensagem("Escolha uma ou mais imagens."); return; }
    if (entrada.tipoOrigem === "pdf_comercial" && !confirmacaoPrivada) { setMensagem("Confirme o uso somente privado."); return; }
    setOcupado(true); setMensagem("");
    try {
      for (const arquivo of arquivos) await salvarMidiaPrivada(arquivo, entrada);
      const total = arquivos.length;
      setEntrada(vazio); setArquivos([]); setConfirmacaoPrivada(false); await carregar();
      setMensagem(`${total} imagem(ns) adicionada(s) à sua Minha mídia.`);
    } catch (e) { setMensagem(e instanceof Error ? e.message : "Não foi possível salvar o lote."); }
    finally { setOcupado(false); }
  };
  const excluir = async (item: MidiaPrivada) => {
    if (!window.confirm(`Remover permanentemente "${item.titulo}"?`)) return;
    setOcupado(true);
    try { await excluirMidiaPrivada(item); setItens((atuais) => atuais.filter((x) => x.id !== item.id)); setMensagem("Imagem removida da sua mídia."); }
    catch (e) { setMensagem(e instanceof Error ? e.message : "Não foi possível remover."); }
    finally { setOcupado(false); }
  };

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return itens.filter((item) => {
      if (filtroTipo !== "todos" && item.tipoOrigem !== filtroTipo) return false;
      if (filtroTriagem !== "todos" && item.triagemStatus !== filtroTriagem) return false;
      if (filtroDisciplina !== "todas" && item.disciplina !== filtroDisciplina) return false;
      if (filtroTema !== "todos" && item.tema !== filtroTema) return false;
      if (filtroSubtema !== "todos" && item.subtema !== filtroSubtema) return false;
      if (filtroDiagnostico !== "todos" && item.diagnostico !== filtroDiagnostico) return false;
      if (filtroFonte !== "todos" && item.fonte !== filtroFonte) return false;
      if (filtroModalidade !== "todas" && item.modalidade !== filtroModalidade) return false;
      if (filtroPeriodo !== "todos" && String(item.periodo ?? "") !== filtroPeriodo) return false;
      if (filtroCaso !== "todos" && item.caso !== filtroCaso) return false;
      if (!termo) return true;
      return [item.titulo, item.disciplina, item.tema, item.subtema, item.diagnostico, item.modalidade, item.fonte, item.caso, item.observacao].some((valor) => valor?.toLocaleLowerCase("pt-BR").includes(termo));
    });
  }, [busca, filtroCaso, filtroDiagnostico, filtroDisciplina, filtroFonte, filtroModalidade, filtroPeriodo, filtroSubtema, filtroTema, filtroTipo, filtroTriagem, itens]);
  const opcoes = useMemo(() => ({
    disciplinas: [...new Set(itens.map((item) => item.disciplina).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    temas: [...new Set(itens.filter((item) => filtroDisciplina === "todas" || item.disciplina === filtroDisciplina).map((item) => item.tema).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    subtemas: [...new Set(itens.filter((item) => filtroDisciplina === "todas" || item.disciplina === filtroDisciplina).map((item) => item.subtema).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    diagnosticos: [...new Set(itens.filter((item) => filtroDisciplina === "todas" || item.disciplina === filtroDisciplina).map((item) => item.diagnostico).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    fontes: [...new Set(itens.map((item) => item.fonte).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    modalidades: [...new Set(itens.map((item) => item.modalidade).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    periodos: [...new Set(itens.map((item) => item.periodo).filter((valor): valor is number => valor !== null))].sort((a, b) => a - b),
    casos: [...new Set(itens.map((item) => item.caso).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
  }), [filtroDisciplina, itens]);

  if (autenticado === null) return <div className="mx-auto max-w-4xl px-5 py-12 text-sm text-text-muted">Verificando sua sessão...</div>;
  if (!autenticado) return <Bloqueio />;
  return <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
    <header className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}>
      <div className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-accent-contrast"><LockKeyhole className="size-7" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Biblioteca da sua conta</p><h1 className="mt-2 text-3xl font-bold text-text">Minha mídia</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">Todo material que você importar fica reunido aqui, com disciplina, subtema, achado e referência de origem. O acesso é somente seu e cada visualização usa um link temporário.</p></div></div>
    </header>
    {mensagem && <p role="status" className="mt-5 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">{mensagem}</p>}
    <section className="mt-6 grid gap-4 md:grid-cols-3"><Regra titulo="Um só lugar" texto="Imagem aberta, própria, comercial ou de estudo fica na mesma biblioteca autenticada, organizada por filtros." /><Regra titulo="Proveniência visível" texto="A origem e a página ficam registradas para você revisar e citar corretamente." /><Regra titulo="Proteção mantida" texto="A referência não transforma material restrito em público: a biblioteca continua protegida e fora do GitHub Pages." /></section>
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6"><div className="flex items-start gap-3"><span className="rounded-xl bg-surface-2 p-2.5 text-accent"><ShieldCheck className="size-5" /></span><div><h2 className="text-lg font-bold text-text">Curadoria automática</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-text-muted">Nos lotes de acervo, o Codex identifica imagens clinicamente úteis, registra a fonte e correlaciona disciplina, tema, subtema, achado e modalidade. A biblioteca pública continua reservada a conteúdo com permissão de redistribuição; aqui você pode manter seu acervo de estudo completo.</p></div></div></section>
    <CatalogoMateriaisPrivados />
    <form onSubmit={enviar} className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6"><h2 className="flex items-center gap-2 text-lg font-bold text-text"><Upload className="size-5 text-accent" /> Adicionar à Minha mídia</h2><p className="mt-1 text-sm text-text-muted">Escolha várias imagens e aplique a mesma classificação ao lote.</p><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Campo label="Imagens do lote"><input required type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e: ChangeEvent<HTMLInputElement>) => setArquivos(Array.from(e.target.files ?? []))} className={input} /><span className="mt-1 block text-[11px] font-normal text-text-faint">{arquivos.length ? `${arquivos.length} arquivo(s) selecionado(s)` : "JPG, PNG, WebP ou AVIF; a conta mantém o arquivo protegido."}</span></Campo>
      <Campo label="Título"><input required value={entrada.titulo} maxLength={180} onChange={(e) => alterar("titulo", e.target.value)} className={input} /><span className="mt-1 block text-[11px] font-normal text-text-faint">Use um título curto e clínico.</span></Campo>
      <Campo label="Origem"><select value={entrada.tipoOrigem} onChange={(e) => { alterar("tipoOrigem", e.target.value as TipoOrigemMidiaPrivada); setConfirmacaoPrivada(false); }} className={input}>{Object.entries(ROTULOS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}</select></Campo>
      <Campo label="Disciplina"><input value={entrada.disciplina} onChange={(e) => alterar("disciplina", e.target.value)} className={input} /></Campo><Campo label="Tema"><input value={entrada.tema} onChange={(e) => alterar("tema", e.target.value)} className={input} /></Campo><Campo label="Subtema"><input value={entrada.subtema} onChange={(e) => alterar("subtema", e.target.value)} className={input} /></Campo>
      <Campo label="Diagnóstico / achado"><input value={entrada.diagnostico} onChange={(e) => alterar("diagnostico", e.target.value)} className={input} /></Campo><Campo label="Modalidade"><input value={entrada.modalidade} onChange={(e) => alterar("modalidade", e.target.value)} className={input} /></Campo><Campo label="Período"><input type="number" min={1} max={12} value={entrada.periodo ?? ""} onChange={(e) => alterar("periodo", e.target.value ? Number(e.target.value) : null)} className={input} /></Campo><Campo label="Caso relacionado"><input value={entrada.caso} maxLength={240} onChange={(e) => alterar("caso", e.target.value)} className={input} /></Campo><Campo label="Fonte"><input required={entrada.tipoOrigem === "pdf_comercial"} value={entrada.fonte} onChange={(e) => alterar("fonte", e.target.value)} className={input} /></Campo><Campo label="Página"><input required={entrada.tipoOrigem === "pdf_comercial"} type="number" min={1} value={entrada.pagina ?? ""} onChange={(e) => alterar("pagina", e.target.value ? Number(e.target.value) : null)} className={input} /></Campo>
    </div><Campo label="Observação"><textarea value={entrada.observacao} maxLength={2000} rows={3} onChange={(e) => alterar("observacao", e.target.value)} className={`${input} resize-y`} /></Campo>
    {entrada.tipoOrigem === "pdf_comercial" && <label className="mt-4 flex gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-muted"><input required type="checkbox" checked={confirmacaoPrivada} onChange={(e) => setConfirmacaoPrivada(e.target.checked)} />Confirmo que o material ficará somente na biblioteca autenticada para meu estudo pessoal.</label>}
    {entrada.tipoOrigem === "paciente" && <div className="mt-4 grid gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-muted sm:grid-cols-2"><label className="flex gap-3"><input required type="checkbox" checked={entrada.pacienteAnonimizado} onChange={(e) => alterar("pacienteAnonimizado", e.target.checked)} />Imagem completamente anonimizada.</label><label className="flex gap-3"><input required type="checkbox" checked={entrada.autorizacaoPaciente} onChange={(e) => alterar("autorizacaoPaciente", e.target.checked)} />Autorização apropriada confirmada.</label></div>}
    <button disabled={ocupado} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60"><ShieldCheck className="size-4" />{ocupado ? "Processando..." : "Salvar na Minha mídia"}</button></form>
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="flex items-center gap-2 text-lg font-bold text-text"><FileImage className="size-5 text-accent" /> Acervo visual</h2><p className="text-sm text-text-muted">{filtrados.length} de {itens.length} imagem(ns) visível(is) nesta conta.</p></div><button disabled={ocupado} onClick={() => void carregar()} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-muted"><RefreshCw className="size-4" />Atualizar</button></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_180px_180px_180px_180px_170px_170px_170px]"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-text-faint" /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar título, tema, achado, caso ou fonte" className={`${input} pl-9`} aria-label="Buscar na Minha mídia" /></label><select value={filtroDisciplina} aria-label="Filtrar por disciplina" onChange={(e) => { setFiltroDisciplina(e.target.value); setFiltroTema("todos"); setFiltroSubtema("todos"); setFiltroDiagnostico("todos"); }} className={input}><option value="todas">Todas as disciplinas</option>{opcoes.disciplinas.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroPeriodo} aria-label="Filtrar por período" onChange={(e) => setFiltroPeriodo(e.target.value)} className={input}><option value="todos">Todos os períodos</option>{opcoes.periodos.map((valor) => <option key={valor} value={valor}>{valor}º período</option>)}</select><select value={filtroTema} aria-label="Filtrar por tema" onChange={(e) => { setFiltroTema(e.target.value); setFiltroSubtema("todos"); }} className={input}><option value="todos">Todos os temas</option>{opcoes.temas.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroSubtema} aria-label="Filtrar por subtema" onChange={(e) => setFiltroSubtema(e.target.value)} className={input}><option value="todos">Todos os subtemas</option>{opcoes.subtemas.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroDiagnostico} aria-label="Filtrar por patologia ou achado" onChange={(e) => setFiltroDiagnostico(e.target.value)} className={input}><option value="todos">Todas as patologias/achados</option>{opcoes.diagnosticos.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroCaso} aria-label="Filtrar por caso" onChange={(e) => setFiltroCaso(e.target.value)} className={input}><option value="todos">Todos os casos</option>{opcoes.casos.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroFonte} aria-label="Filtrar por fonte" onChange={(e) => setFiltroFonte(e.target.value)} className={input}><option value="todos">Todas as fontes</option>{opcoes.fontes.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroModalidade} aria-label="Filtrar por modalidade" onChange={(e) => setFiltroModalidade(e.target.value)} className={input}><option value="todas">Todas as modalidades</option>{opcoes.modalidades.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select><select value={filtroTipo} aria-label="Filtrar por privacidade e origem" onChange={(e) => setFiltroTipo(e.target.value as typeof filtroTipo)} className={input}><option value="todos">Todas as origens</option>{Object.entries(ROTULOS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}</select><select value={filtroTriagem} aria-label="Filtrar por estado da curadoria" onChange={(e) => setFiltroTriagem(e.target.value as typeof filtroTriagem)} className={input}><option value="todos">Todas as triagens</option>{Object.entries(STATUS_TRIAGEM).map(([v, r]) => <option key={v} value={v}>{r}</option>)}</select></div>
      {!filtrados.length ? <p className="mt-5 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">{itens.length ? "Nenhuma imagem corresponde aos filtros atuais." : "Nenhuma imagem cadastrada ainda."}</p> : <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtrados.map((item) => { const resumo = hrefResumo(item); return <article key={item.id} className="overflow-hidden rounded-xl border border-border bg-surface-2">{item.urlTemporaria ? <button type="button" onClick={() => setSelecionado(item)} className="group relative block w-full cursor-zoom-in bg-bg" aria-label={`Ampliar ${item.titulo}`}><NextImage src={item.urlTemporaria} alt={item.titulo} width={1200} height={900} unoptimized className="aspect-[4/3] w-full object-contain transition-transform group-hover:scale-[1.02]" /><span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white"><Maximize2 className="size-3" />Ampliar</span></button> : <div className="grid aspect-[4/3] place-items-center bg-bg text-sm text-text-muted"><ImageIcon className="size-8" />Visualização expirada</div>}<div className="p-4"><div className="flex items-center justify-between gap-2"><p className="text-[10px] font-semibold uppercase text-accent">{ROTULOS[item.tipoOrigem]}</p><span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-text-faint">{STATUS_TRIAGEM[item.triagemStatus]}</span></div><h3 className="mt-1 font-bold text-text">{item.titulo}</h3><p className="mt-2 text-xs text-text-muted">{[item.disciplina, item.tema, item.subtema, item.modalidade].filter(Boolean).join(" · ") || "Sem classificação"}</p>{(item.periodo || item.caso) && <p className="mt-2 text-xs text-text-muted">{item.periodo ? `${item.periodo}º período` : ""}{item.periodo && item.caso ? " · " : ""}{item.caso ? `Caso: ${item.caso}` : ""}</p>}{item.diagnostico && <p className="mt-2 text-xs text-text-muted">Achado: {item.diagnostico}</p>}{item.fonte && <p className="mt-2 text-xs text-text-muted">Origem: {item.fonte}{item.pagina ? `, p. ${item.pagina}` : ""}</p>}<div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold">{resumo && <Link href={resumo} className="inline-flex items-center gap-1 text-accent hover:underline"><BookOpen className="size-3" />Abrir resumo</Link>}<button disabled={ocupado} onClick={() => void excluir(item)} className="inline-flex items-center gap-1 text-red-600"><Trash2 className="size-3" />Remover</button></div></div></article>; })}</div>}
    </section>
    {selecionado && <div role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${selecionado.titulo}`} className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelecionado(null)}><div className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-auto rounded-2xl border border-white/15 bg-surface shadow-2xl lg:flex-row" onClick={(evento) => evento.stopPropagation()}><button type="button" onClick={() => setSelecionado(null)} aria-label="Fechar imagem ampliada" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"><X className="size-5" /></button><div className="grid min-h-[45vh] flex-1 place-items-center bg-black p-4 sm:min-h-[65vh]"><div className="relative max-h-[78vh] max-w-full">{selecionado.urlTemporaria ? <NextImage src={selecionado.urlTemporaria} alt={selecionado.titulo} width={1800} height={1400} unoptimized className="max-h-[78vh] w-auto max-w-full object-contain" /> : <p className="p-8 text-sm text-white/70">URL temporária expirada. Feche e atualize a biblioteca.</p>}</div></div><aside className="w-full shrink-0 border-t border-border p-5 sm:p-6 lg:w-[22rem] lg:border-l lg:border-t-0"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">{ROTULOS[selecionado.tipoOrigem]}</p><h2 className="mt-2 text-xl font-bold text-text">{selecionado.titulo}</h2><p className="mt-4 text-sm leading-6 text-text-muted">{[selecionado.disciplina, selecionado.tema, selecionado.subtema, selecionado.modalidade].filter(Boolean).join(" · ") || "Sem classificação"}</p>{(selecionado.periodo || selecionado.caso) && <p className="mt-3 text-sm text-text-muted">{selecionado.periodo ? `${selecionado.periodo}º período` : ""}{selecionado.periodo && selecionado.caso ? " · " : ""}{selecionado.caso ? `Caso: ${selecionado.caso}` : ""}</p>}{selecionado.diagnostico && <p className="mt-3 text-sm text-text-muted"><strong className="text-text">Achado:</strong> {selecionado.diagnostico}</p>}{selecionado.fonte && <p className="mt-3 text-sm text-text-muted"><strong className="text-text">Origem:</strong> {selecionado.fonte}{selecionado.pagina ? `, página ${selecionado.pagina}` : ""}</p>}<p className="mt-3 text-sm text-text-muted"><strong className="text-text">Triagem:</strong> {STATUS_TRIAGEM[selecionado.triagemStatus]}. {selecionado.triagemMotivo}</p>{hrefResumo(selecionado) && <Link href={hrefResumo(selecionado)!} onClick={() => setSelecionado(null)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-accent-contrast"><BookOpen className="size-4" />Abrir resumo relacionado</Link>}</aside></div></div>}
  </div>;
}

const input = "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent";
function Campo({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-xs font-semibold text-text-muted">{label}{children}</label>; }
function Regra({ titulo, texto }: { titulo: string; texto: string }) { return <article className="rounded-xl border border-border bg-surface p-4"><h2 className="font-bold text-text">{titulo}</h2><p className="mt-1 text-sm leading-6 text-text-muted">{texto}</p></article>; }
function Bloqueio() { return <div className="mx-auto max-w-3xl px-5 py-12"><section className="rounded-2xl border border-border bg-surface p-6"><LockKeyhole className="size-7 text-accent" /><h1 className="mt-3 text-2xl font-bold text-text">Minha mídia</h1><p className="mt-2 text-sm text-text-muted">Entre pelo cabeçalho. Sem sessão, nenhum arquivo ou metadado da sua biblioteca é solicitado.</p><Link href="/midia" className="mt-4 inline-flex text-sm font-semibold text-accent">Abrir biblioteca pública</Link></section></div>; }
