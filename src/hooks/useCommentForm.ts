import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Comment } from '@/types/comment';

export interface CommentFormValue {
  readonly comment: string;
}

export const useCommentForm = (
  onSubmit: (body: Comment['body']) => Promise<void> | undefined,
) => {
  const [processing, setProcessing] = useState(false);
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
    reset,
  } = useForm<CommentFormValue>();

  const commentRules = {
    required: 'コメントを入力してください。',
  };
  const commentErrMsg = errors?.comment?.message;

  const submit = RHFhandleSubmit(({ comment }) => {
    setProcessing(true);

    onSubmit(comment)?.finally(() => {
      setProcessing(false);
      reset();
    });
  });

  return {
    submit,
    processing,
    RHFRegister,
    commentRules,
    commentErrMsg,
  };
};
