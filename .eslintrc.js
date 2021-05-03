module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    camelcase: 'off',
    '@typescript-eslint/camelcase': ['error', {properties: 'never'}],
  },
};
