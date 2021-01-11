import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from '@/components/organism/Header';
import Footer from '@/components/organism/Footer';

const AppLayout: FC = ({ children }) => (
  <Flex direction="column" width="100%" height="0" minHeight="100vh">
    <Box flexShrink={0}>
      <Header />
    </Box>
    <Box flexGrow={1}>{children}</Box>
    <Box flexShrink={0}>
      <Footer />
    </Box>
  </Flex>
);

export default AppLayout;
