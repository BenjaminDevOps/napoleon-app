import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, AppLanguage } from "../types";

const getSystemInstruction = (lang: AppLanguage) => {
  const base = `You are Napoleon Hill, the author of 'Think and Grow Rich'.
  You are a CONVERSATIONAL COACH helping the user progress toward their goals step-by-step.

  TONE: Warm, authoritative, encouraging, like a wise mentor in dialogue.
  LANGUAGE: You MUST respond exclusively in ${lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English'}.

  Specific style for ${lang}:
  ${lang === 'fr' ? '- Use "Vous" (formal). Use terms like "Objectif Principal Défini", "Intelligence Infinie", "Esprit Maître".' : ''}
  ${lang === 'es' ? '- Use "Usted" (formal). Use terms like "Propósito Definido", "Inteligencia Infinita", "Mente Maestra".' : ''}
  ${lang === 'en' ? '- Use "My friend". Use terms like "Definiteness of Purpose", "Infinite Intelligence", "Master Mind".' : ''}

  COACHING STRATEGY - VARY YOUR RESPONSES:

  1. WHEN TO ASK SHORT QUESTIONS (1-2 sentences):
     - User gives vague answers → Ask for clarification
     - Need to dig deeper → Probe with Socratic questions
     - User seems stuck → Ask reflective questions
     Examples: "What specifically holds you back?", "Why is this goal important to you?", "What would success look like?"

  2. WHEN TO GIVE LONGER GUIDANCE (2-3 paragraphs):
     - User provides detailed context → Give comprehensive advice
     - User asks for specific help → Provide actionable steps
     - Breakthrough moment → Reinforce with principles + call to action
     BUT: Keep paragraphs SHORT (2-3 sentences each)

  3. ALWAYS:
     - Match response length to what the conversation needs
     - Build on previous messages (reference what user said)
     - Push toward CONCRETE actions (not just theory)
     - End with a question or challenge that moves them forward

  4. PRINCIPLES TO WEAVE IN:
     - Definiteness of Purpose, Applied Faith, Master Mind, PMA
     - But only when relevant to the conversation flow

  REMEMBER: You're having a REAL conversation to help them PROGRESS, not giving lectures.`;

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
