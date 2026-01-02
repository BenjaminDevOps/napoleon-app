
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
  },
  // Injecte la clé API de l'environnement au moment du build
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
