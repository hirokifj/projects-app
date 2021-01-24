import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react';
import {
  fetchAllProjects,
  fetchProjectById,
  fetchRelatedTagsProjects,
} from '@/api/projects';
import { Project } from '@/types/project';
import { isNonEmptyArray } from '@/utils/array';
import { ProjectDetailContent } from '@/components/project/ProjectDetailContent';
import { CommentForm } from '@/components/comment/CommentForm/';
import { CommentList } from '@/components/comment/CommentList';
import { RelatedProjectList } from '@/components/project/RelatedProjectList/';
import { WhiteBgBox } from '@/components/core/WhiteBgBox';
import { MultiColumns } from '@/components/layout/MultiColumns';
import { useProjectDetail } from '@/hooks/pages/projectDetail/useProjectDetail';

type Props = {
  project: Project;
  relatedProjects: Project[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context,
) => {
  const id = context?.params?.id;
  const project = await fetchProjectById(id as string);
  const relatedProjects = await fetchRelatedTagsProjects(project);

  return {
    props: {
      project,
      relatedProjects,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetchAllProjects();

  return {
    paths: projects.map((project) => ({
      params: {
        id: project.id,
      },
    })),
    fallback: false,
  };
};

const ProjectSingle: FC<Props> = ({ project, relatedProjects }) => {
  const {
    isAuthorized,
    isUnAuthorized,
    comments,
    commentsError,
    postComment,
    updateLikeList,
    isLiked,
    likesCount,
    isLoadingLikesCount,
  } = useProjectDetail(project);

  const leftContent = (
    <Stack spacing={4}>
      <WhiteBgBox>
        <ProjectDetailContent
          project={project}
          isLiked={isLiked}
          likesCount={likesCount}
          onLikeButtonClick={updateLikeList}
          loadingLikesCount={isLoadingLikesCount}
        />
      </WhiteBgBox>
      <WhiteBgBox>
        <Heading as="h2" fontSize="24px" color="gray.600">
          Comment
        </Heading>
        <Divider mt={2} borderWidth="2px" />
        {comments && isNonEmptyArray(comments) && (
          <Box mt={8} pl={2}>
            <CommentList comments={comments} />
          </Box>
        )}
        {commentsError && (
          <Box mt={8}>
            <Text>エラー：コメントの取得に失敗しました。</Text>
          </Box>
        )}
        {isAuthorized && (
          <Box mt={8}>
            <CommentForm onSubmit={postComment} />
          </Box>
        )}
        {isUnAuthorized && (
          <Stack spacing="4" textAlign="right" mt={10}>
            <Text color="gray.500">あなたのコメントを待っています。</Text>
            <Box>
              <Button size="md">ログイン</Button>
            </Box>
          </Stack>
        )}
      </WhiteBgBox>
    </Stack>
  );

  const rightContent = (
    <WhiteBgBox>
      <RelatedProjectList projects={relatedProjects} />
    </WhiteBgBox>
  );

  return <MultiColumns leftContent={leftContent} rightContent={rightContent} />;
};

export default ProjectSingle;
