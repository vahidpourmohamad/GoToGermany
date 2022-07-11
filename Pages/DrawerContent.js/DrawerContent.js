import { Text } from 'react-native';
import React, { useContext } from 'react';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthenticationContext } from '../../Helper/AuthenticationContext';
import { Avatar, Button, HStack, IconButton, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function DrawerContent({ navigation }) {
  const { userName, signOut } = useContext(AuthenticationContext);
  return (
    <VStack safeArea justifyContent="space-between">
      <VStack space={5} alignItems="center" mt="70px">
        <Avatar
          bg="green.500"
          size="2xl"
          source={{
            uri: 'https://api.multiavatar.com/' + userName + '.png',
          }}
        />
        <Text
          style={{ fontFamily: 'IRANSansBold', fontSize: 28, marginTop: 0 }}
          mt="60px"
        >
          {userName}
        </Text>
        <Button
          _text={{ style: { fontFamily: 'IRANSansBold', fontSize: 14 } }}
          // mt="2"
          bg="violet.900"
          variant="solid"
          size={'lg'}
          width="150"
          onPress={() => {}}
        >
          تنظیمات
        </Button>
        <Button
          _text={{ style: { fontFamily: 'IRANSansBold', fontSize: 14 } }}
          // mt="2"
          bg="violet.900"
          variant="solid"
          size={'lg'}
          // width="100"
          onPress={() => {
            signOut;
          }}
        >
          خروج از حساب کاربری
        </Button>
      </VStack>
      <VStack space={5} alignItems="center" mt="200px">
        <HStack space={2}>
          <IconButton
            variant="solid"
            bg="violet.900"
            icon={<AntDesign name="linkedin-square" size={24} color="white" />}
          />
          <IconButton
            variant="solid"
            bg="violet.900"
            icon={<AntDesign name="phone" size={24} color="white" />}
          />
          <IconButton
            variant="solid"
            bg="violet.900"
            icon={<AntDesign name="instagram" size={24} color="white" />}
          />
        </HStack>
        <Text mt={2} style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
          Version 0.1.0
        </Text>
      </VStack>
    </VStack>
  );
}
