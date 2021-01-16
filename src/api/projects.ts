import firebase from '@/lib/firebase';
import { Project } from '@/types/project';

type ProjectWithoutId = Omit<Project, 'id'>;

const projectConverter = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ProjectWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment */
    const data = snapshot.data(options)!;

    return {
      title: data.title,
      description: data.description,
      commentCounts: data.commentCounts,
      likeCounts: data.likeCounts,
      language: data.language,
      tags: data.tags,
    };
    /* eslint-enable */
  },
};

export const fetchAllProjects = () =>
  firebase
    .firestore()
    .collection('projects')
    .withConverter(projectConverter)
    .orderBy('createdAt', 'desc')
    .get()
    .then((res) =>
      res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
