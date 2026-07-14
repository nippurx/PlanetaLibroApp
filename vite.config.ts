import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const proxyTarget = loadEnv(mode, ".", "VITE_READER_PROXY_TARGET").VITE_READER_PROXY_TARGET || "https://planetalibro.net";
  const developmentProxy = {
    "/api": { target: proxyTarget, changeOrigin: true, secure: true },
    "/lector": { target: proxyTarget, changeOrigin: true, secure: true },
  };
  return {
  // Build and serve the app from /app because production is deployed under that subpath.
  base: "/app/",
  plugins: [react()],
  build: {
    // Local previews stay in this repository. The normal production build
    // retains the existing deployment output.
    outDir: mode === "preview" ? "dist" : "../MPWebs/www/planetalibro/app",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    proxy: developmentProxy,
  },
  preview: { host: "0.0.0.0", proxy: developmentProxy },
  };
});
