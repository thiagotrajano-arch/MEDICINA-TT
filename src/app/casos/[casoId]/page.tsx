import { notFound } from "next/navigation";
import { getContentRepository } from "@/infra/content";
import { CasoClient } from "@/components/casos/CasoClient";

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const casos = await repo.getCasos();
  return casos.map((c) => ({ casoId: c.id }));
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ casoId: string }>;
}) {
  const { casoId } = await params;
  const repo = await getContentRepository();
  const caso = await repo.getCaso(decodeURIComponent(casoId));
  if (!caso) notFound();

  return <CasoClient caso={caso} />;
}
