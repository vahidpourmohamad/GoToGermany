import React, { useState } from "react";
import {
  Box,
  VStack,
  Center,
  HStack,
  Avatar,
  extendTheme,
  IconButton,
  Text,
  Image,
  Circle,
  Pressable,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

function WordCard() {
  const [answerShow, setAnswerShow] = useState(false);
  const animation = useSharedValue(0);
  const cardFlip = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: animation.value + "deg",
        },
      ],
    };
  });
  const flipCard = () => {
    if (answerShow == true) {
      setAnswerShow(false);
    } else {
      setAnswerShow(true);
    }
    animation.value = withRepeat(
      withTiming(90, {}, (finished) => {
        if (finished) {
          // animation.value=0;
        } else {
          console.log("ANIMATION GOT CANCELLED");
        }
      }),
      2,
      true
    );
  };

  return (
    <>
      <Center
        w="80%"
        h="42%"
        alignItems="center"
        bg="white"
        rounded="29"
        shadow={9}
      >
        <Pressable onPress={flipCard}>
          <Animated.View style={cardFlip}>
            {answerShow ? (
              <VStack mt={3} h="100%" w="100%" alignItems="flex-end">
                <Text
                  style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                  mt={1}
                >
                  وحید پورمحمد
                </Text>
                <Text
                  mt={2}
                  style={{ fontFamily: "IRANSansMedium", fontSize: 14 }}
                >
                  تعداد کلمات امروز
                </Text>
                <Text style={{ fontFamily: "IRANSansLight", fontSize: 12 }}>
                  مرور امروز
                </Text>
              </VStack>
            ) : (
              <VStack mt={3} h="100%" w="100%" alignItems="flex-end">
                <Text
                  style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                  mt={1}
                >adasda</Text>
                <Text
                  mt={2}
                  style={{ fontFamily: "IRANSansMedium", fontSize: 14 }}
                >
                  تعداد کلمات امروز
                </Text>
                <Text style={{ fontFamily: "IRANSansLight", fontSize: 12 }}>
                  مرور امروز
                </Text>
              </VStack>
            )}
          </Animated.View>
        </Pressable>
      </Center>
    </>
  );
}

export default WordCard;
