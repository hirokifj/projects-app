import { useAuth } from '@/contexts/auth';
import { useToast } from '@chakra-ui/react';
import { signUpWithEmail } from '@/api/user';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

import { SignUpFormValue } from '@/components/auth/EmailSignUp/EmailSignUpForm';

export const useEmailSignUp = () => {
  const { redirectIfAuthorized } = useAuth();
  const toast = useToast();

  const signUp = async ({
    email,
    password,
  }: SignUpFormValue): Promise<void> => {
    try {
      await signUpWithEmail(email, password);
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
    signUp,
  } as const;
};
