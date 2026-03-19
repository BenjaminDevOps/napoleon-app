
import { AppLanguage } from './types';

export const translations: Record<AppLanguage, any> = {
  en: {
    // Landing
    welcome: "Greetings, my friend. I am Napoleon Hill. I have spent twenty years analyzing the world's most successful men. What is your Definite Chief Aim today?",
    landingTitle: "Think & Grow Rich",
    landingSubtitle: "Whatever the mind can conceive and believe, it can achieve.",
    landingTagline: "Your personal success mentor",
    ctaStart: "Begin Your Journey",
    // Chat
    upgrade: "Upgrade",
    member: "Master Mind Member",
    placeholder: "Ask Napoleon Hill...",
    dailyLimit: "Daily message limit reached",
    unlock: "Unlock the Master Mind",
    // Paywall
    paywallTitle: "Master Mind Access",
    paywallBody: "Your daily free insights are exhausted. To continue building your Million-Dollar Mindset, join our Master Mind group.",
    subscribeBtn: "Subscribe Now ($9.99/mo)",
    maybeLater: "Maybe Later",
    // Tabs
    tabChat: "Chat",
    tabChallenges: "Challenges",
    tabAffirmations: "Affirm",
    // Challenges
    challengesHeader: "Daily Challenges",
    challengesSubtitle: "Small steps, extraordinary results",
    challengeToday: "Today's Challenge",
    challengeWeekly: "This Week",
    challengeComplete: "Completed!",
    challengeStart: "Accept Challenge",
    challengeDone: "Mark as Done",
    challengeStreak: "Day streak",
    // Affirmations
    affirmationsHeader: "Daily Affirmations",
    affirmationsSubtitle: "Reprogram your mind for success",
    affirmationOfDay: "Affirmation of the Day",
    affirmationBreathing: "Breathe deeply and repeat",
    affirmationNext: "Next",
    affirmationFavorite: "Save",
    affirmationSaved: "Saved ✓",
    affirmationCustom: "My own affirmation",
    affirmationCustomPlaceholder: "Write your personal affirmation...",
    affirmationRepeat: "Repeat 10×",
    affirmationRepeatTitle: "Say it out loud",
    affirmationRepeatDone: "Completed!",
    affirmationRepeatBack: "Done",
  },
  fr: {
    welcome: "Salutations, mon ami. Je suis Napoleon Hill. J'ai passé vingt ans à analyser les hommes les plus riches. Quel est votre Objectif Principal défini aujourd'hui ?",
    landingTitle: "Réfléchissez & Grandissez",
    landingSubtitle: "Tout ce que l'esprit peut concevoir et croire, il peut le réaliser.",
    landingTagline: "Votre mentor personnel du succès",
    ctaStart: "Commencer votre voyage",
    upgrade: "S'abonner",
    member: "Membre Master Mind",
    placeholder: "Demandez à Napoleon Hill...",
    dailyLimit: "Limite de messages atteinte",
    unlock: "Débloquer le Master Mind",
    paywallTitle: "Accès Master Mind",
    paywallBody: "Vos conseils gratuits sont épuisés. Pour continuer à bâtir votre mentalité de millionnaire, rejoignez notre groupe Master Mind.",
    subscribeBtn: "S'abonner (9,99€/mois)",
    maybeLater: "Plus tard",
    tabChat: "Chat",
    tabChallenges: "Défis",
    tabAffirmations: "Affirmations",
    challengesHeader: "Défis du Jour",
    challengesSubtitle: "Petits pas, résultats extraordinaires",
    challengeToday: "Défi du Jour",
    challengeWeekly: "Cette Semaine",
    challengeComplete: "Accompli !",
    challengeStart: "Accepter le défi",
    challengeDone: "Marquer comme fait",
    challengeStreak: "Jours consécutifs",
    affirmationsHeader: "Affirmations",
    affirmationsSubtitle: "Reprogrammez votre esprit pour le succès",
    affirmationOfDay: "Affirmation du Jour",
    affirmationBreathing: "Respirez et répétez",
    affirmationNext: "Suivant",
    affirmationFavorite: "Sauvegarder",
    affirmationSaved: "Sauvegardé ✓",
    affirmationCustom: "Mon affirmation personnelle",
    affirmationCustomPlaceholder: "Écrivez votre affirmation personnelle...",
    affirmationRepeat: "Répéter 10×",
    affirmationRepeatTitle: "Dites-le à voix haute",
    affirmationRepeatDone: "Accompli !",
    affirmationRepeatBack: "Terminé",
  },
  es: {
    welcome: "Saludos, amigo mío. Soy Napoleon Hill. He pasado veinte años analizando a los hombres más exitosos. ¿Cuál es su Objetivo Principal hoy?",
    landingTitle: "Piense & Hágase Rico",
    landingSubtitle: "Lo que la mente puede concebir y creer, puede lograrlo.",
    landingTagline: "Su mentor personal de éxito",
    ctaStart: "Comienza tu viaje",
    upgrade: "Mejorar",
    member: "Miembro Master Mind",
    placeholder: "Pregúntele a Napoleon Hill...",
    dailyLimit: "Límite de mensajes alcanzado",
    unlock: "Desbloquear Master Mind",
    paywallTitle: "Acceso Master Mind",
    paywallBody: "Sus consejos gratuitos diarios se han agotado. Para seguir construyendo su mentalidad de éxito, únase a nuestro grupo.",
    subscribeBtn: "Suscribirse ($9.99/mes)",
    maybeLater: "Más tarde",
    tabChat: "Chat",
    tabChallenges: "Desafíos",
    tabAffirmations: "Afirmar",
    challengesHeader: "Desafíos Diarios",
    challengesSubtitle: "Pequeños pasos, resultados extraordinarios",
    challengeToday: "Desafío de Hoy",
    challengeWeekly: "Esta Semana",
    challengeComplete: "¡Completado!",
    challengeStart: "Aceptar Desafío",
    challengeDone: "Marcar como Hecho",
    challengeStreak: "Días seguidos",
    affirmationsHeader: "Afirmaciones",
    affirmationsSubtitle: "Reprograma tu mente para el éxito",
    affirmationOfDay: "Afirmación del Día",
    affirmationBreathing: "Respira profundo y repite",
    affirmationNext: "Siguiente",
    affirmationFavorite: "Guardar",
    affirmationSaved: "Guardado ✓",
    affirmationCustom: "Mi afirmación personal",
    affirmationCustomPlaceholder: "Escribe tu afirmación personal...",
    affirmationRepeat: "Repetir 10×",
    affirmationRepeatTitle: "Dilo en voz alta",
    affirmationRepeatDone: "¡Completado!",
    affirmationRepeatBack: "Hecho",
  }
};

