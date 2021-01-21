import { useQuery } from 'react-query';
import { Project } from '@/types/project';
import { fetchProjectAllComments } from '@/api/comments';
import { getCommentsFetcherKey } from './fetcherKey';

export const useProjectComments = (projectId: Project['id']) => {
  const { data: comments, error } = useQuery(
    getCommentsFetcherKey(projectId),
    () => fetchProjectAllComments(projectId),
  );

  return {
    comments,
    error,
  } as const;
};
