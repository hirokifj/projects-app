import { FC } from 'react';
import NextLink from 'next/link';
import {
  Stack,
  Box,
  Flex,
  Text,
  Tag,
  Wrap,
  WrapItem,
  Divider,
} from '@chakra-ui/react';
import { Project } from '@/types/project';

interface Prop {
  projects: Project[];
}

export const RelatedProjectList: FC<Prop> = ({ projects }) => (
  <Stack spacing={2}>
    {projects.map((project, index) => (
      <Box>
        <NextLink href={`${project.id}`} passHref>
          <Box
            as="a"
            key={project.id}
            display="block"
            padding="4px"
            transition="background-color .4s"
            _hover={{
              bg: 'gray.100',
            }}
          >
            <Box fontWeight="bold" color="gray.600">
              {project.title}
            </Box>
            <Wrap mt="2">
              {project.tags.map((tag) => (
                <WrapItem key={tag.id}>
                  <Tag colorScheme="blue">{tag.label}</Tag>
                </WrapItem>
              ))}
            </Wrap>
            <Flex
              justifyContent="flex-end"
              color="gray.500"
              fontSize="14px"
              lineHeight="1"
              mt="16px"
            >
              <Flex mr="2" alignItems="flex-end">
                <Text mr="2px" fontWeight="bold">
                  {project.likesCount}
                </Text>
                <Text fontSize="12px">Likes</Text>
              </Flex>
              <Flex alignItems="flex-end">
                <Text mr="2px" fontWeight="bold">
                  {project.commentsCount}
                </Text>
                <Text fontSize="12px">Comments</Text>
              </Flex>
            </Flex>
          </Box>
        </NextLink>
        {index + 1 !== projects.length && <Divider mt="2" />}
      </Box>
    ))}
  </Stack>
);
