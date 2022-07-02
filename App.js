import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainPage from "./Pages/MainPage/MainPage.js";
import ErrorBoundary from "./Helper/ErrorBoundry.js";
import { AppContextProvider } from "./Helper/appContextProvider";
///Apollo Client Setup

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink, onError, OnError } from "@apollo/client/link/error";
import { AuthProvider } from "./Helper/AuthContext.js";
import Login from "./Pages/Login/Login.js";

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (networkErrors) {
    networkErrors.map(({ message, location, path }) => {
      console.log(`Graphql Error ${message} ${location} ${path}`);
      alert(`Graphql Error ${message} ${location} ${path}`);
    });
  }
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`Graphql Error ${message} ${location} ${path}`);
      alert(`Graphql Error ${message} ${location} ${path}`);
    });
  }
});

const authlink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const link = from([
  errorLink,
  //  new HttpLink({ uri: "http://127.0.0.1:10000" }),
  createUploadLink({ uri: "http://localhost:10000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authlink.concat(link),
});

///

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
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <ErrorBoundary>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={MainPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </ErrorBoundary>
      </AppContextProvider>
    </ApolloProvider>
  );
}
