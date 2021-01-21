import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { TextareaControl } from '@/components/core/TextareaControl';
import { usePostComment } from '@/hooks/comment/usePostComment';
import { Project } from '@/types/project';

export const CommentForm: FC<{
  projectId: Project['id'];
}> = ({ projectId }) => {
  const {
    postComment,
    RHFRegister,
    commentRules,
    commentErrMsg,
    processing,
  } = usePostComment(projectId);

  return (
    <Box as="form" onSubmit={postComment}>
      <TextareaControl
        inputId="comment"
        name="comment"
        placeholder="コメントする"
        register={RHFRegister}
        rules={commentRules}
        isInvalid={!!commentErrMsg}
        errorMsg={commentErrMsg}
      />
      <Box textAlign="right" mt="2">
        <Button type="submit" width="120px" isLoading={processing}>
          送信
        </Button>
      </Box>
    </Box>
  );
};
