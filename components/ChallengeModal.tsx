import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { generateDailyChallenge } from '../services/geminiService';
import { IconTarget, IconCheck, IconRefresh } from './Icons';

interface ChallengeModalProps {
  lang: AppLanguage;
  onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ lang, onClose }) => {
  const [challenge, setChallenge] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);

  const translations = {
    en: {
      title: 'Daily Challenge',
      subtitle: 'from Napoleon Hill',
      loading: 'Preparing your challenge...',
      newChallenge: 'New Challenge',
      close: 'Accept Challenge',
      accepted: 'Challenge Accepted! Take action NOW!',
    },
    fr: {
      title: 'Défi du Jour',
      subtitle: 'par Napoleon Hill',
      loading: 'Préparation de votre défi...',
      newChallenge: 'Nouveau Défi',
      close: 'Accepter le Défi',
      accepted: 'Défi Accepté ! Passez à l\'action MAINTENANT !',
    },
    es: {
      title: 'Desafío del Día',
      subtitle: 'por Napoleon Hill',
      loading: 'Preparando tu desafío...',
      newChallenge: 'Nuevo Desafío',
      close: 'Aceptar Desafío',
      accepted: '¡Desafío Aceptado! ¡Actúe AHORA!',
    }
  };

  const t = translations[lang];

  useEffect(() => {
    loadChallenge();
  }, []);

  const loadChallenge = async () => {
    setIsLoading(true);
    setIsAccepted(false);
    const newChallenge = await generateDailyChallenge(lang);
    setChallenge(newChallenge);
    setIsLoading(false);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1a2b48] to-[#0f1a2e] rounded-2xl shadow-2xl max-w-lg w-full border-2 border-[#d4af37]/30 animate-slideUp flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] p-6 rounded-t-2xl text-center shrink-0">
          <div className="flex justify-center mb-2">
            <IconTarget size={32} color="#1a2b48" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a2b48]">{t.title}</h2>
          <p className="text-xs uppercase tracking-widest text-[#1a2b48]/70 font-bold">{t.subtitle}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isAccepted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 animate-bounce">
                <IconCheck size={64} color="#4ade80" />
              </div>
              <p className="text-[#d4af37] text-xl font-bold text-center">{t.accepted}</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <p className="text-white/60 text-sm">{t.loading}</p>
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-white/90 text-base leading-relaxed whitespace-pre-line">
                {challenge}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 shrink-0 space-y-3 border-t border-white/10">
          {!isLoading && !isAccepted && (
            <button
              onClick={loadChallenge}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/40 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <IconRefresh size={16} color="#d4af37" />
              {t.newChallenge}
            </button>
          )}
          {!isAccepted && (
            <button
              onClick={handleAccept}
              className="w-full btn-gold py-4 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <IconCheck size={18} color="#1a2b48" />
              {t.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
