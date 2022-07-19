import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../Pages/MainPage/MainPage';
import TikTok from '../Pages/TikTok/TikTok';

import TabBar from './TabBar';
import GermanNewsStackNav from './GermanNewsStackNav';
import MainStackNav from '../Pages/MainPage/MainStackNav';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="home" component={MainStackNav} />
      <Tab.Screen name="videocamera" component={TikTok} />
      <Tab.Screen name="book" component={GermanNewsStackNav} />
    </Tab.Navigator>
  );
}
