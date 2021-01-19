import { FC } from 'react';
import {
  Box,
  Flex,
  AspectRatio,
  Stack,
  Wrap,
  WrapItem,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

export const SkeletonProjectCard: FC = () => (
  <Box>
    <Box
      as="a"
      display="block"
      width="100%"
      minHeight="100%"
      borderRadius={8}
      backgroundColor="white"
      px={4}
      py={4}
    >
      <Flex>
        <Box width="27%" mr="24px" flexShrink={0}>
          <AspectRatio maxW="100%" ratio={4 / 3}>
            <Skeleton />
          </AspectRatio>
        </Box>
        <Box flexGrow={1}>
          <Stack spacing={4}>
            <Box>
              <Skeleton width="60%" height="16px" />
              <SkeletonText mt="4" noOfLines={2} spacing="2" />
            </Box>
            <Wrap>
              <WrapItem>
                <Skeleton width="40px" height="20px" />
              </WrapItem>
              <WrapItem>
                <Skeleton width="70px" height="20px" />
              </WrapItem>
            </Wrap>
            <Flex alignItems="flex-start" justify="space-between">
              <Skeleton width="40px" height="20px" />
              <Skeleton width="60px" height="40px" />
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  </Box>
);
