import { FC } from 'react';
import { Button, Stack, Icon } from '@chakra-ui/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export const SocialSignInButtons: FC<{
  onGoogleButtonClick: () => Promise<void>;
  onGithubButonClick: () => Promise<void>;
}> = ({ onGoogleButtonClick, onGithubButonClick }) => (
  <Stack spacing={4}>
    <Button
      leftIcon={<Icon as={FaGoogle} mr="10px" fontSize="24px" />}
      height="48px"
      backgroundColor="white"
      color="gray.900"
      variant="outline"
      _hover={{ bg: 'gray.100' }}
      _active={{
        bg: 'gray.100',
        transform: 'scale(0.95)',
      }}
      onClick={() => onGoogleButtonClick()}
    >
      Login with Google
    </Button>
    <Button
      leftIcon={<Icon as={FaGithub} mr="10px" fontSize="24px" />}
      height="48px"
      backgroundColor="gray.900"
      color="white"
      variant="outline"
      _hover={{ bg: 'gray.700' }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(0.95)',
      }}
      onClick={() => onGithubButonClick()}
    >
      Login with GitHub
    </Button>
  </Stack>
);
