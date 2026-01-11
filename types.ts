
export type AppLanguage = 'en' | 'fr' | 'es';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  isPremium: boolean;
  messageCount: number;
  language: AppLanguage;
}

// Mode développement : détecté par variable d'environnement
// Pour activer le mode dev, créez un fichier .env.local avec: VITE_DEV_MODE=true
export const IS_DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

// En mode développement, limite très élevée pour faciliter les tests
export const MAX_FREE_MESSAGES = IS_DEV_MODE ? 9999 : 5;
