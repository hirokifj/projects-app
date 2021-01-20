import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const MultilineText: FC<{ text: string }> = ({ text }) => (
  <Box lineHeight="1.8">
    {text.split('\n').map((txt, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box key={i} mt={i === 0 ? 0 : 1.6}>
        {txt ? <Text>{txt}</Text> : <Box height="16px" />}
      </Box>
    ))}
  </Box>
);
