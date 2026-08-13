"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Check, X, ChevronRight, RotateCcw, ListChecks, PartyPopper, CalendarClock, History, ChevronDown, Filter, Keyboard, CircleHelp } from "lucide-react";
import type { Disciplina, Questao } from "@/domain/content/types";
import { registrarResposta, lerRespostas, sincronizarProgresso } from "@/lib/progresso";
import { cn } from "@/lib/cn";
import { Figuras } from "@/components/figuras/Figura";

const INTERVALOS_REVISAO_DIAS = [1, 3, 7, 21, 45, 90] as const;

/** A fila de questões acompanha a cadência de revisão do estudo, sem substituir o FSRS do Anki. */
function intervaloRevisaoDias(respostas: ReturnType<typeof lerRespostas>): number {
  const ordenadas = [...respostas].sort((a, b) => a.em - b.em);
  const ultima = ordenadas.at(-1);
  if (!ultima || !ultima.correta) return INTERVALOS_REVISAO_DIAS[0];

  let acertosConsecutivos = 0;
  for (let indice = ordenadas.length - 1; indice >= 0; indice -= 1) {
    if (!ordenadas[indice].correta) break;
    acertosConsecutivos += 1;
  }
  return INTERVALOS_REVISAO_DIAS[Math.min(acertosConsecutivos - 1, INTERVALOS_REVISAO_DIAS.length - 1)];
}

/**
 * Interactive quiz. Receives questions + disciplines as props from the server
 * page, so it is fully decoupled from where the data comes from (static/Supabase).
 *
 * Por padrão, questões já respondidas em sessões anteriores (locais ou
 * sincronizadas) não voltam a aparecer — evita repetir o que o aluno já fez
 * ao simplesmente recarregar a página. `mostrarRespondidas` permite revisar
 * a seleção inteira de novo quando o aluno pedir.
 */
