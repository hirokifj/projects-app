import { db } from '@/lib/firebase';
import { Comment, CommentWithoutId, commentConverter } from '@/types/comment';
import { Project, projectConverter } from '@/types/project';
import { User } from '@/types/user';

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
    projectTitle: data.projectTitle,
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

export const fetchUserComments = (userId: User['id']) =>
  db()
    .collection('comments')
    .withConverter(commentConverter)
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .get()
    .then((res) =>
      res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );

export const updateComment = ({
  commentId,
  commentBody,
}: {
  commentId: Comment['id'];
  commentBody: Comment['body'];
}) =>
  db()
    .collection('comments')
    .withConverter(commentConverter)
    .doc(commentId)
    .update({
      body: commentBody,
      updatedAt: new Date(),
    });
