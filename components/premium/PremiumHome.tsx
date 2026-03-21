import React, { useState, useCallback } from 'react';
import { MessageCircle, Trophy, Heart } from 'lucide-react';
import { UserProfile, AppTab, MAX_FREE_MESSAGES } from '../../types';
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

  const isLimited = !user.isPremium && user.messageCount >= MAX_FREE_MESSAGES;

  const TabIcon = ({ tab, active }: { tab: AppTab; active: boolean }) => {
    const strokeWidth = active ? 2.5 : 1.5;
    if (tab === 'chat')         return <MessageCircle size={24} strokeWidth={strokeWidth} />;
    if (tab === 'challenges')   return <Trophy size={24} strokeWidth={strokeWidth} />;
    if (tab === 'affirmations') return <Heart size={24} strokeWidth={strokeWidth} fill={active ? 'currentColor' : 'none'} />;
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
