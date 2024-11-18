import eslint from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  { ...prettier },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/consistent-indexed-object-style': 0,
      '@typescript-eslint/no-inferrable-types': 0,
      'no-console': 'error',
      'no-undef': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'no-irregular-whitespace': 0,
    },
  },
]
