import React from 'react';
import { useState } from 'react';
import { Center, Pressable } from 'native-base';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  // useDerivedValue,
  // interpolate,
  withRepeat,
  // withSpring,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
function WordCard(props) {
  const [answerShow, setAnswerShow] = useState(true);
  const { wordGerman, wordPersian, plural, wordGender, question } = props;
  const animation = useSharedValue(0);

  const cardFlip = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: animation.value + 'deg',
        },
      ],
    };
  });
  const flipCard = () => {
    if (answerShow === true) {
      setAnswerShow(false);
    } else {
      setAnswerShow(true);
    }
    animation.value = withRepeat(
      withTiming(90, {}, (finished) => {
        if (finished) {
          // animation.value=0;
        } else {
          //console.log('ANIMATION GOT CANCELLED');
        }
      }),
      2,
      true,
    );
  };
  // let wh = height * 0.42;
  return (
    <>
      <Center
        w="80%"
        h={height * 0.4}
        maxH="350"
        alignItems="center"
        alignContent="center"
        justifyItems="center"
        bg="white"
        rounded="29"
        shadow={9}
      >
        <Pressable onPress={flipCard}>
          <Animated.View style={cardFlip}>
            {answerShow ? (
              <Text style={{ fontFamily: 'IRANSansBold', fontSize: 40 }}>
                {question}
              </Text>
            ) : (
              <View style={styles.container}>
                <View style={styles.wordRow}>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 30 }}
                    mt={1}
                  >
                    {wordGender + ' '}
                  </Text>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 22 }}
                    mt={1}
                  >
                    ?????????? :
                  </Text>
                </View>
                <View style={styles.wordRow}>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 30 }}
                    mt={1}
                  >
                    {wordGerman + ' '}
                  </Text>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 22 }}
                    mt={1}
                  >
                    ?????? ???????????? :
                  </Text>
                </View>
                <View style={styles.wordRow}>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 30 }}
                    mt={1}
                  >
                    {wordPersian + ' '}
                  </Text>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 22 }}
                    mt={1}
                  >
                    ???????? ?????? :
                  </Text>
                </View>
                <View style={styles.wordRow}>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 30 }}
                    mt={1}
                  >
                    {plural + ' '}
                  </Text>
                  <Text
                    style={{ fontFamily: 'IRANSansBold', fontSize: 22 }}
                    mt={1}
                  >
                    ?????? ?????? :
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Center>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    // justifyItems: "space-between",
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyItems: 'space-between',
    width: '70%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  card: { flex: 1 },
});
export default WordCard;
