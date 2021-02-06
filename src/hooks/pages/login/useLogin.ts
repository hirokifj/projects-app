import { useAuth } from '@/lib/auth';
import { useToast } from '@chakra-ui/react';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

export const useLogin = () => {
  const {
    redirectIfAuthorized,
    signInWithGoogle: _signInWithGoogle,
    signInWithGithub: _signInWithGithub,
  } = useAuth();
  const toast = useToast();

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await _signInWithGoogle();
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

  const signInWithGithub = async (): Promise<void> => {
    try {
      await _signInWithGithub();
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
    signInWithGoogle,
    signInWithGithub,
  } as const;
};
