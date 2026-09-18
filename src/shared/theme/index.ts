import { DarkTheme, type Theme } from '@react-navigation/native';
export const tokens = {
  colors: {
    background: '#090A0F',
    surface: '#12151E',
    border: '#1E2433',
    primary: '#6366F1',
    warning: '#F59E0B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
  },
  cardRadius: 20,
  primaryCtaRadius: 30,
} as const;
export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: tokens.colors.background,
    card: tokens.colors.surface,
    text: tokens.colors.textPrimary,
    primary: tokens.colors.primary,
    border: tokens.colors.border,
    notification: tokens.colors.warning,
  },
};
