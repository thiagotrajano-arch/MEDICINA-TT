import type { Metadata } from "next";
import { CursoPrivadoClient } from "@/components/curso/CursoPrivadoClient";
import { getContentRepository } from "@/infra/content";

export const metadata: Metadata = {
  title: "Meu Curso Privado | Codex Medicus",
  description: "Organizacao privada de disciplinas e revisao longitudinal.",
  robots: { index: false, follow: false },
};

export default async function MeuCursoPage() {
  const repository = await getContentRepository();
  const disciplinas = await repository.getDisciplinas();
  return <CursoPrivadoClient disciplinasDisponiveis={disciplinas.map(({ id, nome, slug, marca }) => ({ id, nome, slug, marca }))} />;
}
