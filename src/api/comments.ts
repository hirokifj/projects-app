import firebase from '@/lib/firebase';
import { Comment } from '@/types/comment';
import { Project } from '@/types/project';

type CommentWithoutId = Omit<Comment, 'id'>;

const commentConverter = {
  toFirestore(comment: CommentWithoutId): firebase.firestore.DocumentData {
    return {
      userId: comment.userId,
      userName: comment.userName,
      projectId: comment.projectId,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): CommentWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment */
    const data = snapshot.data(options)!;

    return {
      userId: data.userId,
      userName: data.userName,
      projectId: data.projectId,
      body: data.body,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
    /* eslint-enable */
  },
};

export const createComment = (comment: CommentWithoutId) =>
  firebase
    .firestore()
    .collection('comments')
    .withConverter(commentConverter)
    .add({
      userId: comment.userId,
      userName: comment.userName,
      projectId: comment.projectId,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });

export const fetchProjectAllComments = (projetId: Project['id']) =>
  firebase
    .firestore()
    .collection('comments')
    .withConverter(commentConverter)
    .orderBy('createdAt', 'desc')
    .where('projectId', '==', projetId)
    .get()
    .then((res) =>
      res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
