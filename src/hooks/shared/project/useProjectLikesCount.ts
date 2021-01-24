import { useQuery } from 'react-query';
import { fetchProjectLikesCountById } from '@/api/projects';
import { Project } from '@/types/project';
import { getProjectsLikesCountFetcherKey } from './fetcherKey';

export const useProjectLikesCount = (projectId: Project['id']) => {
  const { data, error, isLoading } = useQuery(
    getProjectsLikesCountFetcherKey(projectId),
    () => fetchProjectLikesCountById(projectId),
    { enabled: !!projectId },
  );

  return {
    likesCount: data,
    error,
    isLoading,
  } as const;
};
