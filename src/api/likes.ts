import { db } from '@/lib/firebase';
import { LikeList, LikeListWithoutId, likeConverter } from '@/types/like';
import { User } from '@/types/user';
import { Project, projectConverter } from '@/types/project';

export const updateLikeList = ({
  likeList,
  projectId,
}: {
  likeList: LikeList;
  projectId: Project['id'];
}) => {
  const { id, userId, items } = likeList;

  const {
    newItems,
    action,
  }: { newItems: Project['id'][]; action: 'Add' | 'Remove' } = items.includes(
    projectId,
  )
    ? { newItems: items.filter((pId) => pId !== projectId), action: 'Remove' }
    : { newItems: [...items, projectId], action: 'Add' };

  const batch = db().batch();

  batch.update(db().collection('likes').withConverter(likeConverter).doc(id), {
    userId,
    items: newItems,
  });

  batch.update(
    db().collection('projects').doc(projectId).withConverter(projectConverter),
    {
      likesCount: db.FieldValue.increment(action === 'Add' ? 1 : -1),
    },
  );

  return batch.commit();
};

export const fetchLikeListByUserId = async (userId: User['id']) => {
  const querySnapShot = await db()
    .collection('likes')
    .withConverter(likeConverter)
    .where('userId', '==', userId)
    .get();

  // documentが存在しない場合は、新たに作成したものを返す。
  if (querySnapShot.size === 0) {
    const createdDocRef = await createLikeList(userId);
    const data = (await createdDocRef.get()).data() as LikeListWithoutId;
    return {
      id: createdDocRef.id,
      ...data,
    };
  }

  return {
    id: querySnapShot.docs[0].id,
    ...querySnapShot.docs[0].data(),
  };
};

const createLikeList = (userId: User['id']) =>
  db().collection('likes').withConverter(likeConverter).add({
    userId,
    items: [],
  });
