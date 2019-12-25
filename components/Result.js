import React from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Result(props) {
  const result = props.navigation.getParam('result', 'Chưa xác định');

  function handleOnPressExplore() {
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.scanner}>
          {Number.isNaN(Number(result)) === false ? (
            <>
              <Text style={styles.errorStyle}>Điểm số:</Text>
              <Text style={styles.errorStyle}>{result}</Text>
            </>
          ) : (
            <>
              <Text style={styles.errorStyle}>
                {result === 'failed' ? 'Không thành công' : 'Chưa xác định'}
              </Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleOnPressExplore}
            style={styles.button}>
            <Text style={styles.buttonText}>Làm lại</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    margin: 12,
    marginTop: Platform.select({ios: 8, android: 32}),
    justifyContent: 'center',
    aspectRatio: undefined,
  },
  scroll: {
    backgroundColor: 'transparent',
    display: 'flex',
  },
  contentContainer: {
    padding: 8,
  },
  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  button: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 240,
    height: 45,
    borderRadius: 200,
    backgroundColor: '#2196f3',
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
  inputStyle: {
    width: 240,
  },
  errorStyle: {
    color: 'red',
    textAlign: 'center',
  },
});
