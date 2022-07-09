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
// import useAxios from "../../Helper/Hooks/useAxiosFetchData";
import useAxiosSetData from "../../Helper/Hooks/useAxiosSetData";
import { AuthenticationContext } from "../../Helper/AuthenticationContext";

export default function Register(props) {
  const { navigation, route } = props;
  const [inputs, setInputs] = useState({
    username: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);
  const { signIn } = useContext(AuthenticationContext);

  const onChangeHandler = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const { response, loading, error, sendData } = useAxiosSetData({
    method: "post",
    url: "/userRegister",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify({
      name: inputs.username,
      telephone: inputs.mobileNumber,
      creationDate: new Date().toLocaleString() + "",
      paymentStatus: true,
      applicationVersion: "0.1.0",
      gender: true,
      profilePhoto: "https://api.multiavatar.com/" + inputs.username,
    }),
  });
  useEffect(() => {
    if (response !== null) {
      // login({
      //   userId: response._id,
      //   userName: inputs.username,
      //   userPhone: inputs.mobileNumber,
      //   userAvatar: "https://api.multiavatar.com/" + inputs.username,
      //   userGender: false,
      // });
      // navigation.replace("Main");
      console.log("BSignIn  UserName : " + inputs.username);

      signIn({ userToken: response._id, userName: inputs.username });
    }
  }, [response]);

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
            به اپلیکیشن بریم آلمان خوش آمدید
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
            ثبت نام کنید
          </Text>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                نام شما
              </FormControl.Label>
              <Input
                onChangeText={(text) => onChangeHandler("username", text)}
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                شماره همراه
              </FormControl.Label>
              <Input
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler("mobileNumber", text)}
              />
            </FormControl>

            <Button
              _text={{ style: { fontFamily: "IRANSansBold", fontSize: 12 } }}
              mt="2"
              colorScheme="indigo"
              onPress={sendData}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
