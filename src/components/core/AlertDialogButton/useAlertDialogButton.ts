import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export const useAlertDialogButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return {
    isOpen,
    onOpen,
    onClose,
    cancelRef,
  } as const;
};
