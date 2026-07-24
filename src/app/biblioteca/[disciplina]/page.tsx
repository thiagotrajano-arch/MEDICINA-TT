import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles, FileText } from "lucide-react";
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

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-text-faint">
        <Link href="/biblioteca" className="hover:text-text">Biblioteca</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-text-muted">{disciplina.grupo}</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-sm font-bold text-accent">
          {disciplina.marca}
        </span>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text">
            {disciplina.nome}
            {disciplina.omed && <Sparkles className="size-4 text-gold" />}
          </h1>
          <p className="text-sm text-text-faint">
            {disciplina.temas.length} temas
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {disciplina.temas.map((tema) => (
          <section key={tema.id}>
            <h2 className="mb-2 text-sm font-semibold text-text">{tema.nome}</h2>
            <div className="overflow-hidden rounded-xl border border-border bg-surface">
              {tema.subtemas.map((s, i) => (
                <Link
                  key={s.id}
                  href={`/estudar/${encodeURIComponent(s.id)}`}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <FileText className="size-4 flex-none text-text-faint" />
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
        ))}
      </div>
    </div>
  );
}
