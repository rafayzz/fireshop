// ============================================================
// src/config/design-system.js
// ============================================================
// PURPOSE: Centralized design system for consistent styling
//          Colors, typography, spacing, shadows, breakpoints
// ============================================================

export const colors = {
  // Primary — Indigo
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Secondary — Cyan
  secondary: {
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
  },

  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#f43f5e',
  info: '#6366f1',

  // Surfaces
  surface: {
    light: '#fafafa',
    dark: '#0a0a0f',
    card: {
      light: '#ffffff',
      dark: '#12121a',
    },
  },
};

export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    display: 'clamp(2.5rem, 5vw, 4.5rem)',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
  section: '5rem',
  'section-lg': '7rem',
};

export const shadows = {
  card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
  'card-hover': '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
  glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
  glow: '0 0 20px rgba(99, 102, 241, 0.15)',
  elevated: '0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
};

export const glass = {
  background: {
    light: 'rgba(255, 255, 255, 0.7)',
    dark: 'rgba(255, 255, 255, 0.03)',
  },
  border: {
    light: 'rgba(0, 0, 0, 0.06)',
    dark: 'rgba(255, 255, 255, 0.06)',
  },
  blur: '20px',
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  animations,
  glass,
};
