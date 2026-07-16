"use client";

import { useMemo, useState } from "react";
import { Check, X, ChevronRight, RotateCcw, ListChecks } from "lucide-react";
import type { Disciplina, Questao } from "@/domain/content/types";
import { cn } from "@/lib/cn";

/**
 * Interactive quiz. Receives questions + disciplines as props from the server
 * page, so it is fully decoupled from where the data comes from (static/Supabase).
 */
export function QuizClient({
  questoes,
  disciplinas,
}: {
  questoes: Questao[];
  disciplinas: Disciplina[];
}) {
  const [filtro, setFiltro] = useState<string>("todas");

  const disciplinasComQ = useMemo(() => {
    const ids = new Set(questoes.map((q) => q.disciplinaId));
    return disciplinas.filter((d) => ids.has(d.id));
  }, [questoes, disciplinas]);

  const lista = useMemo(
    () => (filtro === "todas" ? questoes : questoes.filter((q) => q.disciplinaId === filtro)),
    [filtro, questoes]
  );

  const [idx, setIdx] = useState(0);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [respondidas, setRespondidas] = useState(0);

  const questao = lista[idx];

  const responder = (letra: string) => {
    if (escolha) return;
    setEscolha(letra);
    setRespondidas((r) => r + 1);
    if (questao.alternativas.find((a) => a.letra === letra)?.correta) {
      setAcertos((a) => a + 1);
    }
  };

  const proxima = () => {
    setEscolha(null);
    setIdx((i) => (i + 1) % lista.length);
  };

  const reset = (novoFiltro: string) => {
    setFiltro(novoFiltro);
    setIdx(0);
    setEscolha(null);
    setAcertos(0);
    setRespondidas(0);
  };

  if (!questao) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-text-muted">Nenhuma questão nesta seleção.</p>
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
            {lista.length} questões · estilo OMED / residência
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
      <div className="mb-6 flex flex-wrap gap-2">
        <FiltroChip label="Todas" active={filtro === "todas"} onClick={() => reset("todas")} />
        {disciplinasComQ.map((d) => (
          <FiltroChip
            key={d.id}
            label={d.nome}
            active={filtro === d.id}
            onClick={() => reset(d.id)}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="rounded-2xl border border-border bg-surface p-6"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-semibold text-text-muted">
            {idx + 1} / {lista.length}
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
