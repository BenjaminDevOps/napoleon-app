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

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: input.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateNapoleonResponse([...messages, userMsg], user.language);
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: response, timestamp: Date.now() }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1a2b48]">
      {/* Header */}
      <header className="px-8 py-6 bg-[#1a2b48] border-b border-white/10 flex items-center justify-between shrink-0 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] overflow-hidden bg-white shadow-lg shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=100&h=100&auto=format&fit=crop"
              className="grayscale w-full h-full object-cover"
              alt="The Mastermind"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-serif font-bold text-base text-white truncate">The Mastermind</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[9px] text-[#d4af37] uppercase tracking-widest font-bold">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onUpgrade}
          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all active:scale-95 shrink-0 ${
            user.isPremium ? 'text-[#d4af37] border border-[#d4af37]/40' : 'btn-gold shadow-lg'
          }`}
        >
          {user.isPremium ? 'Premium' : 'Upgrade'}
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-gradient-to-b from-[#1a2b48] to-[#121c2f]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#2a3f61] text-white rounded-br-none border border-white/5' 
                : 'bg-white/5 text-white/90 border border-white/10 rounded-bl-none backdrop-blur-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      {/* Input / Action Area */}
      <div className="p-4 bg-[#1a2b48] border-t border-white/5 shrink-0">
        {isLimited ? (
          <button
            onClick={onUpgrade}
            className="w-full btn-gold shimmer py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl active:scale-[0.98] transition-transform"
          >
            {t.unlock}
          </button>
        ) : (
          <div className="flex gap-2 items-center bg-white/5 rounded-2xl px-4 py-1 border-2 border-[#d4af37]/40 focus-within:border-[#d4af37] focus-within:bg-white/10 transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent border-none focus:outline-none text-white text-base py-3 placeholder:text-white/30 placeholder:font-light"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-full transition-all ${input.trim() && !isTyping ? 'text-[#d4af37] active:scale-90' : 'text-white/10'}`}
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