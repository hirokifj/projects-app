import { useQuery } from 'react-query';
import { fetchAllTags } from '@/api/tags';
import { getProjectTagsFetcherKey } from './fetcherKey';

export const useTags = () => {
  const { data, error } = useQuery(getProjectTagsFetcherKey(), fetchAllTags);

  return {
    tags: data,
    error,
  } as const;
};
