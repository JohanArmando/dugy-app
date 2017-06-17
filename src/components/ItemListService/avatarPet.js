import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
require('moment/locale/es.js');
var utilities = require('../../assets/css/utilities');
moment.locale('es');         // es

export default class AvatarPet extends Component {

  render() {
    const goToProfilePet= () => Actions.ProfilePet({ pet: this.props.pet });
    let image = (
      <Text>I</Text>
    );
    if (this.props.pet != null) {
      image = (
        <Image style={styles.avatarPet} source={{uri: this.props.pet.photos[0].thumbnail }}/>
      );
    }
    return  (
      <TouchableNativeFeedback onPress={goToProfilePet}>
      {image}
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  pet: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderBottomColor: '#B3BFBF',
    marginBottom: 10,

  },
  pets: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  TitlePet: {
    fontSize: 20
  },
  SubtitlePet: {
    fontSize: 15,
    color: '#a4a4a4'
  },
  avatarPet: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 5,
    resizeMode: 'contain'
  },
  margins: {
    marginLeft: 10,
    marginRight: 10,
  },
  dayDate: {
    color: '#FFF',
    fontSize: 30
  },
  dayMonth: {
    color: '#FFF',
    fontSize: 18
  },
  avatar: {
    width: 90,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 20,
    color: '#FFF'
  },
  avatar_img: {
    height:80,
    width: 80,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 80,
    height: 80,
    resizeMode: 'contain'

  },
});
