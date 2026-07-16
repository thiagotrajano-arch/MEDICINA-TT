import { config } from "dotenv";
import { existsSync } from "node:fs";

/**
 * Carrega variáveis de ambiente para os scripts de linha de comando.
 *
 * Next.js lê `.env.local` automaticamente, mas os scripts avulsos não — e o
 * `dotenv/config` só lê `.env`. Esta função carrega `.env.local` primeiro
 * (onde ficam as credenciais reais, fora do git) e depois `.env` como fallback,
 * sem sobrescrever o que já veio do ambiente (ex.: secrets do GitHub Actions).
 */
export function loadEnv(): void {
  for (const arquivo of [".env.local", ".env"]) {
    if (existsSync(arquivo)) config({ path: arquivo, override: false, quiet: true });
  }
}
