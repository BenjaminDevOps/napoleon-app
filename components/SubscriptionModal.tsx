import React, { useState } from 'react';
import { requestPurchase, restorePurchases } from '../services/billingService';
import { AppLanguage } from '../types';
import { translations } from '../translations';
import { IconCrown, IconChat, IconTarget, IconSparkles, IconStar } from './Icons';

interface SubscriptionModalProps {
  lang: AppLanguage;
  onClose: () => void;
  onSubscribe: () => void;
}

const TERMS_URL   = 'https://napoleonhillai.app/terms';
const PRIVACY_URL = 'https://napoleonhillai.app/privacy';

const featureIcons = [IconChat, IconTarget, IconSparkles, IconStar];

const featureLabels: Record<AppLanguage, string[]> = {
  en: ['Unlimited conversations', 'Exclusive daily challenges', 'Personalized affirmations', 'Napoleon Hill wisdom'],
  fr: ['Conversations illimitées', 'Défis quotidiens exclusifs', 'Affirmations personnalisées', 'Sagesse de Napoleon Hill'],
  es: ['Conversaciones ilimitadas', 'Desafíos diarios exclusivos', 'Afirmaciones personalizadas', 'Sabiduría de Napoleon Hill'],
};

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ lang, onClose, onSubscribe }) => {
  const t = translations[lang];
  const [isRestoring, setIsRestoring] = useState(false);
  const features = featureLabels[lang];

  const handlePay = () => {
    requestPurchase(lang);
  };

  const handleRestore = () => {
    if (isRestoring) return;
    setIsRestoring(true);
    restorePurchases(lang, () => {
      onSubscribe();
    });
    setTimeout(() => setIsRestoring(false), 5000);
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const restoringLabel =
    lang === 'fr' ? 'Restauration…' :
    lang === 'es' ? 'Restaurando…' :
    'Restoring…';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
    >
      <div
        className="w-full max-w-md animate-slideUp"
        style={{
          background: 'linear-gradient(180deg, #111e33 0%, #0d1826 100%)',
          borderTop: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '28px 28px 0 0',
          paddingBottom: 'env(safe-area-inset-bottom)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Drag handle ─────────────────────────────────────────── */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* ── Crown header ────────────────────────────────────────── */}
        <div className="px-8 pt-5 pb-6 text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.2) 0%, rgba(13,24,38,0.6) 70%)',
              border: '1.5px solid rgba(212,175,55,0.4)',
            }}
          >
            <IconCrown size={28} color="#d4af37" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white mb-1">{t.paywallTitle}</h3>
          <p className="text-white/40 text-xs leading-relaxed">{t.paywallBody}</p>
        </div>

        {/* ── Separator ───────────────────────────────────────────── */}
        <div className="mx-8 border-t border-white/8 mb-6" />

        {/* ── Features ────────────────────────────────────────────── */}
        <ul className="px-8 space-y-4 mb-7">
          {features.map((label, i) => {
            const Icon = featureIcons[i];
            return (
              <li key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: 'rgba(212,175,55,0.10)',
                    border: '1px solid rgba(212,175,55,0.22)',
                  }}
                >
                  <Icon size={15} color="#d4af37" />
                </div>
                <span className="text-white/75 text-sm leading-snug">{label}</span>
              </li>
            );
          })}
        </ul>

        {/* ── Buttons ─────────────────────────────────────────────── */}
        <div className="px-8 space-y-3 pb-2">
          {/* Subscribe */}
          <button
            onClick={handlePay}
            className="w-full btn-gold shimmer glow-gold py-4 rounded-2xl uppercase tracking-widest text-[12px] shadow-2xl"
          >
            {t.subscribeBtn}
          </button>

          {/* Restore */}
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="w-full py-3 rounded-xl text-white/35 text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-40"
            style={{ border: '1px solid rgba(255,255,255,0.10)' }}
          >
            {isRestoring ? restoringLabel : t.restoreBtn}
          </button>
        </div>

        {/* ── Legal ───────────────────────────────────────────────── */}
        <div className="px-8 pt-4 pb-2">
          <p className="text-white/22 text-[10px] leading-relaxed text-center mb-3">
            {t.subscriptionTerms}
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <button
              onClick={() => openUrl(TERMS_URL)}
              className="text-[10px] text-white/28 underline underline-offset-2"
            >
              {t.termsOfService}
            </button>
            <button
              onClick={() => openUrl(PRIVACY_URL)}
              className="text-[10px] text-white/28 underline underline-offset-2"
            >
              {t.privacyPolicy}
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-full text-white/25 text-xs font-bold uppercase tracking-widest py-2"
          >
            {t.maybeLater}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
