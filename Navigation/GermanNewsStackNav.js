import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from '../Pages/GermanNews/News';
import GermanContentItem from '../Pages/GermanNewsItem/GermanContentItem';

export default function GermanNewsStackNav() {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="germanNews" component={News} />
      <stack.Screen
        name="germanNewsContentItem"
        component={GermanContentItem}
      />
    </stack.Navigator>
  );
}
