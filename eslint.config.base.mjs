import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ...eslint.configs.recommended,
  },
  ...tseslint.configs.strict,
  ...tseslint.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error",
      'no-undef': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'no-irregular-whitespace': 0,
    },
  },
]
