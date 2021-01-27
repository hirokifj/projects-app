import { LikeList } from '@/types/like';
import { Project, FbProject, Tag } from '@/types/project';

export const getProjectJoinedTag = (
  project: FbProject,
  tags: Tag[],
): Project => ({
  ...project,
  tags: project.tagIds
    .map((tagId) => tags.find((_) => _.id === tagId))
    .filter((_) => _ !== undefined) as Tag[],
});

export const isLikedProject = (
  projectId: Project['id'],
  items: LikeList['items'],
): boolean => items.includes(projectId);
