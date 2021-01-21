import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import firebase from 'firebase';
import { getFirebaseErrMsgInJP } from '@/utils/firebase';
import { useToast } from '@chakra-ui/react';

export interface SignInFormValue {
  readonly email: string;
  readonly password: string;
}

export const useFirebaseEmailSignIn = () => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<SignInFormValue>();
  const { signInWithEmail } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const signIn = RHFhandleSubmit((data: SignInFormValue) => {
    setLoading(true);
    signInWithEmail(data.email, data.password).catch(
      (error: firebase.FirebaseError) => {
        const errMsg = getFirebaseErrMsgInJP(error);

        setLoading(false);
        toast({
          title: 'エラー',
          description: errMsg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    );
  });

  const emailRules = {
    required: 'メールアドレスを入力してください。',
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'メールアドレスを入力してください。',
    },
  };
  const passwordRules = {
    required: 'パスワードを入力してください。',
  };

  const emailErrMsg = errors?.email?.message;
  const passwordErrMsg = errors?.password?.message;

  return {
    signIn,
    loading,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } as const;
};
