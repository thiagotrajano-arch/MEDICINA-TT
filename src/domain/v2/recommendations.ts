import type { TopicHubContext } from "./topic-hub";

export type RecommendationKind = "review_recall" | "remediate" | "practice" | "learn";

export interface Recommendation {
  kind: RecommendationKind;
  subtemaId: string;
  priority: number;
  reason: string;
}

export function recommendNext(context: TopicHubContext): Recommendation {
  const mastery = context.mastery;
  if ((mastery?.dueRecall ?? 0) > 0) return { kind: "review_recall", subtemaId: context.subtemaId, priority: 100, reason: "Há revisão vencida." };
  if ((mastery?.correctRate ?? 1) < 0.7 && context.counts.questions > 0) return { kind: "remediate", subtemaId: context.subtemaId, priority: 90, reason: "A taxa de acerto indica necessidade de remediação." };
  if (context.counts.questions > 0) return { kind: "practice", subtemaId: context.subtemaId, priority: 60, reason: "Há questões disponíveis para prática." };
  return { kind: "learn", subtemaId: context.subtemaId, priority: 40, reason: "Começar pelo material de aprendizagem disponível." };
}

