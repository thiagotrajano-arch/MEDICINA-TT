import { MidiaClient, type FiguraIndice } from "@/components/midia/MidiaClient";
import { FIGURAS } from "@/components/figuras/registry";

export const metadata = { title: "Mídia · Codex Medicus" };

export default function MidiaPage() {
  const figuras: FiguraIndice[] = Object.values(FIGURAS).map((figura) => ({
    id: figura.id,
    titulo: figura.titulo,
    legenda: figura.legenda,
    tipo: figura.imagem ? "imagem" : "diagrama",
    licenca: figura.imagem?.licenca ?? "Autoral",
  }));
  return <MidiaClient figuras={figuras} />;
}
