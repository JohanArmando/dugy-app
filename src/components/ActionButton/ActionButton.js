import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
var utilities = require('../../assets/css/utilities');

export default class ActionButton extends Component {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.action}>
        <View style={[styles.buttonAction, utilities.color_primary]} elevation={10}>
          {this.props.icon}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonAction: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonAction: {
    fontSize: 30,
    textAlign: 'center',
    margin: 8,
    color: '#E6ECF7'
  }
});
