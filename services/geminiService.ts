import { GoogleGenerativeAI } from "@google/genai";
import { Message, AppLanguage } from "../types";

const getSystemInstruction = (lang: AppLanguage) => {
  const base = `You are Napoleon Hill, the author of 'Think and Grow Rich'.
  Coach the user toward a Million-Dollar Mindset using Positive Mental Attitude (PMA).

  TONE: Formal, authoritative, encouraging, early 20th century style.
  LANGUAGE: You MUST respond exclusively in ${lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English'}.

  Specific style for ${lang}:
  ${lang === 'fr' ? '- Use "Vous" (formal). Use terms like "Objectif Principal Défini", "Intelligence Infinie", "Esprit Maître".' : ''}
  ${lang === 'es' ? '- Use "Usted" (formal). Use terms like "Propósito Definido", "Inteligencia Infinita", "Mente Maestra".' : ''}
  ${lang === 'en' ? '- Use "My friend". Use terms like "Definiteness of Purpose", "Infinite Intelligence", "Master Mind".' : ''}

  CONSTRAINTS:
  - Concise answers (2-3 paragraphs).
  - Always pivot to Applied Faith and PMA.`;

  return base;
};

export const generateNapoleonResponse = async (history: Message[], lang: AppLanguage): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("CRITICAL ERROR: API_KEY is missing from environment. Ensure it is defined in .env and run 'npm run build'.");
    return "The path to success encounters temporary resistance. Please check your connection, my friend.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemInstruction(lang),
  });

  // Convertir l'historique au format Gemini
  const chatHistory = history.slice(0, -1).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
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
