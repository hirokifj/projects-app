export interface Project {
  id: string;
  title: string;
  description: string;
  commentCounts: number;
  likeCounts: number;
  tags?: Record<string, boolean>;
}
