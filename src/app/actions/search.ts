"use server";

import { getContentRepository } from "@/infra/content";
import type { SearchHit } from "@/application/ports/content-repository";

/**
 * Server action for the ⌘K command palette. Runs against whichever backend is
 * live (static seed or Supabase) — the client palette never imports data
 * directly, keeping it backend-agnostic.
 */
export async function searchContent(query: string): Promise<SearchHit[]> {
  const repo = await getContentRepository();
  return repo.search(query);
}
