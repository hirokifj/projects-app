import { FC } from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
