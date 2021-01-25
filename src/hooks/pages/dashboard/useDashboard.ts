import { useAuth } from '@/lib/auth';
import { useQuery } from 'react-query';
import { useLikeList } from '@/hooks/shared/like/useLikeList';
import { fetchUserLikedProjects } from '@/api/projects';
import { fetchUserComments } from '@/api/comments';
import { LikeList } from '@/types/like';

export const useDashboard = () => {
  const { redirectIfUnAuthorized, isAuthorized, user } = useAuth();
  const { likeList } = useLikeList(user);

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

  return {
    user,
    isAuthorized,
    redirectIfUnAuthorized,
    likedProjects,
    likedProjectsError,
    comments,
    commentsError,
  };
};
