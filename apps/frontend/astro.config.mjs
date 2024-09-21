import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
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
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    react(),
    icon({
      iconDir: './src/icons',
    }),
    sitemap({}),
    // paraglide({
    //   project: './project.inlang',
    //   outdir: './src/paraglide', //where your files should be
    // }),
    mdx(),
  ],
  output: 'static',
})
