import firebase from '@/lib/firebase';
import { projectConverter } from '@/api/projects';
import { CommentWithoutId } from '@/types/comment';
import { Project } from '@/types/project';

const commentConverter = {
  toFirestore(comment: CommentWithoutId): firebase.firestore.DocumentData {
    return {
      userId: comment.userId,
      userName: comment.userName,
      userImgPath: comment.userImgPath,
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
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    const data = snapshot.data(options)!;

    return {
      userId: data.userId,
      userName: data.userName,
      userImgPath: data.userImgPath,
      projectId: data.projectId,
      body: data.body,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
    /* eslint-enable */
  },
};

export const createComment = (data: CommentWithoutId) => {
  const batch = firebase.firestore().batch();

  const newCommentRef = firebase
    .firestore()
    .collection('comments')
    .withConverter(commentConverter)
    .doc();

  batch.set(newCommentRef, {
    userId: data.userId,
    userName: data.userName,
    userImgPath: data.userImgPath,
    projectId: data.projectId,
    body: data.body,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  const projectRef = firebase
    .firestore()
    .collection('projects')
    .doc(data.projectId)
    .withConverter(projectConverter);

  batch.update(projectRef, {
    commentCounts: firebase.firestore.FieldValue.increment(1),
  });

  return batch.commit();
};

export const fetchProjectAllComments = (projetId: Project['id']) =>
  firebase
    .firestore()
    .collection('comments')
    .withConverter(commentConverter)
    .orderBy('createdAt', 'asc')
    .where('projectId', '==', projetId)
    .get()
    .then((res) =>
      res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
