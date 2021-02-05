import { FC } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import { useEmailEditForm, EmailEditFormValue } from './useEmailEditForm';

export const EmailEditForm: FC<{
  email: string;
  onSubmit: (data: EmailEditFormValue) => Promise<void>;
}> = ({ email, onSubmit }) => {
  const {
    handleSubmit,
    processing,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } = useEmailEditForm(onSubmit, { email });

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing="6">
        <InputControl
          inputId="email"
          name="email"
          type="text"
          label="メールアドレス"
          register={RHFRegister}
          rules={emailRules}
          isInvalid={!!emailErrMsg}
          errorMsg={emailErrMsg}
        />
        <InputControl
          inputId="password"
          name="password"
          type="password"
          label="パスワード"
          register={RHFRegister}
          rules={passwordRules}
          isInvalid={!!passwordErrMsg}
          errorMsg={passwordErrMsg}
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
