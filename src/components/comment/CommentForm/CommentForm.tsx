import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { TextareaControl } from '@/components/core/TextareaControl';
import { useCommentForm } from './useCommentForm';

export const CommentForm: FC<{
  onSubmit: (comment: string) => Promise<void> | undefined;
}> = ({ onSubmit }) => {
  const {
    postComment,
    RHFRegister,
    commentRules,
    commentErrMsg,
    processing,
  } = useCommentForm(onSubmit);

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
