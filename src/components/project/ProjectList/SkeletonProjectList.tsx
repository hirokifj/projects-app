import { FC } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import SkeletonProjectCard from '@/components/project/ProjectCard/SkeletonProjectCard';

const SkeletonProjectList: FC = () => (
  <Stack spacing={6} width="100%">
    <Box>
      <SkeletonProjectCard />
    </Box>
    <Box>
      <SkeletonProjectCard />
    </Box>
  </Stack>
);

export default SkeletonProjectList;
