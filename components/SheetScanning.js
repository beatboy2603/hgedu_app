import React from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function SheetScanning(props) {
  const testCodeRef = React.createRef();
  const userRef = React.createRef();
  const [error, setError] = React.useState('');
  const [test, setTest] = React.useState({});

  function onClassSubmit() {
    let {current: field} = testCodeRef;

    console.log(field.value());
  }

  function onTestSubmit() {
    let {current: field} = userRef;

    console.log(field.value());
  }

  // function formatText(text) {
  //   return text.replace(/[^+\d]/g, '');
  // }

  function handleOnPressExplore() {
    let {current: testCodeField} = testCodeRef;
    let {current: emailField} = userRef;
    console.log(testCodeField.value());
    console.log(emailField.value());
    axios
      .get(
        'https://hgedu-server.herokuapp.com/api/omr/' +
          emailField.value() +
          '/' +
          testCodeField.value(),
      )
      .then(res => {
        if (res.data) {
          if (res.data === 'Either test code or email is wrong!') {
            setError('Either test code or email is wrong!');
          } else {
            setTest(res.data);
            console.log('testId', res.data.id);
            props.navigation.navigate('ScanCam', {testId: res.data.id});
          }
        }
      })
      .catch(e => console.log(e));
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.scanner}>
          <TextField
            label="Mã bài kiểm tra"
            //title="Enter your test code"
            style={styles.inputStyle}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="next"
            //formatText={formatText}
            onSubmitEditing={onClassSubmit}
            ref={testCodeRef}
          />
          <TextField
            label="Email"
            //title="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            //formatText={formatText}
            onSubmitEditing={onTestSubmit}
            ref={userRef}
          />
        </View>
        <Text style={styles.errorStyle}>{error}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleOnPressExplore}
            style={styles.button}>
            <Text style={styles.buttonText}>Bắt đầu</Text>
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
