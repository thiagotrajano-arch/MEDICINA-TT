import { getContentRepository } from "@/infra/content";
import { QuizClient } from "@/components/questoes/QuizClient";

export const metadata = { title: "Questões · Codex Medicus" };

export default async function QuestoesPage() {
  const repo = await getContentRepository();
  const [questoes, disciplinas] = await Promise.all([
    repo.getQuestoes(),
    repo.getDisciplinas(),
  ]);

  return <QuizClient questoes={questoes} disciplinas={disciplinas} />;
}
