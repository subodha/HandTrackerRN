import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

import * as mobilenet from '@tensorflow-models/mobilenet';
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
  }

 
  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    // this.setState({
    //   isTfReady: true,
    // });

    // Load mobilenet.
    const model = await mobilenet.load();

    // Get a reference to the bundled asset and convert it to a tensor
    const image = require('./assets/cat.jpg');
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
    return (
      <View style={styles.container}>
        <Text>Hy Subo, start working on your app!</Text>
         {this.state.isTfReady && <Text>Great! Tensorflow is ready</Text>} 
         {this.state.prediction && <Text>{this.state.prediction}</Text>} 
         {this.state.prediction && console.log(this.state.prediction)}
         <Image
          style={{ width: 50, height: 50 }}
          source={this.image}
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
});
