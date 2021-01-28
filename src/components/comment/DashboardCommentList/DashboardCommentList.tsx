import { FC } from 'react';
import NextLink from 'next/link';
import { Flex, Stack, Text, Button, Box } from '@chakra-ui/react';
import { Comment } from '@/types/comment';

export const DashboardCommentList: FC<{ comments: Comment[] }> = ({
  comments,
}) => (
  <Stack spacing="4">
    {comments.map((comment) => (
      <Flex
        key={comment.id}
        alignItems="center"
        width="100%"
        borderRadius={8}
        backgroundColor="white"
        px={4}
        py={4}
      >
        <Box width="60%" mr="auto" lineHeight="1">
          <NextLink href={`/projects/${comment.projectId}`} passHref>
            <Flex>
              <Text
                isTruncated
                color="blue.500"
                fontSize="14px"
                borderBottom="1px solid transparent"
                cursor="pointer"
                _hover={{ borderBottom: '1px solid currentColor' }}
              >
                {comment.projectTitle}
              </Text>
            </Flex>
          </NextLink>
          <Text isTruncated mt="4" color="gray.600" fontSize="14px">
            {comment.body}
          </Text>
        </Box>
        <Flex>
          <Button mr="4" colorScheme="green" size="sm">
            編集
          </Button>
          <Button colorScheme="red" size="sm">
            削除
          </Button>
        </Flex>
      </Flex>
    ))}
  </Stack>
);
