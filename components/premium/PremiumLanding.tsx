import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../../types';
import { translations } from '../../translations';

interface PremiumLandingProps {
  onStart: (lang: AppLanguage) => void;
}

const LANGS: { code: AppLanguage; label: string; flag: string; name: string }[] = [
  { code: 'en', label: 'English',   flag: '🇺🇸', name: 'English' },
  { code: 'fr', label: 'Français',  flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'Español',   flag: '🇪🇸', name: 'Español' },
];

const PremiumLanding: React.FC<PremiumLandingProps> = ({ onStart }) => {
  const [lang, setLang] = useState<AppLanguage>('en');
  const [visible, setVisible] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const tr = (val: boolean, delay: string) =>
    `transition-all duration-700 ${val ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-deep)', height: '100dvh' }}
    >
      {/* ── Animated orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute rounded-full" style={{ width: 420, height: 420, top: '-12%', left: '-18%', background: 'radial-gradient(circle, rgba(99,60,180,0.55) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="orb-2 absolute rounded-full" style={{ width: 360, height: 360, top: '30%', right: '-20%', background: 'radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="orb-3 absolute rounded-full" style={{ width: 280, height: 280, bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(55,80,200,0.45) 0%, transparent 70%)', filter: 'blur(55px)' }} />
      </div>

      <div
        className="relative flex flex-col items-center flex-1 px-6 text-center"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 44px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)',
        }}
      >
        {/* ── Portrait ── */}
        <div
          className={`mb-6 ${tr(visible, '0.1s')}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="relative inline-block">
            <div
              className="w-28 h-28 rounded-full p-[2px]"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f1d27b 50%, #d4af37 100%)',
                boxShadow: '0 0 40px rgba(212,175,55,0.45)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1a2b48]">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="Napoleon Hill"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) brightness(0.9) contrast(1.1)' }}
                />
              </div>
            </div>
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f1d27b)', boxShadow: '0 4px 12px rgba(212,175,55,0.4)' }}
            >
              <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: '#0a0a1a' }}>Master Mind</span>
            </div>
          </div>
        </div>

        {/* ── Title ── */}
        <div
          className={`max-w-xs mb-2 ${tr(visible, '0.22s')}`}
          style={{ transitionDelay: '0.22s' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] mb-2" style={{ color: '#d4af37' }}>
            {t.landingTagline}
          </p>
          <h1
            className="font-serif text-[30px] font-black leading-tight mb-4"
            style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.02em' }}
          >
            {t.landingTitle}
          </h1>
        </div>

        {/* ── Quote ── */}
        <div
          className={`glass w-full max-w-xs rounded-2xl px-5 py-4 mb-7 ${tr(visible, '0.34s')}`}
          style={{ transitionDelay: '0.34s' }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: 'rgba(212,175,55,0.7)' }}>
            Napoleon Hill
          </div>
          <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            "{t.landingSubtitle}"
          </p>
        </div>

        {/* ── Language selector (flags) ── */}
        <div
          className={`w-full max-w-xs mb-6 ${tr(visible, '0.44s')}`}
          style={{ transitionDelay: '0.44s' }}
        >
          <p
            className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-center"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Choose your language
          </p>
          <div className="flex gap-2.5">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="flex-1 flex flex-col items-center gap-2 py-3.5 px-2 rounded-2xl transition-all duration-300 active:scale-95"
                  style={{
                    background: active
                      ? 'rgba(212,175,55,0.14)'
                      : 'rgba(255,255,255,0.05)',
                    border: active
                      ? '1.5px solid rgba(212,175,55,0.5)'
                      : '1.5px solid rgba(255,255,255,0.08)',
                    boxShadow: active
                      ? '0 0 20px rgba(212,175,55,0.15)'
                      : 'none',
                    transform: active ? 'translateY(-2px)' : 'none',
                  }}
                >
                  {/* Flag emoji — large */}
                  <span
                    className="text-[32px] leading-none"
                    style={{
                      filter: active ? 'none' : 'saturate(0.5) brightness(0.7)',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    {l.flag}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: active ? '#d4af37' : 'rgba(255,255,255,0.3)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {l.label}
                  </span>
                  {active && (
                    <div
                      className="w-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #d4af37, #f1d27b)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className={`w-full max-w-[300px] ${tr(visible, '0.54s')}`}
          style={{ transitionDelay: '0.54s' }}
        >
          <button
            onClick={() => onStart(lang)}
            className="btn-gold shimmer w-full py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-transform active:scale-[0.97]"
          >
            <span>{t.ctaStart}</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"/>
            </svg>
          </button>
        </div>

        <p
          className={`mt-auto pt-6 text-[9px] uppercase tracking-[0.3em] ${tr(visible, '0.65s')}`}
          style={{ color: 'rgba(255,255,255,0.12)', transitionDelay: '0.65s' }}
        >
          The MasterMind AI • Premium Edition
        </p>
      </div>
    </div>
  );
};

export default PremiumLanding;
