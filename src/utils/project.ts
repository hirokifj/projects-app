import { Project, Tag } from '@/types/project';
import { isString } from '@/utils/string';

export const getProjectJoinedTag = (
  project: Project,
  tags: Tag[],
): Project => ({
  ...project,
  tags: project.tags
    .map((projectTagId) => tags.find((_) => _.id === projectTagId)?.label)
    .filter(isString),
});
