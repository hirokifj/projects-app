import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '@/lib/auth';
import { Project } from '@/types/project';
import { createComment } from '@/api/comments';
import { getCommentsFetcherKey } from './fetcherKey';

export interface CommentFormValue {
  readonly comment: string;
}

export const useCommentForm = (projectId: Project['id']) => {
  const { user } = useAuth();
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
  const mutation = useMutation(createComment);
  const queryClient = useQueryClient();

  const commentRules = {
    required: 'コメントを入力してください。',
  };
  const commentErrMsg = errors?.comment?.message;

  const postComment = RHFhandleSubmit(({ comment }) => {
    setProcessing(true);

    if (!user) throw new Error('Illegal operation: unAuthorized');

    const newComment = {
      userId: user.id,
      userName: user.name,
      userImgPath: user.imgPath,
      projectId,
      body: comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return mutation
      .mutateAsync(newComment)
      .then(() => {
        queryClient.invalidateQueries(getCommentsFetcherKey(projectId));
        toast({
          title: '',
          description: '投稿しました。',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'エラー',
          description: '時間をおいて、再度お試しください。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setProcessing(false);
        reset();
      });
  });

  return {
    postComment,
    processing,
    RHFRegister,
    commentRules,
    commentErrMsg,
  } as const;
};
