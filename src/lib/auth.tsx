import { FC, useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/lib/firebase';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
}

type AuthState = 'Loading' | 'Authorized' | 'UnAuthorized';

const useProvideAuth = () => {
  const [authState, setAuthState] = useState<AuthState>('Loading');
  const isAuthorized = authState === 'Authorized';
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signInWithGoogle = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

  const signInWithGithub = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName ?? '',
        });
        setAuthState('Authorized');
      } else {
        setUser(null);
        setAuthState('UnAuthorized');
      }
    });

    return () => unsubscribe();
  }, []);

  const redirectIfAuthorized = (curentAuthState: AuthState) => {
    if (curentAuthState === 'Authorized') {
      router.push('/dashboard');
    }
  };

  const redirectIfUnAuthorized = (curentAuthState: AuthState) => {
    if (curentAuthState === 'UnAuthorized') {
      router.push('/login');
    }
  };

  return {
    user,
    authState,
    isAuthorized,
    signInWithGoogle,
    signInWithGithub,
    redirectIfAuthorized,
    redirectIfUnAuthorized,
  };
};

const AuthContext = createContext<ReturnType<typeof useProvideAuth> | null>(
  null,
);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () =>
  useContext(AuthContext) as ReturnType<typeof useProvideAuth>;
