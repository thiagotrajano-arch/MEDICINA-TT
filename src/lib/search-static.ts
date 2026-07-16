import { DISCIPLINAS } from "@/content/taxonomy";
import { QUESTOES } from "@/content/questoes";
import type { SearchHit } from "@/application/ports/content-repository";

/**
 * Client-side search over the bundled knowledge tree + question bank.
 *
 * Used by the command palette so search works with no server round-trip — which
 * keeps it instant and lets the site run as a fully static export (GitHub Pages).
 * When the app runs as a server with Supabase, server-side search is available
 * via the repository; this static path mirrors it for the offline/export build.
 */
export function searchStatic(query: string): SearchHit[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  for (const d of DISCIPLINAS) {
    if (normalize(d.nome).includes(q)) {
      hits.push({ tipo: "disciplina", titulo: d.nome, contexto: d.grupo, href: `/biblioteca/${d.slug}` });
    }
    for (const t of d.temas) {
      if (normalize(t.nome).includes(q)) {
        hits.push({ tipo: "tema", titulo: t.nome, contexto: d.nome, href: `/biblioteca/${d.slug}` });
      }
      for (const s of t.subtemas) {
        if (normalize(s.nome).includes(q)) {
          hits.push({
            tipo: "subtema",
            titulo: s.nome,
            contexto: `${d.nome} · ${t.nome}`,
            href: `/estudar/${encodeURIComponent(s.id)}`,
          });
        }
      }
    }
  }
  for (const question of QUESTOES) {
    if (normalize(question.enunciado).includes(q) || question.tags.some((tag) => normalize(tag).includes(q))) {
      hits.push({
        tipo: "questao",
        titulo: question.enunciado.slice(0, 80) + "…",
        contexto: "Questão",
        href: "/questoes",
      });
    }
  }
  return hits.slice(0, 30);
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
