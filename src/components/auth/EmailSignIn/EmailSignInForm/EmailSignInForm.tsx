import { FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack, Box, Link } from '@chakra-ui/react';
import { InputControl } from '@/components/core/InputControl';
import { useEmailSignIn, SignInFormValue } from './useEmailSignInForm';

export const EmailSignInForm: FC<{
  onSubmit: (data: SignInFormValue) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    signIn,
    loading,
    RHFRegister,
    emailRules,
    passwordRules,
    emailErrMsg,
    passwordErrMsg,
  } = useEmailSignIn(onSubmit);

  return (
    <Stack as="form" spacing={6} onSubmit={signIn}>
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
      <Box>
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
        <Box mt="2" textAlign="right">
          <NextLink href="/login/reset" passHref>
            <Link fontSize="14px" color="blue.400">
              パスワードをお忘れですか？
            </Link>
          </NextLink>
        </Box>
      </Box>

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
        ログイン
      </Button>
    </Stack>
  );
};
