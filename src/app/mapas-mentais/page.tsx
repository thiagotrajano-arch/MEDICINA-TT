import Link from "next/link";
import { Network, Sparkles } from "lucide-react";
import { getContentRepository } from "@/infra/content";

export const metadata = { title: "Mapas mentais · Codex Medicus" };

export default async function MapasMentaisPage() {
  const repo = await getContentRepository();
  const disciplinas = await repo.getDisciplinas();
  const prontas = disciplinas
    .map((disciplina) => ({
      disciplina,
      subtemas: disciplina.temas.flatMap((tema) => tema.subtemas).filter((subtema) => subtema.temConteudo),
    }))
    .filter((item) => item.subtemas.length > 0)
    .sort((a, b) => Number(b.disciplina.omed) - Number(a.disciplina.omed));

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text"><Network className="size-6 text-accent" /> Mapas mentais</h1>
      <p className="mt-1.5 max-w-3xl text-[15px] text-text-muted">Uma visão conectada dos resumos publicados. Cada nó leva ao conteúdo fonte: o mapa organiza o estudo, mas não substitui a leitura clínica completa.</p>
      <div className="mt-7 space-y-4">
        {prontas.map(({ disciplina, subtemas }) => (
          <section key={disciplina.id} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-[10px] font-bold text-accent">{disciplina.marca}</span><h2 className="font-semibold text-text">{disciplina.nome}</h2>{disciplina.omed && <Sparkles className="size-3.5 text-gold" />}<span className="ml-auto text-xs text-text-faint">{subtemas.length} nós de estudo</span></div>
            <div className="mt-4 flex flex-wrap gap-2 border-l-2 border-accent-soft pl-4">
              {subtemas.map((subtema) => <Link key={subtema.id} href={`/estudar/${encodeURIComponent(subtema.id)}`} className="rounded-lg border border-border bg-bg px-3 py-2 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent">{subtema.altoRendimento && <Sparkles className="mr-1 inline size-3 text-gold" />}{subtema.nome}</Link>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
