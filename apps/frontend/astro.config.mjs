import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import icon from 'astro-icon'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    react(),
    icon({
      iconDir: './src/icons',
    }),
  ],
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
})
