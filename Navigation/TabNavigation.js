import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MainPage from '../Pages/MainPage/MainPage';
// import TikTok from '../Pages/TikTok/TikTok';

import TabBar from './TabBar';
import GermanNewsStackNav from './GermanNewsStackNav';
import MainStackNav from '../Pages/MainPage/MainStackNav';
import AllWords from '../Pages/AllWord/AllWords';

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
      <Tab.Screen name="questioncircleo" component={MainStackNav} />
      <Tab.Screen name="book" component={AllWords} />
      <Tab.Screen name="flag" component={GermanNewsStackNav} />
    </Tab.Navigator>
  );
}
