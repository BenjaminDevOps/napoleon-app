import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { generateDailyChallenge } from '../services/geminiService';
import { IconTarget, IconCheck, IconRefresh } from './Icons';

interface ChallengeModalProps {
  lang: AppLanguage;
  onClose: () => void;
}

const i18n = {
  en: {
    title: 'Daily Challenge',
    subtitle: 'Napoleon Hill',
    loading: 'Preparing your challenge…',
    newChallenge: 'New Challenge',
    accept: 'Accept Challenge',
    accepted: 'Challenge Accepted!',
    acceptedSub: 'Take action NOW.',
  },
  fr: {
    title: 'Défi du Jour',
    subtitle: 'Napoleon Hill',
    loading: 'Préparation de votre défi…',
    newChallenge: 'Nouveau Défi',
    accept: 'Accepter le Défi',
    accepted: 'Défi Accepté !',
    acceptedSub: 'Passez à l\'action MAINTENANT.',
  },
  es: {
    title: 'Desafío del Día',
    subtitle: 'Napoleon Hill',
    loading: 'Preparando tu desafío…',
    newChallenge: 'Nuevo Desafío',
    accept: 'Aceptar Desafío',
    accepted: '¡Desafío Aceptado!',
    acceptedSub: 'Actúe AHORA.',
  },
};

const ChallengeModal: React.FC<ChallengeModalProps> = ({ lang, onClose }) => {
  const t = i18n[lang];
  const [challenge, setChallenge] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => { loadChallenge(); }, []);

  const loadChallenge = async () => {
    setIsLoading(true);
    setIsAccepted(false);
    const result = await generateDailyChallenge(lang);
    setChallenge(result);
    setIsLoading(false);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setTimeout(() => onClose(), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
    >
      <div
        className="w-full max-w-[400px] animate-scaleIn flex flex-col"
        style={{
          background: 'linear-gradient(160deg, #152035 0%, #0d1826 100%)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '28px',
          maxHeight: '88vh',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.08)',
        }}
      >
        {/* ── Gold header bar ────────────────────────────────────── */}
        <div
          className="px-6 pt-6 pb-5 text-center shrink-0"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
          >
            <IconTarget size={24} color="#d4af37" />
          </div>
          <h2 className="font-serif text-lg font-bold text-white mb-0.5">{t.title}</h2>
          <p
            className="text-[9px] uppercase tracking-[0.25em] font-bold"
            style={{ color: 'rgba(212,175,55,0.6)' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* ── Content ────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isAccepted ? (
            <div className="flex flex-col items-center justify-center py-8 animate-scaleIn">
              <div className="mb-4">
                <IconCheck size={56} color="#4ade80" />
              </div>
              <p className="text-white font-serif text-xl font-bold text-center mb-2">{t.accepted}</p>
              <p className="text-white/40 text-sm text-center">{t.acceptedSub}</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <p className="text-white/35 text-sm">{t.loading}</p>
            </div>
          ) : (
            <div
              className="rounded-2xl p-5 animate-fadeInUp"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-white/85 text-[15px] leading-relaxed whitespace-pre-line">
                {challenge}
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        {!isAccepted && (
          <div
            className="px-6 py-5 shrink-0 space-y-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {!isLoading && (
              <button
                onClick={loadChallenge}
                className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: '#d4af37',
                }}
              >
                <IconRefresh size={15} color="#d4af37" />
                {t.newChallenge}
              </button>
            )}
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="w-full btn-gold shimmer py-4 rounded-2xl uppercase tracking-[0.18em] text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <IconCheck size={17} color="#0d1826" />
              {t.accept}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeModal;
