import { useQuery } from 'react-query';
import { fetchAllTags } from '@/api/tags';
import { getProjectTagsFetcherKey } from './fetcherKey';

export const useProjectTags = () => {
  const { data, error } = useQuery(getProjectTagsFetcherKey(), fetchAllTags);

  return {
    tags: data,
    error,
  } as const;
};
