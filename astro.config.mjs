import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://rgesn.meexr.fr",
  integrations: [react(), tailwind(), sitemap(), compress()],
  vite: {
    ssr: {
      noExternal: ["smartypants"]
    }
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});