import { useAuth } from '@/lib/auth';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';
import { useToast } from '@chakra-ui/react';
import { SignUpFormValue } from '@/components/auth/EmailSignUp/EmailSignUpForm';

export const useEmailSignUp = () => {
  const { redirectIfAuthorized, signUpWithEmail } = useAuth();
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
