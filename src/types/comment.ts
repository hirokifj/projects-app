import firebase from 'firebase';
import { User } from '@/types/user';
import { Project } from '@/types/project';

export interface Comment {
  id: string;
  userId: User['id'];
  userName: string;
  userImgPath: string;
  projectId: Project['id'];
  projectTitle: Project['title'];
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CommentWithoutId = Omit<Comment, 'id'>;

export const commentConverter = {
  toFirestore(comment: CommentWithoutId): firebase.firestore.DocumentData {
    return {
      userId: comment.userId,
      userName: comment.userName,
      userImgPath: comment.userImgPath,
      projectId: comment.projectId,
      projectTitle: comment.projectTitle,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): CommentWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    const data = snapshot.data(options)!;

    return {
      userId: data.userId,
      userName: data.userName,
      userImgPath: data.userImgPath,
      projectId: data.projectId,
      projectTitle: data.projectTitle,
      body: data.body,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
    /* eslint-enable */
  },
};
