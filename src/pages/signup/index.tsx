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
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
}

const Login: FC = () => {
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { handleSubmit, register, errors } = useForm<FormValue>();
  const { redirectIfAuthorized, authState } = useAuth();
  redirectIfAuthorized(authState);

  const submit = ({ email, password }: FormValue) => {
    console.log(email, password);
  };

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
          <Stack
            as="form"
            spacing={6}
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <FormControl
              id="email"
              isInvalid={errors.email && !!errors.email.message}
            >
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="text"
                name="email"
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isInvalid={errors.password && !!errors.password.message}
            >
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                name="password"
                ref={register({
                  required: true,
                  min: 6,
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
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
