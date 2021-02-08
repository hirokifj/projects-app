import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const WhiteBgBox: FC<BoxProps> = ({ children, ...props }) => (
  <Box
    width="100%"
    borderRadius={8}
    backgroundColor="white"
    px={4}
    py={4}
    {...props}
  >
    {children}
  </Box>
);
