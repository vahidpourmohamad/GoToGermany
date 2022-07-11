import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Helper/AuthContext';

export default function LoadingPages({ navigation }) {
  const { login } = useContext(AuthContext);

  const getDataCallBack = useCallback(() => {
    async () => {
      try {
        console.log('ok1');

        let userId = await AsyncStorage.getItem('@userId');
        let userName = await AsyncStorage.getItem('@userName');
        let userPhone = await AsyncStorage.getItem('@userPhone');
        let userAvatar = await AsyncStorage.getItem('@userAvatar');
        let userGender = await AsyncStorage.getItem('@userGender');

        if (userGender !== null) {
          const loadedUserData = {
            userId,
            userName,
            userPhone,
            userAvatar,
            userGender,
          };
          console.log(loadedUserData);

          login(loadedUserData);
          navigation.replace('MainDrawer');
        } else {
          navigation.replace('Login');
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, [login, navigation]);

  useEffect(() => {
    getDataCallBack();
  }, [getDataCallBack]);

  return (
    <View style={styles.container}>
      <Text>در حال بارگزاری</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
