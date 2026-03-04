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
            // Keep dev requests same-origin while forwarding to the live backend.
            "/api": {
                target: "https://planetalibro.net",
                changeOrigin: true,
                secure: true,
            },
        },
    },
});
