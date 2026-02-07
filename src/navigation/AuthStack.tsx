import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RoleSelectorScreen } from '../screens/auth/RoleSelectorScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />
  </Stack.Navigator>
);
