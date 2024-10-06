import tailwindConfigBase from '@flightcore/uikit/tailwind.config.mjs'
import merge from 'lodash/merge'

import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default merge(tailwindConfigBase, {
  content: [
    // 'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // '../../packages/uikit/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '!../../**/node_modules/**/*',
  ],
  plugins: [daisyui],
})
