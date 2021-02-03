import { FC } from 'react';
import { Stack, Flex, Skeleton } from '@chakra-ui/react';

export const SkeletonAccountSettingForm: FC = () => (
  <Stack spacing="6">
    <Stack spacing="2">
      <Skeleton width="60px" height="20px" />
      <Skeleton width="100%" height="32px" />
    </Stack>
    <Stack spacing="4">
      <Skeleton width="90px" height="90px" borderRadius="50%" />
      <Skeleton width="120px" height="26px" />
    </Stack>
    <Flex justifyContent="flex-end">
      <Skeleton width="110px" height="36px" />
    </Flex>
  </Stack>
);
