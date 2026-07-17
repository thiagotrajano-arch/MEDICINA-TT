import { getContentRepository } from "@/infra/content";
import { SimuladoClient } from "@/components/simulado/SimuladoClient";

export const metadata = { title: "Simulado · Codex Medicus" };

export default async function SimuladoPage() {
  const repo = await getContentRepository();
  const [questoes, disciplinas] = await Promise.all([
    repo.getQuestoes(),
    repo.getDisciplinas(),
  ]);

  return <SimuladoClient questoes={questoes} disciplinas={disciplinas} />;
}
