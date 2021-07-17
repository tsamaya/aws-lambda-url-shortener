module.exports = {
  extends: [
    'airbnb-base',
    // 'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
  },
};
