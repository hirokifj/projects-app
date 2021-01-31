import { FC } from 'react';
import { Avatar, Box, Button, Stack, Text } from '@chakra-ui/react';
import { UseFormMethods, RegisterOptions } from 'react-hook-form';
import { usePreviewImgInput } from './usePreviewImgInput';

interface Props {
  readonly initialValue: string;
  readonly name: string;
  readonly inputId: string;
  readonly label?: string;
  readonly register: UseFormMethods['register'];
  readonly rules?: RegisterOptions;
  readonly errorMsg?: string;
  readonly onReset: () => void;
}

export const PreviewImgInputControl: FC<Props> = ({
  initialValue,
  name,
  inputId,
  label,
  register,
  rules,
  errorMsg,
  onReset,
}) => {
  const {
    previewPath,
    handleImgInputChange,
    handleCancelButtonClick,
  } = usePreviewImgInput(onReset);

  return (
    <Stack spacing="4">
      {label && <Text mb="-8px">{label}</Text>}
      <Avatar src={previewPath || initialValue} size="xl" position="relative">
        {previewPath && (
          <Button
            position="absolute"
            right="-50px"
            bottom="0"
            size="xs"
            onClick={handleCancelButtonClick}
          >
            キャンセル
          </Button>
        )}
      </Avatar>
      <Box>
        <input
          id={inputId}
          type="file"
          name={name}
          style={{ display: 'none' }}
          onChange={handleImgInputChange}
          ref={register(rules)}
        />
        <Button
          as="label"
          htmlFor={inputId}
          cursor="pointer"
          colorScheme="blue"
          size="sm"
        >
          画像アップロード
        </Button>
        {errorMsg && (
          <Text mt="2" color="red.500" fontSize="14px">
            {errorMsg}
          </Text>
        )}
      </Box>
    </Stack>
  );
};
