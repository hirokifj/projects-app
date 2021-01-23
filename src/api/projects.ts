import { db } from '@/lib/firebase';
import { Project, ProjectWithoutId, projectConverter } from '@/types/project';

export const fetchAllProjects = () =>
  db()
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
  let query = db()
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
  db()
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

export const fetchProjectLikesCountById = async (projectId: Project['id']) =>
  (await fetchProjectById(projectId)).likesCount;
