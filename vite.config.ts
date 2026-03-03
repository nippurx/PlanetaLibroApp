import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Build and serve the app from /app because production is deployed under that subpath.
  base: "/app/",
  plugins: [react()],
  build: {
    outDir: "../MPWebs/www/planetalibro/app",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // Proxy API requests in dev so the frontend can use host-relative /api paths without CORS.
      "/api": {
        target: "http://localhost/planetalibro",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
