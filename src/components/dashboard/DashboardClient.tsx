"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame, Target, ListChecks, TrendingUp, Sparkles, ArrowRight,
  Timer, BookOpen, RotateCcw,
} from "lucide-react";
import type { Disciplina } from "@/domain/content/types";
import {
  calcularEstatisticas, lerRespostas, lerSimulados, limparProgresso, sincronizarProgresso,
  type Estatisticas, type ResultadoSimulado,
} from "@/lib/progresso";

interface Props {
  disciplinas: Disciplina[];
  totalQuestoes: number;
  totalResumos: number;
  altoRendimento: { id: string; nome: string; marca: string; temConteudo: boolean }[];
}

export function DashboardClient({ disciplinas, totalQuestoes, totalResumos, altoRendimento }: Props) {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [simulados, setSimulados] = useState<ResultadoSimulado[]>([]);
  const [sincronizado, setSincronizado] = useState<boolean | null>(null);

  useEffect(() => {
    let ativo = true;
    void Promise.resolve().then(() => {
      if (!ativo) return;
      setStats(calcularEstatisticas(lerRespostas()));
      setSimulados(lerSimulados());
    });
    void sincronizarProgresso().then((progresso) => {
      if (!ativo) return;
      setStats(calcularEstatisticas(progresso.respostas));
      setSimulados(progresso.simulados);
      setSincronizado(progresso.sincronizado);
    });
    return () => { ativo = false; };
  }, []);

  const nomeDisc = (id: string) => disciplinas.find((d) => d.id === id)?.nome ?? id;
  const temProgresso = (stats?.respondidas ?? 0) > 0;

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      {/* Hero */}
      <div className="mb-7">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
          <Sparkles className="size-3 text-gold" /> Foco atual: OMED VI · Ciclo Clínico
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">Bom estudo, Thiago.</h1>
        <p className="mt-1.5 max-w-2xl text-[15px] text-text-muted">
          {temProgresso
            ? "Seu progresso abaixo. Continue de onde parou ou faça um simulado cronometrado."
            : "Responda questões ou faça um simulado — seu progresso aparece aqui automaticamente."}
        </p>
        {sincronizado !== null && (
          <p className="mt-1 text-xs text-text-faint">
            {sincronizado ? "Progresso sincronizado com segurança." : "Progresso salvo neste dispositivo; sincronização será tentada novamente."}
          </p>
        )}
      </div>

      {/* Stat tiles — os números-síntese */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile
          icon={ListChecks} label="Respondidas"
          valor={stats ? String(stats.respondidas) : "—"}
          hint={`${totalQuestoes} no banco`}
        />
        <Tile
          icon={Target} label="Acerto"
          valor={stats && stats.respondidas ? `${stats.percentual}%` : "—"}
          hint={stats && stats.respondidas ? `${stats.acertos} certas · ${stats.erros} erradas` : "sem dados ainda"}
          destaque={stats && stats.respondidas ? corPct(stats.percentual) : undefined}
        />
        <Tile
          icon={Flame} label="Sequência"
          valor={stats ? `${stats.sequencia}d` : "—"}
          hint={stats?.sequencia ? "dias seguidos estudando" : "comece hoje"}
          destaque={stats && stats.sequencia >= 3 ? "var(--gold)" : undefined}
        />
        <Tile
          icon={Timer} label="Simulados"
          valor={String(simulados.length)}
          hint={simulados.length ? `último: ${Math.round((simulados.at(-1)!.acertos / simulados.at(-1)!.total) * 100)}%` : "nenhum ainda"}
        />
      </div>

      {/* Atividade — uma série, uma cor, sem legenda */}
      {stats && (
        <section className="mt-7 rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
          <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-text">
            <TrendingUp className="size-4 text-accent" /> Atividade dos últimos 14 dias
          </h2>
          <p className="mb-4 text-xs text-text-faint">Questões respondidas por dia</p>
          <Atividade dias={stats.ultimos14Dias} />
        </section>
      )}

      {/* Desempenho por disciplina */}
      {temProgresso && stats && (
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-faint">Desempenho por disciplina</h2>
          <div className="space-y-2">
            {Object.entries(stats.porDisciplina)
              .sort((a, b) => b[1].total - a[1].total)
              .map(([id, d]) => (
                <div key={id} className="rounded-xl border border-border bg-surface p-3.5">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-text">{nomeDisc(id)}</span>
                    <span className="tabular-nums text-text-muted">{d.acertos}/{d.total} · {d.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: corPct(d.pct) }} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Ações rápidas */}
      <section className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link
          href="/simulado"
          className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <span className="grid size-10 flex-none place-items-center rounded-lg bg-accent-soft"><Timer className="size-5 text-accent" /></span>
          <div className="min-w-0">
            <div className="font-semibold text-text">Fazer um simulado</div>
            <div className="text-xs text-text-faint">Cronometrado, com correção comentada</div>
          </div>
          <ArrowRight className="ml-auto size-4 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
        </Link>
        <Link
          href="/questoes"
          className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <span className="grid size-10 flex-none place-items-center rounded-lg bg-accent-soft"><ListChecks className="size-5 text-accent" /></span>
          <div className="min-w-0">
            <div className="font-semibold text-text">Treinar questões</div>
            <div className="text-xs text-text-faint">Gabarito na hora, comentado</div>
          </div>
          <ArrowRight className="ml-auto size-4 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
        </Link>
      </section>

      {/* Alto rendimento */}
      <section className="mt-7">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-faint">
          <Sparkles className="size-4 text-gold" /> Alto rendimento · {totalResumos} resumos prontos
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {altoRendimento.map((s) => (
            <Link
              key={s.id}
              href={`/estudar/${encodeURIComponent(s.id)}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-2"
            >
              <span className="text-[10px] font-bold text-text-faint">{s.marca}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-text">{s.nome}</span>
              {s.temConteudo ? (
                <span className="flex-none rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                  <BookOpen className="mr-0.5 inline size-2.5" /> pronto
                </span>
              ) : (
                <span className="flex-none rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-text-faint">a importar</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {temProgresso && (
        <button
          onClick={async () => {
            if (confirm("Apagar todo o seu progresso salvo neste dispositivo e na nuvem? Não dá para desfazer.")) {
              await limparProgresso();
              setStats(calcularEstatisticas([]));
              setSimulados([]);
            }
          }}
          className="mt-8 inline-flex items-center gap-1.5 text-xs text-text-faint hover:text-danger"
        >
          <RotateCcw className="size-3" /> Zerar progresso
        </button>
      )}
    </div>
  );
}

/** Verde = bom, dourado = atenção, vermelho = crítico. Cores de status,
 *  nunca reaproveitadas como identidade de série. */
function corPct(pct: number): string {
  if (pct >= 70) return "var(--accent)";
  if (pct >= 50) return "var(--gold)";
  return "var(--danger)";
}

function Tile({
  icon: Icon, label, valor, hint, destaque,
}: {
  icon: React.ElementType; label: string; valor: string; hint: string; destaque?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4" style={{ boxShadow: "var(--shadow)" }}>
      <Icon className="size-4" style={{ color: destaque ?? "var(--accent)" }} />
      <div className="mt-3 text-2xl font-bold tabular-nums" style={{ color: destaque ?? "var(--text)" }}>
        {valor}
      </div>
      <div className="text-sm font-medium text-text">{label}</div>
      <div className="text-xs text-text-faint">{hint}</div>
    </div>
  );
}

/** Barras de atividade: série única → uma cor, sem legenda.
 *  Marcas finas, topo arredondado, ancoradas na base, grade recessiva. */
function Atividade({ dias }: { dias: { dia: string; total: number; acertos: number }[] }) {
  const max = Math.max(1, ...dias.map((d) => d.total));
  const rotulo = (iso: string) => {
    const [, m, d] = iso.split("-");
    return `${d}/${m}`;
  };
  return (
    <div>
      <div className="flex h-28 items-end gap-1.5">
        {dias.map((d) => (
          <div key={d.dia} className="group relative flex flex-1 flex-col items-center justify-end">
            {/* tooltip */}
            <div className="pointer-events-none absolute bottom-full z-10 mb-1.5 hidden whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[11px] shadow-lg group-hover:block">
              <span className="font-semibold text-text">{rotulo(d.dia)}</span>
              <span className="ml-1.5 text-text-muted">{d.total ? `${d.total} questões · ${d.acertos} certas` : "sem estudo"}</span>
            </div>
            <div
              className="w-full rounded-t bg-accent transition-all"
              style={{
                height: d.total ? `${Math.max(6, (d.total / max) * 100)}%` : "3px",
                opacity: d.total ? 1 : 0.18,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-text-faint">
        <span>{rotulo(dias[0].dia)}</span>
        <span>hoje</span>
      </div>
    </div>
  );
}
