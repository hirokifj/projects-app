import { FC } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import { ProjectCard } from '@/components/project/ProjectCard/';
import { Project } from '@/types/project';

export const ProjectList: FC<{ projects: Project[] }> = ({ projects }) => (
  <Stack spacing={6} width="100%">
    {projects.map((project) => (
      <Box minHeight="180px" key={project.id}>
        <ProjectCard
          id={project.id}
          title={project.title}
          description={project.description}
          commentsCount={project.commentsCount}
          likeCounts={project.likeCounts}
          tags={project.tags}
          language={project.language}
          url={project.url}
          imgPath={project.imgPath}
        />
      </Box>
    ))}
  </Stack>
);
