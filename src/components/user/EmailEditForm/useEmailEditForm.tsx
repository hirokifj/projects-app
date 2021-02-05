import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface EmailEditFormValue {
  readonly email: string;
  readonly password: string;
}

export const useEmailEditForm = (
  onSubmit: (data: EmailEditFormValue) => Promise<void>,
  initialValue: {
    email: string;
  },
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<EmailEditFormValue>({
    defaultValues: {
      email: initialValue.email,
    },
  });
  const [processing, setProcessing] = useState(false);

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

  const handleSubmit = RHFhandleSubmit(async (data) => {
    if (processing) return;
    setProcessing(true);
    try {
      await onSubmit(data);
    } finally {
      setProcessing(false);
    }
  });

  return {
    handleSubmit,
    processing,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } as const;
};
