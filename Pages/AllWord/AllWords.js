import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import FeedCard from '../../Components/feedCard';
import { Box, Center } from 'native-base';
('react-native-safe-area-context');
import GestureRecognizer from 'react-native-swipe-gestures';
import useAxiosFetchData from '../../Helper/Hooks/useAxiosFetchData';
import LoadingIndicator from '../../Components/LoadingIndicator';
import WordCard from '../../Components/wordCard';

const FlatListHeader = () => {
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{ fontSize: 24, color: 'black', fontFamily: 'IRANSansBold' }}
      >
        تمام کلمات تا سطح B2
      </Text>
    </View>
  );
};
export default function AllWords({ navigation }) {
  const contentDataInitialize = {
    _id: '62d567c20706b0b9bc0b650b',
    imageUri:
      'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
    title: 'تست',
    authour: 'داوود',
    mainContent: '   ',
    type: 2,
    creataionDate: '',
  };

  const [contentData, setContentData] = useState(contentDataInitialize);
  const { response, loading } = useAxiosFetchData({
    method: 'post',
    url: '/WordAll',
    headers: JSON.stringify({ accept: '*/*' }),
  });
  useEffect(() => {
    // //console.log(response);

    if (response !== undefined && response !== null) {
      //console.log(response);

      setContentData(response);
    }
  }, [response]);
  const [selectedId, setSelectedId] = useState(null);
  //console.log(navigation);

  const renderItem = ({ item }) => {
    return (
      //   <View
      //     style={{
      //       //  flex: 1,
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       hight: '25%',
      //       width: '100%',
      //     }}
      //     >
      <Box
        alignItems="center"
        justifyContent="center"
        marginTop="6"
        marginBottom="6"
        //  borderWidth={3}
      >
        <WordCard
          wordGerman={item.question}
          wordPersian={item.answer[0]}
          plural={item.answer[1]}
          wordGender={item.answer[2]}
          question={item.question}
          // onPress={() => {
          //   setSelectedId(item._id);
          //   navigation.navigate('germanNewsContentItem', {
          //     id: item._id,
          //   });
          // }}
        />
      </Box>
      //</View>
    );
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipeRight = () => {
    // //console.log('Swipe Right');
    navigation.jumpTo('questioncircleo');
  };
  const onSwipeLeft = () => {
    //console.log('Swipe Right');
    navigation.jumpTo('flag');
  };
  if (loading === true) {
    return <LoadingIndicator />;
  }
  return (
    <GestureRecognizer
      // onSwipe={(direction, state) => this.onSwipe(direction, state)}
      onSwipeRight={onSwipeRight}
      onSwipeLeft={onSwipeLeft}
      config={config}
      style={{
        flex: 1,
        // backgroundColor: this.state.backgroundColor,
      }}
    >
      <Center safeArea style={styles.container}>
        <Box
          h={16}
          bgColor={'gray.200'}
          borderBottomColor={'gray.600'}
          borderBottomWidth={1}
          alignItems={'flex-start'}
          justifyContent={'center'}
          shadow={9}
          // marginBottom={1}
          w="100%"
        >
          <FlatListHeader />
        </Box>
        <View
          style={styles.image}
          width="100%"
          hight="100%"
          //resizeMode="cover"
          //source={require('../../assets/Back.png')}
        >
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={contentData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            //    extraData={selectedId}
          />
        </View>
      </Center>
    </GestureRecognizer>
  );
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
