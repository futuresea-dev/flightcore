import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://flightcore.raqz.link',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    react(),
    icon({
      iconDir: './src/icons',
    }),
    sitemap({}),
  ],
  output: 'static',
})
