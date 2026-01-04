
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '');

  // Utiliser GEMINI_API_KEY ou API_KEY, selon ce qui est défini
  const apiKey = env.GEMINI_API_KEY || env.API_KEY || env.VITE_GEMINI_API_KEY;

  return {
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
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});
