import { useAuth } from '@/lib/auth';
import { useToast } from '@chakra-ui/react';
import { signInWithEmail } from '@/api/user';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

import { SignInFormValue } from '@/components/auth/EmailSignIn/EmailSignInForm';

export const useEmailLogin = () => {
  const { redirectIfAuthorized } = useAuth();
  const toast = useToast();

  const signIn = async ({
    email,
    password,
  }: SignInFormValue): Promise<void> => {
    try {
      await signInWithEmail(email, password);
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
    redirectIfAuthorized,
    signIn,
  } as const;
};
