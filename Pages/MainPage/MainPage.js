import React, { useState, useContext, useEffect } from "react";
import {
  VStack,
  Center,
  HStack,
  Avatar,
  IconButton,
  Text,
  Circle,
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import WordCard from "../../Components/wordCard.js";
import { AuthContext } from "../../Helper/AuthContext.js";
import { AuthenticationContext } from "../../Helper/AuthenticationContext.js";
const MainPage = ({ navigation, route }) => {
  const { userName, userToken, signOut, isLoading } = useContext(
    AuthenticationContext
  );
  const [loaded, setLoaded] = useState(false);

  // console.log(userName);

  useEffect(() => {
    console.log(userToken);

    // if (userName !== null) {
    //   setLoaded(true);
    // }
  }, [isLoading]);
  if (isLoading == true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                  {userName}
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
                  uri: "https://api.multiavatar.com/" + userName + ".png",
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
                onPress={() => {
                  console.log("test");
                  signOut();
                }}
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
        <Center alignItems="center" h="22%" bg="white" rounded="29" shadow={9}>
          <HStack
            alignItems="center"
            justifyContent="space-around"
            w="80%"
            h="100%"
          >
            <Circle
              size="120px"
              bg="red.500"
              borderWidth={4}
              borderColor="red.700"
            >
              <AntDesign name="close" size={45} color="white" />
            </Circle>
            <Circle
              size="120px"
              bg="success.500"
              borderWidth={4}
              borderColor="success.700"
            >
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
