import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://flightcore.raqz.link',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
  },
  integrations: [
    react(),
    mdx(),
    tailwind({
      configFile: './tailwind.config.mjs',
      nesting: true,
    }),
    icon({
      iconDir: './src/icons',
    }),
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl-PL',
          en: 'en-US',
        },
      },
    }),
    compressor({
      fileExtensions: ['.html', '.css', '.js'],
    }),
  ],
  output: 'static',
  outDir: 'dist',
  inlineStylesheets: 'never',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
  },
  security: {
    checkOrigin: true,
  },
  vite: {
    ssr: {
      noExternal: ['astro-icon', '@iconify/tools'],
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
})
