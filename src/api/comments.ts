import { db } from '@/lib/firebase';
import { CommentWithoutId, commentConverter } from '@/types/comment';
import { Project, projectConverter } from '@/types/project';

export const createComment = (data: CommentWithoutId) => {
  const batch = db().batch();

  const newCommentRef = db()
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

  const projectRef = db()
    .collection('projects')
    .doc(data.projectId)
    .withConverter(projectConverter);

  batch.update(projectRef, {
    commentsCount: db.FieldValue.increment(1),
  });

  return batch.commit();
};

export const fetchProjectAllComments = (projetId: Project['id']) =>
  db()
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