export function QuizClient({
  questoes,
  disciplinas,
}: {
  questoes: Questao[];
  disciplinas: Disciplina[];
}) {
  type ModoFila = "novas" | "erros" | "revisao" | "todas";
  type BancoQuestao = "geral" | "imagens" | "omed" | "residencia";
  const CHAVE_FILTROS = "codex:questoes-filtros";
  const [filtro, setFiltro] = useState<string>("todas");
  const [subtemaFiltro, setSubtemaFiltro] = useState<string>("");
  const [banco, setBanco] = useState<BancoQuestao>("geral");
  const [modoFila, setModoFila] = useState<ModoFila>("novas");
  const [mostrarRespondidas, setMostrarRespondidas] = useState(false);
  const [disciplinasAbertas, setDisciplinasAbertas] = useState(false);
  const [respondidasBase, setRespondidasBase] = useState<Set<string>>(new Set());
  const [historico, setHistorico] = useState<ReturnType<typeof lerRespostas>>([]);

  const [fila, setFila] = useState<Questao[]>(questoes);
  const [totalNaSelecao, setTotalNaSelecao] = useState(questoes.length);
  const [totalFila, setTotalFila] = useState(questoes.length);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [atalhosAbertos, setAtalhosAbertos] = useState(false);

  const disciplinasComQ = useMemo(() => {
    const ids = new Set(questoes.map((q) => q.disciplinaId));
    return disciplinas.filter((d) => ids.has(d.id));
  }, [questoes, disciplinas]);

  const subtemaSelecionado = useMemo(() => disciplinas
    .flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas))
    .find((subtema) => subtema.id === subtemaFiltro), [disciplinas, subtemaFiltro]);

  const totalComImagem = useMemo(() => questoes.filter((questao) => Boolean(questao.figura)).length, [questoes]);

  function pertenceAoBanco(questao: Questao, bancoAtual: BancoQuestao): boolean {
    if (bancoAtual === "geral") return true;
    if (bancoAtual === "imagens") return Boolean(questao.figura);
    const bancos = questao.bancos ?? [];
    if (bancoAtual === "omed" && bancos.includes("omed")) return true;
    if (bancoAtual === "residencia" && bancos.some((item) => ["residencia", "revalida", "enare", "usmle", "institucional"].includes(item))) return true;
    const origem = `${questao.estilo} ${questao.fonte ?? ""} ${questao.tags.join(" ")}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (bancoAtual === "omed") return origem.includes("omed");
    return questao.estilo === "residencia" || /residencia|revalida|enare|fuvest|fmusp|usmle/.test(origem);
  }

  function montarFila(filtroAtual: string, incluirRespondidas: boolean, base: Set<string>, historicoAtual: ReturnType<typeof lerRespostas>, modoAtual: ModoFila, subtemaAtual = "", bancoAtual: BancoQuestao = "geral") {
    const porDisciplina = filtroAtual === "todas" ? questoes : questoes.filter((q) => q.disciplinaId === filtroAtual);
    const porSubtema = subtemaAtual ? porDisciplina.filter((q) => q.subtemaId === subtemaAtual) : porDisciplina;
    const pool = porSubtema.filter((q) => pertenceAoBanco(q, bancoAtual));
    const historicoPorQuestao = new Map<string, ReturnType<typeof lerRespostas>>();
    for (const resposta of historicoAtual) {
      const respostasDaQuestao = historicoPorQuestao.get(resposta.questaoId) ?? [];
      respostasDaQuestao.push(resposta);
      historicoPorQuestao.set(resposta.questaoId, respostasDaQuestao);
    }
    const agora = Date.now();
    const disponiveis = pool.filter((q) => {
      if (incluirRespondidas || modoAtual === "todas") return true;
      const respostasDaQuestao = historicoPorQuestao.get(q.id) ?? [];
      const resposta = respostasDaQuestao.reduce<ReturnType<typeof lerRespostas>[number] | undefined>((maisRecente, atual) => !maisRecente || atual.em > maisRecente.em ? atual : maisRecente, undefined);
      if (modoAtual === "novas") return !resposta && !base.has(q.id);
      if (modoAtual === "erros") return resposta ? !resposta.correta : false;
      if (modoAtual === "revisao") {
        if (!resposta) return false;
        const intervalo = intervaloRevisaoDias(respostasDaQuestao);
        return agora - resposta.em >= intervalo * 24 * 60 * 60 * 1000;
      }
      return true;
    });
    setFila(disponiveis);
    setTotalNaSelecao(pool.length);
    setTotalFila(disponiveis.length);
    setEscolha(null);
    setAcertos(0);
    setRespondidas(0);
  }

  // Carrega o histórico de respostas (local, depois reconciliado com a conta)
  // após montar no cliente, para não divergir da renderização do servidor.
  useEffect(() => {
    let ativo = true;
    const lerSelecaoInicial = () => {
      const preferencias = (() => { try { return JSON.parse(window.localStorage.getItem(CHAVE_FILTROS) ?? "{}"); } catch { return {}; } })() as { filtro?: string; modo?: ModoFila; subtema?: string; banco?: BancoQuestao };
      const parametros = new URLSearchParams(window.location.search);
      const disciplinaUrl = parametros.get("disciplina") ?? "";
      const subtemaUrl = parametros.get("subtema") ?? "";
      const modoUrl = parametros.get("modo") ?? "";
      const bancoUrl = parametros.get("banco") ?? (parametros.get("imagens") === "1" ? "imagens" : "");
      const filtroCandidato = disciplinaUrl || preferencias.filtro || "todas";
      const filtroInicial = filtroCandidato === "todas" || disciplinas.some((d) => d.id === filtroCandidato) ? filtroCandidato : "todas";
      const subtemaCandidato = subtemaUrl || preferencias.subtema || "";
      const subtemaInicial = disciplinas.some((disciplina) => (filtroInicial === "todas" || disciplina.id === filtroInicial) && disciplina.temas.some((tema) => tema.subtemas.some((subtema) => subtema.id === subtemaCandidato))) ? subtemaCandidato : "";
      const modoCandidato = modoUrl || preferencias.modo || "novas";
      const modoInicial: ModoFila = modoCandidato === "erros" || modoCandidato === "revisao" || modoCandidato === "todas" ? modoCandidato : "novas";
      const bancoInicial: BancoQuestao = bancoUrl === "imagens" || bancoUrl === "omed" || bancoUrl === "residencia" ? bancoUrl : "geral";
      return { filtroInicial, subtemaInicial, modoInicial, bancoInicial };
    };
    void Promise.resolve().then(() => {
      if (!ativo) return;
      const locais = lerRespostas();
      const { filtroInicial, subtemaInicial, modoInicial, bancoInicial } = lerSelecaoInicial();
      setFiltro(filtroInicial);
      setSubtemaFiltro(subtemaInicial);
      setModoFila(modoInicial);
      setBanco(bancoInicial);
      setHistorico(locais);
      const base = new Set(locais.map((r) => r.questaoId));
      setRespondidasBase(base);
      montarFila(filtroInicial, false, base, locais, modoInicial, subtemaInicial, bancoInicial);
    });
    void sincronizarProgresso().then((p) => {
      if (!ativo) return;
      // A resposta pode ter sido dada enquanto a leitura remota estava em voo.
      // Releia o armazenamento local antes de reconstruir a fila para nunca
      // reintroduzir uma questão recém-respondida por uma resposta remota antiga.
      const historicoAtual = p.respostas;
      const base = new Set([
        ...lerRespostas().map((r) => r.questaoId),
        ...historicoAtual.map((r) => r.questaoId),
      ]);
      const { filtroInicial, subtemaInicial, modoInicial, bancoInicial } = lerSelecaoInicial();
      setRespondidasBase(base);
      setHistorico(historicoAtual);
      setFiltro(filtroInicial);
      setSubtemaFiltro(subtemaInicial);
      setModoFila(modoInicial);
      setBanco(bancoInicial);
      montarFila(filtroInicial, false, base, historicoAtual, modoInicial, subtemaInicial, bancoInicial);
    });
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questao = fila[0];

  const responder = useCallback((letra: string) => {
    if (escolha || !questao) return;
    const acertou = !!questao.alternativas.find((a) => a.letra === letra)?.correta;
    setEscolha(letra);
    setRespondidas((r) => r + 1);
    if (acertou) setAcertos((a) => a + 1);
    // Alimenta o progresso do dashboard (persistido no navegador).
    registrarResposta(questao, acertou);
    setRespondidasBase((base) => new Set(base).add(questao.id));
    setHistorico(lerRespostas());
  }, [escolha, questao]);

  const proxima = useCallback(() => {
    setEscolha(null);
    setFila((f) => f.slice(1));
  }, []);

  useEffect(() => {
    const aoPressionar = (evento: KeyboardEvent) => {
      const alvo = evento.target as HTMLElement | null;
      if (alvo?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (evento.key === "Escape" && atalhosAbertos) {
        evento.preventDefault();
        setAtalhosAbertos(false);
        return;
      }
      if (evento.key === "?" && !evento.ctrlKey && !evento.metaKey && !evento.altKey) {
        evento.preventDefault();
        setAtalhosAbertos((aberto) => !aberto);
        return;
      }
      if (evento.ctrlKey || evento.metaKey || evento.altKey) return;
      if (!escolha && questao) {
        const indice = /^[1-4]$/.test(evento.key) ? Number(evento.key) - 1 : -1;
        const letra = /^[a-dA-D]$/.test(evento.key) ? evento.key.toUpperCase() : questao.alternativas[indice]?.letra;
        if (letra && questao.alternativas.some((alternativa) => alternativa.letra === letra)) {
          evento.preventDefault();
          responder(letra);
        }
        return;
      }
      if (escolha && (evento.key === "Enter" || evento.key === "ArrowRight")) {
        evento.preventDefault();
        proxima();
      }
    };
    window.addEventListener("keydown", aoPressionar);
    return () => window.removeEventListener("keydown", aoPressionar);
  }, [atalhosAbertos, escolha, proxima, questao, responder]);

  const reset = (novoFiltro: string) => {
    setFiltro(novoFiltro);
    setSubtemaFiltro("");
    setDisciplinasAbertas(novoFiltro !== "todas");
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro: novoFiltro, modo: modoFila, subtema: "", banco }));
    montarFila(novoFiltro, false, respondidasBase, historico, modoFila, "", banco);
  };

  const trocarModo = (novoModo: ModoFila) => {
    setModoFila(novoModo);
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro, modo: novoModo, subtema: subtemaFiltro, banco }));
    montarFila(filtro, false, respondidasBase, historico, novoModo, subtemaFiltro, banco);
  };

  const trocarBanco = (novoBanco: BancoQuestao) => {
    setBanco(novoBanco);
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro, modo: modoFila, subtema: subtemaFiltro, banco: novoBanco }));
    montarFila(filtro, false, respondidasBase, historico, modoFila, subtemaFiltro, novoBanco);
  };

  const revisarRespondidas = () => {
    setMostrarRespondidas(true);
    montarFila(filtro, true, respondidasBase, historico, "todas", subtemaFiltro, banco);
  };

  const limparSelecao = () => {
    setFiltro("todas");
    setSubtemaFiltro("");
    setBanco("geral");
    setModoFila("novas");
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro: "todas", modo: "novas", subtema: "", banco: "geral" }));
    window.history.replaceState(null, "", window.location.pathname);
    montarFila("todas", false, respondidasBase, historico, "novas", "", "geral");
  };

  const ocultas = totalNaSelecao - totalFila;

  if (!questao) {
    const tudoRespondido = totalNaSelecao > 0 && modoFila === "novas" && !mostrarRespondidas;
    const estadoVazio = modoFila === "erros"
      ? "Nenhum erro nesta seleção."
      : modoFila === "revisao"
        ? "Nenhuma revisão está vencida nesta seleção."
        : "Nenhuma questão nesta seleção. Isso registra uma lacuna real do banco, sem inventar correspondências.";
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        {tudoRespondido ? (
          <>
            <PartyPopper className="mx-auto mb-3 size-8 text-accent" />
            <p className="text-text-muted">
              Você já respondeu todas as {totalNaSelecao} questões desta seleção.
            </p>
            <button
              onClick={revisarRespondidas}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
            >
              Revisar questões já respondidas
            </button>
          </>
        ) : (
          <>
            <p className="text-text-muted">{estadoVazio}</p>
            <button onClick={limparSelecao} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text-muted hover:border-accent hover:text-accent">Limpar filtros</button>
          </>
        )}
      </div>
    );
  }

  const pct = respondidas ? Math.round((acertos / respondidas) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text">
            <ListChecks className="size-6 text-accent" /> Questões
          </h1>
          <p className="text-sm text-text-faint">
            {totalFila} questões · estilo OMED / residência
            {ocultas > 0 && !mostrarRespondidas && (
              <>
                {" "}
                ·{" "}
                <button onClick={revisarRespondidas} className="underline hover:text-text-muted">
                  {ocultas} já respondidas (ocultas) — revisar
                </button>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAtalhosAbertos((aberto) => !aberto)}
            aria-expanded={atalhosAbertos}
            aria-label="Ver atalhos de teclado"
            className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Keyboard className="size-4" />
          </button>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">{pct}%</div>
            <div className="text-xs text-text-faint">
              {acertos}/{respondidas} certas
            </div>
          </div>
        </div>
      </div>

      {atalhosAbertos && (
        <aside className="mb-5 rounded-xl border border-accent/30 bg-accent-soft/55 p-4 text-sm text-text-muted" role="status">
          <p className="flex items-center gap-2 font-bold text-text"><CircleHelp className="size-4 text-accent" /> Atalhos de resposta</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <span><Tecla>1–4</Tecla> ou <Tecla>A–D</Tecla> responder</span>
            <span><Tecla>Enter</Tecla> ou <Tecla>→</Tecla> próxima</span>
            <span><Tecla>?</Tecla> ajuda</span>
            <span><Tecla>Esc</Tecla> fechar</span>
          </div>
        </aside>
      )}

      {/* Filters */}
      <div className="mb-3 flex flex-wrap gap-2" aria-label="Fila de questões">
        <FiltroChip label="Novas" active={modoFila === "novas"} onClick={() => trocarModo("novas")} />
        <FiltroChip label="Erros" active={modoFila === "erros"} onClick={() => trocarModo("erros")} />
        <FiltroChip label="Revisão" active={modoFila === "revisao"} onClick={() => trocarModo("revisao")} />
        <FiltroChip label="Todas" active={modoFila === "todas"} onClick={() => trocarModo("todas")} />
      </div>
      <div className="mb-3 flex flex-wrap gap-2" aria-label="Origem e formato do banco">
        <FiltroChip label="Banco geral" active={banco === "geral"} onClick={() => trocarBanco("geral")} />
        <FiltroChip label={`Imagens (${totalComImagem})`} active={banco === "imagens"} onClick={() => trocarBanco("imagens")} />
        <FiltroChip label="Prioridade OMED" active={banco === "omed"} onClick={() => trocarBanco("omed")} />
        <FiltroChip label="Residência / Revalida" active={banco === "residencia"} onClick={() => trocarBanco("residencia")} />
      </div>
      {subtemaFiltro && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent-soft/45 px-3 py-2 text-xs text-text-muted">
          <span><strong className="text-text">Subtema:</strong> {subtemaSelecionado?.nome ?? subtemaFiltro}</span>
          <button type="button" onClick={limparSelecao} className="shrink-0 font-bold text-accent hover:underline">Limpar vínculo</button>
        </div>
      )}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-3 sm:p-4" aria-label="Filtrar por disciplina">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><Filter className="size-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-faint">Disciplina</p>
              <p className="truncate text-sm font-semibold text-text">{filtro === "todas" ? "Todas as disciplinas" : disciplinasComQ.find((d) => d.id === filtro)?.nome ?? "Disciplina selecionada"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDisciplinasAbertas((aberta) => !aberta)}
            aria-expanded={disciplinasAbertas}
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {disciplinasAbertas ? "Ocultar" : "Escolher"}
            <ChevronDown className={cn("size-3.5 transition-transform", disciplinasAbertas && "rotate-180")} />
          </button>
        </div>
        {disciplinasAbertas && <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          <FiltroChip label="Todas" active={filtro === "todas"} onClick={() => reset("todas")} />
          {disciplinasComQ.map((d) => <FiltroChip key={d.id} label={d.nome} active={filtro === d.id} onClick={() => reset(d.id)} />)}
        </div>}
      </div>

      <p className="mb-4 flex items-center gap-1.5 text-xs text-text-faint">
        {modoFila === "revisao" ? <CalendarClock className="size-3.5" /> : <History className="size-3.5" />}
        A fila é salva neste dispositivo e sincronizada quando sua sessão estiver ativa. Revisões corretas seguem D1, D3, D7, D21 e depois aumentam; erro volta para D1.
      </p>

      {/* Card */}
      <div
        className="rounded-2xl border border-border bg-surface p-6"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-semibold text-text-muted">
            {totalFila - fila.length + 1} / {totalFila}
          </span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">
            {questao.estilo}
          </span>
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-text-faint">
            {questao.dificuldade}
          </span>
        </div>

        <p className="text-[15.5px] leading-relaxed text-text">{questao.enunciado}</p>

        {questao.figura && <div className="mt-5"><Figuras ids={questao.figura} /></div>}

        <div className="mt-5 space-y-2.5">
          {questao.alternativas.map((alt, indice) => {
            const revelado = escolha !== null;
            const isEscolha = escolha === alt.letra;
            const status = revelado
              ? alt.correta
                ? "correta"
                : isEscolha
                  ? "errada"
                  : "neutra"
              : "idle";
            return (
              <button
                key={alt.letra}
                onClick={() => responder(alt.letra)}
                disabled={revelado}
                aria-keyshortcuts={`${indice + 1} ${alt.letra}`}
                className={cn(
                  "w-full rounded-xl border p-3.5 text-left transition-colors",
                  status === "idle" && "border-border bg-surface hover:border-accent hover:bg-accent-soft/40",
                  status === "correta" && "border-success bg-success-soft",
                  status === "errada" && "border-danger bg-danger-soft",
                  status === "neutra" && "border-border bg-surface opacity-70"
                )}
              >
                <div className="flex gap-3">
                  <span
                    className={cn(
                      "grid size-6 flex-none place-items-center rounded-md text-xs font-bold",
                      status === "correta" && "bg-success text-white",
                      status === "errada" && "bg-danger text-white",
                      (status === "idle" || status === "neutra") && "bg-surface-2 text-text-muted"
                    )}
                  >
                    {status === "correta" ? (
                      <Check className="size-3.5" />
                    ) : status === "errada" ? (
                      <X className="size-3.5" />
                    ) : (
                      alt.letra
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm text-text">{alt.texto}</span>
                      {!revelado && <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-text-faint sm:inline">{indice + 1}</kbd>}
                    </div>
                    {revelado && (
                      <p className="mt-1.5 text-[13px] leading-snug text-text-muted">
                        {alt.comentario}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {escolha && (
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-text-faint">
              {questao.fonte && `Fonte: ${questao.fonte}`}
            </span>
            <button
              onClick={proxima}
              aria-keyshortcuts="Enter ArrowRight"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
            >
              Próxima <span className="hidden text-[10px] font-medium opacity-75 sm:inline">Enter</span><ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => reset(filtro)}
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-faint hover:text-text"
      >
        <RotateCcw className="size-3.5" /> Reiniciar sessão
      </button>
    </div>
  );
}

function Tecla({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-border-strong bg-surface px-1.5 py-0.5 font-bold text-text">{children}</kbd>;
}

function FiltroChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-border bg-surface text-text-muted hover:border-border-strong"
      )}
    >
      {label}
    </button>
  );
}
