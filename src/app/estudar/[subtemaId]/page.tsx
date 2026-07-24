import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ListChecks, Sparkles, FileClock } from "lucide-react";
import { getContentRepository } from "@/infra/content";
import { MiniMarkdown } from "@/components/content/MiniMarkdown";
import { Figuras } from "@/components/figuras/Figura";
import { ProgressoConteudoClient } from "@/components/progresso/ProgressoConteudoClient";

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const disciplinas = await repo.getDisciplinas();
  return disciplinas.flatMap((d) =>
    d.temas.flatMap((t) => t.subtemas.map((s) => ({ subtemaId: s.id })))
  );
}

// cache() dedupe garante que generateMetadata e a página não disparem duas
// buscas (a versão Supabase do repositório faz round-trip de rede por chamada).
const buscarSubtema = cache(async (id: string) => {
  const repo = await getContentRepository();
  return repo.getSubtemaById(id);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subtemaId: string }>;
}): Promise<Metadata> {
  const { subtemaId } = await params;
  const found = await buscarSubtema(decodeURIComponent(subtemaId));
  if (!found) return {};
  return { title: `${found.subtema.nome} · ${found.disciplina.nome} · Codex Medicus` };
}

export default async function EstudarPage({
  params,
}: {
  params: Promise<{ subtemaId: string }>;
}) {
  const { subtemaId } = await params;
  const id = decodeURIComponent(subtemaId);
  const repo = await getContentRepository();
  const found = await buscarSubtema(id);
  if (!found) notFound();

  const { subtema, tema, disciplina } = found;
  const [conteudo, questoes] = await Promise.all([
    repo.getConteudo(id),
    repo.getQuestoes({ subtemaId: id }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-text-faint">
        <Link href={`/biblioteca/${disciplina.slug}`} className="hover:text-text">
          {disciplina.nome}
        </Link>
        <ChevronRight className="size-3.5" />
        <span>{tema.nome}</span>
      </nav>

      <div className="flex items-start justify-between gap-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {subtema.nome}
          {subtema.altoRendimento && <Sparkles className="size-5 flex-none text-gold" />}
        </h1>
      </div>

      {/* Quick actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {questoes.length > 0 && (
          <Link
            href="/questoes"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text hover:border-border-strong"
          >
            <ListChecks className="size-4 text-accent" />
            {questoes.length} questões
          </Link>
        )}
      </div>

      <ProgressoConteudoClient tipo="resumo" itemId={id} />

      {/* Content */}
      {conteudo ? (
        <>
          <div className="mt-6 flex items-center gap-2 text-xs text-text-faint">
            <FileClock className="size-3.5" />
            Atualizado em {conteudo.atualizadoEm} · origem: {origemLabel(conteudo.origem)}
          </div>
          <article className="mt-4 space-y-6">
            {conteudo.blocos.map((bloco) => (
              <section
                key={bloco.secao}
                className="rounded-2xl border border-border bg-surface p-5"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wider text-accent">
                  {bloco.secao}
                </h2>
                <MiniMarkdown text={bloco.corpo} />
                {bloco.figura && <Figuras ids={bloco.figura} />}
              </section>
            ))}
          </article>

          {conteudo.referencias.length > 0 && (
            <section className="mt-6 rounded-2xl border border-border bg-surface-2 p-5">
              <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wider text-text-faint">
                Referências
              </h2>
              <ul className="space-y-1 text-sm text-text-muted">
                {conteudo.referencias.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <PlaceholderConteudo />
      )}
    </div>
  );
}

function origemLabel(o: string): string {
  const map: Record<string, string> = {
    usuario_original: "seu material original",
    complemento_ia: "complemento (IA)",
    atualizacao_diretriz: "atualização de diretriz",
    edicao_manual: "edição manual",
  };
  return map[o] ?? o;
}

function PlaceholderConteudo() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center">
      <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl bg-surface-2">
        <FileClock className="size-5 text-text-faint" />
      </div>
      <h3 className="font-semibold text-text">Conteúdo a importar</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-text-muted">
        Este subtema ainda não tem resumo. Ele será preenchido a partir dos seus
        materiais (Drive/PDFs) e complementado com diretrizes — sempre preservando
        seu conteúdo original.
      </p>
    </div>
  );
}
