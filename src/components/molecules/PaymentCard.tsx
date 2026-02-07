import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../../constants/theme';
import { Badge } from '../atoms/Badge';
import { formatCurrency, getPaymentStatusText } from '../../utils/helpers';

/**
 * Molecule: PaymentCard - Ödeme kart bileşeni
 */
interface PaymentCardProps {
  description: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  onPress?: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  description,
  amount,
  currency,
  dueDate,
  status,
  onPress,
}) => {
  const statusVariant =
    status === 'paid' ? 'success' :
    status === 'overdue' ? 'error' : 'warning';

  const statusIcon =
    status === 'paid' ? 'checkmark-circle' :
    status === 'overdue' ? 'alert-circle' : 'time';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: (status === 'paid' ? COLORS.success : status === 'overdue' ? COLORS.error : COLORS.warning) + '15' }]}>
        <Ionicons
          name={statusIcon as any}
          size={24}
          color={status === 'paid' ? COLORS.success : status === 'overdue' ? COLORS.error : COLORS.warning}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.description} numberOfLines={1}>{description}</Text>
        <Text style={styles.dueDate}>Son ödeme: {dueDate}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(amount, currency)}</Text>
        <Badge text={getPaymentStatusText(status)} variant={statusVariant} size="sm" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
  dueDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  amount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
});
