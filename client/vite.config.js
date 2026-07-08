import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Change this if deploying to a subdirectory
  server: {
    historyApiFallback: true, // Ensures SPA routing works properly
  },
});
