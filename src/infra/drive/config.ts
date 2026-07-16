/**
 * Drive configuration probe. No `googleapis` import here, so callers can check
 * "is Drive configured?" without loading the SDK (loaded lazily only when used).
 */
export function isDriveConfigured(): boolean {
  return Boolean(
    (process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
      process.env.GOOGLE_SERVICE_ACCOUNT_FILE ||
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN) &&
      process.env.DRIVE_FOLDER_IDS
  );
}

export function driveFolderIds(): string[] {
  return (process.env.DRIVE_FOLDER_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
