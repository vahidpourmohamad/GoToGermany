import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');
export default function TikTok({ navigation }) {
  const initialContentOnTop = {
    mainText: 'This is Test',
    author: '@David',
    likeCount: 0,
  };
  const [contentOnTop, setcontentOnTop] = useState(initialContentOnTop);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Focus');
      //Every time the screen is focused the Video starts playing
      if (video) {
        video.current.playAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  //Blur Event: to be fired when the HomeScreen loses focus.
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('Blur');
      //Every time the screen loses focus the Video is paused
      if (video) {
        video.current.stopAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        shouldPlay
        style={styles.backgroundVideo}
        source={require('../../assets/test.mp4')}
        //useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.onTopView}>
        <LinearGradient
          colors={['rgba(40,40,40,0.8)', 'transparent', 'transparent']}
        >
          <View style={styles.onTopContent}>
            <Text style={styles.authorTextOnContent}>
              {contentOnTop.author}
            </Text>
            <Text style={styles.mainTextOnContent}>
              {contentOnTop.mainText}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainTextOnContent: {
    color: 'white',
  },
  authorTextOnContent: {
    color: 'white',
  },
  onTopContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
  },

  onTopView: {
    position: 'absolute',
    top: height - 150,
    left: 0,
    bottom: 0,
    right: 0,

    color: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
