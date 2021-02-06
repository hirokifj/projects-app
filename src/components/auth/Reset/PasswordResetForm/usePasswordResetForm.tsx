import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface PasswordResetFormValue {
  readonly email: string;
}

export const usePasswordResetForm = (
  onSubmit: (data: PasswordResetFormValue) => Promise<void>,
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<PasswordResetFormValue>();

  const [message, setMessage] = useState(
    'ご登録のメールアドレスにパスワード再設定URLをお送りします。',
  );

  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const sendEmail = RHFhandleSubmit(async (data: PasswordResetFormValue) => {
    setLoading(true);
    try {
      await onSubmit(data);
      setMessage('メールボックスをご確認ください。');
      setIsDone(true);
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

  const emailErrMsg = errors?.email?.message;

  return {
    message,
    loading,
    isDone,
    sendEmail,
    RHFRegister,
    emailRules,
    emailErrMsg,
  } as const;
};
