import { FC } from 'react';
import { useAuth } from '@/lib/auth';
import { Button, Stack } from '@chakra-ui/react';

const SocialSignInButtons: FC = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();

  return (
    <Stack spacing={4}>
      <Button
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
