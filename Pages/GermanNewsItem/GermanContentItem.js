import { Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
} from 'native-base';

import { AntDesign } from '@expo/vector-icons';

export default function GermanContentItem({ route, navigation }) {
  const { id } = route.params;

  const initialContentState = {
    mainContent: 'متن پیشفرض ',
    imageUri: {
      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
    },
    date: 'امروز',
    author: 'وحید',
    title: 'بدون تیتر ',
  };
  const [content, setContet] = useState(initialContentState);
  return (
    <Box safeArea>
      <Box
        h={16}
        bgColor={'gray.200'}
        borderBottomColor={'gray.600'}
        borderBottomWidth={1}
        alignItems={'flex-start'}
        justifyContent={'center'}
      >
        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <HStack justifyContent={'flex-start'} alignItems={'center'}>
            <AntDesign
              name="arrowleft"
              size={45}
              color="black"
              style={{ marginLeft: 10 }}
            />

            <Text style={{ fontFamily: 'IRANSansBold', marginLeft: 10 }}>
              برگشت به عقب
            </Text>
          </HStack>
        </Pressable>
      </Box>
      <ScrollView>
        <Box alignItems="center" marginTop="6" marginBottom={20}>
          <Box
            maxW="90%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.300"
            borderWidth="1"
          >
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <Text
                  style={{
                    fontFamily: 'IRANSansBold',
                    color: 'gray',
                    fontSize: 10,
                  }}
                >
                  {content.date}
                </Text>
                <Text style={{ fontFamily: 'IRANSansRegular', fontSize: 10 }}>
                  {content.author}
                </Text>
              </HStack>
              <Stack space={2}>
                <Text style={{ fontFamily: 'IRANSansBold', fontSize: 18 }}>
                  {content.title}
                </Text>
              </Stack>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {content.mainContent}
              </Text>
            </Stack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
