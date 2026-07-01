
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
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL ERROR: DEEPSEEK_API_KEY is missing from environment. Ensure it is defined in .env and run 'npm run build'.");
    return "The path to success encounteres temporary resistance. Please check your connection, my friend.";
  }

  const messages = [
    { role: 'system', content: getSystemInstruction(lang) },
    ...history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ];

  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`DeepSeek API responded with status ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "...";
  } catch (error) {
    console.error("DeepSeek Error:", error);
    return "Adversity has struck. Please try again.";
  }
};
