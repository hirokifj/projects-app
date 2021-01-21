const baseKey = 'comments/';

export const getCommentsFetcherKey = (projectId?: string) =>
  projectId ? [baseKey, projectId] : baseKey;
