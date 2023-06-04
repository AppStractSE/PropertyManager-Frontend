import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PropertEase",
        short_name: "PropertEase",
        description: "Manage properties with ease",
        background_color: "#111",
        theme_color: "#111",
        display: "standalone",
        start_url: "https://property.appstract.se/",
        scope: "https://property.appstract.se/",
        icons: [
          {
            src: "/icon/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon/maskable-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        orientation: "portrait",
        prefer_related_applications: false,
        lang: "en-US",
        categories: ["Business", "Productivity"],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // map '@' to 'src' directory
      "@components": path.resolve(__dirname, "./src/components"), // map '@components' to 'src/components' directory
      "@contexts": path.resolve(__dirname, "./src/contexts"), // map '@contexts' to 'src/contexts' directory
      "@hooks": path.resolve(__dirname, "./src/hooks"), // map '@hooks' to 'src/hooks' directory
      "@pages": path.resolve(__dirname, "./src/pages"), // map '@pages' to 'src/pages' directory
      "@api": path.resolve(__dirname, "./src/api"), // map '@api' to 'src/api' directory
      "@assets": path.resolve(__dirname, "./src/assets"), // map '@assets' to 'src/assets' directory
      "@data": path.resolve(__dirname, "./src/data"), // map '@data' to 'src/data' directory
    },
  },
});
