import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Enables PWA in dev mode
        type: "module",
      },
      manifest: "./public/manifest.json", // Use your existing manifest.json
    }),
  ],
});
