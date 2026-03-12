import React from 'react';

/**
 * Icônes SVG inline — remplacent les emoji Unicode qui ne s'affichent pas
 * dans le simulateur iOS (WKWebView n'inclut pas Apple Color Emoji).
 *
 * Chaque icône est un composant React pur, 24x24 par défaut, hérite de
 * la couleur du parent via `currentColor`.
 */

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

const defaultProps = { size: 24, className: '', color: 'currentColor' };

// 🎯 Target / Goal
export const IconTarget: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

// ✅ Checkmark circle
export const IconCheck: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.15" />
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M8 12l3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 🔄 Refresh
export const IconRefresh: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 4v4h-4M4 20v-4h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 👑 Crown
export const IconCrown: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18h18v2H3v-2z" fill={color} />
    <path d="M3 16l3-10 4 5 2-7 2 7 4-5 3 10H3z" fill={color} />
  </svg>
);

// 💬 Chat bubble
export const IconChat: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
  </svg>
);

// ✨ Sparkles
export const IconSparkles: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

// 🌟 Star
export const IconStar: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

// ⭐ Star variant (outline)
export const IconStarOutline: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// 🎉 Party / Celebration
export const IconCelebration: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20l3-12 9 9-12 3z" fill={color} opacity="0.3" />
    <path d="M4 20l3-12 9 9-12 3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="14" cy="6" r="1.5" fill={color} />
    <circle cx="18" cy="10" r="1.5" fill={color} />
    <circle cx="19" cy="5" r="1" fill={color} />
    <path d="M15 2v2M20 7h2M17 3l1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 💫 Twinkle / Dizzy
export const IconTwinkle: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5z" />
    <path d="M18 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
  </svg>
);

// 💡 Light bulb
export const IconLightbulb: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21h6M12 2a7 7 0 00-4 12.73V17a1 1 0 001 1h6a1 1 0 001-1v-2.27A7 7 0 0012 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ⚡ Lightning bolt
export const IconLightning: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// 🔥 Fire
export const IconFire: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 23c-4.97 0-7-3.58-7-7 0-3.07 2.17-5.88 3.5-7.5.28-.34.82-.1.75.34-.33 2.06.33 3.46 1.25 4.16.17.13.4.02.42-.19.28-2.8 2.1-5.13 3.58-6.81.25-.28.68-.07.66.3-.14 3.14 1.77 5.15 3.34 6.2.23.15.52.02.55-.25.14-1.22-.04-2.83-.66-4.25-.13-.3.17-.62.47-.45C21.23 9.5 23 12.44 23 16c0 3.42-2.03 7-7 7z" />
    <path d="M14.5 20c-1.66 0-3-1.34-3-3 0-1 .6-2.1 1.35-2.9.14-.15.41-.05.41.15 0 .64.23 1.17.63 1.5.08.07.2.01.21-.08.13-1.12.84-2.05 1.43-2.72.1-.11.27-.03.26.12-.06 1.25.71 2.06 1.34 2.48.09.06.2 0 .22-.1.06-.49-.01-1.13-.27-1.7-.05-.12.07-.25.19-.18C18.53 14.55 19 15.78 19 17c0 1.66-1.34 3-3 3z" opacity="0.6" />
  </svg>
);

// 🇺🇸 US Flag
export const IconFlagUS: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 36 24" width={size * 1.5} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="24" fill="#B22234" rx="2" />
    <rect y="2" width="36" height="2" fill="white" />
    <rect y="6" width="36" height="2" fill="white" />
    <rect y="10" width="36" height="2" fill="white" />
    <rect y="14" width="36" height="2" fill="white" />
    <rect y="18" width="36" height="2" fill="white" />
    <rect y="22" width="36" height="2" fill="white" />
    <rect width="14" height="12" fill="#3C3B6E" />
    <text x="7" y="8" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">★</text>
  </svg>
);

// 🇫🇷 French Flag
export const IconFlagFR: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 36 24" width={size * 1.5} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="24" rx="2" fill="#EF4135" />
    <rect width="12" height="24" fill="#002395" />
    <rect x="12" width="12" height="24" fill="white" />
  </svg>
);

// 🇪🇸 Spanish Flag
export const IconFlagES: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 36 24" width={size * 1.5} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="24" rx="2" fill="#AA151B" />
    <rect y="6" width="36" height="12" fill="#F1BF00" />
  </svg>
);
