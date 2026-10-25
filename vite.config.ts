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
    modulePreload: {
      resolveDependencies(_filename, deps) {
        // Pillars (ו-framer-motion שבתוכו) לא נדרשים לצביעה הראשונה.
        // preload מכריח את הדפדפן להוריד אותם במקביל לתמונת ה-LCP.
        return deps.filter((dep) => dep.indexOf('Pillars') === -1 && dep.indexOf('motion') === -1);
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules/react-dom') !== -1 || id.indexOf('node_modules/react/') !== -1) {
            return 'react';
          }
        },
      },
    },
  },
});
