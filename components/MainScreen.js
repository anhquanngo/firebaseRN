/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const includeExtra = true;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcecfb',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    maxHeight: 200,
  },
  text: {
    color: 'black',
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default function MainScreen() {
  const [response, setResponse] = React.useState(null);
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const actions = [
    {
      title: 'Select Image',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
      },
    },
    {
      title: 'Select Video',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'video',
        includeExtra,
      },
    },
  ];

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {response?.assets &&
        response?.assets.map(({uri}) => (
          <View key={uri} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: uri}}
            />
          </View>
        ))}
      {actions.map(({title, type, options, index}) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onButtonPress(type, options)}>
            <Text style={{fontSize: 36, color: 'green'}}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
