import {
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
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
  Icon,
} from 'native-base';

import useAxiosSetData from '../../Helper/Hooks/useAxiosSetData';
import { AuthenticationContext } from '../../Helper/AuthenticationContext';
//! this section for sliders
import AppIntroSlider from 'react-native-app-intro-slider';
import { AntDesign } from '@expo/vector-icons';
import LoadingIndicator from '../../Components/LoadingIndicator';

const slides = [
  {
    key: 1,
    title: '',
    text: '',
    image: require('../../assets/iconNew.png'),
    backgroundColor: '#ffff',
  },
  {
    key: 2,
    title: 'بهتر یاد بگیریم',
    text: 'با من میتونی می تونی تا سطح B2 المانی یاد بگیری',
    image: require('../../assets/1.png'),
    backgroundColor: '#59f2ab',
  },
  {
    key: 3,
    title: 'با من بروز باش',
    text: 'می تونی آخرین اخبار رو از من بگیری',
    image: require('../../assets/2.png'),
    backgroundColor: '#a77ff0',
  },
];

export default function Login(props) {
  const [showRealApp, setShowRealApp] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.sliderImage} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="arrowright"
          size={36}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="check"
          size={36}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </View>
    );
  };
  const { navigation } = props;

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
  return <LoadingIndicator />;
  }

  if (showRealApp === false) {
    return (
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
      />
    );
  } else {
    return (
      <ImageBackground
        style={styles.image}
        width="100%"
        hight="100%"
        resizeMode="cover"
        source={require('../../assets/Back.png')}
      >
        <Center w="100%">
          <Box bg="white" rounded="29" p="2" py="8" w="90%" maxW="320">
            <Text
              color="coolGray.800"
              style={{
                fontFamily: 'IRANSansBold',
                fontSize: 20,
                alignSelf: 'center',
                // margin: 1,
              }}
            >
              به اپلیکیشن
            </Text>
            <Text
              color="coolGray.800"
              style={{
                fontFamily: 'IRANSansBold',
                fontSize: 36,
                alignSelf: 'center',
                // margin: 1,
              }}
            >
              بیا بریم آلمان
            </Text>
            <Text
              color="coolGray.800"
              style={{
                fontFamily: 'IRANSansBold',
                fontSize: 20,
                alignSelf: 'center',
                marginBottom: 15,
              }}
            >
              خوش آمدید
            </Text>
            <Text
              style={{
                fontFamily: 'IRANSansMedium',
                fontSize: 12,
                alignSelf: 'center',
              }}
            >
              جهت ادامه مسیر یادگیری لطفا وارد شوید
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
                  onChangeText={(text) =>
                    onChangeHandler('userTelephone', text)
                  }
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
                <Link
                  _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  marginRight={2}
                  onPress={() => navigation.replace('Register')}
                >
                  ثبت نام
                </Link>
                <Text fontSize="sm" color="coolGray.600">
                  من یک کاربر جدید هستم
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ImageBackground>
    );
  }
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'IRANSansBold',
    textAlign: 'center',
    fontSize: 18,
  },
  title: {
    fontFamily: 'IRANSansBold',
    textAlign: 'center',
    fontSize: 36,
  },
  sliderImage: {
    resizeMode: 'center',

    height: '40%',
  },
  buttonCircle: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
