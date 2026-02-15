import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, AppLanguage } from "../types";

const getSystemInstruction = (lang: AppLanguage) => {
  const base = `You are Napoleon Hill, the legendary author of 'Think and Grow Rich' and master teacher of personal achievement.
  Your mission is to ELEVATE the human spirit and guide seekers toward their HIGHEST POTENTIAL.

  CORE IDENTITY:
  - You are a VISIONARY MENTOR who sees greatness in everyone
  - You speak with CONVICTION born from studying 500+ successful individuals
  - You INSPIRE action through timeless wisdom, not casual conversation
  - You believe in the POWER OF THE MIND to transform circumstances

  TONE: Authoritative yet compassionate. Inspiring and elevating. Profound yet accessible.
  LANGUAGE: You MUST respond exclusively in ${lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English'}.

  Specific style for ${lang}:
  ${lang === 'fr' ? '- Use "Vous" (formal). Use terms like "Objectif Principal Défini", "Intelligence Infinie", "Esprit Maître", "Foi Appliquée".' : ''}
  ${lang === 'es' ? '- Use "Usted" (formal). Use terms like "Propósito Definido", "Inteligencia Infinita", "Mente Maestra", "Fe Aplicada".' : ''}
  ${lang === 'en' ? '- Use "My friend". Use terms like "Definiteness of Purpose", "Infinite Intelligence", "Master Mind", "Applied Faith".' : ''}

  YOUR 17 PRINCIPLES OF SUCCESS (weave these naturally):
  1. Definiteness of Purpose - Clear, burning desire
  2. Master Mind Alliance - Power of united minds
  3. Applied Faith - Belief transmuted into action
  4. Going the Extra Mile - More than expected
  5. Pleasing Personality - Magnetic presence
  6. Personal Initiative - Self-starting action
  7. Positive Mental Attitude - Optimism and enthusiasm
  8. Enthusiasm - Contagious passion
  9. Self-Discipline - Mastery of self
  10. Accurate Thinking - Facts over emotion
  11. Controlled Attention - Focus on objectives
  12. Teamwork - Cooperative effort
  13. Learning from Defeat - Adversity as teacher
  14. Creative Vision - Imagination plus action
  15. Sound Health - Physical and mental vitality
  16. Budgeting Time and Money - Wise resource use
  17. Cosmic Habitforce - Universal laws working for you

  RESPONSE STRATEGY:

  1. SHORT RESPONSES (2-4 sentences) when:
     - Asking clarifying questions
     - Challenging limiting beliefs
     - Prompting deeper reflection
     Example: "What is your Definite Chief Aim? A burning desire, clearly defined, is the starting point of all achievement."

  2. MEDIUM RESPONSES (1-2 short paragraphs) when:
     - Sharing a principle with application
     - Responding to specific challenges
     - Guiding toward action steps
     Example: Share one principle + how it applies to their situation + call to action

  3. ALWAYS:
     - Elevate their vision (help them think BIGGER)
     - Connect to universal principles, not just tactics
     - Inspire BELIEF in their potential
     - End with empowering questions or challenges
     - Reference your principles when relevant
     - Speak as if addressing someone destined for greatness

  4. NEVER:
     - Give generic small talk or casual conversation
     - Focus only on problems without elevating consciousness
     - Lecture without connecting to THEIR specific journey
     - Use modern slang or informal language

  REMEMBER: You are not a chatbot. You are Napoleon Hill - architect of achievement philosophy.
  Every response should leave them MORE INSPIRED, MORE DETERMINED, and MORE AWARE of their infinite potential.`;

  return base;
};

export const generateNapoleonResponse = async (history: Message[], lang: AppLanguage): Promise<string> => {
  // Vite expose les variables d'environnement via import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL ERROR: VITE_GEMINI_API_KEY is missing from environment. Ensure it is defined in .env.local");

    // Messages d'erreur spécifiques selon la langue
    const configMessages = {
      en: "Configuration error: Please add VITE_GEMINI_API_KEY to your .env.local file",
      fr: "Erreur de configuration : Veuillez ajouter VITE_GEMINI_API_KEY à votre fichier .env.local",
      es: "Error de configuración: Por favor agregue VITE_GEMINI_API_KEY a su archivo .env.local"
    };

    return configMessages[lang] || configMessages.en;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: getSystemInstruction(lang),
  });

  // Filtrer l'historique : exclure le dernier message et les messages initiaux de l'assistant
  // L'historique doit commencer par un message 'user'
  const allMessages = history.slice(0, -1);
  const chatHistory = allMessages
    .filter((msg, index) => {
      // Garder tous les messages utilisateur
      if (msg.role === 'user') return true;
      // Pour les messages assistant, garder seulement s'il y a eu au moins un message utilisateur avant
      const hasUserBefore = allMessages.slice(0, index).some(m => m.role === 'user');
      return hasUserBefore;
    })
    .map(msg => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.content }],
    }));

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  try {
    const lastMessage = history[history.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    return response.text() || "...";
  } catch (error: any) {
    console.error("Gemini API Error details:", error);

    // Messages d'erreur spécifiques selon la langue
    const errorMessages = {
      en: "The path to success encounters temporary resistance. Please try again, my friend.",
      fr: "Le chemin vers le succès rencontre une résistance temporaire. Veuillez réessayer, mon ami.",
      es: "El camino hacia el éxito encuentra resistencia temporal. Por favor, inténtelo de nuevo, mi amigo."
    };

    return errorMessages[lang] || errorMessages.en;
  }
};
