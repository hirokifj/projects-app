import { FC, MouseEvent } from 'react';
import { Project } from '@/types/project';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Tag,
} from '@chakra-ui/react';
import { CommentsCounter } from '@/components/project/ProjectCard/CommentsCounter';
import { LikeButton } from '@/components/project/LikeButton';
import { LoadingImgBox } from '@/components/core/LoadingImgBox';

export const ProjectCard: FC<Project> = ({
  id,
  title,
  description,
  commentsCount,
  likesCount,
  tags,
  language,
}) => (
  <NextLink href={`projects/${id}`} passHref>
    <Box
      as="a"
      display="block"
      width="100%"
      minHeight="100%"
      borderRadius={8}
      backgroundColor="white"
      px={4}
      py={4}
      transition="background-color .4s"
      _hover={{
        bg: 'gray.200',
      }}
    >
      <Flex>
        <Box width="27%" mr="24px" flexShrink={0}>
          <AspectRatio maxW="100%" ratio={4 / 3}>
            <Image
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
              objectFit="cover"
              borderRadius={4}
              fallback={<LoadingImgBox />}
            />
          </AspectRatio>
        </Box>
        <Box flexGrow={1}>
          <Stack spacing={4}>
            <Box>
              <Text>{title}</Text>
              <Text mt={2} fontSize="14px" color="gray.600">
                {description}
              </Text>
            </Box>
            <Wrap>
              {tags.map((tag) => (
                <WrapItem key={tag}>
                  <Tag colorScheme="blue">{tag}</Tag>
                </WrapItem>
              ))}
              <WrapItem>
                <Tag colorScheme="blue">{language}</Tag>
              </WrapItem>
            </Wrap>
            <Flex alignItems="flex-start" justify="space-between">
              <CommentsCounter count={commentsCount} />
              <LikeButton
                count={likesCount}
                isLiked
                // eslint-disable-next-line
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  // TODO: like機能の実装
                  e.preventDefault();
                }}
              />
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  </NextLink>
);
