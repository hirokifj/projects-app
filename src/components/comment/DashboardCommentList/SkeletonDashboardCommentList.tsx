import { FC } from 'react';
import { Flex, Stack, Text, SkeletonText, Skeleton } from '@chakra-ui/react';

export const SkeletonDashboardCommentList: FC = () => (
  <Stack spacing="4">
    <Flex
      alignItems="center"
      width="100%"
      borderRadius={8}
      backgroundColor="white"
      px={4}
      py={4}
    >
      <Stack spacing="4" width="60%" mr="auto" lineHeight="1">
        <Text>
          <SkeletonText width="60%" noOfLines={1} />
        </Text>
        <Text>
          <SkeletonText width="80%" noOfLines={1} />
        </Text>
      </Stack>
      <Flex>
        <Skeleton mr="4" width="50px" height="30px" />
        <Skeleton width="50px" height="30px" />
      </Flex>
    </Flex>

    <Flex
      alignItems="center"
      width="100%"
      borderRadius={8}
      backgroundColor="white"
      px={4}
      py={4}
    >
      <Stack spacing="4" width="60%" mr="auto" lineHeight="1">
        <Text>
          <SkeletonText width="40%" noOfLines={1} />
        </Text>
        <Text>
          <SkeletonText noOfLines={1} />
        </Text>
      </Stack>
      <Flex>
        <Skeleton mr="4" width="50px" height="30px" />
        <Skeleton width="50px" height="30px" />
      </Flex>
    </Flex>
  </Stack>
);
