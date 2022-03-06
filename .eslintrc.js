module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.commitlintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    eqeqeq: 'error',
    'no-var': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'error',
    'no-promise-executor-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-useless-backreference': 'error',
    'require-atomic-updates': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
  },
  overrides: [
    {
      files: ['src/**/*.spec.ts'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
