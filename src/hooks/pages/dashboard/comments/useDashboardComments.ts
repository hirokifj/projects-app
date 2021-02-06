import { useToast } from '@chakra-ui/react';
import { useAuth } from '@/contexts/auth';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchUserComments,
  updateComment as FbUpdateComment,
  deleteComment as FbDeleteComment,
} from '@/api/comments';
import { Comment } from '@/types/comment';

type UpdateComment = (
  commentId: Comment['id'],
) => (commentBody: Comment['body']) => Promise<void>;

export const useDashboardComments = () => {
  const { redirectIfUnAuthorized, isAuthorized, user } = useAuth();
  const updateMutation = useMutation(FbUpdateComment);
  const deleteMutation = useMutation(FbDeleteComment);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: comments, error: commentsError } = useQuery(
    'user/comments',
    () => fetchUserComments(user?.id as string),
    { enabled: !!user },
  );

  const updateComment: UpdateComment = (commentId: Comment['id']) => (
    commentBody: Comment['body'],
  ) =>
    updateMutation
      .mutateAsync({ commentId, commentBody })
      .then(() => {
        queryClient.invalidateQueries('user/comments');

        toast({
          title: '',
          description: '編集が完了しました。',
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
      });

  const deleteComment = (commentId: Comment['id']): Promise<void> =>
    deleteMutation.mutateAsync(commentId).then(() => {
      queryClient.invalidateQueries('user/comments');
    });

  const isLoading = !isAuthorized || !comments;

  return {
    isLoading,
    redirectIfUnAuthorized,
    comments,
    commentsError,
    updateComment,
    deleteComment,
  } as const;
};
