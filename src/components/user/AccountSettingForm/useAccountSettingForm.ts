import { useState } from 'react';
import { User } from '@/types/user';
import { useForm } from 'react-hook-form';

export interface AccountSettingsFormValue {
  readonly userName: string;
  readonly userImg: FileList;
}

export const useAccountSettingForm = (
  onSubmit: (data: AccountSettingsFormValue) => Promise<void>,
  initialValue: {
    userName: User['name'];
  },
) => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
    setValue,
  } = useForm<AccountSettingsFormValue>({
    defaultValues: {
      userName: initialValue.userName,
    },
  });
  const [processing, setProcessing] = useState(false);

  const userNameRules = {
    required: 'ユーザーネームを入力してください。',
  };
  const userNameErrMsg = errors?.userName?.message;

  const handleSubmit = RHFhandleSubmit((data: AccountSettingsFormValue) => {
    if (processing) return;
    setProcessing(true);

    onSubmit(data).finally(() => {
      setProcessing(false);
    });
  });

  const handleImgInputReset = () => {
    setValue('userImg', undefined);
  };

  return {
    handleSubmit,
    handleImgInputReset,
    processing,
    RHFRegister,
    userNameRules,
    userNameErrMsg,
  } as const;
};
