import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/Forum/",
  build: {
    outDir: "docs",
  },
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, "./src/assets/"),
      components: resolve(__dirname, "./src/components/"),
      store: resolve(__dirname, "./src/store/"),
      ui: resolve(__dirname, "./src/ui/"),
      "~styles": resolve(__dirname, "./src/styles/"),
    },
    extensions: [".scss", ".js", ".jsx", ".ts", ".tsx"],
  },
});
