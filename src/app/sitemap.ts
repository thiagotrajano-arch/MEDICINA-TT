import type { MetadataRoute } from "next";

const BASE = "https://thiagotrajano-arch.github.io/MEDICINA-TT";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/biblioteca", "/questoes", "/simulado", "/casos", "/midia", "/mapas-mentais", "/semestres"];
  return rotas.map((rota) => ({
    url: `${BASE}${rota}/`,
    changeFrequency: rota === "" ? "weekly" : "monthly",
    priority: rota === "" ? 1 : 0.7,
  }));
}
