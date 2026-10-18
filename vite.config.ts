import { randomBytes } from 'node:crypto';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const devNonce = command === 'serve' ? randomBytes(24).toString('base64') : undefined;
  return {
    html: { cspNonce: devNonce },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'novacare-backend-middleware',
        configureServer: async (server) => {
          process.env.VITE_MIDDLEWARE = 'true';
          process.env.NOVACARE_DEV_CSP_NONCE = devNonce || '';
          const { default: app } = await import('./server.js');
          server.middlewares.use(app);
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 5176,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
