import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
var utilities = require('../../assets/css/utilities');
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default class CardPet extends Component {

render() {
  const goToProfilePet= () => Actions.ProfilePet({ pet: this.props.pet });
  const goToViewProfilePet = () => Actions.ViewProfilePet({ pet: this.props.pet });
  let gender;
  if (this.props.pet.gender == 0) {
    gender = (
      <Icon name="venus" size={14} color="#1e9284" />
    );
  } else {
    gender = (
      <Icon name="mars" size={14} color="#1e9284" />
    );
  }

    return (
      <TouchableNativeFeedback onPress={goToViewProfilePet}>
        <View elevation={2} style={styles.pet}>
          <View style={styles.avatar_img}>
            <Image style={styles.img} source={{uri: this.props.pet.avatar.thumbnail }} />
          </View>
          <View style={styles.margins}>
            <Text style={styles.TitlePet}>{this.props.pet.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.SubtitlePet}>{this.props.pet.race.name}</Text>
                {gender}
            </View>

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
              <Icon2 name="edit" size={18} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  pet: {
    width: '47%',
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginLeft: '2%',
    marginTop: '2%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
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
    padding: 10,
    marginTop: 3
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
