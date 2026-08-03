import type { Metadata } from "next";
import { AgendaPrivadaClient } from "@/components/curso/AgendaPrivadaClient";

export const metadata: Metadata = { title: "Agenda Privada | Codex Medicus", description: "Agenda pessoal de aulas, revisoes e provas.", robots: { index: false, follow: false } };
export default function AgendaPage() { return <AgendaPrivadaClient />; }
