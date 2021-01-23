import firebase, { db } from '@/lib/firebase';
import { Tag, TagWithoutId } from '@/types/project';

const tagConverter = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): TagWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment */
    const data = snapshot.data(options)!;

    return {
      label: data.label,
    };
    /* eslint-enable */
  },
};

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
