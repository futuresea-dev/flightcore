import eslintPluginAstro from 'eslint-plugin-astro'
import configBase from '../../eslint.config.base.mjs'

export default [
  ...configBase,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist/*', '.astro/*', 'public/*', 'astro.config.mjs', 'src/env.d.ts', 'src/paraglide'],
  },
]
