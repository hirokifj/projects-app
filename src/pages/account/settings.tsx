import { FC } from 'react';
import { Flex, Box, Heading, Divider } from '@chakra-ui/react';
import { WhiteBgBox } from '@/components/core/WhiteBgBox';
import { useAccountSettings } from '@/hooks/pages/account/settings/useAccountSettings';
import {
  AccountSettingsForm,
  SkeletonAccountSettingForm,
} from '@/components/user/AccountSettingForm';

const AccountSettings: FC = () => {
  const { user, redirectIfUnAuthorized, updateUser } = useAccountSettings();
  redirectIfUnAuthorized();

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      backgroundColor="gray.100"
    >
      <WhiteBgBox maxW="480px" width="90%" px="6">
        <Heading fontSize="24px" color="gray.600">
          編集
        </Heading>
        <Divider mt="1" borderColor="gray.300" />
        <Box mt="4">
          {!user ? (
            <SkeletonAccountSettingForm />
          ) : (
            <AccountSettingsForm userData={user} onSubmit={updateUser} />
          )}
        </Box>
      </WhiteBgBox>
    </Flex>
  );
};

export default AccountSettings;
