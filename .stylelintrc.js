module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
    'no-missing-end-of-source-newline': null, // emotion利用のため
    'no-eol-whitespace': null, // emotion利用のため
  },
};
