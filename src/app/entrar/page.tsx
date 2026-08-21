import type { Metadata } from "next";
import { EntrarClient } from "./EntrarClient";

export const metadata: Metadata = {
  title: "Entrar · Codex Medicus",
  description: "Acesso privado ao Codex Medicus.",
  robots: { index: false, follow: false },
};

export default function EntrarPage() {
  return <EntrarClient />;
}
