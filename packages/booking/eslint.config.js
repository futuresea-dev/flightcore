import reactPlugin from 'eslint-plugin-react'
import configBase from '../../eslint.config.js'

export default [
  ...configBase,
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
    ignores: ['node_modules/*'],
  },
]
