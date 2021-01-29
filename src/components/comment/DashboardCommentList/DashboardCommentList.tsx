import { FC } from 'react';
import NextLink from 'next/link';
import { Flex, Stack, Text, Button, Box } from '@chakra-ui/react';
import { CommentEditModal } from '@/components/comment/CommentEditModal';
import { Comment } from '@/types/comment';

interface Prop {
  comments: Comment[];
  onUpdateComment: (
    commentId: Comment['id'],
  ) => (commentBody: Comment['body']) => Promise<void>;
}

export const DashboardCommentList: FC<Prop> = ({
  comments,
  onUpdateComment,
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
          <Box mr="4">
            <CommentEditModal
              commentBody={comment.body}
              onSubmit={onUpdateComment(comment.id)}
            />
          </Box>
          <Button colorScheme="red" size="sm">
            削除
          </Button>
        </Flex>
      </Flex>
    ))}
  </Stack>
);
