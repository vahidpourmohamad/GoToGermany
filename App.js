import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useCallback, useContext } from "react";
import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import MainPage from "./Pages/MainPage/MainPage.js";
import ErrorBoundary from "./Helper/ErrorBoundry.js";
import { AppContextProvider } from "./Helper/appContextProvider";
///Apollo Client Setup
import { AuthContext, AuthProvider } from "./Helper/AuthContext.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPages from "./Pages/Loading/loading.js";
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
  const [appIsReady, setAppIsReady] = useState(false);
  const [userNew, setUserNew] = useState(true);
  const { login } = useContext(AuthContext);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          IRANSansBold: require("./assets/Fonts/IRANSans_Bold.ttf"),
          IRANSansLight: require("./assets/Fonts/IRANSans_Light.ttf"),
          IRANSansUltraLight: require("./assets/Fonts/IRANSans_UltraLight.ttf"),
          IRANSansRegular: require("./assets/Fonts/IRANSans.ttf"),
          IRANSansMedium: require("./assets/Fonts/IRANSans_Medium.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppContextProvider>
        <ErrorBoundary>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Loading" component={LoadingPages} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={MainPage} />
                <Stack.Screen name="Register" component={Register} />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </ErrorBoundary>
      </AppContextProvider>
    </View>
  );
}
