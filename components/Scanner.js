import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Permissions from 'react-native-permissions';
import PDFScanner from '@woonivers/react-native-document-scanner';
import axios from 'axios';

export default function Scanner(props) {
  const pdfScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(
        Platform.OS === 'android'
          ? 'android.permission.CAMERA'
          : 'ios.permission.CAMERA',
      );
      if (result === 'granted') {
        setAllowed(true);
      }
    }
    requestCamera();
  }, []);

  function handleOnPressRetry() {
    setData({});
  }
  function handleOnPress() {
    pdfScannerElement.current.capture();
  }
  if (!allowed) {
    console.log('You must accept camera permission');
    return (
      <View style={styles.permissions}>
        <Text>You must accept camera permission</Text>
      </View>
    );
  }
  if (data.croppedImage) {
    console.log('sending');
    const host = 'https://hgedu-server.herokuapp.com/';
    const URL = host + 'file-upload';
    const form = new FormData();
    let photoArray = data.croppedImage.split('/');
    let photoName = photoArray[photoArray.length - 1];
    let photo = {
      name: photoName,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? data.croppedImage
          : data.croppedImage.replace('file://', ''),
    };
    form.append('image', photo);
    form.append(
      'dateCreated',
      new Date()
        .toJSON()
        .slice(0, 19)
        .replace(/T|-|:/g, ''),
    );
    form.append('userId', 1);

    //use axios to upload
    axios
      .post(URL, form)
      .then(res => {
        if (res != null) {
          console.log('upload successfully');
          let imageLink = {image: res.data};
          console.log('imageLink', imageLink);
          console.log('id', props.navigation.getParam('testId', -1));
          axios
            .post(
              host + 'api/omr/' + props.navigation.getParam('testId', -1),
              imageLink,
            )
            .then(result => {
              props.navigation.navigate('ScanResult', {result: result.data});
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log('failed');
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
  if (data.croppedImage) {
    console.log('data', data);
    return (
      <React.Fragment>
        <Image source={{uri: data.croppedImage}} style={styles.preview} />
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>Thử lại</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <PDFScanner
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(255,130,0, 0.7)"
        enableTorch={false}
        //saveOnDevice={true}
        quality={0.5}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
      />
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Chụp ảnh</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
