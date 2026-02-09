import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../types';

interface AutoSuggestionProps {
  language: AppLanguage;
}

interface AutoSuggestionData {
  phrase: string;
  count: number;
  dailyGoal: number;
}

const AutoSuggestion: React.FC<AutoSuggestionProps> = ({ language }) => {
  const [data, setData] = useState<AutoSuggestionData>(() => {
    const saved = localStorage.getItem('autosuggestion_data');
    if (saved) {
      return JSON.parse(saved);
    }
    return { phrase: '', count: 0, dailyGoal: 10 };
  });

  const [isEditing, setIsEditing] = useState(!data.phrase);

  useEffect(() => {
    localStorage.setItem('autosuggestion_data', JSON.stringify(data));
  }, [data]);

  const handleRepeat = () => {
    if (data.count < data.dailyGoal) {
      setData(prev => ({ ...prev, count: prev.count + 1 }));
    }
  };

  const handleReset = () => {
    setData(prev => ({ ...prev, count: 0 }));
  };

  const handleSavePhrase = (newPhrase: string) => {
    setData(prev => ({ ...prev, phrase: newPhrase, count: 0 }));
    setIsEditing(false);
  };

  const translations = {
    en: {
      title: 'Auto-Suggestion',
      subtitle: 'Your Daily Affirmation',
      placeholder: 'Write your definite chief aim or affirmation here...',
      example: 'Example: "I am earning $100,000 per year and I am free to pursue my passions."',
      save: 'Save Phrase',
      edit: 'Edit Phrase',
      repeat: 'I Affirm',
      reset: 'Reset Count',
      progress: 'Daily Progress',
      complete: '🎉 Daily Goal Complete!',
      instruction: 'Read your phrase aloud with emotion and belief. Repeat 10 times daily.',
    },
    fr: {
      title: 'Auto-Suggestion',
      subtitle: 'Votre Affirmation Quotidienne',
      placeholder: 'Écrivez votre objectif principal défini ou votre affirmation ici...',
      example: 'Exemple: "Je gagne 100 000€ par an et je suis libre de poursuivre mes passions."',
      save: 'Enregistrer',
      edit: 'Modifier',
      repeat: 'J\'affirme',
      reset: 'Réinitialiser',
      progress: 'Progrès Quotidien',
      complete: '🎉 Objectif Quotidien Atteint !',
      instruction: 'Lisez votre phrase à voix haute avec émotion et conviction. Répétez 10 fois par jour.',
    },
    es: {
      title: 'Auto-Sugestión',
      subtitle: 'Tu Afirmación Diaria',
      placeholder: 'Escribe tu propósito definido o tu afirmación aquí...',
      example: 'Ejemplo: "Estoy ganando $100,000 al año y soy libre de seguir mis pasiones."',
      save: 'Guardar',
      edit: 'Editar',
      repeat: 'Afirmo',
      reset: 'Reiniciar',
      progress: 'Progreso Diario',
      complete: '🎉 ¡Meta Diaria Completada!',
      instruction: 'Lee tu frase en voz alta con emoción y creencia. Repite 10 veces al día.',
    },
  };

  const t = translations[language];
  const progress = (data.count / data.dailyGoal) * 100;
  const isComplete = data.count >= data.dailyGoal;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1a2b48] to-[#121c2f] p-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8 pt-[env(safe-area-inset-top)]">
        <h1 className="font-serif text-3xl font-black text-[#d4af37] mb-2 uppercase tracking-wider">
          {t.title}
        </h1>
        <p className="text-white/60 text-sm italic">{t.subtitle}</p>
      </div>

      {/* Instruction */}
      <div className="bg-white/5 border border-[#d4af37]/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
        <p className="text-white/80 text-xs leading-relaxed text-center">
          💡 {t.instruction}
        </p>
      </div>

      {/* Phrase Editor or Display */}
      {isEditing ? (
        <div className="mb-6">
          <textarea
            defaultValue={data.phrase}
            placeholder={t.placeholder}
            className="w-full bg-white/5 border-2 border-[#d4af37]/40 rounded-xl p-4 text-white text-base leading-relaxed focus:outline-none focus:border-[#d4af37] min-h-[120px] resize-none"
            onBlur={(e) => {
              if (e.target.value.trim()) {
                handleSavePhrase(e.target.value.trim());
              }
            }}
            autoFocus
          />
          <p className="text-white/40 text-xs mt-2 italic">{t.example}</p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="bg-white/5 border-2 border-[#d4af37]/40 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-white text-lg font-serif leading-relaxed text-center mb-4">
              "{data.phrase}"
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#d4af37] text-xs uppercase tracking-wider hover:underline mx-auto block"
            >
              {t.edit}
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {!isEditing && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-xs uppercase tracking-wider">{t.progress}</span>
              <span className="text-[#d4af37] font-bold text-sm">
                {data.count} / {data.dailyGoal}
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-500 ${
                  isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-[#d4af37] to-[#f1d27b]'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Complete Message */}
          {isComplete && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 text-center">
              <p className="text-green-400 font-bold text-sm">{t.complete}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRepeat}
              disabled={isComplete}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${
                isComplete
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'btn-gold shimmer active:scale-95 shadow-lg'
              }`}
            >
              {t.repeat}
            </button>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border-2 border-white/10 text-white/60 font-bold uppercase tracking-wider text-xs hover:border-white/20 hover:text-white/80 transition-all active:scale-95"
            >
              {t.reset}
            </button>
          </div>

          {/* Counter Circles */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {Array.from({ length: data.dailyGoal }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < data.count
                    ? 'bg-[#d4af37] text-[#1a2b48] scale-110'
                    : 'bg-white/5 text-white/30 border border-white/10'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AutoSuggestion;
