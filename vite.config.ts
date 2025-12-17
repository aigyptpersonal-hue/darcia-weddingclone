import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // INI KUNCI SAKTINYA BIAR GAK BLANK:
  // Kita paksa semua aset (JS/CSS) diambil dari alamat asli repo undangan
  base: 'https://darciasiskaridho.vercel.app/',

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
