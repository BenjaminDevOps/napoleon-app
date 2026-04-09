import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { IconCelebration, IconStar, IconSparkles, IconStarOutline, IconTwinkle, IconLightbulb } from './Icons';

interface AutoSuggestionProps {
  language: AppLanguage;
}

interface AutoSuggestionData {
  phrase: string;
  count: number;
  dailyGoal: number;
  lastResetDate?: string;
}

const i18n = {
  en: {
    title: 'Auto-Suggestion',
    subtitle: 'Your Daily Affirmation',
    placeholder: 'Write your definite chief aim or affirmation here…',
    example: '"I am earning $100,000 per year and I am free to pursue my passions."',
    save: 'Save Phrase',
    edit: 'Edit Phrase',
    repeat: 'I Affirm',
    reset: 'Reset',
    progress: 'Daily Progress',
    complete: 'Daily Goal Complete!',
    completeSub: 'You master your destiny!',
    instruction: 'Read your phrase aloud with emotion and belief. Repeat 10 times daily.',
  },
  fr: {
    title: 'Auto-Suggestion',
    subtitle: 'Votre Affirmation Quotidienne',
    placeholder: 'Écrivez votre objectif principal défini ici…',
    example: '"Je gagne 100 000\u20AC par an et je suis libre de poursuivre mes passions."',
    save: 'Enregistrer',
    edit: 'Modifier',
    repeat: 'J\'affirme',
    reset: 'Réinitialiser',
    progress: 'Progrès Quotidien',
    complete: 'Objectif Quotidien Atteint !',
    completeSub: 'Vous maîtrisez votre destin !',
    instruction: 'Lisez votre phrase à voix haute avec émotion et conviction. Répétez 10 fois par jour.',
  },
  es: {
    title: 'Auto-Sugestión',
    subtitle: 'Tu Afirmación Diaria',
    placeholder: 'Escribe tu propósito definido o tu afirmación aquí…',
    example: '"Estoy ganando $100,000 al año y soy libre de seguir mis pasiones."',
    save: 'Guardar',
    edit: 'Editar',
    repeat: 'Afirmo',
    reset: 'Reiniciar',
    progress: 'Progreso Diario',
    complete: '¡Meta Diaria Completada!',
    completeSub: '¡Controlas tu destino!',
    instruction: 'Lee tu frase en voz alta con emoción y creencia. Repite 10 veces al día.',
  },
};

const confettiIcons = [IconCelebration, IconStar, IconSparkles, IconStarOutline, IconTwinkle];

