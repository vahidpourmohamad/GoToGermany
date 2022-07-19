import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './MainPage';
import WordEnd from './WordEnd';

export default function MainStackNav() {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="MainPageStackHome" component={MainPage} />
      <stack.Screen name="MainPageStackWordEnd" component={WordEnd} />
    </stack.Navigator>
  );
}
