import { FC } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import {
  usePasswordEditForm,
  PasswordEditFormValue,
} from './usePasswordEditForm';

export const PasswordEditForm: FC<{
  onSubmit: (data: PasswordEditFormValue) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    handleSubmit,
    processing,
    RHFRegister,
    newPasswordRules,
    currentPasswordRules,
    newPasswordErrMsg,
    currentPasswordErrMsg,
  } = usePasswordEditForm(onSubmit);

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing="6">
        <InputControl
          inputId="newPassword"
          name="newPassword"
          type="password"
          label="新しいパスワード"
          register={RHFRegister}
          rules={newPasswordRules}
          isInvalid={!!newPasswordErrMsg}
          errorMsg={newPasswordErrMsg}
        />
        <InputControl
          inputId="currentPassword"
          name="currentPassword"
          type="password"
          label="現在のパスワード"
          register={RHFRegister}
          rules={currentPasswordRules}
          isInvalid={!!currentPasswordErrMsg}
          errorMsg={currentPasswordErrMsg}
        />
      </Stack>
      <Box textAlign="right" mt="4">
        <Button type="submit" width="120px" isLoading={processing}>
          送信
        </Button>
      </Box>
    </Box>
  );
};
