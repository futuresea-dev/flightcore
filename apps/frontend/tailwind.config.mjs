import tailwindConfigBase from '@flightcore/uikit/tailwind.config.mjs'

console.log(require.resolve('@flightcore/uikit'))

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfigBase,
  content: [
    'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../libs/uikit/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
}
