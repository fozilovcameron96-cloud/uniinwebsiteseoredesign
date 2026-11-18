import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Two pages: the site, and the standalone ad landing page (start.html, 18 Nov
  // 2026), which must not carry the site's code. vercel.json routes /start to it.
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        start: 'start.html',
      },
    },
  },
});
