import { Stack, Box, Flex, Wrap, WrapItem, Skeleton } from '@chakra-ui/react';

export const SkeletonUserLikedProjectList = () => (
  <Stack spacing="4">
    <Box display="block" px={4} py={4} backgroundColor="white" borderRadius={8}>
      <Skeleton width="60%" height="20px" />
      <Wrap mt="2">
        <WrapItem>
          <Skeleton width="30px" height="20px" />
        </WrapItem>
        <WrapItem>
          <Skeleton width="50px" height="20px" />
        </WrapItem>
      </Wrap>
      <Flex justifyContent="flex-end" mt="16px">
        <Skeleton width="40px" height="16px" mr="2" />
        <Skeleton width="60px" height="16px" />
      </Flex>
    </Box>
    <Box display="block" px={4} py={4} backgroundColor="white" borderRadius={8}>
      <Skeleton width="40%" height="20px" />
      <Wrap mt="2">
        <WrapItem>
          <Skeleton width="30px" height="20px" />
        </WrapItem>
        <WrapItem>
          <Skeleton width="50px" height="20px" />
        </WrapItem>
        <WrapItem>
          <Skeleton width="30px" height="20px" />
        </WrapItem>
      </Wrap>
      <Flex justifyContent="flex-end" mt="16px">
        <Skeleton width="40px" height="16px" mr="2" />
        <Skeleton width="60px" height="16px" />
      </Flex>
    </Box>
  </Stack>
);
