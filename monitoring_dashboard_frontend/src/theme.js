//
// Ocean Professional theme system: centralizes colors, spacing, shadows, and helpers
//

export const theme = {
  palette: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    gradientStart: 'rgba(59, 130, 246, 0.10)', // blue-500/10
    gradientEnd: '#f9fafb', // gray-50
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 10px rgba(0,0,0,0.08)',
    lg: '0 10px 20px rgba(0,0,0,0.10)',
  },
  spacing: (n = 1) => `${n * 8}px`,
};

// PUBLIC_INTERFACE
export function applyThemeToDocument() {
  /** Applies CSS variables for the Ocean Professional theme to :root */
  const root = document.documentElement;
  const { palette } = theme;
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-secondary', palette.secondary);
  root.style.setProperty('--color-success', palette.success);
  root.style.setProperty('--color-error', palette.error);
  root.style.setProperty('--color-bg', palette.background);
  root.style.setProperty('--color-surface', palette.surface);
  root.style.setProperty('--color-text', palette.text);
  root.style.setProperty('--color-text-muted', palette.mutedText);
  root.style.setProperty('--color-border', palette.border);
  root.style.setProperty('--gradient-start', palette.gradientStart);
  root.style.setProperty('--gradient-end', palette.gradientEnd);
}
