import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import AutoSuggestion from './components/AutoSuggestion';
import SubscriptionModal from './components/SubscriptionModal';
import LandingPage from './components/LandingPage';
import ChallengeModal from './components/ChallengeModal';
import { IconTarget } from './components/Icons';
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
        const count = typeof parsed.messageCount === 'number' && !isNaN(parsed.messageCount)
          ? parsed.messageCount
          : 0;
        return { ...parsed, messageCount: count, isPremium: !!parsed.isPremium };
      }
    } catch (e) {
      console.error('[App] Storage read error:', e);
    }
    return { name: 'Guest', isPremium: false, messageCount: 0, language: 'en' };
  });

  useEffect(() => {
    initBilling(() => {
      setUser(prev => ({ ...prev, isPremium: true }));
      setShowPaywall(false);
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('napoleon_user', JSON.stringify(user));
    } catch (e) {
      console.error('[App] Storage write error:', e);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'challenges') {
      setShowChallengeModal(true);
    }
  }, [activeTab]);

  const handleStart = (lang: AppLanguage) => {
    setUser(prev => ({ ...prev, language: lang }));
    setHasStarted(true);
  };

  const handlePremiumGranted = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
    setShowPaywall(false);
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

  if (!hasStarted) {
    return <LandingPage onStart={handleStart} />;
  }

  const isLimited = !user.isPremium && user.messageCount >= MAX_FREE_MESSAGES;

  const tabLabels = {
    en: { chat: 'Chat', challenges: 'Challenges', autosuggestion: 'Affirmation' },
    fr: { chat: 'Chat', challenges: 'Défis', autosuggestion: 'Affirmation' },
    es: { chat: 'Chat', challenges: 'Desafíos', autosuggestion: 'Afirmación' },
  };
  const tTab = tabLabels[user.language];

  const challengeHeadings = {
    en: { title: 'Daily Challenges', body: 'Each challenge is designed to propel you toward your full potential.', btn: 'New Challenge' },
    fr: { title: 'Défis Quotidiens', body: 'Chaque défi est conçu pour vous propulser vers votre plein potentiel.', btn: 'Nouveau Défi' },
    es: { title: 'Desafíos Diarios', body: 'Cada desafío está diseñado para impulsarte hacia tu máximo potencial.', btn: 'Nuevo Desafío' },
  };
  const tChallenge = challengeHeadings[user.language];

  return (
    <div className="flex flex-col h-full bg-[#0d1826] overflow-hidden">
      {/* ── Content area ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatWindow
            user={user}
            onMessageSent={incrementMessageCount}
            onUpgrade={() => setShowPaywall(true)}
            isLimited={isLimited}
          />
        ) : activeTab === 'challenges' ? (
          /* ── Challenges hub ──────────────────────────────────────── */
          <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
               style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.08) 0%, #0d1826 70%)' }}>

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-[80px]" />
            </div>

            {/* Icon */}
            <div className="relative mb-8 animate-scaleIn">
              <div className="w-20 h-20 rounded-full border border-[#d4af37]/30 flex items-center justify-center"
                   style={{ background: 'rgba(212,175,55,0.08)' }}>
                <IconTarget size={36} color="#d4af37" />
              </div>
              <div className="absolute inset-0 rounded-full blur-xl bg-[#d4af37]/15 -z-10" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-white mb-3 text-center animate-fadeInUp delay-100">
              {tChallenge.title}
            </h2>
            <p className="text-white/40 text-sm text-center mb-10 max-w-[280px] leading-relaxed animate-fadeInUp delay-200">
              {tChallenge.body}
            </p>
            <button
              onClick={() => setShowChallengeModal(true)}
              className="btn-gold shimmer px-8 py-4 rounded-2xl font-black uppercase tracking-[0.18em] text-sm shadow-2xl glow-gold flex items-center gap-3 animate-fadeInUp delay-300"
            >
              <IconTarget size={18} color="#0d1826" />
              {tChallenge.btn}
            </button>

            {showChallengeModal && (
              <ChallengeModal
                lang={user.language}
                onClose={() => {
                  setShowChallengeModal(false);
                  setActiveTab('chat');
                }}
              />
            )}
          </div>
        ) : (
          <AutoSuggestion language={user.language} />
        )}
      </div>

      {/* ── Tab Navigation ───────────────────────────────────────────── */}
      <nav
        className="glass-tab border-t border-white/8 flex shrink-0"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Chat tab */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === 'chat' ? 'text-[#d4af37]' : 'text-white/30'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-wider">{tTab.chat}</span>
          {activeTab === 'chat' && (
            <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
          )}
        </button>

        {/* Challenges tab */}
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === 'challenges' ? 'text-[#d4af37]' : 'text-white/30'
          }`}
        >
          <IconTarget size={22} />
          <span className="text-[8px] font-bold uppercase tracking-wider">{tTab.challenges}</span>
          {activeTab === 'challenges' && (
            <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
          )}
        </button>

        {/* Affirmation tab */}
        <button
          onClick={() => setActiveTab('autosuggestion')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === 'autosuggestion' ? 'text-[#d4af37]' : 'text-white/30'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-wider">{tTab.autosuggestion}</span>
          {activeTab === 'autosuggestion' && (
            <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
          )}
        </button>
      </nav>

      {/* ── Paywall modal ────────────────────────────────────────────── */}
      {showPaywall && (
        <SubscriptionModal
          lang={user.language}
          onClose={() => setShowPaywall(false)}
          onSubscribe={handlePremiumGranted}
        />
      )}
    </div>
  );
};

export default App;
