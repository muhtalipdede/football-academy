import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TrainingStackParamList } from '../types';
import { TrainingListScreen } from '../screens/training/TrainingListScreen';
import { TrainingDetailScreen } from '../screens/training/TrainingDetailScreen';
import { AttendanceScreen } from '../screens/training/AttendanceScreen';
import { COLORS, FONT_WEIGHTS } from '../constants/theme';

const Stack = createStackNavigator<TrainingStackParamList>();

export const TrainingStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.white, elevation: 0, shadowOpacity: 0 },
      headerTintColor: COLORS.primary,
      headerTitleStyle: { fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="TrainingList" component={TrainingListScreen} options={{ title: 'Antrenmanlar' }} />
    <Stack.Screen name="TrainingDetail" component={TrainingDetailScreen} options={{ title: 'Antrenman Detayı' }} />
    <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: 'Yoklama' }} />
  </Stack.Navigator>
);
