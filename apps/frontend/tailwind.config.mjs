import tailwindConfigBase from '@flightcore/uikit/tailwind.config.mjs'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../libs/uikit/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: 16,
      screens: {
        sm: '640px',
        md: '768px',
        // lg: "1024px",
        // lg: 'min(100vw, 1252px)',
        lg: '1252px',
        // xl: "1280px",
        // "2xl": "1536px",
      },
    },
    screens: {},
    extend: {
      ...tailwindConfigBase.theme.extend,
      fontSize: {
        ...tailwindConfigBase.theme.extend.fontSize,
      },
      colors: {
        ...tailwindConfigBase.theme.extend.colors,
      },
    },
  },
  plugins: [],
}
