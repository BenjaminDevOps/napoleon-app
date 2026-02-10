import React, { useState } from 'react';
import { AppLanguage } from '../types';
import { translations } from '../translations';

interface LandingPageProps {
  onStart: (lang: AppLanguage) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [selectedLang, setSelectedLang] = useState<AppLanguage>('en');
  const [showMediaKit, setShowMediaKit] = useState(false);
  const t = translations[selectedLang];

  const languages: { code: AppLanguage, label: string, flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
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
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelectedLang(l.code)}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${selectedLang === l.code ? 'scale-110' : 'opacity-30 grayscale'}`}
          >
            <span className="text-3xl drop-shadow-md">{l.flag}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white">
              {l.code}
            </span>
          </button>
        ))}
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
        Professional Edition • v1.1.0
      </p>

      {/* Media Space Link */}
      <button
        onClick={() => setShowMediaKit(true)}
        className="mt-4 text-[10px] text-[#d4af37]/60 hover:text-[#d4af37] uppercase tracking-[0.2em] font-medium transition-colors underline"
      >
        {t.mediaSpace}
      </button>

      {/* Media Kit Modal */}
      {showMediaKit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowMediaKit(false)}>
          <div className="bg-[#1a2b48] border-2 border-[#d4af37]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-[#1a2b48] border-b border-[#d4af37]/20 p-6 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#d4af37] mb-1">{t.mediaKitTitle}</h2>
                  <p className="text-white/60 text-sm">{t.mediaKitSubtitle}</p>
                </div>
                <button
                  onClick={() => setShowMediaKit(false)}
                  className="text-white/40 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Affiliate Program */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-[#d4af37]">{t.affiliateProgram}</h3>
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">{t.affiliateDesc}</p>

                <div className="bg-[#1a2b48] rounded-lg p-4 mb-4">
                  <p className="text-white/60 text-xs mb-2">{t.affiliateCode}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/30 text-[#d4af37] px-3 py-2 rounded font-mono text-sm">MASTERMIND-{selectedLang.toUpperCase()}-[YOUR_ID]</code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#1a2b48] rounded-lg p-3">
                    <div className="text-[#d4af37] text-2xl font-bold mb-1">30%</div>
                    <div className="text-white/60 text-xs">{t.affiliateCommission}</div>
                  </div>
                  <div className="bg-[#1a2b48] rounded-lg p-3">
                    <div className="text-[#d4af37] text-2xl font-bold mb-1">90d</div>
                    <div className="text-white/60 text-xs">{t.affiliateCookie}</div>
                  </div>
                </div>
              </div>

              {/* Media Kit Download */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-bold text-[#d4af37]">{t.mediaKit}</h3>
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">{t.mediaKitDesc}</p>

                <button className="w-full bg-[#d4af37] text-[#1a2b48] font-bold py-3 px-6 rounded-lg hover:bg-[#d4af37]/90 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t.downloadKit}
                </button>
              </div>

              {/* App Description */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#d4af37] mb-3">{t.appDescription}</h3>
                <p className="text-white/80 leading-relaxed">{t.appDescriptionText}</p>
              </div>

              {/* Press Contact */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#d4af37] mb-3">{t.pressContact}</h3>
                <a href="mailto:media@themastermind.app" className="text-[#d4af37] hover:underline font-medium">
                  {t.emailContact}
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#1a2b48] border-t border-[#d4af37]/20 p-4">
              <button
                onClick={() => setShowMediaKit(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;