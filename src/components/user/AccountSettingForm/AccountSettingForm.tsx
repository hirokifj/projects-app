import { FC } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import { PreviewImgInputControl } from '@/components/core/PreviewImgInputControl';
import { User } from '@/types/user';
import {
  useAccountSettingForm,
  AccountSettingsFormValue,
} from './useAccountSettingForm';

export const AccountSettingsForm: FC<{
  userData: User;
  onSubmit: (data: AccountSettingsFormValue) => Promise<void> | undefined;
}> = ({ userData, onSubmit }) => {
  const {
    handleSubmit,
    processing,
    handleImgInputReset,
    RHFRegister,
    userNameRules,
    userNameErrMsg,
  } = useAccountSettingForm(onSubmit, {
    userName: userData.name,
  });

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing="6">
        <InputControl
          inputId="userName"
          name="userName"
          type="text"
          label="ユーザーネーム"
          register={RHFRegister}
          rules={userNameRules}
          isInvalid={!!userNameErrMsg}
          errorMsg={userNameErrMsg}
        />
        <PreviewImgInputControl
          initialValue={userData.imgPath}
          name="userImg"
          inputId="userImg"
          register={RHFRegister}
          onReset={handleImgInputReset}
        />
      </Stack>
      <Box textAlign="right" mt="2">
        <Button type="submit" width="120px" isLoading={processing}>
          送信
        </Button>
      </Box>
    </Box>
  );
};
