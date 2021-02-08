import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export const MultiColumns: FC<{
  leftContent: ReactJSXElement;
  rightContent: ReactJSXElement;
}> = ({ leftContent, rightContent }) => (
  <Box width="100%" height="100%" backgroundColor="gray.100" py="10">
    <Flex maxW="1100px" width="90%" mx="auto">
      <Box flex="0 0 740px" mr={12}>
        {leftContent}
      </Box>
      <Box flexGrow={1}>{rightContent}</Box>
    </Flex>
  </Box>
);
