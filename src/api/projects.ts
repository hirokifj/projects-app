import { db } from '@/lib/firebase';
import { Project, FbProjectWithoutId, projectConverter } from '@/types/project';
import { getProjectJoinedTag } from '@/utils/project';
import { fetchAllTags } from '@/api/tags';
import { take } from '@/utils/array';
import { LikeList } from '@/types/like';

const take10 = take(10);

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

export const fetchRelatedTagsProjects = async (
  project: Project,
): Promise<Project[]> => {
  const tags = await fetchAllTags();

  return db()
    .collection('projects')
    .withConverter(projectConverter)
    .orderBy('likesCount', 'desc')
    .where(
      'tags',
      'array-contains-any',
      take10(project.tags).map((tag) => tag.id),
    )
    .limit(10)
    .get()
    .then((res) =>
      res.docs
        .map((doc) =>
          getProjectJoinedTag(
            {
              id: doc.id,
              ...doc.data(),
            },
            tags,
          ),
        )
        .filter((_) => _.id !== project.id),
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

export const fetchUserLikedProjects = (likeList: LikeList) => {
  const promises = likeList.items.map(fetchProjectById);

  return Promise.all(promises);
};
