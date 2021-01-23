import firebase from 'firebase';
import { Project } from '@/types/project';
import { User } from '@/types/user';

export type LikeList = {
  id: string;
  userId: User['id'];
  items: Project['id'][];
};

export type LikeListWithoutId = Omit<LikeList, 'id'>;

export const likeConverter = {
  toFirestore(like: LikeListWithoutId): firebase.firestore.DocumentData {
    return {
      userId: like.userId,
      items: like.items,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): LikeListWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    const data = snapshot.data(options)!;

    return {
      userId: data.userId,
      items: data.items,
    };
    /* eslint-enable */
  },
};
