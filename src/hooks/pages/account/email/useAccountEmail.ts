import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { fetchUserEmail, updateUserEmail } from '@/api/user';
import { EmailEditFormValue } from '@/components/user/EmailEditForm';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

export const useAccountEmail = () => {
  const { redirectIfUnAuthorized, user } = useAuth();
  const [email, setEmail] = useState('');
  const router = useRouter();
  const toast = useToast();

  const isNotEmailUser = user && user?.provider !== 'password';

  useEffect(() => {
    if (isNotEmailUser) {
      router.push('/account');
      return;
    }

    const currentEmail = fetchUserEmail();
    if (currentEmail) {
      setEmail(currentEmail);
    }
  }, [isNotEmailUser, router]);

  const updateEmail = async (data: EmailEditFormValue): Promise<void> => {
    if (email === data.email) return;

    try {
      await updateUserEmail(data.email, data.password);

      router.push('/account');
      toast({
        title: '',
        description: 'メールアドレスを更新しました。',
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
    user,
    email,
    redirectIfUnAuthorized,
    updateEmail,
  } as const;
};
