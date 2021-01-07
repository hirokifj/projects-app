import { FC } from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/styles/theme';
import AppLayout from '@/components/template/AppLyaout';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <AuthProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AuthProvider>
  </ChakraProvider>
);

export default MyApp;
