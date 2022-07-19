// import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
// import MainPage from './MainPage';
import TabNavigation from '../../Navigation/TabNavigation';

export default function DrawerNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="MainTabNAvigation" component={TabNavigation} />
    </Drawer.Navigator>
  );
}
