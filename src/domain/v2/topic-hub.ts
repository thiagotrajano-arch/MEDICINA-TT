export interface TopicHubContext {
  subtemaId: string;
  title: string;
  disciplineId: string;
  counts: { summaries: number; questions: number; cases: number; recall: number; media: number; evidence: number };
  mastery?: { correctRate: number; attempts: number; dueRecall: number };
}

export type TopicHubSection = keyof TopicHubContext["counts"];

export function topicHubSections(context: TopicHubContext): TopicHubSection[] {
  return (Object.keys(context.counts) as TopicHubSection[]).filter((section) => context.counts[section] > 0);
}

