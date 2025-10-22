import React from 'react';

// PUBLIC_INTERFACE
export default function Skeleton({ width = '100%', height = 16, rounded = 8, style = {} }) {
  /** Animated skeleton placeholder for loading states */
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: rounded,
        background:
          'linear-gradient(90deg, #f0f4ff 25%, #e6ecfe 37%, #f0f4ff 63%)',
        backgroundSize: '400% 100%',
        animation: 'skeleton-loading 1.4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

// Local keyframes injection once
const styleId = 'skeleton-anim-style';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const s = document.createElement('style');
  s.id = styleId;
  s.innerHTML = `
  @keyframes skeleton-loading {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
  `;
  document.head.appendChild(s);
}
