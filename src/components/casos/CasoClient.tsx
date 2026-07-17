"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft, Eye, Lightbulb, Stethoscope, FlaskConical, Activity,
  ClipboardList, HeartPulse, FileText, ScanLine, CheckCircle2, BookOpen,
} from "lucide-react";
import type { CasoClinico, TipoEtapa } from "@/domain/content/types";
import { MiniMarkdown } from "@/components/content/MiniMarkdown";
import { Figura } from "@/components/figuras/Figura";
import { cn } from "@/lib/cn";

const ICONE: Record<TipoEtapa, React.ElementType> = {
  historia: FileText,
  anamnese: ClipboardList,
  exame_fisico: Stethoscope,
  hipoteses: Lightbulb,
  laboratorio: FlaskConical,
  imagem: ScanLine,
  conduta: HeartPulse,
  evolucao: Activity,
  desfecho: CheckCircle2,
};

export function CasoClient({ caso }: { caso: CasoClinico }) {
  // Revela uma etapa por vez: o estudante não vê o caso inteiro de cara.
  const [reveladas, setReveladas] = useState(1);
  const [respostas, setRespostas] = useState<Set<number>>(new Set());
  const [verDiscussao, setVerDiscussao] = useState(false);

  const total = caso.etapas.length;
  const todasReveladas = reveladas >= total;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <Link href="/casos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-faint hover:text-text">
        <ChevronLeft className="size-4" /> Casos clínicos
      </Link>

      <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{caso.titulo}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">{caso.dificuldade}</span>
        {caso.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-text-muted">{t}</span>
        ))}
      </div>

      {/* progresso do caso */}
      <div className="mt-5 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(reveladas / total) * 100}%` }} />
        </div>
        <span className="text-xs tabular-nums text-text-faint">{Math.min(reveladas, total)}/{total}</span>
      </div>

      {/* etapas */}
      <div className="mt-6 space-y-4">
        {caso.etapas.slice(0, reveladas).map((etapa, i) => {
          const Icon = ICONE[etapa.tipo];
          const respondida = respostas.has(i);
          return (
            <section key={i} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
              <h2 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-accent">
                <Icon className="size-4" /> {etapa.titulo}
              </h2>

              <MiniMarkdown text={etapa.corpo} />
              {etapa.figura && <Figura id={etapa.figura} />}

              {etapa.pergunta && (
                <div className="mt-4 rounded-xl border border-gold/40 bg-gold/[0.07] p-4">
                  <p className="flex gap-2 text-sm font-semibold text-text">
                    <Lightbulb className="mt-0.5 size-4 flex-none text-gold" />
                    {etapa.pergunta}
                  </p>

                  {!respondida ? (
                    <button
                      onClick={() => setRespostas((r) => new Set(r).add(i))}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-xs font-bold text-[#1a1207] hover:opacity-90"
                    >
                      <Eye className="size-3.5" /> Pense primeiro, depois revele
                    </button>
                  ) : (
                    <div className="mt-3 border-t border-gold/25 pt-3">
                      <MiniMarkdown text={etapa.resposta ?? ""} />
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* avançar */}
      {!todasReveladas && (
        <button
          onClick={() => setReveladas((r) => r + 1)}
          className="mt-5 w-full rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-contrast hover:opacity-90"
        >
          Próxima etapa →
        </button>
      )}

      {/* discussão */}
      {todasReveladas && (
        <div className="mt-6">
          {!verDiscussao ? (
            <button
              onClick={() => setVerDiscussao(true)}
              className="w-full rounded-xl border border-border bg-surface px-5 py-3 text-sm font-bold text-text hover:border-accent"
            >
              Ver discussão do caso
            </button>
          ) : (
            <>
              <section className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5">
                <h2 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-accent">
                  <BookOpen className="size-4" /> Discussão
                </h2>
                <MiniMarkdown text={caso.discussao} />
              </section>

              <section className="mt-4 rounded-2xl border border-border bg-surface-2 p-5">
                <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wider text-text-faint">Referências</h2>
                <ul className="space-y-1 text-sm text-text-muted">
                  {caso.referencias.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </section>

              {caso.subtemaId && (
                <Link
                  href={`/estudar/${encodeURIComponent(caso.subtemaId)}`}
                  className={cn(
                    "mt-4 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3",
                    "text-sm font-semibold text-text hover:border-accent"
                  )}
                >
                  <BookOpen className="size-4 text-accent" /> Estudar o resumo deste tema
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
