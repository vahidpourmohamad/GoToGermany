import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// import MainPage from './Pages/MainPage/MainPage.js';
import ErrorBoundary from './Helper/ErrorBoundry.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RootNav from './Helper/RootNav.js';
import { AuthenticationContext } from './Helper/AuthenticationContext.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './Pages/DrawerContent.js/DrawerContent.js';
// import MainStackNav from './Pages/MainPage/MainStackNav.js';
import TabNavigation from './Navigation/TabNavigation.js';
import LoadingIndicator from './Components/LoadingIndicator.js';
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const theme = extendTheme({
  fontConfig: {
    IranSans: {
      100: {
        normal: 'IRANSansRegular',
      },
      200: {
        normal: 'IRANSans_UltraLight',
      },
      300: {
        normal: 'IRANSans_Light',
      },
      400: {
        normal: 'IRANSansRegular',
      },
      500: {
        normal: 'IRANSans_Medium',
      },
      600: {
        normal: 'IRANSans_Bold',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'IRANSansBold',
    body: 'IRANSansMedium',
    Regular: 'IRANSansRegular',
    light: 'IRANSansLight',
    Ultralight: 'IRANSansUltraLight',
    mono: 'IRANSansRegular',
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [userNew, setUserNew] = useState(true);
  // const { login } = useContext(AuthContext);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const { userToken, userName } = foundUser;
        // const userToken = String(foundUser[0].userToken);
        // const userName = foundUser[0].username;
        //console.log(userName);

        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userName', userName);
        } catch (e) {
          //console.log(e);
        }

        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userName');
        } catch (e) {
          //console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      userName: loginState.userName,
      userToken: loginState.userToken,
      isLoading: loginState.isLoading,
    }),
    [loginState.userName, loginState.userToken, loginState.isLoading],
  );

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          IRANSansBold: require('./assets/Fonts/IRANSans_Bold.ttf'),
          IRANSansLight: require('./assets/Fonts/IRANSans_Light.ttf'),
          IRANSansUltraLight: require('./assets/Fonts/IRANSans_UltraLight.ttf'),
          IRANSansRegular: require('./assets/Fonts/IRANSans.ttf'),
          IRANSansMedium: require('./assets/Fonts/IRANSans_Medium.ttf'),
        });
        // setTimeout(async () => {
        // setIsLoading(false);
        let userToken;
        userToken = null;
        let userName;
        userName = null;

        try {
          userToken = await AsyncStorage.getItem('userToken');
          userName = await AsyncStorage.getItem('userName');
        } catch (e) {
          //console.log(e);
        }
        //console.log('user token: ', userName);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, id: userName });
        //   //console.log(loginState.userName);
        // }, 5000);
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
  if (loginState.isLoading) {
    return <LoadingIndicator/>;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthenticationContext.Provider value={authContext}>
        <ErrorBoundary>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              {loginState.userToken !== null ? (
                <Drawer.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                  drawerContent={(props) => <DrawerContent {...props} />}
                >
                  <Drawer.Screen
                    name="MainPageNavigation"
                    component={TabNavigation}
                  />
                </Drawer.Navigator>
              ) : (
                <RootNav />
              )}
            </NavigationContainer>
          </NativeBaseProvider>
        </ErrorBoundary>
      </AuthenticationContext.Provider>
    </View>
  );
}
