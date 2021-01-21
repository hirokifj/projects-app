import { useAuth } from '@/lib/auth';
import firebase from 'firebase';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';
import { useToast } from '@chakra-ui/react';

export const useSocialSignIn = () => {
  const auth = useAuth();
  const toast = useToast();

  const signInWithGoogle = () => {
    auth.signInWithGoogle().catch((error: firebase.FirebaseError) => {
      const errMsg = getFirebaseErrMsgInJP(error);

      toast({
        title: 'エラー',
        description: errMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const signInWithGithub = () => {
    auth.signInWithGithub().catch((error: firebase.FirebaseError) => {
      const errMsg = getFirebaseErrMsgInJP(error);

      toast({
        title: 'エラー',
        description: errMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return {
    signInWithGoogle,
    signInWithGithub,
  } as const;
};
