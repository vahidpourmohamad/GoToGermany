import { ActivityIndicator, Pressable, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  ScrollView,
  Stack,
  View,
} from 'native-base';

import { AntDesign } from '@expo/vector-icons';
import useAxiosFetchData from '../../Helper/Hooks/useAxiosFetchData';
import LoadingIndicator from '../../Components/LoadingIndicator';

export default function GermanContentItem({ route, navigation }) {
  const { id } = route.params;

  const contentDataInitialize = {
    _id: '',
    imageUri: '',
    title: '',
    authour: '',
    mainContent: '',
    type: 1,
    creataionDate: '',
  };
  const [content, setContent] = useState(contentDataInitialize);

  const { response, loading } = useAxiosFetchData({
    method: 'post',
    url: '/germanContentSelect',
    headers: JSON.stringify({ accept: '*/*' }),
    body: JSON.stringify({
      id: id,
    }),
  });
  useEffect(() => {
    if (response !== undefined && response !== null) {
      //console.log(response);

      setContent(response);
      //console.log(content);
    }
  }, [response]);

  if (loading === true) {
    return <LoadingIndicator />;
  }
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
                <Image source={{ uri: content[0].imageUri }} alt="image" />
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
                  {content[0].creataionDate}
                </Text>
                <Text style={{ fontFamily: 'IRANSansRegular', fontSize: 10 }}>
                  {content[0].authour}
                </Text>
              </HStack>
              <Stack space={2}>
                <Text style={{ fontFamily: 'IRANSansBold', fontSize: 18 }}>
                  {content[0].title}
                </Text>
              </Stack>
              <Text style={{ fontFamily: 'IRANSansMedium', fontSize: 14 }}>
                {content[0].mainContent}
              </Text>
            </Stack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
