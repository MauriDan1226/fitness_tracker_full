import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // si el 5173 esta ocupado vite pasa al siguiente puerto libre
    strictPort: false,
    open: false,
  },
});
