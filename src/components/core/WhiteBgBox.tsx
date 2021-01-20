import { FC } from 'react';
import { Box } from '@chakra-ui/react';

export const WhiteBgBox: FC = ({ children }) => (
  <Box width="100%" borderRadius={8} backgroundColor="white" px={4} py={4}>
    {children}
  </Box>
);
