module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    '@next/next/no-html-link-for-pages': 'off',
  },
}
