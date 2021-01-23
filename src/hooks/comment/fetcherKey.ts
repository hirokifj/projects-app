import { Project } from '@/types/project';

const baseKey = 'comments/';

export const getCommentsFetcherKey = (projectId?: Project['id']) =>
  projectId ? [baseKey, projectId] : baseKey;
