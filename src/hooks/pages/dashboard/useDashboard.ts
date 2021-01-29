import { useAuth } from '@/lib/auth';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useLikeList } from '@/hooks/shared/like/useLikeList';
import { fetchUserLikedProjects } from '@/api/projects';
import {
  fetchUserComments,
  updateComment as FbUpdateComment,
} from '@/api/comments';
import { Comment } from '@/types/comment';
import { LikeList } from '@/types/like';

type UpdateComment = (
  commentId: Comment['id'],
) => (commentBody: Comment['body']) => Promise<void>;

export const useDashboard = () => {
  const { redirectIfUnAuthorized, isAuthorized, user } = useAuth();
  const { likeList } = useLikeList(user);
  const mutation = useMutation(FbUpdateComment);
  const queryClient = useQueryClient();

  const {
    data: likedProjects,
    error: likedProjectsError,
  } = useQuery(
    'user/projects/likes',
    () => fetchUserLikedProjects(likeList as LikeList),
    { enabled: !!likeList },
  );

  const { data: comments, error: commentsError } = useQuery(
    'user/comments',
    () => fetchUserComments(user?.id as string),
    { enabled: !!user },
  );

  const updateComment: UpdateComment = (commentId: Comment['id']) => (
    commentBody: Comment['body'],
  ) =>
    mutation.mutateAsync({ commentId, commentBody }).then(() => {
      queryClient.invalidateQueries('user/comments');
    });

  return {
    user,
    isAuthorized,
    redirectIfUnAuthorized,
    likedProjects,
    likedProjectsError,
    comments,
    commentsError,
    updateComment,
  };
};
