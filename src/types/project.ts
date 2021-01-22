export interface Project {
  id: string;
  title: string;
  description: string;
  commentsCount: number;
  likeCounts: number;
  language: string;
  tags: string[];
  url: string;
  imgPath: string;
}

export type ProjectWithoutId = Omit<Project, 'id'>;
