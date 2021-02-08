import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { UseFormMethods, RegisterOptions } from 'react-hook-form';

interface Props {
  readonly type: string;
  readonly name: string;
  readonly inputId: string;
  readonly isInvalid: boolean;
  readonly label: string;
  readonly register: UseFormMethods['register'];
  readonly rules?: RegisterOptions;
  readonly errorMsg?: string;
  readonly autoFocus?: boolean;
}

export const InputControl: FC<Props> = ({
  inputId,
  type,
  name,
  label,
  register,
  rules,
  isInvalid,
  errorMsg,
}) => (
  <FormControl id={inputId} isInvalid={isInvalid}>
    <FormLabel>{label}</FormLabel>
    <Input type={type} name={name} ref={register(rules)} />
    <FormErrorMessage>{errorMsg}</FormErrorMessage>
  </FormControl>
);
