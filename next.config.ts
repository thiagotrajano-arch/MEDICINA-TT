import type { NextConfig } from "next";

/**
 * Static export config for GitHub Pages (free hosting).
 *
 * When GITHUB_PAGES=true (set in the Pages workflow), the app builds to fully
 * static HTML under the repo's basePath. Local `next dev` is unaffected (export
 * only changes `next build`), so development keeps all features.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "MEDICINA-TT";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,
  eslint: { ignoreDuringBuilds: true },
  // Type safety is enforced by the separate `npm run typecheck` step / CI, not
  // during the build — this keeps the build's memory footprint low.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
