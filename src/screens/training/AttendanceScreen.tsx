import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { Avatar, LoadingIndicator, Button } from '../../components/atoms';
import { mockTrainings, mockPlayers, mockAttendanceRecords } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { AttendanceStatus } from '../../types';
import { getAttendanceStatusText } from '../../utils/helpers';
import { useAuthStore } from '../../store';

/**
 * Yoklama Ekranı
 */
export const AttendanceScreen: React.FC<{ route: any; navigation: any }> = ({ route }) => {
  const { trainingId } = route.params;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});

  const training = mockTrainings.find((t) => t.id === trainingId);
  const ageGroup = mockAgeGroups.find((ag) => ag.id === training?.ageGroupId);
  const players = mockPlayers.filter((p) =>
    p.ageGroupIds.includes(training?.ageGroupId || '') && p.isActive
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Mevcut yoklama kayıtlarını yükle
      const existing = mockAttendanceRecords.filter((a) => a.trainingId === trainingId);
      const map: Record<string, AttendanceStatus> = {};
      existing.forEach((a) => { map[a.playerId] = a.status; });
      setAttendanceMap(map);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleAttendance = (playerId: string) => {
    if (user?.role === 'parent' || user?.role === 'player') return;

    const current = attendanceMap[playerId];
    let next: AttendanceStatus;
    if (!current) next = 'present';
    else if (current === 'present') next = 'late';
    else if (current === 'late') next = 'absent';
    else next = 'present';

    setAttendanceMap((prev) => ({ ...prev, [playerId]: next }));
  };

  const saveAttendance = () => {
    Alert.alert('Başarılı', 'Yoklama kaydedildi! (Mock)', [{ text: 'Tamam' }]);
  };

  const getStatusColor = (status?: AttendanceStatus) => {
    if (status === 'present') return COLORS.success;
    if (status === 'late') return COLORS.warning;
    if (status === 'absent') return COLORS.error;
    return COLORS.border;
  };

  const getStatusIcon = (status?: AttendanceStatus): keyof typeof Ionicons.glyphMap => {
    if (status === 'present') return 'checkmark-circle';
    if (status === 'late') return 'time';
    if (status === 'absent') return 'close-circle';
    return 'ellipse-outline';
  };

  if (loading) return <LoadingIndicator message="Yoklama yükleniyor..." />;

  const isReadOnly = user?.role === 'parent' || user?.role === 'player';

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.trainingTitle}>{training?.title}</Text>
        <Text style={styles.ageGroup}>{ageGroup?.name} • {players.length} Sporcu</Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <LegendItem color={COLORS.success} label="Katıldı" />
        <LegendItem color={COLORS.warning} label="Geç Kaldı" />
        <LegendItem color={COLORS.error} label="Katılmadı" />
      </View>

      {/* Player List */}
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const status = attendanceMap[item.id];
          return (
            <TouchableOpacity
              style={styles.playerRow}
              onPress={() => toggleAttendance(item.id)}
              activeOpacity={isReadOnly ? 1 : 0.7}
              disabled={isReadOnly}
            >
              <Avatar name={item.name} size={40} backgroundColor={COLORS.primary} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerPosition}>{item.position} • #{item.jerseyNumber}</Text>
              </View>
              <View style={[styles.statusBtn, { backgroundColor: getStatusColor(status) + '15' }]}>
                <Ionicons name={getStatusIcon(status)} size={24} color={getStatusColor(status)} />
                {status && (
                  <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
                    {getAttendanceStatusText(status)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Save Button */}
      {!isReadOnly && (
        <View style={styles.footer}>
          <Button
            title="Yoklamayı Kaydet"
            onPress={saveAttendance}
            fullWidth
            size="lg"
          />
        </View>
      )}
    </View>
  );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={legendStyles.item}>
    <View style={[legendStyles.dot, { backgroundColor: color }]} />
    <Text style={legendStyles.label}>{label}</Text>
  </View>
);

const legendStyles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  dot: { width: 10, height: 10, borderRadius: 5 },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  trainingTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  ageGroup: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  list: {
    padding: SPACING.lg,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  playerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  playerName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  playerPosition: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  statusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
});
