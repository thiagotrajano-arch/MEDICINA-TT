import type { Metadata } from "next";
import { CursoPrivadoClient } from "@/components/curso/CursoPrivadoClient";
import { CASOS } from "@/content/casos";
import { CONTEUDOS } from "@/content/conteudos";
import { QUESTOES } from "@/content/questoes";
import { criarRecursosPublicosPorDisciplina } from "@/lib/curso-publico";
import { getContentRepository } from "@/infra/content";

export const metadata: Metadata = {
  title: "Meu Curso Privado | Codex Medicus",
  description: "Organizacao privada de disciplinas e revisao longitudinal.",
  robots: { index: false, follow: false },
};

export default async function MeuCursoPage() {
  const repository = await getContentRepository();
  const disciplinas = await repository.getDisciplinas();
  const recursosPublicos = criarRecursosPublicosPorDisciplina({ disciplinas, conteudos: CONTEUDOS, questoes: QUESTOES, casos: CASOS });
  return <CursoPrivadoClient disciplinasDisponiveis={recursosPublicos} />;
}
