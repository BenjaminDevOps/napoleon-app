import React, { useState, useCallback, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Pencil, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';
import { translations, affirmations as affirmationData } from '../../translations';
import { Emoji } from './Icons';

interface TabAffirmationsProps {
  user: UserProfile;
  onFavorite: (id: number) => void;
}

const REPEAT_TOTAL = 10;

type Mode = 'browse' | 'custom' | 'repeat';

const TabAffirmations: React.FC<TabAffirmationsProps> = ({ user, onFavorite }) => {
  const t = translations[user.language];
  const list = affirmationData[user.language];

  const todayIdx = new Date().getDate() % list.length;
  const [currentIdx, setCurrentIdx] = useState(todayIdx);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set(user.favoritedAffirmations ?? []));

  // Custom affirmation
  const [mode, setMode] = useState<Mode>('browse');
  const [customText, setCustomText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Repeat mode
  const [repeatText, setRepeatText] = useState('');
  const [repeatCount, setRepeatCount] = useState(0);
  const [repeatFlash, setRepeatFlash] = useState(false);

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
    if (isSaved) { next.delete(current.id); } else { next.add(current.id); onFavorite(current.id); }
    setSaved(next);
  };

  const startRepeat = (text: string) => {
    setRepeatText(text);
    setRepeatCount(0);
    setMode('repeat');
  };

  const handleTap = () => {
    if (repeatCount >= REPEAT_TOTAL) return;
    setRepeatFlash(true);
    setTimeout(() => setRepeatFlash(false), 180);
    setRepeatCount(prev => prev + 1);
  };

  // ── REPEAT MODE ──
  if (mode === 'repeat') {
    const done = repeatCount >= REPEAT_TOTAL;
    const pct = (repeatCount / REPEAT_TOTAL) * 100;

    return (
      <div
        className="flex flex-col h-full items-center"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 60px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)',
          background: 'transparent',
        }}
      >
        {/* Back */}
        <div className="w-full px-5 mb-8">
          <button
            onClick={() => setMode(customText ? 'custom' : 'browse')}
            className="flex items-center gap-2 active:opacity-60 transition-opacity"
          >
            <ArrowLeft size={20} color="rgba(255,255,255,0.4)" />
            <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {t.affirmationRepeatBack}
            </span>
          </button>
        </div>

        {/* Title */}
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(212,175,55,0.7)' }}>
          {t.affirmationRepeatTitle}
        </p>

        {/* Circular counter */}
        <div className="relative mb-8" style={{ width: 160, height: 160 }}>
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="80" cy="80" r="70" fill="none"
              stroke={done ? '#4ade80' : '#d4af37'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.22,1,0.36,1), stroke 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {done ? (
              <Emoji size={40}>🌟</Emoji>
            ) : (
              <>
                <span
                  className="font-serif font-black"
                  style={{ fontSize: 48, color: '#ffffff', lineHeight: 1 }}
                >
                  {repeatCount}
                </span>
                <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  / {REPEAT_TOTAL}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Affirmation text card */}
        <div
          className="mx-5 px-6 py-5 rounded-3xl mb-8 text-center"
          style={{
            background: repeatFlash
              ? 'rgba(212,175,55,0.15)'
              : 'rgba(255,255,255,0.06)',
            border: `1px solid ${repeatFlash ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.09)'}`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transition: 'background 0.15s ease, border-color 0.15s ease',
            maxWidth: 340,
          }}
        >
          <p
            className="font-serif text-[18px] font-bold leading-relaxed"
            style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
          >
            "{repeatText}"
          </p>
        </div>

        {/* Tap button or done */}
        {done ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="px-6 py-3 rounded-2xl check-in"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
            >
              <Emoji size={20}>🌟</Emoji>
              <span className="text-[14px] font-bold" style={{ color: '#4ade80' }}>{t.affirmationRepeatDone}</span>
            </div>
            <button
              onClick={() => setMode(customText ? 'custom' : 'browse')}
              className="btn-gold px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shimmer transition-transform active:scale-95"
            >
              {t.affirmationRepeatBack}
            </button>
          </div>
        ) : (
          <button
            onClick={handleTap}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: repeatFlash
                ? 'linear-gradient(135deg, #c9a227, #f1d27b)'
                : 'rgba(212,175,55,0.12)',
              border: '1.5px solid rgba(212,175,55,0.4)',
              boxShadow: repeatFlash
                ? '0 0 32px rgba(212,175,55,0.6)'
                : '0 0 16px rgba(212,175,55,0.2)',
              transition: 'all 0.15s ease',
            }}
          >
            <Sparkles size={28} color={repeatFlash ? '#0a0a1a' : '#d4af37'} />
          </button>
        )}

        {!done && (
          <p
            className="mt-4 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Tap to repeat
          </p>
        )}
      </div>
    );
  }

  // ── CUSTOM MODE ──
  if (mode === 'custom') {
    const ready = customText.trim().length > 3;
    return (
      <div
        className="flex flex-col h-full px-5"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 60px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)',
        }}
      >
        {/* Back */}
        <button
          onClick={() => setMode('browse')}
          className="flex items-center gap-2 mb-8 active:opacity-60 transition-opacity self-start"
        >
          <ArrowLeft size={20} color="rgba(255,255,255,0.4)" />
          <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {t.affirmationsHeader}
          </span>
        </button>

        <h2
          className="font-serif text-[22px] font-black mb-2"
          style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
        >
          {t.affirmationCustom}
        </h2>
        <p className="text-[12px] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {t.affirmationBreathing}
        </p>

        {/* Textarea */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <textarea
            ref={inputRef}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={t.affirmationCustomPlaceholder}
            rows={5}
            className="w-full bg-transparent border-none focus:outline-none resize-none font-serif text-[18px] leading-relaxed px-5 pt-5 pb-4"
            style={{
              color: '#ffffff',
              caretColor: '#d4af37',
            }}
          />
          <div
            className="px-5 pb-3 flex justify-between items-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {customText.length} chars
            </span>
            {customText.length > 0 && (
              <button
                onClick={() => setCustomText('')}
                className="text-[10px] uppercase tracking-wider active:opacity-60"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {customText.trim().length > 0 && (
          <div
            className="rounded-2xl px-5 py-4 mb-6"
            style={{
              background: 'rgba(212,175,55,0.07)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>
              Preview
            </p>
            <p className="font-serif text-[15px] leading-snug italic" style={{ color: 'rgba(255,255,255,0.8)' }}>
              "{customText.trim()}"
            </p>
          </div>
        )}

        {/* Repeat button */}
        <button
          onClick={() => ready && startRepeat(customText.trim())}
          className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${ready ? 'btn-gold shimmer active:scale-[0.97]' : ''}`}
          style={!ready ? {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.2)',
            cursor: 'default',
          } : {}}
          disabled={!ready}
        >
          {t.affirmationRepeat}
        </button>
      </div>
    );
  }

  // ── BROWSE MODE (default) ──
  return (
    <div
      className="flex flex-col h-full"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 60px)' }}
    >
      <div
        className="flex flex-col flex-1 px-5"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 anim-fade-up">
          <div>
            <h1 className="font-serif text-[26px] font-black mb-1" style={{ color: '#ffffff', letterSpacing: '-0.01em' }}>
              {t.affirmationsHeader}
            </h1>
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {t.affirmationsSubtitle}
            </p>
          </div>
          {/* Custom affirmation button */}
          <button
            onClick={() => setMode('custom')}
            className="shrink-0 ml-3 mt-1 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all active:scale-95"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <Pencil size={14} color="#d4af37" />
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#d4af37' }}>
              Mine
            </span>
          </button>
        </div>

        {/* Affirmation of day label */}
        <div className="mb-4 anim-fade-up delay-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}><Sparkles size={10} color="#d4af37" /></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(212,175,55,0.8)' }}>{t.affirmationOfDay}</span>
          </div>
        </div>

        {/* Main card */}
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
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)', filter: 'blur(20px)' }} />
            <div className="absolute top-5 left-5 font-serif text-[72px] leading-none pointer-events-none select-none" style={{ color: 'rgba(212,175,55,0.1)', lineHeight: 1 }}>"</div>

            {/* Breathing circle */}
            <div className="flex justify-center pt-10 pb-4">
              <div className="breathe rounded-full flex items-center justify-center" style={{ width: 64, height: 64, background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <Sparkles size={22} color="#d4af37" />
              </div>
            </div>

            {/* Text */}
            <div
              className="flex-1 flex flex-col items-center justify-center px-6 pb-4 text-center"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? `translateX(${direction === 'next' ? '-30px' : '30px'})` : 'translateX(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <p className="font-serif text-[20px] font-bold leading-relaxed mb-4" style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}>
                "{current.text}"
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(212,175,55,0.6)' }}>
                — {current.author}
              </p>
            </div>

            <div className="pb-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.affirmationBreathing}</p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 pb-5">
              {list.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === currentIdx ? 20 : 5, height: 5, background: i === currentIdx ? '#d4af37' : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>

          {/* Action row */}
          <div className="flex gap-3 mt-4">
            <button onClick={() => navigate('prev')} className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-90 shrink-0" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ChevronLeft size={20} color="rgba(255,255,255,0.5)" />
            </button>

            {/* Save */}
            <button onClick={handleFavorite} className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.97]" style={{ background: isSaved ? 'rgba(212,175,55,0.14)' : 'rgba(255,255,255,0.06)', border: isSaved ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-base">{isSaved ? '★' : '☆'}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: isSaved ? '#d4af37' : 'rgba(255,255,255,0.45)' }}>{isSaved ? t.affirmationSaved : t.affirmationFavorite}</span>
            </button>

            {/* Repeat 10× */}
            <button
              onClick={() => startRepeat(current.text)}
              className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-transform active:scale-90 shrink-0"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}
              title={t.affirmationRepeat}
            >
              <Emoji size={14}>🔁</Emoji>
              <span className="text-[8px] font-black" style={{ color: '#d4af37' }}>10×</span>
            </button>

            <button onClick={() => navigate('next')} className="btn-gold w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-90 shrink-0">
              <ChevronRight size={20} color="#0a0a1a" />
            </button>
          </div>

          {/* Saved strip */}
          {saved.size > 0 && (
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Saved ({saved.size})</p>
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {list.filter(a => saved.has(a.id)).map(a => (
                  <div key={a.id} className="shrink-0 px-3 py-2 rounded-xl cursor-pointer transition-transform active:scale-[0.97]" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', maxWidth: 180 }} onClick={() => setCurrentIdx(list.findIndex(x => x.id === a.id))}>
                    <p className="text-[10px] leading-snug line-clamp-2" style={{ color: 'rgba(255,255,255,0.6)' }}>"{a.text}"</p>
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
