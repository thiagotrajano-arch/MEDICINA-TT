/**
 * @deprecated Superseded by the ContentRepository port and its implementations.
 *
 * Use `getContentRepository()` from "@/infra/content" instead. It returns an
 * async ContentRepository backed by either the static seed or Supabase,
 * selected by environment. This file is kept only to flag the migration and
 * intentionally re-exports the factory. Do not add logic here.
 */
export { getContentRepository } from "./index";
