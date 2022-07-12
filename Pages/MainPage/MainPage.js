// 8123883527
// rd2ueT
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  VStack,
  Center,
  HStack,
  Avatar,
  IconButton,
  Text,
  Circle,
  Icon,
} from 'native-base';
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import WordCard from '../../Components/wordCard.js';

import { AuthenticationContext } from '../../Helper/AuthenticationContext.js';

import useAxiosFetchData from '../../Helper/Hooks/useAxiosFetchData.js';
import useAxiosSetData from '../../Helper/Hooks/useAxiosSetData.js';
const MainPage = ({ navigation, route }) => {
  const { userName, userToken, signOut, isLoading } = useContext(
    AuthenticationContext,
  );
  console.log('Enter Page');

  const [wordGerman, setWordGerman] = useState();
  const [wordPersian, setWordPersian] = useState();
  const [plural, setPlural] = useState();
  const [wordGender, setWordGender] = useState();
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState();
  const [correct, setCorrect] = useState();

  const {
    response: answerResponse,
    loading: answerLoading,
    sendData: answerDataSend,
  } = useAxiosSetData({
    method: 'post',
    url: '/userAnswer',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      id: questionId,
      correct: correct,
    }),
  });

  const answerSendDataCallBack = useCallback(() => {
    answerDataSend();
  }, [answerDataSend]);

  useEffect(() => {
    if (answerResponse !== null) {
      navigation.replace('MainPage');
      console.log('Replace');
    }
  }, [answerResponse, navigation]);

  const { response, loading } = useAxiosFetchData({
    method: 'post',
    url: '/getNewWord',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      userId: userToken,
    }),
  });
  useEffect(() => {
    console.log(response);

    if (response !== undefined && response !== null) {
      if (response[0] !== undefined) {
        setWordGerman(response[0].question);
        console.log(response[0].answer);
        console.log(response[0]);

        setWordPersian(response[0].answer[0]);
        setPlural(response[0].answer[1]);
        setWordGender(response[0].answer[2]);
        setQuestion(response[0].question);
        setQuestionId(response[0]._id);
        console.log(response[0]._id);
      } else {
        setWordGerman(response.question);
        console.log(response.answer);
        console.log(response);
        setWordPersian(response.answer[0]);
        setPlural(response.answer[1]);
        setWordGender(response.answer[2]);
        setQuestion(response.question);
        setQuestionId(response._id);
        console.log(response._id);
      }
    }
  }, [response]);

  if (isLoading === true || loading || answerLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
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
      <VStack safeArea space={5} alignItems="center" mt={4}>
        <Center w="80%" h="12%" bg="white" rounded="29" shadow={9}>
          <HStack w="100%" h="100%">
            <Center w="65%" h="100%">
              <VStack mt={3} h="100%" w="100%" alignItems="flex-end">
                <Text
                  style={{ fontFamily: 'IRANSansBold', fontSize: 14 }}
                  mt={1}
                >
                  {userName}
                </Text>
                <Text
                  mt={2}
                  style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
                >
                  تعداد کلمات امروز
                </Text>
                <Text style={{ fontFamily: 'IRANSansLight', fontSize: 12 }}>
                  مرور امروز
                </Text>
              </VStack>
            </Center>
            <Center w="35%" h="100%">
              <Avatar
                bg="green.500"
                size="lg"
                source={{
                  uri: 'https://api.multiavatar.com/' + userName + '.png',
                }}
              />
            </Center>
          </HStack>
        </Center>
        <Center w="80%" h="12%" bg="white" rounded="29" shadow={9}>
          <HStack ml={2} justifyItems="space-between" w="100%" h="100%">
            <Center w="15%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                قبلی
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                قبلی
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                قبلی
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                قبلی
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                پاسخ
              </Text>
            </Center>
            <Center w="25%" h="100%">
              <Icon
                as={AntDesign}
                name="inbox"
                color="violet.900"
                size={12}
                _dark={{
                  color: 'violet.900',
                }}
              />
              <Text
                mt={2}
                style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}
              >
                بعدی
              </Text>
            </Center>
          </HStack>
        </Center>
        {/* const wordGerman = ' Tee';
  const wordPersian = 'چای';
  const plural = 'Tees';
  const wordGender = 'Der';
  const question = 'چای'; */}
        <WordCard
          wordGerman={wordGerman}
          wordPersian={wordPersian}
          plural={plural}
          wordGender={wordGender}
          question={question}
        />
        <Center
          w="80%"
          alignItems="center"
          h="22%"
          bg="white"
          rounded="29"
          shadow={9}
        >
          <HStack
            alignItems="center"
            justifyContent="space-around"
            w="100%"
            h="100%"
          >
            <Pressable
              onPress={() => {
                setCorrect(false);
                answerSendDataCallBack();
                console.log('touch');
              }}
            >
              <Circle
                size="120px"
                bg="red.500"
                borderWidth={4}
                borderColor="red.700"
              >
                <AntDesign name="close" size={45} color="white" />
              </Circle>
            </Pressable>
            <Pressable
              onPress={() => {
                setCorrect(false);
                answerSendDataCallBack();
                console.log('touch');
              }}
            >
              <Circle
                size="120px"
                bg="success.500"
                borderWidth={4}
                borderColor="success.700"
                onPress={() => {
                  setCorrect(true);
                  answerSendDataCallBack();
                  console.log('touch');
                }}
              >
                <AntDesign name="check" size={45} color="white" />
              </Circle>
            </Pressable>
          </HStack>
        </Center>
      </VStack>
    </ImageBackground>
  );
};
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
  card: { flex: 1 },
});
export default MainPage;
