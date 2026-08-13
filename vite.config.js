import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bitrix24: resolve(__dirname, 'bitrix24.html')
      }
    }
  }
});
