import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';

const AppLayout: FC = ({ children }) => (
  <Flex direction="column" width="100%" height="0" minHeight="100vh">
    <Box flexShrink={0}>ヘッダー</Box>
    <Box flexGrow={1}>{children}</Box>
    <Box flexShrink={0}>フッター</Box>
  </Flex>
);

export default AppLayout;
