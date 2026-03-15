
import React from 'react';
import { requestPurchase } from '../services/billingService';
import { AppLanguage } from '../types';
import { translations } from '../translations';

interface SubscriptionModalProps {
  lang: AppLanguage;
  onClose: () => void;
  onSubscribe: () => void;
}

const PERKS = ['♾️ Unlimited AI conversations', '🎯 Daily challenges & streak tracking', '✦ Full affirmation library', '🔔 Daily motivation reminders'];
const PERKS_FR = ['♾️ Conversations IA illimitées', '🎯 Défis quotidiens & séries', '✦ Bibliothèque d\'affirmations', '🔔 Rappels quotidiens'];
const PERKS_ES = ['♾️ Conversaciones IA ilimitadas', '🎯 Desafíos diarios & rachas', '✦ Biblioteca de afirmaciones', '🔔 Recordatorios diarios'];

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ lang, onClose, onSubscribe }) => {
  const t = translations[lang];
  const perks = lang === 'fr' ? PERKS_FR : lang === 'es' ? PERKS_ES : PERKS;

  const handlePay = () => {
    requestPurchase();
    if (!(window as any).store) {
      setTimeout(() => onSubscribe(), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Bottom sheet */}
      <div
        className="w-full max-w-md rounded-t-3xl overflow-hidden anim-fade-up"
        style={{
          background: 'linear-gradient(180deg, rgba(22,14,50,0.98) 0%, rgba(10,10,26,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderBottom: 'none',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-5 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#d4af37' }}>
              ✦ Master Mind Access
            </span>
          </div>
          <h2
            className="font-serif text-[24px] font-black mb-2"
            style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
          >
            {t.paywallTitle}
          </h2>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {t.paywallBody}
          </p>
        </div>

        {/* Perks */}
        <div className="px-6 mb-6 space-y-2.5">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span className="text-base">{perk.split(' ')[0]}</span>
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {perk.split(' ').slice(1).join(' ')}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handlePay}
            className="btn-gold shimmer w-full py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.18em] transition-transform active:scale-[0.97]"
          >
            {t.subscribeBtn}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-[11px] font-bold uppercase tracking-widest transition-opacity active:opacity-60"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {t.maybeLater}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
