"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Timer, Play, Check, X, ChevronRight, ChevronLeft, Flag,
  RotateCcw, Trophy, AlertTriangle, ListChecks,
} from "lucide-react";
import type { Disciplina, Questao } from "@/domain/content/types";
import { embaralhar, registrarResposta, registrarSimulado } from "@/lib/progresso";
import { cn } from "@/lib/cn";

type Fase = "config" | "prova" | "resultado";

/** Minutos por questão — referência das provas de residência/OMED. */
const MIN_POR_QUESTAO = 2;

export function SimuladoClient({
  questoes,
  disciplinas,
}: {
  questoes: Questao[];
  disciplinas: Disciplina[];
}) {
  const [fase, setFase] = useState<Fase>("config");
  const [qtd, setQtd] = useState(10);
  const [discSel, setDiscSel] = useState<string[]>([]);
  const [prova, setProva] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [marcadas, setMarcadas] = useState<Set<string>>(new Set());
  const [idx, setIdx] = useState(0);
  const [restante, setRestante] = useState(0);
  const iniciadoEm = useRef(0);

  const disciplinasComQ = useMemo(() => {
    const ids = new Set(questoes.map((q) => q.disciplinaId));
    return disciplinas.filter((d) => ids.has(d.id));
  }, [questoes, disciplinas]);

  const disponiveis = useMemo(
    () => (discSel.length ? questoes.filter((q) => discSel.includes(q.disciplinaId)) : questoes),
    [questoes, discSel]
  );

  const finalizar = useCallback(() => {
    setFase((f) => (f === "prova" ? "resultado" : f));
  }, []);

  // Cronômetro
  useEffect(() => {
    if (fase !== "prova") return;
    const t = setInterval(() => {
      setRestante((s) => {
        if (s <= 1) {
          clearInterval(t);
          finalizar();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [fase, finalizar]);

  const iniciar = () => {
    const selecionadas = embaralhar(disponiveis).slice(0, Math.min(qtd, disponiveis.length));
    if (!selecionadas.length) return;
    setProva(selecionadas);
    setRespostas({});
    setMarcadas(new Set());
    setIdx(0);
    setRestante(selecionadas.length * MIN_POR_QUESTAO * 60);
    iniciadoEm.current = Date.now();
    setFase("prova");
  };

  // Grava o resultado uma única vez, ao entrar na fase de resultado.
  const gravado = useRef(false);
  useEffect(() => {
    if (fase !== "resultado" || gravado.current || !prova.length) return;
    gravado.current = true;

    const porDisciplina: Record<string, { acertos: number; total: number }> = {};
    let acertos = 0;
    for (const q of prova) {
      const escolha = respostas[q.id];
      const certa = q.alternativas.find((a) => a.correta)?.letra;
      const acertou = escolha != null && escolha === certa;
      if (acertou) acertos++;
      const d = (porDisciplina[q.disciplinaId] ??= { acertos: 0, total: 0 });
      d.total++;
      if (acertou) d.acertos++;
      // Só contabiliza no histórico geral o que foi de fato respondido.
      if (escolha != null) registrarResposta(q, acertou);
    }
    registrarSimulado({
      em: Date.now(),
      acertos,
      total: prova.length,
      duracaoSeg: Math.round((Date.now() - iniciadoEm.current) / 1000),
      porDisciplina,
    });
  }, [fase, prova, respostas]);

  const reiniciar = () => {
    gravado.current = false;
    setFase("config");
  };

  if (fase === "config") {
    return (
      <Config
        qtd={qtd} setQtd={setQtd}
        discSel={discSel} setDiscSel={setDiscSel}
        disciplinas={disciplinasComQ}
        disponiveis={disponiveis.length}
        onIniciar={iniciar}
      />
    );
  }

  if (fase === "resultado") {
    return <Resultado prova={prova} respostas={respostas} disciplinas={disciplinas} onReiniciar={reiniciar} />;
  }

  const q = prova[idx];
  const respondidas = Object.keys(respostas).length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
      {/* Barra fixa: cronômetro e progresso */}
      <div className="sticky top-14 z-20 -mx-5 mb-5 border-b border-border bg-bg/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Timer className={cn("size-4", restante < 60 ? "text-danger" : "text-accent")} />
            <span className={cn("font-mono text-lg font-bold tabular-nums", restante < 60 ? "text-danger" : "text-text")}>
              {String(Math.floor(restante / 60)).padStart(2, "0")}:{String(restante % 60).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-text-faint">{respondidas}/{prova.length} respondidas</span>
          <button
            onClick={finalizar}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-danger hover:text-danger"
          >
            Finalizar
          </button>
        </div>
        {/* navegador de questões */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {prova.map((pq, i) => (
            <button
              key={pq.id}
              onClick={() => setIdx(i)}
              aria-label={`Ir para questão ${i + 1}`}
              className={cn(
                "size-6 rounded text-[10px] font-bold transition-colors",
                i === idx && "ring-2 ring-accent ring-offset-1 ring-offset-bg",
                marcadas.has(pq.id)
                  ? "bg-gold/25 text-gold"
                  : respostas[pq.id]
                    ? "bg-accent text-accent-contrast"
                    : "bg-surface-2 text-text-faint"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Questão */}
      <div className="rounded-2xl border border-border bg-surface p-6" style={{ boxShadow: "var(--shadow)" }}>
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-text-muted">
            {idx + 1} / {prova.length}
          </span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">{q.estilo}</span>
          <button
            onClick={() =>
              setMarcadas((m) => {
                const n = new Set(m);
                n.has(q.id) ? n.delete(q.id) : n.add(q.id);
                return n;
              })
            }
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold",
              marcadas.has(q.id)
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-text-faint hover:text-text"
            )}
          >
            <Flag className="size-3" /> {marcadas.has(q.id) ? "Marcada" : "Marcar"}
          </button>
        </div>

        <p className="text-[15.5px] leading-relaxed text-text">{q.enunciado}</p>

        <div className="mt-5 space-y-2.5">
          {q.alternativas.map((alt) => {
            const sel = respostas[q.id] === alt.letra;
            return (
              <button
                key={alt.letra}
                onClick={() => setRespostas((r) => ({ ...r, [q.id]: alt.letra }))}
                className={cn(
                  "w-full rounded-xl border p-3.5 text-left transition-colors",
                  sel ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-accent"
                )}
              >
                <div className="flex gap-3">
                  <span className={cn(
                    "grid size-6 flex-none place-items-center rounded-md text-xs font-bold",
                    sel ? "bg-accent text-accent-contrast" : "bg-surface-2 text-text-muted"
                  )}>
                    {alt.letra}
                  </span>
                  <span className="text-sm text-text">{alt.texto}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sem gabarito durante a prova — é simulado, não treino */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text disabled:opacity-40"
          >
            <ChevronLeft className="size-4" /> Anterior
          </button>
          {idx === prova.length - 1 ? (
            <button onClick={finalizar} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90">
              Finalizar prova
            </button>
          ) : (
            <button
              onClick={() => setIdx((i) => Math.min(prova.length - 1, i + 1))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
            >
              Próxima <ChevronRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Configuração ────────────────────────────────────────────────
function Config({
  qtd, setQtd, discSel, setDiscSel, disciplinas, disponiveis, onIniciar,
}: {
  qtd: number; setQtd: (n: number) => void;
  discSel: string[]; setDiscSel: (d: string[]) => void;
  disciplinas: Disciplina[]; disponiveis: number; onIniciar: () => void;
}) {
  const opcoes = [5, 10, 20, 40].filter((n) => n <= Math.max(disponiveis, 5));
  const real = Math.min(qtd, disponiveis);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text">
          <Timer className="size-6 text-accent" /> Modo Simulado
        </h1>
        <p className="mt-1.5 text-[15px] text-text-muted">
          Prova cronometrada, questões embaralhadas e sem gabarito até o fim — como na prova real.
          Correção e análise por disciplina ao finalizar.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-surface p-6" style={{ boxShadow: "var(--shadow)" }}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-text">Disciplinas</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDiscSel([])}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium",
                !discSel.length ? "border-accent bg-accent-soft text-accent" : "border-border text-text-muted"
              )}
            >
              Todas
            </button>
            {disciplinas.map((d) => {
              const on = discSel.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => setDiscSel(on ? discSel.filter((x) => x !== d.id) : [...discSel, d.id])}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium",
                    on ? "border-accent bg-accent-soft text-accent" : "border-border text-text-muted hover:border-border-strong"
                  )}
                >
                  {d.nome}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-text">Número de questões</label>
          <div className="flex flex-wrap gap-2">
            {opcoes.map((n) => (
              <button
                key={n}
                onClick={() => setQtd(n)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-semibold",
                  qtd === n ? "border-accent bg-accent-soft text-accent" : "border-border text-text-muted hover:border-border-strong"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-surface-2 p-4 text-sm">
          <div className="flex justify-between"><span className="text-text-muted">Questões disponíveis</span><span className="font-semibold text-text">{disponiveis}</span></div>
          <div className="mt-1 flex justify-between"><span className="text-text-muted">Sua prova</span><span className="font-semibold text-text">{real} questões</span></div>
          <div className="mt-1 flex justify-between"><span className="text-text-muted">Tempo</span><span className="font-semibold text-text">{real * MIN_POR_QUESTAO} min ({MIN_POR_QUESTAO} min/questão)</span></div>
        </div>

        {disponiveis === 0 ? (
          <p className="flex items-center gap-2 text-sm text-danger">
            <AlertTriangle className="size-4" /> Nenhuma questão nesta seleção.
          </p>
        ) : (
          <button
            onClick={onIniciar}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-contrast hover:opacity-90"
          >
            <Play className="size-4" /> Iniciar simulado
          </button>
        )}
      </div>
    </div>
  );
}

// ── Resultado ───────────────────────────────────────────────────
function Resultado({
  prova, respostas, disciplinas, onReiniciar,
}: {
  prova: Questao[]; respostas: Record<string, string>;
  disciplinas: Disciplina[]; onReiniciar: () => void;
}) {
  const nomeDisc = (id: string) => disciplinas.find((d) => d.id === id)?.nome ?? id;

  const detalhe = prova.map((q) => {
    const escolha = respostas[q.id];
    const certa = q.alternativas.find((a) => a.correta)!;
    return { q, escolha, certa, acertou: escolha === certa.letra, respondeu: escolha != null };
  });
  const acertos = detalhe.filter((d) => d.acertou).length;
  const pct = Math.round((acertos / prova.length) * 100);
  const emBranco = detalhe.filter((d) => !d.respondeu).length;

  const porDisc: Record<string, { acertos: number; total: number }> = {};
  for (const d of detalhe) {
    const e = (porDisc[d.q.disciplinaId] ??= { acertos: 0, total: 0 });
    e.total++;
    if (d.acertou) e.acertos++;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      {/* Placar */}
      <div className="rounded-2xl border border-border bg-surface p-6 text-center" style={{ boxShadow: "var(--shadow)" }}>
        <Trophy className={cn("mx-auto size-8", pct >= 70 ? "text-gold" : "text-text-faint")} />
        <div className="mt-2 text-5xl font-bold tabular-nums text-text">{pct}%</div>
        <p className="mt-1 text-sm text-text-muted">
          {acertos} de {prova.length} corretas{emBranco > 0 && ` · ${emBranco} em branco`}
        </p>
      </div>

      {/* Por disciplina */}
      <h2 className="mb-3 mt-7 text-sm font-bold uppercase tracking-wider text-text-faint">Desempenho por disciplina</h2>
      <div className="space-y-2">
        {Object.entries(porDisc).map(([id, d]) => {
          const p = Math.round((d.acertos / d.total) * 100);
          return (
            <div key={id} className="rounded-xl border border-border bg-surface p-3.5">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-text">{nomeDisc(id)}</span>
                <span className="tabular-nums text-text-muted">{d.acertos}/{d.total} · {p}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={cn("h-full rounded-full", p >= 70 ? "bg-accent" : p >= 50 ? "bg-gold" : "bg-danger")}
                  style={{ width: `${p}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Correção detalhada */}
      <h2 className="mb-3 mt-7 text-sm font-bold uppercase tracking-wider text-text-faint">Correção comentada</h2>
      <div className="space-y-4">
        {detalhe.map(({ q, escolha, certa, acertou, respondeu }, i) => (
          <div key={q.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className={cn(
                "grid size-6 flex-none place-items-center rounded-md text-xs font-bold",
                acertou ? "bg-accent text-accent-contrast" : "bg-danger text-white"
              )}>
                {acertou ? <Check className="size-3.5" /> : <X className="size-3.5" />}
              </span>
              <span className="text-xs font-semibold text-text-faint">Questão {i + 1}</span>
              {!respondeu && <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-text-faint">em branco</span>}
            </div>
            <p className="text-sm leading-relaxed text-text">{q.enunciado}</p>
            <div className="mt-3 space-y-1.5">
              {q.alternativas.map((a) => {
                const suaEscolha = escolha === a.letra;
                return (
                  <div
                    key={a.letra}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-[13px]",
                      a.correta && "border-accent bg-accent-soft",
                      !a.correta && suaEscolha && "border-danger bg-danger-soft",
                      !a.correta && !suaEscolha && "border-border opacity-60"
                    )}
                  >
                    <div className="flex gap-2">
                      <span className="font-bold text-text">{a.letra}</span>
                      <div>
                        <span className="text-text">{a.texto}</span>
                        {suaEscolha && !a.correta && <span className="ml-1.5 text-[11px] font-bold text-danger">← sua resposta</span>}
                        {a.correta && <span className="ml-1.5 text-[11px] font-bold text-accent">✓ correta</span>}
                        <p className="mt-1 leading-snug text-text-muted">{a.comentario}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={onReiniciar} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast hover:opacity-90">
          <RotateCcw className="size-4" /> Novo simulado
        </button>
        <Link href="/questoes" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-text hover:border-border-strong">
          <ListChecks className="size-4" /> Treinar questões
        </Link>
      </div>
    </div>
  );
}
