import { FC } from 'react';
import { Box, Stack, Heading, Divider, Skeleton } from '@chakra-ui/react';
import { useDashboardComments } from '@/hooks/pages/dashboard/comments/useDashboardComments';
import {
  UserCommentList,
  SkeletonUserCommentList,
} from '@/components/comment/UserCommentList';

const UserComments: FC = () => {
  const {
    isLoading,
    redirectIfUnAuthorized,
    comments,
    updateComment,
    deleteComment,
  } = useDashboardComments();
  redirectIfUnAuthorized();

  return (
    <Box width="100%" height="100%" backgroundColor="gray.100" py="10">
      <Stack spacing="6" maxW="640px" width="90%" mx="auto">
        <Box>
          {isLoading ? (
            <Skeleton width="160px" height="32px" />
          ) : (
            <Heading color="gray.600">Comments</Heading>
          )}
          <Divider mt="1" borderColor="gray.300" />
        </Box>
        <Box>
          {isLoading ? (
            <SkeletonUserCommentList />
          ) : (
            <UserCommentList
              comments={comments || []}
              onUpdateComment={updateComment}
              onDeleteComment={deleteComment}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default UserComments;
