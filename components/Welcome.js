import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default function Welcome(props) {
  function handleOnPressExplore() {
    props.navigation.navigate('App');
  }

  return (
    <View style={styles.scanner}>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.preview}
      />
      <TouchableOpacity onPress={handleOnPressExplore} style={styles.button}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 32,
    width: 240,
    height: 45,
    borderRadius: 200,
    backgroundColor: '#37CED8',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 240,
    color: '#FFFFFF',
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});
