import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer: FC = () => (
  <Box backgroundColor="gray.700">
    <Flex
      maxW="1100px"
      width="90%"
      height="32px"
      mx="auto"
      justify="center"
      alignItems="center"
      lineHeight="1"
      color="white"
    >
      <Text fontSize="14px">copyright</Text>
    </Flex>
  </Box>
);

export default Footer;
