module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'jest',
    'react-hooks'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js'] }],
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['src/__test__/*.js']
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error'
  },
  env: {
    'jest/globals': true,
  },
  globals: {
    'mount': true,
    'shallow': true,
  },
};
