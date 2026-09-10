import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api/chat": {
        target: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        changeOrigin: true,
        rewrite: (p) => ""
      }
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: false, chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/vue")) {
            return "vue-core";
          }
          if (id.includes("scenes.js")) {
            return "scenes-data";
          }
          if (id.includes("battle-quiz.js")) {
            return "quiz-data";
          }
        }
      }
    }
  }
});
