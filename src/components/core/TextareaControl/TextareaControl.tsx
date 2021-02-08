import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { UseFormMethods, RegisterOptions } from 'react-hook-form';

interface Props {
  readonly name: string;
  readonly inputId: string;
  readonly placeholder?: string;
  readonly isInvalid: boolean;
  readonly label?: string;
  readonly register: UseFormMethods['register'];
  readonly rules?: RegisterOptions;
  readonly errorMsg?: string;
  readonly autoFocus?: boolean;
  readonly height?: TextareaProps['height'];
}

export const TextareaControl: FC<Props> = ({
  inputId,
  name,
  placeholder,
  label,
  register,
  rules,
  isInvalid,
  errorMsg,
  height,
}) => (
  <FormControl id={inputId} isInvalid={isInvalid}>
    {label && <FormLabel>{label}</FormLabel>}
    <Textarea
      name={name}
      placeholder={placeholder}
      ref={register(rules)}
      height={height}
    />
    <FormErrorMessage>{errorMsg}</FormErrorMessage>
  </FormControl>
);
