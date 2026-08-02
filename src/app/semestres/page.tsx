import type { Metadata } from "next";
import { CICLOS_FORMACAO } from "@/content/semestres";
import { SemestresClient } from "@/components/semestres/SemestresClient";

export const metadata: Metadata = { title: "Trilhas do Curso | Codex Medicus", description: "Mapa de revisao por ciclos e semestres." };
export default function SemestresPage() { return <SemestresClient ciclos={CICLOS_FORMACAO} />; }
