import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://rgesn.meexr.fr",
  integrations: [react(), tailwind(), sitemap(), 
  (await import("astro-compress")).default({
			CSS: true,
			HTML: true,
			Image: true,
			JavaScript: true,
			SVG: false,
		})],
  vite: {
    ssr: {
      noExternal: ["smartypants"]
    }
  },
  server: { port: 8080 },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});