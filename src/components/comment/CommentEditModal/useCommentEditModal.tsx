import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';

import { Comment } from '@/types/comment';

export interface CommentFormValue {
  readonly comment: Comment['body'];
}

export const useCommentEditModal = ({
  initialValue,
  onSubmit,
}: {
  initialValue: Comment['body'];
  onSubmit: (commentBody: string) => Promise<void>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // react-hook-form v7で修正予定。
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    handleSubmit: RHFhandleSubmit,
    register: RHFRegister,
    errors,
    reset,
  } = useForm<CommentFormValue>({
    defaultValues: {
      comment: initialValue,
    },
  });
  const [processing, setProcessing] = useState(false);

  const commentRules = {
    required: 'コメントを入力してください。',
  };
  const commentErrMsg = errors?.comment?.message;

  const updateComment = RHFhandleSubmit(async ({ comment }) => {
    if (processing) return;
    setProcessing(true);

    try {
      await onSubmit(comment);

      reset({ comment });
      onClose();
    } finally {
      setProcessing(false);
    }
  });

  return {
    isOpen,
    onOpen,
    onClose,
    updateComment,
    processing,
    RHFRegister,
    commentRules,
    commentErrMsg,
  } as const;
};
