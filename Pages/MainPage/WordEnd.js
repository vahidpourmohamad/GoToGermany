import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function WordEnd() {
  return (
    <View style={styles.container}>
      <Text>تبریک کلمات امروز شما تمام شد </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  card: { flex: 1 },
});
