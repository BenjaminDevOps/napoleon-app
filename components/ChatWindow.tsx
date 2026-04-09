import React, { useState, useRef, useEffect } from 'react';
import { Message, UserProfile } from '../types';
import { generateNapoleonResponse } from '../services/geminiService';
import { translations } from '../translations';

interface ChatWindowProps {
  user: UserProfile;
  onMessageSent: () => boolean;
  onUpgrade: () => void;
  isLimited: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, onMessageSent, onUpgrade, isLimited }) => {
  const t = translations[user.language];
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', role: 'assistant', content: t.welcome, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLimited) return;

    const canSend = onMessageSent();
    if (!canSend) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateNapoleonResponse([...messages, userMsg], user.language);
      setMessages(prev => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: response, timestamp: Date.now() },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0d1826' }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header
        className="shrink-0 flex items-center justify-between px-5 border-b border-white/8"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
          paddingBottom: '12px',
          background: 'rgba(10, 18, 30, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
              border: '1.5px solid rgba(212,175,55,0.5)',
              background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.18) 0%, rgba(13,24,38,0.9) 70%)',
            }}
          >
            <span className="font-serif font-black text-[#d4af37] text-xs">TM</span>
          </div>
          <div>
            <p className="font-serif font-bold text-white text-sm leading-tight">The Mastermind</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="text-[9px] text-[#d4af37] uppercase tracking-widest font-bold">Online</span>
            </div>
          </div>
        </div>

        {/* Premium badge */}
        <button
          onClick={onUpgrade}
          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all active:scale-95 shrink-0 ${
            user.isPremium
              ? 'text-[#d4af37] border-gold'
              : 'btn-gold shimmer shadow-lg'
          }`}
        >
          {user.isPremium ? 'Premium' : 'Upgrade'}
        </button>
      </header>

      {/* ── Messages ────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
        style={{
          background: 'linear-gradient(180deg, #0d1826 0%, #091320 100%)',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: `fadeInUp 0.3s ease-out ${Math.min(idx * 0.05, 0.3)}s both` }}
          >
            {msg.role === 'assistant' && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1"
                style={{
                  border: '1px solid rgba(212,175,55,0.35)',
                  background: 'rgba(212,175,55,0.08)',
                  minWidth: '1.5rem',
                }}
              >
                <span className="font-serif font-black text-[#d4af37] text-[8px]">TM</span>
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'rounded-2xl rounded-br-sm text-white'
                  : 'rounded-2xl rounded-bl-sm text-white/88'
              }`}
              style={
                msg.role === 'user'
                  ? {
                      background: 'linear-gradient(135deg, rgba(42,63,97,0.9), rgba(30,50,80,0.9))',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.055)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 ml-8">
            <div
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
              style={{
                background: 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* ── Input / Paywall ─────────────────────────────────────────── */}
      <div
        className="shrink-0 px-4 py-3 border-t border-white/8"
        style={{
          background: 'rgba(10, 18, 30, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {isLimited ? (
          <button
            onClick={onUpgrade}
            className="w-full btn-gold shimmer glow-gold py-4 rounded-2xl uppercase tracking-[0.18em] text-[11px] shadow-2xl"
          >
            {t.unlock}
          </button>
        ) : (
          <div
            className="flex gap-2 items-center rounded-2xl px-4 py-1 transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(212,175,55,0.3)',
            }}
            onFocus={() => {}}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent border-none focus:outline-none text-white text-base py-3 placeholder:text-white/25 placeholder:font-light"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-full transition-all duration-150 ${
                input.trim() && !isTyping
                  ? 'text-[#d4af37] active:scale-90 active:opacity-70'
                  : 'text-white/12'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
