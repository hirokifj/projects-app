import { FC } from 'react';
import { Flex, Box, Heading, Divider, Skeleton } from '@chakra-ui/react';
import { WhiteBgBox } from '@/components/core/WhiteBgBox';
import { useAccountPassword } from '@/hooks/pages/account/password/useAccountPassword';
import {
  PasswordEditForm,
  SkeletonPasswordEditForm,
} from '@/components/user/PasswordEditForm';

const AccountPassword: FC = () => {
  const {
    redirectIfUnAuthorized,
    isAuthorized,
    updatePassword,
  } = useAccountPassword();
  redirectIfUnAuthorized();

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      backgroundColor="gray.100"
    >
      <WhiteBgBox maxW="420px" width="90%" px="6">
        <Heading fontSize="24px" color="gray.600">
          {!isAuthorized ? (
            <Skeleton width="180px" height="28px" />
          ) : (
            'パスワード変更'
          )}
        </Heading>
        <Divider mt="1" borderColor="gray.300" />
        <Box mt="4">
          {!isAuthorized ? (
            <SkeletonPasswordEditForm />
          ) : (
            <PasswordEditForm onSubmit={updatePassword} />
          )}
        </Box>
      </WhiteBgBox>
    </Flex>
  );
};

export default AccountPassword;
