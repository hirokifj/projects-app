import { useQuery } from 'react-query';
import { fetchLikeListByUserId } from '@/api/likes';
import { User } from '@/types/user';
import { getLikeListFetcherKey } from './fetcherKey';

export const useLikeList = (user: User | null) => {
  const { data: likeList, error } = useQuery(
    getLikeListFetcherKey(),
    () => fetchLikeListByUserId(user?.id as string),
    { enabled: !!user },
  );

  return {
    likeList,
    error,
  } as const;
};
