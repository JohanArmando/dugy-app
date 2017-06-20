import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, ScrollView, ToolbarAndroid, TouchableNativeFeedback, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DrawerLayout from '../../redux/containers/DrawerContainer'
import ActionButton from '../../components/ActionButton/ActionButton'
import CaurruselItem from '../../components/CaurruselItem/CaurruselItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
var utilities = require('../../assets/css/utilities');
import moment from 'moment';
require('moment/locale/es.js');


export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      translucent: false,
      colorBar: '#1e9284'
    }
  }
  render (){
    let gender;
    if (this.props.pet.gender == 0) {
      gender = (
        <Icon name="venus" size={14} color="white" />
      );
    } else {
      gender = (
        <Icon name="mars" size={14} color="white" />
      );
    }

    var comments;
    if (this.props.pet.comments == null || this.props.pet.comments == '') {
      comments = 'Sin comentario';
    } else {
      comments = this.props.pet.comments;
    }
    var age = moment().diff(this.props.pet.born_date, 'years');
    if (age == 0) {
      age = moment().diff(this.props.pet.born_date, 'months');
      if (age > 1) {
        age = age + ' meses';
      } else {
        age = age + ' mes';
      }
    } else {
      if (age == 1) {
        age = age + ' año';
      } else {
        age = age + ' años';
      }
    }
    const goToViewProfilePet = () => {
      this.setState({translucent: false, colorBar: '#1e9284'});
      Actions.ProfilePet({ pet: this.props.pet })
    };
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var source = ds.cloneWithRows([...this.props.pet.photos, {thumbnail: 'http://icon-icons.com/icons2/841/PNG/512/flat-style-circle-add_icon-icons.com_66944.png'}])
    return (
      <View style={[utilities.container, {backgroundColor: '#fff'}]}>

            <StatusBar
              backgroundColor={this.state.colorBar}
              barStyle="light-content"
              translucent={this.state.translucent}
            />
            <ScrollView>
              <View>
              <View style={[styles.avatarContent, {marginTop: -StatusBar.currentHeight}]}>
                <View style={styles.content2}>
                  <Image style={styles.avatar} source={{uri: this.props.pet.avatar.thumbnail }}>
                  </Image>
                  <TouchableNativeFeedback onPress={() => {
                      this.setState({translucent: false, colorBar: '#1e9284'});
                      Actions.pop();
                    }
                  }>
                    <View style={{
                      width: 60,
                      height: 60,
                      borderRadius: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 25,
                      left: 0
                    }}>
                      <IconM name="arrow-back" size={25} color="white" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
              <TouchableNativeFeedback>
                <View style={[{paddingTop: 30, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 60, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                  <View style={{marginLeft: 10, width: 150}}>
                    <Text style={{fontSize: 16, color: '#ccc'}}>Raza</Text>
                    <Text style={{fontSize: 20, color: '#6d6d6d'}}>{this.props.pet.race.name}</Text>
                  </View>
                  <View style={{marginLeft: 10, width: 100}}>
                    <Text style={{fontSize: 16, color: '#ccc'}}>Edad</Text>
                    <Text style={{fontSize: 20, color: '#6d6d6d'}}>{age}</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 60, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>

                  <View style={{marginLeft: 10, width: 150}}>
                    <Text style={{fontSize: 16, color: '#ccc'}}>Genero</Text>
                    <Text style={{fontSize: 20, color: '#6d6d6d'}}>Macho</Text>
                  </View>
                  <View style={{marginLeft: 10, width: 100}}>
                    <Text style={{fontSize: 16, color: '#ccc'}}>Tamaño</Text>
                    <Text style={{fontSize: 20, color: '#6d6d6d'}}>{this.props.pet.size.name}</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={[{paddingTop: 15, paddingLeft: 10, paddingBottom: 20,alignItems: 'center', paddingRight: 60, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#EEF6F9'}]}>
                  <View style={{marginLeft: 10, marginRight: 10}}>
                    <Text style={{fontSize: 16, color: '#ccc'}}>Comentario</Text>
                    <Text style={{fontSize: 14, color: '#6d6d6d', textAlign: 'justify'}}>{comments}</Text>
                  </View>

                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback onPress={goToViewProfilePet}>
                <View elevation={10} style={[styles.changeAvatar, utilities.color_primary]}>
                  <IconM name="edit" size={25} color="white" />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={[styles.namePet]}>
                  <Text style={
                    {
                      fontSize: 30, color: '#FFF',
                      fontWeight: 'bold',
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowRadius: 5,
                      marginBottom: 0,
                      textShadowOffset: {
                        height: 1,
                        width: 0
                      }
                    }
                  }>{this.props.pet.name}</Text>
                  <View elevation={3} style={{marginTop: 5,backgroundColor: '#08AE9E', borderRadius: 10,flexDirection: 'row',alignItems: 'center', justifyContent: 'center', paddingLeft: 5, paddingRight: 8, paddingTop: 2, paddingBottom: 2}}>
                    {gender}

                    <Text style={
                      {
                        fontSize: 12, color: '#FFF',
                        fontWeight: 'bold',
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowRadius: 5,
                        marginLeft: 5
                      }
                    }>{this.props.pet.race.name.toUpperCase()}</Text>

                  </View>
                </View>
              </TouchableNativeFeedback>

              </View>
            </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  carousel: {
    backgroundColor: '#FFF'
  },
  photo: {
    width: 80,
    height: 80,
    margin: 5,
    resizeMode: 'cover',
  },
  changeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 245,
    right: 20
  },
  namePet: {
    position: 'absolute',
    alignItems: 'flex-start',
    top: 190,
    left: 20
  },
  avatarContent: {
    alignItems: 'center',
    width: '100%'
  },
  colorGrey: {
    backgroundColor: '#fff'
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15
  },
  item: {
    fontSize: 16,
    marginLeft: 25
  }
});
