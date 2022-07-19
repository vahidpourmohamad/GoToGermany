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
import LoadingIndicator from '../../Components/LoadingIndicator.js';

const MainPage = ({ navigation, route }) => {
  const { userName, userToken, isLoading } = useContext(AuthenticationContext);
  ////console.log(navigation);
  const boxesInitialState = {
    boxOne: 0,
    boxTwo: 0,
    boxThree: 0,
    boxFour: 0,
    boxFive: 0,
    wordCount: 0,
    boxInfinite: 0,
  };
  const [wordGerman, setWordGerman] = useState();
  const [wordPersian, setWordPersian] = useState();
  const [plural, setPlural] = useState();
  const [wordGender, setWordGender] = useState();
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState();
  const [correct, setCorrect] = useState();
  const [box, setBox] = useState(1);
  const [boxes, setBoxes] = useState(boxesInitialState);
  const { response: boxResponse, loading: boxLoadding } = useAxiosFetchData({
    method: 'post',
    url: '/userWordReport',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      userId: userToken,
    }),
  });

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

  useEffect(() => {
    if (boxResponse !== undefined && boxResponse !== null) {
      setBoxes(boxResponse);
    }
  }, [boxResponse]);

  const answerSendDataCallBack = useCallback(() => {
    answerDataSend();
  }, [answerDataSend]);

  useEffect(() => {
    if (answerResponse !== null) {
      navigation.replace('MainPageStackHome');
    }
  }, [answerResponse, navigation]);

  useEffect(() => {
    if (correct != null && correct !== undefined) {
      answerSendDataCallBack();
    }
  }, [correct]);

  const { response, loading } = useAxiosFetchData({
    method: 'post',
    url: '/getNewWord',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      userId: userToken,
    }),
  });
  const [wordEnd, setWordEnd] = useState(true);
  useEffect(() => {
    if (response !== undefined && response !== null) {
      // console.log(response);

      if (response.toString() !== '-1') {
        if (response[0] !== undefined) {
          setWordEnd(false);
          setWordGerman(response[0].question);
          setWordPersian(response[0].answer[0]);
          setPlural(response[0].answer[1]);
          setWordGender(response[0].answer[2]);
          setQuestion(response[0].question);
          setQuestionId(response[0]._id);
          setBox(response[0].box);
        } else {
          setWordEnd(false);
          setWordGerman(response.question);
          setWordPersian(response.answer[0]);
          setPlural(response.answer[1]);
          setWordGender(response.answer[2]);
          setQuestion(response.question);
          setQuestionId(response._id);
          setBox(response.box);
        }
      } else {
        console.log('Word Store is Empty');
        setWordEnd(true);
        navigation.replace('MainPageStackWordEnd');
      }
    }
  }, [navigation, response]);

  if (isLoading === true || loading || answerLoading || wordEnd) {
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
                <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                  تعداد کلمات : {boxes.wordCount}
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
              <View>
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
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 18,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  اول
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxOne}
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <View>
                <Icon as={AntDesign} name="inbox" color="red.500" size={12} />
                <Text
                  style={{
                    position: 'absolute',
                    top: 18,
                    left: 18,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  دوم
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxTwo}
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <View>
                <Icon
                  as={AntDesign}
                  name="inbox"
                  color="yellow.500"
                  size={12}
                />
                <Text
                  style={{
                    position: 'absolute',
                    top: 18,
                    left: 18,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  سوم
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxThree}
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <View>
                <Icon as={AntDesign} name="inbox" color="blue.500" size={12} />
                <Text
                  style={{
                    position: 'absolute',
                    top: 19,
                    left: 15,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  چهارم
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxFour}
              </Text>
            </Center>
            <Center w="15%" h="100%">
              <View>
                <Icon as={AntDesign} name="inbox" color="green.500" size={12} />
                <Text
                  style={{
                    position: 'absolute',
                    top: 19,
                    left: 15,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  پنجم
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxFive}
              </Text>
            </Center>
            <Center w="25%" h="100%">
              <View>
                <Icon as={AntDesign} name="inbox" color="cyan.500" size={12} />
                <Text
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 15,
                    fontSize: 8,
                    fontFamily: 'IRANSansMedium',
                  }}
                >
                  ششم
                </Text>
              </View>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {boxes.boxInfinite}
              </Text>
            </Center>
          </HStack>
        </Center>

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
                //answerSendDataCallBack(false);
                //console.log('touch');
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
                setCorrect(true);
                //if()
                //   answerSendDataCallBack(true);
                //console.log('touch');
              }}
            >
              <Circle
                size="120px"
                bg="success.500"
                borderWidth={4}
                borderColor="success.700"
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
