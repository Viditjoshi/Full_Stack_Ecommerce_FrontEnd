// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ecommerce-jewellery-site-backend.onrender.com", // Your Render backend URL
        changeOrigin: true,
        secure: true, // Set to true if you're using HTTPS
      },
    },
  },
});
