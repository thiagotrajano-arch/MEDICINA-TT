/**
 * Supabase configuration probe.
 *
 * Intentionally free of any `@supabase/*` import so the static/offline code path
 * can check "is a database configured?" without pulling the Supabase SDK into the
 * bundle. The SDK is loaded lazily (dynamic import) only when this returns true.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
