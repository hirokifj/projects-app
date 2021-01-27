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
  project,
}: {
  user: User | null;
  project: Project;
}) => {
  const mutation = useMutation(createComment);
  const queryClient = useQueryClient();

  const postComment = (comment: string) => {
    if (!user) return;

    const newComment = {
      userId: user.id,
      userName: user.name,
      userImgPath: user.imgPath,
      projectId: project.id,
      projectTitle: project.title,
      body: comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // eslint-disable-next-line consistent-return
    return mutation.mutateAsync(newComment).then(() => {
      queryClient.invalidateQueries(getCommentsFetcherKey(project.id));
    });
  };
  return {
    postComment,
  } as const;
};
