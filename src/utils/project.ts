import { Project } from '@/types/project';
import { Tag } from '@/types/tag';
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
