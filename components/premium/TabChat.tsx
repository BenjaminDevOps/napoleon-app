import React, { useState, useRef, useEffect } from 'react';
import { Message, UserProfile } from '../../types';
import { generateNapoleonResponse } from '../../services/geminiService';
import { translations } from '../../translations';

interface TabChatProps {
  user: UserProfile;
  onMessageSent: () => boolean;
  onUpgrade: () => void;
  isLimited: boolean;
}

const TabChat: React.FC<TabChatProps> = ({ user, onMessageSent, onUpgrade, isLimited }) => {
  const t = translations[user.language];
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', role: 'assistant', content: t.welcome, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex flex-col h-full" style={{ background: 'transparent' }}>
      {/* ── Header ── */}
      <header
        className="glass-strong shrink-0 px-5 flex items-center justify-between"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 14px)',
          paddingBottom: '14px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          background: 'rgba(10,10,26,0.7)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{
                border: '1.5px solid rgba(212,175,55,0.6)',
                boxShadow: '0 0 12px rgba(212,175,55,0.25)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=100&h=100&auto=format&fit=crop"
                alt="The Master"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) brightness(0.85)' }}
              />
            </div>
            {/* Online dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ background: '#22c55e', borderColor: '#0a0a1a' }}
            />
          </div>

          <div>
            <h2
              className="font-serif font-bold text-[15px] leading-tight"
              style={{ color: '#ffffff' }}
            >
              The MasterMind
            </h2>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: '#d4af37' }}>
              Online · The MasterMind
            </p>
          </div>
        </div>

        {/* Upgrade / Premium badge */}
        {user.isPremium ? (
          <div
            className="px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)' }}
          >
            <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#d4af37' }}>
              Premium
            </span>
          </div>
        ) : (
          <button
            onClick={onUpgrade}
            className="btn-gold px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-transform active:scale-95"
          >
            Upgrade
          </button>
        )}
      </header>

      {/* ── Messages ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{
              animation: 'fade-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
              animationDelay: `${Math.min(i * 0.04, 0.3)}s`,
            }}
          >
            {msg.role === 'assistant' && (
              <div
                className="w-6 h-6 rounded-full overflow-hidden shrink-0 mr-2 mt-1"
                style={{
                  border: '1px solid rgba(212,175,55,0.4)',
                  filter: 'grayscale(100%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=50&h=50&auto=format&fit=crop"
                  alt="The MasterMind"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className="max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed"
              style={
                msg.role === 'user'
                  ? {
                      background: 'rgba(212,175,55,0.14)',
                      border: '1px solid rgba(212,175,55,0.25)',
                      color: '#ffffff',
                      borderBottomRightRadius: 4,
                    }
                  : {
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.88)',
                      borderBottomLeftRadius: 4,
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start items-center gap-2 ml-8">
            <div
              className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderBottomLeftRadius: 4,
              }}
            >
              <span className="dot-1 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#d4af37' }} />
              <span className="dot-2 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#d4af37' }} />
              <span className="dot-3 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#d4af37' }} />
            </div>
          </div>
        )}
      </div>

      {/* ── Input area ── */}
      <div
        className="shrink-0 px-4 pt-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 88px)' }}
      >
        {isLimited ? (
          <button
            onClick={onUpgrade}
            className="btn-gold shimmer w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-transform active:scale-[0.97]"
          >
            {t.unlock}
          </button>
        ) : (
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-2xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent border-none focus:outline-none text-[14px] py-2"
              style={{ color: '#ffffff' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-90"
              style={{
                background: input.trim() && !isTyping
                  ? 'linear-gradient(135deg, #c9a227, #f1d27b)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: input.trim() && !isTyping ? '0 4px 12px rgba(212,175,55,0.35)' : 'none',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                style={{ color: input.trim() && !isTyping ? '#0a0a1a' : 'rgba(255,255,255,0.2)' }}
              >
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabChat;
