/**
 * Runnable Drive sync job (invoked by GitHub Actions cron or manually).
 *
 *   npx tsx scripts/sync-drive.mts
 *
 * Safe no-op when Drive/Supabase aren't configured, so it never fails a pipeline
 * before credentials exist. Heavy AI processing (extract → classify) is a
 * separate step; this job only detects changes and records received files.
 */
import { loadEnv } from "./load-env.mjs";
import { isDriveConfigured } from "../src/infra/drive/config";
import { isSupabaseConfigured } from "../src/infra/supabase/config";

loadEnv();

async function main() {
  if (!isDriveConfigured() || !isSupabaseConfigured()) {
    console.log(
      "[sync-drive] pulado: Drive e/ou Supabase não configurados (defina .env / secrets)."
    );
    return;
  }
  const { GoogleDriveSource } = await import("../src/infra/drive/google-drive-source");
  const { SupabaseIngestionStore } = await import("../src/infra/drive/supabase-ingestion-store");
  const { SyncDrive } = await import("../src/application/ingestion/sync-drive");

  const sync = new SyncDrive(new GoogleDriveSource(), new SupabaseIngestionStore());
  const result = await sync.run();
  console.log("[sync-drive] concluído:", JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error("[sync-drive] erro:", e);
  process.exit(1);
});
