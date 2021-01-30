import { FC } from 'react';
import { Box, Stack, Heading, Divider, Skeleton } from '@chakra-ui/react';
import { useDashboard } from '@/hooks/pages/dashboard/useDashboard';
import {
  UserLikedProjectList,
  SkeletonUserLikedProjectList,
} from '@/components/project/UserLikedProjectList';

const Dashboard: FC = () => {
  const { isLoading, redirectIfUnAuthorized, likedProjects } = useDashboard();
  redirectIfUnAuthorized();

  return (
    <Box width="100%" height="100%" backgroundColor="gray.100" py="10">
      <Stack spacing="6" maxW="640px" width="90%" mx="auto">
        <Box>
          {isLoading ? (
            <Skeleton width="80px" height="32px" />
          ) : (
            <Heading color="gray.600">Liked</Heading>
          )}
          <Divider mt="1" borderColor="gray.300" />
        </Box>
        <Box>
          {isLoading ? (
            <SkeletonUserLikedProjectList />
          ) : (
            <UserLikedProjectList projects={likedProjects || []} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
