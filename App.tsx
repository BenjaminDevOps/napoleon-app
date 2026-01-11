import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import SubscriptionModal from './components/SubscriptionModal';
import LandingPage from './components/LandingPage';
import { UserProfile, MAX_FREE_MESSAGES, AppLanguage, IS_DEV_MODE } from './types';
import { initBilling } from './services/billingService';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

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

  const handleStart = (lang: AppLanguage) => {
    setUser(prev => ({ ...prev, language: lang }));
    setHasStarted(true);
  };

  const incrementMessageCount = () => {
    // En mode dev, pas de limite
    if (IS_DEV_MODE || user.isPremium) return true;

    // Si on a déjà atteint ou dépassé la limite
    if (user.messageCount >= MAX_FREE_MESSAGES) {
      setShowPaywall(true);
      return false;
    }

    setUser(prev => ({ ...prev, messageCount: prev.messageCount + 1 }));
    return true;
  };

  const resetMessageCount = () => {
    setUser(prev => ({ ...prev, messageCount: 0 }));
  };

  if (!hasStarted) {
    return <LandingPage onStart={handleStart} />;
  }

  // L'utilisateur est limité uniquement s'il n'est pas premium ET a envoyé 5 messages ou plus
  const isLimited = !user.isPremium && user.messageCount >= MAX_FREE_MESSAGES;

  return (
    <div className="flex flex-col h-screen bg-[#1a2b48] overflow-hidden">
      {IS_DEV_MODE && (
        <div className="bg-yellow-500 text-black px-3 py-1 text-xs text-center flex justify-between items-center">
          <span>🔧 DEV MODE - Limite: {MAX_FREE_MESSAGES} messages</span>
          <button
            onClick={resetMessageCount}
            className="bg-black text-yellow-500 px-2 py-0.5 rounded text-xs hover:bg-gray-800"
          >
            Reset Count ({user.messageCount})
          </button>
        </div>
      )}

      <ChatWindow
        user={user}
        onMessageSent={incrementMessageCount}
        onUpgrade={() => setShowPaywall(true)}
        isLimited={isLimited}
      />

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
