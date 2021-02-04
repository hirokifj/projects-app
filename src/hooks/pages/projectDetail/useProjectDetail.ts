import { useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
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
  const toast = useToast();

  const { isAuthorized, isUnAuthorized, user } = useAuth();

  const { comments, error: commentsError } = useProjectComments(project.id);
  const { postComment: _postComment } = usePostComment({ user, project });

  const { likeList } = useLikeList(user);
  const {
    likesCount: likesCountData,
    isLoading: isLoadingLikesCount,
  } = useProjectLikesCount(project.id);

  const postComment = async (comment: string): Promise<void> => {
    try {
      await _postComment(comment);

      toast({
        title: '',
        description: '投稿しました。',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: '時間をおいて、再度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
