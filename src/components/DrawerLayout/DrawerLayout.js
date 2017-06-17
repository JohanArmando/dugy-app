import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
var styles = require('./Styles');
var utilities = require('../../assets/css/utilities');
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

export default class Home extends Component {
  constructor({ logout }) {
    super();
    this.logout = logout;
  }
  render (){
    if (this.props.user.name === '') {
      return (
        <Text>Cerrando session...</Text>
      );
    }
    return (
      <ScrollView>
        <View style={[styles.container, {minHeight: height - StatusBar.currentHeight}]} >
          <View style={[styles.menuPrincipal]} >
            <Image source={require('../../../src/assets/images/Home/background2.png')} style={styles.menuBack} >
              <View style={[utilities.ml]}>
                <View style={[styles.menuDoggy]}>
                  <View style={[styles.avatar, {marginLeft: -20}]}>
                    <Image style={styles.img} source={{uri: this.props.user.avatar.thumbnail }} />
                  </View>
                </View>
                <Text style={[utilities.mt, utilities.bold, styles.userName]}>{this.props.user.name} {this.props.user.last_name}</Text>
                <Text style={[styles.userEmail]}>{this.props.user.email}</Text>
              </View>
            </Image>
          </View>
          <View  style={{
            top: 155,
            right: 20,
            position: 'absolute'
          }}>
            <TouchableNativeFeedback onPress={this.goToProfile.bind(this)}>
              <View elevation={10} style={{
                width: 50,
                height: 50,
                backgroundColor: '#1e9284',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
                <Icon name="edit" size={22} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>
          <TouchableNativeFeedback onPress={this.goToPets.bind(this)}>
            <View style={[styles.menuItem, utilities.mt]}>
              <Icon name="pets" size={30} color="gray" />
              <Text style={utilities.ml} >Mascotas</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.goToHistory.bind(this)}>
            <View style={[styles.menuItem]}>
              <Icon name="map" size={30} color="gray" />
              <Text style={utilities.ml} >Historial de paseos</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.goToPays.bind(this)}>
            <View style={styles.menuItem}>
              <Icon name="payment" size={30} color="gray" />
              <Text style={utilities.ml} >Pagos</Text>
            </View>
          </TouchableNativeFeedback>



          <View style={[utilities.divider, utilities.mt]}></View>
          <TouchableNativeFeedback onPress={this.UserLogout.bind(this)}>
            <View style={[styles.menuItem, utilities.mt]}>
              <Icon name="exit-to-app" size={30} color="gray" />
              <Text style={utilities.ml} >Cerrar Sesion</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 20,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1}}>
            <Text>Legal</Text>
            <Text>Beta 0.1</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  UserLogout(){
    AsyncStorage.removeItem('token');
    this.props.close();
    this.logout();
    Actions.Welcome({type: 'reset'});
  }
  goToPets () {
    this.props.close();
    Actions.MyPets();
  }
  // <TouchableNativeFeedback onPress={this.goToProfile.bind(this)}>
  //   <View style={[styles.menuItem]}>
  //     <Icon name="info" size={30} color="gray" />
  //     <Text style={utilities.ml} >Ayuda</Text>
  //   </View>
  // </TouchableNativeFeedback>
  // <TouchableNativeFeedback onPress={this.goToProfile.bind(this)}>
  //   <View style={[styles.menuItem]}>
  //     <Icon name="settings" size={30} color="gray" />
  //     <Text style={utilities.ml} >Ajustes</Text>
  //   </View>
  // </TouchableNativeFeedback>
  goToProfile () {
    this.props.close();
    Actions.Profile();
  }

  goToHistory () {
    this.props.close();
    Actions.MyDatesHistory();
  }

  goToPays () {
    this.props.close();
    Actions.Pays();
  }
}
