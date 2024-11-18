import astroPlugin from 'eslint-plugin-astro'
import * as mdxPlugin from 'eslint-plugin-mdx'
import reactPlugin from 'eslint-plugin-react'
import configBase from '../../eslint.config.js'

export default [
  ...configBase,
  ...astroPlugin.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
    },
  },
  {
    ...mdxPlugin.flat,
  },
  {
    ...mdxPlugin.flatCodeBlocks,
  },
  {
    files: ['**/*.mdx'],
    rules: {
      ...mdxPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['dist/*', '.astro/*', 'public/*', 'src/env.d.ts', 'node_modules/*'],
  },
]
