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

const TERMS_URL = 'https://napoleonhillai.app/terms';
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

  const handlePay = () => {
    requestPurchase(lang);
    if (typeof (window as any).CdvPurchase === 'undefined') {
      setTimeout(() => onSubscribe(), 1500);
    }
  };

  const handleRestore = () => {
    if (isRestoring) return;
    setIsRestoring(true);
    restorePurchases(lang, () => {
      onSubscribe();
    });
    setTimeout(() => setIsRestoring(false), 4000);
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const features = featureLabels[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-t-3xl w-full max-w-md shadow-2xl animate-slideUp pb-[env(safe-area-inset-bottom)]">

        {/* Header */}
        <div className="h-28 bg-[#1a2b48] rounded-t-3xl flex flex-col items-center justify-center gap-1">
          <IconCrown size={32} color="#d4af37" className="mb-1" />
          <h3 className="font-serif text-lg font-bold uppercase tracking-widest text-[#d4af37]">
            {t.paywallTitle}
          </h3>
        </div>

        <div className="px-8 py-6">
          {/* Features list */}
          <ul className="space-y-3 mb-6">
            {features.map((label, i) => {
              const Icon = featureIcons[i];
              return (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <Icon size={18} color="#d4af37" />
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>

          {/* Subscribe button */}
          <button
            onClick={handlePay}
            className="w-full bg-[#d4af37] text-[#1a2b48] font-black py-4 rounded-xl shadow-lg mb-3 uppercase tracking-widest text-sm active:scale-95 transition-transform"
          >
            {t.subscribeBtn}
          </button>

          {/* Restore purchases */}
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 active:scale-95 transition-transform disabled:opacity-50"
          >
            {isRestoring
              ? (lang === 'fr' ? 'Restauration...' : lang === 'es' ? 'Restaurando...' : 'Restoring...')
              : t.restoreBtn}
          </button>

          {/* Subscription terms */}
          <p className="text-gray-400 text-[10px] leading-relaxed text-center mb-4">
            {t.subscriptionTerms}
          </p>

          {/* Legal links */}
          <div className="flex justify-center gap-6 mb-4">
            <button onClick={() => openUrl(TERMS_URL)} className="text-[10px] text-gray-400 underline">
              {t.termsOfService}
            </button>
            <button onClick={() => openUrl(PRIVACY_URL)} className="text-[10px] text-gray-400 underline">
              {t.privacyPolicy}
            </button>
          </div>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full text-gray-400 text-xs font-bold uppercase tracking-widest py-2"
          >
            {t.maybeLater}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
