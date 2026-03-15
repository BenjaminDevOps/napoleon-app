import React, { useState, useCallback } from 'react';
import { UserProfile, AppTab } from '../../types';
import { translations } from '../../translations';
import TabChat from './TabChat';
import TabChallenges from './TabChallenges';
import TabAffirmations from './TabAffirmations';
import SubscriptionModal from '../SubscriptionModal';

interface PremiumHomeProps {
  user: UserProfile;
  onMessageSent: () => boolean;
  onUpgrade: () => void;
  onPremiumGranted: () => void;
  onChallengeComplete: (id: string) => void;
  onAffirmationFavorite: (id: number) => void;
  showPaywall: boolean;
  onClosePaywall: () => void;
}

// ── Tab bar icon components ──
const IconChat = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconChallenges = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconAffirmations = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const TABS: { key: AppTab; labelKey: string }[] = [
  { key: 'chat',         labelKey: 'tabChat' },
  { key: 'challenges',   labelKey: 'tabChallenges' },
  { key: 'affirmations', labelKey: 'tabAffirmations' },
];

const PremiumHome: React.FC<PremiumHomeProps> = ({
  user,
  onMessageSent,
  onUpgrade,
  onPremiumGranted,
  onChallengeComplete,
  onAffirmationFavorite,
  showPaywall,
  onClosePaywall,
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>('chat');
  const [poppingTab, setPoppingTab] = useState<AppTab | null>(null);
  const t = translations[user.language];

  const switchTab = useCallback((tab: AppTab) => {
    if (tab === activeTab) return;
    setPoppingTab(tab);
    setTimeout(() => setPoppingTab(null), 350);
    setActiveTab(tab);
  }, [activeTab]);

  const isLimited = !user.isPremium && user.messageCount >= 5;

  const TabIcon = ({ tab, active }: { tab: AppTab; active: boolean }) => {
    if (tab === 'chat')         return <IconChat active={active} />;
    if (tab === 'challenges')   return <IconChallenges active={active} />;
    if (tab === 'affirmations') return <IconAffirmations active={active} />;
    return null;
  };

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ height: '100dvh', background: 'var(--bg-deep)' }}
    >
      {/* ── Global ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: '-20%', left: '-25%',
            background: 'radial-gradient(circle, rgba(99,60,180,0.45) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="orb-2 absolute rounded-full"
          style={{
            width: 400, height: 400,
            top: '20%', right: '-20%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="orb-3 absolute rounded-full"
          style={{
            width: 320, height: 320,
            bottom: '15%', left: '5%',
            background: 'radial-gradient(circle, rgba(55,80,200,0.35) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* ── Tab content area ── */}
      <div className="relative flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <TabChat
            user={user}
            onMessageSent={onMessageSent}
            onUpgrade={onUpgrade}
            isLimited={isLimited}
          />
        )}
        {activeTab === 'challenges' && (
          <TabChallenges
            user={user}
            onComplete={onChallengeComplete}
          />
        )}
        {activeTab === 'affirmations' && (
          <TabAffirmations
            user={user}
            onFavorite={onAffirmationFavorite}
          />
        )}
      </div>

      {/* ── Bottom Tab Bar ── */}
      <div
        className="relative shrink-0 tab-bar-glass"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          {TABS.map(({ key, labelKey }) => {
            const active = activeTab === key;
            const isPopping = poppingTab === key;

            return (
              <button
                key={key}
                onClick={() => switchTab(key)}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200 active:opacity-70 relative"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Active indicator pill */}
                {active && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 32, height: 2,
                      background: 'linear-gradient(90deg, #d4af37, #f1d27b)',
                      boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                    }}
                  />
                )}

                <div
                  className={isPopping ? 'tab-pop' : ''}
                  style={{
                    color: active ? '#d4af37' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.2s ease',
                    filter: active ? 'drop-shadow(0 0 6px rgba(212,175,55,0.5))' : 'none',
                  }}
                >
                  <TabIcon tab={key} active={active} />
                </div>

                <span
                  className="text-[9px] font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    color: active ? '#d4af37' : 'rgba(255,255,255,0.28)',
                    letterSpacing: active ? '0.12em' : '0.08em',
                  }}
                >
                  {t[labelKey]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Paywall Modal ── */}
      {showPaywall && (
        <SubscriptionModal
          lang={user.language}
          onClose={onClosePaywall}
          onSubscribe={onPremiumGranted}
        />
      )}
    </div>
  );
};

export default PremiumHome;
