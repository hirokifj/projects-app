import { User } from '@/types/user';
import { useForm } from 'react-hook-form';

export interface AccountSettingsFormValue {
  readonly userName: string;
  readonly userImg: FileList;
}

export const useAccountSettingForm = (
  onSubmit: (data: AccountSettingsFormValue) => void,
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

  const userNameRules = {
    required: 'ユーザーネームを入力してください。',
  };
  const userNameErrMsg = errors?.userName?.message;

  const handleSubmit = RHFhandleSubmit(onSubmit);

  const handleImgInputReset = () => {
    setValue('userImg', undefined);
  };

  return {
    handleSubmit,
    handleImgInputReset,
    RHFRegister,
    userNameRules,
    userNameErrMsg,
  } as const;
};
