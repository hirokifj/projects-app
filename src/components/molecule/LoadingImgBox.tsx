import { FC } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const CommentsCounter: FC = () => (
  <Flex
    justify="center"
    alignItems="center"
    width="100%"
    height="100%"
    backgroundColor="gray.200"
  >
    <Spinner size="md" color="gray.300" />
  </Flex>
);

export default CommentsCounter;
