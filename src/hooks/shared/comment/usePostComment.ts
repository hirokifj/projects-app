import { useMutation, useQueryClient } from 'react-query';
import { User } from '@/types/user';
import { Project } from '@/types/project';
import { createComment } from '@/api/comments';
import { getCommentsFetcherKey } from './fetcherKey';

export interface CommentFormValue {
  readonly comment: string;
}

export const usePostComment = ({
  user,
  projectId,
}: {
  user: User | null;
  projectId: Project['id'];
}) => {
  const mutation = useMutation(createComment);
  const queryClient = useQueryClient();

  const postComment = (comment: string) => {
    if (!user) return;

    const newComment = {
      userId: user.id,
      userName: user.name,
      userImgPath: user.imgPath,
      projectId,
      body: comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // eslint-disable-next-line consistent-return
    return mutation.mutateAsync(newComment).then(() => {
      queryClient.invalidateQueries(getCommentsFetcherKey(projectId));
    });
  };
  return {
    postComment,
  } as const;
};
