import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './MainPage';

export default function MainStackNav() {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="MainPage" component={MainPage} />
    </stack.Navigator>
  );
}
