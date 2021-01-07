import { FC } from 'react';
import { useAuth } from '@/lib/auth';

const Login: FC = () => {
  const { redirectIfAuthorized, authState, signInWithGoogle } = useAuth();
  redirectIfAuthorized(authState);

  const login = () => signInWithGoogle();

  return (
    <div>
      <main>
        <h1>Starter</h1>
        <button type="button" onClick={() => login()}>
          ログイン
        </button>
      </main>
    </div>
  );
};

export default Login;
