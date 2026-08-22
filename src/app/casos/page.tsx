import Link from "next/link";
import { Stethoscope, ArrowRight, Layers } from "lucide-react";
import { getContentRepository } from "@/infra/content";

export const metadata = { title: "Casos clínicos · Codex Medicus" };

export default async function CasosPage() {
  const repo = await getContentRepository();
  const [casos, disciplinas] = await Promise.all([
    repo.getCasos(),
    repo.getDisciplinas(),
  ]);
  const nomeDisc = (id: string) => disciplinas.find((d) => d.id === id)?.nome ?? id;
  const marcaDisc = (id: string) => disciplinas.find((d) => d.id === id)?.marca ?? "";

  return (
    <div className="legacy-page">
      <header className="legacy-hero legacy-hero-layout">
      <div>
      <p className="legacy-eyebrow">Raciocínio clínico guiado</p>
      <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-text sm:text-3xl"><Stethoscope className="size-6 text-accent" /> Casos clínicos</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-6 text-text-muted">Formato das provas do Einstein: o caso é revelado por etapas e, a cada uma, você decide antes de ver a resposta. Treina o raciocínio, não a memória.</p>
      <div className="legacy-statline"><span>{casos.length} casos disponíveis</span><span>{casos.reduce((total, caso) => total + caso.etapas.length, 0)} etapas de decisão</span><span>Resposta por etapas</span></div>
      </div>
      <aside className="legacy-hero-panel"><span>Como estudar</span><strong>Leia. Decida. Reavalie.</strong><span>O caso libera dados progressivamente para treinar sua conduta clínica.</span></aside>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {casos.map((c) => (
          <Link
            key={c.id}
            href={`/casos/${c.id}`}
            className="legacy-card group flex flex-col p-5"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-accent-soft text-[9px] font-bold text-accent">
                {marcaDisc(c.disciplinaId)}
              </span>
              <span className="text-xs font-medium text-text-faint">{nomeDisc(c.disciplinaId)}</span>
              <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                {c.dificuldade}
              </span>
            </div>
            <h2 className="font-semibold leading-snug text-text">{c.titulo}</h2>
            <p className="mt-1.5 flex-1 text-[13px] leading-snug text-text-muted">{c.resumo}</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-text-faint">
              <Layers className="size-3.5" />
              {c.etapas.length} etapas
              <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>

      {casos.length === 0 && (
        <p className="legacy-empty mt-6 text-center">Nenhum caso clínico ainda.</p>
      )}
    </div>
  );
}
