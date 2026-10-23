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
