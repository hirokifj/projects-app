import { FC } from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/styles/theme';
import AppLayout from '@/components/layout/AppLyaout';
import { ReactQueryProvider } from '@/lib/reactQuery';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
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

export default MyApp;
