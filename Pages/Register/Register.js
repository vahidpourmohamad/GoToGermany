import {
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Center,
  Box,
  FormControl,
  Button,
  VStack,
  Input,
  View,
} from 'native-base';
// import { AuthContext } from '../../Helper/AuthContext';
// import useAxios from "../../Helper/Hooks/useAxiosFetchData";
import useAxiosSetData from '../../Helper/Hooks/useAxiosSetData';
import { AuthenticationContext } from '../../Helper/AuthenticationContext';
import LoadingIndicator from '../../Components/LoadingIndicator';

export default function Register(props) {
  // const { navigation, route } = props;
  const [inputs, setInputs] = useState({
    username: '',
    mobileNumber: '',
  });

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { signIn } = useContext(AuthenticationContext);

  const onChangeHandler = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const { response, sendData } = useAxiosSetData({
    method: 'post',
    url: '/userRegister',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      name: inputs.username,
      telephone: inputs.mobileNumber,
      creationDate: new Date().toLocaleString() + '',
      paymentStatus: true,
      applicationVersion: '0.1.0',
      gender: true,
      profilePhoto: 'https://api.multiavatar.com/' + inputs.username,
    }),
  });
  const registerButtonHandler = useCallback(() => {
    setIsButtonClicked(true);
    sendData();
  }, [sendData]);
  useEffect(() => {
    if (response !== null) {
      signIn({ userToken: response._id, userName: inputs.username });
    }
  }, [inputs.username, response, signIn]);
  if (isButtonClicked === true) {
    return <LoadingIndicator />;
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
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
            style={{ fontFamily: 'IRANSansMedium', fontSize: 12 }}
          >
            ثبت نام کنید
          </Text>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                نام شما
              </FormControl.Label>
              <Input
                onChangeText={(text) => onChangeHandler('username', text)}
                style={{ fontFamily: 'IRANSansBold', fontSize: 14 }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                شماره همراه
              </FormControl.Label>
              <Input
                style={{ fontFamily: 'IRANSansBold', fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler('mobileNumber', text)}
              />
            </FormControl>

            <Button
              _text={{ style: { fontFamily: 'IRANSansBold', fontSize: 12 } }}
              mt="2"
              colorScheme="indigo"
              onPress={registerButtonHandler}
            >
              ثبت نام
            </Button>
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
