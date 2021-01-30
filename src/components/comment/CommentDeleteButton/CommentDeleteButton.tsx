import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { AlertDialogButton } from '@/components/core/AlertDialogButton/index';

export const CommentDeleteButton: FC<{ onDelete: () => void }> = ({
  onDelete,
}) => (
  <AlertDialogButton
    buttonText="削除"
    acitonTexts={{ execute: '削除', close: 'キャンセル' }}
    headerText=""
    buttonSize="sm"
    onExecuteButtonClick={onDelete}
  >
    <Text>コメントを削除してもよろしいですか？</Text>
  </AlertDialogButton>
);
