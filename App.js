import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainPage from "./Pages/MainPage/MainPage.js";

const Stack = createNativeStackNavigator();


    const theme = extendTheme({
      fontConfig: {
        IranSans: {
          100: {
            normal: "IRANSansRegular",
          },
          200: {
            normal: "IRANSans_UltraLight",
          },
          300: {
            normal: "IRANSans_Light",
          },
          400: {
            normal: "IRANSansRegular",
          },
          500: {
            normal: "IRANSans_Medium",
          },
          600: {
            normal: "IRANSans_Bold",
          },
        },
      },

      // Make sure values below matches any of the keys in `fontConfig`
      fonts: {
        heading: "IRANSansBold",
        body: "IRANSansMedium",
        Regular: "IRANSansRegular",
        light: "IRANSansLight",
        Ultralight: "IRANSansUltraLight",
        mono: "IRANSansRegular",
      },
    });


export default function App() {

  let [fontsLoaded] = useFonts({
    IRANSansBold: require("./assets/Fonts/IRANSans_Bold.ttf"),
    IRANSansLight: require("./assets/Fonts/IRANSans_Light.ttf"),
    IRANSansUltraLight: require("./assets/Fonts/IRANSans_UltraLight.ttf"),
    IRANSansRegular: require("./assets/Fonts/IRANSans.ttf"),
    IRANSansMedium: require("./assets/Fonts/IRANSans_Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (<AppLoading />);
  }

  console.log(theme.fonts);
  return (
    <NativeBaseProvider theme={theme}>
  
      <NavigationContainer>
        
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={MainPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
