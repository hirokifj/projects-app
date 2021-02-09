import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Heading, Button, Avatar } from '@chakra-ui/react';
import { useHeader } from './useHeader';

export const Header: FC = () => {
  const { isAuthorized, isUnAuthorized, user } = useHeader();

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
          {isAuthorized && (
            <NextLink href="/account" passHref>
              <Box as="a">
                <Avatar
                  name={user?.name}
                  src={user?.imgPath}
                  size="md"
                  borderWidth="2px"
                  borderColor="gray.200"
                  transition="background-color 0.4s"
                  _hover={{
                    bg: 'black',
                    opacity: '0.8',
                  }}
                />
              </Box>
            </NextLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
