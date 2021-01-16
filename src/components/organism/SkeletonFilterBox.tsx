import { FC } from 'react';
import { Box, Stack, Skeleton } from '@chakra-ui/react';

const SkeletonTagsFilterBox: FC = () => (
  <Box
    width="100%"
    background="white"
    borderRadius={8}
    backgroundColor="white"
    px={4}
    py={4}
  >
    <Stack spacing={4}>
      <Box>
        <Skeleton width="40px" height="16px" />
        <Skeleton width="100%" height="36px" mt="2" />
      </Box>
      <Box>
        <Skeleton width="32px" height="16px" />
        <Skeleton width="100%" height="36px" mt="2" />
      </Box>
    </Stack>
  </Box>
);

export default SkeletonTagsFilterBox;
