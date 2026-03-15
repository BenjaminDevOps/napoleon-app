
import React, { useState, useEffect } from 'react';
import PremiumHome from './components/premium/PremiumHome';
import PremiumLanding from './components/premium/PremiumLanding';
import { UserProfile, MAX_FREE_MESSAGES, AppLanguage } from './types';
import { initBilling } from './services/billingService';

const DEFAULT_USER: UserProfile = {
  name: 'Guest',
  isPremium: false,
  messageCount: 0,
  language: 'en',
  completedChallenges: [],
  favoritedAffirmations: [],
};

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('napoleon_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old saves that lack new fields
        return {
          ...DEFAULT_USER,
          ...parsed,
          completedChallenges: parsed.completedChallenges ?? [],
          favoritedAffirmations: parsed.favoritedAffirmations ?? [],
        };
      }
    } catch (_) { /* ignore */ }
    return { ...DEFAULT_USER };
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

  const incrementMessageCount = (): boolean => {
    if (user.isPremium) return true;
    if (user.messageCount >= MAX_FREE_MESSAGES) {
      setShowPaywall(true);
      return false;
    }
    setUser(prev => ({ ...prev, messageCount: prev.messageCount + 1 }));
    return true;
  };

  const handleChallengeComplete = (id: string) => {
    setUser(prev => ({
      ...prev,
      completedChallenges: prev.completedChallenges.includes(id)
        ? prev.completedChallenges
        : [...prev.completedChallenges, id],
    }));
  };

  const handleAffirmationFavorite = (id: number) => {
    setUser(prev => ({
      ...prev,
      favoritedAffirmations: prev.favoritedAffirmations.includes(id)
        ? prev.favoritedAffirmations
        : [...prev.favoritedAffirmations, id],
    }));
  };

  if (!hasStarted) {
    return <PremiumLanding onStart={handleStart} />;
  }

  return (
    <PremiumHome
      user={user}
      onMessageSent={incrementMessageCount}
      onUpgrade={() => setShowPaywall(true)}
      onPremiumGranted={() => {
        setUser(prev => ({ ...prev, isPremium: true }));
        setShowPaywall(false);
      }}
      onChallengeComplete={handleChallengeComplete}
      onAffirmationFavorite={handleAffirmationFavorite}
      showPaywall={showPaywall}
      onClosePaywall={() => setShowPaywall(false)}
    />
  );
};

export default App;
