import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //https: true,
    proxy: {
      "/api": {
        target: "https://pnale.online",
        changeOrigin: true,
        secure: false,
        // ws: true,
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
      { find: "@public", replacement: "/public" },
      { find: "@model", replacement: "/src/model" },
      { find: "@recoil", replacement: "/src/recoil" },
    ],
  },
});
