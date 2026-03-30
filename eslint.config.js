// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import vitest from 'eslint-plugin-vitest';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
   js.configs.recommended,
   ...tseslint.configs.recommended,
   {
      files: ['**/*.{ts,tsx}'],
      ignores: [
         'vite.config.ts', // ignore config file if you don’t want it linted
         'node_modules/**',
         'node_modules',
         'dist',
         'coverage',
         'vite.config.ts',
         'dist/**',
      ],
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         globals: globals.browser,
         parserOptions: {
            ecmaFeatures: { jsx: true },
            project: './tsconfig.eslint.json', // ✅ custom ESLint TS config
            tsconfigRootDir: import.meta.dirname,
         },
      },
      plugins: {
         react,
         'react-hooks': reactHooks,
         'jsx-a11y': jsxA11y,
         import: importPlugin,
         vitest,
         prettier,
         '@tanstack/query': pluginQuery,
         'react-refresh': reactRefresh,
      },
      rules: {
         // React & Hooks
         ...react.configs.recommended.rules,
         ...reactHooks.configs.recommended.rules,
         'react/react-in-jsx-scope': 'off',
         'react/jsx-uses-react': 'off',
         'react/prop-types': 'off',
         'react-refresh/only-export-components': 'warn',
         '@tanstack/query/exhaustive-deps': 'error',

         // Import and accessibility
         'import/order': [
            'error',
            { groups: [['builtin', 'external', 'internal']] },
         ],
         'jsx-a11y/alt-text': 'warn',

         // TypeScript
         '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
         ],
         '@typescript-eslint/explicit-function-return-type': 'off',

         // Prettier integration
         'prettier/prettier': [
            'error',
            {
               singleQuote: true,
               semi: true,
               trailingComma: 'all',
               printWidth: 80,
               tabWidth: 3,
            },
         ],
      },
      settings: {
         react: {
            version: 'detect',
         },
      },
   },
);
