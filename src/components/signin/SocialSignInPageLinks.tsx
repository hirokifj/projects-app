import { FC } from 'react';
import NextLink from 'next/link';
import { Center, Link } from '@chakra-ui/react';

const SocialSignInPageLinks: FC = () => (
  <Center>
    <NextLink href="/login/email" passHref>
      <Link fontSize="14px" color="blue.400">
        メールアドレスでログイン
      </Link>
    </NextLink>
  </Center>
);

export default SocialSignInPageLinks;
