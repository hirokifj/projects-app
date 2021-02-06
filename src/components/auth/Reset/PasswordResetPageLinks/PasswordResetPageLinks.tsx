import { FC } from 'react';
import NextLink from 'next/link';
import { Stack, Center, Link } from '@chakra-ui/react';

export const PasswordResetPageLinks: FC = () => (
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
);
