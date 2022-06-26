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

import WordCard from "../../Components/wordCard.js";

const MainPage = ({ navigation, route }) => {
  return (
    <ImageBackground
      style={styles.image}
      width="100%"
      hight="100%"
      resizeMode="cover"
      source={require("../../assets/Back.png")}
    >
      <VStack safeArea space={5} alignItems="center" mt={4}>
        <Center w="80%" h="12%" bg="white" rounded="29" shadow={9}>
          <HStack w="100%" h="100%">
            <Center w="65%" h="100%">
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
            </Center>
            <Center w="35%" h="100%">
              <Avatar
                bg="green.500"
                size="lg"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              />
            </Center>
          </HStack>
        </Center>
        <Center w="80%" h="12%" bg="white" rounded="29" shadow={9}>
          <HStack justifyItems="space-between" w="100%" h="100%">
            <Center w="33%" h="100%">
              <IconButton
                variant="solid"
                bg="violet.900"
                icon={<AntDesign name="left" size={24} color="white" />}
              />
              <Text
                mt={2}
                style={{ fontFamily: "IRANSansMedium", fontSize: 14 }}
              >
                قبلی
              </Text>
            </Center>
            <Center w="33%" h="100%">
              <IconButton
                variant="solid"
                bg="violet.900"
                icon={<AntDesign name="star" size={24} color="white" />}
              />
              <Text
                mt={2}
                style={{ fontFamily: "IRANSansMedium", fontSize: 14 }}
              >
                پاسخ
              </Text>
            </Center>
            <Center w="34%" h="100%">
              <IconButton
                variant="solid"
                bg="violet.900"
                icon={<AntDesign name="right" size={24} color="white" />}
              />
              <Text
                mt={2}
                style={{ fontFamily: "IRANSansMedium", fontSize: 14 }}
              >
                بعدی
              </Text>
            </Center>
          </HStack>
        </Center>
        <WordCard />
        <Center
          alignItems="center"
          w="80%"
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
            <Circle size="120px" bg="red.500">
              <AntDesign name="close" size={45} color="white" />
            </Circle>
            <Circle size="120px" bg="success.500">
              <AntDesign name="check" size={45} color="white" />
            </Circle>
          </HStack>
        </Center>
      </VStack>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  card: { flex: 1 },
});

export default MainPage;
