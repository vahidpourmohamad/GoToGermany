import { View, Text } from 'react-native';
import React from 'react';
import { Button, Center, Image, VStack } from 'native-base';

export default function FeedCard(props) {
  const { text, title, imageUri, id, date, important } = props;
  return (
    <Center
      w="80%"
      h="42%"
      alignItems="center"
      alignContent="center"
      justifyItems="center"
      bg="white"
      rounded="29"
      shadow={9}
    >
      <VStack>
        <Image />
        <Text> Test</Text>
        <Button>More</Button>
      </VStack>
    </Center>
  );
}
