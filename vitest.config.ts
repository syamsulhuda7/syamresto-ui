import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      dir: "./src/tests",
      globals: true,
      //   environment: "jsdom",
      //   setupFiles: "./src/tests/setup.ts",
      coverage: {
        provider: "istanbul", // Gunakan "c8" atau "v8" sesuai kebutuhan
        reporter: ["text", "json", "html"], // Menampilkan laporan di terminal dan file HTML
        all: true, // Sertakan semua file, termasuk yang belum diuji
        include: ["src/**/*.ts"], // Atur pola file yang ingin dicakup
        exclude: ["node_modules", "dist"], // Kecualikan folder tertentu
        reportsDirectory: "./src/tests/unit/coverage",
      },
    },
  })
);
