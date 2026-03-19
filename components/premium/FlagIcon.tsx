import React from 'react';
import { AppLanguage } from '../../types';

interface FlagIconProps {
  lang: AppLanguage;
  size?: number;
  desaturate?: boolean;
}

const US = () => (
  <svg viewBox="0 0 190 100" xmlns="http://www.w3.org/2000/svg">
    {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
      <rect key={i} x="0" y={i * (100/13)} width="190" height={100/13 + 0.5}
        fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
    ))}
    <rect x="0" y="0" width="76" height={100 * 7/13} fill="#3C3B6E" />
    {/* Stars — simplified grid */}
    {[0,1,2,3,4,5,6,7,8].map(row =>
      [0,1,2,3,4, ...(row % 2 === 0 ? [5] : [])].map(col => (
        <circle
          key={`${row}-${col}`}
          cx={row % 2 === 0 ? col * 11 + 5 : col * 11 + 10}
          cy={row * 6.5 + 4}
          r="2.2"
          fill="white"
        />
      ))
    )}
  </svg>
);

const FR = () => (
  <svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="60" fill="#002395" />
    <rect x="30" width="30" height="60" fill="#FEFEFE" />
    <rect x="60" width="30" height="60" fill="#ED2939" />
  </svg>
);

const ES = () => (
  <svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
    <rect width="3" height="2" fill="#c60b1e" />
    <rect y="0.5" width="3" height="1" fill="#ffc400" />
  </svg>
);

const FLAGS: Record<AppLanguage, React.FC> = { en: US, fr: FR, es: ES };

const FlagIcon: React.FC<FlagIconProps> = ({ lang, size = 36, desaturate = false }) => {
  const Flag = FLAGS[lang];
  return (
    <div
      style={{
        width: size,
        height: Math.round(size * (2/3)),
        borderRadius: 4,
        overflow: 'hidden',
        flexShrink: 0,
        filter: desaturate ? 'saturate(0.35) brightness(0.65)' : 'none',
        transition: 'filter 0.3s ease',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}
    >
      <Flag />
    </div>
  );
};

export default FlagIcon;
