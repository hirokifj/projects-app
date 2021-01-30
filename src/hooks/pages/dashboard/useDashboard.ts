import { useAuth } from '@/lib/auth';
import { useQuery } from 'react-query';
import { useLikeList } from '@/hooks/shared/like/useLikeList';
import { fetchUserLikedProjects } from '@/api/projects';
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

  const isLoading = !isAuthorized || !likedProjects;

  return {
    isLoading,
    isAuthorized,
    redirectIfUnAuthorized,
    likedProjects,
    likedProjectsError,
  } as const;
};
