/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, MouseEvent } from 'react';
import { jsx } from '@emotion/react';
import { Button, Icon, ButtonProps } from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface Props {
  count: number;
  isLiked: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  chakraButtonProps?: ButtonProps;
}

export const LikeButton: FC<Props> = ({
  count,
  isLiked,
  onClick,
  chakraButtonProps,
}) => (
  <Button
    variant="outline"
    leftIcon={isLiked ? <Icon as={FaHeart} /> : <Icon as={FaRegHeart} />}
    onClick={onClick}
    {...chakraButtonProps}
  >
    {count}
  </Button>
);
