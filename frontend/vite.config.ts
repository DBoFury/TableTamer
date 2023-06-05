import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react()],
});
