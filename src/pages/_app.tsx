import { FC } from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/styles/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
);

export default MyApp;
