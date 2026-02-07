import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreStackParamList } from '../types';
import { MoreMenuScreen } from '../screens/more/MoreMenuScreen';
import { AnnouncementListScreen } from '../screens/announcements/AnnouncementListScreen';
import { AnnouncementDetailScreen } from '../screens/announcements/AnnouncementDetailScreen';
import { PerformanceScreen } from '../screens/performance/PerformanceScreen';
import { PerformanceDetailScreen } from '../screens/performance/PerformanceDetailScreen';
import { PaymentListScreen } from '../screens/payments/PaymentListScreen';
import { PaymentDetailScreen } from '../screens/payments/PaymentDetailScreen';
import { MediaScreen } from '../screens/media/MediaScreen';
import { MediaDetailScreen } from '../screens/media/MediaDetailScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { COLORS, FONT_WEIGHTS } from '../constants/theme';

const Stack = createStackNavigator<MoreStackParamList>();

export const MoreStackNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.white, elevation: 0, shadowOpacity: 0 },
      headerTintColor: COLORS.primary,
      headerTitleStyle: { fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="MoreMenu" component={MoreMenuScreen} options={{ title: 'Daha Fazla' }} />
    <Stack.Screen name="Announcements" component={AnnouncementListScreen} options={{ title: 'Duyurular' }} />
    <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} options={{ title: 'Duyuru Detayı' }} />
    <Stack.Screen name="Performance" component={PerformanceScreen} options={{ title: 'Performans' }} />
    <Stack.Screen name="PerformanceDetail" component={PerformanceDetailScreen} options={{ title: 'Performans Detayı' }} />
    <Stack.Screen name="Payments" component={PaymentListScreen} options={{ title: 'Ödemeler' }} />
    <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} options={{ title: 'Ödeme Detayı' }} />
    <Stack.Screen name="Media" component={MediaScreen} options={{ title: 'Medya' }} />
    <Stack.Screen name="MediaDetail" component={MediaDetailScreen} options={{ title: 'Medya Detayı' }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
  </Stack.Navigator>
);
