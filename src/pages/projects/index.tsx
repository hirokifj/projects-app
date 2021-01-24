import { FC } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useProjects } from '@/hooks/pages/projects/useProjects';
import {
  ProjectList,
  SkeletonProjectList,
} from '@/components/project/ProjectList/';
import {
  ProjectsFilterBox,
  SkeletonFilterBox,
} from '@/components/project/ProjectFilterBox/';
import { MultiColumns } from '@/components/layout/MultiColumns';

const Projects: FC = () => {
  const {
    projects,
    tags,
    error,
    setSelectedTagId,
    setSelectedLanguage,
  } = useProjects();

  if (error) {
    return <h1>Error</h1>;
  }

  const leftContent = (
    <Box>
      {projects ? <ProjectList projects={projects} /> : <SkeletonProjectList />}
    </Box>
  );

  const rightContent = (
    <Stack spacing={4}>
      {tags ? (
        <ProjectsFilterBox
          tags={tags}
          onSelectTag={setSelectedTagId}
          onSelectLanguage={setSelectedLanguage}
        />
      ) : (
        <SkeletonFilterBox />
      )}
    </Stack>
  );

  return <MultiColumns leftContent={leftContent} rightContent={rightContent} />;
};

export default Projects;
