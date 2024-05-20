import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

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
