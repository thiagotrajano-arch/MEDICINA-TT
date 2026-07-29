import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3, GraduationCap } from "lucide-react";

import { CICLOS_FORMACAO } from "@/content/semestres";

export const metadata: Metadata = {
  title: "Trilhas do Curso | Codex Medicus",
  description: "Mapa público de revisão para a formação médica, sem dados acadêmicos pessoais.",
};

const CONEXOES = [
  { href: "/biblioteca", label: "Resumos", description: "Conteúdo revisado por disciplina e subtema" },
  { href: "/questoes", label: "Questões", description: "Treino com progresso salvo" },
  { href: "/casos", label: "Casos clínicos", description: "Raciocínio clínico em etapas" },
  { href: "/mapas-mentais", label: "Mapas mentais", description: "Visão conectada dos resumos publicados" },
  { href: "/midia", label: "Mídia", description: "Figuras clínicas com fonte e contexto" },
] as const;

export default function SemestresPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex max-w-4xl items-start gap-4">
          <span className="rounded-xl bg-accent p-3 text-accent-contrast"><GraduationCap className="size-7" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Organização de revisão</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Trilhas do Curso</h1>
            <p className="mt-3 text-[15px] leading-7 text-text-muted">Uma visão pública dos ciclos da formação médica para orientar a revisão. Os vínculos individuais entre matérias, planos, documentos, dificuldades e progresso pertencem à camada privada.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted"><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">12 períodos como referência</span><span className="rounded-full bg-surface-2 px-3 py-1 text-gold">3 ciclos de estudo</span><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">progresso individual privado</span></div>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 lg:grid-cols-3">
        {CICLOS_FORMACAO.map((ciclo) => (
          <article key={ciclo.id} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
            <p className="text-xs font-semibold text-accent">{ciclo.periodos}</p>
            <h2 className="mt-1 text-xl font-bold text-text">{ciclo.titulo}</h2>
            <p className="mt-3 text-sm leading-6 text-text-muted">{ciclo.objetivo}</p>
            <ul className="mt-4 grid gap-2">
              {ciclo.eixos.map((eixo) => <li key={eixo} className="flex gap-2 rounded-lg bg-surface-2 px-3 py-2 text-xs leading-5 text-text-muted"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" /><span>{eixo}</span></li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6" style={{ boxShadow: "var(--shadow)" }}>
        <h2 className="text-lg font-bold text-text">Acervos conectados</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">Use estes atalhos para revisar conteúdos publicados por tema. A conexão fina com o percurso acadêmico é mantida apenas no espaço privado de estudo.</p>
        <nav aria-label="Acervos relacionados ao curso" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CONEXOES.map((conexao) => (
            <Link key={conexao.href} href={conexao.href} className="rounded-xl border border-border bg-surface-2 p-3 transition-colors hover:border-accent/50 hover:bg-accent-soft">
              <span className="text-sm font-semibold text-accent">{conexao.label}</span>
              <span className="mt-1 block text-xs leading-5 text-text-muted">{conexao.description}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="mt-7 rounded-2xl border border-dashed border-border bg-surface-2 p-5 text-sm leading-6 text-text-muted"><div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-text-faint" aria-hidden="true" /><p>Esta página não exporta planos de ensino, matrícula, notas, andamento, documentos ou outros dados acadêmicos pessoais. Quando um documento privado for usado no estudo, ele segue o fluxo PDF → Markdown → triagem antes de qualquer síntese permitida.</p></div></section>
    </div>
  );
}
