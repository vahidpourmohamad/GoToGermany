import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function LoadingIndicator() {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={generateColor()} />
    </View>
  );
}
