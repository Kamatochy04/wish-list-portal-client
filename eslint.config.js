import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

export default [
  // Базовые правила ESLint
  js.configs.recommended,

  // Настройки для TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Настройки для React
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooks),
      'react-refresh': fixupPluginRules(reactRefresh),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs['recommended'].rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooks.configs['recommended'].rules,
      'react-refresh/only-export-components': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Интеграция с Prettier
  {
    plugins: {
      prettier,
    },
    rules: {
      ...prettier.rules,
      'prettier/prettier': 'error',
    },
  },

  // Игнорируемые файлы
  {
    ignores: ['**/node_modules', '**/dist', '**/build', '**/*.config.js', '**/*.d.ts'],
  },
];
