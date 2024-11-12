import eslintPluginAstro from 'eslint-plugin-astro'
import * as mdx from 'eslint-plugin-mdx'
import prettier from 'eslint-plugin-prettier/recommended'
import configBase from '../../eslint.config.base.mjs'

export default [
  ...configBase,
  prettier,
  ...eslintPluginAstro.configs.recommended,
  {
    ...mdx.flat,
  },
  {
    ...mdx.flatCodeBlocks,
  },
  {
    ignores: ['dist/*', '.astro/*', 'public/*', 'astro.config.mjs', 'src/env.d.ts', 'src/paraglide'],
  },
  {
    files: ['**/*.mdx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable the unused vars rule for MDX files
    },
  },
]
