import React from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function SheetScanning(props) {
  const classRef = React.createRef();
  const testRef = React.createRef();

  function onClassSubmit() {
    let {current: field} = classRef;

    console.log(field.value());
  }

  function onTestSubmit() {
    let {current: field} = testRef;

    console.log(field.value());
  }

  function formatText(text) {
    return text.replace(/[^+\d]/g, '');
  }

  function handleOnPressExplore() {
    // axios
    //   .get('http://192.168.1.2:8084/api/class/' + 101)
    //   .then(res => console.log(res))
    //   .catch(error => console.log(error));
    props.navigation.navigate('ScanCam');
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.scanner}>
          <TextField
            label="Class ID"
            //title="Choose a class"
            style={styles.inputStyle}
            keyboardType="phone-pad"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            formatText={formatText}
            onSubmitEditing={onClassSubmit}
            ref={classRef}
          />
          <TextField
            label="Test ID"
            //title="Choose a test"
            style={styles.inputStyle}
            keyboardType="phone-pad"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            formatText={formatText}
            onSubmitEditing={onTestSubmit}
            ref={testRef}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleOnPressExplore}
            style={styles.button}>
            <Text style={styles.buttonText}>Start Scan</Text>
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
});
