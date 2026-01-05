
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

// En mode développement, augmenter la limite pour faciliter les tests
export const MAX_FREE_MESSAGES = import.meta.env.DEV ? 1000 : 5;
