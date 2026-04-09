import React, { useState } from 'react';
import { AppLanguage } from '../types';
import { translations } from '../translations';
import { IconFlagUS, IconFlagFR, IconFlagES } from './Icons';

interface LandingPageProps {
  onStart: (lang: AppLanguage) => void;
}

const flagComponents: Record<AppLanguage, React.FC<{ size?: number; className?: string }>> = {
  en: IconFlagUS,
  fr: IconFlagFR,
  es: IconFlagES,
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [selectedLang, setSelectedLang] = useState<AppLanguage>('en');
  const t = translations[selectedLang];

  const languages: { code: AppLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center h-full text-[#d4af37] px-8 text-center relative overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.07) 0%, #0d1826 65%)',
        backgroundColor: '#0d1826',
      }}
    >
      {/* ── Background glows ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-[#d4af37]/6 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#d4af37]/4 blur-[100px]" />
      </div>

      {/* ── Medallion ─────────────────────────────────────────────── */}
      <div
        className="relative mb-8"
        style={{ animation: 'scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.05s both' }}
      >
        {/* Outer decorative ring */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center relative"
          style={{
            border: '2px solid rgba(212,175,55,0.5)',
            background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.15) 0%, rgba(13,24,38,0.8) 70%)',
          }}
        >
          {/* Inner ring */}
          <div
            className="absolute inset-[6px] rounded-full"
            style={{ border: '1px solid rgba(212,175,55,0.2)' }}
          />
          {/* Monogram */}
          <div className="relative z-10 flex flex-col items-center">
            <span
              className="font-serif font-black text-[#d4af37] leading-none"
              style={{ fontSize: '2.25rem', letterSpacing: '-0.02em' }}
            >
              NH
            </span>
            <div
              className="mt-1 w-8"
              style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
            />
          </div>
        </div>
        {/* Glow behind medallion */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-[#d4af37]/18 -z-10" />
        {/* Badge */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#0d1826] text-[8px] font-black px-4 py-1 rounded-full tracking-[0.22em] uppercase whitespace-nowrap shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f1d27b, #d4af37, #b8941f)' }}
        >
          The Mastermind
        </div>
      </div>

      {/* ── Headline ──────────────────────────────────────────────── */}
      <div style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}>
        <h1
          className="font-serif font-black text-white uppercase leading-tight mb-3"
          style={{ fontSize: '1.75rem', letterSpacing: '-0.01em' }}
        >
          {t.landingTitle}
        </h1>
        <p className="text-white/45 text-[13px] italic font-light leading-relaxed px-4 mb-10">
          "{t.landingSubtitle}"
        </p>
      </div>

      {/* ── Language selector ─────────────────────────────────────── */}
      <div
        className="flex justify-center gap-8 mb-12"
        style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}
      >
        {languages.map((l) => {
          const FlagIcon = flagComponents[l.code];
          const isActive = selectedLang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className="flex flex-col items-center gap-2"
              style={{
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                opacity: isActive ? 1 : 0.28,
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
              }}
            >
              <FlagIcon size={24} />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">
                {l.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <button
        onClick={() => onStart(selectedLang)}
        className="btn-gold shimmer glow-gold w-full max-w-[280px] py-4 rounded-2xl uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-2xl"
        style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}
      >
        <span>{t.ctaStart}</span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"/>
        </svg>
      </button>

      {/* ── Version ───────────────────────────────────────────────── */}
      <p
        className="mt-10 text-white uppercase"
        style={{
          fontSize: '8px',
          letterSpacing: '0.35em',
          opacity: 0.15,
          animation: 'fadeIn 1s ease-out 0.9s both',
        }}
      >
        Professional Edition v1.1.0
      </p>
    </div>
  );
};

export default LandingPage;
