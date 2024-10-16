import eslintPluginAstro from 'eslint-plugin-astro'
import prettier from 'eslint-plugin-prettier/recommended'
import configBase from '../../eslint.config.base.mjs'

export default [
  ...configBase,
  prettier,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist/*', '.astro/*', 'public/*', 'astro.config.mjs', 'src/env.d.ts', 'src/paraglide'],
  },
]
