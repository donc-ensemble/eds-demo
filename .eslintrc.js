module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }],
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': [2, { props: false }],
    quotes: ['error', 'single'],
    'no-use-before-define': ['error', { functions: false }],
    'no-plusplus': 'off',
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-empty-function': [
      'error',
      {
        allow: ['asyncFunctions', 'arrowFunctions'],
      },
    ],
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'nonblock-statement-body-position': 'off',
    curly: ['error', 'all'],
    'no-bitwise': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
      },
    ],
  },
};
