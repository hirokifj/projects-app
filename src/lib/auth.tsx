import { FC, useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/lib/firebase';
import { useRouter } from 'next/router';
import { User } from '@/types/user';

type AuthState = 'Loading' | 'Authorized' | 'UnAuthorized';

const useProvideAuth = () => {
  const [authState, setAuthState] = useState<AuthState>('Loading');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthorized = authState === 'Authorized';
  const isUnAuthorized = authState === 'UnAuthorized';

  const signInWithGoogle = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

  const signInWithGithub = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());

  const signInWithEmail = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const signUpWithEmail = (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName ?? '',
          imgPath: currentUser.photoURL ?? '',
        });
        setAuthState('Authorized');
      } else {
        setUser(null);
        setAuthState('UnAuthorized');
      }
    });

    return () => unsubscribe();
  }, []);

  const redirectIfAuthorized = () => {
    if (authState === 'Authorized') {
      router.push('/dashboard');
    }
  };

  const redirectIfUnAuthorized = () => {
    if (authState === 'UnAuthorized') {
      router.push('/login');
    }
  };

  return {
    user,
    authState,
    isAuthorized,
    isUnAuthorized,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    redirectIfAuthorized,
    redirectIfUnAuthorized,
  } as const;
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
