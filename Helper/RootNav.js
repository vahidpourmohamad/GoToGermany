import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const RootStack = createNativeStackNavigator();

const RootNav = ({ navigation }) => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    headerMode="none"
  >
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Register" component={Register} />
  </RootStack.Navigator>
);

export default RootNav;
