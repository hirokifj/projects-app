import { FC, useState, ChangeEvent } from 'react';
import { Box, Textarea, Button } from '@chakra-ui/react';

const CommentForm: FC<{ onSubmit: (body: string) => void }> = ({
  onSubmit,
}) => {
  const [comment, setComment] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handleSubmit = () => {
    onSubmit(comment);
  };

  return (
    <Box as="form">
      <Textarea
        placeholder="コメントする"
        value={comment}
        onChange={handleChange}
      />
      <Box textAlign="right" mt="2">
        <Button width="120px" onClick={handleSubmit}>
          送信
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
