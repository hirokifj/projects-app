import { db } from '@/lib/firebase';
import { Project, FbProjectWithoutId, projectConverter } from '@/types/project';
import { getProjectJoinedTag } from '@/utils/project';
import { fetchAllTags } from '@/api/tags';

export const fetchAllProjects = () => fetchProjects();

export const fetchProjects: (options?: {
  tag: string;
  language: string;
}) => Promise<Project[]> = async (options) => {
  const tags = await fetchAllTags();

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
    res.docs.map((doc) =>
      getProjectJoinedTag(
        {
          id: doc.id,
          ...doc.data(),
        },
        tags,
      ),
    ),
  );
};

export const fetchProjectById = async (
  projectId: Project['id'],
): Promise<Project> => {
  const tags = await fetchAllTags();

  return db()
    .collection('projects')
    .doc(projectId)
    .withConverter(projectConverter)
    .get()
    .then((res) => {
      if (!res.exists) throw new Error('Data is not found.');

      const data = res.data() as FbProjectWithoutId;
      return getProjectJoinedTag(
        {
          id: res.id,
          ...data,
        },
        tags,
      );
    });
};

export const fetchProjectLikesCountById = async (projectId: Project['id']) =>
  (await fetchProjectById(projectId)).likesCount;
