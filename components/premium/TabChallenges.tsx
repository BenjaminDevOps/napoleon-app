import React, { useState, useMemo } from 'react';
import { UserProfile } from '../../types';
import { translations, challenges as challengeData } from '../../translations';

interface TabChallengesProps {
  user: UserProfile;
  onComplete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  mindset:  { bg: 'rgba(139,92,246,0.15)',  text: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
  action:   { bg: 'rgba(212,175,55,0.12)',  text: '#d4af37', border: 'rgba(212,175,55,0.3)' },
  gratitude:{ bg: 'rgba(34,197,94,0.12)',   text: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  focus:    { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
};

const TabChallenges: React.FC<TabChallengesProps> = ({ user, onComplete }) => {
  const t = translations[user.language];
  const allChallenges = challengeData[user.language];

  // Today's challenge: deterministic based on day of year
  const todayIndex = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return dayOfYear % allChallenges.length;
  }, [allChallenges.length]);

  const todayChallenge = allChallenges[todayIndex];
  const weekChallenges = useMemo(() => {
    const rest = allChallenges.filter((_, i) => i !== todayIndex);
    return rest.slice(0, 5);
  }, [allChallenges, todayIndex]);

  const [completingId, setCompletingId] = useState<string | null>(null);
  const streak = user.completedChallenges?.length ?? 0;

  const handleComplete = (id: string) => {
    if (user.completedChallenges?.includes(id)) return;
    setCompletingId(id);
    setTimeout(() => {
      onComplete(id);
      setCompletingId(null);
    }, 600);
  };

  const isDone = (id: string) => user.completedChallenges?.includes(id) ?? false;

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 60px)', scrollbarWidth: 'none' }}
    >
      <div className="px-5 pb-8" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)' }}>

        {/* ── Header ── */}
        <div className="mb-6 anim-fade-up">
          <h1
            className="font-serif text-[26px] font-black mb-1"
            style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
          >
            {t.challengesHeader}
          </h1>
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {t.challengesSubtitle}
          </p>
        </div>

        {/* ── Streak badge ── */}
        <div className="mb-6 anim-fade-up delay-100">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <span className="text-base">🔥</span>
            <span
              className="text-[13px] font-bold"
              style={{ color: '#d4af37' }}
            >
              {streak} {t.challengeStreak}
            </span>
          </div>
        </div>

        {/* ── Today's Challenge (hero card) ── */}
        <div className="mb-6 anim-fade-up delay-200">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: 'rgba(212,175,55,0.7)' }}
          >
            {t.challengeToday}
          </p>

          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99,60,180,0.25) 0%, rgba(212,175,55,0.08) 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Top bar */}
            <div
              className="px-5 pt-5 pb-3 flex items-start justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{todayChallenge.emoji}</span>
                <div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: CATEGORY_COLORS[todayChallenge.category].bg,
                      color: CATEGORY_COLORS[todayChallenge.category].text,
                      border: `1px solid ${CATEGORY_COLORS[todayChallenge.category].border}`,
                    }}
                  >
                    {todayChallenge.category}
                  </span>
                  <h3
                    className="font-serif font-bold text-[18px] mt-1 leading-tight"
                    style={{ color: '#ffffff' }}
                  >
                    {todayChallenge.title}
                  </h3>
                </div>
              </div>
              <div
                className="shrink-0 px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  ⏱ {todayChallenge.duration}
                </span>
              </div>
            </div>

            <div className="px-5 pb-5">
              <p
                className="text-[13px] leading-relaxed mb-4"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {todayChallenge.description}
              </p>

              {isDone(todayChallenge.id) ? (
                <div
                  className="flex items-center justify-center gap-2 py-3 rounded-xl check-in"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}
                >
                  <span className="text-[18px]">✅</span>
                  <span className="text-[12px] font-bold" style={{ color: '#4ade80' }}>
                    {t.challengeComplete}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleComplete(todayChallenge.id)}
                  className="btn-gold shimmer w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-transform active:scale-[0.97]"
                  style={{
                    opacity: completingId === todayChallenge.id ? 0.7 : 1,
                    transform: completingId === todayChallenge.id ? 'scale(0.97)' : undefined,
                  }}
                >
                  {completingId === todayChallenge.id ? '✦ ...' : t.challengeDone}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Weekly Challenges ── */}
        <div className="anim-fade-up delay-300">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {t.challengeWeekly}
          </p>

          <div className="space-y-3">
            {weekChallenges.map((ch, i) => {
              const done = isDone(ch.id);
              const cat = CATEGORY_COLORS[ch.category];
              return (
                <div
                  key={ch.id}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all active:scale-[0.98]"
                  style={{
                    background: done
                      ? 'rgba(34,197,94,0.06)'
                      : 'rgba(255,255,255,0.05)',
                    border: done
                      ? '1px solid rgba(34,197,94,0.2)'
                      : '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    animationDelay: `${0.35 + i * 0.07}s`,
                  }}
                  onClick={() => !done && handleComplete(ch.id)}
                >
                  <span className="text-2xl shrink-0">{ch.emoji}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                        style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
                      >
                        {ch.category}
                      </span>
                      <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>⏱ {ch.duration}</span>
                    </div>
                    <h4
                      className="text-[14px] font-semibold truncate"
                      style={{ color: done ? 'rgba(255,255,255,0.4)' : '#ffffff' }}
                    >
                      {ch.title}
                    </h4>
                  </div>

                  {/* Status */}
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                      background: done ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)',
                      border: done ? '1.5px solid rgba(34,197,94,0.5)' : '1.5px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    {done && <span className="text-[10px]">✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabChallenges;
