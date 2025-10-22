import React from 'react';

// PUBLIC_INTERFACE
export default function Badge({ children, color = 'primary', ariaLabel }) {
  /** Small rounded badge/tag indicator with theme colors */
  const bg =
    color === 'secondary'
      ? 'rgba(245, 158, 11, 0.12)'
      : color === 'success'
      ? 'rgba(16, 185, 129, 0.12)'
      : color === 'error'
      ? 'rgba(239, 68, 68, 0.12)'
      : 'rgba(37, 99, 235, 0.12)';
  const fg =
    color === 'secondary'
      ? 'var(--color-secondary)'
      : color === 'success'
      ? 'var(--color-success)'
      : color === 'error'
      ? 'var(--color-error)'
      : 'var(--color-primary)';
  return (
    <span
      role="status"
      aria-label={ariaLabel || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: fg,
        background: bg,
        border: '1px solid ' + fg,
        borderColor: fg + '22',
        padding: '4px 8px',
        borderRadius: 999,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
