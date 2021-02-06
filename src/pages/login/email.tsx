import { FC } from 'react';
import { Flex, Stack, StackDivider, Heading, Center } from '@chakra-ui/react';
import { EmailSignInForm } from '@/components/auth/EmailSignIn/EmailSignInForm';
import { EmailSignInPageLinks } from '@/components/auth/EmailSignIn/EmailSignInPgaeLinks';
import { useEmailLogin } from '@/hooks/pages/login/email/useEmailLogin';

const Login: FC = () => {
  const { redirectIfAuthorized, signIn } = useEmailLogin();
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
          <EmailSignInForm onSubmit={signIn} />
          <EmailSignInPageLinks />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
