import { FC } from 'react';
import { Flex, Box, Heading, Divider, Skeleton } from '@chakra-ui/react';
import { WhiteBgBox } from '@/components/core/WhiteBgBox';
import { useAccountEmail } from '@/hooks/pages/account/email/useAccountEmail';
import {
  EmailEditForm,
  SkeletonEmailEditForm,
} from '@/components/user/EmailEditForm';

const AccountEmail: FC = () => {
  const { redirectIfUnAuthorized, email, updateEmail } = useAccountEmail();
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
          {!email ? (
            <Skeleton width="180px" height="28px" />
          ) : (
            'メールアドレス変更'
          )}
        </Heading>
        <Divider mt="1" borderColor="gray.300" />
        <Box mt="4">
          {!email ? (
            <SkeletonEmailEditForm />
          ) : (
            <EmailEditForm email={email} onSubmit={updateEmail} />
          )}
        </Box>
      </WhiteBgBox>
    </Flex>
  );
};

export default AccountEmail;
