import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body:
      '-apple-system, blinkmacsystemfont, "Helvetica Neue", yugothic, "ヒラギノ角ゴ ProN W3", hiragino kaku gothic pron, arial, "メイリオ", meiryo, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  },
}) as Record<string, unknown>;

export default theme;
