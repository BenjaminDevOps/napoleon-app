
export type AppLanguage = 'en' | 'fr' | 'es';

export type AppTab = 'chat' | 'challenges' | 'affirmations';

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
  completedChallenges: string[];
  favoritedAffirmations: number[];
}

export interface Challenge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  duration: string;
  category: 'mindset' | 'action' | 'gratitude' | 'focus';
}

export interface Affirmation {
  id: number;
  text: string;
  author: string;
}

export const MAX_FREE_MESSAGES = 5;
