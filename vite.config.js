import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/forum",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
});
