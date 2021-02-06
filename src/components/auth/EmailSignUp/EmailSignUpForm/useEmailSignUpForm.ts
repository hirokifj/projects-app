import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SignUpFormValue {
  readonly email: string;
  readonly password: string;
}

export const useEmailSignUpForm = (
  onSubmit: (data: SignUpFormValue) => Promise<void>,
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<SignUpFormValue>();

  const [loading, setLoading] = useState(false);

  const signUp = RHFhandleSubmit(async (data: SignUpFormValue) => {
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
    minLength: { value: 6, message: '6文字以上で入力してください。' },
  };

  const emailErrMsg = errors?.email?.message;
  const passwordErrMsg = errors?.password?.message;

  return {
    signUp,
    loading,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } as const;
};
