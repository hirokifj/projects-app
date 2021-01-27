import { Project, Tag, Language } from '@/types/project';

const projectBaseKey = 'projects/';

export const getProjectsFetcherKey = (options: {
  tagId: Tag['id'];
  language: Language | '';
}) => [projectBaseKey, options.tagId, options.language];

export const getProjectsLikesCountFetcherKey = (projectId: Project['id']) => [
  `${projectBaseKey}/like`,
  projectId,
];

const projectTagBaseKey = 'tags/';

export const getProjectTagsFetcherKey = () => projectTagBaseKey;
