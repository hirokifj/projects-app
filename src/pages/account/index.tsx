import { FC } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Avatar,
  Text,
  Center,
  Divider,
  Button,
  Stack,
} from '@chakra-ui/react';
import { WhiteBgBox } from '@/components/core/WhiteBgBox';
import { useAccount } from '@/hooks/pages/account/useAccount';

const Account: FC = () => {
  const { redirectIfUnAuthorized, user, isEmailUser } = useAccount();
  redirectIfUnAuthorized();

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      backgroundColor="gray.100"
    >
      <WhiteBgBox maxW="420px" width="90%" minH="320px">
        <Flex justifyContent="center" mt="-14">
          <Avatar name={user?.name} src={user?.imgPath} size="xl" />
        </Flex>
        <Center mt="4">
          <Text
            color="gray.700"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1"
          >
            {user?.name}
          </Text>
        </Center>
        <Divider mt="4" borderColor="gray.200" />
        <Stack spacing="4" width="70%" mt="4" mx="auto">
          <NextLink href="/account/settings" passHref>
            <Button as="a">ユーザー情報変更</Button>
          </NextLink>
          {isEmailUser && (
            <>
              <NextLink href="/account/email" passHref>
                <Button as="a">メールアドレス変更</Button>
              </NextLink>
              <NextLink href="/account/password" passHref>
                <Button as="a">パスワード変更</Button>
              </NextLink>
            </>
          )}
        </Stack>
      </WhiteBgBox>
    </Flex>
  );
};

export default Account;
