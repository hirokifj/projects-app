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
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const Login: FC = () => {
  const { redirectIfAuthorized, authState } = useAuth();
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
          <Stack as="form" spacing={6}>
            <FormControl id="email">
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>パスワード</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button
              height="52px"
              backgroundColor="gray.900"
              color="white"
              variant="outline"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              登録
            </Button>
          </Stack>
          <Stack direction="column" spacing={4}>
            <Center>
              <NextLink href="/login" passHref>
                <Link fontSize="14px" color="blue.400">
                  SNSアカウントでログイン
                </Link>
              </NextLink>
            </Center>
            <Center>
              <NextLink href="/login/email" passHref>
                <Link fontSize="14px" color="blue.400">
                  メールアドレスでログイン
                </Link>
              </NextLink>
            </Center>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
