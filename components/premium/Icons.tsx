import React from 'react';
export { Sparkles as SparkIcon } from 'lucide-react';
export { Clock as ClockIcon } from 'lucide-react';

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
