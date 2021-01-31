import { FC, useState, useEffect, useContext, createContext } from 'react';
import { auth } from '@/lib/firebase';
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
    auth().signInWithPopup(new auth.GoogleAuthProvider());

  const signInWithGithub = () =>
    auth().signInWithPopup(new auth.GithubAuthProvider());

  const signInWithEmail = (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email, password);

  const signUpWithEmail = (email: string, password: string) =>
    auth().createUserWithEmailAndPassword(email, password);

  const updateAuthUser = (newUserData: User) => {
    setUser(newUserData);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
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
    updateAuthUser,
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
  const authModule = useProvideAuth();
  return (
    <AuthContext.Provider value={authModule}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext) as ReturnType<typeof useProvideAuth>;
