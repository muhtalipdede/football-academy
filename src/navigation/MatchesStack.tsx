import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MatchesStackParamList } from '../types';
import { MatchListScreen } from '../screens/matches/MatchListScreen';
import { MatchDetailScreen } from '../screens/matches/MatchDetailScreen';
import { COLORS, FONT_WEIGHTS } from '../constants/theme';

const Stack = createStackNavigator<MatchesStackParamList>();

export const MatchesStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.white, elevation: 0, shadowOpacity: 0 },
      headerTintColor: COLORS.primary,
      headerTitleStyle: { fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="MatchList" component={MatchListScreen} options={{ title: 'Maçlar' }} />
    <Stack.Screen name="MatchDetail" component={MatchDetailScreen} options={{ title: 'Maç Detayı' }} />
  </Stack.Navigator>
);
