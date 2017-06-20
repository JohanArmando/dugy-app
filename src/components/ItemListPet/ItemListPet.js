import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');

export default class CardPet extends Component {
  constructor(){
    super();
    this.state = {
      active: false
    }
  }
render() {
  const goToProfilePet= () => {
    if (this.state.active) {
      this.props.unselect(this.props.pet)
    } else {
      this.props.select(this.props.pet)
    }
    this.setState({
      active: !this.state.active
    })
  };
  if (this.state.active) {
    return (
      <TouchableNativeFeedback onPress={goToProfilePet.bind(this)}>
        <View style={[styles.pet, {backgroundColor: '#f1f1f1'}]}>
          <View style={[styles.avatar,utilities.color_primary]}>
            <Icon name="check" size={45} color="white" />
          </View>
          <View style={styles.margins}>
            <Text style={styles.TitlePet}>{this.props.pet.name}</Text>
            <Text style={styles.SubtitlePet}>Raza: {this.props.pet.race.name}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableNativeFeedback onPress={goToProfilePet}>
        <View style={styles.pet}>
          <View style={styles.avatar_img}>
            <Image style={styles.img} source={{uri: this.props.pet.avatar.thumbnail }} />
          </View>
          <View style={styles.margins}>
            <Text style={styles.TitlePet}>{this.props.pet.name}</Text>
            <Text style={styles.SubtitlePet}>Raza: {this.props.pet.race.name}</Text>

          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

 }
}

const styles = StyleSheet.create({
  pet: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  TitlePet: {
    fontSize: 20
  },
  SubtitlePet: {
    fontSize: 15,
    color: '#a4a4a4'
  },
  margins: {
    marginLeft: 10,
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 20,
    color: '#FFF'
  },
  avatar_img: {
    height:50,
    borderRadius: 200,
    width: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'contain'

  },
});
