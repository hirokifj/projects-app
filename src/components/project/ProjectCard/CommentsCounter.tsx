import { FC } from 'react';
import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { FaComments } from 'react-icons/fa';

interface Props {
  count: number;
}

const CommentsCounter: FC<Props> = ({ count }) => (
  <Tag variant="outline">
    <TagLeftIcon as={FaComments} />
    <TagLabel>{count}</TagLabel>
  </Tag>
);

export default CommentsCounter;
