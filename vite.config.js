import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('/three/examples/')) {
            return 'three-extras';
          }

          if (id.includes('/three/')) {
            return 'three-core';
          }

          if (id.includes('/@react-three/')) {
            return 'react-three-vendor';
          }

          if (id.includes('/maath/')) {
            return 'maath-vendor';
          }

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'react-vendor';
          }

          if (id.includes('/gsap/')) {
            return 'motion-vendor';
          }

          return undefined;
        },
      },
    },
  },
});
