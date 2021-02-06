import { FC } from 'react';
import { Flex, Stack, StackDivider, Heading, Center } from '@chakra-ui/react';
import { SignUpForm } from '@/components/auth/EmailSignUp/EmailSignUpForm/SignUpForm';
import { SignUpPageLinks } from '@/components/auth/EmailSignUp/SignUpPageLinks/SignUpPageLinks';
import { useEmailSignUp } from '@/hooks/pages/signup/useEmailSignUp';

const SignUp: FC = () => {
  const { redirectIfAuthorized, signUp } = useEmailSignUp();
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
        borderRadius={8}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={6}
      >
        <Center>
          <Heading as="h1" size="3xl">
            Finder
          </Heading>
        </Center>
        <Stack direction="column" width="90%" mx="auto" spacing={8}>
          <SignUpForm onSubmit={signUp} />
          <SignUpPageLinks />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SignUp;
