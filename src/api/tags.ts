import { db } from '@/lib/firebase';
import { Tag, tagConverter } from '@/types/project';

export const fetchAllTags: () => Promise<Tag[]> = () =>
  db()
    .collection('tags')
    .withConverter(tagConverter)
    .get()
    .then((res) =>
      res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
