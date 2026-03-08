
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
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
