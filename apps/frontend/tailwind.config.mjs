import tailwindConfigBase from '@flightcore/uikit/tailwind.config.mjs'
import merge from 'lodash/merge'

/** @type {import('tailwindcss').Config} */
export default merge(tailwindConfigBase, {
  content: ['../../**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '!../../**/node_modules/**/*'],
})
