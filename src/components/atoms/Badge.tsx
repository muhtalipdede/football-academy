import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme';

/**
 * Atom: Badge - Durum göstergesi
 */
interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  size = 'sm',
  style,
}) => {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`], styles[`textSize_${size}`]]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  size_sm: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  size_md: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },

  // Variants
  default: {
    backgroundColor: COLORS.border,
  },
  primary: {
    backgroundColor: COLORS.primaryLight + '20',
  },
  success: {
    backgroundColor: COLORS.successLight,
  },
  warning: {
    backgroundColor: COLORS.warningLight,
  },
  error: {
    backgroundColor: COLORS.errorLight,
  },
  info: {
    backgroundColor: COLORS.infoLight,
  },

  // Text
  text: {
    fontWeight: FONT_WEIGHTS.medium,
  },
  text_default: {
    color: COLORS.textSecondary,
  },
  text_primary: {
    color: COLORS.primary,
  },
  text_success: {
    color: COLORS.success,
  },
  text_warning: {
    color: COLORS.warning,
  },
  text_error: {
    color: COLORS.error,
  },
  text_info: {
    color: COLORS.info,
  },
  textSize_sm: {
    fontSize: FONT_SIZES.xs,
  },
  textSize_md: {
    fontSize: FONT_SIZES.sm,
  },
});
