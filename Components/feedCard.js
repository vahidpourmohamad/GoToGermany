import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  VStack,
} from 'native-base';
const { width } = Dimensions.get('window');
export default function FeedCard(props) {
  const { mainContent, title, imageUri, id, date, type } = props.item;
  const { onPress } = props;
  let contentTypeColor = '';
  let contentType = 'مهم';
  switch (type) {
    case 1:
      contentType = 'مهم';
      contentTypeColor = 'red.500';
      break;
    case 2:
      contentType = 'اوسبیلدونگ';
      contentTypeColor = 'violet.500';
      break;
    case 3:
      contentType = 'قبل از مهاجرت';
      contentTypeColor = 'blue.500';
      break;
    case 4:
      contentType = 'بعد از مهاجرت';
      contentTypeColor = 'cyan.500';
      break;
    case 5:
      contentType = 'مصاحبه کاری';
      contentTypeColor = 'yellow.500';
      break;
    case 6:
      contentType = 'ویزا';
      contentTypeColor = 'purple.500';
      break;
    case 7:
      contentType = 'مهاجرت تحصیلی';
      contentTypeColor = 'green.500';
      break;
    default:
      break;
  }

  return (
    <Pressable onPress={onPress}>
      <Box alignItems="center" marginTop="6" marginBottom="6">
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

            <Center
              bg={contentTypeColor}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
                //     fontFamily: 'IRANSansBold',
              }}
              style={{ fontFamily: 'IRANSansBold' }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              {contentType}
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {title}
              </Heading>
            </Stack>
            <Text fontWeight="400">{mainContent}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400"
                >
                  {date}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
}
var styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.075,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
