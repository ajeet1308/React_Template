module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['react', 'jest', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-expressions': ['error', {
      allowTernary: true
    }],
    'import/extensions': [2,
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-empty-function': 'off',
    'consistent-return': 'off',
    'comma-dangle': 'off',
    'no-prototype-builtins': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
    // 'no-tabs': 0,
    'no-console': 'off',
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 0,
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],

      },
    },
  }
};
