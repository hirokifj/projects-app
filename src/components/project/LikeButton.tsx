/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, MouseEvent } from 'react';
import { jsx } from '@emotion/react';
import { Button, Icon, ButtonProps } from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface Props {
  count: number;
  isLiked: boolean;
  loading?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  chakraButtonProps?: ButtonProps;
}

export const LikeButton: FC<Props> = ({
  count,
  isLiked,
  loading,
  onClick,
  chakraButtonProps,
}) => (
  <Button
    variant="outline"
    leftIcon={isLiked ? <Icon as={FaHeart} /> : <Icon as={FaRegHeart} />}
    onClick={onClick}
    isLoading={loading}
    {...chakraButtonProps}
  >
    {count}
  </Button>
);
