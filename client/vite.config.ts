import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import RewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    RewriteAll([
      {
        match: /^\/reset-password\/.*/,
        source: "/reset-password/:token",
      },
    ]),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:4000", // Proxy requests to the backend
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
    },
  },
});
