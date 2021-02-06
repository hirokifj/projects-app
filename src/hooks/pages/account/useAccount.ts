import { useAuth } from '@/contexts/auth';

export const useAccount = () => {
  const { redirectIfUnAuthorized, user } = useAuth();

  const isEmailUser = user && user?.provider === 'password';

  return {
    redirectIfUnAuthorized,
    user,
    isEmailUser,
  } as const;
};
