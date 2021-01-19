import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';

const Header: FC = () => (
  <Box>
    <Flex
      maxW="1100px"
      width="90%"
      height="56px"
      mx="auto"
      justify="space-between"
      alignItems="center"
    >
      <Flex alignItems="center">
        <Heading mr="40px" lineHeight="1" size="lg">
          Finder
        </Heading>
        <NextLink href="/list" passHref>
          <Link>掲載リスト</Link>
        </NextLink>
      </Flex>
      <Flex>
        <NextLink href="/login" passHref>
          <Link>ログイン&nbsp;/&nbsp;登録</Link>
        </NextLink>
      </Flex>
    </Flex>
  </Box>
);

export default Header;
