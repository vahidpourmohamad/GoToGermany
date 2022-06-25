import React from 'react'
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
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { StyleSheet,  View, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
const img = require("../../assets/test.png");
const MainPage =  ({ navigation, route })=> {

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
                <Text fontFamily="heading" fontSize="20">
                  وحید پورمحمد
                </Text>
                <Text fontFamily="body" fontSize="14">
                   نگین
                </Text>
                <Text fontFamily="light" fontSize="12">
                  محله وکیل آباد
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
                icon={<AntDesign name="tago" size={24} color="white" />}
              />
              <Text mt={2} fontFamily="body" fontSize="14">
                محصولات
              </Text>
            </Center>
            <Center w="33%" h="100%">
              <IconButton
                variant="solid"
                bg="violet.900"
                icon={<AntDesign name="star" size={24} color="white" />}
              />
              <Text mt={2} fontFamily="body" fontSize="14">
                با تخفیف
              </Text>
            </Center>
            <Center w="34%" h="100%">
              <IconButton
                variant="solid"
                bg="violet.900"
                icon={<AntDesign name="plus" size={24} color="white" />}
              />
              <Text mt={2} fontFamily="body" fontSize="14">
                جدیدها
              </Text>
            </Center>
          </HStack>
        </Center>
        <Center
          w="80%"
          h="42%"
          alignItems="center"
          bg="white"
          rounded="29"
          shadow={9}
        >
          <Image
            source={img}
            alt={"Alternate Text "}
            width="100%"
            height="100%"
            rounded="29"
          />
        </Center>
        <Center w="80%" h="22%" bg="white" rounded="29" shadow={9} />
      </VStack>
    </ImageBackground>
  );
}
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
});

export default MainPage;