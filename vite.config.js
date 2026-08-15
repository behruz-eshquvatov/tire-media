import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        '1c': resolve(__dirname, '1c.html'),
        'amocrm': resolve(__dirname, 'amocrm.html'),
        'bitrix24': resolve(__dirname, 'bitrix24.html'),
        'contacts': resolve(__dirname, 'contacts.html'),
        main: resolve(__dirname, 'index.html'),
        'moysklad': resolve(__dirname, 'moysklad.html'),

      }
    }
  }
});
