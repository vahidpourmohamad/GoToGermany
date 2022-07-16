import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'native-base';
import React from 'react';

import { View, Pressable, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={[styles.mainItemContainer]}>
            <Pressable
              onPress={onPress}
              style={{
                // backgroundColor: isFocused ? 'violet' : 'gray',
                // size: isFocused ? 20 : 30,
                borderRadius: 0,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 0,
                }}
              >
                <Icon
                  as={AntDesign}
                  name={route.name}
                  color="gray.700"
                  size={isFocused ? 12 : 8}
                />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    width: '100%',
    height: '8%',
    // marginTop: 5,
    backgroundColor: 'white',
    // borderRadius: 29,
    // marginHorizontal: width * 0.05,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: 'gray',
  },
});

export default TabBar;
