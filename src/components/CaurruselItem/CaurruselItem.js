import React, { Component } from 'react';
import { StyleSheet, View, Alert, TouchableNativeFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Lightbox from 'react-native-lightbox';
var utilities = require('../../assets/css/utilities');

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export default class Item extends Component {

render() {
  return (
    <View style={styles.photo} >
      <Lightbox>
        <Image style={styles.photo1}  source={{uri: this.props.image.thumbnail }}/>
      </Lightbox>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  photo: {
    width: 60,
    height: 60,
    margin: 3,
  },
  photo1: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
