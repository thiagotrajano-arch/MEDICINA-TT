"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame, Target, ListChecks, TrendingUp, Sparkles, ArrowRight,
  Timer, BookOpen, RotateCcw, BookMarked, StickyNote, Stethoscope,
} from "lucide-react";
import type { Disciplina } from "@/domain/content/types";
import {
  calcularEstatisticas, lerRespostas, lerSimulados, limparProgresso, sincronizarProgresso,
  type Estatisticas, type ResultadoSimulado,
} from "@/lib/progresso";
import {
  lerProgressoConteudos,
  limparProgressoConteudos,
  sincronizarProgressoConteudos,
  type ProgressoConteudo,
} from "@/lib/progresso-conteudo";
import { AnkiProgressImport } from "@/components/dashboard/AnkiProgressImport";
import { SemanaAtualPanel } from "@/components/semana/SemanaAtualPanel";

interface Props {
  disciplinas: Disciplina[];
  totalQuestoes: number;
  totalResumos: number;
  totalCasos: number;
  altoRendimento: { id: string; nome: string; marca: string; temConteudo: boolean }[];
}

export function DashboardClient({ disciplinas, totalQuestoes, totalResumos, totalCasos, altoRendimento }: Props) {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [simulados, setSimulados] = useState<ResultadoSimulado[]>([]);
  const [conteudos, setConteudos] = useState<ProgressoConteudo[]>([]);
  const [sincronizado, setSincronizado] = useState<boolean | null>(null);

  useEffect(() => {
    let ativo = true;
    const sincronizar = () => {
      void Promise.all([sincronizarProgresso(), sincronizarProgressoConteudos()]).then(([progresso, leitura]) => {
        if (!ativo) return;
        setStats(calcularEstatisticas(progresso.respostas));
        setSimulados(progresso.simulados);
        setConteudos(leitura.conteudos);
        setSincronizado(progresso.sincronizado && leitura.sincronizado);
      });
    };
    void Promise.resolve().then(() => {
      if (!ativo) return;
      setStats(calcularEstatisticas(lerRespostas()));
      setSimulados(lerSimulados());
      setConteudos(lerProgressoConteudos());
    });
    sincronizar();
    window.addEventListener("online", sincronizar);
    document.addEventListener("visibilitychange", sincronizar);
    return () => {
      ativo = false;
      window.removeEventListener("online", sincronizar);
      document.removeEventListener("visibilitychange", sincronizar);
    };
  }, []);

  const nomeDisc = (id: string) => disciplinas.find((d) => d.id === id)?.nome ?? id;
  const temProgresso = (stats?.respondidas ?? 0) > 0 || conteudos.length > 0;
  const resumosConcluidos = conteudos.filter((item) => item.tipo === "resumo" && item.concluido).length;
  const casosConcluidos = conteudos.filter((item) => item.tipo === "caso" && item.concluido).length;
  const favoritos = conteudos.filter((item) => item.favorito).length;
  const anotacoes = conteudos.filter((item) => item.anotacao.trim()).length;

  return (
    <div className="dashboard-page mx-auto max-w-[1180px] px-5 py-7 sm:px-8 sm:py-10">
      <section className="dashboard-hero overflow-hidden rounded-[2rem] border border-border p-6 sm:p-8 lg:p-10" aria-labelledby="titulo-hoje">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.72fr)] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.13em] text-text-muted">
              <Sparkles className="size-3 text-gold" /> Hoje · OMED VI
            </div>
            <h1 id="titulo-hoje" className="max-w-2xl text-3xl font-bold tracking-[-0.035em] text-text sm:text-4xl lg:text-[2.7rem] lg:leading-[1.08]">
              Seu estudo, em uma direção clara.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-text-muted sm:text-base">
              {temProgresso
                ? "Retome o treino, revise seus pontos fracos e use a agenda para decidir o próximo bloco."
                : "Comece por uma prioridade OMED; o site organiza seu progresso conforme você estuda."}
            </p>
            {sincronizado !== null && (
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-text-faint">
                <span className={sincronizado ? "size-2 rounded-full bg-accent" : "size-2 rounded-full bg-gold"} />
                {sincronizado ? "Progresso sincronizado com segurança" : "Salvo neste dispositivo; nova sincronização será tentada"}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="/questoes" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast shadow-sm transition-colors hover:bg-[var(--accent-hover)]">
                Continuar questões <ArrowRight className="size-4" />
              </Link>
              <Link href="/agenda" className="inline-flex min-h-11 items-center rounded-xl border border-border-strong bg-surface px-5 py-2.5 text-sm font-bold text-text-muted transition-colors hover:border-accent hover:text-accent">
                Planejar meu dia
              </Link>
              <Link href="/v2" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-accent/35 bg-accent-soft/50 px-5 py-2.5 text-sm font-bold text-accent transition-colors hover:border-accent hover:bg-accent-soft">
                Abrir Painel V2 <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-brand p-5 text-brand-contrast sm:p-6" style={{ boxShadow: "var(--shadow-lg)" }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Seu ponto de partida</p>
              <h2 className="mt-3 text-xl font-bold leading-snug">
                {stats?.respondidas ? `${stats.respondidas} questões já respondidas` : "Comece pelo alto rendimento"}
              </h2>
              <p className="mt-2 text-sm leading-5 opacity-75">
                {stats?.respondidas
                  ? `${stats.percentual}% de acerto no histórico atual.`
                  : "Resumos, casos e questões ficam conectados ao mesmo progresso."}
              </p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/15 bg-black/10 p-3">
                <strong className="block text-xl tabular-nums">{totalResumos}</strong>
                <span className="text-[11px] opacity-70">resumos</span>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/10 p-3">
                <strong className="block text-xl tabular-nums">{totalCasos}</strong>
                <span className="text-[11px] opacity-70">casos clínicos</span>
              </div>
            </div>
            <Link href="/meu-curso" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold underline-offset-4 hover:underline">
              Abrir Meu curso <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SemanaAtualPanel disciplinas={disciplinas} compacto />

      <section className="mt-7" aria-labelledby="titulo-progresso">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Visão rápida</p>
            <h2 id="titulo-progresso" className="mt-1 text-lg font-bold text-text">Seu progresso</h2>
          </div>
          <Link href="/questoes" className="text-xs font-semibold text-text-faint hover:text-accent">Ver treino completo</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tile icon={ListChecks} label="Respondidas" valor={stats ? String(stats.respondidas) : "—"} hint={`${totalQuestoes} no banco`} />
          <Tile icon={Target} label="Acerto" valor={stats && stats.respondidas ? `${stats.percentual}%` : "—"} hint={stats && stats.respondidas ? `${stats.acertos} certas · ${stats.erros} erradas` : "sem dados ainda"} destaque={stats && stats.respondidas ? corPct(stats.percentual) : undefined} />
          <Tile icon={Flame} label="Sequência" valor={stats ? `${stats.sequencia}d` : "—"} hint={stats?.sequencia ? "dias seguidos estudando" : "comece hoje"} destaque={stats && stats.sequencia >= 3 ? "var(--gold)" : undefined} />
          <Tile icon={Timer} label="Simulados" valor={String(simulados.length)} hint={simulados.length ? `último: ${Math.round((simulados.at(-1)!.acertos / simulados.at(-1)!.total) * 100)}%` : "nenhum ainda"} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,.65fr)]" aria-label="Atividade e acervo pessoal">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
          <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-text">
            <TrendingUp className="size-4 text-accent" /> Atividade dos últimos 14 dias
          </h2>
          <p className="mb-4 text-xs text-text-faint">Questões respondidas por dia</p>
          {stats ? <Atividade dias={stats.ultimos14Dias} /> : <div className="h-28 animate-pulse rounded-xl bg-surface-2" aria-label="Carregando atividade" />}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-faint">Conhecimento pessoal</p>
          <h2 className="mt-1 text-sm font-bold text-text">Leitura e casos</h2>
          <div className="mt-4 divide-y divide-border">
            <ProgressLine icon={BookOpen} label="Resumos concluídos" valor={resumosConcluidos} hint={`${totalResumos} disponíveis`} />
            <ProgressLine icon={Stethoscope} label="Casos concluídos" valor={casosConcluidos} hint={`${totalCasos} disponíveis`} />
            <ProgressLine icon={BookMarked} label="Favoritos" valor={favoritos} hint="resumos e casos" />
            <ProgressLine icon={StickyNote} label="Anotações" valor={anotacoes} hint="salvas na conta" />
          </div>
        </div>
      </section>

      <AnkiProgressImport />

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
      <section className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        <Link
          href="/agenda"
          className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <span className="grid size-10 flex-none place-items-center rounded-lg bg-accent-soft"><BookMarked className="size-5 text-accent" /></span>
          <div className="min-w-0"><div className="font-semibold text-text">Organizar meu dia</div><div className="text-xs text-text-faint">Agenda, foco e pendências</div></div>
          <ArrowRight className="ml-auto size-4 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
        </Link>
        <Link
          href="/minha-midia"
          className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <span className="grid size-10 flex-none place-items-center rounded-lg bg-accent-soft"><Stethoscope className="size-5 text-accent" /></span>
          <div className="min-w-0"><div className="font-semibold text-text">Minha mídia</div><div className="text-xs text-text-faint">Imagens e referências privadas</div></div>
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
              await limparProgressoConteudos();
              setStats(calcularEstatisticas([]));
              setSimulados([]);
              setConteudos([]);
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

function ProgressLine({
  icon: Icon,
  label,
  valor,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  valor: number;
  hint: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold text-text">{label}</span>
        <span className="block truncate text-[10px] text-text-faint">{hint}</span>
      </span>
      <strong className="text-lg tabular-nums text-text">{valor}</strong>
    </div>
  );
}

function Tile({
  icon: Icon, label, valor, hint, destaque,
}: {
  icon: React.ElementType; label: string; valor: string; hint: string; destaque?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5" style={{ boxShadow: "var(--shadow)" }}>
      <span className="grid size-8 place-items-center rounded-lg bg-accent-soft">
        <Icon className="size-4" style={{ color: destaque ?? "var(--accent)" }} />
      </span>
      <div className="mt-4 text-2xl font-bold tabular-nums" style={{ color: destaque ?? "var(--text)" }}>
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
