import Link from "next/link";
import { GitFork, Network, Sparkles } from "lucide-react";
import { CONTEUDOS } from "@/content/conteudos";
import { getContentRepository } from "@/infra/content";

export const metadata = { title: "Mapas mentais · Codex Medicus" };

const ORDEM_OMED = [
  "inf", "cardio", "neuro", "pneumo", "go", "ped", "cir", "mfc",
  "nefro", "gastro", "endo", "hemato", "onco", "reumato", "derma", "otorrino",
];

export default async function MapasMentaisPage() {
  const repo = await getContentRepository();
  const disciplinas = await repo.getDisciplinas();
  const mapas = disciplinas
    .flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas.map((subtema) => ({ disciplina, tema, subtema }))))
    .filter(({ subtema }) => subtema.temConteudo && CONTEUDOS[subtema.id])
    .sort((a, b) => {
      const alto = Number(Boolean(b.subtema.altoRendimento)) - Number(Boolean(a.subtema.altoRendimento));
      if (alto) return alto;
      const prioridadeA = ORDEM_OMED.indexOf(a.disciplina.id);
      const prioridadeB = ORDEM_OMED.indexOf(b.disciplina.id);
      const rankA = prioridadeA === -1 ? 99 : prioridadeA;
      const rankB = prioridadeB === -1 ? 99 : prioridadeB;
      return rankA - rankB || a.subtema.nome.localeCompare(b.subtema.nome, "pt-BR");
    })
    .slice(0, 60)
    .map(({ disciplina, tema, subtema }, index) => ({
      index: index + 1,
      disciplina,
      tema,
      subtema,
      blocos: CONTEUDOS[subtema.id].blocos.map((bloco) => bloco.secao).filter(Boolean).slice(0, 6),
    }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text"><Network className="size-6 text-accent" /> Mapas mentais</h1>
      <p className="mt-1.5 max-w-3xl text-[15px] text-text-muted">Sessenta mapas individuais derivados dos resumos já publicados e ordenados pela prioridade OMED. Cada ramo leva à seção de estudo correspondente; o mapa organiza a revisão, não substitui a leitura clínica completa.</p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-text-muted">
        <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent">60 mapas</span>
        <span>Prioridade: Infectologia → Cardiologia → Neurologia → Pneumologia → Materno-Infantil → Cirurgia → MFC.</span>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {mapas.map(({ index, disciplina, tema, subtema, blocos }) => (
          <section key={subtema.id} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-xs font-bold text-accent">{String(index).padStart(2, "0")}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-text-faint"><span>{disciplina.nome}</span><span>·</span><span>{tema.nome}</span>{subtema.altoRendimento && <Sparkles className="size-3.5 text-gold" aria-label="Alto rendimento" />}</div>
                <h2 className="mt-1 font-semibold text-text">{subtema.nome}</h2>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1.35fr)] items-center gap-1">
              <Link href={`/estudar/${encodeURIComponent(subtema.id)}`} className="rounded-xl border border-accent bg-accent-soft px-3 py-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white">
                {subtema.nome}
              </Link>
              <GitFork className="mx-auto size-4 text-accent" aria-hidden="true" />
              <ul className="space-y-1.5 border-l-2 border-accent-soft pl-3 text-sm text-text-muted">
                {blocos.map((bloco) => <li key={bloco} className="rounded-lg bg-bg px-2.5 py-1.5">{bloco}</li>)}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
