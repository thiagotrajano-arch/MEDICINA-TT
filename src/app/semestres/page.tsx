import type { Metadata } from "next";
import { BookOpen, Clock3, FileText, GraduationCap } from "lucide-react";

import { SEMESTRES } from "@/content/semestres";

export const metadata: Metadata = {
  title: "Meu Curso | Codex Medicus",
  description: "Organizacao da graduacao por semestre.",
};

export default function SemestresPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex max-w-3xl items-start gap-4">
          <span className="rounded-xl bg-accent p-3 text-accent-contrast"><GraduationCap className="size-7" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Minha graduacao</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">Meu Curso</h1>
            <p className="mt-3 text-[15px] leading-7 text-text-muted">Um espaco para reunir a grade, disciplinas, cronogramas, resumos, questoes e documentos de cada semestre. A estrutura esta pronta; o conteudo sera organizado a partir dos materiais que voce enviar.</p>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SEMESTRES.map((semestre) => (
          <article key={semestre.id} className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-accent">Graduacao</p><h2 className="mt-1 text-xl font-bold text-text">{semestre.titulo}</h2></div><span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">Aguardando material</span></div>
            <p className="mt-4 min-h-12 text-sm leading-6 text-text-muted">{semestre.objetivo}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs text-text-muted">
              <div className="flex items-center gap-2"><BookOpen className="size-4 text-accent" aria-hidden="true" /><div><dt className="sr-only">Disciplinas</dt><dd>{semestre.disciplinas.length} disciplinas</dd></div></div>
              <div className="flex items-center gap-2"><FileText className="size-4 text-accent" aria-hidden="true" /><div><dt className="sr-only">Documentos</dt><dd>{semestre.documentos} documentos</dd></div></div>
            </dl>
          </article>
        ))}
      </section>

      <section className="mt-7 rounded-2xl border border-dashed border-border bg-surface-2 p-5 text-sm leading-6 text-text-muted"><div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-text-faint" aria-hidden="true" /><p>Proxima etapa: enviar a matriz curricular, planos de ensino, cronogramas ou PDFs. Cada PDF sera convertido primeiro para Markdown, revisado a partir desse texto e entao associado ao semestre e a disciplina corretos.</p></div></section>
    </div>
  );
}
