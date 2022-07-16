import { View, Text, FlatList } from 'react-native';
import React from 'react';
import FeedCard from '../../Components/feedCard';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: 'test',
    date: 'ToDay',
    important: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: 'test',
    date: 'ToDay',
    important: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    text: 'lorem lorem lorem lorem lorem lorem lorem',
    imageUri: 'test',
    date: 'ToDay',
    important: false,
  },
];

export default function News() {
  const renderItem = ({ item }) => {
    return (
      <FeedCard
        item={item}
        //onPress={() => setSelectedId(item.id)}
        text={'text'}
        title={'title'}
        imageUri={require('')}
        id={'12'}
      />
    );
  };
  return <View></View>;
}
