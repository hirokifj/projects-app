import { User } from '@/types/user';

export interface Comment {
  id: string;
  userId: User['id'];
  userName: string;
  userImgPath: string;
  projectId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CommentWithoutId = Omit<Comment, 'id'>;
