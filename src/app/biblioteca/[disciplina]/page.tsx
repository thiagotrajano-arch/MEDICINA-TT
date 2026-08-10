import { cache, type ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles, FileText, Route, Target, CircleCheck, Clock3 } from "lucide-react";
import { getContentRepository } from "@/infra/content";

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const disciplinas = await repo.getDisciplinas();
  return disciplinas.map((d) => ({ disciplina: d.slug }));
}

const buscarDisciplina = cache(async (slug: string) => {
  const repo = await getContentRepository();
  return repo.getDisciplina(slug);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ disciplina: string }>;
}): Promise<Metadata> {
  const { disciplina: slug } = await params;
  const disciplina = await buscarDisciplina(slug);
  return disciplina ? { title: `${disciplina.nome} · Codex Medicus` } : {};
}

export default async function DisciplinaPage({
  params,
}: {
  params: Promise<{ disciplina: string }>;
}) {
  const { disciplina: slug } = await params;
  const disciplina = await buscarDisciplina(slug);
  if (!disciplina) notFound();

  const subtemas = disciplina.temas.flatMap((tema) => tema.subtemas);
  const prontos = subtemas.filter((subtema) => subtema.temConteudo).length;
  const prioritarios = subtemas.filter((subtema) => subtema.altoRendimento).length;
  const cobertura = subtemas.length ? Math.round((prontos / subtemas.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-text-faint">
        <Link href="/biblioteca" className="hover:text-text">Biblioteca</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-text-muted">{disciplina.grupo}</span>
      </nav>

      <header className="page-hero rounded-3xl border border-border p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex items-center gap-4">
            <span className="grid size-13 place-items-center rounded-2xl bg-brand text-sm font-black text-brand-contrast shadow-sm">
              {disciplina.marca}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{disciplina.grupo}</p>
              <h1 className="mt-1 flex items-center gap-2 text-3xl font-black tracking-tight text-text">
                {disciplina.nome}
                {disciplina.omed && <Sparkles className="size-4 text-gold" aria-label="Prioridade OMED" />}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">Siga a trilha por tema, consolide o resumo e teste o raciocínio antes de avançar.</p>
            </div>
          </div>
          <div className="min-w-36 rounded-2xl border border-white/70 bg-white/75 p-4 text-right shadow-sm dark:border-border dark:bg-surface/70">
            <p className="text-3xl font-black text-accent">{cobertura}%</p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-text-faint">cobertura atual</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Indicador icone={<Route className="size-4" />} valor={disciplina.temas.length} rotulo="temas" />
          <Indicador icone={<FileText className="size-4" />} valor={subtemas.length} rotulo="subtemas" />
          <Indicador icone={<CircleCheck className="size-4" />} valor={prontos} rotulo="com resumo" />
          <Indicador icone={<Target className="size-4" />} valor={prioritarios} rotulo="alto rendimento" />
        </div>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Método recomendado">
        <Passo numero="1" titulo="Entenda" texto="Leia o resumo e explique o mapa sem consultar." />
        <Passo numero="2" titulo="Recupere" texto="Responda questões antes de rever a resposta." />
        <Passo numero="3" titulo="Consolide" texto="Transforme apenas o erro útil em revisão ou Anki." />
      </section>

      <div className="mt-7 space-y-6">
        {disciplina.temas.map((tema, indiceTema) => {
          const prontosNoTema = tema.subtemas.filter((subtema) => subtema.temConteudo).length;
          return (
          <section key={tema.id} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-2/70 px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-brand text-xs font-black text-brand-contrast">{String(indiceTema + 1).padStart(2, "0")}</span>
                <div><h2 className="text-sm font-bold text-text">{tema.nome}</h2><p className="text-[11px] text-text-faint">{prontosNoTema}/{tema.subtemas.length} prontos</p></div>
              </div>
              {tema.subtemas.some((subtema) => subtema.altoRendimento) && <span className="inline-flex items-center gap-1 rounded-full bg-aqua-soft px-2.5 py-1 text-[10px] font-bold text-accent"><Target className="size-3" /> OMED</span>}
            </div>
            <div>
              {tema.subtemas.map((s, i) => (
                <Link
                  key={s.id}
                  href={`/estudar/${encodeURIComponent(s.id)}`}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <span className={`grid size-8 flex-none place-items-center rounded-lg ${s.temConteudo ? "bg-success-soft text-success" : "bg-surface-2 text-text-faint"}`}>
                    {s.temConteudo ? <CircleCheck className="size-4" /> : <Clock3 className="size-4" />}
                  </span>
                  <span className="flex-1 text-sm text-text">{s.nome}</span>
                  {s.altoRendimento && (
                    <Sparkles className="size-3 flex-none text-gold" />
                  )}
                  {s.temConteudo ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                      pronto
                    </span>
                  ) : (
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-text-faint">
                      a importar
                    </span>
                  )}
                  <ChevronRight className="size-4 flex-none text-text-faint" />
                </Link>
              ))}
            </div>
          </section>
        )})}
      </div>
    </div>
  );
}

function Indicador({ icone, valor, rotulo }: { icone: ReactNode; valor: number; rotulo: string }) {
  return <div className="rounded-xl border border-white/70 bg-white/75 p-3 dark:border-border dark:bg-surface/65"><div className="flex items-center gap-2 text-accent">{icone}<strong className="text-lg text-text">{valor}</strong></div><p className="mt-1 text-[11px] font-semibold text-text-faint">{rotulo}</p></div>;
}

function Passo({ numero, titulo, texto }: { numero: string; titulo: string; texto: string }) {
  return <article className="rounded-2xl border border-border bg-surface p-4"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-black text-accent">{numero}</span><h2 className="font-bold text-text">{titulo}</h2></div><p className="mt-2 text-sm leading-6 text-text-muted">{texto}</p></article>;
}
