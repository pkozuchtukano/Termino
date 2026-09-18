import { DarkTheme, type Theme } from '@react-navigation/native';
import type { ViewStyle } from 'react-native';
export const tokens = {
  colors: {
    background: '#090C12',
    surface: '#11161D',
    surfaceElevated: '#151A22',
    border: 'rgba(255,255,255,0.14)',
    textPrimary: '#F5F7FA',
    textSecondary: '#8F98A8',
    amber: '#F5A623',
    cyan: '#25E6E6',
    violet: '#7267FF',
    violetTint: 'rgba(114,103,255,0.12)',
    violetBorder: 'rgba(114,103,255,0.45)',
    cyanTint: 'rgba(37,230,230,0.10)',
    cyanBorder: 'rgba(37,230,230,0.35)',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, section: 32 },
  cardRadius: 24,
  microCardRadius: 18,
  primaryCtaRadius: 30,
  touchTarget: 48,
} as const;
export const effects = {
  card: {
    shadowColor: tokens.colors.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
  amber: {
    shadowColor: tokens.colors.amber,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 4,
  },
  violet: {
    shadowColor: tokens.colors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 2,
  },
  cyan: {
    shadowColor: tokens.colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 1,
  },
} satisfies Record<string, ViewStyle>;
export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: tokens.colors.background,
    card: tokens.colors.surface,
    text: tokens.colors.textPrimary,
    primary: tokens.colors.cyan,
    border: tokens.colors.border,
    notification: tokens.colors.amber,
  },
};
