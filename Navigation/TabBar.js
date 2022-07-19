import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'native-base';
import React from 'react';

import { View, Pressable, StyleSheet } from 'react-native';
import { Circle } from 'react-native-svg';

// const { width } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let iconColor = 'gray.900';
        switch (route.name) {
          case 'home':
            iconColor = 'black';
            break;
          case 'videocamera':
            iconColor = 'red.500';
            break;
          case 'book':
            iconColor = 'yellow.500';
            break;
          default:
            break;
        }

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
                borderRadius: 0,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 0,
                  backgroundColor: 'white',
                  borderColor: 'black',
                }}
              >
                <Icon
                  as={AntDesign}
                  name={route.name}
                  color={iconColor}
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
    height: '6%',
    // marginTop: 5,
    backgroundColor: 'white',
    // borderRadius: 29,
    // marginHorizontal: width * 0.05,
    borderTopWidth: 1,
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
