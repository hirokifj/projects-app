import { FC, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ReactQueryProvider } from '@/lib/reactQuery';
import { AuthProvider } from '@/contexts/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/styles/theme';
import nprogress from '@/lib/nprogress';
import 'nprogress/nprogress.css';
import AppLayout from '@/components/layout/AppLyaout';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  if (process.browser) {
    nprogress.start();
  }

  useEffect(() => {
    nprogress.done();
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <ReactQueryProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ReactQueryProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
