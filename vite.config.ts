
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Utiliser des chemins relatifs pour que l'app fonctionne sur mobile (file://)
  base: './',
  build: {
    outDir: 'www',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
});
