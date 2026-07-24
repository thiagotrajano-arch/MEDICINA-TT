import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/infra/content";
import { CasoClient } from "@/components/casos/CasoClient";

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const casos = await repo.getCasos();
  return casos.map((c) => ({ casoId: c.id }));
}

const buscarCaso = cache(async (id: string) => {
  const repo = await getContentRepository();
  return repo.getCaso(id);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ casoId: string }>;
}): Promise<Metadata> {
  const { casoId } = await params;
  const caso = await buscarCaso(decodeURIComponent(casoId));
  return caso ? { title: `${caso.titulo} · Codex Medicus` } : {};
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ casoId: string }>;
}) {
  const { casoId } = await params;
  const caso = await buscarCaso(decodeURIComponent(casoId));
  if (!caso) notFound();

  return <CasoClient caso={caso} />;
}
