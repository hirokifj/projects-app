import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { Comment } from '@/types/comment';
import { TextareaControl } from '@/components/core/TextareaControl';
import { useCommentEditModal } from './useCommentEditModal';

export const CommentEditModal: FC<{
  commentBody: Comment['body'];
  onSubmit: (commentBody: string) => Promise<void>;
}> = ({ commentBody, onSubmit }) => {
  const {
    isOpen,
    onOpen,
    onClose,
    updateComment,
    processing,
    RHFRegister,
    commentRules,
    commentErrMsg,
  } = useCommentEditModal({ initialValue: commentBody, onSubmit });

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={updateComment}>
          <ModalHeader>コメントを編集</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <TextareaControl
              inputId="comment"
              name="comment"
              placeholder="コメントする"
              register={RHFRegister}
              rules={commentRules}
              isInvalid={!!commentErrMsg}
              errorMsg={commentErrMsg}
              height="200px"
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={5} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="green" type="submit" isLoading={processing}>
              更新する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
