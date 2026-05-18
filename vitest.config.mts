import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["vitest-localstorage-mock"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["tests/**", "node_modules/**", "dist/**"],
  },
});
