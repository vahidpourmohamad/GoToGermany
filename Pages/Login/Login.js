import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Center,
  Box,
  FormControl,
  Link,
  Button,
  HStack,
  Image,
  VStack,
  Heading,
  Input,
} from "native-base";
import { AuthContext } from "../../Helper/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxiosSetData from "../../Helper/Hooks/useAxiosSetData";

export default function Login(props) {
  const { navigation, route } = props;
  // console.log(props);

  const [inputs, setInputs] = useState({ userName: "", userTelephone: "" });
  const [userNameCorrect, setUSerNameCorrect] = useState();

  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [newUser, setNewUser] = useState(false);
  const { response, loading, error, sendData } = useAxiosSetData({
    method: "post",
    url: "/login",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify({
      name: inputs.userName,
    }),
  });

  const getData = async () => {
    try {
      console.log("1");

      let userId = await AsyncStorage.getItem("@userId");
      let userName = await AsyncStorage.getItem("@userName");
      let userPhone = await AsyncStorage.getItem("@userPhone");
      let userAvatar = await AsyncStorage.getItem("@userAvatar");
      let userGender = await AsyncStorage.getItem("@userGender");
      console.log("2");
      console.log(userGender);

      if (userGender !== null) {
        console.log("4");
        const loadedUserData = {
          userId,
          userName,
          userPhone,
          userAvatar,
          userGender,
        };
        console.log(loadedUserData);

        login(loadedUserData);
        navigation.replace("Main");
        setNewUser(false);
      } else {
        console.log("3");
        setNewUser(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (response !== null) {
      if (response.telephone == inputs.userTelephone) {
        login({
          userId: response._id,
          userName: inputs.userName,
          userPhone: inputs.userTelephone,
          userAvatar: "https://api.multiavatar.com/" + inputs.username,
          userGender: false,
        });
        navigation.replace("Main");
      }
    }
  }, [response]);

  const loginButtonClick = () => {
    sendData();
  };
  const onChangeHandler = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <ImageBackground
      style={styles.image}
      width="100%"
      hight="100%"
      resizeMode="cover"
      source={require("../../assets/Back.png")}
    >
      <Center w="100%">
        <Box bg="white" rounded="29" safeArea p="2" py="8" w="90%" maxW="290">
          <Text
            color="coolGray.800"
            style={{ fontFamily: "IRANSansBold", fontSize: 26 }}
            alignSelf="Center"
          >
            آمدید
          </Text>
          <Text
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
            style={{ fontFamily: "IRANSansMedium", fontSize: 12 }}
          >
            وارد شوید
          </Text>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                نام شما
              </FormControl.Label>
              <Input
                onChangeText={(text) => onChangeHandler("userName", text)}
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                تلفن همراه
              </FormControl.Label>
              <Input
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler("userTelephone", text)}
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                  style: { fontFamily: "IRANSansBold", fontSize: 12 },
                }}
                alignSelf="flex-end"
                mt="1"
              >
                فراموشی کلمه عبور
              </Link>
            </FormControl>
            <Button
              _text={{ style: { fontFamily: "IRANSansBold", fontSize: 12 } }}
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
                  color: "warmGray.200",
                }}
              >
                من یک کاربر جدید هستم
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.replace("Register")}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
