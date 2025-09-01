import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { jsxLocPlugin } from '@builder.io/vite-plugin-jsx-loc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    jsxLocPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.lottie'],
}));
