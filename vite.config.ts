import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// The ad landing page's small stylesheet (~3 KB compressed) goes inside
// start.html instead of being a separate file. On mobile data, fetching it
// separately cost a whole round trip before anything could be drawn
// (18 Nov 2026, "make sure it's very fast"). Only start.html; the main site
// keeps its normal stylesheet file.
function inlineStartCss(): Plugin {
  return {
    name: 'inline-start-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.filename.endsWith('start.html') || !ctx.bundle) return html;
        return html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/start-[^"]+\.css)"[^>]*>/, (tag, file) => {
          const asset = ctx.bundle?.[file];
          if (!asset || asset.type !== 'asset') return tag;
          return `<style>${String(asset.source)}</style>`;
        });
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineStartCss()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Two pages: the site, and the standalone ad landing page (start.html, 18 Nov
  // 2026), which must not carry the site's code. public/_redirects (Netlify,
  // the live host) and vercel.json route /start to it.
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        start: 'start.html',
      },
    },
  },
});
