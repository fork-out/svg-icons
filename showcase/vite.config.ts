import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  plugins: [react()],
  server: {
    port: 3300
  }
});
