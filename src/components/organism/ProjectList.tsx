import { FC } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import ProjectCard from '@/components/organism/ProjectCard';
import { Project } from '@/types/project';

const ProjectList: FC<{ projects: Project[] }> = ({ projects }) => (
  <Stack spacing={6} width="100%">
    {projects.map((project) => (
      <Box minHeight="180px" key={project.id}>
        <ProjectCard
          id={project.id}
          title={project.title}
          description={project.description}
          commentCounts={project.commentCounts}
          likeCounts={project.likeCounts}
        />
      </Box>
    ))}
  </Stack>
);

export default ProjectList;
