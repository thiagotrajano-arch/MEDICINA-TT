import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export { isSupabaseConfigured } from "./config";

/**
 * Supabase client factory.
 *
 * Two clients:
 *  - `getSupabaseAnon()` — public/anon key, safe for read paths with RLS.
 *  - `getSupabaseAdmin()` — service-role key, SERVER-ONLY (ingestion/seed/migrations helpers).
 *
 * Credentials come from environment variables (never committed — see .env.example).
 */

let anon: SupabaseClient | null = null;
export function getSupabaseAnon(): SupabaseClient {
  if (!anon) {
    anon = createClient(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      { auth: { persistSession: false } }
    );
  }
  return anon;
}

let admin: SupabaseClient | null = null;
/** SERVER ONLY. Bypasses RLS — never import into a client component. */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must never run in the browser.");
  }
  if (!admin) {
    admin = createClient(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
      { auth: { persistSession: false } }
    );
  }
  return admin;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}
