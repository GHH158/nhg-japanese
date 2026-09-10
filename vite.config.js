import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { execFile } from "child_process";
import crypto from "crypto";
import fs from "fs";

function edgeTtsPlugin() {
  const cacheDir = path.resolve(__dirname, "./public/audio/tts_cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  return {
    name: "vite-plugin-edge-tts",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith("/api/tts")) {
          try {
            const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
            const text = parsedUrl.searchParams.get("text");
            const voice = parsedUrl.searchParams.get("voice") || "ja-JP-KeitaNeural";

            if (!text || !text.trim()) {
              res.statusCode = 400;
              res.end("Missing text parameter");
              return;
            }

            const cleanText = text.replace(/<rt>.*?<\/rt>/g, "").replace(/<[^>]+>/g, "").trim();
            const hash = crypto.createHash("md5").update(`${voice}:${cleanText}`).digest("hex");
            const cacheFile = path.join(cacheDir, `${hash}.mp3`);

            if (fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 100) {
              res.setHeader("Content-Type", "audio/mpeg");
              res.setHeader("Cache-Control", "public, max-age=86400");
              fs.createReadStream(cacheFile).pipe(res);
              return;
            }

            execFile("python3", ["-m", "edge_tts", "--text", cleanText, "--voice", voice, "--write-media", cacheFile], (err) => {
              if (err || !fs.existsSync(cacheFile) || fs.statSync(cacheFile).size <= 100) {
                console.warn("[EdgeTTS] Generation error:", err);
                res.statusCode = 500;
                res.end("EdgeTTS generation error");
                return;
              }
              res.setHeader("Content-Type", "audio/mpeg");
              res.setHeader("Cache-Control", "public, max-age=86400");
              fs.createReadStream(cacheFile).pipe(res);
            });
          } catch (e) {
            console.error("[EdgeTTS Middleware Exception]", e);
            res.statusCode = 500;
            res.end("Internal Server Error");
          }
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [vue(), edgeTtsPlugin()],
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
    emptyOutDir: false,
    chunkSizeWarningLimit: 1500,
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
