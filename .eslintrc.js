module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': [2, {"props": false}],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript'
  ]
};
