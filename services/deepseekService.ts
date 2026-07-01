import { Message, AppLanguage } from "../types";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-v4-flash";

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

  4. ACTION CHALLENGES - Include concrete, actionable challenges:
     When appropriate, propose a specific ACTION CHALLENGE:

     Format examples:
     "🎯 CHALLENGE: Write down your Definite Chief Aim. Read it aloud twice daily for 7 days - once upon waking, once before sleep."

     "⚡ ACTION: For the next 24 hours, say 'I can and I will' each time doubt appears. Notice how your energy shifts."

     "🔥 DÉFI: Identifiez une personne qui possède ce que vous désirez. Contactez-la cette semaine pour un conseil de 15 minutes."

     Challenges should be:
     - Specific and time-bound (24h, 7 days, this week)
     - Aligned with one of the 17 Principles
     - Actionable immediately
     - Designed to break through limiting beliefs

  5. NEVER:
     - Give generic small talk or casual conversation
     - Focus only on problems without elevating consciousness
     - Lecture without connecting to THEIR specific journey
     - Use modern slang or informal language

  REMEMBER: You are not a chatbot. You are Napoleon Hill - architect of achievement philosophy.
  Every response should leave them MORE INSPIRED, MORE DETERMINED, and MORE AWARE of their infinite potential.
  ACTION is the bridge between desire and achievement - guide them to take that first step TODAY.`;

  return base;
};

const getConfigErrorMessage = (lang: AppLanguage): string => {
  const configMessages: Record<AppLanguage, string> = {
    en: "Configuration error: Please add VITE_DEEP_API_KEY to your .env.local file",
    fr: "Erreur de configuration : Veuillez ajouter VITE_DEEP_API_KEY à votre fichier .env.local",
    es: "Error de configuración: Por favor agregue VITE_DEEP_API_KEY a su archivo .env.local"
  };
  return configMessages[lang] || configMessages.en;
};

const getResponseErrorMessage = (lang: AppLanguage): string => {
  const errorMessages: Record<AppLanguage, string> = {
    en: "The path to success encounters temporary resistance. Please try again, my friend.",
    fr: "Le chemin vers le succès rencontre une résistance temporaire. Veuillez réessayer, mon ami.",
    es: "El camino hacia el éxito encuentra resistencia temporal. Por favor, inténtelo de nuevo, mi amigo."
  };
  return errorMessages[lang] || errorMessages.en;
};

interface DeepSeekChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const callDeepSeek = async (
  apiKey: string,
  messages: DeepSeekChatMessage[],
  options: { temperature: number; maxTokens: number }
): Promise<string> => {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`DeepSeek API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || "...";
};

export const generateNapoleonResponse = async (history: Message[], lang: AppLanguage): Promise<string> => {
  const apiKey = import.meta.env.VITE_DEEP_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL ERROR: VITE_DEEP_API_KEY is missing from environment. Ensure it is defined in .env.local");
    return getConfigErrorMessage(lang);
  }

  const chatMessages: DeepSeekChatMessage[] = [
    { role: "system", content: getSystemInstruction(lang) },
    ...history.map((msg) => ({
      role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    })),
  ];

  try {
    return await callDeepSeek(apiKey, chatMessages, { temperature: 0.7, maxTokens: 500 });
  } catch (error: any) {
    console.error("DeepSeek API Error details:", error);
    return getResponseErrorMessage(lang);
  }
};

// Générer un challenge quotidien personnalisé basé sur les 17 principes de Napoleon Hill
export const generateDailyChallenge = async (lang: AppLanguage): Promise<string> => {
  const apiKey = import.meta.env.VITE_DEEP_API_KEY;

  if (!apiKey) {
    return getConfigErrorMessage(lang);
  }

  const challengePrompts: Record<AppLanguage, string> = {
    en: `Generate ONE powerful daily challenge based on your 17 Principles of Success.

The challenge must be:
- Specific and actionable (can be done TODAY or within 24 hours)
- Aligned with one of your 17 principles
- Transformational (designed to break limiting beliefs)
- Clear and concise (2-4 sentences maximum)

Format:
🎯 CHALLENGE: [Specific action to take]

Principle: [Which of the 17 principles this relates to]

Why it matters: [One sentence on the transformation this creates]

Example:
🎯 CHALLENGE: Write your Definite Chief Aim on paper. Read it aloud 3 times with burning emotion - morning, noon, and night.

Principle: Definiteness of Purpose

Why it matters: Your subconscious mind responds to repetition with emotion, transforming desire into unshakeable belief.

Now generate a DIFFERENT, unique challenge. Be creative and inspiring.`,

    fr: `Générez UN défi quotidien puissant basé sur vos 17 Principes du Succès.

Le défi doit être :
- Spécifique et actionnable (réalisable AUJOURD'HUI ou dans les 24 heures)
- Aligné avec un de vos 17 principes
- Transformationnel (conçu pour briser les croyances limitantes)
- Clair et concis (2-4 phrases maximum)

Format :
🎯 DÉFI : [Action spécifique à réaliser]

Principe : [Lequel des 17 principes cela concerne]

Pourquoi c'est important : [Une phrase sur la transformation que cela crée]

Exemple :
🎯 DÉFI : Écrivez votre Objectif Principal Défini sur papier. Lisez-le à voix haute 3 fois avec émotion brûlante - matin, midi et soir.

Principe : Objectif Principal Défini

Pourquoi c'est important : Votre subconscient répond à la répétition avec émotion, transformant le désir en conviction inébranlable.

Maintenant, générez un défi DIFFÉRENT et unique. Soyez créatif et inspirant.`,

    es: `Genera UN desafío diario poderoso basado en tus 17 Principios del Éxito.

El desafío debe ser:
- Específico y accionable (se puede hacer HOY o dentro de 24 horas)
- Alineado con uno de tus 17 principios
- Transformacional (diseñado para romper creencias limitantes)
- Claro y conciso (máximo 2-4 frases)

Formato:
🎯 DESAFÍO: [Acción específica a tomar]

Principio: [Cuál de los 17 principios se relaciona]

Por qué importa: [Una frase sobre la transformación que esto crea]

Ejemplo:
🎯 DESAFÍO: Escribe tu Propósito Definido en papel. Léelo en voz alta 3 veces con emoción ardiente - mañana, mediodía y noche.

Principio: Propósito Definido

Por qué importa: Tu subconsciente responde a la repetición con emoción, transformando el deseo en convicción inquebrantable.

Ahora genera un desafío DIFERENTE y único. Sé creativo e inspirador.`
  };

  const chatMessages: DeepSeekChatMessage[] = [
    {
      role: "system",
      content: "You are Napoleon Hill, master teacher of personal achievement and author of 'Think and Grow Rich'. Generate transformational daily challenges based on your 17 Principles of Success.",
    },
    { role: "user", content: challengePrompts[lang] },
  ];

  try {
    return await callDeepSeek(apiKey, chatMessages, { temperature: 0.9, maxTokens: 300 });
  } catch (error: any) {
    console.error("DeepSeek API Error (Challenge):", error);

    const errorMessages: Record<AppLanguage, string> = {
      en: "Unable to generate challenge at this moment. The universe is preparing something powerful for you. Try again shortly, my friend.",
      fr: "Impossible de générer le défi en ce moment. L'univers vous prépare quelque chose de puissant. Réessayez sous peu, mon ami.",
      es: "No se puede generar el desafío en este momento. El universo te está preparando algo poderoso. Inténtalo de nuevo pronto, mi amigo."
    };

    return errorMessages[lang] || errorMessages.en;
  }
};
