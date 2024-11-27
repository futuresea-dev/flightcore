import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: process.env.BASE_FQDN,
  experimental: {},
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
  },
  output: 'server',
  outDir: 'dist',
  security: {
    checkOrigin: true,
  },
  vite: {
    ssr: {
      noExternal: ['astro-icon', '@iconify/tools'],
    },
    build: {
      manifest: true,
      rollupOptions: {
        external: [],
      },
    },
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  adapter: node({
    mode: 'standalone',
  }),
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
    compressor({
      fileExtensions: ['.html', '.css', '.js'],
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
  ],
})