const AutoSuggestion: React.FC<AutoSuggestionProps> = ({ language }) => {
  const t = i18n[language];

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [data, setData] = useState<AutoSuggestionData>(() => {
    const saved = localStorage.getItem('autosuggestion_data');
    const today = getTodayDate();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.lastResetDate !== today) {
        return { ...parsed, count: 0, lastResetDate: today };
      }
      return parsed;
    }
    return { phrase: '', count: 0, dailyGoal: 10, lastResetDate: today };
  });

  const [isEditing, setIsEditing] = useState(!data.phrase);
  const [tempPhrase, setTempPhrase] = useState(data.phrase);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('autosuggestion_data', JSON.stringify(data));
  }, [data]);

  const handleRepeat = () => {
    if (data.count >= data.dailyGoal) return;
    const newCount = data.count + 1;
    setData(prev => ({ ...prev, count: newCount, lastResetDate: getTodayDate() }));
    if (newCount === data.dailyGoal) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleReset = () => {
    setData(prev => ({ ...prev, count: 0, lastResetDate: getTodayDate() }));
  };

  const handleSavePhrase = () => {
    if (!tempPhrase.trim()) return;
    setData(prev => ({ ...prev, phrase: tempPhrase.trim(), count: 0, lastResetDate: getTodayDate() }));
    setIsEditing(false);
  };

  const progress = Math.min((data.count / data.dailyGoal) * 100, 100);
  const isComplete = data.count >= data.dailyGoal;

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #0d1826 0%, #091320 100%)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* ── Confetti ──────────────────────────────────────────────── */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 28 }).map((_, i) => {
            const Icon = confettiIcons[i % confettiIcons.length];
            return (
              <div
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-24px',
                  animationDelay: `${Math.random() * 0.6}s`,
                  animationDuration: `${2.2 + Math.random() * 1}s`,
                }}
              >
                <Icon size={14} color="#d4af37" />
              </div>
            );
          })}
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────────── */}
      <div
        className="shrink-0 px-5 py-4 text-center"
        style={{
          background: 'rgba(10,18,30,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h1
          className="font-serif font-black text-[#d4af37] uppercase"
          style={{ fontSize: '1.2rem', letterSpacing: '0.12em' }}
        >
          {t.title}
        </h1>
        <p className="text-white/35 text-[11px] italic mt-0.5">{t.subtitle}</p>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────── */}
      <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">

        {/* Instruction */}
        <div
          className="flex items-start gap-3 p-4 rounded-2xl"
          style={{
            background: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <IconLightbulb size={16} color="#d4af37" className="shrink-0 mt-0.5" />
          <p className="text-white/60 text-[12px] leading-relaxed">{t.instruction}</p>
        </div>

        {/* ── Phrase editor / display ───────────────────────────── */}
        {isEditing ? (
          <div className="space-y-3 animate-fadeInUp">
            <textarea
              value={tempPhrase}
              onChange={(e) => setTempPhrase(e.target.value)}
              placeholder={t.placeholder}
              autoFocus
              className="w-full bg-transparent text-white text-[15px] leading-relaxed focus:outline-none min-h-[110px] resize-none placeholder:text-white/22 placeholder:font-light"
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(212,175,55,0.35)',
              }}
            />
            <p className="text-white/30 text-[11px] italic px-1">{t.example}</p>
            <button
              onClick={handleSavePhrase}
              disabled={!tempPhrase.trim()}
              className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-wider text-[12px] transition-all ${
                tempPhrase.trim()
                  ? 'btn-gold shimmer active:scale-95'
                  : 'text-white/20 cursor-not-allowed'
              }`}
              style={!tempPhrase.trim() ? { background: 'rgba(255,255,255,0.05)' } : {}}
            >
              {t.save}
            </button>
          </div>
        ) : (
          <div
            className="p-5 rounded-2xl animate-fadeInUp"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1.5px solid rgba(212,175,55,0.25)',
            }}
          >
            <p className="text-white font-serif text-[16px] leading-relaxed text-center mb-4">
              "{data.phrase}"
            </p>
            <button
              onClick={() => { setTempPhrase(data.phrase); setIsEditing(true); }}
              className="text-[#d4af37]/60 text-[11px] uppercase tracking-wider mx-auto block font-bold"
            >
              {t.edit}
            </button>
          </div>
        )}

        {/* ── Progress & actions ────────────────────────────────── */}
        {!isEditing && (
          <>
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/35 text-[11px] uppercase tracking-wider">{t.progress}</span>
                <span className="text-[#d4af37] font-bold text-[13px]">
                  {data.count} / {data.dailyGoal}
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: isComplete
                      ? 'linear-gradient(90deg, #4ade80, #22c55e)'
                      : 'linear-gradient(90deg, #d4af37, #f1d27b)',
                  }}
                />
              </div>
            </div>

            {/* Complete state */}
            {isComplete && (
              <div
                className="p-4 rounded-2xl text-center animate-scaleIn"
                style={{
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.25)',
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <IconCelebration size={20} color="#4ade80" />
                  <p className="text-green-400 font-black text-base">{t.complete}</p>
                </div>
                <p className="text-white/35 text-xs">{t.completeSub}</p>
              </div>
            )}

            {/* Affirm button */}
            <button
              onClick={handleRepeat}
              disabled={isComplete}
              className={`w-full py-4 rounded-2xl uppercase tracking-widest text-[12px] transition-all ${
                isComplete
                  ? 'text-white/20 cursor-not-allowed'
                  : 'btn-gold shimmer glow-gold shadow-xl active:scale-[0.97]'
              }`}
              style={isComplete ? { background: 'rgba(255,255,255,0.04)' } : {}}
            >
              {t.repeat}
            </button>

            {/* Counter dots */}
            <div className="flex justify-center gap-1.5 flex-wrap py-1">
              {Array.from({ length: data.dailyGoal }, (_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                  style={
                    i < data.count
                      ? {
                          background: 'linear-gradient(135deg, #f1d27b, #d4af37)',
                          color: '#0d1826',
                          transform: 'scale(1.05)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.25)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                  }
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl text-white/25 text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {t.reset}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoSuggestion;
