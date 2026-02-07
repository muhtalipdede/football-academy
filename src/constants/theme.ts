/**
 * Uygulama Tema Sabitleri
 * Kırmızı / Lacivert / Beyaz tonlarında spor temalı renk paleti
 */

export const COLORS = {
  // Ana renkler
  primary: '#1B2A4A',       // Lacivert
  primaryLight: '#2D4373',  // Açık lacivert
  primaryDark: '#0F1D33',   // Koyu lacivert
  secondary: '#E63946',     // Kırmızı
  secondaryLight: '#FF6B6B', // Açık kırmızı
  secondaryDark: '#C1121F',  // Koyu kırmızı
  accent: '#FFD700',        // Altın sarısı (vurgu)

  // Nötr renkler
  white: '#FFFFFF',
  black: '#000000',
  background: '#F5F6FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E8EAF0',
  divider: '#F0F0F5',

  // Metin renkleri
  textPrimary: '#1B2A4A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  textLink: '#2D4373',

  // Durum renkleri
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Yoklama renkleri
  present: '#10B981',
  late: '#F59E0B',
  absent: '#EF4444',

  // Ödeme renkleri
  paid: '#10B981',
  pending: '#F59E0B',
  overdue: '#EF4444',

  // Kart arkaplanları
  cardGradientStart: '#1B2A4A',
  cardGradientEnd: '#2D4373',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  title: 32,
};

export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
};
