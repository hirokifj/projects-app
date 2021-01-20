import { FC } from 'react';
import { Stack } from '@chakra-ui/react';
import { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';

export const CommentList: FC<{ comments: Comment[] }> = ({ comments }) => (
  <Stack spacing="16">
    {comments.map((comment) => (
      <CommentItem key={comment.id} comment={comment} />
    ))}
  </Stack>
);
