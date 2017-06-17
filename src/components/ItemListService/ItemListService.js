import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, Text, Image, View, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import AvatarPet from './avatarPet'
require('moment/locale/es.js');
var utilities = require('../../assets/css/utilities');
moment.locale('es');         // es

export default class CardService extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
  }
render() {
  let pets = this.props.service.pets.map(function(e, index){
    pet = this.props.pets.filter(function (p) {
      return p.id === e.id;
    });
    return (
      <AvatarPet key={''+this.props.service.id + index + e.id} pet={pet[0]}/>
    );
  }.bind(this))
  let walker;
  if (this.props.service.walker == null) {
    walker = 'sin paseador';
  } else {
    walker = this.props.service.walker.name;
  }
  const goToWalkerProfile= () => {
    if (this.props.service.walker == null) {
      ToastAndroid.show('Este paseo aun no tiene paseador asignado', ToastAndroid.SHORT);
    } else {
      Actions.WalkerProfile({ walker: this.props.service.walker })
    }
  };
  const goToServiceDetails= () => {
      Actions.ServiceDetails({ service: this.props.service })
  };
  return (
    <TouchableNativeFeedback onPress={goToServiceDetails.bind(this)}>
      <View elevation={2} style={styles.pet}>
        <View style={[styles.avatar,utilities.color_primary]}>
          <Text style={styles.dayDate}>{ moment(this.props.service.date).format('DD') }</Text>
          <Text style={[styles.dayMonth,{marginLeft: 5}]}>{ moment(this.props.service.date).format('MMM').toUpperCase() }</Text>
        </View>
        <View style={{padding: 10, flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="date-range" size={20} color="#1e9284" />
            <Text style={{fontSize: 16, color: '#383838', marginLeft: 10}}>{ moment(this.props.service.date).fromNow() }</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon name="home" size={20} color="#1e9284" />
            <Text style={{fontSize: 16, color: '#383838',  marginLeft: 10}}>{this.props.service.address.substring(0, 20) + '...'}</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon name="schedule" size={20} color="#1e9284" />
            <Text style={{fontSize: 16, color: '#383838', marginLeft: 10}}>{ moment(this.props.service.date).format('hh:mm a') + ' - ' + moment(this.props.service.date).add(this.props.service.hours ,'hour').format('hh:mm a') }</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon name="directions-walk" size={20} color="#1e9284" />
            <TouchableNativeFeedback onPress={goToWalkerProfile}>
              <Text style={{fontSize: 16, color: '#383838',  marginLeft: 10}}>{walker}</Text>
            </TouchableNativeFeedback>
          </View>
          <View style={{flexDirection: 'row', marginTop: 3, alignItems: 'center'}}>
            <Icon name="pets" size={20} color="#1e9284" />
            <View style={styles.pets}>{ pets }</View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );


 }
}

const styles = StyleSheet.create({
  pet: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 5
  },
  pets: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-start',
    marginLeft: 10
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
    fontSize: 26
  },
  dayMonth: {
    color: '#FFF',
    fontSize: 20
  },
  avatar: {
    width: 100,
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
