import { useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { useProjectComments } from '@/hooks/shared/comment/useProjectComments';
import { useLikeList } from '@/hooks/shared/like/useLikeList';
import { useUpdateLikeList } from '@/hooks/shared/like/useUpdateLikeList';
import { useProjectLikesCount } from '@/hooks/shared/project/useProjectLikesCount';
import { usePostComment } from '@/hooks/shared/comment/usePostComment';
import { isLikedProject } from '@/utils/project';
import { isNumber } from '@/utils/number';
import { Project } from '@/types/project';

export const useProjectDetail = (project: Project) => {
  const { isAuthorized, isUnAuthorized, user } = useAuth();

  const { comments, error: commentsError } = useProjectComments(project.id);
  const { postComment } = usePostComment({ user, project });

  const { likeList } = useLikeList(user);

  const {
    likesCount: likesCountData,
    isLoading: isLoadingLikesCount,
  } = useProjectLikesCount(project.id);
  const likesCount = useMemo(
    () => (isNumber(likesCountData) ? likesCountData : project.likesCount),
    [likesCountData, project],
  );
  const isLiked = useMemo(
    () => !!likeList && isLikedProject(project.id, likeList.items),
    [likeList, project],
  );

  const { updateLikeList } = useUpdateLikeList({
    projectId: project.id,
    likeList,
    user,
  });

  return {
    isAuthorized,
    isUnAuthorized,
    comments,
    commentsError,
    postComment,
    updateLikeList,
    isLiked,
    likesCount,
    isLoadingLikesCount,
  };
};
