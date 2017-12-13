module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['prettier'],
  "extends": ['eslint:recommended', 'prettier'],
  rules: {
    // Prettier
    'prettier/prettier': ['error', {
      singleQuote: true
    }],

    // ESLint built-in
    'linebreak-style': [
      'error',
      'unix'
    ],
  }
};
