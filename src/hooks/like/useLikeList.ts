import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchLikeListByUserId,
  updateLikeList as FbUpdateLikeList,
} from '@/api/likes';
import { Project } from '@/types/project';
import { User } from '@/types/user';
import { getProjectsLikesCountFetcherKey } from '@/hooks/project/fetcherKey';
import { getLikeListFetcherKey } from './fetcherKey';

export const useLikeList = (userId: User['id']) => {
  const [processing, setProcessing] = useState(false);
  const { data: likeList, error } = useQuery(
    getLikeListFetcherKey(),
    () => fetchLikeListByUserId(userId),
    { enabled: !!userId },
  );
  const mutation = useMutation(FbUpdateLikeList);
  const queryClient = useQueryClient();

  const updateLikeList = (projectId: Project['id']) => {
    if (processing || !likeList) return;
    setProcessing(true);

    mutation
      .mutateAsync({ likeList, projectId })
      .then(() => {
        queryClient.invalidateQueries(getLikeListFetcherKey());
        queryClient.invalidateQueries(
          getProjectsLikesCountFetcherKey(projectId),
        );
      })
      .finally(() => {
        // 連続クリック対策
        const id = setTimeout(() => {
          setProcessing(false);
          clearTimeout(id);
        }, 2000);
      });
  };

  return {
    likeList,
    error,
    updateLikeList,
    processing,
  } as const;
};
