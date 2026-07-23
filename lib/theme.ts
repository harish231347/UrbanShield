import { Platform } from 'react-native';

export const Colors = {
  primary: {
    50: '#E3F0FF',
    100: '#BBD9FF',
    200: '#8FC1FF',
    300: '#5AA3FF',
    400: '#2B86F5',
    500: '#1565D8',
    600: '#0E4FB0',
    700: '#0A3D8A',
    800: '#072E6A',
    900: '#051F47',
  },
  accent: {
    400: '#22C1A0',
    500: '#0FB890',
    600: '#0A9A78',
  },
  warning: {
    400: '#F7B955',
    500: '#F0A030',
    600: '#D4841A',
  },
  danger: {
    400: '#F26B6B',
    500: '#E54848',
    600: '#C53030',
  },
  success: {
    400: '#3CCB7A',
    500: '#22B36A',
    600: '#1A9054',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F6F8FB',
    100: '#EEF2F7',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  glass: 'rgba(255,255,255,0.72)',
  glassDark: 'rgba(15,23,42,0.55)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const Radius = {
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  pill: 999,
};

export const Shadows = {
  sm: Platform.select({
    ios: { shadowColor: Colors.neutral[900], shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
    android: { elevation: 2 },
    web: { boxShadow: '0 1px 3px rgba(15,23,42,0.08)' },
  }),
  md: Platform.select({
    ios: { shadowColor: Colors.neutral[900], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
    android: { elevation: 4 },
    web: { boxShadow: '0 4px 12px rgba(15,23,42,0.10)' },
  }),
  lg: Platform.select({
    ios: { shadowColor: Colors.neutral[900], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16 },
    android: { elevation: 8 },
    web: { boxShadow: '0 10px 28px rgba(15,23,42,0.14)' },
  }),
  brand: Platform.select({
    ios: { shadowColor: Colors.primary[500], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.28, shadowRadius: 16 },
    android: { elevation: 10 },
    web: { boxShadow: '0 10px 28px rgba(21,101,216,0.28)' },
  }),
};
