import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { PlayersStackNavigator } from './PlayersStack';
import { TrainingStackNavigator } from './TrainingStack';
import { MatchesStackNavigator } from './MatchesStack';
import { MoreStackNavigator } from './MoreStack';
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'home';

        switch (route.name) {
          case 'Dashboard':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Players':
            iconName = focused ? 'people' : 'people-outline';
            break;
          case 'Training':
            iconName = focused ? 'fitness' : 'fitness-outline';
            break;
          case 'Matches':
            iconName = focused ? 'football' : 'football-outline';
            break;
          case 'More':
            iconName = focused ? 'grid' : 'grid-outline';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarLabelStyle: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.medium,
      },
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.divider,
        height: 85,
        paddingBottom: 20,
        paddingTop: 8,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Ana Sayfa' }} />
    <Tab.Screen name="Players" component={PlayersStackNavigator} options={{ title: 'Oyuncular' }} />
    <Tab.Screen name="Training" component={TrainingStackNavigator} options={{ title: 'Antrenman' }} />
    <Tab.Screen name="Matches" component={MatchesStackNavigator} options={{ title: 'Maçlar' }} />
    <Tab.Screen name="More" component={MoreStackNavigator} options={{ title: 'Daha Fazla' }} />
  </Tab.Navigator>
);
