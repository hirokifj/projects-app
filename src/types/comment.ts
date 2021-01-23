import { User } from '@/types/user';
import { Project } from '@/types/project';

export interface Comment {
  id: string;
  userId: User['id'];
  userName: string;
  userImgPath: string;
  projectId: Project['id'];
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CommentWithoutId = Omit<Comment, 'id'>;
