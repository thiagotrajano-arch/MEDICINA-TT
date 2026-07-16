import Link from "next/link";
import { ArrowRight, BookOpenCheck, ListChecks, Layers, FileText, Sparkles, Target } from "lucide-react";
import { getContentRepository } from "@/infra/content";

export default async function DashboardPage() {
  const repo = await getContentRepository();
  const [stats, disciplinas] = await Promise.all([
    repo.getStats(),
    repo.getDisciplinas(),
  ]);
  const omed = disciplinas.filter((d) => d.omed);
  const altoRendimento = disciplinas
    .flatMap((d) => d.temas.flatMap((t) => t.subtemas.map((s) => ({ s, d }))))
    .filter(({ s }) => s.altoRendimento)
    .slice(0, 6);

  const cards = [
    { label: "Disciplinas", value: stats.disciplinas, icon: Layers, hint: `${stats.disciplinasOmed} no foco OMED` },
    { label: "Temas", value: stats.temas, icon: BookOpenCheck, hint: "árvore de conteúdo" },
    { label: "Subtemas", value: stats.subtemas, icon: FileText, hint: `${stats.subtemasComConteudo} com conteúdo` },
    { label: "Questões", value: stats.questoes, icon: ListChecks, hint: "banco inicial" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      {/* Hero */}
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
          <Sparkles className="size-3 text-gold" /> Foco atual: OMED VI · Ciclo Clínico
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Bom estudo, Thiago.
        </h1>
        <p className="mt-1.5 max-w-2xl text-[15px] text-text-muted">
          Seu banco definitivo de conhecimento médico. Comece pelas disciplinas de
          alto rendimento da prova ou vá direto ao banco de questões.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-surface p-4"
              style={{ boxShadow: "var(--shadow)" }}
            >
              <Icon className="size-4 text-accent" />
              <div className="mt-3 text-2xl font-bold text-text">{c.value}</div>
              <div className="text-sm font-medium text-text">{c.label}</div>
              <div className="text-xs text-text-faint">{c.hint}</div>
            </div>
          );
        })}
      </div>

      {/* OMED disciplines */}
      <div className="mt-9">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-faint">
            <Target className="size-4 text-gold" /> Disciplinas OMED
          </h2>
          <Link href="/biblioteca" className="text-sm font-medium text-accent hover:underline">
            Ver tudo
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {omed.map((d) => {
            const nSub = d.temas.reduce((a, t) => a + t.subtemas.length, 0);
            return (
              <Link
                key={d.id}
                href={`/biblioteca/${d.slug}`}
                className="group rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">
                    {d.marca}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-text">{d.nome}</div>
                    <div className="text-xs text-text-faint">
                      {d.temas.length} temas · {nSub} subtemas
                    </div>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* High yield */}
      <div className="mt-9">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-faint">
          <Sparkles className="size-4 text-gold" /> Alto rendimento
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {altoRendimento.map(({ s, d }) => (
            <Link
              key={s.id}
              href={`/estudar/${encodeURIComponent(s.id)}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-2"
            >
              <span className="text-[10px] font-bold text-text-faint">{d.marca}</span>
              <span className="text-sm text-text">{s.nome}</span>
              {s.temConteudo ? (
                <span className="ml-auto rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                  pronto
                </span>
              ) : (
                <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-text-faint">
                  a importar
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
