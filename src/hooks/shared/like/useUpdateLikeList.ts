import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateLikeList as FbUpdateLikeList } from '@/api/likes';
import { Project } from '@/types/project';
import { User } from '@/types/user';
import { getProjectsLikesCountFetcherKey } from '@/hooks/shared/project/fetcherKey';
import { LikeList } from '@/types/like';
import { getLikeListFetcherKey } from './fetcherKey';

export const useUpdateLikeList = ({
  projectId,
  likeList,
  user,
}: {
  projectId: Project['id'];
  likeList: LikeList | undefined;
  user: User | null;
}) => {
  const [processing, setProcessing] = useState(false);
  const mutation = useMutation(FbUpdateLikeList);
  const queryClient = useQueryClient();

  const updateLikeList = () => {
    if (processing || !likeList || !user) return;
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
    updateLikeList,
    processing,
  } as const;
};
