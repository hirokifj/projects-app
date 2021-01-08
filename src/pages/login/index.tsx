import { FC } from 'react';
import NextLink from 'next/link';
import { useAuth } from '@/lib/auth';
import {
  Flex,
  Button,
  Stack,
  StackDivider,
  Heading,
  Center,
  Link,
} from '@chakra-ui/react';

const Login: FC = () => {
  const {
    redirectIfAuthorized,
    authState,
    signInWithGoogle,
    signInWithGithub,
  } = useAuth();
  redirectIfAuthorized(authState);

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
          <Stack spacing={4}>
            <Button
              height="48px"
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)',
              }}
              onClick={() => signInWithGoogle()}
            >
              Googleでログイン
            </Button>
            <Button
              height="48px"
              backgroundColor="gray.900"
              color="white"
              variant="outline"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
              onClick={() => signInWithGithub()}
            >
              GitHubでログイン
            </Button>
          </Stack>
          <Center>
            <NextLink href="/login/email" passHref>
              <Link fontSize="14px" color="blue.400">
                メールアドレスでログイン
              </Link>
            </NextLink>
          </Center>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
