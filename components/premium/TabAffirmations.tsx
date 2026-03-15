import React, { useState, useCallback } from 'react';
import { UserProfile } from '../../types';
import { translations, affirmations as affirmationData } from '../../translations';

interface TabAffirmationsProps {
  user: UserProfile;
  onFavorite: (id: number) => void;
}

const TabAffirmations: React.FC<TabAffirmationsProps> = ({ user, onFavorite }) => {
  const t = translations[user.language];
  const list = affirmationData[user.language];

  // Today's affirmation index (changes daily)
  const todayIdx = new Date().getDate() % list.length;
  const [currentIdx, setCurrentIdx] = useState(todayIdx);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set(user.favoritedAffirmations ?? []));

  const current = list[currentIdx];
  const isSaved = saved.has(current.id);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIdx(prev =>
        dir === 'next'
          ? (prev + 1) % list.length
          : (prev - 1 + list.length) % list.length
      );
      setAnimating(false);
    }, 300);
  }, [animating, list.length]);

  const handleFavorite = () => {
    const next = new Set(saved);
    if (isSaved) {
      next.delete(current.id);
    } else {
      next.add(current.id);
      onFavorite(current.id);
    }
    setSaved(next);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 60px)' }}
    >
      <div
        className="flex flex-col flex-1 px-5"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)' }}
      >

        {/* ── Header ── */}
        <div className="mb-8 anim-fade-up">
          <h1
            className="font-serif text-[26px] font-black mb-1"
            style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
          >
            {t.affirmationsHeader}
          </h1>
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {t.affirmationsSubtitle}
          </p>
        </div>

        {/* ── Affirmation of the day label ── */}
        <div className="mb-4 anim-fade-up delay-100">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              ✦
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'rgba(212,175,55,0.8)' }}
            >
              {t.affirmationOfDay}
            </span>
          </div>
        </div>

        {/* ── Main affirmation card ── */}
        <div className="flex-1 flex flex-col anim-fade-up delay-200">
          <div
            className="relative flex-1 rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(160deg, rgba(99,60,180,0.3) 0%, rgba(10,10,26,0.6) 60%, rgba(212,175,55,0.12) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Quote marks decorative */}
            <div
              className="absolute top-5 left-5 font-serif text-[72px] leading-none pointer-events-none select-none"
              style={{ color: 'rgba(212,175,55,0.1)', lineHeight: 1 }}
            >
              "
            </div>

            {/* Breathing animation circle */}
            <div className="flex justify-center pt-10 pb-4">
              <div
                className="breathe rounded-full flex items-center justify-center"
                style={{
                  width: 64, height: 64,
                  background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <span className="text-2xl">✦</span>
              </div>
            </div>

            {/* Affirmation text */}
            <div
              className="flex-1 flex flex-col items-center justify-center px-6 pb-4 text-center"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === 'next' ? '-30px' : '30px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <p
                className="font-serif text-[20px] font-bold leading-relaxed mb-4"
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.01em',
                }}
              >
                "{current.text}"
              </p>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'rgba(212,175,55,0.6)' }}
              >
                — {current.author}
              </p>
            </div>

            {/* Breathing instruction */}
            <div className="pb-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {t.affirmationBreathing}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 pb-5">
              {list.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIdx ? 20 : 5,
                    height: 5,
                    background: i === currentIdx ? '#d4af37' : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Action row ── */}
          <div className="flex gap-3 mt-4">
            {/* Prev */}
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-90 shrink-0"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>

            {/* Save */}
            <button
              onClick={handleFavorite}
              className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
              style={{
                background: isSaved ? 'rgba(212,175,55,0.14)' : 'rgba(255,255,255,0.06)',
                border: isSaved ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="text-base">{isSaved ? '★' : '☆'}</span>
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: isSaved ? '#d4af37' : 'rgba(255,255,255,0.45)' }}
              >
                {isSaved ? t.affirmationSaved : t.affirmationFavorite}
              </span>
            </button>

            {/* Next */}
            <button
              onClick={() => navigate('next')}
              className="btn-gold w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-90 shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ color: '#0a0a1a' }}>
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
          </div>

          {/* ── Saved affirmations strip ── */}
          {saved.size > 0 && (
            <div className="mt-5">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Saved ({saved.size})
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {list.filter(a => saved.has(a.id)).map(a => (
                  <div
                    key={a.id}
                    className="shrink-0 px-3 py-2 rounded-xl cursor-pointer transition-transform active:scale-[0.97]"
                    style={{
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      maxWidth: 180,
                    }}
                    onClick={() => setCurrentIdx(list.findIndex(x => x.id === a.id))}
                  >
                    <p
                      className="text-[10px] leading-snug line-clamp-2"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      "{a.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabAffirmations;
