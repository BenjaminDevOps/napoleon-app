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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a2b48] text-[#d4af37] px-8 text-center pt-[env(safe-area-inset-top)]">
      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Portrait */}
      <div className="mb-10 relative">
        <div className="w-32 h-32 rounded-full border-[3px] border-[#d4af37] overflow-hidden bg-white shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&h=200&auto=format&fit=crop"
            alt="The Mastermind"
            className="w-full h-full object-cover grayscale opacity-90 scale-110"
          />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#1a2b48] text-[9px] font-black px-4 py-1.5 rounded-full tracking-widest shadow-lg whitespace-nowrap uppercase">
          Master Mind
        </div>
      </div>

      {/* Typography */}
      <div className="max-w-xs mb-10">
        <h1 className="font-serif text-3xl font-black mb-4 tracking-tight leading-tight uppercase text-white">
          {t.landingTitle}
        </h1>
        <p className="text-white/60 text-[13px] italic font-light leading-relaxed px-4">
          "{t.landingSubtitle}"
        </p>
      </div>

      {/* Language */}
      <div className="flex justify-center gap-6 mb-12 w-full max-w-[240px]">
        {languages.map((l) => {
          const FlagIcon = flagComponents[l.code];
          return (
            <button
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${selectedLang === l.code ? 'scale-110' : 'opacity-30 grayscale'}`}
            >
              <FlagIcon size={24} />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">
                {l.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={() => onStart(selectedLang)}
        className="w-full max-w-[280px] btn-gold font-black py-4 rounded-xl shimmer active:scale-95 transition-transform uppercase tracking-widest text-[11px] flex items-center justify-center gap-3"
      >
        <span>{t.ctaStart}</span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"/>
        </svg>
      </button>

      <p className="mt-12 text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium">
        Professional Edition v1.1.0
      </p>
    </div>
  );
};

export default LandingPage;
