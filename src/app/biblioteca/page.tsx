import { getContentRepository } from "@/infra/content";
import { BibliotecaClient } from "@/components/biblioteca/BibliotecaClient";
export const metadata = { title: "Biblioteca · Codex Medicus" };
export default async function BibliotecaPage() { const repo = await getContentRepository(); const [disciplinas, grupos] = await Promise.all([repo.getDisciplinas(), repo.getGrupos()]); return <BibliotecaClient disciplinas={disciplinas} grupos={grupos} />; }
