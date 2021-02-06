import { useAuth } from '@/contexts/auth';
import { useToast } from '@chakra-ui/react';
import { PasswordResetFormValue } from '@/components/auth/Reset/PasswordResetForm';
import { sendPasswordResetEmail } from '@/api/user';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';

export const usePasswordReset = () => {
  const { redirectIfAuthorized } = useAuth();
  const toast = useToast();

  const sendEmail = async ({
    email,
  }: PasswordResetFormValue): Promise<void> => {
    try {
      await sendPasswordResetEmail(email);

      toast({
        title: '',
        description: 'パスワード再設定メールを送信しました。',
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
    redirectIfAuthorized,
    sendEmail,
  } as const;
};
