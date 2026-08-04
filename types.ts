
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

// Limite de messages gratuits avant abonnement - toujours 5, pas de mode dev
export const MAX_FREE_MESSAGES = 5;
