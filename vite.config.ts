import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
        [env.VITE_API_URL]: {
          target: env.VITE_SWAPI_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_SWAPI_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: mode === 'production',
      sourcemap: mode !== 'production',
    },
  };
});
