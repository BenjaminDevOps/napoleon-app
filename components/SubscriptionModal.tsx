
import React, { useState } from 'react';
import { requestPurchase, restorePurchases } from '../services/billingService';
import { AppLanguage } from '../types';
import { translations } from '../translations';

interface SubscriptionModalProps {
  lang: AppLanguage;
  onClose: () => void;
  onSubscribe: () => void;
}

// URLs légales — à remplacer par vos vraies pages
const TERMS_URL = 'https://napoleonhillai.app/terms';
const PRIVACY_URL = 'https://napoleonhillai.app/privacy';

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ lang, onClose, onSubscribe }) => {
  const t = translations[lang];
  const [isRestoring, setIsRestoring] = useState(false);

  const handlePay = () => {
    requestPurchase(lang);
    // En mode navigateur (CdvPurchase absent), on simule l'abonnement après délai
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
    // Capacitor InAppBrowser ou fallback window.open
    if (typeof (window as any).Capacitor !== 'undefined') {
      window.open(url, '_blank');
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-t-3xl w-full max-w-md shadow-2xl animate-slideUp pb-[env(safe-area-inset-bottom)]">

        {/* Header */}
        <div className="h-28 bg-[#1a2b48] rounded-t-3xl flex flex-col items-center justify-center gap-1">
          <div className="text-3xl mb-1">👑</div>
          <h3 className="font-serif text-lg font-bold uppercase tracking-widest text-[#d4af37]">
            {t.paywallTitle}
          </h3>
        </div>

        <div className="px-8 py-6">
          {/* Features list */}
          <ul className="space-y-2 mb-6">
            {[
              lang === 'fr' ? '💬 Conversations illimitées' : lang === 'es' ? '💬 Conversaciones ilimitadas' : '💬 Unlimited conversations',
              lang === 'fr' ? '🎯 Défis quotidiens exclusifs' : lang === 'es' ? '🎯 Desafíos diarios exclusivos' : '🎯 Exclusive daily challenges',
              lang === 'fr' ? '✨ Affirmations personnalisées' : lang === 'es' ? '✨ Afirmaciones personalizadas' : '✨ Personalized affirmations',
              lang === 'fr' ? '🌟 Sagesse de Napoleon Hill' : lang === 'es' ? '🌟 Sabiduría de Napoleon Hill' : '🌟 Napoleon Hill wisdom',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Subscribe button */}
          <button
            onClick={handlePay}
            className="w-full bg-[#d4af37] text-[#1a2b48] font-black py-4 rounded-xl shadow-lg mb-3 uppercase tracking-widest text-sm active:scale-95 transition-transform"
          >
            {t.subscribeBtn}
          </button>

          {/* Restore purchases — exigé par l'App Store Apple */}
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
            <button
              onClick={() => openUrl(TERMS_URL)}
              className="text-[10px] text-gray-400 underline"
            >
              {t.termsOfService}
            </button>
            <button
              onClick={() => openUrl(PRIVACY_URL)}
              className="text-[10px] text-gray-400 underline"
            >
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
