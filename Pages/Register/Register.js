import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
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

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);

  const onChangeHandler = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    //console.log(inputs);
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
                نام کاربری
              </FormControl.Label>
              <Input
                onChangeText={(text) => onChangeHandler("username", text)}
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">ایمیل</FormControl.Label>
              <Input
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler("email", text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                کلمه عبور
              </FormControl.Label>
              <Input
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                type="text"
                onChangeText={(text) => onChangeHandler("password", text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label alignSelf="flex-end">
                تکرار کلمه
              </FormControl.Label>
              <Input
                style={{ fontFamily: "IRANSansBold", fontSize: 14 }}
                type="text"
                onChangeText={(text) =>
                  onChangeHandler("passwordConfirm", text)
                }
              />
            </FormControl>
            <Button
              _text={{ style: { fontFamily: "IRANSansBold", fontSize: 12 } }}
              mt="2"
              colorScheme="indigo"
              onPress={registerUser}
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
