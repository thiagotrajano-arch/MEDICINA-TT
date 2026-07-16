import { isSupabaseConfigured } from "@/infra/supabase/config";
import { StaticContentRepository } from "./static-repository";
import type { ContentRepository } from "@/application/ports/content-repository";

/**
 * Repository factory — the ONE place that decides which backend is live.
 *
 * - No Supabase credentials → static seed (runs offline / static export).
 * - Credentials present AND schema populated → Supabase/Postgres backend
 *   (loaded lazily so the SDK is never bundled on the offline path).
 * - Credentials present but schema NOT ready yet (migration not applied) →
 *   resilient fall back to the static seed, so nothing breaks before the DB
 *   is provisioned. Same content either way.
 *
 * Everything else depends on the ContentRepository interface, so this switch is
 * invisible to the UI and use-cases.
 */
let cached: ContentRepository | null = null;

export async function getContentRepository(): Promise<ContentRepository> {
  if (cached) return cached;
  if (isSupabaseConfigured()) {
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
