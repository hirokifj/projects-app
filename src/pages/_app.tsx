import { FC } from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
