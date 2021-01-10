import { FC } from 'react';
import { useSocialSignIn } from '@/hooks/useSocialSignIn';
import { Button, Stack, Icon } from '@chakra-ui/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialSignInButtons: FC = () => {
  const { signInWithGoogle, signInWithGithub } = useSocialSignIn();

  return (
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
        onClick={() => signInWithGoogle()}
      >
        Googleでログイン
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
        onClick={() => signInWithGithub()}
      >
        GitHubでログイン
      </Button>
    </Stack>
  );
};

export default SocialSignInButtons;
