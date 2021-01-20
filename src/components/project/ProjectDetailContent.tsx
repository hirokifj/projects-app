import { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Img,
  AspectRatio,
  Wrap,
  WrapItem,
  Tag,
  Link,
} from '@chakra-ui/react';
import { LikeButton } from '@/components/project/LikeButton';
import { MultilineText } from '@/components/core/MultilineText';
import { Project } from '@/types/project';

export const ProjectDetailContent: FC<{ project: Project }> = ({ project }) => (
  <Box>
    <Flex alignItems="center">
      <Heading as="h1" fontSize="20px" width="70%" mr="auto">
        <Link href={project.url} target="_blank" rel="noopener noreferrer">
          {project.title}
        </Link>
      </Heading>
      <LikeButton
        count={project.likeCounts}
        isLiked
        onClick={() => {
          // TODO: like機能の実装
        }}
      />
    </Flex>
    <Box mt="4">
      <Wrap>
        {project.tags.map((tag) => (
          <WrapItem key={tag}>
            <Tag colorScheme="blue">{tag}</Tag>
          </WrapItem>
        ))}
        <WrapItem>
          <Tag colorScheme="blue">{project.language}</Tag>
        </WrapItem>
      </Wrap>
    </Box>
    <AspectRatio width="70%" ratio={4 / 2.4} mt="6">
      <Img src={project.imgPath} borderRadius={8} />
    </AspectRatio>
    <Box mt="6">
      <Box fontSize="16px" lineHeight="1.6" color="gray.700">
        <MultilineText text={project.description} />
      </Box>
    </Box>
    <Box mt="12">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        color="blue.400"
      >
        {project.url}
      </Link>
    </Box>
  </Box>
);
