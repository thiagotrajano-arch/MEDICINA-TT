import { isSupabaseConfigured } from "@/infra/supabase/config";
import { StaticContentRepository } from "./static-repository";
import type { ContentRepository } from "@/application/ports/content-repository";

/**
 * Repository factory — the ONE place that decides which backend is live.
 *
 * StaticContentRepository (the bundled TS content) is the default, and the
 * only backend used by `next build`. This project is a 100% static export:
 * every page is rendered once at build time, so reading from Supabase there
 * buys nothing (content is baked in either way) while adding real risk —
 * under the concurrent load of generating ~350 pages, PostgREST's nested
 * disciplina/tema/subtema query occasionally comes back late or incomplete,
 * which previously made affected pages render as "not found" even though
 * the content exists. Confirmed 2026-07-24: 113 of 289 /estudar pages in one
 * local build. The static bundle is the same content (same commit, always
 * in sync) with zero network dependency, and implements this interface
 * completely — including search(), so nothing regresses.
 *
 * Set CONTENT_SOURCE=supabase to opt into the Postgres-backed repository —
 * e.g. to sanity-check the DB mirror that `npm run seed` populates.
 */
let cached: ContentRepository | null = null;

export async function getContentRepository(): Promise<ContentRepository> {
  if (cached) return cached;
  if (process.env.CONTENT_SOURCE === "supabase" && isSupabaseConfigured()) {
    try {
      const { SupabaseContentRepository } = await import("./supabase-repository");
      const repo = new SupabaseContentRepository();
      const disciplinas = await repo.getDisciplinas();
      if (disciplinas.length > 0) {
        cached = repo;
        return cached;
      }
      // Schema empty/not migrated yet → fall through to static.
    } catch {
      // Supabase unreachable or schema missing → fall through to static.
    }
  }
  cached = new StaticContentRepository();
  return cached;
}

export type { ContentRepository };
