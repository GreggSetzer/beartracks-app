import { Linter } from 'eslint';

const config: Linter.Config = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ["dist/"],
};

export default config;