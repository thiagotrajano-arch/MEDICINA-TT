import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getContentRepository } from "@/infra/content";

export const metadata = { title: "Biblioteca · Codex Medicus" };

export default async function BibliotecaPage() {
  const repo = await getContentRepository();
  const [disciplinas, grupos] = await Promise.all([
    repo.getDisciplinas(),
    repo.getGrupos(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-text">Biblioteca</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">
        Toda a árvore de conhecimento — {disciplinas.length} disciplinas.
      </p>

      {grupos.map((grupo) => {
        const doGrupo = disciplinas.filter((d) => d.grupo === grupo);
        if (!doGrupo.length) return null;
        return (
          <section key={grupo} className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.13em] text-text-faint">
              {grupo}
            </h2>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {doGrupo.map((d) => {
                const nSub = d.temas.reduce((a, t) => a + t.subtemas.length, 0);
                return (
                  <Link
                    key={d.id}
                    href={`/biblioteca/${d.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-all hover:border-border-strong"
                  >
                    <span className="grid size-9 flex-none place-items-center rounded-lg bg-surface-2 text-[10px] font-bold text-text-muted group-hover:text-accent">
                      {d.marca}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 truncate font-medium text-text">
                        {d.nome}
                        {d.omed && <Sparkles className="size-3 flex-none text-gold" />}
                      </div>
                      <div className="text-xs text-text-faint">
                        {d.temas.length} temas · {nSub} subtemas
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
