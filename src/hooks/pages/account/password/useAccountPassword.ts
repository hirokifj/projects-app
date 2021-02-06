import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { updatePassword as _updatePassword } from '@/api/user';
import { PasswordEditFormValue } from '@/components/user/PasswordEditForm';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

export const useAccountPassword = () => {
  const { redirectIfUnAuthorized, isAuthorized, user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const isNotEmailUser = user && user?.provider !== 'password';

  useEffect(() => {
    if (isNotEmailUser) {
      router.push('/account');
    }
  }, [isNotEmailUser, router]);

  const updatePassword = async ({
    newPassword,
    currentPassword,
  }: PasswordEditFormValue): Promise<void> => {
    try {
      await _updatePassword(newPassword, currentPassword);

      router.push('/account');
      toast({
        title: '',
        description: 'パスワードを更新しました。',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: getFirebaseErrMsgInJP(error),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    redirectIfUnAuthorized,
    isAuthorized,
    updatePassword,
  } as const;
};
