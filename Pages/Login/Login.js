import {
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Center,
  Box,
  FormControl,
  Link,
  Button,
  HStack,
  VStack,
  Input,
  View,
} from 'native-base';
// import { AuthContext } from '../../Helper/AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import useAxiosSetData from '../../Helper/Hooks/useAxiosSetData';
import { AuthenticationContext } from '../../Helper/AuthenticationContext';

export default function Login(props) {
  const { navigation } = props;
  // console.log(props);

  const [inputs, setInputs] = useState({ userName: '', userTelephone: '' });

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { signIn } = useContext(AuthenticationContext);

  const { response, sendData } = useAxiosSetData({
    method: 'post',
    url: '/login',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      name: inputs.userName,
    }),
  });

  useEffect(() => {
    if (response !== null) {
      if (response.telephone === inputs.userTelephone) {
        signIn({ userToken: response._id, userName: inputs.userName });
      }
    }
  }, [
    response,
    isButtonClicked,
    inputs.userTelephone,
    inputs.userName,
    signIn,
  ]);

  const loginButtonClick = () => {
    setIsButtonClicked(true);
    sendData();
  };
  const onChangeHandler = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };
  if (isButtonClicked === true) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ImageBackground
      style={styles.image}
      width="100%"
      hight="100%"
      resizeMode="cover"
      source={require('../../assets/Back.png')}
    >
      <Center w="100%">
        <Box bg="white" rounded="29" safeArea p="2" py="8" w="90%" maxW="290">
          <Text
            color="coolGray.800"
            style={{ fontFamily: 'IRANSansBold', fontSize: 26 }}
            alignSelf="Center"
          >
            آمدید
          </Text>
          <Text
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
            style={{ fontFamily: 'IRANSansMedium', fontSize: 12 }}
          >
            وارد شوید
          </Text>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                نام شما
              </FormControl.Label>
              <Input
                onChangeText={(text) => onChangeHandler('userName', text)}
                style={{ fontFamily: 'IRANSansBold', fontSize: 14 }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                تلفن همراه
              </FormControl.Label>
              <Input
                style={{ fontFamily: 'IRANSansBold', fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler('userTelephone', text)}
              />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                  style: { fontFamily: 'IRANSansBold', fontSize: 12 },
                }}
                alignSelf="flex-end"
                mt="1"
              >
                فراموشی کلمه عبور
              </Link>
            </FormControl>
            <Button
              _text={{ style: { fontFamily: 'IRANSansBold', fontSize: 12 } }}
              mt="2"
              colorScheme="indigo"
              onPress={loginButtonClick}
            >
              ورود
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
              >
                من یک کاربر جدید هستم
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.replace('Register')}
              >
                ثبت نام
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ImageBackground>
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
