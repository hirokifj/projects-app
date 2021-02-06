import { FC } from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import {
  usePasswordResetForm,
  PasswordResetFormValue,
} from './usePasswordResetForm';

export const PasswordResetForm: FC<{
  onSubmit: (data: PasswordResetFormValue) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    message,
    loading,
    isDone,
    sendEmail,
    RHFRegister,
    emailRules,
    emailErrMsg,
  } = usePasswordResetForm(onSubmit);

  return (
    <Stack as="form" spacing={6} onSubmit={sendEmail}>
      <Text textAlign="center" lineHeight="1.6" color="gray.500">
        {message}
      </Text>
      <InputControl
        inputId="email"
        type="text"
        name="email"
        label="メールアドレス"
        register={RHFRegister}
        rules={emailRules}
        isInvalid={!!emailErrMsg}
        errorMsg={emailErrMsg}
      />
      <Button
        type="submit"
        height="52px"
        backgroundColor="gray.900"
        color="white"
        variant="outline"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        isLoading={loading}
        disabled={isDone}
      >
        送信
      </Button>
    </Stack>
  );
};
