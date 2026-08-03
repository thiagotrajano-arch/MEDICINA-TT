import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/"], disallow: ["/minha-midia/", "/meu-curso/", "/agenda/"] }],
    sitemap: "https://thiagotrajano-arch.github.io/MEDICINA-TT/sitemap.xml",
  };
}
