const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

const perfectionistPlugin = require('eslint-plugin-perfectionist');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: { prettier: prettierPlugin },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      perfectionistPlugin.configs['recommended-natural'],
    ],
    processor: angular.processInlineTemplates,
    rules: {
      ...prettierConfig.rules,
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'unsorted',
          useConfigurationIf: {
            callingFunctionNamePattern: [
              '^Component$',
              '^Directive$',
              '^Injectable$',
              '^Pipe$',
              '^NgModule$',
            ],
          },
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['**/*.html'],
    plugins: { prettier: prettierPlugin },
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      ...prettierConfig.rules,
    },
  }
);