export const challenges = {
  en: [
    {
      id: 'c1', emoji: '🧠', category: 'mindset',
      title: 'Morning Visualization',
      description: 'Spend 5 minutes visualizing your chief aim as already achieved. Feel it, see it, believe it.',
      duration: '5 min'
    },
    {
      id: 'c2', emoji: '📝', category: 'action',
      title: 'Write Your Definite Aim',
      description: 'Write your primary goal in present tense, with a deadline and a plan. Read it aloud twice.',
      duration: '10 min'
    },
    {
      id: 'c3', emoji: '🤝', category: 'action',
      title: 'Add Value First',
      description: 'Identify one person you can help today without expecting anything in return.',
      duration: '15 min'
    },
    {
      id: 'c4', emoji: '🙏', category: 'gratitude',
      title: 'Gratitude Journal',
      description: 'Write 3 things you\'re grateful for and explain why each one matters to your success.',
      duration: '8 min'
    },
    {
      id: 'c5', emoji: '🎯', category: 'focus',
      title: 'Deep Work Block',
      description: 'Eliminate all distractions and focus entirely on your most important task for 25 minutes.',
      duration: '25 min'
    },
    {
      id: 'c6', emoji: '📚', category: 'mindset',
      title: 'Read & Reflect',
      description: 'Read one chapter of an inspiring book. Write down the single most important lesson.',
      duration: '20 min'
    },
    {
      id: 'c7', emoji: '💪', category: 'action',
      title: 'Take Bold Action',
      description: 'Do one thing today that scares you slightly — a call, a message, a decision you\'ve been postponing.',
      duration: '10 min'
    },
  ],
  fr: [
    {
      id: 'c1', emoji: '🧠', category: 'mindset',
      title: 'Visualisation Matinale',
      description: 'Passez 5 minutes à visualiser votre objectif principal comme déjà accompli. Ressentez-le, voyez-le, croyez-y.',
      duration: '5 min'
    },
    {
      id: 'c2', emoji: '📝', category: 'action',
      title: 'Écrivez votre Objectif',
      description: 'Rédigez votre objectif au présent, avec une date limite et un plan. Lisez-le à voix haute deux fois.',
      duration: '10 min'
    },
    {
      id: 'c3', emoji: '🤝', category: 'action',
      title: 'Apporter de la Valeur',
      description: 'Identifiez une personne que vous pouvez aider aujourd\'hui sans rien attendre en retour.',
      duration: '15 min'
    },
    {
      id: 'c4', emoji: '🙏', category: 'gratitude',
      title: 'Journal de Gratitude',
      description: 'Écrivez 3 choses pour lesquelles vous êtes reconnaissant et expliquez leur importance.',
      duration: '8 min'
    },
    {
      id: 'c5', emoji: '🎯', category: 'focus',
      title: 'Bloc de Concentration',
      description: 'Éliminez toutes les distractions et concentrez-vous sur votre tâche principale pendant 25 minutes.',
      duration: '25 min'
    },
    {
      id: 'c6', emoji: '📚', category: 'mindset',
      title: 'Lire et Réfléchir',
      description: 'Lisez un chapitre d\'un livre inspirant. Notez la leçon la plus importante.',
      duration: '20 min'
    },
    {
      id: 'c7', emoji: '💪', category: 'action',
      title: 'Action Audacieuse',
      description: 'Faites une chose qui vous effraie légèrement — un appel, un message, une décision reportée.',
      duration: '10 min'
    },
  ],
  es: [
    {
      id: 'c1', emoji: '🧠', category: 'mindset',
      title: 'Visualización Matutina',
      description: 'Pase 5 minutos visualizando su objetivo principal como ya logrado. Siéntalo, véalo, créalo.',
      duration: '5 min'
    },
    {
      id: 'c2', emoji: '📝', category: 'action',
      title: 'Escribe tu Objetivo',
      description: 'Escribe tu objetivo principal en tiempo presente con fecha límite. Léelo en voz alta dos veces.',
      duration: '10 min'
    },
    {
      id: 'c3', emoji: '🤝', category: 'action',
      title: 'Aportar Valor',
      description: 'Identifica a alguien a quien puedas ayudar hoy sin esperar nada a cambio.',
      duration: '15 min'
    },
    {
      id: 'c4', emoji: '🙏', category: 'gratitude',
      title: 'Diario de Gratitud',
      description: 'Escribe 3 cosas por las que estás agradecido y explica por qué importan a tu éxito.',
      duration: '8 min'
    },
    {
      id: 'c5', emoji: '🎯', category: 'focus',
      title: 'Bloque de Enfoque',
      description: 'Elimina todas las distracciones y enfócate en tu tarea más importante por 25 minutos.',
      duration: '25 min'
    },
    {
      id: 'c6', emoji: '📚', category: 'mindset',
      title: 'Leer y Reflexionar',
      description: 'Lee un capítulo de un libro inspirador. Escribe la lección más importante.',
      duration: '20 min'
    },
    {
      id: 'c7', emoji: '💪', category: 'action',
      title: 'Acción Audaz',
      description: 'Haz algo que te asuste ligeramente hoy — una llamada, un mensaje, una decisión postergada.',
      duration: '10 min'
    },
  ]
};

