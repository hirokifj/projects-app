import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SignInFormValue {
  readonly email: string;
  readonly password: string;
}

export const useEmailSignIn = (
  onSubmit: (data: SignInFormValue) => Promise<void>,
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<SignInFormValue>();

  const [loading, setLoading] = useState(false);

  const signIn = RHFhandleSubmit(async (data: SignInFormValue) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
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
