import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlayersStackParamList } from '../types';
import { PlayerListScreen } from '../screens/players/PlayerListScreen';
import { PlayerDetailScreen } from '../screens/players/PlayerDetailScreen';
import { AgeGroupListScreen } from '../screens/players/AgeGroupListScreen';
import { AgeGroupDetailScreen } from '../screens/players/AgeGroupDetailScreen';
import { COLORS, FONT_WEIGHTS } from '../constants/theme';

const Stack = createStackNavigator<PlayersStackParamList>();

export const PlayersStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.white, elevation: 0, shadowOpacity: 0 },
      headerTintColor: COLORS.primary,
      headerTitleStyle: { fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="PlayerList" component={PlayerListScreen} options={{ title: 'Oyuncular' }} />
    <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ title: 'Oyuncu Detayı' }} />
    <Stack.Screen name="AgeGroupList" component={AgeGroupListScreen} options={{ title: 'Yaş Grupları' }} />
    <Stack.Screen name="AgeGroupDetail" component={AgeGroupDetailScreen} options={{ title: 'Yaş Grubu' }} />
  </Stack.Navigator>
);
