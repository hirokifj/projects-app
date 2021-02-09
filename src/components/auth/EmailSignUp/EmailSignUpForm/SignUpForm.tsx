import { FC } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import { useEmailSignUpForm, SignUpFormValue } from './useEmailSignUpForm';

export const SignUpForm: FC<{
  onSubmit: (data: SignUpFormValue) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    signUp,
    loading,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } = useEmailSignUpForm(onSubmit);

  return (
    <Stack as="form" spacing={6} onSubmit={signUp}>
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
      <InputControl
        inputId="password"
        type="password"
        name="password"
        label="パスワード"
        register={RHFRegister}
        rules={passwordRules}
        isInvalid={!!passwordErrMsg}
        errorMsg={passwordErrMsg}
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
      >
        Sign Up
      </Button>
    </Stack>
  );
};
