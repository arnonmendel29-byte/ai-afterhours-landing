import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    watch: {
      // Windows can throw EBUSY when Vite watches binary font files in public/.
      ignored: ['**/public/fonts/**'],
    },
  },
  build: {
    // scripts/generate-route-html.mjs קורא את ה-manifest כדי לטעון מראש CSS/JS של כל עמוד
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
