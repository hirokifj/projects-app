import { useAuth } from '@/lib/auth';
import { useToast } from '@chakra-ui/react';
import {
  signInWithGoogle as _signInWithGoogle,
  signInWithGithub as _signInWithGithub,
} from '@/api/user';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

export const useLogin = () => {
  const { redirectIfAuthorized } = useAuth();
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
