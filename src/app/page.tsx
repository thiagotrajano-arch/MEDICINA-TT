import { getContentRepository } from "@/infra/content";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const repo = await getContentRepository();
  const [stats, disciplinas] = await Promise.all([
    repo.getStats(),
    repo.getDisciplinas(),
  ]);

  // Prioriza os subtemas de alto rendimento que JÁ têm resumo — é o que o
  // usuário consegue estudar agora; os pendentes vêm depois.
  const altoRendimento = disciplinas
    .flatMap((d) => d.temas.flatMap((t) => t.subtemas.map((s) => ({ s, d }))))
    .filter(({ s }) => s.altoRendimento)
    .sort((a, b) => Number(b.s.temConteudo) - Number(a.s.temConteudo))
    .slice(0, 8)
    .map(({ s, d }) => ({
      id: s.id,
      nome: s.nome,
      marca: d.marca,
      temConteudo: s.temConteudo,
    }));

  return (
    <DashboardClient
      disciplinas={disciplinas}
      totalQuestoes={stats.questoes}
      totalResumos={stats.subtemasComConteudo}
      altoRendimento={altoRendimento}
    />
  );
}
