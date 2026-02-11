import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS } from '../../constants/theme';
import { PlayerCard } from '../../components/molecules';
import { LoadingIndicator, EmptyState } from '../../components/atoms';
import { mockPlayers } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';

/**
 * Sporcu Listesi Ekranı
 */
export const PlayerListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPlayers = mockPlayers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = !selectedGroup || p.ageGroupIds.includes(selectedGroup);
    return matchesSearch && matchesGroup && p.isActive;
  });

  const getAgeGroupName = (ids: string[]) =>
    ids.map((id) => mockAgeGroups.find((ag) => ag.id === id)?.name).filter(Boolean).join(', ');

  if (loading) return <LoadingIndicator message="Sporcular yükleniyor..." />;

  return (
    <View style={styles.container}>
      {/* Arama */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Sporcu ara..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* Yaş Grubu Filtresi */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterContent}
      >
        {[{ id: null, name: 'Tümü' }, ...mockAgeGroups].map((item) => (
          <TouchableOpacity
            key={item.id || 'all'}
            style={[
              styles.filterChip,
              (selectedGroup === item.id || (!selectedGroup && !item.id)) && styles.filterChipActive,
            ]}
            onPress={() => setSelectedGroup(item.id)}
          >
            <Text
              style={[
                styles.filterChipText,
                (selectedGroup === item.id || (!selectedGroup && !item.id)) && styles.filterChipTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sporcu Listesi */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            position={item.position}
            jerseyNumber={item.jerseyNumber}
            ageGroup={getAgeGroupName(item.ageGroupIds)}
            onPress={() => navigation.navigate('PlayerDetail', { playerId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="people-outline"
            title="Sporcu bulunamadı"
            description="Arama kriterlerinize uygun sporcu bulunmuyor."
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    height: 44,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  filterList: {
    marginBottom: SPACING.md,
    overflow: 'visible',
  },
  filterContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  list: {
    padding: SPACING.lg,
  },
});
