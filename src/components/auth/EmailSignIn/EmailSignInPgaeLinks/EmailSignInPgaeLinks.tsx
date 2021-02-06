import { FC } from 'react';
import NextLink from 'next/link';
import { Stack, Center, Link } from '@chakra-ui/react';

export const EmailSignInPageLinks: FC = () => (
  <Stack direction="column" spacing={4}>
    <Center>
      <NextLink href="/login" passHref>
        <Link fontSize="14px" color="blue.400">
          SNSアカウントでログイン
        </Link>
      </NextLink>
    </Center>
    <Center>
      <NextLink href="/signup" passHref>
        <Link fontSize="14px" color="blue.400">
          メールアドレスで登録
        </Link>
      </NextLink>
    </Center>
  </Stack>
);
