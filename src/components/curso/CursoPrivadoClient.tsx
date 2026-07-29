"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookMarked, BookOpen, Brain, FileUp, Image as ImageIcon, ListFilter, LockKeyhole, MapPinned, Plus, Save, ShieldCheck, Upload } from "lucide-react";
import type { DisciplinaCursoPrivado, EntradaCursoPrivado, EventoCursoPrivado, LinhaImportacaoCurso, OrigemCurso, StatusCurso } from "@/domain/curso/types";
import type { RecursosPublicosDisciplina } from "@/domain/curso/recursos-publicos";
import { STATUS_CURSO } from "@/domain/curso/types";
import { carregarCursoPrivado, criarRascunhoCurso, interpretarImportacaoCurso, lerRascunhoCurso, salvarDisciplinaCurso, salvarRascunhoCurso, validarEntradaCurso } from "@/lib/curso-privado";

type DisciplinaDisponivel = RecursosPublicosDisciplina;
type FormatoImportacao = Extract<OrigemCurso, "markdown" | "csv">;
type FiltroStatus = "todos" | StatusCurso;

const STATUS_LABEL: Record<StatusCurso, string> = { planejada: "Planejada", cursando: "Cursando", concluida: "Concluida", revisar: "Revisar" };
const ORDEM_STATUS: Record<StatusCurso, number> = { revisar: 0, cursando: 1, planejada: 2, concluida: 3 };
const normalizarDisciplina = (valor: string) => valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");

