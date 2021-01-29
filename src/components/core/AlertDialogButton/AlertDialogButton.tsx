import { FC, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
} from '@chakra-ui/react';

export const AlertDialogButton: FC<{
  buttonText: string;
  acitonTexts: {
    close: string;
    execute: string;
  };
  headerText: string;
  buttonSize?: ButtonProps['size'];
  buttonColor?: ButtonProps['colorScheme'];
  onExecuteButtonClick: () => void;
}> = ({
  children,
  buttonText,
  headerText,
  acitonTexts,
  buttonSize,
  buttonColor,
  onExecuteButtonClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        colorScheme={buttonColor || 'red'}
        size={buttonSize}
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {headerText}
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {acitonTexts.close}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onExecuteButtonClick();
                  onClose();
                }}
                ml={3}
              >
                {acitonTexts.execute}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
