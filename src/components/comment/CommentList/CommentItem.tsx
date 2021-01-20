import { FC } from 'react';
import { Flex, Box, Avatar, Stack, Text } from '@chakra-ui/react';
import { Comment } from '@/types/comment';
import { MultilineText } from '@/components/core/MultilineText';
import { formatDate } from '@/utils/date';

export const CommentItem: FC<{ comment: Comment }> = ({ comment }) => (
  <Flex alignItems="flex-start">
    <Box mr="40px">
      <Avatar name={comment.userName} src={comment.userImgPath} />
    </Box>
    <Stack spacing="4">
      <Flex lineHeight="1" alignItems="flex-start">
        <Text fontSize="14px" fontWeight="bold" color="gray.600" mr="16px">
          {comment.userName}
        </Text>
        <Text fontSize="14px" color="gray.500">
          {formatDate(comment.createdAt)}
        </Text>
      </Flex>
      <MultilineText text={comment.body} />
    </Stack>
  </Flex>
);