export function CursoPrivadoClient({ disciplinasDisponiveis }: { disciplinasDisponiveis: DisciplinaDisponivel[] }) {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [disciplinas, setDisciplinas] = useState<DisciplinaCursoPrivado[]>([]);
  const [eventos, setEventos] = useState<EventoCursoPrivado[]>([]);
  const [rascunho, setRascunho] = useState<EntradaCursoPrivado>(criarRascunhoCurso());
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [textoImportacao, setTextoImportacao] = useState("");
  const [formatoImportacao, setFormatoImportacao] = useState<FormatoImportacao>("markdown");
  const [preview, setPreview] = useState<LinhaImportacaoCurso[]>([]);
  const [confirmarImportacao, setConfirmarImportacao] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");

  const porId = useMemo(() => new Map(disciplinasDisponiveis.map((disciplina) => [disciplina.disciplinaId, disciplina])), [disciplinasDisponiveis]);
  const aliasesDisciplinas = useMemo(() => new Map(disciplinasDisponiveis.flatMap((disciplina) => [
    [normalizarDisciplina(disciplina.disciplinaId), disciplina.disciplinaId] as const,
    [normalizarDisciplina(disciplina.nome), disciplina.disciplinaId] as const,
    [normalizarDisciplina(disciplina.slug), disciplina.disciplinaId] as const,
  ])), [disciplinasDisponiveis]);
  const validosImportacao = preview.filter((linha) => linha.entrada);
  const errosImportacao = preview.filter((linha) => linha.erros.length);
  const disciplinasFiltradas = filtroStatus === "todos" ? disciplinas : disciplinas.filter((disciplina) => disciplina.status === filtroStatus);
  const prioridades = useMemo(() => disciplinas.map((registro) => ({ registro, recurso: porId.get(registro.disciplinaId) })).filter((item): item is { registro: DisciplinaCursoPrivado; recurso: DisciplinaDisponivel } => Boolean(item.recurso)).sort((a, b) => ORDEM_STATUS[a.registro.status] - ORDEM_STATUS[b.registro.status] || (b.registro.dificuldade ?? 0) - (a.registro.dificuldade ?? 0) || b.recurso.lacunasDeConteudo - a.recurso.lacunasDeConteudo).slice(0, 3), [disciplinas, porId]);
  const cobertura = useMemo(() => disciplinas.reduce((total, registro) => {
    const recurso = porId.get(registro.disciplinaId);
    return { resumos: total.resumos + (recurso?.resumos ?? 0), questoes: total.questoes + (recurso?.questoes ?? 0), casos: total.casos + (recurso?.casos ?? 0), figuras: total.figuras + (recurso?.figuras ?? 0) };
  }, { resumos: 0, questoes: 0, casos: 0, figuras: 0 }), [disciplinas, porId]);

  const carregar = async () => {
    try {
      const dados = await carregarCursoPrivado();
      setDisciplinas(dados.disciplinas);
      setEventos(dados.eventos);
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel carregar o curso privado.");
    }
  };

  useEffect(() => {
    let ativo = true;
    void import("@/infra/supabase/client").then(async ({ getSupabaseAnon }) => {
      const supabase = getSupabaseAnon();
      const { data } = await supabase.auth.getSession();
      if (!ativo) return;
      const temSessao = Boolean(data.session?.user);
      setAutenticado(temSessao);
      if (temSessao) {
        const salvo = lerRascunhoCurso();
        if (salvo) setRascunho(salvo);
        await carregar();
      }
    }).catch(() => { if (ativo) setAutenticado(false); });
    return () => { ativo = false; };
  }, []);

  useEffect(() => { if (autenticado) salvarRascunhoCurso(rascunho); }, [autenticado, rascunho]);

  const alterar = <K extends keyof EntradaCursoPrivado>(campo: K, valor: EntradaCursoPrivado[K]) => {
    setRascunho((atual) => ({ ...atual, [campo]: valor }));
  };

  const salvarManual = async (evento: FormEvent) => {
    evento.preventDefault();
    const validacao = validarEntradaCurso(rascunho);
    if (!validacao.entrada) { setMensagem(validacao.erros.join(" ")); return; }
    setSalvando(true); setMensagem("");
    try {
      await salvarDisciplinaCurso({ ...validacao.entrada, origem: "manual" });
      setMensagem("Disciplina privada salva.");
      setRascunho(criarRascunhoCurso());
      await carregar();
    } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel salvar."); }
    finally { setSalvando(false); }
  };

  const editar = (item: DisciplinaCursoPrivado) => {
    setRascunho({ disciplinaId: item.disciplinaId, periodo: item.periodo, status: item.status, dataInicio: item.dataInicio, dataFim: item.dataFim, dificuldade: item.dificuldade, observacao: item.observacao, origem: "manual" });
    setMensagem("Edite os campos e confirme para atualizar seu registro privado.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prepararImportacao = () => {
    const linhas = interpretarImportacaoCurso(textoImportacao, formatoImportacao).map((linha) => {
      if (!linha.entrada) return linha;
      const disciplinaId = aliasesDisciplinas.get(normalizarDisciplina(linha.entrada.disciplinaId));
      if (!disciplinaId) return { ...linha, entrada: undefined, erros: [...linha.erros, "Disciplina nao reconhecida na biblioteca."] };
      return { ...linha, entrada: { ...linha.entrada, disciplinaId } };
    });
    setPreview(linhas);
    setConfirmarImportacao(false);
  };

  const importar = async () => {
    if (!confirmarImportacao || !validosImportacao.length) return;
    setSalvando(true); setMensagem("");
    try {
      for (const linha of validosImportacao) await salvarDisciplinaCurso(linha.entrada!, "importada");
      setMensagem(`${validosImportacao.length} registro(s) privado(s) importado(s).`);
      setTextoImportacao(""); setPreview([]); setConfirmarImportacao(false);
      await carregar();
    } catch (erro) { setMensagem(erro instanceof Error ? erro.message : "A importacao nao foi concluida."); }
    finally { setSalvando(false); }
  };

  const lerArquivo = async (evento: ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    const texto = await arquivo.text();
    setTextoImportacao(texto);
    setFormatoImportacao(arquivo.name.toLowerCase().endsWith(".csv") ? "csv" : "markdown");
    setPreview([]);
  };

  if (autenticado === null) return <Carregando />;
  if (!autenticado) return <BloqueioPrivado />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex items-start gap-4"><span className="rounded-xl bg-accent p-3 text-accent-contrast"><LockKeyhole className="size-7" /></span><div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Espaco autenticado</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Meu curso privado</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">Organize disciplinas, periodo, status, dificuldade e proximos estudos. Estes dados pertencem apenas a sua conta e nao aparecem nas Trilhas do Curso.</p>
        </div></div>
      </header>

      {mensagem && <p role="status" className="mt-5 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">{mensagem}</p>}

      <section aria-label="Cobertura publica das disciplinas registradas" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metrica icone={<BookOpen className="size-4" />} valor={cobertura.resumos} legenda="resumos" />
        <Metrica icone={<BookMarked className="size-4" />} valor={cobertura.questoes} legenda="questoes" />
        <Metrica icone={<Brain className="size-4" />} valor={cobertura.casos} legenda="casos" />
        <Metrica icone={<ImageIcon className="size-4" />} valor={cobertura.figuras} legenda="midias ancoradas" />
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex items-start gap-3"><MapPinned className="mt-0.5 size-5 shrink-0 text-accent" /><div><h2 className="text-lg font-bold text-text">Proximos estudos</h2><p className="mt-1 text-sm text-text-muted">Priorizacao local baseada no status e dificuldade que voce registrou, ligada somente ao conteudo publico ja publicado.</p></div></div>
        {!prioridades.length ? <p className="mt-4 text-sm text-text-muted">Registre uma disciplina para receber sugestoes de revisao com links diretos.</p> : <div className="mt-4 grid gap-3 lg:grid-cols-3">{prioridades.map(({ registro, recurso }) => {
          const topico = recurso.topicosRecomendados[0];
          return <article key={registro.disciplinaId} className="rounded-xl border border-border bg-surface-2 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{STATUS_LABEL[registro.status]}{registro.dificuldade ? ` · dificuldade ${registro.dificuldade}/5` : ""}</p><h3 className="mt-2 font-bold text-text">{recurso.nome}</h3>{topico ? <><p className="mt-2 text-sm text-text-muted">{topico.motivo === "alto_rendimento" ? "Comece pelo ponto de alto rendimento:" : "Retome um resumo disponivel:"}</p><Link href={topico.href} className="mt-1 inline-flex text-sm font-semibold text-accent hover:underline">{topico.nome}</Link></> : <p className="mt-2 text-sm text-text-muted">Ainda nao ha resumo publicado para recomendar nesta disciplina.</p>}<Link href={`/biblioteca/${recurso.slug}`} className="mt-3 inline-flex text-xs font-semibold text-text-muted hover:text-accent hover:underline">Abrir biblioteca</Link></article>;
        })}</div>}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.85fr)]">
        <form onSubmit={salvarManual} className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
          <h2 className="flex items-center gap-2 text-lg font-bold text-text"><Plus className="size-5 text-accent" /> Atualizacao manual</h2>
          <p className="mt-1 text-sm text-text-muted">O rascunho fica neste dispositivo ate voce salvar ou trocar de registro.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Campo label="Disciplina"><select required value={rascunho.disciplinaId} onChange={(e) => alterar("disciplinaId", e.target.value)} className={input}><option value="">Selecione</option>{disciplinasDisponiveis.map((disciplina) => <option key={disciplina.disciplinaId} value={disciplina.disciplinaId}>{disciplina.nome}</option>)}</select></Campo>
            <Campo label="Periodo"><select value={rascunho.periodo ?? ""} onChange={(e) => alterar("periodo", e.target.value ? Number(e.target.value) : null)} className={input}><option value="">Nao informado</option>{Array.from({ length: 12 }, (_, i) => i + 1).map((periodo) => <option key={periodo} value={periodo}>{periodo}o periodo</option>)}</select></Campo>
            <Campo label="Status"><select value={rascunho.status ?? "planejada"} onChange={(e) => alterar("status", e.target.value as StatusCurso)} className={input}>{STATUS_CURSO.map((status) => <option key={status} value={status}>{STATUS_LABEL[status]}</option>)}</select></Campo>
            <Campo label="Dificuldade (1 a 5)"><select value={rascunho.dificuldade ?? ""} onChange={(e) => alterar("dificuldade", e.target.value ? Number(e.target.value) : null)} className={input}><option value="">Nao informado</option>{[1, 2, 3, 4, 5].map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select></Campo>
            <Campo label="Inicio"><input type="date" value={rascunho.dataInicio ?? ""} onChange={(e) => alterar("dataInicio", e.target.value || null)} className={input} /></Campo>
            <Campo label="Fim"><input type="date" value={rascunho.dataFim ?? ""} onChange={(e) => alterar("dataFim", e.target.value || null)} className={input} /></Campo>
          </div>
          <Campo label="Observacao pessoal" extra="Opcional; maximo de 2000 caracteres."><textarea value={rascunho.observacao ?? ""} onChange={(e) => alterar("observacao", e.target.value)} maxLength={2000} rows={4} className={`${input} mt-1 resize-y`} /></Campo>
          <button disabled={salvando} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60"><Save className="size-4" /> {salvando ? "Salvando..." : "Confirmar e salvar"}</button>
        </form>

        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
          <h2 className="flex items-center gap-2 text-lg font-bold text-text"><FileUp className="size-5 text-accent" /> Importar com revisao</h2>
          <p className="mt-1 text-sm text-text-muted">Cole uma tabela Markdown ou CSV. Arquivos e texto nao sao enviados ate a confirmacao final.</p>
          <div className="mt-4 flex flex-wrap gap-3"><label className="text-xs font-semibold text-text-muted">Formato<select value={formatoImportacao} onChange={(e) => { setFormatoImportacao(e.target.value as FormatoImportacao); setPreview([]); }} className={`${input} mt-1`}><option value="markdown">Markdown</option><option value="csv">CSV</option></select></label><label className="cursor-pointer text-xs font-semibold text-accent">Ler arquivo local<input type="file" accept=".md,.markdown,.csv,text/markdown,text/csv" className="sr-only" onChange={lerArquivo} /></label></div>
          <textarea value={textoImportacao} onChange={(e) => { setTextoImportacao(e.target.value); setPreview([]); }} rows={7} placeholder={"| disciplina | periodo | status | dificuldade | observacao |\n| Cardiologia | 6 | cursando | 4 | revisar valvopatias |"} className={`${input} mt-4 resize-y font-mono text-xs`} />
          <button type="button" onClick={prepararImportacao} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text-muted hover:border-accent hover:text-accent"><Upload className="size-4" /> Gerar pre-visualizacao</button>
          {preview.length > 0 && <div className="mt-4 rounded-xl bg-surface-2 p-3 text-xs text-text-muted"><p><strong className="text-text">{validosImportacao.length}</strong> valida(s) e <strong className="text-text">{errosImportacao.length}</strong> com erro.</p><ul className="mt-2 max-h-32 space-y-1 overflow-y-auto">{preview.map((linha) => <li key={linha.linha}>Linha {linha.linha}: {linha.erros.length ? linha.erros.join(" ") : `${linha.entrada?.disciplinaId} - ${linha.entrada?.status}`}</li>)}</ul>{validosImportacao.length > 0 && <label className="mt-3 flex gap-2"><input type="checkbox" checked={confirmarImportacao} onChange={(e) => setConfirmarImportacao(e.target.checked)} />Confirmo salvar apenas os registros validos.</label>}<button type="button" disabled={!confirmarImportacao || salvando} onClick={importar} className="mt-3 rounded-lg bg-accent px-3 py-2 font-semibold text-accent-contrast disabled:opacity-50">Importar {validosImportacao.length} registro(s)</button></div>}
        </section>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 text-lg font-bold text-text"><BookOpen className="size-5 text-accent" /> Disciplinas registradas</h2>{disciplinas.length > 0 && <div className="flex items-center gap-1 rounded-lg bg-surface-2 p-1 text-xs"><ListFilter className="ml-1 size-3 text-text-faint" />{(["todos", ...STATUS_CURSO] as FiltroStatus[]).map((status) => <button key={status} aria-pressed={filtroStatus === status} onClick={() => setFiltroStatus(status)} className={`rounded-md px-2 py-1 font-semibold ${filtroStatus === status ? "bg-surface text-accent shadow-sm" : "text-text-muted hover:text-text"}`}>{status === "todos" ? "Todas" : STATUS_LABEL[status]}</button>)}</div>}</div>
        {!disciplinas.length ? <p className="mt-3 text-sm text-text-muted">Nenhuma disciplina privada registrada ainda.</p> : !disciplinasFiltradas.length ? <p className="mt-3 text-sm text-text-muted">Nenhuma disciplina com este status.</p> : <div className="mt-4 grid gap-3 md:grid-cols-2">{disciplinasFiltradas.map((item) => { const disciplina = porId.get(item.disciplinaId); return <article key={item.disciplinaId} className="rounded-xl border border-border bg-surface-2 p-4"><div className="flex items-start gap-3"><span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">{disciplina?.marca ?? "CM"}</span><div className="min-w-0 flex-1"><h3 className="font-semibold text-text">{disciplina?.nome ?? item.disciplinaId}</h3><p className="mt-1 text-xs text-text-muted">{item.periodo ? `${item.periodo}o periodo` : "Periodo nao informado"} - {STATUS_LABEL[item.status]}{item.dificuldade ? ` - dificuldade ${item.dificuldade}/5` : ""}</p>{disciplina && <p className="mt-2 text-xs leading-5 text-text-muted">{disciplina.resumos} resumos · {disciplina.questoes} questoes · {disciplina.casos} casos · {disciplina.figuras} midias ancoradas</p>}{disciplina && <p className="mt-1 text-xs text-text-faint">{disciplina.lacunasDeConteudo ? `${disciplina.lacunasDeConteudo} topico(s) ainda sem resumo publicado.` : "Cobertura de resumos completa para a taxonomia atual."}</p>}{item.observacao && <p className="mt-2 line-clamp-2 text-xs leading-5 text-text-muted">{item.observacao}</p>}</div></div><div className="mt-3 flex gap-3 text-xs font-semibold"><button onClick={() => editar(item)} className="text-accent hover:underline">Editar</button>{disciplina && <Link href={`/biblioteca/${disciplina.slug}`} className="text-text-muted hover:text-accent hover:underline">Ver conteudo</Link>}</div></article>; })}</div>}
      </section>

      <section className="mt-6 rounded-2xl border border-dashed border-border bg-surface-2 p-5 text-sm text-text-muted"><div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-accent" /><div><h2 className="font-bold text-text">Historico privado minimo</h2><p className="mt-1">O historico registra apenas data, origem e campos alterados; nao copia suas observacoes nem documentos privados.</p>{eventos.length > 0 && <ul className="mt-3 space-y-1 text-xs">{eventos.slice(0, 5).map((evento) => <li key={evento.id}>{evento.tipo} - {evento.disciplinaId} - {new Date(evento.criadoEm).toLocaleDateString("pt-BR")}</li>)}</ul>}</div></div></section>
    </div>
  );
}

const input = "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent";
function Metrica({ icone, valor, legenda }: { icone: React.ReactNode; valor: number; legenda: string }) { return <div className="rounded-xl border border-border bg-surface px-3 py-3"><span className="flex items-center gap-1.5 text-accent">{icone}<strong className="text-lg text-text">{valor}</strong></span><p className="mt-1 text-xs text-text-muted">{legenda}</p></div>; }
function Campo({ label, extra, children }: { label: string; extra?: string; children: React.ReactNode }) { return <label className="block text-xs font-semibold text-text-muted">{label}{extra && <span className="ml-1 font-normal text-text-faint">{extra}</span>}{children}</label>; }
function Carregando() { return <div className="mx-auto max-w-4xl px-5 py-12 text-sm text-text-muted">Carregando seu espaco privado...</div>; }
function BloqueioPrivado() { return <div className="mx-auto max-w-3xl px-5 py-12"><section className="rounded-2xl border border-border bg-surface p-6" style={{ boxShadow: "var(--shadow)" }}><LockKeyhole className="size-7 text-accent" /><h1 className="mt-3 text-2xl font-bold text-text">Meu curso privado</h1><p className="mt-2 text-sm leading-6 text-text-muted">Entre pela opcao no cabecalho para acessar e salvar seus registros. Nenhum dado individual e mostrado nesta pagina sem uma sessao autenticada.</p></section></div>; }