export const affirmations = {
  en: [
    { id: 1, text: "I am the master of my fate and the captain of my soul.", author: "Napoleon Hill" },
    { id: 2, text: "Every adversity carries the seed of an equivalent or greater benefit.", author: "Napoleon Hill" },
    { id: 3, text: "Whatever I can conceive and believe, I can achieve.", author: "Napoleon Hill" },
    { id: 4, text: "My thoughts are transmuted into their physical equivalent with burning desire.", author: "Napoleon Hill" },
    { id: 5, text: "I attract success by being definite in my purpose and persistent in my action.", author: "Napoleon Hill" },
    { id: 6, text: "I am worthy of abundance, and I receive it gratefully.", author: "Napoleon Hill" },
    { id: 7, text: "My mind is a powerful magnet, drawing wealth, health and happiness to me now.", author: "Napoleon Hill" },
    { id: 8, text: "I persist until I succeed. Failure is not an option — only a lesson.", author: "Napoleon Hill" },
    { id: 9, text: "Today I take one step closer to my definite chief aim.", author: "Napoleon Hill" },
    { id: 10, text: "I am surrounded by a Master Mind of brilliant, supportive people.", author: "Napoleon Hill" },
  ],
  fr: [
    { id: 1, text: "Je suis le maître de mon destin et le capitaine de mon âme.", author: "Napoleon Hill" },
    { id: 2, text: "Chaque adversité porte en elle la graine d'un bénéfice équivalent ou supérieur.", author: "Napoleon Hill" },
    { id: 3, text: "Tout ce que mon esprit peut concevoir et croire, il peut le réaliser.", author: "Napoleon Hill" },
    { id: 4, text: "Mes pensées se transmutent en réalité physique grâce à un désir ardent.", author: "Napoleon Hill" },
    { id: 5, text: "J'attire le succès par la précision de mon but et la persistance de mes actions.", author: "Napoleon Hill" },
    { id: 6, text: "Je mérite l'abondance et je la reçois avec gratitude.", author: "Napoleon Hill" },
    { id: 7, text: "Mon esprit est un puissant aimant qui attire la richesse, la santé et le bonheur.", author: "Napoleon Hill" },
    { id: 8, text: "Je persiste jusqu'à la victoire. L'échec n'est qu'une leçon.", author: "Napoleon Hill" },
    { id: 9, text: "Aujourd'hui, je fais un pas de plus vers mon objectif principal.", author: "Napoleon Hill" },
    { id: 10, text: "Je suis entouré d'un Master Mind de personnes brillantes et bienveillantes.", author: "Napoleon Hill" },
  ],
  es: [
    { id: 1, text: "Soy el amo de mi destino y el capitán de mi alma.", author: "Napoleon Hill" },
    { id: 2, text: "Cada adversidad lleva la semilla de un beneficio equivalente o mayor.", author: "Napoleon Hill" },
    { id: 3, text: "Todo lo que mi mente puede concebir y creer, puede lograrlo.", author: "Napoleon Hill" },
    { id: 4, text: "Mis pensamientos se transmutan en su equivalente físico con deseo ardiente.", author: "Napoleon Hill" },
    { id: 5, text: "Atraigo el éxito siendo definido en mi propósito y persistente en mi acción.", author: "Napoleon Hill" },
    { id: 6, text: "Merezco la abundancia y la recibo con gratitud.", author: "Napoleon Hill" },
    { id: 7, text: "Mi mente es un poderoso imán que atrae riqueza, salud y felicidad.", author: "Napoleon Hill" },
    { id: 8, text: "Persisto hasta triunfar. El fracaso es solo una lección.", author: "Napoleon Hill" },
    { id: 9, text: "Hoy doy un paso más hacia mi objetivo principal definitivo.", author: "Napoleon Hill" },
    { id: 10, text: "Estoy rodeado de un Master Mind de personas brillantes y solidarias.", author: "Napoleon Hill" },
  ]
};
