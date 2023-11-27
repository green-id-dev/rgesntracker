import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    ssr: {
      noExternal: ["smartypants"]
    }
  },
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});