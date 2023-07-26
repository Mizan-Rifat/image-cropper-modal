import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'image-cropper-modal',
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
