import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';

export interface CommentFormValue {
  readonly comment: string;
}

export const useCommentForm = (
  onSubmit: (comment: string) => Promise<void> | undefined,
) => {
  const toast = useToast();
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
    reset,
  } = useForm<CommentFormValue>();
  const [processing, setProcessing] = useState(false);

  const commentRules = {
    required: 'コメントを入力してください。',
  };
  const commentErrMsg = errors?.comment?.message;

  const postComment = RHFhandleSubmit(async ({ comment }) => {
    if (processing) return;
    setProcessing(true);

    try {
      await onSubmit(comment);

      toast({
        title: '',
        description: '投稿しました。',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      toast({
        title: 'エラー',
        description: '時間をおいて、再度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setProcessing(false);
  });

  return {
    postComment,
    processing,
    RHFRegister,
    commentRules,
    commentErrMsg,
  } as const;
};
