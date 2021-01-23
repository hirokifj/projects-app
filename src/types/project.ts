export interface Project {
  id: string;
  title: string;
  description: string;
  commentsCount: number;
  likesCount: number;
  language: Language;
  tags: string[];
  url: string;
  imgPath: string;
}

export type ProjectWithoutId = Omit<Project, 'id'>;

export type Tag = {
  id: string;
  label: string;
};

export type TagWithoutId = Omit<Tag, 'id'>;

export type Language = '日本語' | '英語';
