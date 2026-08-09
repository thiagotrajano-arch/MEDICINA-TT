"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, X, ChevronRight, RotateCcw, ListChecks, PartyPopper, CalendarClock, History, ChevronDown, Filter } from "lucide-react";
import type { Disciplina, Questao } from "@/domain/content/types";
import { registrarResposta, lerRespostas, sincronizarProgresso } from "@/lib/progresso";
import { cn } from "@/lib/cn";

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
  const CHAVE_FILTROS = "codex:questoes-filtros";
  const [filtro, setFiltro] = useState<string>("todas");
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

  const disciplinasComQ = useMemo(() => {
    const ids = new Set(questoes.map((q) => q.disciplinaId));
    return disciplinas.filter((d) => ids.has(d.id));
  }, [questoes, disciplinas]);

  function montarFila(filtroAtual: string, incluirRespondidas: boolean, base: Set<string>, historicoAtual: ReturnType<typeof lerRespostas>, modoAtual: ModoFila) {
    const pool = filtroAtual === "todas" ? questoes : questoes.filter((q) => q.disciplinaId === filtroAtual);
    const maisRecente = new Map<string, ReturnType<typeof lerRespostas>[number]>();
    for (const resposta of historicoAtual) {
      const anterior = maisRecente.get(resposta.questaoId);
      if (!anterior || resposta.em > anterior.em) maisRecente.set(resposta.questaoId, resposta);
    }
    const agora = Date.now();
    const disponiveis = pool.filter((q) => {
      if (incluirRespondidas || modoAtual === "todas") return true;
      const resposta = maisRecente.get(q.id);
      if (modoAtual === "novas") return !resposta && !base.has(q.id);
      if (modoAtual === "erros") return resposta ? !resposta.correta : false;
      if (modoAtual === "revisao") {
        if (!resposta) return true;
        const intervalo = resposta.correta ? 7 : 1;
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
    void Promise.resolve().then(() => {
      if (!ativo) return;
      const locais = lerRespostas();
      const preferencias = (() => { try { return JSON.parse(window.localStorage.getItem(CHAVE_FILTROS) ?? "{}"); } catch { return {}; } })() as { filtro?: string; modo?: ModoFila };
      const filtroInicial = preferencias.filtro && disciplinas.some((d) => d.id === preferencias.filtro) ? preferencias.filtro : "todas";
      const modoInicial: ModoFila = preferencias.modo === "erros" || preferencias.modo === "revisao" || preferencias.modo === "todas" ? preferencias.modo : "novas";
      setFiltro(filtroInicial);
      setModoFila(modoInicial);
      setHistorico(locais);
      const base = new Set(locais.map((r) => r.questaoId));
      setRespondidasBase(base);
      montarFila(filtroInicial, false, base, locais, modoInicial);
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
      setRespondidasBase(base);
      setHistorico(historicoAtual);
      montarFila(filtro, mostrarRespondidas, base, historicoAtual, modoFila);
    });
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questao = fila[0];

  const responder = (letra: string) => {
    if (escolha || !questao) return;
    const acertou = !!questao.alternativas.find((a) => a.letra === letra)?.correta;
    setEscolha(letra);
    setRespondidas((r) => r + 1);
    if (acertou) setAcertos((a) => a + 1);
    // Alimenta o progresso do dashboard (persistido no navegador).
    registrarResposta(questao, acertou);
    setRespondidasBase((base) => new Set(base).add(questao.id));
    setHistorico(lerRespostas());
  };

  const proxima = () => {
    setEscolha(null);
    setFila((f) => f.slice(1));
  };

  const reset = (novoFiltro: string) => {
    setFiltro(novoFiltro);
    setDisciplinasAbertas(novoFiltro !== "todas");
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro: novoFiltro, modo: modoFila }));
    montarFila(novoFiltro, false, respondidasBase, historico, modoFila);
  };

  const trocarModo = (novoModo: ModoFila) => {
    setModoFila(novoModo);
    setMostrarRespondidas(false);
    window.localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ filtro, modo: novoModo }));
    montarFila(filtro, false, respondidasBase, historico, novoModo);
  };

  const revisarRespondidas = () => {
    setMostrarRespondidas(true);
    montarFila(filtro, true, respondidasBase, historico, "todas");
  };

  const ocultas = totalNaSelecao - totalFila;

  if (!questao) {
    const tudoRespondido = totalNaSelecao > 0 && !mostrarRespondidas;
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
          <p className="text-text-muted">Nenhuma questão nesta seleção.</p>
        )}
      </div>
    );
  }

  const pct = respondidas ? Math.round((acertos / respondidas) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-5 flex items-center justify-between gap-4">
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
        <div className="text-right">
          <div className="text-2xl font-bold text-text">{pct}%</div>
          <div className="text-xs text-text-faint">
            {acertos}/{respondidas} certas
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-3 flex flex-wrap gap-2" aria-label="Fila de questões">
        <FiltroChip label="Novas" active={modoFila === "novas"} onClick={() => trocarModo("novas")} />
        <FiltroChip label="Erros" active={modoFila === "erros"} onClick={() => trocarModo("erros")} />
        <FiltroChip label="Revisão" active={modoFila === "revisao"} onClick={() => trocarModo("revisao")} />
        <FiltroChip label="Todas" active={modoFila === "todas"} onClick={() => trocarModo("todas")} />
      </div>
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
        A fila é salva neste dispositivo e sincronizada quando sua sessão estiver ativa.
      </p>

      {/* Card */}
      <div
        className="rounded-2xl border border-border bg-surface p-6"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-semibold text-text-muted">
            {respondidas + 1} / {totalFila}
          </span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">
            {questao.estilo}
          </span>
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-text-faint">
            {questao.dificuldade}
          </span>
        </div>

        <p className="text-[15.5px] leading-relaxed text-text">{questao.enunciado}</p>

        <div className="mt-5 space-y-2.5">
          {questao.alternativas.map((alt) => {
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
                className={cn(
                  "w-full rounded-xl border p-3.5 text-left transition-colors",
                  status === "idle" && "border-border bg-surface hover:border-accent hover:bg-accent-soft/40",
                  status === "correta" && "border-accent bg-accent-soft",
                  status === "errada" && "border-danger bg-danger-soft",
                  status === "neutra" && "border-border bg-surface opacity-70"
                )}
              >
                <div className="flex gap-3">
                  <span
                    className={cn(
                      "grid size-6 flex-none place-items-center rounded-md text-xs font-bold",
                      status === "correta" && "bg-accent text-accent-contrast",
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
                    <span className="text-sm text-text">{alt.texto}</span>
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
            >
              Próxima <ChevronRight className="size-4" />
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
