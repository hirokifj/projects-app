import { FC } from 'react';
import { Flex, Stack, StackDivider, Heading, Center } from '@chakra-ui/react';
import { PasswordResetForm } from '@/components/auth/Reset/PasswordResetForm';
import { PasswordResetPageLinks } from '@/components/auth/Reset/PasswordResetPageLinks';
import { usePasswordReset } from '@/hooks/pages/login/reset/usePasswordReset';

const Login: FC = () => {
  const { redirectIfAuthorized, sendEmail } = usePasswordReset();
  redirectIfAuthorized();

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      backgroundColor="gray.100"
    >
      <Stack
        width="460px"
        maxW="90%"
        px={6}
        py={10}
        backgroundColor="white"
        borderRadius={[0, 8]}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={6}
      >
        <Center>
          <Heading as="h1" size="3xl">
            Finder
          </Heading>
        </Center>
        <Stack direction="column" width="90%" mx="auto" spacing={8}>
          <PasswordResetForm onSubmit={sendEmail} />
          <PasswordResetPageLinks />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
