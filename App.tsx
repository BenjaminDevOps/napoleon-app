import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import AutoSuggestion from './components/AutoSuggestion';
import SubscriptionModal from './components/SubscriptionModal';
import LandingPage from './components/LandingPage';
import ChallengeModal from './components/ChallengeModal';
import { UserProfile, MAX_FREE_MESSAGES, AppLanguage } from './types';
import { initBilling } from './services/billingService';

type Tab = 'chat' | 'challenges' | 'autosuggestion';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('napoleon_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // On s'assure que messageCount est bien un nombre, sinon 0
        const count = typeof parsed.messageCount === 'number' && !isNaN(parsed.messageCount) ? parsed.messageCount : 0;
        return {
          ...parsed,
          messageCount: count,
          isPremium: !!parsed.isPremium
        };
      }
    } catch (e) { console.error("Storage error:", e); }
    return { name: 'Guest', isPremium: false, messageCount: 0, language: 'en' };
  });

  useEffect(() => {
    initBilling(() => {
      setUser(prev => ({ ...prev, isPremium: true }));
      setShowPaywall(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('napoleon_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    // Auto-ouvrir le modal quand on arrive sur l'onglet Challenges
    if (activeTab === 'challenges') {
      setShowChallengeModal(true);
    }
  }, [activeTab]);

  const handleStart = (lang: AppLanguage) => {
    setUser(prev => ({ ...prev, language: lang }));
    setHasStarted(true);
  };

  const incrementMessageCount = () => {
    // Log pour debugging
    console.log('[Message Count Debug]', {
      currentCount: user.messageCount,
      limit: MAX_FREE_MESSAGES,
      isPremium: user.isPremium
    });

    // Seuls les utilisateurs premium peuvent bypasser la limite
    if (user.isPremium) {
      console.log('[Message Count] Bypassing limit (premium user)');
      return true;
    }

    // Si on a déjà atteint ou dépassé la limite de 8 messages
    if (user.messageCount >= MAX_FREE_MESSAGES) {
      console.log('[Message Count] Limit reached, showing paywall');
      setShowPaywall(true);
      return false;
    }

    console.log('[Message Count] Incrementing:', user.messageCount, '→', user.messageCount + 1);
    setUser(prev => ({ ...prev, messageCount: prev.messageCount + 1 }));
    return true;
  };

  if (!hasStarted) {
    return <LandingPage onStart={handleStart} />;
  }

  // L'utilisateur est limité uniquement s'il n'est pas premium ET a envoyé 5 messages ou plus
  const isLimited = !user.isPremium && user.messageCount >= MAX_FREE_MESSAGES;

  const tabTranslations = {
    en: { chat: 'Chat', challenges: 'Challenges', autosuggestion: 'Affirmation' },
    fr: { chat: 'Chat', challenges: 'Défis', autosuggestion: 'Affirmation' },
    es: { chat: 'Chat', challenges: 'Desafíos', autosuggestion: 'Afirmación' },
  };

  const t = tabTranslations[user.language];

  return (
    <div className="flex flex-col h-screen bg-[#1a2b48] overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatWindow
            user={user}
            onMessageSent={incrementMessageCount}
            onUpgrade={() => setShowPaywall(true)}
            isLimited={isLimited}
          />
        ) : activeTab === 'challenges' ? (
          <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1a2b48] to-[#121c2f]">
            <div className="text-6xl mb-6 animate-bounce">🎯</div>
            <h2 className="text-2xl font-serif font-bold text-white mb-4 text-center">
              {user.language === 'fr' ? 'Défis Quotidiens' : user.language === 'es' ? 'Desafíos Diarios' : 'Daily Challenges'}
            </h2>
            <p className="text-white/60 text-center mb-8 max-w-md">
              {user.language === 'fr'
                ? 'Chaque défi est conçu pour vous propulser vers votre plein potentiel.'
                : user.language === 'es'
                ? 'Cada desafío está diseñado para impulsarte hacia tu máximo potencial.'
                : 'Each challenge is designed to propel you toward your full potential.'}
            </p>
            <button
              onClick={() => setShowChallengeModal(true)}
              className="btn-gold shimmer px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl active:scale-95 transition-transform"
            >
              {user.language === 'fr' ? '🎯 Nouveau Défi' : user.language === 'es' ? '🎯 Nuevo Desafío' : '🎯 New Challenge'}
            </button>

            {showChallengeModal && (
              <ChallengeModal
                lang={user.language}
                onClose={() => setShowChallengeModal(false)}
              />
            )}
          </div>
        ) : (
          <AutoSuggestion language={user.language} />
        )}
      </div>

      {/* Tab Navigation */}
      <nav className="bg-[#1a2b48] border-t border-white/10 flex pb-[env(safe-area-inset-bottom)]">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${
            activeTab === 'chat'
              ? 'text-[#d4af37]'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider">{t.chat}</span>
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${
            activeTab === 'challenges'
              ? 'text-[#d4af37]'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <div className="text-2xl">🎯</div>
          <span className="text-[9px] font-bold uppercase tracking-wider">{t.challenges}</span>
        </button>

        <button
          onClick={() => setActiveTab('autosuggestion')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${
            activeTab === 'autosuggestion'
              ? 'text-[#d4af37]'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-wider">{t.autosuggestion}</span>
        </button>
      </nav>

      {showPaywall && (
        <SubscriptionModal
          lang={user.language}
          onClose={() => setShowPaywall(false)}
          onSubscribe={() => {
            setUser(prev => ({ ...prev, isPremium: true }));
            setShowPaywall(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
