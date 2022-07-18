import { View, Text, FlatList, StyleSheet } from 'react-native';

import React, { useState } from 'react';
import FeedCard from '../../Components/feedCard';
import { Box, Center } from 'native-base';
('react-native-safe-area-context');
import GestureRecognizer from 'react-native-swipe-gestures';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 3,
  },
  {
    id: 'bd7acbea-c1b1-42c2-aed5-3ad53abb28ba',
    title: 'First Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 4,
  },
  {
    id: '3ac68afc-c605-45d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 5,
  },
  {
    id: '58694a0f-3da1-371f-bd96-145571e29d72',
    title: 'Third Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 6,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145551e29d72',
    title: 'Third Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: require('../../assets/Login.png'),
    date: 'ToDay',
    type: 7,
  },
];
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
        اخبار و مطالب مربوط به آلمان
      </Text>
    </View>
  );
};
export default function News({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  console.log(navigation);

  const renderItem = ({ item }) => {
    return (
      <FeedCard
        item={item}
        onPress={() => {
          // console.log('Click');

          setSelectedId(item.id);
          navigation.navigate('germanNewsContentItem', {
            id: 86,
          });
        }}
      />
    );
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipeRight = () => {
    // console.log('Swipe Right');
    navigation.jumpTo('videocamera');
  };
  return (
    <GestureRecognizer
      // onSwipe={(direction, state) => this.onSwipe(direction, state)}
      onSwipeRight={onSwipeRight}
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
          <FlatListHeader></FlatListHeader>
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
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
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
