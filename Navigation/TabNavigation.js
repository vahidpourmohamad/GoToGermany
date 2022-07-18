import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../Pages/MainPage/MainPage';
import TikTok from '../Pages/TikTok/TikTok';

import TabBar from './TabBar';
import GermanNewsStackNav from './GermanNewsStackNav';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={'MainPage'}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="home" component={MainPage} />
      <Tab.Screen name="videocamera" component={TikTok} />
      <Tab.Screen name="book" component={GermanNewsStackNav} />
    </Tab.Navigator>
  );
}
