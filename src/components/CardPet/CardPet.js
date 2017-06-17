import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
var utilities = require('../../assets/css/utilities');
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CardPet extends Component {

render() {
  const goToProfilePet= () => Actions.ProfilePet({ pet: this.props.pet });
  if (this.props.pet.photos.length === 0) {
    return (
      <TouchableNativeFeedback onPress={goToProfilePet}>
        <View style={styles.pet}>
          <View style={[styles.avatar,utilities.color_primary]}>
            <Text style={styles.letter}>{this.props.pet.name.substring(0,1)}</Text>
          </View>
          <View style={styles.margins}>
            <Text style={styles.TitlePet}>{this.props.pet.name}</Text>
            <Text style={styles.SubtitlePet}>Raza: {this.props.pet.race.name}</Text>
            <Text style={styles.SubtitlePet}>Tamaño: {this.props.pet.size.name}</Text>
            <Text style={styles.SubtitlePet}>Paseo: Ayer</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableNativeFeedback >
        <View elevation={2} style={styles.pet}>
          <View style={styles.avatar_img}>
            <Image style={styles.img} source={{uri: this.props.pet.photos[0].thumbnail }} />
          </View>
          <View style={styles.margins}>
            <Text style={styles.TitlePet}>{this.props.pet.name}</Text>
            <Text style={styles.SubtitlePet}>{this.props.pet.race.name}</Text>
          </View>
          <View  style={{
            top: 110,
            right: 5,
            position: 'absolute'
          }}>
            <TouchableNativeFeedback onPress={goToProfilePet}>
              <View elevation={5} style={{
                width: 40,
                height: 40,
                backgroundColor: '#1e9284',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
                <Icon name="remove-red-eye" size={18} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

 }
}

const styles = StyleSheet.create({
  pet: {
    width: '47%',
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginLeft: '2%',
    marginTop: '2%'
  },
  TitlePet: {
    fontSize: 19,
    color: '#565656'
  },
  SubtitlePet: {
    fontSize: 14,
    color: '#a4a4a4'
  },
  margins: {
    padding: 10
  },
  avatar: {


  },
  letter: {
    fontSize: 18,
    color: '#FFF'
  },
  avatar_img: {

  },
  img: {
    width: '100%',
    height: 130,
    resizeMode: 'cover'

  },
});
