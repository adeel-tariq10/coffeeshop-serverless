// eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        // Add other globals as needed
      },
      parserOptions: {
        ecmaVersion: 2021, // Use the latest ECMAScript version
        sourceType: 'module', // Enable ES module syntax
      },
    },
    rules: {
      'no-console': 'warn', // Warn on console logs
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables, ignore _ prefixed
      'eqeqeq': 'error', // Enforce strict equality
      'semi': ['error', 'always'], // Require semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      // Add other custom rules as needed
    },
  },
]);