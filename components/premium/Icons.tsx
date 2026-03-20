import React from 'react';

// Replaces ✦ (U+2736) — not in WKWebView fonts
export const SparkIcon = ({ size = 14, color = '#d4af37', style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 16 16"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" />
  </svg>
);

// Replaces ⏱ clock emoji
export const ClockIcon = ({ size = 12, color = 'rgba(255,255,255,0.45)' }: { size?: number; color?: string }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Emoji span — inline fontFamily overrides any parent font (WKWebView safe)
export const Emoji = ({ children, size }: { children: string; size: number }) => (
  <span style={{
    fontFamily: "'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', system-ui",
    fontSize: size,
    lineHeight: 1,
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
  }}>
    {children}
  </span>
);
