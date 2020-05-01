import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';

const TensorCamera = cameraWithTensors(Camera);


import * as mobilenet from '@tensorflow-models/mobilenet';
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };

    
  }

  // handleCameraStream(images, updatePreview, gl) {
  //   const loop = async () => {
  //     const nextImageTensor = images.next().value

  //     //
  //     // do something with tensor here
  //     //

  //     // if autorender is false you need the following two lines.
  //     // updatePreview();
  //     // gl.endFrameEXP();

  //     // requestAnimation(loop);
  //   }
  //   loop();
  // }

 
  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });

    // Load mobilenet.
    const model = await mobilenet.load();

    // Get a reference to the bundled asset and convert it to a tensor
    const image = require('./assets/cat.png');
    const imageAssetPath = Image.resolveAssetSource(image);
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    const imageData = await response.arrayBuffer();

    const imageTensor = decodeJpeg(imageData);

    const prediction = await model.classify(imageTensor);

    // Use prediction in app.
    setState({
      prediction,
    });
  }
 
 
  render() {

    // Currently expo does not support automatically determining the
    // resolution of the camera texture used. So it must be determined
    // empirically for the supported devices and preview size.

    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = {
        height: 200,
        width: 300,
      };
    } else {
      textureDims = {
        height: 200,
        width: 300,
      };
    }
    return (
      <View style={styles.container}>
        <Text>Hy Subo, start working on your app!</Text>
         {this.state.isTfReady && <Text>Great! Tensorflow is ready</Text>} 
         {this.state.prediction && <Text>{this.state.prediction}</Text>} 
         {this.state.prediction && console.log(this.state.prediction)}
         <Image
          style={{ width: 250, height: 200 }}
          source={require('./assets/cat.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f7ea1',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  camera: {
    width: 300,
    height: 400,
  }
});
