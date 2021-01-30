import { FC } from 'react';
import NextLink from 'next/link';
import { Stack, Box, Flex, Text, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { Project } from '@/types/project';

export const UserLikedProjectList: FC<{ projects: Project[] }> = ({
  projects,
}) => (
  <Stack spacing="4">
    {projects.map((project) => (
      <Box key={project.id}>
        <NextLink href={`/projects/${project.id}`} passHref>
          <Box
            as="a"
            display="block"
            px={4}
            py={4}
            backgroundColor="white"
            borderRadius={8}
            transition="background-color .4s"
            _hover={{
              bg: 'gray.200',
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
      </Box>
    ))}
  </Stack>
);
