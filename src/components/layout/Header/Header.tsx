import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react';
import { useHeader } from './useHeader';

export const Header: FC = () => {
  const { isUnAuthorized } = useHeader();

  return (
    <Box>
      <Flex
        maxW="1100px"
        width="90%"
        height="72px"
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
          {isUnAuthorized && (
            <NextLink href="/login" passHref>
              <Button as="a" colorScheme="gray">
                ログイン&nbsp;/&nbsp;登録
              </Button>
            </NextLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
