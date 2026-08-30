import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true, // 端口固定:网关白名单只放了 5173
    host: '0.0.0.0',
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
