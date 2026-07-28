import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Clock3, FileText, GraduationCap } from "lucide-react";

import { SEMESTRES, type StatusSemestre } from "@/content/semestres";

export const metadata: Metadata = {
  title: "Meu Curso | Codex Medicus",
  description: "Organização da graduação em Medicina por semestre.",
};

const STATUS: Record<StatusSemestre, { label: string; className: string }> = {
  concluido: { label: "Concluído", className: "bg-accent-soft text-accent" },
  "em-curso": { label: "Em curso", className: "bg-surface-2 text-gold" },
  futuro: { label: "Futuro", className: "bg-surface-2 text-text-faint" },
};

export default function SemestresPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex max-w-4xl items-start gap-4">
          <span className="rounded-xl bg-accent p-3 text-accent-contrast"><GraduationCap className="size-7" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Minha graduação</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Meu Curso</h1>
            <p className="mt-3 text-[15px] leading-7 text-text-muted">A semestralização oficial do curso de Medicina organizada em uma linha do tempo de 12 períodos. Os planos atuais serão conectados aos resumos, questões, casos e mapas mentais conforme forem revisados.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted"><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">4 semestres concluídos</span><span className="rounded-full bg-surface-2 px-3 py-1 text-gold">6º período atual</span><span className="rounded-full bg-accent-soft px-3 py-1 text-accent">40% da carga cumprida</span></div>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 lg:grid-cols-2">
        {SEMESTRES.map((item) => {
          const status = STATUS[item.status];
          return (
            <article key={item.id} className="rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }}>
              <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-accent">Medicina</p><h2 className="mt-1 text-xl font-bold text-text">{item.titulo}</h2></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span></div>
              <p className="mt-3 text-sm leading-6 text-text-muted">{item.objetivo}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.disciplinas.map((disciplina) => <li key={disciplina} className="flex gap-2 rounded-lg bg-surface-2 px-3 py-2 text-xs leading-5 text-text-muted"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" /><span>{disciplina}</span></li>)}
              </ul>
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs text-text-muted">
                <div className="flex items-center gap-2"><BookOpen className="size-4 text-accent" aria-hidden="true" /><div><dt className="sr-only">Disciplinas</dt><dd>{item.disciplinas.length} disciplinas</dd></div></div>
                <div className="flex items-center gap-2"><FileText className="size-4 text-accent" aria-hidden="true" /><div><dt className="sr-only">Planos lidos</dt><dd>{item.planosLidos} planos lidos</dd></div></div>
              </dl>
            </article>
          );
        })}
      </section>

      <section className="mt-7 rounded-2xl border border-dashed border-border bg-surface-2 p-5 text-sm leading-6 text-text-muted"><div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-text-faint" aria-hidden="true" /><p>Fonte curricular: semestralização e planos de ensino do SISCAD/UFMS, consultados em 28/07/2026. Dados de identificação, matrícula e notas não são publicados. Todo PDF futuro será convertido para Markdown antes da leitura.</p></div></section>
    </div>
  );
}
