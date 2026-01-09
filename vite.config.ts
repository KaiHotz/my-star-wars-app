import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-star-wars-app/',
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '../fonts',
        replacement: resolve(__dirname, './src/ui-kit/styles/fonts'),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://swapi.py4e.com/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
