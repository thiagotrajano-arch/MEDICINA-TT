import { isSupabaseConfigured } from "@/infra/supabase/config";
import { StaticContentRepository } from "./static-repository";
import type { ContentRepository } from "@/application/ports/content-repository";

/**
 * Repository factory — the ONE place that decides which backend is live.
 *
 * - No Supabase credentials in the environment → static seed (runs offline).
 * - Credentials present → Supabase/Postgres backend (loaded lazily so the SDK
 *   is never bundled on the offline path).
 *
 * Everything else in the app depends on the ContentRepository interface, so this
 * switch is invisible to the UI and use-cases.
 */
let cached: ContentRepository | null = null;

export async function getContentRepository(): Promise<ContentRepository> {
  if (cached) return cached;
  if (isSupabaseConfigured()) {
    const { SupabaseContentRepository } = await import("./supabase-repository");
    cached = new SupabaseContentRepository();
  } else {
    cached = new StaticContentRepository();
  }
  return cached;
}

export type { ContentRepository };
