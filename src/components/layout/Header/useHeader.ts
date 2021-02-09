import { useAuth } from '@/contexts/auth';

export const useHeader = () => {
  const { isAuthorized, isUnAuthorized, user } = useAuth();

  return {
    isAuthorized,
    isUnAuthorized,
    user,
  } as const;
};
