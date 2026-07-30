import type { Metadata } from "next";
import { MidiaPrivadaClient } from "@/components/midia/MidiaPrivadaClient";

export const metadata: Metadata = {
  title: "Minha Midia Privada | Codex Medicus",
  description: "Biblioteca autenticada de imagens privadas para estudo pessoal.",
  robots: { index: false, follow: false },
};

export default function MinhaMidiaPage() { return <MidiaPrivadaClient />; }
