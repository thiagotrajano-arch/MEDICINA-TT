import type { Metadata } from "next";
import { AgendaPrivadaClient } from "@/components/curso/AgendaPrivadaClient";
import { getContentRepository } from "@/infra/content";

export const metadata: Metadata = { title: "Agenda Privada | Codex Medicus", description: "Agenda pessoal de aulas, revisoes e provas.", robots: { index: false, follow: false } };
export default async function AgendaPage() {
  const disciplinas = await (await getContentRepository()).getDisciplinas();
  return <AgendaPrivadaClient disciplinas={disciplinas} />;
}
