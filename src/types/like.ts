import { Project } from '@/types/project';
import { User } from '@/types/user';

export type LikeList = {
  id: string;
  userId: User['id'];
  items: Project['id'][];
};

export type LikeListWithoutId = Omit<LikeList, 'id'>;
