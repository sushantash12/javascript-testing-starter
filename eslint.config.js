import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/*', '.lintstagedrc.json'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'space-before-function-paren': 'off',
      'semi': ['error', 'always'],
    },
  },
];
