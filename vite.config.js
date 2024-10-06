// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://ecommerce-jewellery-site-backend.onrender.com", // Backend API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"),
      },
    },
  },
});
