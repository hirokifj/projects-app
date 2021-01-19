export interface Project {
  id: string;
  title: string;
  description: string;
  commentCounts: number;
  likeCounts: number;
  language: string;
  tags: string[];
  url: string;
  imgPath: string;
}
