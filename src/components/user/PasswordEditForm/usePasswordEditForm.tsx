import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface PasswordEditFormValue {
  readonly newPassword: string;
  readonly currentPassword: string;
}

export const usePasswordEditForm = (
  onSubmit: (data: PasswordEditFormValue) => Promise<void>,
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
  } = useForm<PasswordEditFormValue>();
  const [processing, setProcessing] = useState(false);

  const newPasswordRules = {
    required: '新しいパスワードを入力してください。',
  };

  const currentPasswordRules = {
    required: '現在のパスワードを入力してください。',
  };

  const newPasswordErrMsg = errors?.newPassword?.message;
  const currentPasswordErrMsg = errors?.currentPassword?.message;

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
    newPasswordRules,
    currentPasswordRules,
    newPasswordErrMsg,
    currentPasswordErrMsg,
  } as const;
};
