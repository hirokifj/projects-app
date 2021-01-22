import firebase from '@/lib/firebase';
import { Project, ProjectWithoutId } from '@/types/project';

export const projectConverter = {
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
      commentsCount: data.commentsCount,
      likesCount: data.likesCount,
      language: data.language,
      tags: data.tags,
      url: data.url,
      imgPath: data.imgPath,
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

export const fetchProjects: (options?: {
  tag: string;
  language: string;
}) => Promise<Project[]> = (options) => {
  let query = firebase
    .firestore()
    .collection('projects')
    .withConverter(projectConverter)
    .orderBy('createdAt', 'desc');

  if (options?.tag) {
    query = query.where('tags', 'array-contains', options.tag);
  }
  if (options?.language) {
    query = query.where('language', '==', options.language);
  }

  return query.get().then((res) =>
    res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  );
};

export const fetchProjectById = (projectId: Project['id']) =>
  firebase
    .firestore()
    .collection('projects')
    .doc(projectId)
    .withConverter(projectConverter)
    .get()
    .then((res) => {
      if (!res.exists) throw new Error('Data is not found.');

      const data = res.data() as ProjectWithoutId;
      return {
        id: res.id,
        ...data,
      };
    });
