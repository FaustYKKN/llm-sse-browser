import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'client'),
  base: '/lovework/',
  build: {
    outDir: resolve(__dirname, 'client/dist')
  },
  plugins: [react()]
});
