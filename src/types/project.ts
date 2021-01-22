export interface Project {
  id: string;
  title: string;
  description: string;
  commentsCount: number;
  likesCount: number;
  language: string;
  tags: string[];
  url: string;
  imgPath: string;
}

export type ProjectWithoutId = Omit<Project, 'id'>;
