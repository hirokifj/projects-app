import { FC } from 'react';
import { useAuth } from '@/lib/auth';
import { Flex, Stack, StackDivider, Heading, Center } from '@chakra-ui/react';
import SocialSignInButtons from '@/components/organism/SocialSignInButtons';
import SocialSignInPageLinks from '@/components/organism/SocialSignInPageLinks';

const Login: FC = () => {
  const { redirectIfAuthorized } = useAuth();
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
        width="420px"
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
        <Stack direction="column" width="80%" mx="auto" spacing={8}>
          <SocialSignInButtons />
          <SocialSignInPageLinks />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
