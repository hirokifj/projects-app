import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
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
}) => (
  <FormControl id={inputId} isInvalid={isInvalid}>
    {label && <FormLabel>{label}</FormLabel>}
    <Textarea name={name} placeholder={placeholder} ref={register(rules)} />
    <FormErrorMessage>{errorMsg}</FormErrorMessage>
  </FormControl>
);
